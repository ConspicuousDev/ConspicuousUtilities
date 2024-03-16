import HarpSolver from "./features/HarpSolver";
import {ALLOWED_TRIGGERS} from "./util/Constants";
import * as AutoUpdater from "./util/AutoUpdater";
import Settings from "./settings/Settings";
import AutoFishing from "./features/AutoFishing";
import AttributeViewer from "./features/AttributeViewer";
import DeveloperTools from "./features/DeveloperTools";
import RarityDisplay from "./features/RarityDisplay";
import AutoFarming from "./features/AutoFarming";
import GardenMap from "./features/GardenMap";

if (Settings.autoUpdater_Enabled)
    try {
        AutoUpdater.setup()
    } catch (err) {
        console.error("Unable to run the auto updater: ", err)
    }

const FEATURES = [
    new HarpSolver(),
    new AutoFishing(),
    new AttributeViewer(),
    new DeveloperTools(),
    new RarityDisplay(),
    new AutoFarming(),
    new GardenMap()
].map((feature) => {
    const triggers = []
    ALLOWED_TRIGGERS.forEach(allowedTrigger => {
        Object.getOwnPropertyNames(Object.getPrototypeOf(feature))
            .filter((key) => key.startsWith(allowedTrigger) && typeof feature[key] === "function")
            .forEach((key) => {
                const trigger = register(allowedTrigger, feature[key].bind(feature))
                if (feature[key].modifiers)
                    for (let modifier in feature[key].modifiers)
                        trigger[modifier](feature[key].modifiers[modifier])
                if (!triggers.includes(allowedTrigger))
                    triggers.push(allowedTrigger)
            })
    })
    console.log(`Successfully registered feature ${feature.name} (${triggers.join(", ")}).`)
    return feature
})

const COMMAND_STRUCTURE = {
    settings: () => {
        Settings.openGUI()
    }/*FEATURES.map(feature => [
        feature.id,
        () => {
            Settings.openGUI(feature.name)
            ChatLib.chat(`&aYou opened the settings page for feature &b${feature.name}&a.`)
        }
    ]).reduce((obj, [key, val]) => {
        obj[key] = val
        return obj
    }, {})*/,
    version: () => {
        ChatLib.chat("&aYou are using &5Conspicuous&bUtilities &6v0.1&a.")
    }
}

register("command", (...params) => runCommand(COMMAND_STRUCTURE, params))
    .setTabCompletions((params) => getPossibleCompletions(COMMAND_STRUCTURE, params))
    .setName("conspicuousutilities")
    .setAliases("conspicousutils", "cu", "conspicuous")

function runCommand(structure, params) {
    if (typeof structure === "function")
        return handleCommandOutput(structure(...params))
    const param = params.shift()
    if (structure.hasOwnProperty(param))
        return runCommand(structure[param], params)
    else return ChatLib.chat(`&cThe ${param ? "parameter &7" + param : "command"} &cwas not found. &cTry one of the following parameters: &7${Object.keys(structure).join("&c, &7")}&c.`)
}

function getPossibleCompletions(structure, params) {
    const param = params.shift()
    if (!param)
        return Object.keys(structure)
    if (structure.hasOwnProperty(param))
        return getPossibleCompletions(structure[param], params)
    return []
}

function handleCommandOutput(output) {
    if (typeof output === "string")
        return ChatLib.chat(output)
}