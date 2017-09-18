# 通过redis缓存实现token对url的访问频率控制

### 安装
```bash
$ npm install request-limit
```

### 初始化
```js
const limit = require('request-limit')
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
```
#### 其中，后面的参数为多少秒内访问多少次

### 使用
```js
const limitRlt = await limit.checkLimit('token', 'url.post')
await limit.record('token', 'url.post')

```