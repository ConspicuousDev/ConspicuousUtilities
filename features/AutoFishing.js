import Feature from "../util/Feature";
import Settings from "../settings/Settings";
import {findItemType, stripColor} from "../util/Method";
import {ITEM_RARITIES} from "../util/Constants";

export default class AutoFishing extends Feature {
    constructor() {
        super("Auto Fishing");
        this.rightClickMethod = Java.type("net.minecraft.client.Minecraft").class.getDeclaredMethod("func_147121_ag");
        this.halt = false
    }

    getPlayerBobber() {
        let bobber = null;
        const bobbers = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.projectile.EntityFishHook").class)
        for (let i = 0; i < bobbers.length; i++) {
            let entity = bobbers[i]
            if (entity.getEntity().field_146042_b == Player.getPlayer()) {
                bobber = entity;
                break;
            }
        }
        return bobber
    }

    fish() {
        if (!Settings.autoFishing_Enabled) return
        if (!this.isHoldingFishingRod()) return
        this.rightClickMethod.setAccessible(true)
        this.rightClickMethod.invoke(Client.getMinecraft())
    }

    isHoldingFishingRod() {
        return findItemType(Player.getHeldItem()) === "FISHING ROD"
    }

    tick() {
        if (!Settings.autoFishing_Enabled) return
        if (this.halt) return
        const bobber = this.getPlayerBobber()
        if (!bobber) return;
        const armorStands = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class)
        for (let i = 0; i < armorStands.length; i++) {
            let entity = armorStands[i]
            if (entity.getPos().distance(bobber.getPos()) < 2 && stripColor(entity.getName()) === "!!!") {
                this.halt = true
                setTimeout(() => {
                    this.fish()
                    setTimeout(() => {
                        this.fish()
                        this.halt = false
                    }, 1000 + Math.floor(Math.random() * 101))
                }, 200 + Math.floor(Math.random() * 51))
            }
        }
    }
}