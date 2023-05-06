
require("./rs_env3");

const fs = require('fs');
// const fetch = require('node-fetch');        //  npm install node-fetch@2 -g

const {promisify} = require('util');
const readFile = promisify(fs.readFile);


function get_Ym90a2V5_cookie(global_bWFua2V5, useragent) {
    // const get_Ym90a2V5_cookie = async () => {
    // var global_Ym90a2V5 = '';

    try {
        const lOfflineAudioContext = (typeof OfflineAudioContext !== 'undefined' ? OfflineAudioContext : (typeof webkitOfflineAudioContext !== 'undefined' ? webkitOfflineAudioContext : undefined));
        let wasm;

        const heap = new Array(32).fill(undefined);

        heap.push(undefined, null, true, false);

        function getObject(idx) {
            return heap[idx];
        }

        let heap_next = heap.length;

        function dropObject(idx) {
            if (idx < 36) return;
            heap[idx] = heap_next;
            heap_next = idx;
        }

        function takeObject(idx) {
            const ret = getObject(idx);
            dropObject(idx);
            return ret;
        }

        const cachedTextDecoder = new TextDecoder('utf-8', {ignoreBOM: true, fatal: true});

        cachedTextDecoder.decode();

        let cachedUint8Memory0 = new Uint8Array();

        function getUint8Memory0() {
            if (cachedUint8Memory0.byteLength === 0) {
                cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
            }
            return cachedUint8Memory0;
        }

        function getStringFromWasm0(ptr, len) {
            var getStringFromWasm0_result = cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
            // if(getStringFromWasm0_result == 'canvas'){
            //     debugger;
            // }
            // console.log('getStringFromWasm0_result---', getStringFromWasm0_result);
            return getStringFromWasm0_result
            // return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
        }

        function addHeapObject(obj) {
            if (heap_next === heap.length) heap.push(heap.length + 1);
            const idx = heap_next;
            heap_next = heap[idx];

            heap[idx] = obj;
            return idx;
        }

        function isLikeNone(x) {
            return x === undefined || x === null;
        }

        let cachedFloat64Memory0 = new Float64Array();

        function getFloat64Memory0() {
            if (cachedFloat64Memory0.byteLength === 0) {
                cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
            }
            return cachedFloat64Memory0;
        }

        let cachedInt32Memory0 = new Int32Array();

        function getInt32Memory0() {
            if (cachedInt32Memory0.byteLength === 0) {
                cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
            }
            return cachedInt32Memory0;
        }

        function debugString(val) {
            const type = typeof val;
            if (type == 'number' || type == 'boolean' || val == null) {
                return `${val}`;
            }
            if (type == 'string') {
                return `"${val}"`;
            }
            if (type == 'symbol') {
                const description = val.description;
                if (description == null) {
                    return 'Symbol';
                } else {
                    return `Symbol(${description})`;
                }
            }
            if (type == 'function') {
                const name = val.name;
                if (typeof name == 'string' && name.length > 0) {
                    return `Function(${name})`;
                } else {
                    return 'Function';
                }
            }
            // objects
            if (Array.isArray(val)) {
                const length = val.length;
                let debug = '[';
                if (length > 0) {
                    debug += debugString(val[0]);
                }
                for (let i = 1; i < length; i++) {
                    debug += ', ' + debugString(val[i]);
                }
                debug += ']';
                return debug;
            }
            // Test for built-in
            const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
            let className;
            if (builtInMatches.length > 1) {
                className = builtInMatches[1];
            } else {
                // Failed to match the standard '[object ClassName]'
                return toString.call(val);
            }
            if (className == 'Object') {
                // we're a user defined class or Object
                // JSON.stringify avoids problems with cycles, and is generally much
                // easier than looping through ownProperties of `val`.
                try {
                    return 'Object(' + JSON.stringify(val) + ')';
                } catch (_) {
                    return 'Object';
                }
            }
            // errors
            if (val instanceof Error) {
                return `${val.name}: ${val.message}\n${val.stack}`;
            }
            // TODO we could test for more things here, like `Set`s and `Map`s.
            return className;
        }

        let WASM_VECTOR_LEN = 0;

        const cachedTextEncoder = new TextEncoder('utf-8');

        const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
            ? function (arg, view) {
                return cachedTextEncoder.encodeInto(arg, view);
            }
            : function (arg, view) {
                const buf = cachedTextEncoder.encode(arg);
                view.set(buf);
                return {
                    read: arg.length,
                    written: buf.length
                };
            });

        function passStringToWasm0(arg, malloc, realloc) {

            if (realloc === undefined) {
                const buf = cachedTextEncoder.encode(arg);
                const ptr = malloc(buf.length);
                getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
                WASM_VECTOR_LEN = buf.length;
                return ptr;
            }

            let len = arg.length;
            let ptr = malloc(len);

            const mem = getUint8Memory0();

            let offset = 0;

            for (; offset < len; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }

            if (offset !== len) {
                if (offset !== 0) {
                    arg = arg.slice(offset);
                }
                ptr = realloc(ptr, len, len = offset + arg.length * 3);
                const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
                const ret = encodeString(arg, view);

                offset += ret.written;
            }

            WASM_VECTOR_LEN = offset;
            return ptr;
        }

        function makeClosure(arg0, arg1, dtor, f) {
            const state = {a: arg0, b: arg1, cnt: 1, dtor};
            const real = (...args) => {
                // First up with a closure we increment the internal reference
                // count. This ensures that the Rust closure environment won't
                // be deallocated while we're invoking it.
                state.cnt++;
                try {
                    return f(state.a, state.b, ...args);
                } finally {
                    if (--state.cnt === 0) {
                        wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
                        state.a = 0;

                    }
                }
            };
            real.original = state;

            return real;
        }

        function __wbg_adapter_30(arg0, arg1, arg2) {
            wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7e41127fc445d60f(arg0, arg1, addHeapObject(arg2));
        }

        function makeMutClosure(arg0, arg1, dtor, f) {
            const state = {a: arg0, b: arg1, cnt: 1, dtor};

            const real = (...args) => {
                // First up with a closure we increment the internal reference
                // count. This ensures that the Rust closure environment won't
                // be deallocated while we're invoking it.
                state.cnt++;
                const a = state.a;
                state.a = 0;
                try {
                    //  1114480 1056204
                    return f(a, state.b, ...args);  // todo
                }catch (e) {
                    // todo
                } finally {
                    state.a = a;
                    // if (--state.cnt === 0) {
                    //     wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
                    //
                    // } else {
                    //     state.a = a;
                    // }
                }
            };
            real.original = state;

            return real;
        }

        function __wbg_adapter_33(arg0, arg1) {
            wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h289a67615cee70cb(arg0, arg1);
        }

        function __wbg_adapter_36(arg0, arg1, arg2) {
            wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7cac634a5649b33f(arg0, arg1, addHeapObject(arg2));
        }

        /**
         * @returns {Promise<void>}
         */
        // export function main() {
        //     wasm.main();
        // }
        //
        // /**
        // */
        // export function zw_main() {
        //     wasm.zw_main();
        // }

        function handleError(f, args) {
            try {
                return f.apply(this, args);
            } catch (e) {
                wasm.__wbindgen_exn_store(addHeapObject(e));
            }
        }

        function notDefined(what) {
            return () => {
                // throw new Error(`${what} is not defined`);
            };
        }

        function getArrayU8FromWasm0(ptr, len) {
            return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
        }

        let cachedUint32Memory0 = new Uint32Array();

        function getUint32Memory0() {
            if (cachedUint32Memory0.byteLength === 0) {
                cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
            }
            return cachedUint32Memory0;
        }

        function getArrayJsValueFromWasm0(ptr, len) {
            const mem = getUint32Memory0();
            const slice = mem.subarray(ptr / 4, ptr / 4 + len);
            const result = [];
            for (let i = 0; i < slice.length; i++) {
                result.push(takeObject(slice[i]));
            }
            return result;
        }

        let cachedFloat32Memory0 = new Float32Array();

        function getFloat32Memory0() {
            if (cachedFloat32Memory0.byteLength === 0) {
                cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
            }
            return cachedFloat32Memory0;
        }

        function passArrayF32ToWasm0(arg, malloc) {
            const ptr = malloc(arg.length * 4);
            getFloat32Memory0().set(arg, ptr / 4);
            WASM_VECTOR_LEN = arg.length;
            return ptr;
        }

        function __wbg_adapter_223(arg0, arg1, arg2, arg3) {
            wasm.wasm_bindgen__convert__closures__invoke2_mut__haba13db0803fa394(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
        }

        async function load(module, imports) {
            // 读取 wasm 模块文件
            const wasm_buffer = await readFile('./fr6Un8DQah.wasm');

            // 加载 wasm 模块
            module = await WebAssembly.compile(wasm_buffer);
            const instance = await WebAssembly.instantiate(module, imports);

            // return await WebAssembly.instantiateStreaming(module2, imports);

            // web
            // return await WebAssembly.instantiateStreaming(module, imports);

            // const bytes = await module.arrayBuffer();
            // return await WebAssembly.instantiate(bytes, imports);

            //     // const instance = await WebAssembly.instantiate(module, imports);
            if (instance instanceof WebAssembly.Instance) {
                return {instance, module};

            } else {
                return instance;
            }

        }

        function getImports() {
            const imports = {};
            imports.wbg = {};
            imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
                takeObject(arg0);
            };
            imports.wbg.__wbindgen_cb_drop = function (arg0) {
                const obj = takeObject(arg0).original;
                if (obj.cnt-- == 1) {
                    obj.a = 0;
                    return true;
                }
                const ret = false;
                return ret;
            };
            imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
                const ret = getStringFromWasm0(arg0, arg1);
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_number_new = function (arg0) {
                const ret = arg0;
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_number_get = function (arg0, arg1) {
                const obj = getObject(arg1);
                const ret = typeof (obj) === 'number' ? obj : undefined;
                getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
                getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
            };
            imports.wbg.__wbindgen_boolean_get = function (arg0) {
                const v = getObject(arg0);
                const ret = typeof (v) === 'boolean' ? (v ? 1 : 0) : 2;
                return ret;
            };
            imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
                const ret = getObject(arg0);
                return addHeapObject(ret);
                // return 42
            };
            imports.wbg.__wbg_clearTimeout_23ee6db72c0ad922 = typeof clearTimeout == 'function' ? clearTimeout : notDefined('clearTimeout');
            imports.wbg.__wbg_setTimeout_09074a1669d0f224 = function () {
                return handleError(function (arg0, arg1) {
                    const ret = setTimeout(getObject(arg0), arg1);
                    return ret;
                }, arguments)
            };
            imports.wbg.__wbg_crypto_e1d53a1d73fb10b8 = function (arg0) {
                const ret = getObject(arg0).crypto;
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_is_object = function (arg0) {
                const val = getObject(arg0);
                const ret = typeof (val) === 'object' && val !== null;
                return ret;
            };
            imports.wbg.__wbg_process_038c26bf42b093f8 = function (arg0) {
                const ret = getObject(arg0).process;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_versions_ab37218d2f0b24a8 = function (arg0) {
                const ret = getObject(arg0).versions;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_node_080f4b19d15bc1fe = function (arg0) {
                const ret = getObject(arg0).node;
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_is_string = function (arg0) {
                const ret = typeof (getObject(arg0)) === 'string';
                return ret;
            };
            imports.wbg.__wbg_msCrypto_6e7d3e1f92610cbb = function (arg0) {
                const ret = getObject(arg0).msCrypto;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_require_78a3dcfbdba9cbce = function () {
                return handleError(function () {
                    const ret = module.require;
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbindgen_is_function = function (arg0) {
                const ret = typeof (getObject(arg0)) === 'function';
                return ret;
            };
            imports.wbg.__wbg_getRandomValues_805f1c3d65988a5a = function () {
                return handleError(function (arg0, arg1) {
                    getObject(arg0).getRandomValues(getObject(arg1));
                }, arguments)
            };
            imports.wbg.__wbg_randomFillSync_6894564c2c334c42 = function () {
                return handleError(function (arg0, arg1, arg2) {
                    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
                }, arguments)
            };
            imports.wbg.__wbg_log_1f7f93998ab961f7 = function (arg0, arg1) {
                var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
                wasm.__wbindgen_free(arg0, arg1 * 4);
                // console.log(...v0);
            };
            imports.wbg.__wbg_instanceof_Window_acc97ff9f5d2c7b4 = function (arg0) {
                let result;
                try {
                    result = getObject(arg0) instanceof Window;
                } catch {
                    result = false;
                }
                const ret = result;
                return ret;
            };
            imports.wbg.__wbg_document_3ead31dbcad65886 = function (arg0) {
                const ret = getObject(arg0).document;
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_location_8cc8ccf27e342c0a = function (arg0) {
                const ret = getObject(arg0).location;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_navigator_d1dcf282b97e2495 = function (arg0) {
                const ret = getObject(arg0).navigator;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_localStorage_753b6d15a844c3dc = function () {
                return handleError(function (arg0) {
                    const ret = getObject(arg0).localStorage;
                    return isLikeNone(ret) ? 0 : addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_setTimeout_d6fcf0d9067b8e64 = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
                    return ret;
                }, arguments)
            };
            imports.wbg.__wbg_createElement_976dbb84fe1661b5 = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_getChannelData_3cfe9bfecd77d508 = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = getObject(arg1).getChannelData(arg2 >>> 0);
                    const ptr0 = passArrayF32ToWasm0(ret, wasm.__wbindgen_malloc);
                    const len0 = WASM_VECTOR_LEN;
                    getInt32Memory0()[arg0 / 4 + 1] = len0;
                    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                }, arguments)
            };
            imports.wbg.__wbg_setoncomplete_87f637e8a0c106c8 = function (arg0, arg1) {
                getObject(arg0).oncomplete = getObject(arg1);
            };
            imports.wbg.__wbg_destination_29f86740ad21c325 = function (arg0) {
                const ret = getObject(arg0).destination;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_newwithnumberofchannelsandlengthandsamplerate_9eabf08b4a23cf3c = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = new lOfflineAudioContext(arg0 >>> 0, arg1 >>> 0, arg2);
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_startRendering_e57e563fd4a03b01 = function () {
                return handleError(function (arg0) {
                    const ret = getObject(arg0).startRendering();
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_createDynamicsCompressor_cb071abca40f9078 = function () {
                return handleError(function (arg0) {
                    const ret = getObject(arg0).createDynamicsCompressor();
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_createOscillator_d7fe17d591cd147e = function () {
                return handleError(function (arg0) {
                    const ret = getObject(arg0).createOscillator();
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_connect_463d4300ff833991 = function () {
                return handleError(function (arg0, arg1) {
                    const ret = getObject(arg0).connect(getObject(arg1));
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_disconnect_69cf0f001df3dfbf = function () {
                return handleError(function (arg0) {
                    getObject(arg0).disconnect();
                }, arguments)
            };
            imports.wbg.__wbg_instanceof_HtmlCanvasElement_97761617af6ea089 = function (arg0) {
                let result;
                try {
                    // canvas instanceof HTMLCanvasElement;
                    // result = getObject(arg0) instanceof HTMLCanvasElement;
                    result = true;
                } catch {
                    result = false;
                }
                const ret = result;
                return ret;
            };
            imports.wbg.__wbg_setwidth_afb418d3fbf71ba7 = function (arg0, arg1) {
                getObject(arg0).width = arg1 >>> 0;
            };
            imports.wbg.__wbg_setheight_3eb8729b59493242 = function (arg0, arg1) {
                getObject(arg0).height = arg1 >>> 0;
            };
            imports.wbg.__wbg_getContext_4d5e97892c1b206a = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
                    // const ret = getObject(arg0).getContext('2d');   // todo
                    return isLikeNone(ret) ? 0 : addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_toDataURL_a016e9ccc5dcb7ec = function () {
                return handleError(function (arg0, arg1) {
                    // const ret = getObject(arg1).toDataURL();
                    const ret = 'data:image/png;base64,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z7sw/5w/JTOv3pksfCb/WNx9l/lfmzRvjsuVDCFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB4gKTOqAX1/UAAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhGQECv5lQWJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGSAgJ6SV2zCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAaAQG9mlNZlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRKCgjoJXXNJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFqBAT0ak5lUQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAoKSCgl9Q1mwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSqERDQqzmVRQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgpICAXlLXbAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoRkBAr+ZUFiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBkgICekldswkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgGgEBvZpTWZQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIESgoI6CV1zSZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBagQE9GpOZVECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQKCkgoJfUNZsAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhEQ0Ks5lUUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoKSAgF5S12wCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEZAQK/mVBYlQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgZICAnpJXbMJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBoBAb2aU1mUAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBEoKCOgldc0mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWoEBPRqTmVRAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECgpIKCX1DWbAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKoRENCrOZVFCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKCkgIBeUtdsAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhGQECv5lQWJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGSAgJ6SV2zCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAaAQG9mlNZlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRKCgjoJXXNJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFqBAT0ak5lUQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAoKSCgl9Q1mwABAgQIECBAgAABYBf6YgAAAwRJREFUAgQIECBAgAABAgQIECBAgAABAgSqERDQqzmVRQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgpICAXlLXbAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoRkBAr+ZUFiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBkgICekldswkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgGgEBvZpTWZQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIESgoI6CV1zSZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBagQE9GpOZVECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQKCkgoJfUNZsAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhEQ0Ks5lUUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoKSAgF5S12wCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEZAQK/mVBYlQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgZICAnpJXbMJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBoBAb2aU1mUAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBEoKCOgldc0mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWoEBPRqTmVRAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECgpIKCX1DWbAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKoRENCrOZVFCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKCkgIBeUtdsAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhGQECv5lQWJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGSAv8GC+YnbSIbHmgAAAAASUVORK5CYII=';
                    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                    // const len0 = WASM_VECTOR_LEN;    // todo
                    const len0 = 4538;
                    getInt32Memory0()[arg0 / 4 + 1] = len0;
                    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                }, arguments)
            };
            imports.wbg.__wbg_threshold_ab14f1530b0a5d2a = function (arg0) {
                const ret = getObject(arg0).threshold;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_knee_1fe398cecbe44328 = function (arg0) {
                const ret = getObject(arg0).knee;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_ratio_07daf4d1256883c7 = function (arg0) {
                const ret = getObject(arg0).ratio;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_attack_a7b4de3f2c2a3b8f = function (arg0) {
                const ret = getObject(arg0).attack;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_release_223899f643a00b15 = function (arg0) {
                const ret = getObject(arg0).release;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_userAgent_bb45baaf7b7df083 = function () {
                return handleError(function (arg0, arg1) {
                    // const ret = getObject(arg1).userAgent;  // todo userAgent
                    // const ret = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
                    const ret = useragent;
                    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);   // 1114608
                    const len0 = WASM_VECTOR_LEN;
                    getInt32Memory0()[arg0 / 4 + 1] = len0;
                    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                }, arguments)
            };
            imports.wbg.__wbg_style_e9380748cee29f13 = function (arg0) {
                const ret = getObject(arg0).style;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_instanceof_WebGlRenderingContext_09249c25390b881f = function (arg0) {
                let result;
                try {
                    // result = getObject(arg0) instanceof WebGLRenderingContext;
                    result = true;
                } catch {
                    result = false;
                }
                const ret = result;
                return ret;
            };
            imports.wbg.__wbg_canvas_8f90c6f5356d4299 = function (arg0) {
                const ret = getObject(arg0).canvas;
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_bufferData_a33528a74dd300f4 = function (arg0, arg1, arg2, arg3) {
                getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
            };
            imports.wbg.__wbg_attachShader_f4d51147351a1906 = function (arg0, arg1, arg2) {
                getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
            };
            imports.wbg.__wbg_bindBuffer_8b5135aa633680f5 = function (arg0, arg1, arg2) {
                getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
            };
            imports.wbg.__wbg_compileShader_22b038faa1f49857 = function (arg0, arg1) {
                getObject(arg0).compileShader(getObject(arg1));
            };
            imports.wbg.__wbg_createBuffer_6e747d928c9ba46d = function (arg0) {
                const ret = getObject(arg0).createBuffer();
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_createProgram_1c5f8dffd1066e71 = function (arg0) {
                const ret = getObject(arg0).createProgram();
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_createShader_4017d9fbc36659af = function (arg0, arg1) {
                // const ret = getObject(arg0).createShader(arg1 >>> 0);
                const ret = function WebGLShader() {
                };        // todo
                arg1 = 35632;
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_drawArrays_c0dcb4151e0bf007 = function (arg0, arg1, arg2, arg3) {
                getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
            };
            imports.wbg.__wbg_enableVertexAttribArray_3d21f4936ad4a378 = function (arg0, arg1) {
                getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
            };
            imports.wbg.__wbg_getAttribLocation_fcbe16b765cb1de0 = function (arg0, arg1, arg2, arg3) {
                const ret = getObject(arg0).getAttribLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
                return ret;
            };
            imports.wbg.__wbg_getProgramInfoLog_e47d5073d57fb18d = function (arg0, arg1, arg2) {
                const ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
                var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len0 = WASM_VECTOR_LEN;
                getInt32Memory0()[arg0 / 4 + 1] = len0;
                getInt32Memory0()[arg0 / 4 + 0] = ptr0;
            };
            imports.wbg.__wbg_getProgramParameter_eaf768a9b399b7cf = function (arg0, arg1, arg2) {
                // const ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
                // todo
                const ret = true;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_getShaderInfoLog_ec7e5b959e47645b = function (arg0, arg1, arg2) {
                const ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
                var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                var len0 = WASM_VECTOR_LEN;
                getInt32Memory0()[arg0 / 4 + 1] = len0;
                getInt32Memory0()[arg0 / 4 + 0] = ptr0;
            };
            imports.wbg.__wbg_getShaderParameter_42a35b974329561c = function (arg0, arg1, arg2) {
                // const ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0); // todo
                const ret = true;
                arg1 = 46;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_getUniformLocation_8e9cc276a231ddcd = function (arg0, arg1, arg2, arg3) {
                const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            };
            imports.wbg.__wbg_linkProgram_25cda5f9318ea316 = function (arg0, arg1) {
                getObject(arg0).linkProgram(getObject(arg1));
            };
            imports.wbg.__wbg_shaderSource_a0001b8eab5d44f4 = function (arg0, arg1, arg2, arg3) {
                arg1 = 46;
                arg2 = 1052022;
                arg3 = 152; // todo
                getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
            };
            imports.wbg.__wbg_uniform2f_5dde40744c44a350 = function (arg0, arg1, arg2, arg3) {
                getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
            };
            imports.wbg.__wbg_useProgram_156511a425feb519 = function (arg0, arg1) {
                getObject(arg0).useProgram(getObject(arg1));
            };
            imports.wbg.__wbg_vertexAttribPointer_63d2aef49627302b = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
                getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
            };
            imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_ff80c06d296e3622 = function (arg0) {
                let result;
                try {
                    result = getObject(arg0) instanceof CanvasRenderingContext2D;
                } catch {
                    result = false;
                }
                const ret = result;
                return ret;
            };
            imports.wbg.__wbg_setglobalCompositeOperation_ab45d05cd8734f9f = function () {
                return handleError(function (arg0, arg1, arg2) {
                    getObject(arg0).globalCompositeOperation = getStringFromWasm0(arg1, arg2);
                }, arguments)
            };
            imports.wbg.__wbg_setfillStyle_53ccf2a9886c1c4d = function (arg0, arg1) {
                getObject(arg0).fillStyle = getObject(arg1);
            };
            imports.wbg.__wbg_setfont_f55835290596888e = function (arg0, arg1, arg2) {
                getObject(arg0).font = getStringFromWasm0(arg1, arg2);
            };
            imports.wbg.__wbg_settextBaseline_d33235cd2782235c = function (arg0, arg1, arg2) {
                getObject(arg0).textBaseline = getStringFromWasm0(arg1, arg2);  // 'alphabetic'
            };
            imports.wbg.__wbg_beginPath_4e91b7092d0d33d9 = function (arg0) {
                getObject(arg0).beginPath();
            };
            imports.wbg.__wbg_fill_8ec436f419a0d161 = function (arg0) {
                getObject(arg0).fill();
            };
            imports.wbg.__wbg_fill_0c6aae5469e3c0aa = function (arg0, arg1) {
                getObject(arg0).fill(takeObject(arg1));
            };
            imports.wbg.__wbg_isPointInPath_a6a87e66851e27ff = function (arg0, arg1, arg2, arg3) {
                const ret = getObject(arg0).isPointInPath(arg1, arg2, takeObject(arg3));
                return ret;
            };
            imports.wbg.__wbg_arc_43853d8e932e9473 = function () {
                return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
                    getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5, arg6 !== 0);
                }, arguments)
            };
            imports.wbg.__wbg_closePath_d0ab75d4def749a2 = function (arg0) {
                getObject(arg0).closePath();
            };
            imports.wbg.__wbg_rect_c3233c6225b67fbc = function (arg0, arg1, arg2, arg3, arg4) {
                getObject(arg0).rect(arg1, arg2, arg3, arg4);
            };
            imports.wbg.__wbg_fillRect_c7a19e13c5242507 = function (arg0, arg1, arg2, arg3, arg4) {
                getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
            };
            imports.wbg.__wbg_fillText_e5b1cef36b742bcc = function () {
                return handleError(function (arg0, arg1, arg2, arg3, arg4) {
                    getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
                }, arguments)
            };
            imports.wbg.__wbg_instanceof_HtmlDocument_ea501c232ab42442 = function (arg0) {
                let result;
                try {
                    // result = getObject(arg0) instanceof HTMLDocument;   // true document
                    result = true;
                } catch {
                    result = false;
                }
                const ret = result;
                return ret;
            };
            imports.wbg.__wbg_cookie_c2a0e71f1bbcb4e2 = function () {
                return handleError(function (arg0, arg1) {
                    // const ret = 'bWFua2V5=76b01fb721427cdd362dd07eb8f45bdddfe';  // const ret = getObject(arg1).cookie;
                    const ret = global_bWFua2V5;
                    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);   //  1114520
                    const len0 = WASM_VECTOR_LEN;
                    getInt32Memory0()[arg0 / 4 + 1] = len0;
                    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
                }, arguments)
            };
            imports.wbg.__wbg_setcookie_851cf65625634b8d = function () {
                return handleError(function (arg0, arg1, arg2) {
                    // todo cookie
                    Ym90a2V5_cookie = getStringFromWasm0(arg1, arg2);
                    // console.log('Ym90a2V5_cookie----', Ym90a2V5_cookie);

                    global.global_Ym90a2V5 = Ym90a2V5_cookie;

                    getObject(arg0).cookie = Ym90a2V5_cookie;
                    print(1111);    // todo
                }, arguments)
            };
            imports.wbg.__wbg_setvalue_7de6dbbee1112e08 = function (arg0, arg1) {
                getObject(arg0).value = arg1;
            };
            imports.wbg.__wbg_reload_4e34e4dad662938e = function () {
                return handleError(function (arg0, arg1) {
                    getObject(arg0).reload(arg1 !== 0);
                }, arguments)
            };
            imports.wbg.__wbg_renderedBuffer_2a2a807befde92a8 = function (arg0) {
                const ret = getObject(arg0).renderedBuffer;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_setProperty_e489dfd8c0a6bffc = function () {
                return handleError(function (arg0, arg1, arg2, arg3, arg4) {
                    var p1 = getStringFromWasm0(arg1, arg2);
                    var p2 = getStringFromWasm0(arg3, arg4);
                    console.log('mark1---', p1, p2);
                    getObject(arg0).setProperty(p1, p2);
                    // getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
                }, arguments)
            };
            imports.wbg.__wbg_settype_d0a432512a5e270b = function (arg0, arg1) {
                getObject(arg0).type = takeObject(arg1);
            };
            imports.wbg.__wbg_frequency_4b2951b34ef98d23 = function (arg0) {
                const ret = getObject(arg0).frequency;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_start_28727b0c6d0e6dc8 = function () {
                return handleError(function (arg0, arg1) {
                    getObject(arg0).start(arg1);
                }, arguments)
            };
            imports.wbg.__wbg_set_0a2938f1ef0852cf = function () {
                return handleError(function (arg0, arg1, arg2, arg3, arg4) {
                    var p1 = getStringFromWasm0(arg1, arg2);
                    var p2 = getStringFromWasm0(arg3, arg4);

                    // console.log('mark2---', p1, p2);
                    getObject(arg0)[p1] = p2;   // todo 设置localstorage

                    // getObject(arg0)[getStringFromWasm0(arg1, arg2)] = getStringFromWasm0(arg3, arg4);
                }, arguments)
            };
            imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function (arg0, arg1) {
                const ret = new Function(getStringFromWasm0(arg0, arg1));
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_call_97ae9d8645dc388b = function () {
                return handleError(function (arg0, arg1) {
                    const ret = getObject(arg0).call(getObject(arg1));
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_self_6d479506f72c6a71 = function () {
                return handleError(function () {
                    const ret = self.self;
                    return addHeapObject(ret);
                }, arguments)
                // return 39
            };
            imports.wbg.__wbg_window_f2557cc78490aceb = function () {
                return handleError(function () {
                    const ret = window.window;
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_globalThis_7f206bda628d5286 = function () {
                return handleError(function () {
                    const ret = globalThis.globalThis;
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_global_ba75c50d1cf384f4 = function () {
                return handleError(function () {
                    const ret = global.global;
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbindgen_is_undefined = function (arg0) {
                const ret = getObject(arg0) === undefined;
                return ret;
            };
            imports.wbg.__wbg_eval_6dc8993472839847 = function () {
                return handleError(function (arg0, arg1) {
                    const ret = eval(getStringFromWasm0(arg0, arg1));
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_call_168da88779e35f61 = function () {
                return handleError(function (arg0, arg1, arg2) {
                    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
                    return addHeapObject(ret);
                }, arguments)
            };
            imports.wbg.__wbg_getTime_cb82adb2556ed13e = function (arg0) {
                const ret = getObject(arg0).getTime();
                return ret;
            };
            imports.wbg.__wbg_new0_a57059d72c5b7aee = function () {
                const ret = new Date();
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_new_9962f939219f1820 = function (arg0, arg1) {
                try {
                    var state0 = {a: arg0, b: arg1};
                    var cb0 = (arg0, arg1) => {
                        const a = state0.a;
                        state0.a = 0;
                        try {
                            return __wbg_adapter_223(a, state0.b, arg0, arg1);
                        } finally {
                            state0.a = a;
                        }
                    };
                    const ret = new Promise(cb0);
                    return addHeapObject(ret);
                } finally {
                    state0.a = state0.b = 0;
                }
            };
            imports.wbg.__wbg_resolve_99fe17964f31ffc0 = function (arg0) {
                const ret = Promise.resolve(getObject(arg0));
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_then_11f7a54d67b4bfad = function (arg0, arg1) {
                const ret = getObject(arg0).then(getObject(arg1));
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_then_cedad20fbbd9418a = function (arg0, arg1, arg2) {
                const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_buffer_3f3d764d4747d564 = function (arg0) {
                const ret = getObject(arg0).buffer;
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_new_8c3f0052272a457a = function (arg0) {
                const ret = new Uint8Array(getObject(arg0));
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_set_83db9690f9353e79 = function (arg0, arg1, arg2) {
                getObject(arg0).set(getObject(arg1), arg2 >>> 0);
            };
            imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function (arg0) {
                const ret = getObject(arg0).length;
                return ret;
            };
            imports.wbg.__wbg_newwithbyteoffsetandlength_be22e5fcf4f69ab4 = function (arg0, arg1, arg2) {
                const ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_newwithlength_f5933855e4f48a19 = function (arg0) {
                const ret = new Uint8Array(arg0 >>> 0);
                return addHeapObject(ret);
            };
            imports.wbg.__wbg_subarray_58ad4efbb5bcb886 = function (arg0, arg1, arg2) {
                const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
                const ret = debugString(getObject(arg1));
                const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                const len0 = WASM_VECTOR_LEN;
                getInt32Memory0()[arg0 / 4 + 1] = len0;
                getInt32Memory0()[arg0 / 4 + 0] = ptr0;
            };
            imports.wbg.__wbindgen_throw = function (arg0, arg1) {
                // throw new Error(getStringFromWasm0(arg0, arg1));
            };
            imports.wbg.__wbindgen_memory = function () {
                const ret = wasm.memory;
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_closure_wrapper152 = function (arg0, arg1, arg2) {
                const ret = makeClosure(arg0, arg1, 10, __wbg_adapter_30);
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_closure_wrapper216 = function (arg0, arg1, arg2) {
                const ret = makeMutClosure(arg0, arg1, 37, __wbg_adapter_33);
                return addHeapObject(ret);
            };
            imports.wbg.__wbindgen_closure_wrapper310 = function (arg0, arg1, arg2) {
                const ret = makeMutClosure(arg0, arg1, 82, __wbg_adapter_36);
                return addHeapObject(ret);
            };

            return imports;
        }

        function initMemory(imports, maybe_memory) {

        }

        function finalizeInit(instance, module) {
            wasm = instance.exports;
            init.__wbindgen_wasm_module = module;
            cachedFloat32Memory0 = new Float32Array();
            cachedFloat64Memory0 = new Float64Array();
            cachedInt32Memory0 = new Int32Array();
            cachedUint32Memory0 = new Uint32Array();
            cachedUint8Memory0 = new Uint8Array();

            wasm.__wbindgen_start();
            return wasm;
        }

        function initSync(module) {
            const imports = getImports();

            initMemory(imports);

            if (!(module instanceof WebAssembly.Module)) {
                module = new WebAssembly.Module(module);
            }

            const instance = new WebAssembly.Instance(module, imports);

            return finalizeInit(instance, module);
        }

        async function init(input) {
            if (typeof input === 'undefined') {
                input = new URL('fr6Un8DQah.wasm', 'http://hunan.chinatax.gov.cn');
            }
            const imports = getImports();

            // if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
            //     input = fetch(input);       // 异步加载
            // }

            initMemory(imports);

            const {instance, module} = await load(await input, imports);

            return finalizeInit(instance, module);
        }

        init();

    } catch (e) {
        console.log(e)
    }

}


function get_cookie(global_bWFua2V5, useragent){
    get_Ym90a2V5_cookie(global_bWFua2V5, useragent);

    setTimeout(function () {
        // 这里就是处理的事件
        cookie = global.global_Ym90a2V5
        console.log('setTimeout---', cookie);
        return cookie
    }, 1000);
}

// global_bWFua2V5 = 'bWFua2V5=9b9444768d70ce6d86ee888e96e59d89060';
// global_bWFua2V5 = 'bWFua2V5=5f4ef15d4a11901ebe281a15bf2883ff0c0';

// global_bWFua2V5 = 'bWFua2V5=07414f88b23706a270c06b7f45b203dc64b';
// useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
// get_cookie(global_bWFua2V5, useragent)

module.exports.get_Ym90a2V5_cookie = get_Ym90a2V5_cookie;
