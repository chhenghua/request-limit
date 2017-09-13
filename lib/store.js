
'use strict'

const MemoryStore = require('./memory_store')

class Store {
    constructor(options) {
        this.client = options.client || new MemoryStore()
        this.ttl = options.ttl
        this.token = options.token
        this.url = options.url
    }
    async genKey() {
        return this.token + ':' + this.url // Math.floor(Date.now() / this.ttl / 1000)
    }
    async get() {
        const hashKey = await this.genKey()
        console.log('hashKey@@@@@'.repeat(10))
        console.log(hashKey)
        const times = await this.client.get(hashKey)
        return parseInt(times || '0', 10)
    }
    async record() {
        const hashKey = await this.genKey()
        console.log('hashKeyRecord!!!!!!'.repeat(20))
        console.log(hashKey)
        try {
            await this.client.incrby(hashKey, 1)
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
