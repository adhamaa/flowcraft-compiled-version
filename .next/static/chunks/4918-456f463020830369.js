"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4918],{14918:function(e,t,s){s.d(t,{eA:function(){return er},kP:function(){return et}});var n,r,a,o,i,c=s(66628),l=s(46024),d=s.t(l,2);class u extends Error{constructor(e,t){e instanceof Error?super(void 0,{cause:{err:e,...e.cause,...t}}):"string"==typeof e?(t instanceof Error&&(t={err:t,...t.cause}),super(e,t)):super(void 0,e),this.name=this.constructor.name,this.type=this.constructor.type??"AuthError",this.kind=this.constructor.kind??"error",Error.captureStackTrace?.(this,this.constructor);let s=`https://errors.authjs.dev#${this.type.toLowerCase()}`;this.message+=`${this.message?". ":""}Read more at ${s}`}}class v extends u{}v.kind="signIn";class p extends u{}p.type="AdapterError";class h extends u{}h.type="AccessDenied";class y extends u{}y.type="CallbackRouteError";class f extends u{}f.type="ErrorPageLoop";class g extends u{}g.type="EventError";class E extends u{}E.type="InvalidCallbackUrl";class x extends v{constructor(){super(...arguments),this.code="credentials"}}x.type="CredentialsSignin";class S extends u{}S.type="InvalidEndpoints";class w extends u{}w.type="InvalidCheck";class _ extends u{}_.type="JWTSessionError";class b extends u{}b.type="MissingAdapter";class L extends u{}L.type="MissingAdapterMethods";class m extends u{}m.type="MissingAuthorize";class U extends u{}U.type="MissingSecret";class A extends v{}A.type="OAuthAccountNotLinked";class k extends v{}k.type="OAuthCallbackError";class C extends u{}C.type="OAuthProfileParseError";class R extends u{}R.type="SessionTokenError";class T extends v{}T.type="OAuthSignInError";class N extends v{}N.type="EmailSignInError";class P extends u{}P.type="SignOutError";class I extends u{}I.type="UnknownAction";class M extends u{}M.type="UnsupportedStrategy";class O extends u{}O.type="InvalidProvider";class H extends u{}H.type="UntrustedHost";class X extends u{}X.type="Verification";class W extends v{}W.type="MissingCSRF";class j extends u{}j.type="DuplicateConditionalUI";class V extends u{}V.type="MissingWebAuthnAutocomplete";class $ extends u{}$.type="WebAuthnVerificationError";class D extends v{}D.type="AccountNotLinked";class F extends u{}F.type="ExperimentalFeatureNotEnabled";class B extends u{}class J extends u{}async function q(e,t,s){var n;let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a="".concat("undefined"==typeof window?"".concat(t.baseUrlServer).concat(t.basePathServer):t.basePath,"/").concat(e);try{let e={headers:{"Content-Type":"application/json",...(null==r?void 0:null===(n=r.headers)||void 0===n?void 0:n.cookie)?{cookie:r.headers.cookie}:{}}};(null==r?void 0:r.body)&&(e.body=JSON.stringify(r.body),e.method="POST");let t=await fetch(a,e),s=await t.json();if(!t.ok)throw s;return s}catch(e){return s.error(new B(e.message,e)),null}}function z(){return Math.floor(Date.now()/1e3)}function G(e){let t=new URL("http://localhost:3000/api/auth");e&&!e.startsWith("http")&&(e="https://".concat(e));let s=new URL(e||t),n=("/"===s.pathname?t.pathname:s.pathname).replace(/\/$/,""),r="".concat(s.origin).concat(n);return{origin:s.origin,host:s.host,path:n,base:r,toString:()=>r}}var K=s(81767);let Q={baseUrl:G(null!==(r=K.env.NEXTAUTH_URL)&&void 0!==r?r:K.env.VERCEL_URL).origin,basePath:G(K.env.NEXTAUTH_URL).path,baseUrlServer:G(null!==(o=null!==(a=K.env.NEXTAUTH_URL_INTERNAL)&&void 0!==a?a:K.env.NEXTAUTH_URL)&&void 0!==o?o:K.env.VERCEL_URL).origin,basePathServer:G(null!==(i=K.env.NEXTAUTH_URL_INTERNAL)&&void 0!==i?i:K.env.NEXTAUTH_URL).path,_lastSync:0,_session:void 0,_getSession:()=>{}};function Y(){return"undefined"!=typeof BroadcastChannel?new BroadcastChannel("next-auth"):{postMessage:()=>{},addEventListener:()=>{},removeEventListener:()=>{}}}let Z={debug:console.debug,error:console.error,warn:console.warn},ee=null===(n=l.createContext)||void 0===n?void 0:n.call(d,void 0);function et(e){if(!ee)throw Error("React Context is unavailable in Server Components");let t=l.useContext(ee),{required:s,onUnauthenticated:n}=null!=e?e:{},r=s&&"unauthenticated"===t.status;return(l.useEffect(()=>{if(r){let e="".concat(Q.basePath,"/signin?").concat(new URLSearchParams({error:"SessionRequired",callbackUrl:window.location.href}));n?n():window.location.href=e}},[r,n]),r)?{data:t.data,update:t.update,status:"loading"}:t}async function es(e){var t;let s=await q("session",Q,Z,e);return(null===(t=null==e?void 0:e.broadcast)||void 0===t||t)&&Y().postMessage({event:"session",data:{trigger:"getSession"}}),s}async function en(){var e;let t=await q("csrf",Q,Z);return null!==(e=null==t?void 0:t.csrfToken)&&void 0!==e?e:""}function er(e){if(!ee)throw Error("React Context is unavailable in Server Components");let{children:t,basePath:s,refetchInterval:n,refetchWhenOffline:r}=e;s&&(Q.basePath=s);let a=void 0!==e.session;Q._lastSync=a?z():0;let[o,i]=l.useState(()=>(a&&(Q._session=e.session),e.session)),[d,u]=l.useState(!a);l.useEffect(()=>(Q._getSession=async function(){let{event:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{let t="storage"===e;if(t||void 0===Q._session){Q._lastSync=z(),Q._session=await es({broadcast:!t}),i(Q._session);return}if(!e||null===Q._session||z()<Q._lastSync)return;Q._lastSync=z(),Q._session=await es(),i(Q._session)}catch(e){Z.error(new J(e.message,e))}finally{u(!1)}},Q._getSession(),()=>{Q._lastSync=0,Q._session=void 0,Q._getSession=()=>{}}),[]),l.useEffect(()=>{let e=()=>Q._getSession({event:"storage"});return Y().addEventListener("message",e),()=>Y().removeEventListener("message",e)},[]),l.useEffect(()=>{let{refetchOnWindowFocus:t=!0}=e,s=()=>{t&&"visible"===document.visibilityState&&Q._getSession({event:"visibilitychange"})};return document.addEventListener("visibilitychange",s,!1),()=>document.removeEventListener("visibilitychange",s,!1)},[e.refetchOnWindowFocus]);let v=function(){let[e,t]=l.useState("undefined"!=typeof navigator&&navigator.onLine),s=()=>t(!0),n=()=>t(!1);return l.useEffect(()=>(window.addEventListener("online",s),window.addEventListener("offline",n),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",n)}),[]),e}(),p=!1!==r||v;l.useEffect(()=>{if(n&&p){let e=setInterval(()=>{Q._session&&Q._getSession({event:"poll"})},1e3*n);return()=>clearInterval(e)}},[n,p]);let h=l.useMemo(()=>({data:o,status:d?"loading":o?"authenticated":"unauthenticated",async update(e){if(d||!o)return;u(!0);let t=await q("session",Q,Z,void 0===e?void 0:{body:{csrfToken:await en(),data:e}});return u(!1),t&&(i(t),Y().postMessage({event:"session",data:{trigger:"getSession"}})),t}}),[o,d]);return(0,c.jsx)(ee.Provider,{value:h,children:t})}}}]);