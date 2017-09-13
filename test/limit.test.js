
'use strict'

const limit = require('../index')

// describe('test/limit.test.js', function() {
//     describe('MemoryStore', function() {
//         it('should request 200', async function(done) {
//             console.log(await limit.checkLimit({
//                 limit: 10,
//                 interval: 200000
//             }, 'token111', '/api/user/getList'))
//             await limit.record()
//         })
//     })
// })

const method = async () => {
    const rlt = await limit.checkLimit({
        limit: 10,
        interval: 200000
    }, 'token111', '/api/user/getList')
    await limit.record()
    console.log(rlt)
}

method()
method()
method()
method()
method()
