import Feature from "../util/Feature";
import {getHypixelData} from "../util/ItemManager";
import {ATTRIBUTES} from "../util/Constants";
import Settings from "../settings/Settings";

export default class AttributeViewer extends Feature {
    constructor() {
        super("Attribute Viewer");
    }

    renderItemIntoGui(item, x, y) {
        if (!Settings.attributeViewer_Enabled) return
        const data = getHypixelData(item)
        if (!data) return
        if (Settings.attributeViewer_OnlyAH) {
            const inv = Player.getContainer()
            const name = inv.getName()
            if (!name.startsWith("Auctions:") && !name.startsWith("You "))
                return;
        }
        if (Settings.attributeViewer_ShardEnabled && getHypixelData(item)?.id === "ATTRIBUTE_SHARD") {
            const attribute = Object.keys(data.attributes)[0].toUpperCase()
            const attributeAbbr = ATTRIBUTES[attribute]?.abbr || "???"
            const attributeLevel = Object.values(getHypixelData(item).attributes)[0]
            Renderer.translate(0, 0, 275)
            Renderer.scale(0.7)
            Renderer.drawString(`&b${attributeAbbr}`, x / .7, y / .7, true)
            Renderer.translate(0, 0, 275)
            Renderer.drawString(`&c${attributeLevel}`, (x + 16 - Renderer.getStringWidth(attributeLevel)), (y + 8), false)
        } else if (Settings.attributeViewer_OtherEnabled && data.attributes && Object.values(data.attributes).length === 2) {
            const attributeLevels = Object.values(data.attributes)
            const firstLevel = attributeLevels[0]
            const secondLevel = attributeLevels[1]
            Renderer.translate(0, 0, 275)
            Renderer.scale(0.7)
            Renderer.drawString(`&b${firstLevel}`, x / .7, y / .7, true)
            Renderer.translate(0, 0, 275)
            Renderer.scale(0.7)
            Renderer.drawString(`&b${secondLevel}`, x / .7, y / .7 + 10 / .7, true)
        }
    }
}