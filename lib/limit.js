
'use strict'

const Store = require('./store')
const mapchecker = require('./mapchecker')

const defaultOptions = {
    interval: 1000 * 60 * 60 * 24,
    limit: 1000,
    whiteList: [],
    token: 'request-limit',
    message: 'request frequency limited'
}

module.exports = (options) => {
    options = options || {}
    for (let key in defaultOptions) {
        if (!options[key]) {
            options[key] = defaultOptions[key]
        }
    }

    const store = new Store({
        client: options.store,
        ttl: options.interval / 1000,
        token: options.token
    })
    const whiteList = options.whiteList
    return async (req, next) => {
        const url = this.url
        if (!url) {
            await next
        }

        if (mapchecker.check(url, whiteList)) {
            return await next
        }

        let times
        try {
            times = await store.get(url)
        } catch (err) {
            console.warn('get from store error: ', err.message)
            return await next
        }
        const now = Date.now()
        const delta = options.interval - (now % options.interval)
        const reset = (now + delta) / 1000 | 0
        const remaining = Math.max(options.limit - times - 1, 0)

        // this.set('X-RateLimit-Limit', options.limit)
        // this.set('X-RateLimit-Remaining', remaining)
        // this.set('X-RateLimit-Reset', reset)

        console.log('options.limit####################')
        console.log(options.limit)
        console.log(remaining)

        if (times > options.limit) {
            this.set('Retry-After', delta / 1000 | 0)
            this.status = 429
            this.body = options.message
            return
        }
        await next
        await store.record(url)
    }
    // return limit
}
