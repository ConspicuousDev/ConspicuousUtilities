import {@Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color} from "Vigilance";

@Vigilant("ConspicuousUtilities", "Conspicuous Utilities")
class Settings {
    @SwitchProperty({
        name: "Enable Harp Solver",
        description: "Toggles the Harp Solver feature.",
        category: "Harp Solver"
    })
    harpSolver_Enabled = false

    @SwitchProperty({
        name: "Enable Auto Fishing",
        description: "Toggles the Auto Fishing feature.",
        category: "Auto Fishing"
    })
    autoFishing_Enabled = false

    @SwitchProperty({
        name: "Enable Attribute Viewer",
        description: "Toggles the Attribute Viewer feature.",
        category: "Attribute Viewer"
    })
    attributeViewer_Enabled = false

    @SwitchProperty({
        name: "Enable for Attribute Shards",
        description: "Toggles the Attribute Viewer feature on Attribute Shards.",
        category: "Attribute Viewer"
    })
    attributeViewer_ShardEnabled = false

    @SwitchProperty({
        name: "Enable for other items",
        description: "Toggles the Attribute Viewer feature on all items that have attributes.",
        category: "Attribute Viewer"
    })
    attributeViewer_OtherEnabled = false

    @SwitchProperty({
        name: "Enable only in Auction House",
        description: "With this enabled, this feature will only work when a trading menu is opened (e.g: AH, /trade, etc).",
        category: "Attribute Viewer"
    })
    attributeViewer_OnlyAH = false

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();