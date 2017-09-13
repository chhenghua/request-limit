
'use strict'

class MemoryStore {
    constructor() {
        this.store = {}
    }
    async get(hashKey) {
        console.log('this.store{}...........')
        console.log(this.store)
        if (!this.store[hashKey]) {
            return 0
        }
        return this.store[hashKey] || 0
    }
    async incrby(hashKey, value) {
        if (!this.store[hashKey]) {
            this.store[hashKey] = 0
        }
        this.store[hashKey] += value
    }
    async del(hashKey) {
        delete this.store[hashKey]
    }
}

module.exports = MemoryStore
