import Feature from "../util/Feature";
import Settings from "../settings/Settings";
import {checkArea, stripColor} from "../util/Method";

export default class GardenMap extends Feature {
    constructor() {
        super("Garden Map");
        this.step = this.withModifiers(this.step, {
            setDelay: .3
        })
        this.gardenSize = 5
        this.basePlot = {
            name: "?",
            color: Renderer.color(0, 255, 0),
            pests: false
        }
        this.plots = {
            "0x0": {
                name: "21"
            },
            "1x0": {
                name: "13"
            },
            "2x0": {
                name: "9"
            },
            "3x0": {
                name: "14"
            },
            "4x0": {
                name: "22"
            },
            "0x1": {
                name: "15"
            },
            "1x1": {
                name: "5"
            },
            "2x1": {
                name: "1"
            },
            "3x1": {
                name: "6"
            },
            "4x1": {
                name: "16"
            },
            "0x2": {
                name: "10"
            },
            "1x2": {
                name: "2"
            },
            "2x2": {
                name: "H",
                color: Renderer.color(255, 255, 0)
            },
            "3x2": {
                name: "3"
            },
            "4x2": {
                name: "11"
            },
            "0x3": {
                name: "17"
            },
            "1x3": {
                name: "7"
            },
            "2x3": {
                name: "4"
            },
            "3x3": {
                name: "8"
            },
            "4x3": {
                name: "18"
            },
            "0x4": {
                name: "23"
            },
            "1x4": {
                name: "19"
            },
            "2x4": {
                name: "12"
            },
            "3x4": {
                name: "20"
            },
            "4x4": {
                name: "24"
            }
        }
    }

    renderHotbar() {
        if (!Settings.gardenMap_Enabled) return
        if (!checkArea("Garden")) return

        for (let x = 0; x < this.gardenSize; x++) {
            for (let y = 0; y < this.gardenSize; y++) {
                let plot = {...this.basePlot}
                if (this.plots.hasOwnProperty(`${x}x${y}`))
                    plot = Object.assign(plot, {...this.plots[`${x}x${y}`]})
                Renderer.scale(1)
                Renderer.drawRect(plot.pests ? Renderer.color(255, 0, 0) : plot.color, x * 11, y * 11, 10, 10)
                if (Settings.gardenMap_ShowPlotNames) {
                    Renderer.scale(.5)
                    Renderer.drawString(plot.name, (x * 11 + 5) * (1 / .5) - (Renderer.getStringWidth(plot.name) / 2), (y * 11 + 5) * (1 / .5) - 4, true)
                }
                Renderer.scale(1)
            }
        }

        let xPercent = (100 * (Player.getX() + 240)) / 479
        let zPercent = (100 * (Player.getZ() + 240)) / 479
        let xPos = (xPercent * (this.gardenSize * 11 - 1)) / 100
        let zPos = (zPercent * (this.gardenSize * 11 - 1)) / 100
        Renderer.drawCircle(Renderer.color(70, 130, 180), xPos, zPos, 1, 8)
    }

    step() {
        if (!Settings.gardenMap_Enabled) return
        if (!Settings.gardenMap_ShowInfestedPlots) return
        if (!checkArea("Garden")) return

        let line = TabList.getNames().find(message => stripColor(message).startsWith(" Plots: "))
        let infestedPlots = []
        if (line) {
            line = stripColor(line)
            infestedPlots = line.replace(" Plots: ", "").split(", ").map(plot => parseInt(plot))
        }
        Object.entries(this.plots).forEach(([key, plot]) => plot.pests = infestedPlots.some(infestedPlot => parseInt(plot.name) === infestedPlot))
    }
}