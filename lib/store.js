
'use strict'

// const MemoryStore = require('./memory_store')
const redisStore = require('./redis')

class Store {
    constructor(options) {
        this.client = redisStore(options)
    }
    async genKey(key, interval) {
        // const hashKey = key + ':' + Math.floor(Date.now() / interval / 1000)
        // console.log('hashKey@@@@@@@@@@@@@@@@@@@@@@@')
        // console.log(hashKey)
        return key
    }
    async ready() {
        return new Promise((resolve, reject) => {
            this.client.on('ready', (err) => {
                if (err) {
                    console.warn('redis error: ', err.message)
                    reject(err)
                } else {
                    console.log('redis success!!!')
                    resolve(this.client)
                }
            })
        })
    }
    async getTimes({key, interval}) {
        const hashKey = await this.genKey(key, interval)
        const times = await this.client.redisGet(hashKey)
        return parseInt(times || '0', 10)
    }
    async record({key, interval}) {
        const hashKey = await this.genKey(key, interval)
        try {
            const times = await this.client.redisGet(hashKey)
            if (!times) {
                await this.client.redisSet(hashKey, '0')
                await this.client.redisExpire(hashKey, interval)
            }
            await this.client.redisIncrby(hashKey, 1)
            return this.client.redisGet(key)
        } catch (err) {
            console.warn('record error: ', err.message)
        }
    }
    async del(key) {
        await this.client.redisDel(key)
    }
}

module.exports = Store
