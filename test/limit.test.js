
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
    console.log('rlt@@@@@@@@@@'.repeat(10))
    console.log(rlt)
    await limit.record('token111', '/api/user/getList')
    return rlt
}

const testMethod = () => {
    return (async () => {
        await method()
    })
}

// testMethod()
// testMethod()
// testMethod()
// testMethod()
// testMethod()

;(async () => {
    await method()
})()
// ;(async () => {
//     await method()
// })()
// ;(async () => {
//     await method()
// })()
// ;(async () => {
//     await method()
// })()
