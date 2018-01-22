
'use strict'

exports.check = (url, map) => {
    const isExists = map.indexOf(url)
    return isExists !== -1
}
