
'use strict'

const Redis = require('redis')
// const bluebird = require('bluebird')
// bluebird.promisifyAll(Redis.createClient.prototype)
// bluebird.promisifyAll(Redis.Multi.prototype)


class redis {
    constructor(client) {
        this.client = client
    }
    async redisGet(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisExpire(key, interval) {
        return new Promise((resolve, reject) => {
            this.client.expire(key, interval, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisDel(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisTtl(key) {
        return new Promise((resolve, reject) => {
            this.client.ttl(key, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisSet(key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisIncrby(key, value) {
        return new Promise((resolve, reject) => {
            this.client.incrby(key, value, (err, rlt) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rlt)
                }
            })
        })
    }
    async redisReady() {
        return new Promise((resolve, reject) => {
            this.client.on('ready', (err) => {
                if (err) {
                    console.warn('redis error: ', err.message)
                    reject(err)
                } else {
                    console.log('redis success!!!')
                    resolve(client)
                }
            })
        })
    }
}

module.exports = (options) => {
    return new redis(Redis.createClient(options.client))
}
