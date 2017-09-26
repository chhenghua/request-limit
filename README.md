通过redis缓存实现token对url的访问频率控制

#### token可为登录用户的ticket

### 安装
```bash
$ npm install request-limit
```

### 初始化
```js
const limit = require('request-limit')
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
```
#### 其中，后面的参数为多少秒内访问多少次
#### 如果不在urlMap里面设置，则使用默认配置24小时内访问1000次
#### 在白名单中的url不受限制

### 使用
```js
const limitRlt = await limit.checkLimit('token', 'url.post')
await limit.record('token', 'url.post')

```