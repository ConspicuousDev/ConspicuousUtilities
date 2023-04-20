let features = {
    COLLECTOR: {
        args: [],
        enabled: false,
        hidden: true,
        inventory: [],
        run: (args) => {
            features.COLLECTOR.enabled = !features.COLLECTOR.enabled
            if (features.COLLECTOR.enabled) {
                ChatLib.chat("§aCollector has been enabled.")
            } else {
                ChatLib.chat("§cCollector has been disabled.")
            }
        },
        onStep: (steps) => {
            if (features.COLLECTOR.enabled) {
                let inv = Player.getInventory()
                let size = inv.getSize()
                let inventory = []
                for (let i = 0; i < size; i++) {
                    let item = inv.getStackInSlot(i)
                    if (item.getName() !== "tile.air.name") {
                        let minecraftNBT =
                            features.COLLECTOR.getMinecraftNBT(item)
                        let hypixelNBT = features.COLLECTOR.getHypixelNBT(item)
                        inventory.push({
                            id: hypixelNBT.getString("id"),
                            name: minecraftNBT.getString("Name"),
                            lore: features.COLLECTOR.getLoreFromNBT(
                                minecraftNBT
                            ),
                            amount: item.getStackSize()
                        })
                    }
                }
                features.COLLECTOR.inventory = inventory
            }
        },
        getHypixelNBT: (item) => {
            return item
                .getNBT()
                .getCompoundTag("tag")
                .getCompoundTag("ExtraAttributes")
        },
        getMinecraftNBT: (item) => {
            return item.getNBT().getCompoundTag("tag").getCompoundTag("display")
        },
        getLoreFromNBT: (minecraftNBT) => {
            let NBTTagList =
                com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.nbt
                    .NBTTagList
            return new NBTTagList(minecraftNBT.getTagMap().get("Lore"))
        }
    },
    TEXTMACROS: {
        args: [],
        enabled: true,
        hidden: true,
        previousWarp: null,
        lastWarp: null,
        macros: [
            {
                bind: Keyboard.KEY_R,
                description: "/sbmenu",
                action() {
                    ChatLib.command("sbmenu")
                }
            },
            {
                bind: Keyboard.KEY_F,
                description: "/bz",
                action() {
                    ChatLib.command("bz")
                }
            },
            {
                bind: Keyboard.KEY_G,
                description: "/ah",
                action() {
                    ChatLib.command("ah")
                }
            },
            {
                bind: Keyboard.KEY_Z,
                description: "/ec",
                action() {
                    ChatLib.command("ec")
                }
            },
            {
                bind: Keyboard.KEY_V,
                description: "/pets",
                action() {
                    ChatLib.command("pets")
                }
            },
            {
                bind: Keyboard.KEY_NUMPAD2,
                description: "/sacks",
                action() {
                    ChatLib.command("sacks")
                }
            },
            {
                bind: Keyboard.KEY_NUMPAD3,
                description: "/warp hub",
                action() {
                    ChatLib.command("warp hub")
                }
            },
            {
                bind: Keyboard.KEY_NUMPAD4,
                description: "/bingo",
                action() {
                    ChatLib.command("bingo")
                }
            },
            {
                bind: Keyboard.KEY_NUMPAD5,
                description: "/pickupstash",
                action() {
                    ChatLib.command("pickupstash")
                }
            },
            {
                bind: Keyboard.KEY_NUMPAD6,
                description: "Previous Warp",
                action() {
                    if (features.TEXTMACROS.previousWarp == null) {
                        ChatLib.chat("§cNo previous warp detected.")
                        return
                    }
                    ChatLib.command(`warp ${features.TEXTMACROS.previousWarp}`)
                }
            },
            {
                bind: Keyboard.KEY_NONE,
                description: "View Bazaar (Requires Cookie Buff)",
                action() {
                    ChatLib.command("bz")
                }
            },
            {
                bind: Keyboard.KEY_NONE,
                description: "View Crafting Table",
                action() {
                    ChatLib.command("viewcraftingtable")
                }
            },
            {
                bind: Keyboard.KEY_NONE,
                description: "Order 12800x Enchanted Cocoa Bean",
                action() {
                    ChatLib.command(
                        "ou bazaaraction BUY_ORDER 12800 Enchanted Cocoa Bean"
                    )
                }
            },
            {
                bind: Keyboard.KEY_NONE,
                description: "Buy 512x Wheat",
                action() {
                    ChatLib.command("ou bazaaraction BUY_INSTANT 512 Wheat")
                }
            }
        ],
        setup() {
            if (!this.enabled) return
            this.macros.forEach((macro) => {
                let keyBind = Client.getKeyBindFromDescription(
                    macro.description
                )
                if (keyBind == null)
                    keyBind = new KeyBind(
                        macro.description,
                        macro.bind,
                        (category = "OmniUtils: Text Macros")
                    )
                keyBind.registerKeyPress(macro.action)
            })
        },
        onMessageSent(message) {
            if (!message.startsWith("/warp ")) return

            this.previousWarp = this.lastWarp

            this.lastWarp = message.replace("/warp ", "")
        }
    },
    WAYPOINTS: {
        args: [
            {
                name: "type",
                required: true
            }
        ],
        run: (args) => {
            let waypoints = {
                RUBY: [
                    {
                        name: "1",
                        x: 369,
                        y: 58,
                        z: 358
                    },
                    {
                        name: "2",
                        x: 374,
                        y: 59,
                        z: 368
                    },
                    {
                        name: "3",
                        x: 378,
                        y: 59,
                        z: 363
                    },
                    {
                        name: "4",
                        x: 377,
                        y: 59,
                        z: 358
                    },
                    {
                        name: "5",
                        x: 383,
                        y: 59,
                        z: 372
                    },
                    {
                        name: "6",
                        x: 387,
                        y: 59,
                        z: 367
                    },
                    {
                        name: "7",
                        x: 390,
                        y: 58,
                        z: 384
                    },
                    {
                        name: "8",
                        x: 381,
                        y: 58,
                        z: 379
                    },
                    {
                        name: "9",
                        x: 377,
                        y: 49,
                        z: 386
                    },
                    {
                        name: "10",
                        x: 368,
                        y: 49,
                        z: 382
                    },
                    {
                        name: "11",
                        x: 366,
                        y: 51,
                        z: 371
                    },
                    {
                        name: "12",
                        x: 357,
                        y: 51,
                        z: 367
                    },
                    {
                        name: "13",
                        x: 360,
                        y: 58,
                        z: 366
                    },
                    {
                        name: "14",
                        x: 359,
                        y: 55,
                        z: 357
                    },
                    {
                        name: "15",
                        x: 384,
                        y: 55,
                        z: 357
                    },
                    {
                        name: "16",
                        x: 386,
                        y: 55,
                        z: 349
                    },
                    {
                        name: "17",
                        x: 362,
                        y: 49,
                        z: 363
                    },
                    {
                        name: "18",
                        x: 369,
                        y: 43,
                        z: 361
                    },
                    {
                        name: "19",
                        x: 373,
                        y: 44,
                        z: 358
                    },
                    {
                        name: "20",
                        x: 373,
                        y: 47,
                        z: 367
                    },
                    {
                        name: "21",
                        x: 398,
                        y: 46,
                        z: 393
                    },
                    {
                        name: "22",
                        x: 396,
                        y: 43,
                        z: 403
                    },
                    {
                        name: "23",
                        x: 398,
                        y: 49,
                        z: 404
                    }
                ]
            }
            if (waypoints.hasOwnProperty(args.type.toUpperCase())) {
                let sbeCommand = "crystalwaypoint parse "
                for (
                    let i = 0;
                    i < waypoints[args.type.toUpperCase()].length;
                    i++
                ) {
                    waypoint = waypoints[args.type.toUpperCase()][i]
                    sbeCommand +=
                        waypoint.name +
                        "@-" +
                        waypoint.x +
                        "," +
                        waypoint.y +
                        "," +
                        waypoint.z
                    if (i < waypoints[args.type.toUpperCase()].length - 1) {
                        sbeCommand += "\\n"
                    }
                }
                print(sbeCommand)
                ChatLib.command(sbeCommand, true)
                ChatLib.chat(
                    "§aThe §7" +
                        args.type.toUpperCase() +
                        " §awaypoints have been added successfully."
                )
            } else {
                let waypointNames = ""
                for (waypointName in waypoints) {
                    waypointNames += "§7" + waypointName + "§c,"
                }
                waypointNames = waypointNames.substring(
                    0,
                    waypointNames.length - 1
                )
                ChatLib.chat(
                    "§cThere is no §7" +
                        args.type.toUpperCase() +
                        " §cwaypoint set. Try any of the following: " +
                        waypointNames +
                        "§c."
                )
            }
        }
    },
    LOBBYTIMER: {
        args: [
            {
                name: "x",
                required: false
            },
            {
                name: "y",
                required: false
            }
        ],
        enabled: false,
        timer: new Text(
            "§7Calculating time...",
            Renderer.screen.getWidth() / 2,
            Renderer.screen.getHeight() / 2
        ),
        run: (args) => {
            if (args.hasOwnProperty("x") && args.hasOwnProperty("y")) {
                if (!isNaN(args.x) && !isNaN(args.y)) {
                    setDisplayPosition(
                        features.LOBBYTIMER.timer,
                        parseInt(args.x),
                        parseInt(args.y)
                    )
                    ChatLib.chat(
                        "§aThe overlay position has been changed to §e" +
                            features.LOBBYTIMER.timer.getX() +
                            ", " +
                            features.LOBBYTIMER.timer.getY() +
                            "§a. §7(Max is " +
                            Renderer.screen.getWidth() +
                            ", " +
                            Renderer.screen.getHeight() +
                            ")"
                    )
                } else {
                    ChatLib.chat(
                        "§cBoth parameters §7x §cand §7y §cmust be numbers."
                    )
                }
            } else if (Object.keys(args).length > 0) {
                ChatLib.chat(
                    "§cYou need to have both §7x §cand §7y §cparameters or neither of them."
                )
            } else {
                features.LOBBYTIMER.enabled = !features.LOBBYTIMER.enabled
                if (features.LOBBYTIMER.enabled) {
                    ChatLib.chat("§aLobby Timer has been enabled.")
                } else {
                    ChatLib.chat("§cLobby Timer has been disabled.")
                }
            }
        },
        setup: () => {
            features.LOBBYTIMER.timer.setShadow(true)
            setDisplayPosition(features.LOBBYTIMER.timer, 610, 340)
        },
        onRender: () => {
            if (features.LOBBYTIMER.enabled) {
                let ticks = World.getTime()
                if (ticks % 20 == 0) {
                    let days = Math.floor(ticks / 24000)
                    let hours = Math.floor(ticks / 72000)
                    let minutes = Math.floor(ticks / 1200) - hours * 60
                    let seconds =
                        Math.floor(ticks / 20) - minutes * 60 - hours * 3600
                    let string = "§e"
                    if (hours > 0) {
                        string += hours + "h"
                    }
                    if (
                        minutes > 0 ||
                        hours > 0 ||
                        (minutes > 0 && hours > 0)
                    ) {
                        string += minutes + "m"
                    }
                    string += seconds + "s"
                    features.LOBBYTIMER.timer.setString(
                        "§e" + string + " §7(Day " + days + ")"
                    )
                }
                features.LOBBYTIMER.timer.draw()
            }
        }
    },
    BREAKTIME: {
        args: [],
        enabled: false,
        startTime: -1,
        run: () => {
            features.BREAKTIME.enabled = !features.BREAKTIME.enabled
            if (features.BREAKTIME.enabled) {
                ChatLib.chat("§aBreak Time has been enabled.")
            } else {
                ChatLib.chat("§cBreak Time has been disabled.")
            }
        },
        onClick: (x, y, button, pressed) => {
            if (features.BREAKTIME.enabled) {
                if (button === 0 && pressed) {
                    features.BREAKTIME.startTime = new Date().getTime()
                }
            }
        },
        onSoundPlay: (position, name, volume, pitch, category, event) => {
            if (features.BREAKTIME.enabled) {
                if (String(name).startsWith("dig.")) {
                    let endTime = new Date().getTime()
                    ChatLib.chat(
                        "§7The block broke in §e" +
                            (endTime - features.BREAKTIME.startTime) +
                            "ms§7."
                    )
                    features.BREAKTIME.startTime = new Date().getTime()
                }
            }
        }
    },
    GEMSTONETRACKER: {
        args: [
            {
                name: "action",
                required: true
            },
            {
                name: "x",
                required: false
            },
            {
                name: "y",
                required: false
            }
        ],
        constants: {
            qualities: {
                ROUGH: 1,
                FLAWED: 80,
                FINE: 6400,
                FLAWLESS: 512000,
                PERFECT: 2560000
            },
            types: {
                RUBY: { color: "c" },
                JASPER: { color: "d" },
                AMETHYST: { color: "5" },
                SAPPHIRE: { color: "b" },
                JADE: { color: "a" },
                TOPAZ: { color: "e" },
                AMBER: { color: "6" }
            },
            unitPrice: 4
        },
        enabled: false,
        paused: false,
        time: -1,
        startingGems: undefined,
        gems: {},
        display: new Display(),
        run: (args) => {
            if (Object.keys(args).length >= 1) {
                if (
                    Object.keys(args).length > 1 &&
                    args.hasOwnProperty("x") &&
                    args.hasOwnProperty("y")
                ) {
                    if (!isNaN(args.x) && !isNaN(args.y)) {
                        setDisplayPosition(
                            features.GEMSTONETRACKER.display,
                            parseInt(args.x),
                            parseInt(args.y)
                        )
                        ChatLib.chat(
                            "§aThe overlay position has been changed to §e" +
                                args.x +
                                ", " +
                                args.y +
                                "§a. §7(Max is " +
                                Renderer.screen.getWidth() +
                                ", " +
                                Renderer.screen.getHeight() +
                                ")"
                        )
                    } else {
                        ChatLib.chat(
                            "§cBoth parameters §7x §cand §7y §cmust be numbers."
                        )
                    }
                } else if (
                    args.hasOwnProperty("x") ||
                    args.hasOwnProperty("y")
                ) {
                    ChatLib.chat(
                        "§cYou need to have both §7x §cand §7y §cparameters or neither of them."
                    )
                }
                if (args.action.toLowerCase() === "start") {
                    features.GEMSTONETRACKER.enabled = true
                    features.GEMSTONETRACKER.paused = false
                    features.GEMSTONETRACKER.time = 0
                    let inventory = features.COLLECTOR.inventory
                    let gems = {}
                    for (
                        let i = 0;
                        i <
                        Object.keys(features.GEMSTONETRACKER.constants.types)
                            .length;
                        i++
                    ) {
                        gems[
                            Object.keys(
                                features.GEMSTONETRACKER.constants.types
                            )[i]
                        ] = 0
                    }
                    for (let i = 0; i < inventory.length; i++) {
                        let item = inventory[i]
                        let idParts = item.id.split("_")
                        if (idParts.length === 3) {
                            if (
                                Object.keys(
                                    features.GEMSTONETRACKER.constants.qualities
                                ).includes(idParts[0]) &&
                                Object.keys(
                                    features.GEMSTONETRACKER.constants.types
                                ).includes(idParts[1]) &&
                                idParts[2] === "GEM"
                            ) {
                                gems[idParts[1]] +=
                                    item.amount *
                                    features.GEMSTONETRACKER.constants
                                        .qualities[idParts[0]]
                            }
                        }
                    }
                    features.GEMSTONETRACKER.startingGems = gems
                    ChatLib.chat("§aGemstone Tracker has been enabled.")
                } else if (args.action.toLowerCase() === "stop") {
                    features.GEMSTONETRACKER.enabled = false
                    features.GEMSTONETRACKER.paused = false
                    features.GEMSTONETRACKER.time = -1
                    features.GEMSTONETRACKER.display.clearLines()
                    ChatLib.chat("§cGemstone Tracker has been disabled.")
                } else if (args.action.toLowerCase() === "pause") {
                    features.GEMSTONETRACKER.pauseTracker()
                } else if (args.action.toLowerCase() === "none") {
                } else {
                    ChatLib.chat(
                        "§cThere is no §7" +
                            args.action.toUpperCase() +
                            " §caction set. Try any of the following: §7START§c, §7STOP§c, §7PAUSE§c, §7NONE§c."
                    )
                }
            }
        },
        setup: () => {
            features.GEMSTONETRACKER.display.setBackground("full")
            setDisplayPosition(features.GEMSTONETRACKER.display, 133, 47)
        },
        pauseTracker: () => {
            features.GEMSTONETRACKER.enabled = true
            features.GEMSTONETRACKER.paused = !features.GEMSTONETRACKER.paused
            if (features.GEMSTONETRACKER.paused) {
                ChatLib.chat("§eGemstone Tracker has been paused.")
            } else {
                ChatLib.chat("§eGemstone Tracker has been resumed.")
            }
        },
        onRender: () => {
            if (features.GEMSTONETRACKER.enabled) {
                features.GEMSTONETRACKER.display.render()
            }
        },
        onStep: (steps) => {
            if (
                features.GEMSTONETRACKER.enabled &&
                !features.GEMSTONETRACKER.paused
            ) {
                features.GEMSTONETRACKER.time += 1
                let inventory = features.COLLECTOR.inventory
                let gems = {}
                for (let i = 0; i < inventory.length; i++) {
                    let item = inventory[i]
                    let idParts = item.id.split("_")
                    if (idParts.length === 3) {
                        if (
                            Object.keys(
                                features.GEMSTONETRACKER.constants.qualities
                            ).includes(idParts[0]) &&
                            Object.keys(
                                features.GEMSTONETRACKER.constants.types
                            ).includes(idParts[1]) &&
                            idParts[2] === "GEM"
                        ) {
                            if (!gems.hasOwnProperty(idParts[1])) {
                                gems[idParts[1]] = 0
                            }
                            gems[idParts[1]] +=
                                item.amount *
                                features.GEMSTONETRACKER.constants.qualities[
                                    idParts[0]
                                ]
                        }
                    }
                }
                features.GEMSTONETRACKER.gems = gems
                let totalGems = 0
                let offset = 0
                let amounts = []
                let values = []
                for (
                    let i = 0;
                    i <
                    Object.keys(features.GEMSTONETRACKER.constants.types)
                        .length;
                    i++
                ) {
                    let type = Object.keys(
                        features.GEMSTONETRACKER.constants.types
                    )[i]
                    if (features.GEMSTONETRACKER.gems.hasOwnProperty(type)) {
                        let amount =
                            features.GEMSTONETRACKER.gems[type] -
                            features.GEMSTONETRACKER.startingGems[type]
                        if (amount < 0) {
                            amount = 0
                        }
                        if (amount > 0) {
                            totalGems += amount
                            amounts.push(
                                "  §" +
                                    features.GEMSTONETRACKER.constants.types[
                                        type
                                    ].color +
                                    type.toUpperCase().substring(0, 1) +
                                    type.toLowerCase().substring(1) +
                                    ": §e" +
                                    formatNumber(amount)
                            )
                            values.push(
                                "  §" +
                                    features.GEMSTONETRACKER.constants.types[
                                        type
                                    ].color +
                                    type.toUpperCase().substring(0, 1) +
                                    type.toLowerCase().substring(1) +
                                    ": §e$ " +
                                    formatNumber(
                                        amount *
                                            features.GEMSTONETRACKER.constants
                                                .unitPrice
                                    )
                            )
                            offset += 1
                        }
                    }
                }
                features.GEMSTONETRACKER.display.clearLines()
                features.GEMSTONETRACKER.display.setLine(
                    0,
                    "§3Session Timer: §e" +
                        generateTimerString(features.GEMSTONETRACKER.time)
                )
                features.GEMSTONETRACKER.display.setLine(
                    1,
                    "§3Total Gems: §e" + formatNumber(totalGems)
                )
                for (let i = 0; i < amounts.length; i++) {
                    features.GEMSTONETRACKER.display.setLine(i + 2, amounts[i])
                }
                features.GEMSTONETRACKER.display.setLine(
                    amounts.length + 2,
                    "§3NPC Value: §e" +
                        formatNumber(
                            totalGems *
                                features.GEMSTONETRACKER.constants.unitPrice
                        )
                )
                for (let i = 0; i < values.length; i++) {
                    features.GEMSTONETRACKER.display.setLine(
                        i + amounts.length + 3,
                        values[i]
                    )
                }
                features.GEMSTONETRACKER.display.setLine(
                    values.length + amounts.length + 3,
                    "§e$ " +
                        formatNumber(
                            Math.floor(
                                totalGems *
                                    features.GEMSTONETRACKER.constants
                                        .unitPrice *
                                    (3600 / features.GEMSTONETRACKER.time)
                            )
                        ) +
                        "/h"
                )
            }
        },
        onWorldUnload: () => {
            if (
                !features.GEMSTONETRACKER.paused &&
                features.GEMSTONETRACKER.enabled
            ) {
                features.GEMSTONETRACKER.pauseTracker()
            }
        }
    },
    AUTOFISHING: {
        args: [],
        enabled: false,
        hidden: false,
        splashed: false,
        count: Math.floor(Math.random() * (5 - 3) + 3),
        switch: false,
        offset: Math.floor(Math.random() * (3 - 1) + 1),
        run: () => {
            features.AUTOFISHING.splashed = false
            features.AUTOFISHING.count = Math.floor(Math.random() * (5 - 3) + 3)
            features.AUTOFISHING.switch = false
            features.AUTOFISHING.offset = Math.floor(
                Math.random() * (3 - 1) + 1
            )
            features.AUTOFISHING.enabled = !features.AUTOFISHING.enabled
            if (features.AUTOFISHING.enabled) {
                ChatLib.chat("§aAuto Fishing has been enabled.")
            } else {
                ChatLib.chat("§cAuto Fishing has been disabled.")
            }
        },
        onSoundPlay: (position, name, volume, pitch, category, event) => {
            if (
                features.AUTOFISHING.enabled &&
                Player.getHeldItem().getID() === 346
            ) {
                if (name === "random.successful_hit") {
                    features.AUTOFISHING.fish()
                } else if (name === "game.player.swim.splash") {
                    if (features.AUTOFISHING.splashed) {
                        features.AUTOFISHING.splashed = false
                        features.AUTOFISHING.fish()
                    } else {
                        features.AUTOFISHING.splashed = true
                    }
                }
            }
        },
        fish() {
            let rightClickMethod = Java.type(
                "net.minecraft.client.Minecraft"
            ).class.getDeclaredMethod("func_147121_ag")
            rightClickMethod.setAccessible(true)
            rightClickMethod.invoke(Client.getMinecraft())
            let wait = Math.floor(Math.random() * (1250 - 450) + 450)
            setTimeout(() => {
                if (Player.getHeldItem().getID() === 346) {
                    rightClickMethod.invoke(Client.getMinecraft())
                    if (features.AUTOFISHING.count == 0) {
                        let change = features.AUTOFISHING.offset
                        if (features.AUTOFISHING.switch) {
                            change = -features.AUTOFISHING.offset
                            features.AUTOFISHING.offset = Math.floor(
                                Math.random() * (3 - 1) + 1
                            )
                        }
                        features.AUTOFISHING.switch =
                            !features.AUTOFISHING.switch
                        features.AUTOFISHING.count = Math.floor(
                            Math.random() * (5 - 3) + 3
                        )
                    } else {
                        features.AUTOFISHING.count -= 1
                    }
                }
            }, wait)
        }
    },
    AUTOFARMING: {
        args: [
            {
                name: "preset",
                required: true
            }
        ],
        enabled: false,
        hidden: false,
        resetThresh: 2,
        thresh: 2,
        lastPos: { x: 0, y: 0, z: 0 },
        presets: {
            CARROT: ["key.right", "key.forward", "key.left", "key.forward"],
            COCOA: ["key.forward", "key.left", "key.back", "key.left"]
        },
        currentPreset: null,
        directions: [],
        currentDir: -1,
        run(args) {
            if (!this.presets.hasOwnProperty(args.preset))
                return ChatLib.chat(
                    "&cThere is no &7" +
                        args.preset.toUpperCase() +
                        " &cpreset. Try any of the following: &7" +
                        Object.keys(this.presets).join("&c, &7") +
                        "&c."
                )

            this.enabled = !this.enabled

            if (!this.enabled) this.releaseDirections()
            else {
                this.thresh = this.resetThresh
                this.directions = this.presets[args.preset.toUpperCase()]
                this.currentDir = -1
                this.currentPreset = args.preset.toUpperCase()
            }
            if (this.enabled) ChatLib.chat("&aAutoFarming has been enabled.")
            else ChatLib.chat("&cAutoFarming has been disabled.")
        },
        onTick() {
            if (!this.enabled) return

            if (Player.getInventory().getItems().indexOf(null) == -1)
                this.halt()

            let currentPos = {
                x: Player.getX(),
                y: Player.getY(),
                z: Player.getZ()
            }

            if (
                Math.abs(this.lastPos.x - currentPos.x) < 0.1 &&
                Math.abs(this.lastPos.y - currentPos.y) < 0.1 &&
                Math.abs(this.lastPos.z - currentPos.z) < 0.1
            )
                this.thresh -= 1

            if (this.thresh == 0) {
                this.nextDirection()
                this.thresh = this.resetThresh
            }

            this.lastPos = currentPos
        },
        halt() {
            if (!this.enabled) return
            this.run({ preset: this.currentPreset })
        },
        releaseDirections() {
            if (!this.enabled) return
            this.directions.forEach((direction) => {
                let keyBind = Client.getKeyBindFromDescription(direction)
                if (keyBind == null) return
                keyBind.setState(false)
            })
        },
        nextDirection() {
            if (!this.enabled) return

            this.releaseDirections()

            this.currentDir += 1
            if (this.currentDir >= this.directions.length) this.currentDir = 0

            let keyBind = Client.getKeyBindFromDescription(
                this.directions[this.currentDir]
            )
            if (keyBind == null) return

            ChatLib.chat(`§ePressing: ${this.directions[this.currentDir]}`)
            keyBind.setState(true)
        },
        onTeleportPad() {
            this.thresh = 10
        }
    },
    SCOREBOARDFIX: {
        args: [],
        enabled: false,
        hidden: false,
        run() {
            this.enabled = !this.enabled
            if (this.enabled) ChatLib.chat("§aScoreboardFix has been enabled.")
            else ChatLib.chat("§cScoreboardFix has been disabled.")
        },
        onTick() {
            if (!this.enabled) return
            if (Scoreboard == null || Scoreboard.getTitle() == null) return

            let oldTitle = Scoreboard.getTitle()

            let stripTitle = stripColor(oldTitle)

            let newTitle = stripTitle.replace("SKIBLOCK", "SKYBLOCK")

            const regex = RegExp("§[a-fA-F0-9kKlLmMnNoOrR]", "g")
            let match
            console.log("---------------------------------------")
            console.log(oldTitle, newTitle)
            console.log("TARGET: " + oldTitle)
            while ((match = regex.exec(oldTitle)) != null) {
                newTitle = `${newTitle.substring(
                    0,
                    regex.lastIndex - match[0].length
                )}${match[0]}${newTitle.substring(
                    regex.lastIndex - match[0].length
                )}`
            }
            console.log("CURRENT: " + newTitle)

            Scoreboard.setTitle(newTitle)
        }
    },
    NPCSELL: {
        args: [
            {
                name: "item",
                required: true
            }
        ],
        enabled: false,
        hidden: false,
        selling: false,
        resetThresh: 200,
        filter: null,
        thresh: 0,
        run(args, rest) {
            if (this.enabled) return
            if (!this.hasCookieBuff())
                return ChatLib.chat(
                    "§cYou need §dCookie Buff §cenabled to run this."
                )

            this.enabled = true
            this.thresh = this.resetThresh

            this.filter = args.item
            if (rest) this.filter += " " + rest

            ChatLib.command("sbmenu")
        },
        onPostGUIRender() {
            if (!this.enabled) return

            if (this.thresh > 0) return (this.thresh -= 1)

            this.enabled = false

            let inv = Player.getOpenedInventory()
            if (inv.getName() == "SkyBlock Menu") {
                inv.click(51)
                this.enabled = true
                this.thresh = this.resetThresh
            } else if (inv.getName() == "Booster Cookie") {
                this.selling = true

                let offsetWait = 0
                for (let i = inv.getSize() - 36; i < inv.getSize(); i++) {
                    let item = Player.getOpenedInventory().getStackInSlot(i)

                    if (item == null) continue

                    if (
                        !item
                            .getName()
                            .toLowerCase()
                            .includes(this.filter.toLowerCase())
                    )
                        continue

                    let wait = Math.floor(Math.random() * (250 - 100) + 100)
                    offsetWait += wait

                    let pastI = i

                    setTimeout(() => {
                        if (!features.NPCSELL.selling) return

                        inv.click(pastI)
                    }, offsetWait + wait)
                }
                setTimeout(() => {
                    if (!features.NPCSELL.selling) return

                    features.NPCSELL.selling = false
                    Client.currentGui.close()
                }, offsetWait + Math.floor(Math.random() * (250 - 100) + 100))
            }
        },
        onGUIClosed() {
            if (this.selling) {
                this.selling = false
                ChatLib.chat("§cNPCSell failed.")
            }
        },
        hasCookieBuff() {
            return TabList.getFooter().includes("Cookie Buff")
        }
    },
    BAZAARACTION: {
        args: [
            {
                name: "action",
                required: true
            },
            {
                name: "amount",
                required: true
            },
            {
                name: "item",
                required: true
            }
        ],
        enabled: false,
        hidden: false,
        availableActions: [
            "BUY_ORDER",
            "BUY_INSTANT",
            "SELL_OFFER",
            "SELL_INSTANT"
        ],
        flag: -1,
        action: null,
        amount: -1,
        filter: null,
        selectedCategory: null,
        resetThresh: 200,
        thresh: 0,
        run(args, rest) {
            if (!this.availableActions.includes(args.action.toUpperCase()))
                return ChatLib.chat(
                    `§cThe action §7${args.action.toUpperCase()} §cdoes not exist. Try one of the following: ${this.availableActions
                        .map((action) => "§7" + action)
                        .join("§c, ")}§c.`
                )
            if (!this.hasCookieBuff())
                return ChatLib.chat(
                    "§cYou need §dCookie Buff §cenabled to run this."
                )
            if (isNaN(args.amount))
                return ChatLib.chat(
                    "§cThe parameter §7amount §chas to be a number."
                )

            this.enabled = true
            this.thresh = this.resetThresh
            this.flag = 0

            this.action = args.action.toUpperCase()
            this.amount = args.amount
            this.filter = args.item
            if (rest) this.filter += " " + rest

            ChatLib.command("bz")
        },
        onPostGUIRender() {
            if (!this.enabled) return

            if (this.thresh > 0) return (this.thresh -= 1)

            this.enabled = false

            let inv = Player.getOpenedInventory()
            if (Client.currentGui.getClassName() == "GuiEditSign") {
                const tileSign = Java.type(
                    "net.minecraft.client.gui.inventory.GuiEditSign"
                ).class.getDeclaredField("field_146848_f")
                const doneBtn = Java.type(
                    "net.minecraft.client.gui.inventory.GuiEditSign"
                ).class.getDeclaredField("field_146852_i")
                const ChatComponentText = Java.type(
                    "net.minecraft.util.ChatComponentText"
                )
                tileSign.setAccessible(true)
                doneBtn.setAccessible(true)

                let currentTileSign = tileSign.get(Client.currentGui.get())

                let chatComponent
                if (this.flag == 0)
                    chatComponent = new ChatComponentText(this.filter)
                else if (this.flag == 2)
                    chatComponent = new ChatComponentText(this.amount)
                currentTileSign.field_145915_a[0] = chatComponent

                currentTileSign.func_70296_d()
                Client.getMinecraft().func_147108_a(null)

                this.enabled = true
                this.thresh = this.resetThresh
            } else if (`Bazaar ➜ "${this.filter}"`.startsWith(inv.getName())) {
                let category = inv.getStackInSlot(11)

                if (category.getName().endsWith("No Product Found")) {
                    this.enabled = false
                    this.started = false
                    return ChatLib.chat("§cBazaarAction failed.")
                }

                let selectedSlot = -1
                let bestDistance = Infinity
                for (let i = 1; i < 5; i++) {
                    for (let j = 2; j < 8; j++) {
                        let slot = i * 9 + j
                        let item = inv.getStackInSlot(i * 9 + j)
                        if (item == null) break
                        let distance = levenshteinDistance(
                            this.filter,
                            item.getName()
                        )
                        if (distance < bestDistance) {
                            selectedSlot = slot
                            bestDistance = distance
                        }
                    }
                }

                let selectedItem = inv.getStackInSlot(selectedSlot)
                this.selectedCategory = stripColor(selectedItem.getName())
                this.flag = 1
                inv.click(selectedSlot)

                this.enabled = true
                this.thresh = this.resetThresh
            } else if (
                this.flag == 1 &&
                this.selectedCategory.startsWith(inv.getName().split(" ➜ ")[1])
            ) {
                if (this.action == "BUY_ORDER") inv.click(15)
                else if (this.action == "BUY_INSTANT") inv.click(10)
                else if (this.action == "SELL_OFFER") inv.click(16)
                else if (this.action == "SELL_INSTANT") {
                    inv.click(11)
                    return Client.currentGui.close()
                } else return ChatLib.chat("§cBazaarAction failed.")

                this.enabled = true
                this.thresh = this.resetThresh
            } else if (
                inv.getName() == "How many do you want?" ||
                `${this.selectedCategory} ➜ Instant Buy`.startsWith(
                    inv.getName()
                )
            ) {
                this.flag = 2
                inv.click(16)

                this.enabled = true
                this.thresh = this.resetThresh
            } else if (
                [
                    "At what price are you selling?",
                    "How much do you want to pay?"
                ].includes(inv.getName())
            ) {
                let pointOne = inv.getStackInSlot(12)

                if (pointOne.getName().includes("0.1")) inv.click(12)
                else inv.click(11)

                this.enabled = true
                this.thresh = this.resetThresh
            } else if (
                [
                    "Confirm Sell Offer",
                    "Confirm Buy Order",
                    "Confirm Instant Buy"
                ].includes(inv.getName())
            ) {
                inv.click(13)

                Client.currentGui.close()
            } else if (inv.getName().startsWith("Bazaar")) {
                this.flag = 0
                inv.click(45)

                this.enabled = true
                this.thresh = this.resetThresh
            }
        },
        hasCookieBuff() {
            return TabList.getFooter().includes("Cookie Buff")
        }
    },
    GARDENVISITORS: {
        args: [],
        enabled: true,
        hidden: false,
        resetThresh: 200,
        thresh: 200,
        currentCommand: null,
        run() {
            this.enabled = !this.enabled
            if (this.enabled) this.thresh = this.resetThresh
            if (this.enabled) ChatLib.chat("§aGardenVisitors has been enabled.")
            else ChatLib.chat("§cGardenVisitors has been disabled.")
        },
        onPostGUIRender() {
            if (!this.enabled) return

            let inv = Player.getOpenedInventory()
            if (inv == null) return

            if (this.thresh > 0) return (this.thresh -= 1)
            this.thresh = this.resetThresh

            let accept = inv.getStackInSlot(29)

            if (
                accept == null ||
                stripColor(accept.getName()) != "Accept Offer" ||
                stripColor(accept.getLore()[1]) != "Items Required:"
            )
                return

            let requiredStr = accept
                .getLore()[2]
                .replace(/ §7\(§6.*§7 coins\)/g, "")
                .split(" ")
                .slice(1)
                .join(" ")
            let item = requiredStr.split("§8x")[0].trim()
            let amount =
                requiredStr.split("§8x").length > 1
                    ? requiredStr.split("§8x")[1].split(" ")[0].trim()
                    : "1"

            let command = `/ou bazaaraction BUY_INSTANT ${amount.replace(
                ",",
                ""
            )} ${stripColor(item)}`

            if (command == this.currentCommand) return

            this.currentCommand = command
            ChatLib.command(`ct copy ${this.currentCommand}`, true)
            ChatLib.chat(
                `§aCopied Bazaar command for §7${item} §8x${amount}§a.`
            )
        }
    },
    AUTOFORAGING: {
        args: [],
        enabled: false,
        hidden: false,
        rightClickMethod: Java.type(
            "net.minecraft.client.Minecraft"
        ).class.getDeclaredMethod("func_147121_ag"),
        leftClickMethod: Java.type(
            "net.minecraft.client.Minecraft"
        ).class.getDeclaredMethod("func_147116_af"),
        axeSlot: -1,
        rodSlot: -1,
        saplingSlot: -1,
        boneMealSlot: -1,
        lastChop: -1,
        step: "SWAP",
        executing: false,
        monkeyLevel: 0,
        direction: "key.right",
        run() {
            this.enabled = !this.enabled
            if (this.enabled) {
                this.rightClickMethod.setAccessible(true)
                this.leftClickMethod.setAccessible(true)
                this.axeSlot = -1
                this.rodSlot = -1
                this.saplingSlot = -1
                this.boneMealSlot = -1
                this.lastChop = -1
                this.step = "SWAP"
                this.executing = false
                this.direction = "key.right"
            }
            if (this.enabled) ChatLib.chat("&aAutoForaging has been enabled.")
            else ChatLib.chat("&cAutoForaging has been disabled.")
        },
        findSlots() {
            let hotbar = Player.getInventory().getItems().slice(0, 9)
            this.axeSlot = hotbar.findIndex(
                (item) =>
                    item != null && item.getRegistryName().endsWith("_axe")
            )
            if (this.axeSlot == -1) {
                this.enabled = false
                return ChatLib.chat("§cAxe not found.")
            }
            this.rodSlot = hotbar.findIndex(
                (item) =>
                    item != null &&
                    item.getRegistryName() == "minecraft:fishing_rod"
            )
            this.saplingSlot = hotbar.findIndex(
                (item) =>
                    item != null &&
                    stripColor(item.getName()).endsWith("Sapling")
            )
            if (this.saplingSlot == -1) {
                this.enabled = false
                return ChatLib.chat("§cSapling not found.")
            }
            this.boneMealSlot = hotbar.findIndex(
                (item) =>
                    item != null &&
                    stripColor(item.getName()) == "Enchanted Bone Meal"
            )
            if (this.boneMealSlot == -1) {
                this.enabled = false
                return ChatLib.chat("§cEnchanted Bone Meal not found.")
            }
        },
        rightClick() {
            this.rightClickMethod.invoke(Client.getMinecraft())
        },
        leftClick() {
            this.leftClickMethod.invoke(Client.getMinecraft())
        },
        halt() {
            if (!this.enabled) return
            this.run()
        },
        onTick() {
            if (!this.enabled || this.executing) return
            this.findSlots()
            if (!this.enabled) return

            if (
                Player.getInventory()
                    .getStackInSlot(this.saplingSlot)
                    .getStackSize() < 4
            ) {
                this.enabled = false
                return ChatLib.chat("&cNot enough saplings.")
            }

            this.executing = true

            if (this.step == "SWAP" && this.rodSlot == -1) this.step = "PLANT"

            if (this.step == "SWAP") {
                if (Player.getHeldItemIndex() != this.rodSlot)
                    Player.setHeldItemIndex(this.rodSlot)
                setTimeout(() => {
                    this.rightClick()
                    console.log("right click")
                    features.AUTOFORAGING.step = "PLANT"
                    features.AUTOFORAGING.executing = false
                }, 100)
            }
            if (this.step == "PLANT") {
                if (Player.getHeldItemIndex() != this.saplingSlot)
                    Player.setHeldItemIndex(this.saplingSlot)
                setTimeout(() => {
                    this.rightClick()
                    console.log("right click")
                    setTimeout(() => {
                        this.rightClick()
                        console.log("right click")
                        setTimeout(() => {
                            let key = Client.getKeyBindFromDescription(
                                this.direction
                            )
                            if (key == null) return this.halt()
                            let lastPos = {
                                x: Player.getX(),
                                y: Player.getY(),
                                z: Player.getZ()
                            }
                            key.setState(true)
                            console.log("moving")
                            setTimeout(() => {
                                key.setState(false)
                                console.log("moved")
                                this.direction =
                                    this.direction == "key.right"
                                        ? "key.left"
                                        : "key.right"
                                setTimeout(() => {
                                    this.rightClick()
                                    console.log("right click")
                                    setTimeout(() => {
                                        this.rightClick()
                                        console.log("right click")
                                        features.AUTOFORAGING.step = "FERTILIZE"
                                        features.AUTOFORAGING.executing = false
                                    }, 300)
                                }, 300)
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            } else if (this.step == "FERTILIZE") {
                if (Player.getHeldItemIndex() != this.boneMealSlot)
                    Player.setHeldItemIndex(this.boneMealSlot)
                setTimeout(() => {
                    this.rightClick()
                    console.log("right click")
                    features.AUTOFORAGING.step = "CHOP"
                    features.AUTOFORAGING.executing = false
                }, 100)
            } else if (this.step == "CHOP") {
                if (Player.getHeldItemIndex() != this.axeSlot)
                    Player.setHeldItemIndex(this.axeSlot)
                let cooldown = 2000
                if (this.rodSlot != -1 && this.monkeyLevel > 40)
                    cooldown *= 1.2 - this.monkeyLevel / 200
                console.log(cooldown)
                setTimeout(() => {
                    this.leftClick()
                    console.log("left click")
                    setTimeout(() => {
                        features.AUTOFORAGING.lastChop = Date.now()
                        features.AUTOFORAGING.step =
                            features.AUTOFORAGING.rodSlot != -1
                                ? "SWAP"
                                : "PLANT"
                        features.AUTOFORAGING.executing = false
                    }, 150)
                }, Math.max(0, cooldown - (Date.now() - this.lastChop)) + 150)
            }
        },
        onAutoPet(pet, level, rarity) {
            if (pet != "Monkey" || rarity != "6") return
            if (this.monkeyLevel == level) return
            this.monkeyLevel = level
            ChatLib.chat(`&6Monkey &elevel set to &7${level}&e.`)
        }
    },
    ADVERTISING: {
        args: [
            {
                name: "message",
                required: true
            }
        ],
        enabled: false,
        hidden: false,
        message: null,
        profileMessage: false,
        spawnPos: { x: 0, y: 0, z: 0 },
        run(args, rest) {
            this.enabled = !this.enabled
            if (this.enabled) {
                this.message = args.message
                if (rest) this.message += " " + rest
            } else {
                this.message = null
                this.profileMessage = false
            }
            if (this.enabled) ChatLib.chat("&aAdvertising has been enabled.")
            else ChatLib.chat("&cAdvertising has been disabled.")
        },
        onStep() {
            if (!this.enabled) return
            if (this.message == null) return
            if (!this.profileMessage) return
            if (
                Math.sqrt(
                    Math.abs(Player.getX() - this.spawnPos.x) ** 2 +
                        Math.abs(Player.getZ() - this.spawnPos.z) ** 2
                ) < 4
            )
                return

            setTimeout(() => {
                ChatLib.say(this.message)
                features.ADVERTISING.profileMessage = false
            }, Math.floor(Math.random() * (250 - 10 + 1) + 10))
        },
        onChat(message) {
            if (!message.startsWith("You are playing on profile: ")) return
            this.profileMessage = true
            this.onStep()
        },
        onWorldLoad() {
            this.spawnPos = {
                x: Player.getX(),
                y: Player.getY(),
                z: Player.getZ()
            }
        }
    },
    LIBRARIANGRIND: {
        args: [],
        enabled: false,
        hidden: false,
        pingCount: 10,
        pingDelay: 100,
        run() {
            this.enabled = !this.enabled
            if (this.enabled) ChatLib.chat("&aLibrarianGrind has been enabled.")
            else ChatLib.chat("&cLibrarianGrind has been disabled.")
        },
        onChat(message) {
            if (!this.enabled) return
            if (!message.endsWith("has arrived on your Garden!")) return
            let npc = message.split(" ")[0]

            console.log(
                npc != "Librarian",
                TabList.getNames().find((name) =>
                    stripColor(name).trim().endsWith("Queue Full!")
                ) == null
                    ? true
                    : false
            )

            if (
                npc != "Librarian" &&
                TabList.getNames().find((name) =>
                    stripColor(name).trim().endsWith("Queue Full!")
                ) == null
                    ? true
                    : false
            )
                return

            let delay = 0
            for (let i = 0; i < this.pingCount; i++) {
                setTimeout(() => {
                    World.playSound("mob.irongolem.death", 1, 1)
                }, delay)
                delay += this.pingDelay
            }
        }
    },
    BOOKCOMBINER: {
        args: [],
        enabled: true,
        hidden: false,
        colors: [
            [255, 0, 0], // Red
            [255, 127, 0], // Orange
            [255, 255, 0], // Yellow
            [0, 255, 0], // Green
            [0, 255, 255], // Cyan
            [0, 0, 255], // Blue
            [75, 0, 130], // Indigo
            [148, 0, 211], // Violet
            [255, 20, 147], // Pink
            [255, 255, 255] // White
        ],
        run() {
            this.enabled = !this.enabled
            if (this.enabled) ChatLib.chat("&aBookCombiner has been enabled.")
            else ChatLib.chat("&cBookCombiner has been disabled.")
        },
        onRender(slot) {
            if (!this.enabled) return

            let item = slot.getItem()
            if (slot.getItem() == null) return
            if (slot.getItem().getRegistryName() != "minecraft:enchanted_book")
                return

            let nbt = item.getNBT()

            let extra = nbt.get("tag").get("ExtraAttributes")
            if (!extra) return
            if (extra.getString("id") != "ENCHANTED_BOOK") return

            let enchantments = extra.get("enchantments")
            if (!enchantments) return
            if (enchantments.keySet.length != 1) return

            let x = slot.getDisplayX()
            let y = slot.getDisplayY()
            let level = Math.min(
                Math.max(enchantments.getInteger(enchantments.keySet[0]), 1),
                this.colors.length
            )
            let color = this.colors[level - 1]

            new Rectangle(
                Renderer.color(color[0], color[1], color[2], 255),
                x,
                y,
                16,
                16
            ).draw()
        }
    }
}

function stripColor(str) {
    return str.replace(/§[a-fA-F0-9kKlLmMnNoOrR]/g, "")
}
function formatNumber(n) {
    if (!isNaN(n.toString()) && n.toString() !== "Infinity") {
        let parts = n.toString().split(".")
        let number = parts[0].split("").reverse().join("")
        let offset = 0
        for (let i = 0; i < number.length; i++) {
            if (i > 0 && i < number.length - offset && i % 3 === 0) {
                number =
                    number.substring(0, i + offset) +
                    "," +
                    number.substring(i + offset)
                offset += 1
            }
        }
        number = number.split("").reverse().join("")
        if (parts.length > 1) {
            number += "." + parts[1].substring(0, 1)
        }
        return number
    }
    return n.toString()
}
function generateTimerString(i) {
    if (i < 0) {
        i = 0
    }
    let hours = Math.floor(i / 3600)
    let minutes = Math.floor(i / 60) - hours * 60
    let seconds = i - hours * 3600 - minutes * 60
    let string = ""
    if (hours > 0) {
        string += hours + "h"
    }
    if (minutes > 0 || hours > 0 || (minutes > 0 && hours > 0)) {
        string += minutes + "m"
    }
    string += seconds + "s"
    return string
}
function setDisplayPosition(display, x, y) {
    if (display instanceof Text) {
        display.setX(x)
        display.setY(y)
    } else if (display instanceof Display) {
        display.setRenderLoc(x, y)
    }
    if (x < Renderer.screen.getWidth() / 2) {
        display.setAlign("left")
    } else if (x > Renderer.screen.getWidth() / 2) {
        display.setAlign("right")
    } else {
        display.setAlign("center")
    }
}
function getUsage(feature) {
    let subcommand = features[feature.toUpperCase()]
    let args = ""
    for (let i = 0; i < subcommand.args.length; i++) {
        let arg = subcommand.args[i]
        if (arg.required) {
            args += "§e<"
        } else {
            args += "§8["
        }
        args += arg.name
        if (arg.required) {
            args += ">"
        } else {
            args += "]"
        }
        if (i < subcommand.args.length - 1) {
            args += " "
        }
    }
    return "§7/omniutilities " + feature.toLowerCase() + " " + args
}
function levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1)
        .fill(null)
        .map(() => Array(str1.length + 1).fill(null))
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator // substitution
            )
        }
    }
    return track[str2.length][str1.length]
}

register("gameLoad", () => {
    for (let featureName in features) {
        let feature = features[featureName]
        if (feature.hasOwnProperty("setup")) feature.setup()
    }
})
register("messageSent", (message, event) => {
    let parts = message.split(" ")
    if (
        parts[0] === "/omniutilities" ||
        parts[0] === "/ou" ||
        parts[0] === "/omniutils"
    ) {
        if (parts.length > 1) {
            subcommandName = parts[1].toUpperCase()
            if (features.hasOwnProperty(subcommandName)) {
                let subcommand = features[subcommandName]
                let requiredArgs = 0
                for (let i = 0; i < subcommand.args.length; i++) {
                    arg = subcommand.args[i]
                    if (arg.required) {
                        requiredArgs += 1
                    }
                }
                if (parts.length >= 2 + requiredArgs) {
                    let args = {}
                    let rest = ""
                    for (let i = 2; i < parts.length; i++) {
                        let arg = subcommand.args[i - 2]
                        if (arg != null) args[arg.name] = parts[i]
                        else rest += " " + parts[i]
                    }
                    subcommand.run(args, rest.substring(1))
                } else {
                    ChatLib.chat("§cUse: " + getUsage(subcommandName) + "§c.")
                }
            } else {
                ChatLib.chat(
                    "§cSubcommand not found! Type §7/omniutilities §cto check the available commands."
                )
            }
        } else {
            ChatLib.chat(" ")
            ChatLib.chat(" §5Omni§bUtilities §ecommands:")
            for (subcommandName in features) {
                if (
                    !features[subcommandName].hasOwnProperty("hidden") ||
                    !features[subcommandName].hidden
                ) {
                    ChatLib.chat("  §b→ " + getUsage(subcommandName))
                }
            }
            ChatLib.chat(" ")
        }
        Client.getMinecraft()
            .field_71456_v.func_146158_b()
            .func_146239_a(message)
        cancel(event)
    }
})

register("messageSent", (message, event) => {
    features.TEXTMACROS.onMessageSent(message, event)
})
register("renderOverlay", () => {
    features.LOBBYTIMER.onRender()
    features.GEMSTONETRACKER.onRender()
})
register("renderSlot", (slot, gui, e) => {
    features.BOOKCOMBINER.onRender(slot)
})
register("soundPlay", (position, name, volume, pitch, category, event) => {
    features.BREAKTIME.onSoundPlay(
        position,
        name,
        volume,
        pitch,
        category,
        event
    )
    features.AUTOFISHING.onSoundPlay(
        position,
        name,
        volume,
        pitch,
        category,
        event
    )
})
register("clicked", (x, y, button, pressed) => {
    features.AUTOFARMING.halt()
    features.AUTOFORAGING.halt()
    features.BREAKTIME.onClick(x, y, button, pressed)
})
register("tick", (elapsed) => {
    features.SCOREBOARDFIX.onTick()
    features.AUTOFARMING.onTick(elapsed)
    features.AUTOFORAGING.onTick(elapsed)
})
register("step", (steps) => {
    features.COLLECTOR.onStep(steps)
    features.GEMSTONETRACKER.onStep(steps)
    features.ADVERTISING.onStep(steps)
}).setDelay(1)
register("worldUnload", () => {
    features.AUTOFARMING.halt()
    features.AUTOFORAGING.halt()
    features.GEMSTONETRACKER.onWorldUnload()
})
register("worldLoad", () => {
    features.ADVERTISING.onWorldLoad()
})
register("guiOpened", () => {
    features.AUTOFARMING.halt()
    features.AUTOFORAGING.halt()
})
register("guiClosed", () => {
    features.NPCSELL.onGUIClosed()
})
register("postGuiRender", () => {
    features.NPCSELL.onPostGUIRender()
    features.BAZAARACTION.onPostGUIRender()
    features.GARDENVISITORS.onPostGUIRender()
})
register("chat", (level, rarity, pet) => {
    pet = rarity.slice(1) + pet
    level = Number.parseInt(level)
    rarity = rarity.slice(0, 1)
    features.AUTOFORAGING.onAutoPet(pet, level, rarity)
}).setCriteria(
    "&cAutopet &eequipped your &7[Lvl ${level}] &${rarity}${pet}&e! &a&lVIEW RULE&r"
)
register("chat", (message) => {
    features.ADVERTISING.onChat(message)
    features.LIBRARIANGRIND.onChat(message)
}).setCriteria("${message}")
