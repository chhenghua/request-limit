
'use strict'

class MemoryStore {
    constructor() {
        this.store = {}
    }
    async hget(hashKey, field) {
        if (!this.store[hashKey]) {
            return 0
        }
        return this.store[hashKey][field] || 0
    }
    async hincrby(hashKey, field, value) {
        if (!this.store[hashKey]) {
            this.store[hashKey] = {}
            this.store[hashKey][field] = 0
        }
        if (!this.store[hashKey[field]]) {
            this.store[hashKey[field]] = 0
        }
        this.store[hashKey][field] += value
    }
    async del(hashKey) {
        delete this.store[hashKey]
    }
}

module.exports = MemoryStore
