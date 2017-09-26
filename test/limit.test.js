
'use strict'

const limit = require('../index')

const urlMap = new Map()
urlMap.set('/api/user/getList.get', {limit: 2, interval: 20})
urlMap.set('/api/user/add.post', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne.get', {limit: 2, interval: 2})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

const method = async (req) => {
    const token = req.header.Authrozation
    const url = `${req.url}.${req.method.toLowerCase()}`
    const rlt = await limit.checkLimit(token, url)
    await limit.record(token, url)
    return rlt
}

return (async () => {
    const rlt = await method()
    console.log(rlt)
})()
