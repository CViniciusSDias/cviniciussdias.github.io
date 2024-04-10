(()=>{var e={5659:(e,n,t)=>{"use strict";t.r(n)},3390:e=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{const a=e[t],i=typeof a;"object"!==i&&"function"!==i||Object.isFrozen(a)||n(a)})),e}class t{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function i(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}const s=e=>!!e.scope;class r{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=a(e)}openNode(e){if(!s(e))return;const n=((e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){s(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const o=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class c{constructor(){this.rootNode=o(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=o({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class l extends c{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){return new r(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function u(e){return e?"string"==typeof e?e:e.source:null}function g(e){return p("(?=",e,")")}function d(e){return p("(?:",e,")*")}function h(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>u(e))).join("")}function b(...e){const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>u(e))).join("|")+")"}function f(e){return new RegExp(e.toString()+"|").exec("").length-1}const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function _(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let a=u(e),i="";for(;a.length>0;){const e=m.exec(a);if(!e){i+=a;break}i+=a.substring(0,e.index),a=a.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?i+="\\"+String(Number(e[1])+n):(i+=e[0],"("===e[0]&&t++)}return i})).map((e=>`(${e})`)).join(n)}const E="[a-zA-Z]\\w*",w="[a-zA-Z_]\\w*",y="\\b\\d+(\\.\\d+)?",x="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",N={begin:"\\\\[\\s\\S]",relevance:0},S={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[N]},O={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[N]},k=function(e,n,t={}){const a=i({scope:"comment",begin:e,end:n,contains:[]},t);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const s=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:p(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},M=k("//","$"),I=k("/\\*","\\*/"),R=k("#","$"),T={scope:"number",begin:y,relevance:0},A={scope:"number",begin:x,relevance:0},L={scope:"number",begin:v,relevance:0},C={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[N,{begin:/\[/,end:/\]/,relevance:0,contains:[N]}]},D={scope:"title",begin:E,relevance:0},j={scope:"title",begin:w,relevance:0},B={begin:"\\.\\s*"+w,relevance:0};var z=Object.freeze({__proto__:null,APOS_STRING_MODE:S,BACKSLASH_ESCAPE:N,BINARY_NUMBER_MODE:L,BINARY_NUMBER_RE:v,COMMENT:k,C_BLOCK_COMMENT_MODE:I,C_LINE_COMMENT_MODE:M,C_NUMBER_MODE:A,C_NUMBER_RE:x,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:R,IDENT_RE:E,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:B,NUMBER_MODE:T,NUMBER_RE:y,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:O,REGEXP_MODE:C,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=p(n,/.*\b/,e.binary,/\b.*/)),i({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:D,UNDERSCORE_IDENT_RE:w,UNDERSCORE_TITLE_MODE:j});function P(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function $(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function H(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=P,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function U(e,n){Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function F(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function G(e,n){void 0===e.relevance&&(e.relevance=1)}const Z=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=p(t.beforeMatch,g(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},K=["of","and","for","in","not","or","if","then","parent","list","value"],W="keyword";function X(e,n,t=W){const a=Object.create(null);return"string"==typeof e?i(t,e.split(" ")):Array.isArray(e)?i(t,e):Object.keys(e).forEach((function(t){Object.assign(a,X(e[t],n,t))})),a;function i(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");a[t[0]]=[e,q(t[0],t[1])]}))}}function q(e,n){return n?Number(n):function(e){return K.includes(e.toLowerCase())}(e)?0:1}const Q={},V=e=>{console.error(e)},J=(e,...n)=>{console.log(`WARN: ${e}`,...n)},Y=(e,n)=>{Q[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),Q[`${e}/${n}`]=!0)},ee=new Error;function ne(e,n,{key:t}){let a=0;const i=e[t],s={},r={};for(let e=1;e<=n.length;e++)r[e+a]=i[e],s[e+a]=!0,a+=f(n[e-1]);e[t]=r,e[t]._emit=s,e[t]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw V("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ee;if("object"!=typeof e.beginScope||null===e.beginScope)throw V("beginScope must be object"),ee;ne(e,e.begin,{key:"beginScope"}),e.begin=_(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw V("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ee;if("object"!=typeof e.endScope||null===e.endScope)throw V("endScope must be object"),ee;ne(e,e.end,{key:"endScope"}),e.end=_(e.end,{joinWith:""})}}(e)}function ae(e){function n(n,t){return new RegExp(u(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=f(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(_(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),a=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,a)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=i(e.classNameAliases||{}),function t(s,r){const o=s;if(s.isCompiled)return o;[$,F,te,Z].forEach((e=>e(s,r))),e.compilerExtensions.forEach((e=>e(s,r))),s.__beforeBegin=null,[H,U,G].forEach((e=>e(s,r))),s.isCompiled=!0;let c=null;return"object"==typeof s.keywords&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),c=s.keywords.$pattern,delete s.keywords.$pattern),c=c||/\w+/,s.keywords&&(s.keywords=X(s.keywords,e.case_insensitive)),o.keywordPatternRe=n(c,!0),r&&(s.begin||(s.begin=/\B|\b/),o.beginRe=n(o.begin),s.end||s.endsWithParent||(s.end=/\B|\b/),s.end&&(o.endRe=n(o.end)),o.terminatorEnd=u(o.end)||"",s.endsWithParent&&r.terminatorEnd&&(o.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(o.illegalRe=n(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return i(e,{variants:null},n)})));if(e.cachedVariants)return e.cachedVariants;if(ie(e))return i(e,{starts:e.starts?i(e.starts):null});if(Object.isFrozen(e))return i(e);return e}("self"===e?s:e)}))),s.contains.forEach((function(e){t(e,o)})),s.starts&&t(s.starts,r),o.matcher=function(e){const n=new a;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(o),o}(e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class se extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const re=a,oe=i,ce=Symbol("nomatch"),le=function(e){const a=Object.create(null),i=Object.create(null),s=[];let r=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let u={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:l};function f(e){return u.noHighlightRe.test(e)}function m(e,n,t){let a="",i="";"object"==typeof n?(a=e,t=n.ignoreIllegals,i=n.language):(Y("10.7.0","highlight(lang, code, ...args) has been deprecated."),Y("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),i=e,a=n),void 0===t&&(t=!0);const s={code:a,language:i};O("before:highlight",s);const r=s.result?s.result:_(s.language,s.code,t);return r.code=s.code,O("after:highlight",r),r}function _(e,n,i,s){const c=Object.create(null);function l(){if(!O.keywords)return void M.addText(I);let e=0;O.keywordPatternRe.lastIndex=0;let n=O.keywordPatternRe.exec(I),t="";for(;n;){t+=I.substring(e,n.index);const i=x.case_insensitive?n[0].toLowerCase():n[0],s=(a=i,O.keywords[a]);if(s){const[e,a]=s;if(M.addText(t),t="",c[i]=(c[i]||0)+1,c[i]<=7&&(R+=a),e.startsWith("_"))t+=n[0];else{const t=x.classNameAliases[e]||e;d(n[0],t)}}else t+=n[0];e=O.keywordPatternRe.lastIndex,n=O.keywordPatternRe.exec(I)}var a;t+=I.substring(e),M.addText(t)}function g(){null!=O.subLanguage?function(){if(""===I)return;let e=null;if("string"==typeof O.subLanguage){if(!a[O.subLanguage])return void M.addText(I);e=_(O.subLanguage,I,!0,k[O.subLanguage]),k[O.subLanguage]=e._top}else e=E(I,O.subLanguage.length?O.subLanguage:null);O.relevance>0&&(R+=e.relevance),M.__addSublanguage(e._emitter,e.language)}():l(),I=""}function d(e,n){""!==e&&(M.startScope(n),M.addText(e),M.endScope())}function h(e,n){let t=1;const a=n.length-1;for(;t<=a;){if(!e._emit[t]){t++;continue}const a=x.classNameAliases[e[t]]||e[t],i=n[t];a?d(i,a):(I=i,l(),I=""),t++}}function p(e,n){return e.scope&&"string"==typeof e.scope&&M.openNode(x.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(d(I,x.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),I=""):e.beginScope._multi&&(h(e.beginScope,n),I="")),O=Object.create(e,{parent:{value:O}}),O}function b(e,n,a){let i=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,a);if(i){if(e["on:end"]){const a=new t(e);e["on:end"](n,a),a.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return b(e.parent,n,a)}function f(e){return 0===O.matcher.regexIndex?(I+=e[0],1):(L=!0,0)}function m(e){const t=e[0],a=n.substring(e.index),i=b(O,e,a);if(!i)return ce;const s=O;O.endScope&&O.endScope._wrap?(g(),d(t,O.endScope._wrap)):O.endScope&&O.endScope._multi?(g(),h(O.endScope,e)):s.skip?I+=t:(s.returnEnd||s.excludeEnd||(I+=t),g(),s.excludeEnd&&(I=t));do{O.scope&&M.closeNode(),O.skip||O.subLanguage||(R+=O.relevance),O=O.parent}while(O!==i.parent);return i.starts&&p(i.starts,e),s.returnEnd?0:t.length}let w={};function y(a,s){const o=s&&s[0];if(I+=a,null==o)return g(),0;if("begin"===w.type&&"end"===s.type&&w.index===s.index&&""===o){if(I+=n.slice(s.index,s.index+1),!r){const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=w.rule,n}return 1}if(w=s,"begin"===s.type)return function(e){const n=e[0],a=e.rule,i=new t(a),s=[a.__beforeBegin,a["on:begin"]];for(const t of s)if(t&&(t(e,i),i.isMatchIgnored))return f(n);return a.skip?I+=n:(a.excludeBegin&&(I+=n),g(),a.returnBegin||a.excludeBegin||(I=n)),p(a,e),a.returnBegin?0:n.length}(s);if("illegal"===s.type&&!i){const e=new Error('Illegal lexeme "'+o+'" for mode "'+(O.scope||"<unnamed>")+'"');throw e.mode=O,e}if("end"===s.type){const e=m(s);if(e!==ce)return e}if("illegal"===s.type&&""===o)return 1;if(A>1e5&&A>3*s.index){throw new Error("potential infinite loop, way more iterations than matches")}return I+=o,o.length}const x=v(e);if(!x)throw V(o.replace("{}",e)),new Error('Unknown language: "'+e+'"');const N=ae(x);let S="",O=s||N;const k={},M=new u.__emitter(u);!function(){const e=[];for(let n=O;n!==x;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>M.openNode(e)))}();let I="",R=0,T=0,A=0,L=!1;try{if(x.__emitTokens)x.__emitTokens(n,M);else{for(O.matcher.considerAll();;){A++,L?L=!1:O.matcher.considerAll(),O.matcher.lastIndex=T;const e=O.matcher.exec(n);if(!e)break;const t=y(n.substring(T,e.index),e);T=e.index+t}y(n.substring(T))}return M.finalize(),S=M.toHTML(),{language:e,value:S,relevance:R,illegal:!1,_emitter:M,_top:O}}catch(t){if(t.message&&t.message.includes("Illegal"))return{language:e,value:re(n),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:T,context:n.slice(T-100,T+100),mode:t.mode,resultSoFar:S},_emitter:M};if(r)return{language:e,value:re(n),illegal:!1,relevance:0,errorRaised:t,_emitter:M,_top:O};throw t}}function E(e,n){n=n||u.languages||Object.keys(a);const t=function(e){const n={value:re(e),illegal:!1,relevance:0,_top:c,_emitter:new u.__emitter(u)};return n._emitter.addText(e),n}(e),i=n.filter(v).filter(S).map((n=>_(n,e,!1)));i.unshift(t);const s=i.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(v(e.language).supersetOf===n.language)return 1;if(v(n.language).supersetOf===e.language)return-1}return 0})),[r,o]=s,l=r;return l.secondBest=o,l}function w(e){let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=u.languageDetectRe.exec(n);if(t){const n=v(t[1]);return n||(J(o.replace("{}",t[1])),J("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>f(e)||v(e)))}(e);if(f(t))return;if(O("before:highlightElement",{el:e,language:t}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(u.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),u.throwUnescapedHTML)){throw new se("One of your code blocks includes unescaped HTML.",e.innerHTML)}n=e;const a=n.textContent,s=t?m(a,{language:t,ignoreIllegals:!0}):E(a);e.innerHTML=s.value,e.dataset.highlighted="yes",function(e,n,t){const a=n&&i[n]||t;e.classList.add("hljs"),e.classList.add(`language-${a}`)}(e,t,s.language),e.result={language:s.language,re:s.relevance,relevance:s.relevance},s.secondBest&&(e.secondBest={language:s.secondBest.language,relevance:s.secondBest.relevance}),O("after:highlightElement",{el:e,result:s,text:a})}let y=!1;function x(){if("loading"===document.readyState)return void(y=!0);document.querySelectorAll(u.cssSelector).forEach(w)}function v(e){return e=(e||"").toLowerCase(),a[e]||a[i[e]]}function N(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{i[e.toLowerCase()]=n}))}function S(e){const n=v(e);return n&&!n.disableAutodetect}function O(e,n){const t=e;s.forEach((function(e){e[t]&&e[t](n)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){y&&x()}),!1),Object.assign(e,{highlight:m,highlightAuto:E,highlightAll:x,highlightElement:w,highlightBlock:function(e){return Y("10.7.0","highlightBlock will be removed entirely in v12.0"),Y("10.7.0","Please use highlightElement now."),w(e)},configure:function(e){u=oe(u,e)},initHighlighting:()=>{x(),Y("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){x(),Y("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,t){let i=null;try{i=t(e)}catch(e){if(V("Language definition for '{}' could not be registered.".replace("{}",n)),!r)throw e;V(e),i=c}i.name||(i.name=n),a[n]=i,i.rawDefinition=t.bind(null,e),i.aliases&&N(i.aliases,{languageName:n})},unregisterLanguage:function(e){delete a[e];for(const n of Object.keys(i))i[n]===e&&delete i[n]},listLanguages:function(){return Object.keys(a)},getLanguage:v,registerAliases:N,autoDetection:S,inherit:oe,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),s.push(e)},removePlugin:function(e){const n=s.indexOf(e);-1!==n&&s.splice(n,1)}}),e.debugMode=function(){r=!1},e.safeMode=function(){r=!0},e.versionString="11.9.0",e.regex={concat:p,lookahead:g,either:b,optional:h,anyNumberOfTimes:d};for(const e in z)"object"==typeof z[e]&&n(z[e]);return Object.assign(e,z),e},ue=le({});ue.newInstance=()=>le({}),e.exports=ue,ue.HighlightJS=ue,ue.default=ue},8780:e=>{e.exports=function(e){const n=e.regex,t={},a={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:n.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},a]});const i={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},s={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},r={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t,i]};i.contains.push(r);const o={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,t]},c=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),l={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:["if","then","else","elif","fi","for","while","until","in","do","done","case","esac","function","select"],literal:["true","false"],built_in:["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset","alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","type","typeset","ulimit","unalias","set","shopt","autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp","chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"]},contains:[c,e.SHEBANG(),l,o,e.HASH_COMMENT_MODE,s,{match:/(\/[a-z._-]+)+/},r,{match:/\\"/},{className:"string",begin:/'/,end:/'/},{match:/\\'/},t]}}},8937:e=>{e.exports=function(e){const n="HTTP/([32]|1\\.[01])",t={className:"attribute",begin:e.regex.concat("^",/[A-Za-z][A-Za-z0-9-]*/,"(?=\\:\\s)"),starts:{contains:[{className:"punctuation",begin:/: /,relevance:0,starts:{end:"$",relevance:0}}]}},a=[t,{begin:"\\n\\n",starts:{subLanguage:[],endsWithParent:!0}}];return{name:"HTTP",aliases:["https"],illegal:/\S/,contains:[{begin:"^(?="+n+" \\d{3})",end:/$/,contains:[{className:"meta",begin:n},{className:"number",begin:"\\b\\d{3}\\b"}],starts:{end:/\b\B/,illegal:/\S/,contains:a}},{begin:"(?=^[A-Z]+ (.*?) "+n+"$)",end:/$/,contains:[{className:"string",begin:" ",end:" ",excludeBegin:!0,excludeEnd:!0},{className:"meta",begin:n},{className:"keyword",begin:"[A-Z]+"}],starts:{end:/\b\B/,illegal:/\S/,contains:a}},e.inherit(t,{relevance:0})]}}},2656:e=>{e.exports=function(e){const n=e.regex,t=/(?![A-Za-z0-9])(?![$])/,a=n.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,t),i=n.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,t),s={scope:"variable",match:"\\$+"+a},r={scope:"subst",variants:[{begin:/\$\w+/},{begin:/\{\$/,end:/\}/}]},o=e.inherit(e.APOS_STRING_MODE,{illegal:null}),c="[ \t\n]",l={scope:"string",variants:[e.inherit(e.QUOTE_STRING_MODE,{illegal:null,contains:e.QUOTE_STRING_MODE.contains.concat(r)}),o,{begin:/<<<[ \t]*(?:(\w+)|"(\w+)")\n/,end:/[ \t]*(\w+)\b/,contains:e.QUOTE_STRING_MODE.contains.concat(r),"on:begin":(e,n)=>{n.data._beginMatch=e[1]||e[2]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}},e.END_SAME_AS_BEGIN({begin:/<<<[ \t]*'(\w+)'\n/,end:/[ \t]*(\w+)\b/})]},u={scope:"number",variants:[{begin:"\\b0[bB][01]+(?:_[01]+)*\\b"},{begin:"\\b0[oO][0-7]+(?:_[0-7]+)*\\b"},{begin:"\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"},{begin:"(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"}],relevance:0},g=["false","null","true"],d=["__CLASS__","__DIR__","__FILE__","__FUNCTION__","__COMPILER_HALT_OFFSET__","__LINE__","__METHOD__","__NAMESPACE__","__TRAIT__","die","echo","exit","include","include_once","print","require","require_once","array","abstract","and","as","binary","bool","boolean","break","callable","case","catch","class","clone","const","continue","declare","default","do","double","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","enum","eval","extends","final","finally","float","for","foreach","from","global","goto","if","implements","instanceof","insteadof","int","integer","interface","isset","iterable","list","match|0","mixed","new","never","object","or","private","protected","public","readonly","real","return","string","switch","throw","trait","try","unset","use","var","void","while","xor","yield"],h=["Error|0","AppendIterator","ArgumentCountError","ArithmeticError","ArrayIterator","ArrayObject","AssertionError","BadFunctionCallException","BadMethodCallException","CachingIterator","CallbackFilterIterator","CompileError","Countable","DirectoryIterator","DivisionByZeroError","DomainException","EmptyIterator","ErrorException","Exception","FilesystemIterator","FilterIterator","GlobIterator","InfiniteIterator","InvalidArgumentException","IteratorIterator","LengthException","LimitIterator","LogicException","MultipleIterator","NoRewindIterator","OutOfBoundsException","OutOfRangeException","OuterIterator","OverflowException","ParentIterator","ParseError","RangeException","RecursiveArrayIterator","RecursiveCachingIterator","RecursiveCallbackFilterIterator","RecursiveDirectoryIterator","RecursiveFilterIterator","RecursiveIterator","RecursiveIteratorIterator","RecursiveRegexIterator","RecursiveTreeIterator","RegexIterator","RuntimeException","SeekableIterator","SplDoublyLinkedList","SplFileInfo","SplFileObject","SplFixedArray","SplHeap","SplMaxHeap","SplMinHeap","SplObjectStorage","SplObserver","SplPriorityQueue","SplQueue","SplStack","SplSubject","SplTempFileObject","TypeError","UnderflowException","UnexpectedValueException","UnhandledMatchError","ArrayAccess","BackedEnum","Closure","Fiber","Generator","Iterator","IteratorAggregate","Serializable","Stringable","Throwable","Traversable","UnitEnum","WeakReference","WeakMap","Directory","__PHP_Incomplete_Class","parent","php_user_filter","self","static","stdClass"],p={keyword:d,literal:(e=>{const n=[];return e.forEach((e=>{n.push(e),e.toLowerCase()===e?n.push(e.toUpperCase()):n.push(e.toLowerCase())})),n})(g),built_in:h},b=e=>e.map((e=>e.replace(/\|\d+$/,""))),f={variants:[{match:[/new/,n.concat(c,"+"),n.concat("(?!",b(h).join("\\b|"),"\\b)"),i],scope:{1:"keyword",4:"title.class"}}]},m=n.concat(a,"\\b(?!\\()"),_={variants:[{match:[n.concat(/::/,n.lookahead(/(?!class\b)/)),m],scope:{2:"variable.constant"}},{match:[/::/,/class/],scope:{2:"variable.language"}},{match:[i,n.concat(/::/,n.lookahead(/(?!class\b)/)),m],scope:{1:"title.class",3:"variable.constant"}},{match:[i,n.concat("::",n.lookahead(/(?!class\b)/))],scope:{1:"title.class"}},{match:[i,/::/,/class/],scope:{1:"title.class",3:"variable.language"}}]},E={scope:"attr",match:n.concat(a,n.lookahead(":"),n.lookahead(/(?!::)/))},w={relevance:0,begin:/\(/,end:/\)/,keywords:p,contains:[E,s,_,e.C_BLOCK_COMMENT_MODE,l,u,f]},y={relevance:0,match:[/\b/,n.concat("(?!fn\\b|function\\b|",b(d).join("\\b|"),"|",b(h).join("\\b|"),"\\b)"),a,n.concat(c,"*"),n.lookahead(/(?=\()/)],scope:{3:"title.function.invoke"},contains:[w]};w.contains.push(y);const x=[E,_,e.C_BLOCK_COMMENT_MODE,l,u,f];return{case_insensitive:!1,keywords:p,contains:[{begin:n.concat(/#\[\s*/,i),beginScope:"meta",end:/]/,endScope:"meta",keywords:{literal:g,keyword:["new","array"]},contains:[{begin:/\[/,end:/]/,keywords:{literal:g,keyword:["new","array"]},contains:["self",...x]},...x,{scope:"meta",match:i}]},e.HASH_COMMENT_MODE,e.COMMENT("//","$"),e.COMMENT("/\\*","\\*/",{contains:[{scope:"doctag",match:"@[A-Za-z]+"}]}),{match:/__halt_compiler\(\);/,keywords:"__halt_compiler",starts:{scope:"comment",end:e.MATCH_NOTHING_RE,contains:[{match:/\?>/,scope:"meta",endsParent:!0}]}},{scope:"meta",variants:[{begin:/<\?php/,relevance:10},{begin:/<\?=/},{begin:/<\?/,relevance:.1},{begin:/\?>/}]},{scope:"variable.language",match:/\$this\b/},s,y,_,{match:[/const/,/\s/,a],scope:{1:"keyword",3:"variable.constant"}},f,{scope:"function",relevance:0,beginKeywords:"fn function",end:/[;{]/,excludeEnd:!0,illegal:"[$%\\[]",contains:[{beginKeywords:"use"},e.UNDERSCORE_TITLE_MODE,{begin:"=>",endsParent:!0},{scope:"params",begin:"\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0,keywords:p,contains:["self",s,_,e.C_BLOCK_COMMENT_MODE,l,u]}]},{scope:"class",variants:[{beginKeywords:"enum",illegal:/[($"]/},{beginKeywords:"class interface trait",illegal:/[:($"]/}],relevance:0,end:/\{/,excludeEnd:!0,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"namespace",relevance:0,end:";",illegal:/[.']/,contains:[e.inherit(e.UNDERSCORE_TITLE_MODE,{scope:"title.class"})]},{beginKeywords:"use",relevance:0,end:";",contains:[{match:/\b(as|const|function)\b/,scope:"keyword"},e.UNDERSCORE_TITLE_MODE]},l,u]}}},9880:e=>{e.exports=function(e){const n=e.regex,t={className:"title.function.invoke",relevance:0,begin:n.concat(/\b/,/(?!let|for|while|if|else|match\b)/,e.IDENT_RE,n.lookahead(/\s*\(/))},a="([ui](8|16|32|64|128|size)|f(32|64))?",i=["drop ","Copy","Send","Sized","Sync","Drop","Fn","FnMut","FnOnce","ToOwned","Clone","Debug","PartialEq","PartialOrd","Eq","Ord","AsRef","AsMut","Into","From","Default","Iterator","Extend","IntoIterator","DoubleEndedIterator","ExactSizeIterator","SliceConcatExt","ToString","assert!","assert_eq!","bitflags!","bytes!","cfg!","col!","concat!","concat_idents!","debug_assert!","debug_assert_eq!","env!","eprintln!","panic!","file!","format!","format_args!","include_bytes!","include_str!","line!","local_data_key!","module_path!","option_env!","print!","println!","select!","stringify!","try!","unimplemented!","unreachable!","vec!","write!","writeln!","macro_rules!","assert_ne!","debug_assert_ne!"],s=["i8","i16","i32","i64","i128","isize","u8","u16","u32","u64","u128","usize","f32","f64","str","char","bool","Box","Option","Result","String","Vec"];return{name:"Rust",aliases:["rs"],keywords:{$pattern:e.IDENT_RE+"!?",type:s,keyword:["abstract","as","async","await","become","box","break","const","continue","crate","do","dyn","else","enum","extern","false","final","fn","for","if","impl","in","let","loop","macro","match","mod","move","mut","override","priv","pub","ref","return","self","Self","static","struct","super","trait","true","try","type","typeof","unsafe","unsized","use","virtual","where","while","yield"],literal:["true","false","Some","None","Ok","Err"],built_in:i},illegal:"</",contains:[e.C_LINE_COMMENT_MODE,e.COMMENT("/\\*","\\*/",{contains:["self"]}),e.inherit(e.QUOTE_STRING_MODE,{begin:/b?"/,illegal:null}),{className:"string",variants:[{begin:/b?r(#*)"(.|\n)*?"\1(?!#)/},{begin:/b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/}]},{className:"symbol",begin:/'[a-zA-Z_][a-zA-Z0-9_]*/},{className:"number",variants:[{begin:"\\b0b([01_]+)"+a},{begin:"\\b0o([0-7_]+)"+a},{begin:"\\b0x([A-Fa-f0-9_]+)"+a},{begin:"\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)"+a}],relevance:0},{begin:[/fn/,/\s+/,e.UNDERSCORE_IDENT_RE],className:{1:"keyword",3:"title.function"}},{className:"meta",begin:"#!?\\[",end:"\\]",contains:[{className:"string",begin:/"/,end:/"/}]},{begin:[/let/,/\s+/,/(?:mut\s+)?/,e.UNDERSCORE_IDENT_RE],className:{1:"keyword",3:"keyword",4:"variable"}},{begin:[/for/,/\s+/,e.UNDERSCORE_IDENT_RE,/\s+/,/in/],className:{1:"keyword",3:"variable",5:"keyword"}},{begin:[/type/,/\s+/,e.UNDERSCORE_IDENT_RE],className:{1:"keyword",3:"title.class"}},{begin:[/(?:trait|enum|struct|union|impl|for)/,/\s+/,e.UNDERSCORE_IDENT_RE],className:{1:"keyword",3:"title.class"}},{begin:e.IDENT_RE+"::",keywords:{keyword:"Self",built_in:i,type:s}},{className:"punctuation",begin:"->"},t]}}},7874:e=>{e.exports=function(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}},4610:e=>{e.exports=function(e){const n=e.regex,t=n.concat(/[\p{L}_]/u,n.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),a={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},s=e.inherit(i,{begin:/\(/,end:/\)/}),r=e.inherit(e.APOS_STRING_MODE,{className:"string"}),o=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[a]},{begin:/'/,end:/'/,contains:[a]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,o,r,s,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,s,o,r]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},a,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[o]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:n.concat(/</,n.lookahead(n.concat(t,n.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:c}]},{className:"tag",begin:n.concat(/<\//,n.lookahead(n.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}}},n={};function t(a){var i=n[a];if(void 0!==i)return i.exports;var s=n[a]={exports:{}};return e[a](s,s.exports,t),s.exports}t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t(5659);var n=null!==(e=window)&&void 0!==e&&null!==(e=e.matchMedia("(prefers-color-scheme: dark)"))&&void 0!==e&&e.matches?"github-dark":"github-light";document.getElementById("comment-script").setAttribute("theme",n);var a=t(3390);a.registerLanguage("xml",t(4610)),a.registerLanguage("php",t(2656)),a.registerLanguage("http",t(8937)),a.registerLanguage("shell",t(7874)),a.registerLanguage("bash",t(8780)),a.registerLanguage("rust",t(9880)),a.highlightAll()})()})();