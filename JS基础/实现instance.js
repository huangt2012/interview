function myInstanceOf(value, target) {
    if (typeof value !== "object" || value === null) return false
    let proto = Object.getPrototypeOf(value)
    while (true) {
        if (proto === null) return false
        if (proto === target.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}