
var GlueCode = (() => {
  var _scriptDir = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  
  return (
function(moduleArg = {}) {

var a=moduleArg,q,r,readyPromise=new Promise((b,c)=>{q=b;r=c}),t=Object.assign({},a),u=[],v="./this.program",w=(b,c)=>{throw c;},x="",y;x=self.location.href;_scriptDir&&(x=_scriptDir);x.startsWith("blob:")?x="":x=x.substr(0,x.replace(/[?#].*/,"").lastIndexOf("/")+1);y=b=>{var c=new XMLHttpRequest;c.open("GET",b,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)};var aa=a.print||console.log.bind(console),C=a.printErr||console.error.bind(console);Object.assign(a,t);t=null;
a.arguments&&(u=a.arguments);a.thisProgram&&(v=a.thisProgram);a.quit&&(w=a.quit);var D;a.wasmBinary&&(D=a.wasmBinary);var E,F=!1,H,I,J,K=[],L=[],ca=[],M=[];function da(){var b=a.preRun.shift();K.unshift(b)}var N=0,O=null,P=null,Q=b=>b.startsWith("data:application/octet-stream;base64,"),R;R="fibonacci-c.wasm";if(!Q(R)){var S=R;R=a.locateFile?a.locateFile(S,x):x+S}function T(b){if(b==R&&D)return new Uint8Array(D);if(y)return y(b);throw"both async and sync fetching of the wasm failed";}
function ea(b){return D||"function"!=typeof fetch?Promise.resolve().then(()=>T(b)):fetch(b,{credentials:"same-origin"}).then(c=>{if(!c.ok)throw`failed to load wasm binary file at '${b}'`;return c.arrayBuffer()}).catch(()=>T(b))}function U(b,c,d){return ea(b).then(k=>WebAssembly.instantiate(k,c)).then(d,k=>{C(`failed to asynchronously prepare wasm: ${k}`);a.onAbort?.(k);k="Aborted("+k+")";C(k);F=!0;H=1;k=new WebAssembly.RuntimeError(k+". Build with -sASSERTIONS for more info.");r(k);throw k;})}
function fa(b,c){var d=R;return D||"function"!=typeof WebAssembly.instantiateStreaming||Q(d)||"function"!=typeof fetch?U(d,b,c):fetch(d,{credentials:"same-origin"}).then(k=>WebAssembly.instantiateStreaming(k,b).then(c,function(p){C(`wasm streaming compile failed: ${p}`);C("falling back to ArrayBuffer instantiation");return U(d,b,c)}))}function V(b){this.name="ExitStatus";this.message=`Program terminated with exit(${b})`;this.status=b}
var W=b=>{for(;0<b.length;)b.shift()(a)},ha=a.noExitRuntime||!0,ia=[null,[],[]],ja="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,ka=b=>{H=H=b;ha||(a.onExit?.(b),F=!0);w(b,new V(b))},la={_emscripten_memcpy_js:(b,c,d)=>I.copyWithin(b,c,c+d),emscripten_date_now:()=>Date.now(),fd_write:(b,c,d,k)=>{for(var p=0,z=0;z<d;z++){var m=J[c>>2],G=J[c+4>>2];c+=8;for(var A=0;A<G;A++){var g=I[m+A],h=ia[b];if(0===g||10===g){g=h;for(var f=0,l=f+NaN,n=f;g[n]&&!(n>=l);)++n;if(16<n-f&&g.buffer&&ja)g=
ja.decode(g.subarray(f,n));else{for(l="";f<n;){var e=g[f++];if(e&128){var B=g[f++]&63;if(192==(e&224))l+=String.fromCharCode((e&31)<<6|B);else{var ba=g[f++]&63;e=224==(e&240)?(e&15)<<12|B<<6|ba:(e&7)<<18|B<<12|ba<<6|g[f++]&63;65536>e?l+=String.fromCharCode(e):(e-=65536,l+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else l+=String.fromCharCode(e)}g=l}(1===b?aa:C)(g);h.length=0}else h.push(g)}p+=G}J[k>>2]=p;return 0}},X=function(){function b(d){X=d.exports;E=X.memory;d=E.buffer;a.HEAP8=new Int8Array(d);
a.HEAP16=new Int16Array(d);a.HEAPU8=I=new Uint8Array(d);a.HEAPU16=new Uint16Array(d);a.HEAP32=new Int32Array(d);a.HEAPU32=J=new Uint32Array(d);a.HEAPF32=new Float32Array(d);a.HEAPF64=new Float64Array(d);L.unshift(X.__wasm_call_ctors);N--;a.monitorRunDependencies?.(N);0==N&&(null!==O&&(clearInterval(O),O=null),P&&(d=P,P=null,d()));return X}var c={env:la,wasi_snapshot_preview1:la};N++;a.monitorRunDependencies?.(N);if(a.instantiateWasm)try{return a.instantiateWasm(c,b)}catch(d){C(`Module.instantiateWasm callback failed with error: ${d}`),
r(d)}fa(c,function(d){b(d.instance)}).catch(r);return{}}(),ma=a._main=(b,c)=>(ma=a._main=X.__main_argc_argv)(b,c),Y=b=>(Y=X._emscripten_stack_alloc)(b);a.dynCall_jiji=(b,c,d,k,p)=>(a.dynCall_jiji=X.dynCall_jiji)(b,c,d,k,p);a.callMain=na;var Z;P=function oa(){Z||pa();Z||(P=oa)};
function na(b=[]){var c=ma;b.unshift(v);var d=b.length,k=Y(4*(d+1)),p=k;b.forEach(m=>{for(var G=J,A=p>>2,g=0,h=0;h<m.length;++h){var f=m.charCodeAt(h);127>=f?g++:2047>=f?g+=2:55296<=f&&57343>=f?(g+=4,++h):g+=3}var l=g+1;h=g=Y(l);f=I;if(0<l){l=h+l-1;for(var n=0;n<m.length;++n){var e=m.charCodeAt(n);if(55296<=e&&57343>=e){var B=m.charCodeAt(++n);e=65536+((e&1023)<<10)|B&1023}if(127>=e){if(h>=l)break;f[h++]=e}else{if(2047>=e){if(h+1>=l)break;f[h++]=192|e>>6}else{if(65535>=e){if(h+2>=l)break;f[h++]=224|
e>>12}else{if(h+3>=l)break;f[h++]=240|e>>18;f[h++]=128|e>>12&63}f[h++]=128|e>>6&63}f[h++]=128|e&63}}f[h]=0}G[A]=g;p+=4});J[p>>2]=0;try{var z=c(d,k);ka(z);return z}catch(m){return m instanceof V||"unwind"==m?b=H:(w(1,m),b=void 0),b}}
function pa(){var b=u;function c(){if(!Z&&(Z=!0,a.calledRun=!0,!F)){W(L);W(ca);q(a);if(a.onRuntimeInitialized)a.onRuntimeInitialized();qa&&na(b);if(a.postRun)for("function"==typeof a.postRun&&(a.postRun=[a.postRun]);a.postRun.length;){var d=a.postRun.shift();M.unshift(d)}W(M)}}if(!(0<N)){if(a.preRun)for("function"==typeof a.preRun&&(a.preRun=[a.preRun]);a.preRun.length;)da();W(K);0<N||(a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1);c()},1)):
c())}}if(a.preInit)for("function"==typeof a.preInit&&(a.preInit=[a.preInit]);0<a.preInit.length;)a.preInit.pop()();var qa=!1;a.noInitialRun&&(qa=!1);pa();


  return readyPromise
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = GlueCode;
else if (typeof define === 'function' && define['amd'])
  define([], () => GlueCode);
