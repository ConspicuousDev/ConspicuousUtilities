import Feature from "../util/Feature";
import Settings from "../settings/Settings";
import {ITEM_RARITIES} from "../util/Constants";
import {findItemRarity} from "../util/Method";

export default class RarityDisplay extends Feature {
    constructor() {
        super("Rarity Display");
    }

    renderItemIntoGui(item, x, y) {
        if (!Settings.rarityDisplay_Enabled) return
        const itemRarity = findItemRarity(item)
        if (ITEM_RARITIES.indexOf(itemRarity) === -1) return
        let color = undefined
        switch (itemRarity) {
            case "COMMON":
                color = Settings.rarityDisplay_ColorCommon
                break
            case "UNCOMMON":
                color = Settings.rarityDisplay_ColorUncommon
                break
            case "RARE":
                color = Settings.rarityDisplay_ColorRare
                break
            case "EPIC":
                color = Settings.rarityDisplay_ColorEpic
                break
            case "LEGENDARY":
                color = Settings.rarityDisplay_ColorLegendary
                break
            case "MYTHIC":
                color = Settings.rarityDisplay_ColorMythic
                break
            case "DIVINE":
                color = Settings.rarityDisplay_ColorDivine
                break
            case "SPECIAL":
                color = Settings.rarityDisplay_ColorSpecial
                break
            case "VERY SPECIAL":
                color = Settings.rarityDisplay_ColorVerySpecial
                break
            case "ADMIN":
                color = Settings.rarityDisplay_ColorAdmin
                break
        }
        if (!color) return
        switch (Settings.rarityDisplay_Style) {
            case 0:
                Renderer.drawRect(Renderer.color(color.getRed(), color.getGreen(), color.getBlue(), Settings.rarityDisplay_Opacity), x, y, 16, 16)
                break
            case 1:
                Renderer.drawCircle(Renderer.color(color.getRed(), color.getGreen(), color.getBlue(), Settings.rarityDisplay_Opacity), x + 8, y + 8, 8, 32)
                break
            case 2:
                Renderer.drawCircle(Renderer.color(color.getRed(), color.getGreen(), color.getBlue(), Settings.rarityDisplay_Opacity), x + 8, y + 8, 8, 8)
                break
            case 3:
                Renderer.drawCircle(Renderer.color(color.getRed(), color.getGreen(), color.getBlue(), Settings.rarityDisplay_Opacity), x + 8, y + 8, 8, 6)
                break
            case 4:
                Renderer.drawCircle(Renderer.color(color.getRed(), color.getGreen(), color.getBlue(), Settings.rarityDisplay_Opacity), x + 8, y + 8, 8, 4)
                break
        }
    }
}