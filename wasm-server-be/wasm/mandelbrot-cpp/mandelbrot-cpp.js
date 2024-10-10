
var GlueCode = (() => {
  var _scriptDir = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  
  return (
function(moduleArg = {}) {

var g=moduleArg,aa,k,readyPromise=new Promise((a,b)=>{aa=a;k=b}),ba=Object.assign({},g),ca=[],da="./this.program",ea=(a,b)=>{throw b;},n="",fa;n=self.location.href;_scriptDir&&(n=_scriptDir);n.startsWith("blob:")?n="":n=n.substr(0,n.replace(/[?#].*/,"").lastIndexOf("/")+1);fa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)};var ha=g.print||console.log.bind(console),v=g.printErr||console.error.bind(console);
Object.assign(g,ba);ba=null;g.arguments&&(ca=g.arguments);g.thisProgram&&(da=g.thisProgram);g.quit&&(ea=g.quit);var x;g.wasmBinary&&(x=g.wasmBinary);var ia,ja=!1,z,B,C,D,E,ka=[],la=[],ma=[],na=[];function oa(){var a=g.preRun.shift();ka.unshift(a)}var F=0,pa=null,G=null;function H(a){g.onAbort?.(a);a="Aborted("+a+")";v(a);ja=!0;z=1;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");k(a);throw a;}var qa=a=>a.startsWith("data:application/octet-stream;base64,"),I;I="mandelbrot-cpp.wasm";
if(!qa(I)){var ra=I;I=g.locateFile?g.locateFile(ra,n):n+ra}function sa(a){if(a==I&&x)return new Uint8Array(x);if(fa)return fa(a);throw"both async and sync fetching of the wasm failed";}function ta(a){return x||"function"!=typeof fetch?Promise.resolve().then(()=>sa(a)):fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${a}'`;return b.arrayBuffer()}).catch(()=>sa(a))}
function ua(a,b,c){return ta(a).then(d=>WebAssembly.instantiate(d,b)).then(c,d=>{v(`failed to asynchronously prepare wasm: ${d}`);H(d)})}function wa(a,b){var c=I;return x||"function"!=typeof WebAssembly.instantiateStreaming||qa(c)||"function"!=typeof fetch?ua(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(f){v(`wasm streaming compile failed: ${f}`);v("falling back to ArrayBuffer instantiation");return ua(c,a,b)}))}var J,xa;
function ya(a){this.name="ExitStatus";this.message=`Program terminated with exit(${a})`;this.status=a}var K=a=>{for(;0<a.length;)a.shift()(g)},za=g.noExitRuntime||!0;class Aa{constructor(a){this.O=a-24}}
var Ba=0,Ca=0,Da={},Fa=()=>{if(!Ea){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:da||"./this.program"},b;for(b in Da)void 0===Da[b]?delete a[b]:a[b]=Da[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);Ea=c}return Ea},Ea,Ga=(a,b)=>{for(var c=0,d=a.length-1;0<=d;d--){var f=a[d];"."===f?a.splice(d,1):".."===f?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");
return a},L=a=>{var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Ga(a.split("/").filter(d=>!!d),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a},Ha=a=>{var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&=b.substr(0,b.length-1);return a+b},Ia=a=>{if("/"===a)return"/";a=L(a);a=a.replace(/\/$/,"");var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)},Ja=()=>{if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return a=>
crypto.getRandomValues(a);H("initRandomDevice")},Ka=a=>(Ka=Ja())(a),M=(...a)=>{for(var b="",c=!1,d=a.length-1;-1<=d&&!c;d--){c=0<=d?a[d]:"/";if("string"!=typeof c)throw new TypeError("Arguments to path.resolve must be strings");if(!c)return"";b=c+"/"+b;c="/"===c.charAt(0)}b=Ga(b.split("/").filter(f=>!!f),!c).join("/");return(c?"/":"")+b||"."},La="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,N=(a,b)=>{for(var c=b+NaN,d=b;a[d]&&!(d>=c);)++d;if(16<d-b&&a.buffer&&La)return La.decode(a.subarray(b,
d));for(c="";b<d;){var f=a[b++];if(f&128){var h=a[b++]&63;if(192==(f&224))c+=String.fromCharCode((f&31)<<6|h);else{var l=a[b++]&63;f=224==(f&240)?(f&15)<<12|h<<6|l:(f&7)<<18|h<<12|l<<6|a[b++]&63;65536>f?c+=String.fromCharCode(f):(f-=65536,c+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else c+=String.fromCharCode(f)}return c},Ma=[],Na=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b},Oa=(a,b,c,d)=>{if(!(0<d))return 0;
var f=c;d=c+d-1;for(var h=0;h<a.length;++h){var l=a.charCodeAt(h);if(55296<=l&&57343>=l){var t=a.charCodeAt(++h);l=65536+((l&1023)<<10)|t&1023}if(127>=l){if(c>=d)break;b[c++]=l}else{if(2047>=l){if(c+1>=d)break;b[c++]=192|l>>6}else{if(65535>=l){if(c+2>=d)break;b[c++]=224|l>>12}else{if(c+3>=d)break;b[c++]=240|l>>18;b[c++]=128|l>>12&63}b[c++]=128|l>>6&63}b[c++]=128|l&63}}b[c]=0;return c-f};function Pa(a,b){var c=Array(Na(a)+1);a=Oa(a,c,0,c.length);b&&(c.length=a);return c}var Qa=[];
function Ra(a,b){Qa[a]={input:[],l:[],G:b};Sa(a,Ta)}
var Ta={open(a){var b=Qa[a.node.P];if(!b)throw new O(43);a.m=b;a.seekable=!1},close(a){a.m.G.K(a.m)},K(a){a.m.G.K(a.m)},read(a,b,c,d){if(!a.m||!a.m.G.ba)throw new O(60);for(var f=0,h=0;h<d;h++){try{var l=a.m.G.ba(a.m)}catch(t){throw new O(29);}if(void 0===l&&0===f)throw new O(6);if(null===l||void 0===l)break;f++;b[c+h]=l}f&&(a.node.timestamp=Date.now());return f},write(a,b,c,d){if(!a.m||!a.m.G.V)throw new O(60);try{for(var f=0;f<d;f++)a.m.G.V(a.m,b[c+f])}catch(h){throw new O(29);}d&&(a.node.timestamp=
Date.now());return f}},Ua={ba(){a:{if(!Ma.length){var a=null;"undefined"!=typeof window&&"function"==typeof window.prompt?(a=window.prompt("Input: "),null!==a&&(a+="\n")):"function"==typeof readline&&(a=readline(),null!==a&&(a+="\n"));if(!a){a=null;break a}Ma=Pa(a,!0)}a=Ma.shift()}return a},V(a,b){null===b||10===b?(ha(N(a.l,0)),a.l=[]):0!=b&&a.l.push(b)},K(a){a.l&&0<a.l.length&&(ha(N(a.l,0)),a.l=[])},Ea(){return{wa:25856,ya:5,va:191,xa:35387,ua:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0]}},Fa(){return 0},Ga(){return[24,80]}},Va={V(a,b){null===b||10===b?(v(N(a.l,0)),a.l=[]):0!=b&&a.l.push(b)},K(a){a.l&&0<a.l.length&&(v(N(a.l,0)),a.l=[])}};function Wa(a,b){var c=a.h?a.h.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>0),0!=c&&(b=Math.max(b,256)),c=a.h,a.h=new Uint8Array(b),0<a.j&&a.h.set(c.subarray(0,a.j),0))}
var P={o:null,v(){return P.createNode(null,"/",16895,0)},createNode(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new O(63);P.o||(P.o={dir:{node:{A:P.g.A,s:P.g.s,H:P.g.H,M:P.g.M,ga:P.g.ga,ia:P.g.ia,ha:P.g.ha,fa:P.g.fa,R:P.g.R},stream:{B:P.i.B}},file:{node:{A:P.g.A,s:P.g.s},stream:{B:P.i.B,read:P.i.read,write:P.i.write,Y:P.i.Y,ca:P.i.ca,ea:P.i.ea}},link:{node:{A:P.g.A,s:P.g.s,I:P.g.I},stream:{}},Z:{node:{A:P.g.A,s:P.g.s},stream:Xa}});c=Ya(a,b,c,d);16384===(c.mode&61440)?(c.g=P.o.dir.node,c.i=
P.o.dir.stream,c.h={}):32768===(c.mode&61440)?(c.g=P.o.file.node,c.i=P.o.file.stream,c.j=0,c.h=null):40960===(c.mode&61440)?(c.g=P.o.link.node,c.i=P.o.link.stream):8192===(c.mode&61440)&&(c.g=P.o.Z.node,c.i=P.o.Z.stream);c.timestamp=Date.now();a&&(a.h[b]=c,a.timestamp=c.timestamp);return c},Ba(a){return a.h?a.h.subarray?a.h.subarray(0,a.j):new Uint8Array(a.h):new Uint8Array(0)},g:{A(a){var b={};b.Aa=8192===(a.mode&61440)?a.id:1;b.Da=a.id;b.mode=a.mode;b.Ia=1;b.uid=0;b.Ca=0;b.P=a.P;16384===(a.mode&
61440)?b.size=4096:32768===(a.mode&61440)?b.size=a.j:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.sa=new Date(a.timestamp);b.Ha=new Date(a.timestamp);b.za=new Date(a.timestamp);b.ja=4096;b.ta=Math.ceil(b.size/b.ja);return b},s(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);if(void 0!==b.size&&(b=b.size,a.j!=b))if(0==b)a.h=null,a.j=0;else{var c=a.h;a.h=new Uint8Array(b);c&&a.h.set(c.subarray(0,Math.min(b,a.j)));a.j=b}},H(){throw Za[44];},M(a,b,c,d){return P.createNode(a,
b,c,d)},ga(a,b,c){if(16384===(a.mode&61440)){try{var d=Q(b,c)}catch(h){}if(d)for(var f in d.h)throw new O(55);}delete a.parent.h[a.name];a.parent.timestamp=Date.now();a.name=c;b.h[c]=a;b.timestamp=a.parent.timestamp;a.parent=b},ia(a,b){delete a.h[b];a.timestamp=Date.now()},ha(a,b){var c=Q(a,b),d;for(d in c.h)throw new O(55);delete a.h[b];a.timestamp=Date.now()},fa(a){var b=[".",".."],c;for(c of Object.keys(a.h))b.push(c);return b},R(a,b,c){a=P.createNode(a,b,41471,0);a.link=c;return a},I(a){if(40960!==
(a.mode&61440))throw new O(28);return a.link}},i:{read(a,b,c,d,f){var h=a.node.h;if(f>=a.node.j)return 0;a=Math.min(a.node.j-f,d);if(8<a&&h.subarray)b.set(h.subarray(f,f+a),c);else for(d=0;d<a;d++)b[c+d]=h[f+d];return a},write(a,b,c,d,f,h){if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.h||a.h.subarray)){if(h)return a.h=b.subarray(c,c+d),a.j=d;if(0===a.j&&0===f)return a.h=b.slice(c,c+d),a.j=d;if(f+d<=a.j)return a.h.set(b.subarray(c,c+d),f),d}Wa(a,f+d);if(a.h.subarray&&b.subarray)a.h.set(b.subarray(c,
c+d),f);else for(h=0;h<d;h++)a.h[f+h]=b[c+h];a.j=Math.max(a.j,f+d);return d},B(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.j);if(0>b)throw new O(28);return b},Y(a,b,c){Wa(a.node,b+c);a.node.j=Math.max(a.node.j,b+c)},ca(a,b,c,d,f){if(32768!==(a.node.mode&61440))throw new O(43);a=a.node.h;if(f&2||a.buffer!==B.buffer){if(0<c||c+b<a.length)a.subarray?a=a.subarray(c,c+b):a=Array.prototype.slice.call(a,c,c+b);c=!0;H();b=void 0;if(!b)throw new O(48);B.set(a,b)}else c=!1,b=a.byteOffset;
return{O:b,ra:c}},ea(a,b,c,d){P.i.write(a,b,0,d,c,!1);return 0}}},$a=(a,b)=>{var c=0;a&&(c|=365);b&&(c|=146);return c},ab=null,bb={},S=[],cb=1,T=null,db=!0,O=class{constructor(a){this.name="ErrnoError";this.J=a}},Za={},eb=class{constructor(){this.L={};this.node=null}get flags(){return this.L.flags}set flags(a){this.L.flags=a}get position(){return this.L.position}set position(a){this.L.position=a}},fb=class{constructor(a,b,c,d){a||=this;this.parent=a;this.v=a.v;this.N=null;this.id=cb++;this.name=b;
this.mode=c;this.g={};this.i={};this.P=d}get read(){return 365===(this.mode&365)}set read(a){a?this.mode|=365:this.mode&=-366}get write(){return 146===(this.mode&146)}set write(a){a?this.mode|=146:this.mode&=-147}};
function U(a,b={}){a=M(a);if(!a)return{path:"",node:null};b=Object.assign({aa:!0,W:0},b);if(8<b.W)throw new O(32);a=a.split("/").filter(l=>!!l);for(var c=ab,d="/",f=0;f<a.length;f++){var h=f===a.length-1;if(h&&b.parent)break;c=Q(c,a[f]);d=L(d+"/"+a[f]);c.N&&(!h||h&&b.aa)&&(c=c.N.root);if(!h||b.$)for(h=0;40960===(c.mode&61440);)if(c=gb(d),d=M(Ha(d),c),c=U(d,{W:b.W+1}).node,40<h++)throw new O(32);}return{path:d,node:c}}
function hb(a){for(var b;;){if(a===a.parent)return a=a.v.da,b?"/"!==a[a.length-1]?`${a}/${b}`:a+b:a;b=b?`${a.name}/${b}`:a.name;a=a.parent}}function ib(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%T.length}function Q(a,b){var c=16384===(a.mode&61440)?(c=V(a,"x"))?c:a.g.H?0:2:54;if(c)throw new O(c);for(c=T[ib(a.id,b)];c;c=c.la){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.g.H(a,b)}
function Ya(a,b,c,d){a=new fb(a,b,c,d);b=ib(a.parent.id,a.name);a.la=T[b];return T[b]=a}function jb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function V(a,b){if(db)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0}function kb(a,b){try{return Q(a,b),20}catch(c){}return V(a,"wx")}function W(a){a=S[a];if(!a)throw new O(8);return a}
var Xa={open(a){a.i=bb[a.node.P].i;a.i.open?.(a)},B(){throw new O(70);}};function Sa(a,b){bb[a]={i:b}}function lb(a,b){var c="/"===b;if(c&&ab)throw new O(10);if(!c&&b){var d=U(b,{aa:!1});b=d.path;d=d.node;if(d.N)throw new O(10);if(16384!==(d.mode&61440))throw new O(54);}b={type:a,Ja:{},da:b,ka:[]};a=a.v(b);a.v=b;b.root=a;c?ab=a:d&&(d.N=b,d.v&&d.v.ka.push(b))}
function mb(a,b,c){var d=U(a,{parent:!0}).node;a=Ia(a);if(!a||"."===a||".."===a)throw new O(28);var f=kb(d,a);if(f)throw new O(f);if(!d.g.M)throw new O(63);return d.g.M(d,a,b,c)}function X(a){return mb(a,16895,0)}function nb(a,b,c){"undefined"==typeof c&&(c=b,b=438);mb(a,b|8192,c)}function ob(a,b){if(!M(a))throw new O(44);var c=U(b,{parent:!0}).node;if(!c)throw new O(44);b=Ia(b);var d=kb(c,b);if(d)throw new O(d);if(!c.g.R)throw new O(63);c.g.R(c,b,a)}
function gb(a){a=U(a).node;if(!a)throw new O(44);if(!a.g.I)throw new O(28);return M(hb(a.parent),a.g.I(a))}
function pb(a,b){if(""===a)throw new O(44);if("string"==typeof b){var c={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[b];if("undefined"==typeof c)throw Error(`Unknown file open mode: ${b}`);b=c}var d=b&64?("undefined"==typeof d?438:d)&4095|32768:0;if("object"==typeof a)var f=a;else{a=L(a);try{f=U(a,{$:!(b&131072)}).node}catch(h){}}c=!1;if(b&64)if(f){if(b&128)throw new O(20);}else f=mb(a,d,0),c=!0;if(!f)throw new O(44);8192===(f.mode&61440)&&(b&=-513);if(b&65536&&16384!==(f.mode&61440))throw new O(54);
if(!c&&(d=f?40960===(f.mode&61440)?32:16384===(f.mode&61440)&&("r"!==jb(b)||b&512)?31:V(f,jb(b)):44))throw new O(d);if(b&512&&!c){d=f;d="string"==typeof d?U(d,{$:!0}).node:d;if(!d.g.s)throw new O(63);if(16384===(d.mode&61440))throw new O(31);if(32768!==(d.mode&61440))throw new O(28);if(c=V(d,"w"))throw new O(c);d.g.s(d,{size:0,timestamp:Date.now()})}b&=-131713;f={node:f,path:hb(f),flags:b,seekable:!0,position:0,i:f.i,qa:[],error:!1};d=-1;f=Object.assign(new eb,f);if(-1==d)a:{for(d=0;4096>=d;d++)if(!S[d])break a;
throw new O(33);}f.F=d;S[d]=f;f.i.open&&f.i.open(f);!g.logReadFiles||b&1||(qb||={},a in qb||(qb[a]=1))}function rb(a,b,c){if(null===a.F)throw new O(8);if(!a.seekable||!a.i.B)throw new O(70);if(0!=c&&1!=c&&2!=c)throw new O(28);a.position=a.i.B(a,b,c);a.qa=[]}var sb;
function Y(a,b,c){a=L("/dev/"+a);var d=$a(!!b,!!c);tb||=64;var f=tb++<<8|0;Sa(f,{open(h){h.seekable=!1},close(){c?.buffer?.length&&c(10)},read(h,l,t,u){for(var m=0,r=0;r<u;r++){try{var y=b()}catch(A){throw new O(29);}if(void 0===y&&0===m)throw new O(6);if(null===y||void 0===y)break;m++;l[t+r]=y}m&&(h.node.timestamp=Date.now());return m},write(h,l,t,u){for(var m=0;m<u;m++)try{c(l[t+m])}catch(r){throw new O(29);}u&&(h.node.timestamp=Date.now());return m}});nb(a,d,f)}
var tb,ub={},qb,vb=a=>0===a%4&&(0!==a%100||0===a%400),wb=[31,29,31,30,31,30,31,31,30,31,30,31],xb=[31,28,31,30,31,30,31,31,30,31,30,31],yb=(a,b,c,d)=>{function f(e,p,q){for(e="number"==typeof e?e.toString():e||"";e.length<p;)e=q[0]+e;return e}function h(e,p){return f(e,p,"0")}function l(e,p){function q(R){return 0>R?-1:0<R?1:0}var w;0===(w=q(e.getFullYear()-p.getFullYear()))&&0===(w=q(e.getMonth()-p.getMonth()))&&(w=q(e.getDate()-p.getDate()));return w}function t(e){switch(e.getDay()){case 0:return new Date(e.getFullYear()-
1,11,29);case 1:return e;case 2:return new Date(e.getFullYear(),0,3);case 3:return new Date(e.getFullYear(),0,2);case 4:return new Date(e.getFullYear(),0,1);case 5:return new Date(e.getFullYear()-1,11,31);case 6:return new Date(e.getFullYear()-1,11,30)}}function u(e){var p=e.C;for(e=new Date((new Date(e.D+1900,0,1)).getTime());0<p;){var q=e.getMonth(),w=(vb(e.getFullYear())?wb:xb)[q];if(p>w-e.getDate())p-=w-e.getDate()+1,e.setDate(1),11>q?e.setMonth(q+1):(e.setMonth(0),e.setFullYear(e.getFullYear()+
1));else{e.setDate(e.getDate()+p);break}}q=new Date(e.getFullYear()+1,0,4);p=t(new Date(e.getFullYear(),0,4));q=t(q);return 0>=l(p,e)?0>=l(q,e)?e.getFullYear()+1:e.getFullYear():e.getFullYear()-1}var m=E[d+40>>2];d={oa:D[d>>2],na:D[d+4>>2],S:D[d+8>>2],X:D[d+12>>2],T:D[d+16>>2],D:D[d+20>>2],u:D[d+24>>2],C:D[d+28>>2],Ka:D[d+32>>2],ma:D[d+36>>2],pa:m?m?N(C,m):"":""};c=c?N(C,c):"";m={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S",
"%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var r in m)c=c.replace(new RegExp(r,"g"),m[r]);var y="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),A="January February March April May June July August September October November December".split(" ");m={"%a":e=>y[e.u].substring(0,
3),"%A":e=>y[e.u],"%b":e=>A[e.T].substring(0,3),"%B":e=>A[e.T],"%C":e=>h((e.D+1900)/100|0,2),"%d":e=>h(e.X,2),"%e":e=>f(e.X,2," "),"%g":e=>u(e).toString().substring(2),"%G":u,"%H":e=>h(e.S,2),"%I":e=>{e=e.S;0==e?e=12:12<e&&(e-=12);return h(e,2)},"%j":e=>{for(var p=0,q=0;q<=e.T-1;p+=(vb(e.D+1900)?wb:xb)[q++]);return h(e.X+p,3)},"%m":e=>h(e.T+1,2),"%M":e=>h(e.na,2),"%n":()=>"\n","%p":e=>0<=e.S&&12>e.S?"AM":"PM","%S":e=>h(e.oa,2),"%t":()=>"\t","%u":e=>e.u||7,"%U":e=>h(Math.floor((e.C+7-e.u)/7),2),"%V":e=>
{var p=Math.floor((e.C+7-(e.u+6)%7)/7);2>=(e.u+371-e.C-2)%7&&p++;if(p)53==p&&(q=(e.u+371-e.C)%7,4==q||3==q&&vb(e.D)||(p=1));else{p=52;var q=(e.u+7-e.C-1)%7;(4==q||5==q&&vb(e.D%400-1))&&p++}return h(p,2)},"%w":e=>e.u,"%W":e=>h(Math.floor((e.C+7-(e.u+6)%7)/7),2),"%y":e=>(e.D+1900).toString().substring(2),"%Y":e=>e.D+1900,"%z":e=>{e=e.ma;var p=0<=e;e=Math.abs(e)/60;return(p?"+":"-")+String("0000"+(e/60*100+e%60)).slice(-4)},"%Z":e=>e.pa,"%%":()=>"%"};c=c.replace(/%%/g,"\x00\x00");for(r in m)c.includes(r)&&
(c=c.replace(new RegExp(r,"g"),m[r](d)));c=c.replace(/\0\0/g,"%");r=Pa(c,!1);if(r.length>b)return 0;B.set(r,a);return r.length-1},zb=a=>{z=z=a;za||(g.onExit?.(a),ja=!0);ea(a,new ya(a))};[44].forEach(a=>{Za[a]=new O(a);Za[a].stack="<generic error, no stack>"});T=Array(4096);lb(P,"/");X("/tmp");X("/home");X("/home/web_user");
(function(){X("/dev");Sa(259,{read:()=>0,write:(d,f,h,l)=>l});nb("/dev/null",259);Ra(1280,Ua);Ra(1536,Va);nb("/dev/tty",1280);nb("/dev/tty1",1536);var a=new Uint8Array(1024),b=0,c=()=>{0===b&&(b=Ka(a).byteLength);return a[--b]};Y("random",c);Y("urandom",c);X("/dev/shm");X("/dev/shm/tmp")})();(function(){X("/proc");var a=X("/proc/self");X("/proc/self/fd");lb({v(){var b=Ya(a,"fd",16895,73);b.g={H(c,d){var f=W(+d);c={parent:null,v:{da:"fake"},g:{I:()=>f.path}};return c.parent=c}};return b}},"/proc/self/fd")})();
var Ab={__cxa_throw:(a,b,c)=>{var d=new Aa(a);E[d.O+16>>2]=0;E[d.O+4>>2]=b;E[d.O+8>>2]=c;Ba=a;Ca++;throw Ba;},_emscripten_get_now_is_monotonic:()=>1,_emscripten_memcpy_js:(a,b,c)=>C.copyWithin(a,b,b+c),abort:()=>{H("")},emscripten_date_now:()=>Date.now(),emscripten_get_now:()=>performance.now(),emscripten_resize_heap:()=>{H("OOM")},environ_get:(a,b)=>{var c=0;Fa().forEach((d,f)=>{var h=b+c;f=E[a+4*f>>2]=h;for(h=0;h<d.length;++h)B[f++]=d.charCodeAt(h);B[f]=0;c+=d.length+1});return 0},environ_sizes_get:(a,
b)=>{var c=Fa();E[a>>2]=c.length;var d=0;c.forEach(f=>d+=f.length+1);E[b>>2]=d;return 0},fd_close:function(a){try{var b=W(a);if(null===b.F)throw new O(8);b.U&&(b.U=null);try{b.i.close&&b.i.close(b)}catch(c){throw c;}finally{S[b.F]=null}b.F=null;return 0}catch(c){if("undefined"==typeof ub||"ErrnoError"!==c.name)throw c;return c.J}},fd_read:function(a,b,c,d){try{a:{var f=W(a);a=b;for(var h,l=b=0;l<c;l++){var t=E[a>>2],u=E[a+4>>2];a+=8;var m=f,r=h,y=B;if(0>u||0>r)throw new O(28);if(null===m.F)throw new O(8);
if(1===(m.flags&2097155))throw new O(8);if(16384===(m.node.mode&61440))throw new O(31);if(!m.i.read)throw new O(28);var A="undefined"!=typeof r;if(!A)r=m.position;else if(!m.seekable)throw new O(70);var e=m.i.read(m,y,t,u,r);A||(m.position+=e);var p=e;if(0>p){var q=-1;break a}b+=p;if(p<u)break;"undefined"!=typeof h&&(h+=p)}q=b}E[d>>2]=q;return 0}catch(w){if("undefined"==typeof ub||"ErrnoError"!==w.name)throw w;return w.J}},fd_seek:function(a,b,c,d,f){b=c+2097152>>>0<4194305-!!b?(b>>>0)+4294967296*
c:NaN;try{if(isNaN(b))return 61;var h=W(a);rb(h,b,d);xa=[h.position>>>0,(J=h.position,1<=+Math.abs(J)?0<J?+Math.floor(J/4294967296)>>>0:~~+Math.ceil((J-+(~~J>>>0))/4294967296)>>>0:0)];D[f>>2]=xa[0];D[f+4>>2]=xa[1];h.U&&0===b&&0===d&&(h.U=null);return 0}catch(l){if("undefined"==typeof ub||"ErrnoError"!==l.name)throw l;return l.J}},fd_write:function(a,b,c,d){try{a:{var f=W(a);a=b;for(var h,l=b=0;l<c;l++){var t=E[a>>2],u=E[a+4>>2];a+=8;var m=f,r=t,y=u,A=h,e=B;if(0>y||0>A)throw new O(28);if(null===m.F)throw new O(8);
if(0===(m.flags&2097155))throw new O(8);if(16384===(m.node.mode&61440))throw new O(31);if(!m.i.write)throw new O(28);m.seekable&&m.flags&1024&&rb(m,0,2);var p="undefined"!=typeof A;if(!p)A=m.position;else if(!m.seekable)throw new O(70);var q=m.i.write(m,e,r,y,A,void 0);p||(m.position+=q);var w=q;if(0>w){var R=-1;break a}b+=w;"undefined"!=typeof h&&(h+=w)}R=b}E[d>>2]=R;return 0}catch(va){if("undefined"==typeof ub||"ErrnoError"!==va.name)throw va;return va.J}},strftime_l:(a,b,c,d)=>yb(a,b,c,d)},Z=function(){function a(c){Z=
c.exports;ia=Z.memory;c=ia.buffer;g.HEAP8=B=new Int8Array(c);g.HEAP16=new Int16Array(c);g.HEAPU8=C=new Uint8Array(c);g.HEAPU16=new Uint16Array(c);g.HEAP32=D=new Int32Array(c);g.HEAPU32=E=new Uint32Array(c);g.HEAPF32=new Float32Array(c);g.HEAPF64=new Float64Array(c);la.unshift(Z.__wasm_call_ctors);F--;g.monitorRunDependencies?.(F);0==F&&(null!==pa&&(clearInterval(pa),pa=null),G&&(c=G,G=null,c()));return Z}var b={env:Ab,wasi_snapshot_preview1:Ab};F++;g.monitorRunDependencies?.(F);if(g.instantiateWasm)try{return g.instantiateWasm(b,
a)}catch(c){v(`Module.instantiateWasm callback failed with error: ${c}`),k(c)}wa(b,function(c){a(c.instance)}).catch(k);return{}}();g.__Z8wasmMaindddd=(a,b,c,d)=>(g.__Z8wasmMaindddd=Z._Z8wasmMaindddd)(a,b,c,d);var Bb=g._main=(a,b)=>(Bb=g._main=Z.__main_argc_argv)(a,b),Cb=a=>(Cb=Z._emscripten_stack_alloc)(a);g.dynCall_viijii=(a,b,c,d,f,h,l)=>(g.dynCall_viijii=Z.dynCall_viijii)(a,b,c,d,f,h,l);g.dynCall_jiji=(a,b,c,d,f)=>(g.dynCall_jiji=Z.dynCall_jiji)(a,b,c,d,f);
g.dynCall_iiiiij=(a,b,c,d,f,h,l)=>(g.dynCall_iiiiij=Z.dynCall_iiiiij)(a,b,c,d,f,h,l);g.dynCall_iiiiijj=(a,b,c,d,f,h,l,t,u)=>(g.dynCall_iiiiijj=Z.dynCall_iiiiijj)(a,b,c,d,f,h,l,t,u);g.dynCall_iiiiiijj=(a,b,c,d,f,h,l,t,u,m)=>(g.dynCall_iiiiiijj=Z.dynCall_iiiiiijj)(a,b,c,d,f,h,l,t,u,m);g.callMain=Db;var Eb;G=function Fb(){Eb||Gb();Eb||(G=Fb)};
function Db(a=[]){var b=Bb;a.unshift(da);var c=a.length,d=Cb(4*(c+1)),f=d;a.forEach(l=>{var t=E,u=f>>2,m=Na(l)+1,r=Cb(m);Oa(l,C,r,m);t[u]=r;f+=4});E[f>>2]=0;try{var h=b(c,d);zb(h);return h}catch(l){return l instanceof ya||"unwind"==l?a=z:(ea(1,l),a=void 0),a}}
function Gb(){var a=ca;function b(){if(!Eb&&(Eb=!0,g.calledRun=!0,!ja)){g.noFSInit||sb||(sb=!0,g.stdin=g.stdin,g.stdout=g.stdout,g.stderr=g.stderr,g.stdin?Y("stdin",g.stdin):ob("/dev/tty","/dev/stdin"),g.stdout?Y("stdout",null,g.stdout):ob("/dev/tty","/dev/stdout"),g.stderr?Y("stderr",null,g.stderr):ob("/dev/tty1","/dev/stderr"),pb("/dev/stdin",0),pb("/dev/stdout",1),pb("/dev/stderr",1));db=!1;K(la);K(ma);aa(g);if(g.onRuntimeInitialized)g.onRuntimeInitialized();Hb&&Db(a);if(g.postRun)for("function"==
typeof g.postRun&&(g.postRun=[g.postRun]);g.postRun.length;){var c=g.postRun.shift();na.unshift(c)}K(na)}}if(!(0<F)){if(g.preRun)for("function"==typeof g.preRun&&(g.preRun=[g.preRun]);g.preRun.length;)oa();K(ka);0<F||(g.setStatus?(g.setStatus("Running..."),setTimeout(function(){setTimeout(function(){g.setStatus("")},1);b()},1)):b())}}if(g.preInit)for("function"==typeof g.preInit&&(g.preInit=[g.preInit]);0<g.preInit.length;)g.preInit.pop()();var Hb=!1;g.noInitialRun&&(Hb=!1);Gb();


  return readyPromise
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = GlueCode;
else if (typeof define === 'function' && define['amd'])
  define([], () => GlueCode);
