"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8437],{61811:function(t,e,n){n.d(e,{x7:function(){return _},Me:function(){return B},oo:function(){return Q},RR:function(){return Y},Qo:function(){return q},dr:function(){return z},cv:function(){return H},uY:function(){return V},dp:function(){return J}});let r=Math.min,o=Math.max,i=Math.round,l=Math.floor,u=t=>({x:t,y:t}),f={left:"right",right:"left",bottom:"top",top:"bottom"},c={start:"end",end:"start"};function a(t,e){return"function"==typeof t?t(e):t}function s(t){return t.split("-")[0]}function d(t){return t.split("-")[1]}function p(t){return"x"===t?"y":"x"}function h(t){return"y"===t?"height":"width"}function g(t){return["top","bottom"].includes(s(t))?"y":"x"}function m(t){return t.replace(/start|end/g,t=>c[t])}function y(t){return t.replace(/left|right|bottom|top/g,t=>f[t])}function w(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function v(t){let{x:e,y:n,width:r,height:o}=t;return{width:r,height:o,top:n,left:e,right:e+r,bottom:n+o,x:e,y:n}}function x(t,e,n){let r,{reference:o,floating:i}=t,l=g(e),u=p(g(e)),f=h(u),c=s(e),a="y"===l,m=o.x+o.width/2-i.width/2,y=o.y+o.height/2-i.height/2,w=o[f]/2-i[f]/2;switch(c){case"top":r={x:m,y:o.y-i.height};break;case"bottom":r={x:m,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:y};break;case"left":r={x:o.x-i.width,y:y};break;default:r={x:o.x,y:o.y}}switch(d(e)){case"start":r[u]-=w*(n&&a?-1:1);break;case"end":r[u]+=w*(n&&a?-1:1)}return r}let b=async(t,e,n)=>{let{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:l}=n,u=i.filter(Boolean),f=await (null==l.isRTL?void 0:l.isRTL(e)),c=await l.getElementRects({reference:t,floating:e,strategy:o}),{x:a,y:s}=x(c,r,f),d=r,p={},h=0;for(let n=0;n<u.length;n++){let{name:i,fn:g}=u[n],{x:m,y:y,data:w,reset:v}=await g({x:a,y:s,initialPlacement:r,placement:d,strategy:o,middlewareData:p,rects:c,platform:l,elements:{reference:t,floating:e}});a=null!=m?m:a,s=null!=y?y:s,p={...p,[i]:{...p[i],...w}},v&&h<=50&&(h++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(c=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:o}):v.rects),{x:a,y:s}=x(c,d,f)),n=-1)}return{x:a,y:s,placement:d,strategy:o,middlewareData:p}};async function R(t,e){var n;void 0===e&&(e={});let{x:r,y:o,platform:i,rects:l,elements:u,strategy:f}=t,{boundary:c="clippingAncestors",rootBoundary:s="viewport",elementContext:d="floating",altBoundary:p=!1,padding:h=0}=a(e,t),g=w(h),m=u[p?"floating"===d?"reference":"floating":d],y=v(await i.getClippingRect({element:null==(n=await (null==i.isElement?void 0:i.isElement(m)))||n?m:m.contextElement||await (null==i.getDocumentElement?void 0:i.getDocumentElement(u.floating)),boundary:c,rootBoundary:s,strategy:f})),x="floating"===d?{x:r,y:o,width:l.floating.width,height:l.floating.height}:l.reference,b=await (null==i.getOffsetParent?void 0:i.getOffsetParent(u.floating)),R=await (null==i.isElement?void 0:i.isElement(b))&&await (null==i.getScale?void 0:i.getScale(b))||{x:1,y:1},L=v(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:u,rect:x,offsetParent:b,strategy:f}):x);return{top:(y.top-L.top+g.top)/R.y,bottom:(L.bottom-y.bottom+g.bottom)/R.y,left:(y.left-L.left+g.left)/R.x,right:(L.right-y.right+g.right)/R.x}}function L(t){let e=r(...t.map(t=>t.left)),n=r(...t.map(t=>t.top));return{x:e,y:n,width:o(...t.map(t=>t.right))-e,height:o(...t.map(t=>t.bottom))-n}}async function A(t,e){let{placement:n,platform:r,elements:o}=t,i=await (null==r.isRTL?void 0:r.isRTL(o.floating)),l=s(n),u=d(n),f="y"===g(n),c=["left","top"].includes(l)?-1:1,p=i&&f?-1:1,h=a(e,t),{mainAxis:m,crossAxis:y,alignmentAxis:w}="number"==typeof h?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return u&&"number"==typeof w&&(y="end"===u?-1*w:w),f?{x:y*p,y:m*c}:{x:m*c,y:y*p}}var T=n(4416);function k(t){let e=(0,T.Dx)(t),n=parseFloat(e.width)||0,r=parseFloat(e.height)||0,o=(0,T.Re)(t),l=o?t.offsetWidth:n,u=o?t.offsetHeight:r,f=i(n)!==l||i(r)!==u;return f&&(n=l,r=u),{width:n,height:r,$:f}}function P(t){return(0,T.kK)(t)?t:t.contextElement}function C(t){let e=P(t);if(!(0,T.Re)(e))return u(1);let n=e.getBoundingClientRect(),{width:r,height:o,$:l}=k(e),f=(l?i(n.width):n.width)/r,c=(l?i(n.height):n.height)/o;return f&&Number.isFinite(f)||(f=1),c&&Number.isFinite(c)||(c=1),{x:f,y:c}}let E=u(0);function D(t){let e=(0,T.Jj)(t);return(0,T.Pf)()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:E}function O(t,e,n,r){var o;void 0===e&&(e=!1),void 0===n&&(n=!1);let i=t.getBoundingClientRect(),l=P(t),f=u(1);e&&(r?(0,T.kK)(r)&&(f=C(r)):f=C(t));let c=(void 0===(o=n)&&(o=!1),r&&(!o||r===(0,T.Jj)(l))&&o)?D(l):u(0),a=(i.left+c.x)/f.x,s=(i.top+c.y)/f.y,d=i.width/f.x,p=i.height/f.y;if(l){let t=(0,T.Jj)(l),e=r&&(0,T.kK)(r)?(0,T.Jj)(r):r,n=t,o=(0,T.wK)(n);for(;o&&r&&e!==n;){let t=C(o),e=o.getBoundingClientRect(),r=(0,T.Dx)(o),i=e.left+(o.clientLeft+parseFloat(r.paddingLeft))*t.x,l=e.top+(o.clientTop+parseFloat(r.paddingTop))*t.y;a*=t.x,s*=t.y,d*=t.x,p*=t.y,a+=i,s+=l,n=(0,T.Jj)(o),o=(0,T.wK)(n)}}return v({width:d,height:p,x:a,y:s})}function F(t){return O((0,T.tF)(t)).left+(0,T.Lw)(t).scrollLeft}function S(t,e,n){let r;if("viewport"===e)r=function(t,e){let n=(0,T.Jj)(t),r=(0,T.tF)(t),o=n.visualViewport,i=r.clientWidth,l=r.clientHeight,u=0,f=0;if(o){i=o.width,l=o.height;let t=(0,T.Pf)();(!t||t&&"fixed"===e)&&(u=o.offsetLeft,f=o.offsetTop)}return{width:i,height:l,x:u,y:f}}(t,n);else if("document"===e)r=function(t){let e=(0,T.tF)(t),n=(0,T.Lw)(t),r=t.ownerDocument.body,i=o(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),l=o(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),u=-n.scrollLeft+F(t),f=-n.scrollTop;return"rtl"===(0,T.Dx)(r).direction&&(u+=o(e.clientWidth,r.clientWidth)-i),{width:i,height:l,x:u,y:f}}((0,T.tF)(t));else if((0,T.kK)(e))r=function(t,e){let n=O(t,!0,"fixed"===e),r=n.top+t.clientTop,o=n.left+t.clientLeft,i=(0,T.Re)(t)?C(t):u(1),l=t.clientWidth*i.x;return{width:l,height:t.clientHeight*i.y,x:o*i.x,y:r*i.y}}(e,n);else{let n=D(t);r={...e,x:e.x-n.x,y:e.y-n.y}}return v(r)}function j(t){return"static"===(0,T.Dx)(t).position}function M(t,e){return(0,T.Re)(t)&&"fixed"!==(0,T.Dx)(t).position?e?e(t):t.offsetParent:null}function K(t,e){let n=(0,T.Jj)(t);if((0,T.tR)(t))return n;if(!(0,T.Re)(t)){let e=(0,T.Ow)(t);for(;e&&!(0,T.Py)(e);){if((0,T.kK)(e)&&!j(e))return e;e=(0,T.Ow)(e)}return n}let r=M(t,e);for(;r&&(0,T.Ze)(r)&&j(r);)r=M(r,e);return r&&(0,T.Py)(r)&&j(r)&&!(0,T.hT)(r)?n:r||(0,T.gQ)(t)||n}let N=async function(t){let e=this.getOffsetParent||K,n=this.getDimensions,r=await n(t.floating);return{reference:function(t,e,n){let r=(0,T.Re)(e),o=(0,T.tF)(e),i="fixed"===n,l=O(t,!0,i,e),f={scrollLeft:0,scrollTop:0},c=u(0);if(r||!r&&!i){if(("body"!==(0,T.wk)(e)||(0,T.ao)(o))&&(f=(0,T.Lw)(e)),r){let t=O(e,!0,i,e);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else o&&(c.x=F(o))}return{x:l.left+f.scrollLeft-c.x,y:l.top+f.scrollTop-c.y,width:l.width,height:l.height}}(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},W={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:r,strategy:o}=t,i="fixed"===o,l=(0,T.tF)(r),f=!!e&&(0,T.tR)(e.floating);if(r===l||f&&i)return n;let c={scrollLeft:0,scrollTop:0},a=u(1),s=u(0),d=(0,T.Re)(r);if((d||!d&&!i)&&(("body"!==(0,T.wk)(r)||(0,T.ao)(l))&&(c=(0,T.Lw)(r)),(0,T.Re)(r))){let t=O(r);a=C(r),s.x=t.x+r.clientLeft,s.y=t.y+r.clientTop}return{width:n.width*a.x,height:n.height*a.y,x:n.x*a.x-c.scrollLeft*a.x+s.x,y:n.y*a.y-c.scrollTop*a.y+s.y}},getDocumentElement:T.tF,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:i,strategy:l}=t,u=[..."clippingAncestors"===n?(0,T.tR)(e)?[]:function(t,e){let n=e.get(t);if(n)return n;let r=(0,T.Kx)(t,[],!1).filter(t=>(0,T.kK)(t)&&"body"!==(0,T.wk)(t)),o=null,i="fixed"===(0,T.Dx)(t).position,l=i?(0,T.Ow)(t):t;for(;(0,T.kK)(l)&&!(0,T.Py)(l);){let e=(0,T.Dx)(l),n=(0,T.hT)(l);n||"fixed"!==e.position||(o=null),(i?!n&&!o:!n&&"static"===e.position&&!!o&&["absolute","fixed"].includes(o.position)||(0,T.ao)(l)&&!n&&function t(e,n){let r=(0,T.Ow)(e);return!(r===n||!(0,T.kK)(r)||(0,T.Py)(r))&&("fixed"===(0,T.Dx)(r).position||t(r,n))}(t,l))?r=r.filter(t=>t!==l):o=e,l=(0,T.Ow)(l)}return e.set(t,r),r}(e,this._c):[].concat(n),i],f=u[0],c=u.reduce((t,n)=>{let i=S(e,n,l);return t.top=o(i.top,t.top),t.right=r(i.right,t.right),t.bottom=r(i.bottom,t.bottom),t.left=o(i.left,t.left),t},S(e,f,l));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:K,getElementRects:N,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:e,height:n}=k(t);return{width:e,height:n}},getScale:C,isElement:T.kK,isRTL:function(t){return"rtl"===(0,T.Dx)(t).direction}};function B(t,e,n,i){let u;void 0===i&&(i={});let{ancestorScroll:f=!0,ancestorResize:c=!0,elementResize:a="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:d=!1}=i,p=P(t),h=f||c?[...p?(0,T.Kx)(p):[],...(0,T.Kx)(e)]:[];h.forEach(t=>{f&&t.addEventListener("scroll",n,{passive:!0}),c&&t.addEventListener("resize",n)});let g=p&&s?function(t,e){let n,i=null,u=(0,T.tF)(t);function f(){var t;clearTimeout(n),null==(t=i)||t.disconnect(),i=null}return!function c(a,s){void 0===a&&(a=!1),void 0===s&&(s=1),f();let{left:d,top:p,width:h,height:g}=t.getBoundingClientRect();if(a||e(),!h||!g)return;let m=l(p),y=l(u.clientWidth-(d+h)),w={rootMargin:-m+"px "+-y+"px "+-l(u.clientHeight-(p+g))+"px "+-l(d)+"px",threshold:o(0,r(1,s))||1},v=!0;function x(t){let e=t[0].intersectionRatio;if(e!==s){if(!v)return c();e?c(!1,e):n=setTimeout(()=>{c(!1,1e-7)},1e3)}v=!1}try{i=new IntersectionObserver(x,{...w,root:u.ownerDocument})}catch(t){i=new IntersectionObserver(x,w)}i.observe(t)}(!0),f}(p,n):null,m=-1,y=null;a&&(y=new ResizeObserver(t=>{let[r]=t;r&&r.target===p&&y&&(y.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var t;null==(t=y)||t.observe(e)})),n()}),p&&!d&&y.observe(p),y.observe(e));let w=d?O(t):null;return d&&function e(){let r=O(t);w&&(r.x!==w.x||r.y!==w.y||r.width!==w.width||r.height!==w.height)&&n(),w=r,u=requestAnimationFrame(e)}(),n(),()=>{var t;h.forEach(t=>{f&&t.removeEventListener("scroll",n),c&&t.removeEventListener("resize",n)}),null==g||g(),null==(t=y)||t.disconnect(),y=null,d&&cancelAnimationFrame(u)}}let H=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,r;let{x:o,y:i,placement:l,middlewareData:u}=e,f=await A(e,t);return l===(null==(n=u.offset)?void 0:n.placement)&&null!=(r=u.arrow)&&r.alignmentOffset?{}:{x:o+f.x,y:i+f.y,data:{...f,placement:l}}}}},V=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){let{x:n,y:i,placement:l}=e,{mainAxis:u=!0,crossAxis:f=!1,limiter:c={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...d}=a(t,e),h={x:n,y:i},m=await R(e,d),y=g(s(l)),w=p(y),v=h[w],x=h[y];if(u){let t="y"===w?"top":"left",e="y"===w?"bottom":"right",n=v+m[t],i=v-m[e];v=o(n,r(v,i))}if(f){let t="y"===y?"top":"left",e="y"===y?"bottom":"right",n=x+m[t],i=x-m[e];x=o(n,r(x,i))}let b=c.fn({...e,[w]:v,[y]:x});return{...b,data:{x:b.x-n,y:b.y-i}}}}},Y=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,r,o,i,l;let{placement:u,middlewareData:f,rects:c,initialPlacement:w,platform:v,elements:x}=e,{mainAxis:b=!0,crossAxis:L=!0,fallbackPlacements:A,fallbackStrategy:T="bestFit",fallbackAxisSideDirection:k="none",flipAlignment:P=!0,...C}=a(t,e);if(null!=(n=f.arrow)&&n.alignmentOffset)return{};let E=s(u),D=g(w),O=s(w)===w,F=await (null==v.isRTL?void 0:v.isRTL(x.floating)),S=A||(O||!P?[y(w)]:function(t){let e=y(t);return[m(t),e,m(e)]}(w)),j="none"!==k;!A&&j&&S.push(...function(t,e,n,r){let o=d(t),i=function(t,e,n){let r=["left","right"],o=["right","left"];switch(t){case"top":case"bottom":if(n)return e?o:r;return e?r:o;case"left":case"right":return e?["top","bottom"]:["bottom","top"];default:return[]}}(s(t),"start"===n,r);return o&&(i=i.map(t=>t+"-"+o),e&&(i=i.concat(i.map(m)))),i}(w,P,k,F));let M=[w,...S],K=await R(e,C),N=[],W=(null==(r=f.flip)?void 0:r.overflows)||[];if(b&&N.push(K[E]),L){let t=function(t,e,n){void 0===n&&(n=!1);let r=d(t),o=p(g(t)),i=h(o),l="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return e.reference[i]>e.floating[i]&&(l=y(l)),[l,y(l)]}(u,c,F);N.push(K[t[0]],K[t[1]])}if(W=[...W,{placement:u,overflows:N}],!N.every(t=>t<=0)){let t=((null==(o=f.flip)?void 0:o.index)||0)+1,e=M[t];if(e)return{data:{index:t,overflows:W},reset:{placement:e}};let n=null==(i=W.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:i.placement;if(!n)switch(T){case"bestFit":{let t=null==(l=W.filter(t=>{if(j){let e=g(t.placement);return e===D||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:l[0];t&&(n=t);break}case"initialPlacement":n=w}if(u!==n)return{reset:{placement:n}}}return{}}}},J=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){let n,i;let{placement:l,rects:u,platform:f,elements:c}=e,{apply:p=()=>{},...h}=a(t,e),m=await R(e,h),y=s(l),w=d(l),v="y"===g(l),{width:x,height:b}=u.floating;"top"===y||"bottom"===y?(n=y,i=w===(await (null==f.isRTL?void 0:f.isRTL(c.floating))?"start":"end")?"left":"right"):(i=y,n="end"===w?"top":"bottom");let L=b-m.top-m.bottom,A=x-m.left-m.right,T=r(b-m[n],L),k=r(x-m[i],A),P=!e.middlewareData.shift,C=T,E=k;if(v?E=w||P?r(k,A):A:C=w||P?r(T,L):L,P&&!w){let t=o(m.left,0),e=o(m.right,0),n=o(m.top,0),r=o(m.bottom,0);v?E=x-2*(0!==t||0!==e?t+e:o(m.left,m.right)):C=b-2*(0!==n||0!==r?n+r:o(m.top,m.bottom))}await p({...e,availableWidth:E,availableHeight:C});let D=await f.getDimensions(c.floating);return x!==D.width||b!==D.height?{reset:{rects:!0}}:{}}}},_=t=>({name:"arrow",options:t,async fn(e){let{x:n,y:i,placement:l,rects:u,platform:f,elements:c,middlewareData:s}=e,{element:m,padding:y=0}=a(t,e)||{};if(null==m)return{};let v=w(y),x={x:n,y:i},b=p(g(l)),R=h(b),L=await f.getDimensions(m),A="y"===b,T=A?"clientHeight":"clientWidth",k=u.reference[R]+u.reference[b]-x[b]-u.floating[R],P=x[b]-u.reference[b],C=await (null==f.getOffsetParent?void 0:f.getOffsetParent(m)),E=C?C[T]:0;E&&await (null==f.isElement?void 0:f.isElement(C))||(E=c.floating[T]||u.floating[R]);let D=E/2-L[R]/2-1,O=r(v[A?"top":"left"],D),F=r(v[A?"bottom":"right"],D),S=E-L[R]-F,j=E/2-L[R]/2+(k/2-P/2),M=o(O,r(j,S)),K=!s.arrow&&null!=d(l)&&j!==M&&u.reference[R]/2-(j<O?O:F)-L[R]/2<0,N=K?j<O?j-O:j-S:0;return{[b]:x[b]+N,data:{[b]:M,centerOffset:j-M-N,...K&&{alignmentOffset:N}},reset:K}}}),q=function(t){return void 0===t&&(t={}),{name:"inline",options:t,async fn(e){let{placement:n,elements:i,rects:l,platform:u,strategy:f}=e,{padding:c=2,x:d,y:p}=a(t,e),h=Array.from(await (null==u.getClientRects?void 0:u.getClientRects(i.reference))||[]),m=function(t){let e=t.slice().sort((t,e)=>t.y-e.y),n=[],r=null;for(let t=0;t<e.length;t++){let o=e[t];!r||o.y-r.y>r.height/2?n.push([o]):n[n.length-1].push(o),r=o}return n.map(t=>v(L(t)))}(h),y=v(L(h)),x=w(c),b=await u.getElementRects({reference:{getBoundingClientRect:function(){if(2===m.length&&m[0].left>m[1].right&&null!=d&&null!=p)return m.find(t=>d>t.left-x.left&&d<t.right+x.right&&p>t.top-x.top&&p<t.bottom+x.bottom)||y;if(m.length>=2){if("y"===g(n)){let t=m[0],e=m[m.length-1],r="top"===s(n),o=t.top,i=e.bottom,l=r?t.left:e.left,u=r?t.right:e.right;return{top:o,bottom:i,left:l,right:u,width:u-l,height:i-o,x:l,y:o}}let t="left"===s(n),e=o(...m.map(t=>t.right)),i=r(...m.map(t=>t.left)),l=m.filter(n=>t?n.left===i:n.right===e),u=l[0].top,f=l[l.length-1].bottom;return{top:u,bottom:f,left:i,right:e,width:e-i,height:f-u,x:i,y:u}}return y}},floating:i.floating,strategy:f});return l.reference.x!==b.reference.x||l.reference.y!==b.reference.y||l.reference.width!==b.reference.width||l.reference.height!==b.reference.height?{reset:{rects:b}}:{}}}},z=function(t){return void 0===t&&(t={}),{options:t,fn(e){let{x:n,y:r,placement:o,rects:i,middlewareData:l}=e,{offset:u=0,mainAxis:f=!0,crossAxis:c=!0}=a(t,e),d={x:n,y:r},h=g(o),m=p(h),y=d[m],w=d[h],v=a(u,e),x="number"==typeof v?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(f){let t="y"===m?"height":"width",e=i.reference[m]-i.floating[t]+x.mainAxis,n=i.reference[m]+i.reference[t]-x.mainAxis;y<e?y=e:y>n&&(y=n)}if(c){var b,R;let t="y"===m?"width":"height",e=["top","left"].includes(s(o)),n=i.reference[h]-i.floating[t]+(e&&(null==(b=l.offset)?void 0:b[h])||0)+(e?0:x.crossAxis),r=i.reference[h]+i.reference[t]+(e?0:(null==(R=l.offset)?void 0:R[h])||0)-(e?x.crossAxis:0);w<n?w=n:w>r&&(w=r)}return{[m]:y,[h]:w}}}},Q=(t,e,n)=>{let r=new Map,o={platform:W,...n},i={...o.platform,_c:r};return b(t,e,{...o,platform:i})}},1484:function(t,e,n){n.d(e,{Qo:function(){return w},RR:function(){return m},YF:function(){return s},cv:function(){return p},dp:function(){return y},dr:function(){return g},uY:function(){return h},x7:function(){return v}});var r=n(61811),o=n(46024),i=n(96735),l="undefined"!=typeof document?o.useLayoutEffect:o.useEffect;function u(t,e){let n,r,o;if(t===e)return!0;if(typeof t!=typeof e)return!1;if("function"==typeof t&&t.toString()===e.toString())return!0;if(t&&e&&"object"==typeof t){if(Array.isArray(t)){if((n=t.length)!==e.length)return!1;for(r=n;0!=r--;)if(!u(t[r],e[r]))return!1;return!0}if((n=(o=Object.keys(t)).length)!==Object.keys(e).length)return!1;for(r=n;0!=r--;)if(!({}).hasOwnProperty.call(e,o[r]))return!1;for(r=n;0!=r--;){let n=o[r];if(("_owner"!==n||!t.$$typeof)&&!u(t[n],e[n]))return!1}return!0}return t!=t&&e!=e}function f(t){return"undefined"==typeof window?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function c(t,e){let n=f(t);return Math.round(e*n)/n}function a(t){let e=o.useRef(t);return l(()=>{e.current=t}),e}function s(t){void 0===t&&(t={});let{placement:e="bottom",strategy:n="absolute",middleware:s=[],platform:d,elements:{reference:p,floating:h}={},transform:g=!0,whileElementsMounted:m,open:y}=t,[w,v]=o.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[x,b]=o.useState(s);u(x,s)||b(s);let[R,L]=o.useState(null),[A,T]=o.useState(null),k=o.useCallback(t=>{t!==D.current&&(D.current=t,L(t))},[]),P=o.useCallback(t=>{t!==O.current&&(O.current=t,T(t))},[]),C=p||R,E=h||A,D=o.useRef(null),O=o.useRef(null),F=o.useRef(w),S=null!=m,j=a(m),M=a(d),K=o.useCallback(()=>{if(!D.current||!O.current)return;let t={placement:e,strategy:n,middleware:x};M.current&&(t.platform=M.current),(0,r.oo)(D.current,O.current,t).then(t=>{let e={...t,isPositioned:!0};N.current&&!u(F.current,e)&&(F.current=e,i.flushSync(()=>{v(e)}))})},[x,e,n,M]);l(()=>{!1===y&&F.current.isPositioned&&(F.current.isPositioned=!1,v(t=>({...t,isPositioned:!1})))},[y]);let N=o.useRef(!1);l(()=>(N.current=!0,()=>{N.current=!1}),[]),l(()=>{if(C&&(D.current=C),E&&(O.current=E),C&&E){if(j.current)return j.current(C,E,K);K()}},[C,E,K,j,S]);let W=o.useMemo(()=>({reference:D,floating:O,setReference:k,setFloating:P}),[k,P]),B=o.useMemo(()=>({reference:C,floating:E}),[C,E]),H=o.useMemo(()=>{let t={position:n,left:0,top:0};if(!B.floating)return t;let e=c(B.floating,w.x),r=c(B.floating,w.y);return g?{...t,transform:"translate("+e+"px, "+r+"px)",...f(B.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:e,top:r}},[n,g,B.floating,w.x,w.y]);return o.useMemo(()=>({...w,update:K,refs:W,elements:B,floatingStyles:H}),[w,K,W,B,H])}let d=t=>({name:"arrow",options:t,fn(e){let{element:n,padding:o}="function"==typeof t?t(e):t;return n&&({}).hasOwnProperty.call(n,"current")?null!=n.current?(0,r.x7)({element:n.current,padding:o}).fn(e):{}:n?(0,r.x7)({element:n,padding:o}).fn(e):{}}}),p=(t,e)=>({...(0,r.cv)(t),options:[t,e]}),h=(t,e)=>({...(0,r.uY)(t),options:[t,e]}),g=(t,e)=>({...(0,r.dr)(t),options:[t,e]}),m=(t,e)=>({...(0,r.RR)(t),options:[t,e]}),y=(t,e)=>({...(0,r.dp)(t),options:[t,e]}),w=(t,e)=>({...(0,r.Qo)(t),options:[t,e]}),v=(t,e)=>({...d(t),options:[t,e]})},86111:function(t,e,n){n.d(e,{AW:function(){return o},G6:function(){return c},MM:function(){return p},Me:function(){return g},Pe:function(){return m},U9:function(){return y},V5:function(){return s},cr:function(){return f},ex:function(){return h},j7:function(){return w},r:function(){return d},r3:function(){return i}});var r=n(4416);function o(t){let e=t.activeElement;for(;(null==(n=e)||null==(n=n.shadowRoot)?void 0:n.activeElement)!=null;){var n;e=e.shadowRoot.activeElement}return e}function i(t,e){if(!t||!e)return!1;let n=null==e.getRootNode?void 0:e.getRootNode();if(t.contains(e))return!0;if(n&&(0,r.Zq)(n)){let n=e;for(;n;){if(t===n)return!0;n=n.parentNode||n.host}}return!1}function l(){let t=navigator.userAgentData;return null!=t&&t.platform?t.platform:navigator.platform}function u(){let t=navigator.userAgentData;return t&&Array.isArray(t.brands)?t.brands.map(t=>{let{brand:e,version:n}=t;return e+"/"+n}).join(" "):navigator.userAgent}function f(t){return!u().includes("jsdom/")&&(!a()&&0===t.width&&0===t.height||a()&&1===t.width&&1===t.height&&0===t.pressure&&0===t.detail&&"mouse"===t.pointerType||t.width<1&&t.height<1&&0===t.pressure&&0===t.detail&&"touch"===t.pointerType)}function c(){return/apple/i.test(navigator.vendor)}function a(){let t=/android/i;return t.test(l())||t.test(u())}function s(){return l().toLowerCase().startsWith("mac")&&!navigator.maxTouchPoints}function d(t,e){let n=["mouse","pen"];return e||n.push("",void 0),n.includes(t)}function p(t){return"nativeEvent"in t}function h(t){return t.matches("html,body")}function g(t){return(null==t?void 0:t.ownerDocument)||document}function m(t,e){return null!=e&&("composedPath"in t?t.composedPath().includes(e):null!=t.target&&e.contains(t.target))}function y(t){return"composedPath"in t?t.composedPath()[0]:t.target}function w(t){return(0,r.Re)(t)&&t.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])")}},4416:function(t,e,n){function r(t){return l(t)?(t.nodeName||"").toLowerCase():"#document"}function o(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function i(t){var e;return null==(e=(l(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function l(t){return t instanceof Node||t instanceof o(t).Node}function u(t){return t instanceof Element||t instanceof o(t).Element}function f(t){return t instanceof HTMLElement||t instanceof o(t).HTMLElement}function c(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof o(t).ShadowRoot)}function a(t){let{overflow:e,overflowX:n,overflowY:r,display:o}=y(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+n)&&!["inline","contents"].includes(o)}function s(t){return["table","td","th"].includes(r(t))}function d(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch(t){return!1}})}function p(t){let e=g(),n=u(t)?y(t):t;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(t=>(n.willChange||"").includes(t))||["paint","layout","strict","content"].some(t=>(n.contain||"").includes(t))}function h(t){let e=v(t);for(;f(e)&&!m(e);){if(p(e))return e;if(d(e))break;e=v(e)}return null}function g(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function m(t){return["html","body","#document"].includes(r(t))}function y(t){return o(t).getComputedStyle(t)}function w(t){return u(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function v(t){if("html"===r(t))return t;let e=t.assignedSlot||t.parentNode||c(t)&&t.host||i(t);return c(e)?e.host:e}function x(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}n.d(e,{Dx:function(){return y},Jj:function(){return o},Kx:function(){return function t(e,n,r){var i;void 0===n&&(n=[]),void 0===r&&(r=!0);let l=function t(e){let n=v(e);return m(n)?e.ownerDocument?e.ownerDocument.body:e.body:f(n)&&a(n)?n:t(n)}(e),u=l===(null==(i=e.ownerDocument)?void 0:i.body),c=o(l);if(u){let e=x(c);return n.concat(c,c.visualViewport||[],a(l)?l:[],e&&r?t(e):[])}return n.concat(l,t(l,[],r))}},Lw:function(){return w},Ow:function(){return v},Pf:function(){return g},Py:function(){return m},Re:function(){return f},Ze:function(){return s},Zq:function(){return c},ao:function(){return a},gQ:function(){return h},hT:function(){return p},kK:function(){return u},tF:function(){return i},tR:function(){return d},wK:function(){return x},wk:function(){return r}})},95526:function(t,e,n){n.d(e,{Y:function(){return c}});var r=n(66628),o=n(46024),i=n(31591);function l(t,e,n,r){return"center"===t||"center"===r?{top:e}:"end"===t?{bottom:n}:"start"===t?{top:n}:{}}function u(t,e,n,r,o){return"center"===t||"center"===r?{left:e}:"end"===t?{["ltr"===o?"right":"left"]:n}:"start"===t?{["ltr"===o?"left":"right"]:n}:{}}let f={bottom:"borderTopLeftRadius",left:"borderTopRightRadius",right:"borderBottomLeftRadius",top:"borderBottomRightRadius"},c=(0,o.forwardRef)((t,e)=>{let{position:n,arrowSize:o,arrowOffset:c,arrowRadius:a,arrowPosition:s,visible:d,arrowX:p,arrowY:h,style:g,...m}=t,{dir:y}=(0,i.gm)();return d?(0,r.jsx)("div",{...m,ref:e,style:{...g,...function(t){let{position:e,arrowSize:n,arrowOffset:r,arrowRadius:o,arrowPosition:i,arrowX:c,arrowY:a,dir:s}=t,[d,p="center"]=e.split("-"),h={width:n,height:n,transform:"rotate(45deg)",position:"absolute",[f[d]]:o},g=-n/2;return"left"===d?{...h,...l(p,a,r,i),right:g,borderLeftColor:"transparent",borderBottomColor:"transparent"}:"right"===d?{...h,...l(p,a,r,i),left:g,borderRightColor:"transparent",borderTopColor:"transparent"}:"top"===d?{...h,...u(p,c,r,i,s),bottom:g,borderTopColor:"transparent",borderLeftColor:"transparent"}:"bottom"===d?{...h,...u(p,c,r,i,s),top:g,borderBottomColor:"transparent",borderRightColor:"transparent"}:{}}({position:n,arrowSize:o,arrowOffset:c,arrowRadius:a,arrowPosition:s,dir:y,arrowX:p,arrowY:h})}}):null});c.displayName="@mantine/core/FloatingArrow"},16481:function(t,e,n){n.d(e,{_:function(){return r}});function r(t,e){if("rtl"===t&&(e.includes("right")||e.includes("left"))){let[t,n]=e.split("-"),r="right"===t?"left":"right";return void 0===n?r:"".concat(r,"-").concat(n)}return e}},94575:function(t,e,n){n.d(e,{L:function(){return l}});var r=n(46024),o=n(61811),i=n(13849);function l(t){let{opened:e,floating:n,position:l,positionDependencies:u}=t,[f,c]=(0,r.useState)(0);(0,r.useEffect)(()=>{if(n.refs.reference.current&&n.refs.floating.current)return(0,o.Me)(n.refs.reference.current,n.refs.floating.current,n.update)},[n.refs.reference.current,n.refs.floating.current,e,f,l]),(0,i.l)(()=>{n.update()},u),(0,i.l)(()=>{c(t=>t+1)},[e])}},80360:function(t,e,n){n.d(e,{q:function(){return s}});var r=n(66628),o=n(46024),i=n(96735),l=n(38655),u=n(37424),f=n(39115);let c={},a=(0,o.forwardRef)((t,e)=>{let{children:n,target:a,...s}=(0,f.w)("Portal",c,t),[d,p]=(0,o.useState)(!1),h=(0,o.useRef)(null);return((0,l.Y)(()=>(p(!0),h.current=a?"string"==typeof a?document.querySelector(a):a:function(t){let e=document.createElement("div");return e.setAttribute("data-portal","true"),"string"==typeof t.className&&e.classList.add(...t.className.split(" ").filter(Boolean)),"object"==typeof t.style&&Object.assign(e.style,t.style),"string"==typeof t.id&&e.setAttribute("id",t.id),e}(s),(0,u.kR)(e,h.current),!a&&h.current&&document.body.appendChild(h.current),()=>{!a&&h.current&&document.body.removeChild(h.current)}),[a]),d&&h.current)?(0,i.createPortal)((0,r.jsx)(r.Fragment,{children:n}),h.current):null});function s(t){let{withinPortal:e=!0,children:n,...o}=t;return e?(0,r.jsx)(a,{...o,children:n}):(0,r.jsx)(r.Fragment,{children:n})}a.displayName="@mantine/core/Portal",s.displayName="@mantine/core/OptionalPortal"},31591:function(t,e,n){n.d(e,{gm:function(){return i}}),n(66628);var r=n(46024);let o=(0,r.createContext)({dir:"ltr",toggleDirection:()=>{},setDirection:()=>{}});function i(){return(0,r.useContext)(o)}},40904:function(t,e,n){n.d(e,{w:function(){return o}});let r={app:100,modal:200,popover:300,overlay:400,max:9999};function o(t){return r[t]}},73100:function(t,e,n){n.d(e,{k:function(){return o}});var r=n(46024);function o(t){return!Array.isArray(t)&&null!==t&&"object"==typeof t&&t.type!==r.Fragment}},15305:function(t,e,n){n.d(e,{M:function(){return u}});var r=n(46024),o=n(38655),i=n(17625);let l=r["useId".toString()]||(()=>void 0);function u(t){let e=function(){let t=l();return t?"mantine-".concat(t.replace(/:/g,"")):""}(),[n,u]=(0,r.useState)(e);return((0,o.Y)(()=>{u((0,i.k)())},[]),"string"==typeof t)?t:"undefined"==typeof window?e:n}},37424:function(t,e,n){n.d(e,{Yx:function(){return l},kR:function(){return o},lq:function(){return i}});var r=n(46024);function o(t,e){"function"==typeof t?t(e):"object"==typeof t&&null!==t&&"current"in t&&(t.current=e)}function i(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return t=>{e.forEach(e=>o(e,t))}}function l(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return(0,r.useCallback)(i(...e),e)}},40001:function(t,e,n){n.d(e,{C:function(){return o}});var r=n(46024);function o(t){let{value:e,defaultValue:n,finalValue:o,onChange:i=()=>{}}=t,[l,u]=(0,r.useState)(void 0!==n?n:o);return void 0!==e?[e,i,!0]:[l,function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];u(t),null==i||i(t,...n)},!1]}},17625:function(t,e,n){n.d(e,{k:function(){return r}});function r(){return"mantine-".concat(Math.random().toString(36).slice(2,11))}}}]);