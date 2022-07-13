const v8 = require('v8');
const vm = require('vm');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext('%GetUndetectable()');
v8.setFlagsFromString('--no-allow-natives-syntax');
function HTMLAllCollection(){}
Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: {
        value: 'HTMLAllCollection',
        configurable: true
    }
});
undetectable.__proto__ = HTMLAllCollection.prototype
console.log(typeof undetectable, !!undetectable, undetectable + '')
console.log(undetectable)


