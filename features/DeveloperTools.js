import Feature from "../util/Feature";
import Settings from "../settings/Settings";
import {getData} from "../util/ItemManager";

export default class DeveloperTools extends Feature {
    constructor() {
        super("Developer Tools");
        this.command_NBTDump = this.withModifiers(this.command_NBTDump, {
            setName: "nbtdump"
        })
    }

    command_NBTDump() {
        const item = Player.getHeldItem()
        if (!item) return ChatLib.chat("&cYou need to hold an item to use this command.")
        const nbt = getData(item)
        if (!nbt) return ChatLib.chat("&cCould not find any NBT data in the held item.")
        ChatLib.command("ct copy " + JSON.stringify(nbt, null, 4), true)
        ChatLib.chat("&aItem NBT dumped into your clipboard.")
    }
}