
'use strict'

const Store = require('./store')
const mapchecker = require('./mapchecker')

const defaultOptions = {
    interval: 60 * 60 * 24,
    limit: 1000,
    whiteList: [],
    token: 'request-limit',
    message: 'request frequency limited'
}

let store
let urlMap
let whiteList

exports.init = (map, options) => {
    if ([...map.keys()].length === 0) {
        map = new Map()
    }
    urlMap = map
    options = options || {}
    for (let key in defaultOptions) {
        if (!options[key]) {
            options[key] = defaultOptions[key]
        }
    }
    store = new Store({
        client: options.store
    })
    // ;(async function (){
    //     await store.ready()
    // })()
    // 检查whiteList
    whiteList = options.whiteList || defaultOptions.whiteList
}

exports.checkLimit = async (token, url) => {

    // 检查whiteList
    const isWhiteList = mapchecker.check(url, whiteList)
    if (isWhiteList) {
        return {
            isLimit: false,
            isWhiteList: true
        }
    }

    const key = `${url}_${token}`
    let limitMap = urlMap.get(url)
    if (!limitMap) {
        limitMap = {}
    }
    const limit = limitMap.limit || defaultOptions.limit
    const interval = limitMap.interval || defaultOptions.interval

    let times
    try {
        times = await store.getTimes({key, interval, limit})
    } catch (err) {
        console.warn('get from store error: ', err.message)
        return {
            isLimit: false
        }
    }

    const now = Date.now()
    const delta = interval - (now % interval)
    const remaining = Math.max(limit - times - 1, 0)

    if (times >= limit) {
        return {
            isLimit: true,
            limit,
            remaining: remaining,
            errmsg: defaultOptions.message,
            retry: delta / 1000 | 0
        }
    } else {
        return {
            isLimit: false,
            limit,
            remaining,
        }
    }
}

exports.record = async (token, url) => {
    const key = `${url}_${token}`
    let limitMap = urlMap.get(url)
    if (!limitMap) {
        limitMap = {}
    }
    const interval = limitMap.interval || defaultOptions.interval
    return await store.record({key, url, interval})
}
