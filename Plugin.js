const SymbolToStringTag = Symbol.toStringTag;
const SymbolIterator = Symbol.iterator;
const Enumerable = {
    enumerable: true
}


let native_func = [];
(() => {
    const oldCall = Function.prototype.call;
    const nativeToStringFunctionString = Error.toString().replace(
        /Error/g,
        'toString'
    );
    const oldToString = Function.prototype.toString;

    function call() {
        return oldCall.apply(this, arguments);
    }

    Function.prototype.call = call;

    function functionToString() {
        if (native_func.includes(this)) {
            if (this.name.indexOf('Symbol') >= 0) {
                return `function values() { [native code] }`
            }
            return `function ${this.name}() { [native code] }`;
        }
        if (this === functionToString) {
            return nativeToStringFunctionString;
        }
        return oldCall.call(oldToString, this);
    }

    Function.prototype.toString = functionToString

})()

function native_prototype_get_and_set(obj) {
    native_func.push(obj)
    let descriptors = Object.getOwnPropertyDescriptors(obj.prototype)
    for (let key in descriptors) {
        let descriptor = descriptors[key]
        if (descriptor.get) {
            native_func.push(descriptor.get)
        }
        if (descriptor.set) {
            native_func.push(descriptor.set)
        }
        if (descriptor.value) {
            native_func.push(descriptor.value)
        }
    }
    let symbols = Object.getOwnPropertySymbols(obj.prototype)
    for (let key in symbols) {
        const symbol = symbols[key]
        const values = obj.prototype[symbol]
        if (typeof values === 'function') {
            native_func.push(values)
        }

    }
}


let new_MimeType = true

class MimeType {
    #description
    #suffixes
    #type
    #enabledPlugin

    constructor(description, suffixes, type, enabledPlugin) {
        if (!new_MimeType) {
            throw new TypeError("Illegal constructor");
        }
        this.#description = description
        this.#suffixes = suffixes
        this.#type = type
        this.#enabledPlugin = enabledPlugin
    }

    get description() {
        return this.#description
    }

    get suffixes() {
        return this.#suffixes
    }

    get type() {
        return this.#type
    }

    get enabledPlugin() {
        return this.#enabledPlugin
    }

}

Object.defineProperties(
    MimeType,
    {
        argument: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        },
        caller: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        }
    },
)

Object.defineProperties(
    MimeType.prototype,
    {
        [SymbolToStringTag]: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 'MimeType',
        },
        description: Enumerable,
        enabledPlugin: Enumerable,
        suffixes: Enumerable,
        type: Enumerable,
    },
)
native_prototype_get_and_set(MimeType)


let new_Plugin = true

class Plugin {
    #description
    #filename
    #length
    #name
    #mimetypes = []

    static #rexAllDigits = /^\d+$/;
    static #contactProxyHandlers = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value) {
            if (typeof key !== 'symbol' && Plugin.#rexAllDigits.test(key)) {
                Reflect.set(target.#mimetypes, key, value);
            }
            return Reflect.set(target, key, value);
        }
    };
    static #proxyTargets = new WeakMap();

    constructor(description, filename, length, name) {
        if (!new_Plugin) {
            throw new TypeError("Illegal constructor");
        }
        this.#description = description
        this.#filename = filename
        this.#length = length
        this.#name = name
        const p = new Proxy(this, Plugin.#contactProxyHandlers);
        Plugin.#proxyTargets.set(p, this);
        return p;
    }


    item(index) {
        if (Plugin.#rexAllDigits.test(index) && index >= 4294967296) {
            index = index - 4294967296
        }
        const item = this[index]
        if (item) {
            return item
        }
        return null
    }

    namedItem(type) {
        const item = this[type]
        if (item) {
            return item
        }
        return null
    }

    get description() {
        return Plugin.#proxyTargets.get(this).#description
    }

    get filename() {
        return Plugin.#proxyTargets.get(this).#filename
    }

    get length() {
        return Plugin.#proxyTargets.get(this).#length
    }

    get name() {
        return Plugin.#proxyTargets.get(this).#name
    }

    [SymbolIterator]() {
        return Plugin.#proxyTargets.get(this).#mimetypes[Symbol.iterator]()
    }

}

Object.defineProperties(
    Plugin,
    {
        argument: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        },
        caller: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        }
    },
)

Object.defineProperties(
    Plugin.prototype,
    {
        [SymbolToStringTag]: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 'Plugin',
        },
        description: Enumerable,
        filename: Enumerable,
        item: Enumerable,
        length: Enumerable,
        name: Enumerable,
        namedItem: Enumerable,
    },
)

native_prototype_get_and_set(Plugin)


let new_PluginArray = true

class PluginArray {
    #plugins = []

    static #rexAllDigits = /^\d+$/;
    static #contactProxyHandlers = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value) {
            if (typeof key !== 'symbol' && PluginArray.#rexAllDigits.test(key)) {
                Reflect.set(target.#plugins, key, value);
            }
            return Reflect.set(target, key, value);
        }
    };
    static #proxyTargets = new WeakMap();

    constructor() {
        if (!new_PluginArray) {
            throw new TypeError("Illegal constructor");
        }
        const p = new Proxy(this, PluginArray.#contactProxyHandlers);
        PluginArray.#proxyTargets.set(p, this);
        return p;
    }

    item(index) {
        if (PluginArray.#rexAllDigits.test(index) && index >= 4294967296) {
            index = index % 4294967296
        }
        const item = this[index]
        if (item) {
            return item
        }
        return null
    }

    namedItem(name) {
        const item = this[name]
        if (item) {
            return item
        }
        return null
    }

    refresh() {
    }

    get length() {
        return PluginArray.#proxyTargets.get(this).#plugins.length
    }

    [SymbolIterator]() {
        return PluginArray.#proxyTargets.get(this).#plugins[Symbol.iterator]()
    }

}

Object.defineProperties(
    PluginArray,
    {
        argument: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        },
        caller: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        }
    },
)
Object.defineProperties(
    PluginArray.prototype,
    {
        [SymbolToStringTag]: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 'PluginArray',
        },
        item: Enumerable,
        namedItem: Enumerable,
        referer: Enumerable,
        length: Enumerable,
    },
)
native_prototype_get_and_set(PluginArray)


let new_MimeTypeArray = true

class MimeTypeArray {
    #mimeTypes = []

    static #rexAllDigits = /^\d+$/;
    static #contactProxyHandlers = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value) {
            if (typeof key !== 'symbol' && MimeTypeArray.#rexAllDigits.test(key)) {
                Reflect.set(target.#mimeTypes, key, value);
            }
            return Reflect.set(target, key, value);
        }
    };
    static #proxyTargets = new WeakMap();

    constructor() {
        if (!new_MimeTypeArray) {
            throw new TypeError("Illegal constructor");
        }
        const p = new Proxy(this, MimeTypeArray.#contactProxyHandlers);
        MimeTypeArray.#proxyTargets.set(p, this);
        return p;
    }

    item(index) {
        if (MimeTypeArray.#rexAllDigits.test(index) && index >= 4294967296) {
            index = index - 4294967296
        }
        const item = this[index]
        if (item) {
            return item
        }
        return null
    }

    namedItem(name) {
        const item = this[name]
        if (item) {
            return item
        }
        return null
    }

    get length() {
        return MimeTypeArray.#proxyTargets.get(this).#mimeTypes.length
    }

    [SymbolIterator]() {
        return MimeTypeArray.#proxyTargets.get(this).#mimeTypes[Symbol.iterator]()
    }

}

Object.defineProperties(
    MimeTypeArray,
    {
        argument: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        },
        caller: {
            value: null,
            writable: false,
            enumerable: false,
            configurable: false
        }
    },
)
Object.defineProperties(
    MimeTypeArray.prototype,
    {
        [SymbolToStringTag]: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 'MimeTypeArray',
        },
        item: Enumerable,
        namedItem: Enumerable,
        length: Enumerable,
    },
)
native_prototype_get_and_set(MimeTypeArray)

function getMimeTypes() {
    let mimeTypes = new MimeTypeArray()
    let plugin = new Plugin("Portable Document Format", "internal-pdf-viewer", 2, "PDF Viewer")
    let mimetype0 = new MimeType("Portable Document Format", "pdf", "application/pdf", plugin)
    let mimetype1 = new MimeType("Portable Document Format", "pdf", "text/pdf", plugin)
    mimeTypes[0] = mimetype0
    mimeTypes[1] = mimetype1
    mimeTypes[mimetype0.type] = mimetype0
    mimeTypes[mimetype1.type] = mimetype1
    return mimeTypes
}

mimeTypes = getMimeTypes()

function getPlugins() {
    const plugin_name = [
        "PDF Viewer", "Chrome PDF Viewer", "Chromium PDF Viewer",
        "Microsoft Edge PDF Viewer", "WebKit built-in PDF"
    ]
    let plugins = new PluginArray()
    for (let index = 0; index < plugin_name.length; ++index) {
        const name = plugin_name[index]
        let plugin = new Plugin("Portable Document Format", "internal-pdf-viewer", 2, name)
        let mimetype0 = new MimeType("Portable Document Format", "pdf", "application/pdf", plugin)
        let mimetype1 = new MimeType("Portable Document Format", "pdf", "text/pdf", plugin)
        plugin[0] = mimetype0
        plugin[1] = mimetype1
        plugin[mimetype0.type] = mimetype0
        plugin[mimetype1.type] = mimetype1
        plugins[index] = plugin
        plugins[plugin.name] = plugin
    }
    return plugins
}

plugins = getPlugins()

// let mimetype0 = new MimeType("Portable Document Format", "pdf", "application/pdf")
// let mimetype1 = new MimeType("Portable Document Format", "pdf", "text/pdf")
//
// console.log(Object.getOwnPropertySymbols(MimeType))
// console.log(Object.getOwnPropertyDescriptors(MimeType))
// console.log(Object.getOwnPropertyNames(MimeType))
//
// console.log(Object.getOwnPropertySymbols(MimeType.prototype))
// console.log(Object.getOwnPropertyDescriptors(MimeType.prototype))
// console.log(Object.getOwnPropertyNames(MimeType.prototype))
//
// console.log(MimeType.toString())
// console.log(MimeType.toString.toString())
// console.log(Object.getOwnPropertyDescriptors(MimeType.prototype).type.get.toString())
// console.log(plugins)
// console.log(plugins.length)
// console.log(plugins.namedItem(''))
// console.log(plugins.namedItem('Chromium PDF Viewer'))
// console.log(plugins.item('Chromium PDF Viewer'))
// console.log(plugins.item(0))
// console.log(plugins.item(4294967296))

console.log(mimeTypes)
console.log(mimeTypes.length)

