import Feature from "../util/Feature";
import Settings from "../settings/Settings";

export default class HarpSolver extends Feature {
    constructor() {
        super("Harp Solver");
        this.packetReceived = this.withModifiers(this.packetReceived, {
            setFilteredClasses: [Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")]
        })
        this.guiClosed()
    }

    packetReceived(packet, event) {
        if (!Settings.harpSolver_Enabled) return
        let inv = Player.getOpenedInventory()
        if (inv == null) return
        if (!inv.toString().includes("Harp - ")) return
        const item = packet.func_149174_e()
        const name = item ? item.toString() : ""
        const slot = packet.func_149173_d()
        if (name.includes("quartzBlock")) {
            if (inv.getStackInSlot(slot - 18).getID() === 35)
                this.doubleSlot = slot - 9
            inv.click(slot, false, "MIDDLE")
        } else if (this.doubleSlot > -1 && slot === this.doubleSlot) {
            this.doubleSlot = -1
            inv.click(slot + 9, false, "MIDDLE")
        }
    }

    guiClosed() {
        this.doubleSlot = -1
    }
}