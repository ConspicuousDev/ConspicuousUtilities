import HarpSolver from "./features/HarpSolver";
import {ALLOWED_TRIGGERS} from "./util/Constants";

const FEATURES = [new HarpSolver()].map((feature) => {
    const triggers = []
    ALLOWED_TRIGGERS.forEach(allowedTrigger => {
        if (allowedTrigger in feature && typeof feature[allowedTrigger] === "function") {
            const triggerFunction = feature[allowedTrigger]
            const trigger = register(allowedTrigger, triggerFunction.bind(feature))
            if (triggerFunction.modifiers)
                for (let property in triggerFunction.modifiers)
                    trigger[property](triggerFunction.modifiers[property])
            triggers.push(allowedTrigger)
        }
    })
    console.log(`Successfully registered feature ${feature.name} (${triggers.join(", ")}).`)
    return feature
})

const COMMAND_STRUCTURE = {
    settings: FEATURES.map(feature => [
        feature.id,
        () => {
            ChatLib.chat(`&aYou selected the feature: &b${feature.name}`)
        }
    ]).reduce((obj, [key, val]) => {
        obj[key] = val
        return obj
    }, {}),
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