export default class Feature {
    constructor(name) {
        this.name = name
        this.id = name.toLowerCase().replace(" ", "_")
    }

    withModifiers(func, modifiers) {
        func.modifiers = modifiers || {};
        return func;
    }
}