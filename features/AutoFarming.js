import Feature from "../util/Feature";
import Settings from "../settings/Settings";
import {stripColor} from "../util/Method";

export default class AutoFarming extends Feature {
    constructor() {
        super("Auto Farming");
        if (FileLib.exists("ConspicuousUtilities/data", "autoFarming_Presets.json"))
            this.presets = JSON.parse(FileLib.read("ConspicuousUtilities/data", "autoFarming_Presets.json"))
        else this.presets = {}
        this.command_AutoFarming = this.withModifiers(this.command_AutoFarming, {
            setTabCompletions: (params) => {
                if (!params[0]) return Object.keys(this.presets)
                else return []
            },
            setName: "autofarming"
        })
        this.command_RegisterPreset = this.withModifiers(this.command_RegisterPreset, {
            setTabCompletions: (params) => {
                if (!params[0]) return Object.keys(this.presets)
                else return []
            },
            setName: "registerpreset"
        })
        this.active = false
        this.maxCycles = 0
        this.wrongItemTicks = 0
    }

    command_AutoFarming(preset, maxCycles, warp) {
        if (!preset) return ChatLib.chat(`&cUsage: /autofarming <preset> [maxCycles] [warp].`)
        preset = preset.toUpperCase()
        if (!Object.keys(this.presets).includes(preset))
            return ChatLib.chat(`&cThe preset &7${preset} &cis not defined.`)
        maxCycles = parseInt(maxCycles)
        if (isNaN(maxCycles)) maxCycles = 1
        this.maxCycles = maxCycles
        this.reset(warp !== "false")
        this.directions = this.presets[preset].split("").map(input => {
            if (input === "W") return "key.forward"
            if (input === "A") return "key.left"
            if (input === "S") return "key.back"
            if (input === "D") return "key.right"
            return undefined
        })
        if (Settings.autoFarming_StartDelay > 0)
            ChatLib.chat(`&aAuto Farming will start in &e${(Settings.autoFarming_StartDelay / 1000).toFixed(1)} &asecond(s).`)
        setTimeout(() => {
            ChatLib.chat(`&aAuto Farming has been activated with preset &e${preset} &afor &e${maxCycles} &acycle(s).`)
            /*if (Settings.autoFarming_YawPitchProtection)
                Client.setCurrentChatMessage("-- Don't close this chat window! --")*/
            this.active = true
        }, Settings.autoFarming_StartDelay)
        /*let keyBind = Client.getKeyBindFromDescription("key.attack")
        if (keyBind == null) return
        keyBind.setState(true)*/
    }

    command_RegisterPreset(name, instructions) {
        if (!name || !instructions)
            return ChatLib.chat(`&cUsage: /registerpreset <name> <instructions>.`)
        name = name.toUpperCase()
        instructions = instructions.toUpperCase()
        if (!/^[WASD]+$/.test(instructions))
            return ChatLib.chat(`&cThe instruction must contain only the characters &7"W"&c, &7"A"&c, &7"S"&c, and &7"D"&c.`)
        this.presets[name] = instructions
        FileLib.write("ConspicuousUtilities/data", "autoFarming_Presets.json", JSON.stringify(this.presets, null, 4), true)
        ChatLib.chat(`&aPreset &e${name} &aregistered as &e${instructions}&a.`)
    }

    checkSafety() {
        if (Settings.autoFarming_GardenOnly) {
            if (TabList.getNames().length < 42) return [false, "could not determine current area"]
            let currentLocation = stripColor(TabList.getNames()[21])
            if (!currentLocation.startsWith("Area: "))
                currentLocation = stripColor(TabList.getNames()[41])
            currentLocation = currentLocation.replace("Area: ", "")
            if (currentLocation !== "Garden") return [false, "not in Garden"]
        }
        if (!!this.lastPos) {
            if (Settings.autoFarming_LocationSensitive) {
                if (Math.abs(this.lastPos.x - Player.getX()) > 5) return [false, "X coordinate jump"]
                if (Math.abs(this.lastPos.y - Player.getY()) > 5) return [false, "Y coordinate jump"]
                if (Math.abs(this.lastPos.z - Player.getZ()) > 5) return [false, "Z coordinate jump"]
            }
            if (Settings.autoFarming_YawPitchSensitive) {
                if (this.lastPos.yaw !== Player.getYaw()) return [false, "yaw change"]
                if (this.lastPos.pitch !== Player.getPitch()) return [false, "pitch change"]
            }
        }
        //check inventory free slots (w/ thresh)
        return [true, undefined]
    }

    halt(reason) {
        this.active = false
        ChatLib.chat(`&cAuto Farming has been halted: &7${reason || "unknown reason"}&c.`)
        this.releaseDirections()
        let keyBind = Client.getKeyBindFromDescription("key.attack")
        if (keyBind == null) return
        keyBind.setState(false)
        /*let keyBind = Client.getKeyBindFromDescription("key.inventory");
        console.log(keyBind)
        keyBind.setState(true)
        keyBind.setState(false)*/
    }

    releaseDirections() {
        ["key.forward", "key.left", "key.back", "key.right"].forEach((direction) => {
            let keyBind = Client.getKeyBindFromDescription(direction)
            if (keyBind == null) return
            keyBind.setState(false)
        })
    }

    tick() {
        if (!Settings.autoFarming_Enabled) return
        if (!this.active) return
        const safetyResult = this.checkSafety()
        if (!safetyResult[0]) return this.halt(safetyResult[1])

        let currentPos = {
            x: Player.getX(),
            y: Player.getY(),
            z: Player.getZ(),
            yaw: Player.getYaw(),
            pitch: Player.getPitch(),
            item: Player.getHeldItem()?.getName()
        };
        if (!this.lastPos) this.lastPos = currentPos

        if (this.lastPos.item !== currentPos.item) {
            this.wrongItemTicks++
            currentPos.item = this.lastPos.item
        } else this.wrongItemTicks = 0
        if (this.wrongItemTicks === 20)
            return this.halt("held item change")

        if (
            Math.abs(this.lastPos.x - currentPos.x) < 0.1 &&
            Math.abs(this.lastPos.y - currentPos.y) < 0.1 &&
            Math.abs(this.lastPos.z - currentPos.z) < 0.1
        )
            this.thresh -= 1;

        if (this.thresh <= 0) {
            this.releaseDirections()
            this.currentDir++
            if (this.currentDir >= this.directions.length) {
                this.cycleCount++
                this.currentDir = -1
            }
            if (this.cycleCount === this.maxCycles) {
                if (Settings.autoFarming_AutoRestart) {
                    this.active = false
                    this.reset(true)
                    setTimeout(() => this.active = true, Settings.autoFarming_StartDelay)
                    return
                } else this.halt("max cycles reached " + this.cycleCount)
            }

            let bindName = this.directions[this.currentDir]
            let keyBind = Client.getKeyBindFromDescription(bindName);
            if (keyBind != null) {
                ChatLib.chat(`§ePressing: ${bindName}`);
                keyBind.setState(true);
            }
            this.thresh = Settings.autoFarming_ChangeDirectionsThreshold;
        }

        this.lastPos = currentPos;
    }

    guiOpened(event) {
        if (!Settings.autoFarming_Enabled) return
        if (!this.active) return
        /*if (event.gui.func_73868_f()) return
        if (event.gui.toString().includes("GuiChat")) return*/
        this.halt("GUI opened")
    }

    reset(warp) {
        this.lastPos = null
        this.thresh = Settings.autoFarming_ChangeDirectionsThreshold
        this.cycleCount = 0
        this.currentDir = -1
        this.wrongItemTicks = 0
        if (warp) ChatLib.command("warp garden")
    }
}