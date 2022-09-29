// by:余半盏
/*
step:
    npm install -g node-gyp
    node-gyp configure
    node-gyp build
*/
const Demo = require('./build/Release/test')
let all = new Demo()

function HTMLAllCollection() {
    return all
}

Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: {
        value: 'HTMLAllCollection',
        configurable: true
    }
});
all.__proto__ = HTMLAllCollection.prototype
all[0] = 1
all[1] = {}
all['test'] = []
console.log(typeof all, !!all, all + '')
console.log(all)
console.log(all[0], all[1])
console.log(all("test"), all(0), all(1), all("0"), all("1"))
console.log(all(), all({}))
console.log(all('fun'))
