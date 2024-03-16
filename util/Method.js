import {ITEM_RARITIES} from "./Constants";

export function stripColor(str) {
    return str.replace(/§[a-fA-F0-9kKlLmMnNoOrR]/g, "");
}

export function generateTimerString(i) {
    if (i < 0) {
        i = 0;
    }
    let hours = Math.floor(i / 3600);
    let minutes = Math.floor(i / 60) - hours * 60;
    let seconds = i - hours * 3600 - minutes * 60;
    let string = "";
    if (hours > 0) {
        string += hours + "h";
    }
    if (minutes > 0 || hours > 0 || (minutes > 0 && hours > 0)) {
        string += minutes + "m";
    }
    string += seconds + "s";
    return string;
}

export function findItemType(item) {
    if (!item) return
    let lore = item.getLore()
    if (!lore) return
    const itemTypeLine = lore
        .map(stripColor)
        .map(line => line.startsWith("a ") && line.endsWith(" a") ? line.slice(2, -2) : line)
        .find(line => ITEM_RARITIES.includes(line.split(" ")[0]))
    if (!itemTypeLine) return
    return itemTypeLine.split(" ").slice(1).join(" ")
}

export function findItemRarity(item) {
    if (!item) return
    let lore = item.getLore()
    if (!lore) return
    const itemTypeLine = lore
        .map(stripColor)
        .map(line => line.startsWith("a ") && line.endsWith(" a") ? line.slice(2, -2) : line)
        .find(line => ITEM_RARITIES.includes(line.split(" ")[0]))
    if (!itemTypeLine) return
    return itemTypeLine.split(" ")[0]
}

export function findArea() {
    try {
        if (!TabList || !TabList.getNames()) return undefined
        if (TabList.getNames().length < 42) return undefined
        let currentLocation = stripColor(TabList.getNames()[21])
        if (!currentLocation.startsWith("Area: "))
            currentLocation = stripColor(TabList.getNames()[41])
        return currentLocation.replace("Area: ", "")
    } catch (err) {
        return undefined
    }
}

export function checkArea(area) {
    return findArea() === area;
}