
'use strict'

const limit = require('../index')
const Koa = require('koa')
const request = require('supertest')
const http = require('http')

let app = new Koa()

const hello = async () => {
    this.body = 'hello'
}

app.use(limit({
    token: `koa-limit: ${process.pid}`,
    interval: 2000,
    limit: 1
}))

app.use((ctx) => {
    ctx.body = 'hello'
})

app = http.createServer(app.callback())

describe('test/limit.test.js', function() {
    describe('MemoryStore', function() {
        it('should request 200', function(done) {
            request(app)
            .get('/')
            .expect('X-RateLimit-Limit', '1')
            .expect('X-RateLimit-Remaining', '0')
            .expect('hello')
            .expect(200, done)
        })
    })
})
