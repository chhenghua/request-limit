
'use strict'

exports.check = (url, map) => {
    const isExists = map.find((n) => url === n)
    return !!isExists
}
