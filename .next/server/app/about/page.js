(()=>{var e={};e.id=7301,e.ids=[7301],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},72254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},15673:e=>{"use strict";e.exports=require("node:events")},47261:e=>{"use strict";e.exports=require("node:util")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},50648:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.ZP,__next_app__:()=>u,originalPathname:()=>d,pages:()=>c,routeModule:()=>m,tree:()=>l}),r(99056),r(51840),r(16167),r(46973),r(28045);var s=r(5492),o=r(13227),a=r(32541),i=r(53534),n={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>i[e]);r.d(t,n);let l=["",{children:["about",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,99056)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\about\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,51840)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\about\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,16167)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,46973)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,28045,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\about\\page.tsx"],d="/about/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/about/page",pathname:"/about",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},74463:(e,t,r)=>{Promise.resolve().then(r.bind(r,51153)),Promise.resolve().then(r.bind(r,15064)),Promise.resolve().then(r.bind(r,33609))},11519:()=>{},15064:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var s=r(8973);r(75905);let o=function(){return(0,s.jsxs)("footer",{className:"flex justify-between items-center h-16 px-40 py-12",children:[s.jsx("div",{children:s.jsx("span",{children:"v2.0.0-1 | 30 July 2024"})}),(0,s.jsxs)("div",{children:[s.jsx("span",{children:"Designed by EZDOM Technology"}),s.jsx("br",{}),s.jsx("span",{children:"Deployed by Schinkels Technik"})]})]})}},33609:(e,t,r)=>{"use strict";r.d(t,{default:()=>x});var s=r(8973),o=r(75905),a=r(72227),i=r(55813),n=r(7938),l=r(22807),c=r(26838),d=r(67143),u=r(44487),m=r(97049),p=r(63807);let x=({title:e,multiple:t=!1,className:r})=>{let x=(0,p.useRouter)(),f=(0,p.usePathname)(),h=t?"/manage-cycle"===f?"Cycle Management":"/cycle"===f?"Business Process":void 0:e,[g,b]=o.useState(!1),[v,S]=o.useReducer((e,t)=>t.target.textContent,h);if(t&&!Array.isArray(e))throw Error('"title" props should be an array when "multiple" props is true');return(0,s.jsxs)("section",{className:(0,m.Z)("flex items-center px-20 py-10",r),children:[!t&&s.jsx("h1",{className:"font-semibold text-xl",children:v}),(0,s.jsxs)(i.v,{opened:g,onChange:b,shadow:"md",width:"target",children:[t&&s.jsx(n.e,{children:(0,s.jsxs)("span",{className:"flex items-center space-x-4 min-w-60",children:[s.jsx("h1",{className:"font-semibold text-xl",children:v}),s.jsx(l.A,{variant:"transparent",color:"black",size:"lg",radius:"md","aria-label":"Home Selection",ml:"auto",onClick:()=>b(e=>!e),children:s.jsx(a.JO,{icon:"heroicons:chevron-down",width:"2rem",rotate:g?90:0})})]})}),s.jsx(c.e,{onClick:S,children:t&&e.map((e,t)=>s.jsx(d.s,{onClick:()=>x.push("Cycle Management"===e?"/manage-cycle":"/cycle"),children:e},t))})]}),"Business Process"===e&&s.jsx(u.z,{disabled:!0,variant:"filled",color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",size:"sm",fz:14,ml:"auto",leftSection:s.jsx(a.JO,{className:"cursor-pointer rounded",icon:"heroicons-outline:plus-circle",width:"1rem",height:"1rem"}),classNames:{root:"disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]"},children:"Add Business Process"})]})}},51840:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(83422);r(59342);var o=r(93301);async function a({children:e}){return await (0,o.I8)(),s.jsx("div",{children:e})}},99056:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var s=r(83422);r(59342);var o=r(54329),a=r(30471);let i=function(){return(0,s.jsxs)("main",{className:"pt-14 space-y-16",children:[(0,s.jsxs)("section",{className:"relative text-center text-xl font-semibold space-y-4 max-w-3xl mx-auto",children:[(0,s.jsxs)("h1",{className:"text-5xl flex justify-center items-center",children:["Welcome to\xa0",s.jsx("img",{src:"/about/fc_logo_word.png",width:254,height:87,alt:"fc logo",className:"inline-block"})]}),s.jsx("p",{className:"w-[52ch] mx-auto",children:"The premier platform designed to empower IT department in revolutionizing business processes, managing requirements, and optimizing instance cycles effortlessly."})]}),(0,s.jsxs)("section",{className:"relative flex justify-center items-center max-w-4xl mx-auto",children:[(0,s.jsxs)("h1",{children:[s.jsx("img",{src:"/about/character_1.png",width:117,height:189,alt:"device",className:"absolute -left-24 bottom-0 -z-10"}),s.jsx("img",{src:"/about/chat_bubbles_shadow.png",width:124,height:50,alt:"device",className:"absolute left-16 top-4"}),s.jsx("img",{src:"/about/mini_love.png",width:500,height:214,alt:"device",className:"absolute left-44 -top-36 -z-10"}),"At ",s.jsx("strong",{children:"Flowcraft"}),", we understand the critical role that IT department plays in shaping and enhancing organizational workflows. Our mission is to provide a user-friendly, intuitive, and robust platform that equips administrators with the tools they need to adapt, evolve, and streamline business processes effectively."]}),s.jsx("img",{src:"/about/section_2_bg_right.png",width:438,height:215,alt:"device",className:""})]}),(0,s.jsxs)("section",{className:"relative flex flex-col text-center h-full py-8 mx-auto space-y-6",children:[s.jsx("img",{src:"/about/bg_blured.png",alt:"bg blured",className:"absolute w-full h-full mx-auto inset-0"}),(0,s.jsxs)("span",{children:[s.jsx("h1",{className:"font-semibold text-3xl",children:"FLOWCRAFT"}),s.jsx("p",{className:"font-semibold text-5xl tracking-[0.28em]",children:"VISION"})]}),s.jsx("p",{className:"w-[84ch] mx-auto",children:"We envision a world where administrative IT professionals have the power to manage business processes, driving innovation and efficiency across organizations of all sizes and industries."})]}),(0,s.jsxs)("section",{className:"relative flex justify-center items-center max-w-6xl mx-auto space-x-16",children:[s.jsx("img",{src:"/about/what_we_offer.png",alt:"What we offer ?"}),(0,s.jsxs)("div",{className:"flex flex-col space-y-4",children:[(0,s.jsxs)("span",{children:[s.jsx("h3",{className:'font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10',children:"Dynamic Business Process Management"}),s.jsx("p",{children:"With our intuitive interface, administrators can easily map out, customize, and modify business processes to align with evolving requirements and objectives."})]}),(0,s.jsxs)("span",{children:[s.jsx("h3",{className:'font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10',children:"Flexible Requirement Management"}),s.jsx("p",{children:"Our platform empowers administrators to define, track, and manage requirements with precision, ensuring clarity and alignment across teams."})]}),(0,s.jsxs)("span",{children:[s.jsx("h3",{className:'font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10',children:"Efficient Instance Cycle Management"}),s.jsx("p",{children:"Seamlessly manage instance lifecycles, rebuild the business process from scratch, from creation to completion, with advanced tracking, monitoring, and optimization features."})]}),(0,s.jsxs)("span",{children:[s.jsx("h3",{className:'font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10',children:"Collaborative Workspace"}),s.jsx("p",{children:"Foster collaboration and communication among stakeholders with built-in tools for sharing insights, gathering feedback, and driving consensus."})]})]})]}),s.jsx("section",{className:"relative flex flex-col text-center h-96 py-8 mx-auto space-y-6",children:s.jsx("img",{src:"/about/bg_blured.png",alt:"bg blured",className:"absolute w-full h-full mx-auto inset-0"})})]})};var n=r(57992);let l=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\ScrollArea\ScrollArea.mjs`),{__esModule:c,$$typeof:d}=l;l.default,(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\ScrollArea\ScrollArea.mjs#ScrollArea`);let u=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\ScrollArea\ScrollArea.mjs#ScrollAreaAutosize`),m=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\components\Footer\index.tsx`),{__esModule:p,$$typeof:x}=m;m.default;let f=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\components\Footer\index.tsx#default`),h=()=>s.jsx(u,{children:(0,s.jsxs)("div",{className:(0,a.Z)("flex flex-col h-[calc(100vh-146.5px)] "),children:[s.jsx(o.ZP,{title:"About Flowcraft",className:"h-max w-full border-b-2 border-[var(--fc-border-gray)]"}),(0,s.jsxs)("div",{children:[s.jsx(i,{}),s.jsx(f,{})]})]})})},54329:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>n});var s=r(57992);let o=(0,s.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\components\TitleSection.tsx`),{__esModule:a,$$typeof:i}=o;o.default;let n=(0,s.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\components\TitleSection.tsx#default`)},22807:(e,t,r)=>{"use strict";r.d(t,{A:()=>j});var s=r(8973);r(75905);var o=r(8046),a=r(56317),i=r(93836),n=r(73579),l=r(83701),c=r(52264),d=r(52841),u=r(94832),m=r(63043),p=r(67182),x=r(54479),f={root:"m_8d3f4000",icon:"m_8d3afb97",loader:"m_302b9fb1",group:"m_1a0f1b21"};let h={orientation:"horizontal"},g=(0,a.Z)((e,{borderWidth:t})=>({group:{"--ai-border-width":(0,p.h)(t)}})),b=(0,x.d5)((e,t)=>{let r=(0,i.w)("ActionIconGroup",h,e),{className:o,style:a,classNames:c,styles:d,unstyled:u,orientation:m,vars:p,borderWidth:x,variant:b,mod:v,...S}=(0,i.w)("ActionIconGroup",h,e),j=(0,n.y)({name:"ActionIconGroup",props:r,classes:f,className:o,style:a,classNames:c,styles:d,unstyled:u,vars:p,varsResolver:g,rootSelector:"group"});return(0,s.jsx)(l.x,{...j("group"),ref:t,variant:b,mod:[{"data-orientation":m},v],role:"group",...S})});b.classes=f,b.displayName="@mantine/core/ActionIconGroup";let v={},S=(0,a.Z)((e,{size:t,radius:r,variant:s,gradient:a,color:i,autoContrast:n})=>{let l=e.variantColorResolver({color:i||e.primaryColor,theme:e,gradient:a,variant:s||"filled",autoContrast:n});return{root:{"--ai-size":(0,o.ap)(t,"ai-size"),"--ai-radius":void 0===r?void 0:(0,o.H5)(r),"--ai-bg":i||s?l.background:void 0,"--ai-hover":i||s?l.hover:void 0,"--ai-hover-color":i||s?l.hoverColor:void 0,"--ai-color":l.color,"--ai-bd":i||s?l.border:void 0}}}),j=(0,c.b)((e,t)=>{let r=(0,i.w)("ActionIcon",v,e),{className:o,unstyled:a,variant:c,classNames:p,styles:x,style:h,loading:g,loaderProps:b,size:j,color:y,radius:w,__staticSelector:A,gradient:N,vars:P,children:_,disabled:F,"data-disabled":C,autoContrast:I,mod:E,...q}=r,k=(0,n.y)({name:["ActionIcon",A],props:r,className:o,style:h,classes:f,classNames:p,styles:x,unstyled:a,vars:P,varsResolver:S});return(0,s.jsxs)(m.k,{...k("root",{active:!F&&!g&&!C}),...q,unstyled:a,variant:c,size:j,disabled:F||g,ref:t,mod:[{loading:g,disabled:F||C},E],children:[(0,s.jsx)(u.u,{mounted:!!g,transition:"slide-down",duration:150,children:e=>(0,s.jsx)(l.x,{component:"span",...k("loader",{style:e}),"aria-hidden":!0,children:(0,s.jsx)(d.Loader,{color:"var(--ai-color)",size:"calc(var(--ai-size) * 0.55)",...b})})}),(0,s.jsx)(l.x,{component:"span",mod:{loading:g},...k("icon"),children:_})]})});j.classes=f,j.displayName="@mantine/core/ActionIcon",j.Group=b},30471:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=function(){for(var e,t,r=0,s="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=function e(t){var r,s,o="";if("string"==typeof t||"number"==typeof t)o+=t;else if("object"==typeof t){if(Array.isArray(t)){var a=t.length;for(r=0;r<a;r++)t[r]&&(s=e(t[r]))&&(o&&(o+=" "),o+=s)}else for(s in t)t[s]&&(o&&(o+=" "),o+=s)}return o}(e))&&(s&&(s+=" "),s+=t);return s}}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[8290,6691,3350,7389,4586,2941,4807],()=>r(50648));module.exports=s})();