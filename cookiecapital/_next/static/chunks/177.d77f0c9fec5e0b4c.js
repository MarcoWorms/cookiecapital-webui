(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{40926:function(t,e,n){"use strict";function r(){return(null===n.g||void 0===n.g?void 0:n.g.crypto)||(null===n.g||void 0===n.g?void 0:n.g.msCrypto)||{}}function o(){const t=r();return t.subtle||t.webkitSubtle}Object.defineProperty(e,"__esModule",{value:!0}),e.isBrowserCryptoAvailable=e.getSubtleCrypto=e.getBrowerCrypto=void 0,e.getBrowerCrypto=r,e.getSubtleCrypto=o,e.isBrowserCryptoAvailable=function(){return!!r()&&!!o()}},88618:function(t,e,n){"use strict";var r=n(83454);function o(){return"undefined"===typeof document&&"undefined"!==typeof navigator&&"ReactNative"===navigator.product}function s(){return"undefined"!==typeof r&&"undefined"!==typeof r.versions&&"undefined"!==typeof r.versions.node}Object.defineProperty(e,"__esModule",{value:!0}),e.isBrowser=e.isNode=e.isReactNative=void 0,e.isReactNative=o,e.isNode=s,e.isBrowser=function(){return!o()&&!s()}},1468:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(70655);r.__exportStar(n(40926),e),r.__exportStar(n(88618),e)},96641:function(t,e,n){"use strict";n.d(e,{k:function(){return a},Z:function(){return p}});var r=n(17187),o=n(54098),s=n.n(o),i=n(85094),c=n(56186);const u={headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"};class a{constructor(t){if(this.url=t,this.events=new r.EventEmitter,this.isAvailable=!1,this.registering=!1,!(0,c.isHttpUrl)(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);this.url=t}get connected(){return this.isAvailable}get connecting(){return this.registering}on(t,e){this.events.on(t,e)}once(t,e){this.events.once(t,e)}off(t,e){this.events.off(t,e)}removeListener(t,e){this.events.removeListener(t,e)}async open(t=this.url){await this.register(t)}async close(){if(!this.isAvailable)throw new Error("Connection already closed");this.onClose()}async send(t,e){this.isAvailable||await this.register();try{const e=(0,i.u)(t),n=await s()(this.url,Object.assign(Object.assign({},u),{body:e})),r=await n.json();this.onPayload({data:r})}catch(n){this.onError(t.id,n)}}async register(t=this.url){if(!(0,c.isHttpUrl)(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);if(this.registering){const t=this.events.getMaxListeners();return(this.events.listenerCount("register_error")>=t||this.events.listenerCount("open")>=t)&&this.events.setMaxListeners(t+1),new Promise(((t,e)=>{this.events.once("register_error",(t=>{this.resetMaxListeners(),e(t)})),this.events.once("open",(()=>{if(this.resetMaxListeners(),"undefined"===typeof this.isAvailable)return e(new Error("HTTP connection is missing or invalid"));t()}))}))}this.url=t,this.registering=!0;try{const e=(0,i.u)({id:1,jsonrpc:"2.0",method:"test",params:[]});await s()(t,Object.assign(Object.assign({},u),{body:e})),this.onOpen()}catch(e){const t=this.parseError(e);throw this.events.emit("register_error",t),this.onClose(),t}}onOpen(){this.isAvailable=!0,this.registering=!1,this.events.emit("open")}onClose(){this.isAvailable=!1,this.registering=!1,this.events.emit("close")}onPayload(t){if("undefined"===typeof t.data)return;const e="string"===typeof t.data?(0,i.D)(t.data):t.data;this.events.emit("payload",e)}onError(t,e){const n=this.parseError(e),r=n.message||n.toString(),o=(0,c.formatJsonRpcError)(t,r);this.events.emit("payload",o)}parseError(t,e=this.url){return(0,c.parseConnectionError)(t,e,"HTTP")}resetMaxListeners(){this.events.getMaxListeners()>10&&this.events.setMaxListeners(10)}}var p=a},46160:function(t,e,n){"use strict";n.d(e,{r:function(){return s}});var r=n(17187),o=n(56186);class s extends o.IJsonRpcProvider{constructor(t){super(t),this.events=new r.EventEmitter,this.hasRegisteredEventListeners=!1,this.connection=this.setConnection(t),this.connection.connected&&this.registerEventListeners()}async connect(t=this.connection){await this.open(t)}async disconnect(){await this.close()}on(t,e){this.events.on(t,e)}once(t,e){this.events.once(t,e)}off(t,e){this.events.off(t,e)}removeListener(t,e){this.events.removeListener(t,e)}async request(t,e){return this.requestStrict((0,o.formatJsonRpcRequest)(t.method,t.params||[]),e)}async requestStrict(t,e){return new Promise((async(n,r)=>{if(!this.connection.connected)try{await this.open()}catch(s){r(s)}this.events.on(`${t.id}`,(t=>{(0,o.isJsonRpcError)(t)?r(t.error):n(t.result)}));try{await this.connection.send(t,e)}catch(s){r(s)}}))}setConnection(t=this.connection){return t}onPayload(t){this.events.emit("payload",t),(0,o.isJsonRpcResponse)(t)?this.events.emit(`${t.id}`,t):this.events.emit("message",{type:t.method,data:t.params})}async open(t=this.connection){this.connection===t&&this.connection.connected||(this.connection.connected&&this.close(),"string"===typeof t&&(await this.connection.open(t),t=this.connection),this.connection=this.setConnection(t),await this.connection.open(),this.registerEventListeners(),this.events.emit("connect"))}async close(){await this.connection.close()}registerEventListeners(){this.hasRegisteredEventListeners||(this.connection.on("payload",(t=>this.onPayload(t))),this.connection.on("close",(()=>this.events.emit("disconnect"))),this.connection.on("error",(t=>this.events.emit("error",t))),this.hasRegisteredEventListeners=!0)}}},35885:function(t,e,n){"use strict";n.d(e,{IJsonRpcProvider:function(){return o.x0}});var r=n(74057);n.o(r,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return r.IJsonRpcProvider}}),n.o(r,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return r.isHttpUrl}}),n.o(r,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return r.isJsonRpcError}}),n.o(r,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return r.isJsonRpcRequest}}),n.o(r,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return r.isJsonRpcResponse}}),n.o(r,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return r.isJsonRpcResult}}),n.o(r,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return r.isLocalhostUrl}}),n.o(r,"isReactNative")&&n.d(e,{isReactNative:function(){return r.isReactNative}}),n.o(r,"isWsUrl")&&n.d(e,{isWsUrl:function(){return r.isWsUrl}});var o=n(73416),s=n(71948);n.o(s,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return s.isHttpUrl}}),n.o(s,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return s.isJsonRpcError}}),n.o(s,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return s.isJsonRpcRequest}}),n.o(s,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return s.isJsonRpcResponse}}),n.o(s,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return s.isJsonRpcResult}}),n.o(s,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return s.isLocalhostUrl}}),n.o(s,"isReactNative")&&n.d(e,{isReactNative:function(){return s.isReactNative}}),n.o(s,"isWsUrl")&&n.d(e,{isWsUrl:function(){return s.isWsUrl}})},74057:function(){},73416:function(t,e,n){"use strict";n.d(e,{XR:function(){return o},x0:function(){return i}});class r{}class o extends r{constructor(t){super()}}class s extends r{constructor(){super()}}class i extends s{constructor(t){super()}}},71948:function(){},79806:function(t,e,n){"use strict";n.d(e,{CA:function(){return o},JV:function(){return c},O4:function(){return r},dQ:function(){return s},xK:function(){return i}});const r="INTERNAL_ERROR",o="SERVER_ERROR",s=[-32700,-32600,-32601,-32602,-32603],i={PARSE_ERROR:{code:-32700,message:"Parse error"},INVALID_REQUEST:{code:-32600,message:"Invalid Request"},METHOD_NOT_FOUND:{code:-32601,message:"Method not found"},INVALID_PARAMS:{code:-32602,message:"Invalid params"},[r]:{code:-32603,message:"Internal error"},[o]:{code:-32e3,message:"Server error"}},c=o},9698:function(t,e,n){"use strict";var r=n(1468);n.o(r,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return r.IJsonRpcProvider}}),n.o(r,"formatJsonRpcError")&&n.d(e,{formatJsonRpcError:function(){return r.formatJsonRpcError}}),n.o(r,"formatJsonRpcRequest")&&n.d(e,{formatJsonRpcRequest:function(){return r.formatJsonRpcRequest}}),n.o(r,"formatJsonRpcResult")&&n.d(e,{formatJsonRpcResult:function(){return r.formatJsonRpcResult}}),n.o(r,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return r.isHttpUrl}}),n.o(r,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return r.isJsonRpcError}}),n.o(r,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return r.isJsonRpcRequest}}),n.o(r,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return r.isJsonRpcResponse}}),n.o(r,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return r.isJsonRpcResult}}),n.o(r,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return r.isLocalhostUrl}}),n.o(r,"isReactNative")&&n.d(e,{isReactNative:function(){return r.isReactNative}}),n.o(r,"isWsUrl")&&n.d(e,{isWsUrl:function(){return r.isWsUrl}}),n.o(r,"payloadId")&&n.d(e,{payloadId:function(){return r.payloadId}})},90110:function(t,e,n){"use strict";n.d(e,{CX:function(){return c},L2:function(){return i},by:function(){return s},i5:function(){return o}});var r=n(79806);function o(t){return r.dQ.includes(t)}function s(t){return Object.keys(r.xK).includes(t)?r.xK[t]:r.xK[r.JV]}function i(t){const e=Object.values(r.xK).find((e=>e.code===t));return e||r.xK[r.JV]}function c(t,e,n){return t.message.includes("getaddrinfo ENOTFOUND")||t.message.includes("connect ECONNREFUSED")?new Error(`Unavailable ${n} RPC url at ${e}`):t}},71937:function(t,e,n){"use strict";n.d(e,{RI:function(){return u},o0:function(){return s},sT:function(){return i},tm:function(){return c}});var r=n(90110),o=n(79806);function s(){return Date.now()*Math.pow(10,3)+Math.floor(Math.random()*Math.pow(10,3))}function i(t,e,n){return{id:n||s(),jsonrpc:"2.0",method:t,params:e}}function c(t,e){return{id:t,jsonrpc:"2.0",result:e}}function u(t,e,n){return{id:t,jsonrpc:"2.0",error:a(e,n)}}function a(t,e){return"undefined"===typeof t?(0,r.by)(o.O4):("string"===typeof t&&(t=Object.assign(Object.assign({},(0,r.by)(o.CA)),{message:t})),"undefined"!==typeof e&&(t.data=e),(0,r.i5)(t.code)&&(t=(0,r.L2)(t.code)),t)}},56186:function(t,e,n){"use strict";n.d(e,{formatJsonRpcError:function(){return s.RI},formatJsonRpcRequest:function(){return s.sT},formatJsonRpcResult:function(){return s.tm},isHttpUrl:function(){return c.jK},isJsonRpcError:function(){return u.jg},isJsonRpcRequest:function(){return u.DW},isJsonRpcResponse:function(){return u.u},isJsonRpcResult:function(){return u.k4},isLocalhostUrl:function(){return c.JF},isWsUrl:function(){return c.UZ},parseConnectionError:function(){return r.CX},payloadId:function(){return s.o0}});n(79806);var r=n(90110),o=n(9698);n.o(o,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return o.IJsonRpcProvider}}),n.o(o,"formatJsonRpcError")&&n.d(e,{formatJsonRpcError:function(){return o.formatJsonRpcError}}),n.o(o,"formatJsonRpcRequest")&&n.d(e,{formatJsonRpcRequest:function(){return o.formatJsonRpcRequest}}),n.o(o,"formatJsonRpcResult")&&n.d(e,{formatJsonRpcResult:function(){return o.formatJsonRpcResult}}),n.o(o,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return o.isHttpUrl}}),n.o(o,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return o.isJsonRpcError}}),n.o(o,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return o.isJsonRpcRequest}}),n.o(o,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return o.isJsonRpcResponse}}),n.o(o,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return o.isJsonRpcResult}}),n.o(o,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return o.isLocalhostUrl}}),n.o(o,"isReactNative")&&n.d(e,{isReactNative:function(){return o.isReactNative}}),n.o(o,"isWsUrl")&&n.d(e,{isWsUrl:function(){return o.isWsUrl}}),n.o(o,"payloadId")&&n.d(e,{payloadId:function(){return o.payloadId}});var s=n(71937),i=n(26043);n.o(i,"IJsonRpcProvider")&&n.d(e,{IJsonRpcProvider:function(){return i.IJsonRpcProvider}}),n.o(i,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return i.isHttpUrl}}),n.o(i,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return i.isJsonRpcError}}),n.o(i,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return i.isJsonRpcRequest}}),n.o(i,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return i.isJsonRpcResponse}}),n.o(i,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return i.isJsonRpcResult}}),n.o(i,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return i.isLocalhostUrl}}),n.o(i,"isReactNative")&&n.d(e,{isReactNative:function(){return i.isReactNative}}),n.o(i,"isWsUrl")&&n.d(e,{isWsUrl:function(){return i.isWsUrl}});var c=n(46119),u=n(84733)},26043:function(t,e,n){"use strict";n.d(e,{IJsonRpcProvider:function(){return r.IJsonRpcProvider}});var r=n(35885);n.o(r,"isHttpUrl")&&n.d(e,{isHttpUrl:function(){return r.isHttpUrl}}),n.o(r,"isJsonRpcError")&&n.d(e,{isJsonRpcError:function(){return r.isJsonRpcError}}),n.o(r,"isJsonRpcRequest")&&n.d(e,{isJsonRpcRequest:function(){return r.isJsonRpcRequest}}),n.o(r,"isJsonRpcResponse")&&n.d(e,{isJsonRpcResponse:function(){return r.isJsonRpcResponse}}),n.o(r,"isJsonRpcResult")&&n.d(e,{isJsonRpcResult:function(){return r.isJsonRpcResult}}),n.o(r,"isLocalhostUrl")&&n.d(e,{isLocalhostUrl:function(){return r.isLocalhostUrl}}),n.o(r,"isReactNative")&&n.d(e,{isReactNative:function(){return r.isReactNative}}),n.o(r,"isWsUrl")&&n.d(e,{isWsUrl:function(){return r.isWsUrl}})},46119:function(t,e,n){"use strict";n.d(e,{JF:function(){return i},UZ:function(){return s},jK:function(){return o}});function r(t,e){const n=function(t){const e=t.match(new RegExp(/^\w+:/,"gi"));if(e&&e.length)return e[0]}(t);return"undefined"!==typeof n&&new RegExp(e).test(n)}function o(t){return r(t,"^https?:")}function s(t){return r(t,"^wss?:")}function i(t){return new RegExp("wss?://localhost(:d{2,5})?").test(t)}},84733:function(t,e,n){"use strict";function r(t){return"object"===typeof t&&"id"in t&&"jsonrpc"in t&&"2.0"===t.jsonrpc}function o(t){return r(t)&&"method"in t}function s(t){return r(t)&&(i(t)||c(t))}function i(t){return"result"in t}function c(t){return"error"in t}n.d(e,{DW:function(){return o},jg:function(){return c},k4:function(){return i},u:function(){return s}})},85094:function(t,e,n){"use strict";function r(t){if("string"!==typeof t)throw new Error("Cannot safe json parse value of type "+typeof t);try{return JSON.parse(t)}catch(e){return t}}function o(t){return"string"===typeof t?t:JSON.stringify(t)}n.d(e,{D:function(){return r},u:function(){return o}})},62873:function(t,e){"use strict";function n(t){let e;return"undefined"!==typeof window&&"undefined"!==typeof window[t]&&(e=window[t]),e}function r(t){const e=n(t);if(!e)throw new Error(`${t} is not defined in Window`);return e}Object.defineProperty(e,"__esModule",{value:!0}),e.getLocalStorage=e.getLocalStorageOrThrow=e.getCrypto=e.getCryptoOrThrow=e.getLocation=e.getLocationOrThrow=e.getNavigator=e.getNavigatorOrThrow=e.getDocument=e.getDocumentOrThrow=e.getFromWindowOrThrow=e.getFromWindow=void 0,e.getFromWindow=n,e.getFromWindowOrThrow=r,e.getDocumentOrThrow=function(){return r("document")},e.getDocument=function(){return n("document")},e.getNavigatorOrThrow=function(){return r("navigator")},e.getNavigator=function(){return n("navigator")},e.getLocationOrThrow=function(){return r("location")},e.getLocation=function(){return n("location")},e.getCryptoOrThrow=function(){return r("crypto")},e.getCrypto=function(){return n("crypto")},e.getLocalStorageOrThrow=function(){return r("localStorage")},e.getLocalStorage=function(){return n("localStorage")}},54098:function(t,e){var n="undefined"!==typeof self?self:this,r=function(){function t(){this.fetch=!1,this.DOMException=n.DOMException}return t.prototype=n,new t}();!function(t){!function(e){var n="URLSearchParams"in t,r="Symbol"in t&&"iterator"in Symbol,o="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),s="FormData"in t,i="ArrayBuffer"in t;if(i)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(t){return t&&c.indexOf(Object.prototype.toString.call(t))>-1};function a(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function p(t){return"string"!==typeof t&&(t=String(t)),t}function f(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r&&(e[Symbol.iterator]=function(){return e}),e}function d(t){this.map={},t instanceof d?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function l(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function h(t){return new Promise((function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function R(t){var e=new FileReader,n=h(e);return e.readAsArrayBuffer(t),n}function y(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"===typeof t?this._bodyText=t:o&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:s&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:n&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():i&&o&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=y(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i&&(ArrayBuffer.prototype.isPrototypeOf(t)||u(t))?this._bodyArrayBuffer=y(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},o&&(this.blob=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(R)}),this.text=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return function(t){var e=new FileReader,n=h(e);return e.readAsText(t),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s&&(this.formData=function(){return this.text().then(w)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(t,e){t=a(t),e=p(e);var n=this.map[t];this.map[t]=n?n+", "+e:e},d.prototype.delete=function(t){delete this.map[a(t)]},d.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},d.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},d.prototype.set=function(t,e){this.map[a(t)]=p(e)},d.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},d.prototype.keys=function(){var t=[];return this.forEach((function(e,n){t.push(n)})),f(t)},d.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),f(t)},d.prototype.entries=function(){var t=[];return this.forEach((function(e,n){t.push([n,e])})),f(t)},r&&(d.prototype[Symbol.iterator]=d.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function m(t,e){var n=(e=e||{}).body;if(t instanceof m){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new d(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new d(e.headers)),this.method=function(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function w(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}})),e}function b(t){var e=new d;return t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var n=t.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();e.append(r,o)}})),e}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new d(e.headers),this.url=e.url||"",this._initBody(t)}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},v.call(m.prototype),v.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var J=[301,302,303,307,308];E.redirect=function(t,e){if(-1===J.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(O){e.DOMException=function(t,e){this.message=t,this.name=e;var n=Error(t);this.stack=n.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function U(t,n){return new Promise((function(r,s){var i=new m(t,n);if(i.signal&&i.signal.aborted)return s(new e.DOMException("Aborted","AbortError"));var c=new XMLHttpRequest;function u(){c.abort()}c.onload=function(){var t={status:c.status,statusText:c.statusText,headers:b(c.getAllResponseHeaders()||"")};t.url="responseURL"in c?c.responseURL:t.headers.get("X-Request-URL");var e="response"in c?c.response:c.responseText;r(new E(e,t))},c.onerror=function(){s(new TypeError("Network request failed"))},c.ontimeout=function(){s(new TypeError("Network request failed"))},c.onabort=function(){s(new e.DOMException("Aborted","AbortError"))},c.open(i.method,i.url,!0),"include"===i.credentials?c.withCredentials=!0:"omit"===i.credentials&&(c.withCredentials=!1),"responseType"in c&&o&&(c.responseType="blob"),i.headers.forEach((function(t,e){c.setRequestHeader(e,t)})),i.signal&&(i.signal.addEventListener("abort",u),c.onreadystatechange=function(){4===c.readyState&&i.signal.removeEventListener("abort",u)}),c.send("undefined"===typeof i._bodyInit?null:i._bodyInit)}))}U.polyfill=!0,t.fetch||(t.fetch=U,t.Headers=d,t.Request=m,t.Response=E),e.Headers=d,e.Request=m,e.Response=E,e.fetch=U,Object.defineProperty(e,"__esModule",{value:!0})}({})}(r),r.fetch.ponyfill=!0,delete r.fetch.polyfill;var o=r;(e=o.fetch).default=o.fetch,e.fetch=o.fetch,e.Headers=o.Headers,e.Request=o.Request,e.Response=o.Response,t.exports=e},44020:function(t){"use strict";var e="%[a-f0-9]{2}",n=new RegExp("("+e+")|([^%]+?)","gi"),r=new RegExp("("+e+")+","gi");function o(t,e){try{return[decodeURIComponent(t.join(""))]}catch(s){}if(1===t.length)return t;e=e||1;var n=t.slice(0,e),r=t.slice(e);return Array.prototype.concat.call([],o(n),o(r))}function s(t){try{return decodeURIComponent(t)}catch(s){for(var e=t.match(n)||[],r=1;r<e.length;r++)e=(t=o(e,r).join("")).match(n)||[];return t}}t.exports=function(t){if("string"!==typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var n={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},o=r.exec(t);o;){try{n[o[0]]=decodeURIComponent(o[0])}catch(e){var i=s(o[0]);i!==o[0]&&(n[o[0]]=i)}o=r.exec(t)}n["%C2"]="\ufffd";for(var c=Object.keys(n),u=0;u<c.length;u++){var a=c[u];t=t.replace(new RegExp(a,"g"),n[a])}return t}(t)}}},80500:function(t){"use strict";t.exports=(t,e)=>{if("string"!==typeof t||"string"!==typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];const n=t.indexOf(e);return-1===n?[t]:[t.slice(0,n),t.slice(n+e.length)]}},70610:function(t){"use strict";t.exports=t=>encodeURIComponent(t).replace(/[!'()*]/g,(t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`))}}]);