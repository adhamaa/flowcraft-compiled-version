"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9718],{26732:function(t,e,r){r.d(e,{z:function(){return a}});var s=r(97338),i=r(49274),n=r(26862),u=r(99187),h=r(23482),a=class extends u.l{constructor(t,e){super(),this.options=e,this.#t=t,this.#e=null,this.bindMethods(),this.setOptions(e)}#t;#r=void 0;#s=void 0;#i=void 0;#n;#u;#e;#h;#a;#c;#o;#l;#d;#p=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#r.addObserver(this),c(this.#r,this.options)?this.#f():this.updateResult(),this.#y())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return o(this.#r,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return o(this.#r,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#R(),this.#v(),this.#r.removeObserver(this)}setOptions(t,e){let r=this.options,i=this.#r;if(this.options=this.#t.defaultQueryOptions(t),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,s.Nc)(this.options.enabled,this.#r))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#b(),this.#r.setOptions(this.options),r._defaulted&&!(0,s.VS)(this.options,r)&&this.#t.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#r,observer:this});let n=this.hasListeners();n&&l(this.#r,i,this.options,r)&&this.#f(),this.updateResult(e),n&&(this.#r!==i||(0,s.Nc)(this.options.enabled,this.#r)!==(0,s.Nc)(r.enabled,this.#r)||(0,s.KC)(this.options.staleTime,this.#r)!==(0,s.KC)(r.staleTime,this.#r))&&this.#Q();let u=this.#m();n&&(this.#r!==i||(0,s.Nc)(this.options.enabled,this.#r)!==(0,s.Nc)(r.enabled,this.#r)||u!==this.#d)&&this.#O(u)}getOptimisticResult(t){let e=this.#t.getQueryCache().build(this.#t,t),r=this.createResult(e,t);return(0,s.VS)(this.getCurrentResult(),r)||(this.#i=r,this.#u=this.options,this.#n=this.#r.state),r}getCurrentResult(){return this.#i}trackResult(t,e){let r={};return Object.keys(t).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(s),e?.(s),t[s])})}),r}trackProp(t){this.#p.add(t)}getCurrentQuery(){return this.#r}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){let e=this.#t.defaultQueryOptions(t),r=this.#t.getQueryCache().build(this.#t,e);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,e))}fetch(t){return this.#f({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#i))}#f(t){this.#b();let e=this.#r.fetch(this.options,t);return t?.throwOnError||(e=e.catch(s.ZT)),e}#Q(){this.#R();let t=(0,s.KC)(this.options.staleTime,this.#r);if(s.sk||this.#i.isStale||!(0,s.PN)(t))return;let e=(0,s.Kp)(this.#i.dataUpdatedAt,t);this.#o=setTimeout(()=>{this.#i.isStale||this.updateResult()},e+1)}#m(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#r):this.options.refetchInterval)??!1}#O(t){this.#v(),this.#d=t,!s.sk&&!1!==(0,s.Nc)(this.options.enabled,this.#r)&&(0,s.PN)(this.#d)&&0!==this.#d&&(this.#l=setInterval(()=>{(this.options.refetchIntervalInBackground||n.j.isFocused())&&this.#f()},this.#d))}#y(){this.#Q(),this.#O(this.#m())}#R(){this.#o&&(clearTimeout(this.#o),this.#o=void 0)}#v(){this.#l&&(clearInterval(this.#l),this.#l=void 0)}createResult(t,e){let r;let i=this.#r,n=this.options,u=this.#i,a=this.#n,o=this.#u,p=t!==i?t.state:this.#s,{state:f}=t,y={...f},R=!1;if(e._optimisticResults){let r=this.hasListeners(),s=!r&&c(t,e),u=r&&l(t,i,e,n);(s||u)&&(y={...y,...(0,h.z)(f.data,t.options)}),"isRestoring"===e._optimisticResults&&(y.fetchStatus="idle")}let{error:v,errorUpdatedAt:b,status:Q}=y;if(e.select&&void 0!==y.data){if(u&&y.data===a?.data&&e.select===this.#h)r=this.#a;else try{this.#h=e.select,r=e.select(y.data),r=(0,s.oE)(u?.data,r,e),this.#a=r,this.#e=null}catch(t){this.#e=t}}else r=y.data;if(void 0!==e.placeholderData&&void 0===r&&"pending"===Q){let t;if(u?.isPlaceholderData&&e.placeholderData===o?.placeholderData)t=u.data;else if(t="function"==typeof e.placeholderData?e.placeholderData(this.#c?.state.data,this.#c):e.placeholderData,e.select&&void 0!==t)try{t=e.select(t),this.#e=null}catch(t){this.#e=t}void 0!==t&&(Q="success",r=(0,s.oE)(u?.data,t,e),R=!0)}this.#e&&(v=this.#e,r=this.#a,b=Date.now(),Q="error");let m="fetching"===y.fetchStatus,O="pending"===Q,g="error"===Q,C=O&&m,I=void 0!==r;return{status:Q,fetchStatus:y.fetchStatus,isPending:O,isSuccess:"success"===Q,isError:g,isInitialLoading:C,isLoading:C,data:r,dataUpdatedAt:y.dataUpdatedAt,error:v,errorUpdatedAt:b,failureCount:y.fetchFailureCount,failureReason:y.fetchFailureReason,errorUpdateCount:y.errorUpdateCount,isFetched:y.dataUpdateCount>0||y.errorUpdateCount>0,isFetchedAfterMount:y.dataUpdateCount>p.dataUpdateCount||y.errorUpdateCount>p.errorUpdateCount,isFetching:m,isRefetching:m&&!O,isLoadingError:g&&!I,isPaused:"paused"===y.fetchStatus,isPlaceholderData:R,isRefetchError:g&&I,isStale:d(t,e),refetch:this.refetch}}updateResult(t){let e=this.#i,r=this.createResult(this.#r,this.options);if(this.#n=this.#r.state,this.#u=this.options,void 0!==this.#n.data&&(this.#c=this.#r),(0,s.VS)(r,e))return;this.#i=r;let i={};t?.listeners!==!1&&(()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,r="function"==typeof t?t():t;if("all"===r||!r&&!this.#p.size)return!0;let s=new Set(r??this.#p);return this.options.throwOnError&&s.add("error"),Object.keys(this.#i).some(t=>this.#i[t]!==e[t]&&s.has(t))})()&&(i.listeners=!0),this.#g({...i,...t})}#b(){let t=this.#t.getQueryCache().build(this.#t,this.options);if(t===this.#r)return;let e=this.#r;this.#r=t,this.#s=t.state,this.hasListeners()&&(e?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#y()}#g(t){i.V.batch(()=>{t.listeners&&this.listeners.forEach(t=>{t(this.#i)}),this.#t.getQueryCache().notify({query:this.#r,type:"observerResultsUpdated"})})}};function c(t,e){return!1!==(0,s.Nc)(e.enabled,t)&&void 0===t.state.data&&!("error"===t.state.status&&!1===e.retryOnMount)||void 0!==t.state.data&&o(t,e,e.refetchOnMount)}function o(t,e,r){if(!1!==(0,s.Nc)(e.enabled,t)){let s="function"==typeof r?r(t):r;return"always"===s||!1!==s&&d(t,e)}return!1}function l(t,e,r,i){return(t!==e||!1===(0,s.Nc)(i.enabled,t))&&(!r.suspense||"error"!==t.state.status)&&d(t,r)}function d(t,e){return!1!==(0,s.Nc)(e.enabled,t)&&t.isStaleByTime((0,s.KC)(e.staleTime,t))}},91348:function(t,e,r){let s;r.d(e,{r:function(){return b}});var i=r(46024),n=r(49274);r(66628);var u=i.createContext((s=!1,{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s})),h=()=>i.useContext(u),a=r(16886),c=i.createContext(!1),o=()=>i.useContext(c);c.Provider;var l=r(94218),d=(t,e)=>{(t.suspense||t.throwOnError)&&!e.isReset()&&(t.retryOnMount=!1)},p=t=>{i.useEffect(()=>{t.clearReset()},[t])},f=t=>{let{result:e,errorResetBoundary:r,throwOnError:s,query:i}=t;return e.isError&&!r.isReset()&&!e.isFetching&&i&&(0,l.L)(s,[e.error,i])},y=t=>{t.suspense&&("number"!=typeof t.staleTime&&(t.staleTime=1e3),"number"==typeof t.gcTime&&(t.gcTime=Math.max(t.gcTime,1e3)))},R=(t,e)=>t?.suspense&&e.isPending,v=(t,e,r)=>e.fetchOptimistic(t).catch(()=>{r.clearReset()});function b(t,e,r){var s,u,c,l;let b=(0,a.NL)(r),Q=o(),m=h(),O=b.defaultQueryOptions(t);null===(u=b.getDefaultOptions().queries)||void 0===u||null===(s=u._experimental_beforeQuery)||void 0===s||s.call(u,O),O._optimisticResults=Q?"isRestoring":"optimistic",y(O),d(O,m),p(m);let[g]=i.useState(()=>new e(b,O)),C=g.getOptimisticResult(O);if(i.useSyncExternalStore(i.useCallback(t=>{let e=Q?()=>void 0:g.subscribe(n.V.batchCalls(t));return g.updateResult(),e},[g,Q]),()=>g.getCurrentResult(),()=>g.getCurrentResult()),i.useEffect(()=>{g.setOptions(O,{listeners:!1})},[O,g]),R(O,C))throw v(O,g,m);if(f({result:C,errorResetBoundary:m,throwOnError:O.throwOnError,query:b.getQueryCache().get(O.queryHash)}))throw C.error;return null===(l=b.getDefaultOptions().queries)||void 0===l||null===(c=l._experimental_afterQuery)||void 0===c||c.call(l,O,C),O.notifyOnChangeProps?C:g.trackResult(C)}},94218:function(t,e,r){function s(t,e){return"function"==typeof t?t(...e):!!t}function i(){}r.d(e,{L:function(){return s},Z:function(){return i}})}}]);