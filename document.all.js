const v8 = require('v8');
const vm = require('vm');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext('%GetUndetectable()');
v8.setFlagsFromString('--no-allow-natives-syntax');
function HTMLAllCollection(){
    return undetectable
}
Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: {
        value: 'HTMLAllCollection',
        configurable: true
    }
});
undetectable.__proto__ = HTMLAllCollection.prototype
console.log(typeof undetectable, !!undetectable, undetectable + '')
console.log(undetectable)
document = {
    all: new HTMLAllCollection()
}
document.all[0] = 111

console.log(document.all)
console.log(document.all(0))
console.log(document.all[0])
console.log(typeof document.all, !!document.all, document.all + '')


