
'use strict'

const MemoryStore = require('./memory_store')

class Store {
    constructor(options) {
        this.client = options.client || new MemoryStore()
        this.ttl = options.ttl
        this.token = options.token
    }
    async genKey() {
        return this.token + ':' + Math.floor(Date.now() / this.ttl / 1000)
    }
    async get(url) {
        const hashKey = await this.genKey()
        const times = await this.client.hget(hashKey, url)
        return parseInt(times || '0', 10)
    }
    async record(url) {
        const hashKey = await this.genKey()
        try {
            await this.client.hincrby(hashKey, url, 1)
            if (this.currentHashKey !== hashKey) {
                if (this.client.expire) {
                    await this.client.expire(hashKey, this.ttl)
                } else {
                    await this.client.del(this.currentHashKey)
                }
                this.currentHashKey = hashKey
            }
        } catch (err) {
            console.warn('record error: ', err.message)
        }
    }
}

module.exports = Store
