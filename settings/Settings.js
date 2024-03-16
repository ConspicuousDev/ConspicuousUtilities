import {
    @Vigilant,
    @TextProperty,
    @ColorProperty,
    @ButtonProperty,
    @SwitchProperty,
    @SelectorProperty,
    @SliderProperty,
    Color
} from "Vigilance";

@Vigilant("ConspicuousUtilities", "Conspicuous Utilities")
class Settings {
    @SwitchProperty({
        name: "Enable Harp Solver",
        description: "Toggles the Harp Solver feature.",
        category: "Harp Solver"
    })
    harpSolver_Enabled = false;

    @SwitchProperty({
        name: "Enable Auto Fishing",
        description: "Toggles the Auto Fishing feature.",
        category: "Auto Fishing"
    })
    autoFishing_Enabled = false;

    @SwitchProperty({
        name: "Enable Attribute Viewer",
        description: "Toggles the Attribute Viewer feature.",
        category: "Attribute Viewer"
    })
    attributeViewer_Enabled = false;

    @SwitchProperty({
        name: "Enable for Attribute Shards",
        description: "Toggles the Attribute Viewer feature on Attribute Shards.",
        category: "Attribute Viewer"
    })
    attributeViewer_ShardEnabled = false;

    @SwitchProperty({
        name: "Enable for other items",
        description: "Toggles the Attribute Viewer feature on all items that have attributes.",
        category: "Attribute Viewer"
    })
    attributeViewer_OtherEnabled = false;

    @SwitchProperty({
        name: "Enable only in Auction House",
        description: "With this enabled, this feature will only work when a trading menu is opened (e.g: AH, /trade, etc).",
        category: "Attribute Viewer"
    })
    attributeViewer_OnlyAH = false;

    @SwitchProperty({
        name: "Enable Auto Updater",
        description: "With this enabled, the module will try to auto update on ChatTrigger reload (/ct reload).",
        category: "Developer Tools"
    })
    autoUpdater_Enabled = false;

    @SwitchProperty({
        name: "Enable Rarity Display",
        description: "Toggles the Rarity Display feature.",
        category: "Rarity Display"
    })
    rarityDisplay_Enabled = false;

    @SelectorProperty({
        name: "Style",
        description: "Pick the rarity overlay style.",
        category: "Rarity Display",
        options: [
            "Square",
            "Circle",
            "Octagon",
            "Hexagon",
            "Diamond"
        ]
    })
    rarityDisplay_Style = 0;

    @SliderProperty({
        name: "Opacity",
        description: "Set the rarity overlay opacity.",
        category: "Rarity Display",
        min: 0,
        max: 255
    })
    rarityDisplay_Opacity = 255;

    @ColorProperty({
        name: "COMMON",
        description: "Pick the overlay color for the COMMON rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorCommon = new Color(255, 255, 255);
    rarityDisplay_ColorCommon = Color.WHITE;

    @ColorProperty({
        name: "UNCOMMON",
        description: "Pick the overlay color for the UNCOMMON rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorUncommon = new Color(85, 255, 85);
    rarityDisplay_ColorUncommon = Color.GREEN;

    @ColorProperty({
        name: "RARE",
        description: "Pick the overlay color for the RARE rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorRare = new Color(85, 85, 255);
    rarityDisplay_ColorRare = Color.BLUE;

    @ColorProperty({
        name: "EPIC",
        description: "Pick the overlay color for the EPIC rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorEpic = new Color(170, 0, 170);
    rarityDisplay_ColorEpic = Color.MAGENTA;

    @ColorProperty({
        name: "LEGENDARY",
        description: "Pick the overlay color for the LEGENDARY rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorLegendary = new Color(255, 170, 0);
    rarityDisplay_ColorLegendary = Color.ORANGE;

    @ColorProperty({
        name: "MYTHIC",
        description: "Pick the overlay color for the MYTHIC rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorMythic = new Color(255, 85, 255);
    rarityDisplay_ColorMythic = Color.PINK;

    @ColorProperty({
        name: "DIVINE",
        description: "Pick the overlay color for the DIVINE rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorDivine = new Color(85, 255, 255);
    rarityDisplay_ColorDivine = Color.CYAN;

    @ColorProperty({
        name: "SPECIAL",
        description: "Pick the overlay color for the SPECIAL rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorSpecial = new Color(255, 85, 85);
    rarityDisplay_ColorSpecial = Color.RED;

    @ColorProperty({
        name: "VERY SPECIAL",
        description: "Pick the overlay color for the VERY SPECIAL rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorVerySpecial = new Color(255, 85, 85);
    rarityDisplay_ColorVerySpecial = Color.RED;

    @ColorProperty({
        name: "ADMIN",
        description: "Pick the overlay color for the ADMIN rarity.",
        category: "Rarity Display",
        subcategory: "Colors"
    })
        // rarityDisplay_ColorAdmin = new Color(170, 0, 0);
    rarityDisplay_ColorAdmin = Color.RED;

    @SwitchProperty({
        name: "Enable Auto Farming",
        description: "Toggles the Auto Farming feature.",
        category: "Auto Farming"
    })
    autoFarming_Enabled = false;

    @SwitchProperty({
        name: "Auto Restart",
        description: "Automatically run /warp garden when reaching the maximum amount of cycles specified.",
        category: "Auto Farming"
    })
    autoFarming_AutoRestart = true;

    @SwitchProperty({
        name: "Garden Only",
        description: "Halts the script whenever outside of Garden.",
        category: "Auto Farming"
    })
    autoFarming_GardenOnly = true;

    @SwitchProperty({
        name: "Location Sensitive",
        description: "Halts the script if a sudden change in coordinates is detected.",
        category: "Auto Farming"
    })
    autoFarming_LocationSensitive = true;

    @SwitchProperty({
        name: "Yaw/Pitch Sensitive",
        description: "Halts the script if yaw or pitch is changed.",
        category: "Auto Farming"
    })
    autoFarming_YawPitchSensitive = true;

    @SliderProperty({
        name: "Change Directions Threshold",
        description: "Set the amount of ticks the player must be still for the script to change directions.",
        category: "Auto Farming",
        min: 2,
        max: 20
    })
    autoFarming_ChangeDirectionsThreshold = 2;

    @SliderProperty({
        name: "Start Delay",
        description: "Delay (in milliseconds) from /autofarming to the actual script start.",
        category: "Auto Farming",
        min: 0,
        max: 10000,
        increment: 500
    })
    autoFarming_StartDelay = 0;

    /*@SwitchProperty({
        name: "Yaw/Pitch Protection",
        description: "Opens chat GUI to prevent mouse movements from affecting your angle.",
        category: "Auto Farming",
    })
    autoFarming_YawPitchProtection = true;*/

    @SwitchProperty({
        name: "Enable Garden Map",
        description: "Toggles the Garden Map feature.",
        category: "Garden Map"
    })
    gardenMap_Enabled = true;

    @SwitchProperty({
        name: "Show Plot Names",
        description: "Toggles the showing plot names on the map.",
        category: "Garden Map"
    })
    gardenMap_ShowPlotNames = true;

    @SwitchProperty({
        name: "Show Infested Plots",
        description: "Toggles the showing infested plots on the map.",
        category: "Garden Map"
    })
    gardenMap_ShowInfestedPlots = true;

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();