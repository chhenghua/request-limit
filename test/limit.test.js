
'use strict'

const limit = require('../index')

const urlMap = new Map()
urlMap.set('/api/user/getList.get', {limit: 2, interval: 20})
urlMap.set('/api/user/add.post', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne.get', {limit: 2, interval: 2})

// 白名单
const whiteList = []
whiteList.push('/api/login.post')

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    },
    whiteList
})

const method = async (req) => {
    // const token = req.header.Authrozation
    // const url = `${req.url}.${req.method.toLowerCase()}`
    const rlt = await limit.checkLimit('token111', '/api/login.get')
    await limit.record('token111', '/api/login.get')
    return rlt
}

return (async () => {
    const rlt = await method()
    console.log(rlt)
})()
