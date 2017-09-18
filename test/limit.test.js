
'use strict'

const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')

const limit = require('../index')

const urlMap = new Map()
urlMap.set('/api/user/getList', {limit: 2, interval: 20})
urlMap.set('/api/user/add', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne', {limit: 2, interval: 2})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

const method = async () => {
    const rlt = await limit.checkLimit('token111', '/api/user/getList')
    await limit.record('token111', '/api/user/getList')
    return rlt
}

return (async () => {
    const rlt = await method()
    console.log(rlt)
})()
