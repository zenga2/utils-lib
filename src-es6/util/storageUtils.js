const defaultModule = 'ld'
const storageKey = 'ldPraviteStorage'

class StorageUtil {
    constructor(storageType) {
        this.storageType = storageType
        this.init()
    }

    init() {
        this.loadData()
    }

    setItem(key, val, module) {
        module = module || defaultModule
        this.data[module] = this.data[module] || {}
        this.data[module][key] = val;

        this.cache()
    }

    getItem(key, module) {
        let data = this.data
        module = module || defaultModule
        return data[module] && data[module][key]
    }

    cache() {
        let storageType = this.storageType
        try {
            window[this.storageType].setItem(storageKey, JSON.stringify(data))
        } catch (e) {
            new Error('Your browser does not support ' + storageType)
        }
    }

    loadData() {
        let storageType = this.storageType
        let str;

        try {
            str = window[this.storageType].getItem(storageKey)
        } catch (e) {
            new Error('Your browser does not support ' + storageType)
        }

        if (!str) {
            this.data = {[defaultModule]: {}}
            this.cache()
        } else {
            this.data = JSON.parse(str)
        }
    }
}

export {StorageUtil}
