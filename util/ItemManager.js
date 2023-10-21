export function getData(item) {
    return item.getNBT()?.toObject()
}

export function getHypixelData(item) {
    return getData(item)?.tag?.ExtraAttributes
}