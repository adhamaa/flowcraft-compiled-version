(()=>{var e={};e.id=3858,e.ids=[3858],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},72254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},15673:e=>{"use strict";e.exports=require("node:events")},47261:e=>{"use strict";e.exports=require("node:util")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},86576:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.ZP,__next_app__:()=>u,originalPathname:()=>d,pages:()=>c,routeModule:()=>m,tree:()=>i}),r(61988),r(11300),r(51251),r(94347),r(18765),r(16167),r(46973),r(28045);var a=r(5492),n=r(13227),s=r(32541),l=r(53534),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let i=["",{children:["manage-cycle",{children:["[claim_slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,61988)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\[claim_slug]\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,11300)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\[claim_slug]\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,51251)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\[claim_slug]\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,94347)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,18765)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\loading.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,16167)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,46973)),"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,28045,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\manage-cycle\\[claim_slug]\\page.tsx"],d="/manage-cycle/[claim_slug]/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/manage-cycle/[claim_slug]/page",pathname:"/manage-cycle/[claim_slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:i}})},69084:(e,t,r)=>{Promise.resolve().then(r.bind(r,52121)),Promise.resolve().then(r.bind(r,52841))},87328:(e,t,r)=>{Promise.resolve().then(r.bind(r,43435))},72873:(e,t,r)=>{Promise.resolve().then(r.bind(r,15037))},11519:()=>{},43973:()=>{},98186:(e,t,r)=>{"use strict";r(43973);var a=r(75905),n=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(a),s="undefined"!=typeof process&&process.env&&!0,l=function(e){return"[object String]"===Object.prototype.toString.call(e)},o=function(){function e(e){var t=void 0===e?{}:e,r=t.name,a=void 0===r?"stylesheet":r,n=t.optimizeForSpeed,o=void 0===n?s:n;i(l(a),"`name` must be a string"),this._name=a,this._deletedRulePlaceholder="#"+a+"-deleted-rule____{}",i("boolean"==typeof o,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=o,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0,this._nonce=null}var t=e.prototype;return t.setOptimizeForSpeed=function(e){i("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),i(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;i(!this._injected,"sheet already injected"),this._injected=!0,this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){return i(l(e),"`insertRule` accepts only strings"),"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++},t.replaceRule=function(e,t){this._optimizeForSpeed;var r=this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(a){s||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}return e},t.deleteRule=function(e){this._serverSheet.deleteRule(e)},t.flush=function(){this._injected=!1,this._rulesCount=0,this._serverSheet.cssRules=[]},t.cssRules=function(){return this._serverSheet.cssRules},t.makeStyleTag=function(e,t,r){t&&i(l(t),"makeStyleTag accepts only strings as second parameter");var a=document.createElement("style");this._nonce&&a.setAttribute("nonce",this._nonce),a.type="text/css",a.setAttribute("data-"+e,""),t&&a.appendChild(document.createTextNode(t));var n=document.head||document.getElementsByTagName("head")[0];return r?n.insertBefore(a,r):n.appendChild(a),a},function(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e}();function i(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var c=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},d={};function u(e,t){if(!t)return"jsx-"+e;var r=String(t),a=e+r;return d[a]||(d[a]="jsx-"+c(e+"-"+r)),d[a]}function m(e,t){var r=e+(t=t.replace(/\/style/gi,"\\/style"));return d[r]||(d[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[r]}var p=a.createContext(null);p.displayName="StyleSheetContext",n.default.useInsertionEffect||n.default.useLayoutEffect;var g=void 0;function h(e){var t=g||a.useContext(p);return t&&t.add(e),null}h.dynamic=function(e){return e.map(function(e){return u(e[0],e[1])}).join(" ")},t.style=h},21129:(e,t,r)=>{"use strict";e.exports=r(98186).style},41100:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var a=r(8973),n=r(72227),s=r(46794);let l=({onMouseEnter:e,label:t})=>a.jsx(s.u,{label:t,children:a.jsx(n.JO,{icon:"mingcute:information-fill",width:"0.7rem",height:"0.7rem",className:"!mb-2 !ml-0.5 cursor-pointer text-black/80 hover:text-black/70",onMouseEnter:e})})},43435:(e,t,r)=>{"use strict";r.d(t,{default:()=>h});var a=r(8973),n=r(63807);r(75905);var s=r(19082),l=r(28285),o=r(64984),i=r(59544),c=r(30976),d=r(72227),u=r(44487);let m=({isRestructure:e,isCollapse:t,isSideMenuCollapse:r,onClick:n,disabled:s})=>a.jsx("div",{className:"flex items-end justify-end mt-auto py-2 border-t",children:(0,a.jsxs)(u.z,{disabled:s,variant:"transparent",color:"var(--fc-brand-700)",fz:16,...e&&{leftSection:a.jsx(d.JO,{className:"rounded",icon:"heroicons-solid:rectangle-group",width:"1.75rem"})},onClick:n,bg:"transparent",children:[e&&"Restructure",t&&a.jsx(d.JO,{icon:"tabler:chevron-down",width:"3rem",rotate:r?15:45,className:"text-[var(--fc-brand-700)]"})]})});var p=r(97049),g=r(59168);let h=function(){let[e,{toggle:t}]=(0,s.q)(!1),{createQueryString:r,remainQueryString:d}=(0,g.Z)();(0,n.useSearchParams)(),(0,n.useParams)();let u=(0,n.useRouter)(),h=(0,n.usePathname)(),b=[{name:"Manage Claim",value:"manage-cycle",disabled:!1,onChange:async e=>u.push(`/manage-cycle/${e}/?`+d()),children:{defaultValue:h.includes("/pending-claim")?"pending-claim":h.includes("/completed-claim")?"completed-claim":h.includes("/stage")?"stage":h.includes("/user")?"user":"",data:[{name:"Pending Claims",value:"pending-claim",disabled:!1,onChange:async e=>{u.push(`/manage-cycle/${e}/?`+d())}},{name:"Completed Claim",value:"completed-claim",disabled:!0,onChange:async e=>{u.push(`/manage-cycle/${e}/?`+d())}},{name:"Stage",value:"stage",disabled:!0,onChange:async e=>{u.push(`/manage-cycle/${e}/?`+d())}},{name:"User",value:"user",disabled:!0,onChange:async e=>{u.push(`/manage-cycle/${e}/?`+d())}}]}}];return a.jsx("aside",{children:(0,a.jsxs)(l.m,{value:b[0].value,component:"div",orientation:"vertical",classNames:{root:"h-full",tab:"!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold",tabLabel:"~text-md/lg",list:"flex-nowrap"},children:[(0,a.jsxs)(o.d,{children:[a.jsx(a.Fragment,{}),b.map(e=>a.jsx(i.n,{value:e.value,disabled:e.disabled,className:"",children:e.name},e.value)),a.jsx(m,{isSideMenuCollapse:e,isCollapse:!0,onClick:t})]}),b.map(t=>a.jsx(c.A,{value:t.value,children:a.jsx(l.m,{value:t.children.defaultValue,orientation:"vertical",classNames:{root:(0,p.Z)("h-full"),tab:"!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold",tabLabel:"~text-md/lg",list:"flex-nowrap w-40"},onChange:t?.onChange,children:!e&&(0,a.jsxs)(o.d,{children:[a.jsx(a.Fragment,{}),t.children.data.map(e=>a.jsx(i.n,{value:e.value,disabled:e.disabled,children:e.name},e.value))]})})},t.value))]})})}},15037:(e,t,r)=>{"use strict";r.d(t,{default:()=>G});var a=r(8973),n=r(75905),s=r(21129),l=r.n(s),o=r(41100),i=r(34386),c=r(12530),d=r(54277),u=r(72227),m=r(55813),p=r(7938),g=r(44487),h=r(26838),b=r(67143),f=r(52121),x=r(83224),v=r(2404),y=r(38834),S=r(34778),_=r(50445),j=r(77348),C=r(97049),w=r(37585),P=r(33476),F=r(63807),A=r(66426),N=r(8874),I=r(27258);I.z.enum(["recovery_all","recovery_stage","send_pending","send_message","test_pending"]);let k=I.z.object({claim_id:I.z.array(I.z.string().min(1)).optional(),stage_uuid:I.z.custom(e=>(!Array.isArray(e)||0!==e.length)&&!!e&&""!==e,{message:"Stage UUID is required"}).optional(),user_id:I.z.custom(e=>(!Array.isArray(e)||0!==e.length)&&!!e&&""!==e,{message:"User ID is required"}),message:I.z.string().optional()}),R=I.z.object({user_id:I.z.string({message:"User ID is required"}),action:I.z.literal("test_pending")}),z=I.z.object({user_id:I.z.array(I.z.string().min(1),{message:"User ID is required"}),action:I.z.literal("send_pending")}),E=I.z.object({user_id:I.z.array(I.z.string().min(1),{message:"User ID is required"}),stage_uuid:I.z.array(I.z.string().min(1),{message:"Stage UUID is required"}),action:I.z.literal("recovery_stage")}),q=I.z.object({user_id:I.z.array(I.z.string().min(1),{message:"User ID is required"}),action:I.z.literal("recovery_all")}),D=I.z.object({user_id:I.z.array(I.z.string().min(1),{message:"User ID is required"}),message:I.z.string(),action:I.z.literal("send_message")}),O=function(){let[e,t]=n.useState(),r=(0,F.useSearchParams)(),s=r.get("cycle_id"),l=r.get("selected_app");return n.useEffect(()=>{(0,c.M3)({apps_label:l,cycle_id:s}).then(t)},[]),(0,a.jsxs)("div",{className:"flex flex-col w-full overflow-auto",children:[a.jsx("span",{className:"flex w-full px-14 py-6 items-center border-b text-2xl font-semibold",children:e?.cycle_name}),(0,a.jsxs)("div",{className:"w-full py-6 px-20",children:[(0,a.jsxs)("h1",{className:"font-semibold text-lg",children:["List of pending claims",a.jsx(o.Z,{label:"List of pending claims"})]}),a.jsx(L,{})]})]})},L=e=>{let{data:t}=(0,P.kP)(),r=t?.user?.user_id,s=(0,F.useSearchParams)(),l=(0,F.usePathname)(),o=`${l}?${s}`,I=s.get("selected_app"),O=s.get("cycle_id"),[L,B]=n.useState(),{control:T,watch:U,handleSubmit:M,reset:W}=(0,A.cI)({reValidateMode:"onSubmit",resolver:(0,d.F)("test_pending"===L?R:"send_pending"===L?z:"recovery_stage"===L?E:"recovery_all"===L?q:"send_message"===L?D:k),defaultValues:{actor_name:void 0,current_stage_name:void 0,claim_id:void 0,user_id:void 0,stage_uuid:void 0,message:void 0,action:void 0}}),[$]=(0,v.c)(U("claim_id"),200,{leading:!1}),[G]=(0,v.c)(U("actor_name"),200,{leading:!1}),[V]=(0,v.c)(U("current_stage_name"),200,{leading:!1}),[X,Y]=n.useState({pageSize:25,pageIndex:0}),[Q,ee]=n.useState({}),[et,er]=n.useState([]),[ea,en]=n.useState(!1),[es,el]=n.useReducer((e,t)=>t.data.reduce((e,{user_id:t,user_name:r})=>[...e,{value:t,label:r}],[]),[]),[eo,ei]=n.useReducer((e,t)=>t.reduce((e,{stage_uuid:t,stage_name:r})=>[...e,{value:t,label:r}],[]),[]),ec={page:X.pageIndex+1,per_page:X.pageSize,claim_id:$,actor_name:G,stage_name:V},{data:ed,total_items:eu}=(0,_.a)({queryKey:["allclaim",ec],queryFn:()=>(0,c.GX)(ec),placeholderData:j.Wk}).data||{},em=[{header:"Claim ID",accessorFn:e=>e.claim_id},{header:"Actor",accessorFn:e=>e.actor_name},{header:"Stage",accessorFn:e=>e.current_stage_name}],ep=async e=>{let{user_id:t,claim_id:a,stage_uuid:n,message:s,action:l}={user_id:Array.isArray(e.user_id)?e.user_id:[e.user_id],claim_id:Object.keys(eb.getState().rowSelection),stage_uuid:e.stage_uuid,message:e.message,action:e.action},d=(e=>{switch(e){case"test_pending":case"send_pending":return{user_id:t,claim_id:a,action:e};case"recovery_stage":return{user_id:t,claim_id:a,stage_uuid:n,action:e};case"recovery_all":return{user_id:t,action:e};case"send_message":return{user_id:t,claim_id:a,message:s,action:e};default:return console.error("Action not found"),null}})(l);if(d){try{let e=await (0,c.A6)({body:d});i.Z.success(e.message),(0,c.Vh)({action:`${l}_pending_claims`,location_url:o,object:"src/app/manage-cycle/[claim_slug]/_components/manage-cycle/pending-claims.tsx",process_state:"TRIGGERAPI",sysfunc:'"handleAction" func',userid:r,sysapp:"FLOWCRAFTBUSINESSPROCESS",notes:"Update pending claims",json_object:{...d,...e}})}catch(e){i.Z.error(e.message)}eb.resetRowSelection(),S.qk.closeAll()}},eg=[{value:"test_pending",label:"test",description:"To test and send pending to the respective user.",input:[{type:"select",name:"user_id",label:"Choose User Id",placeholder:"Selected User ID",data:es,control:T},{type:"text",name:"action",label:"Action",value:"test_pending",control:T}],btnCancel:{label:"Cancel",onClick:()=>S.qk.closeAll()},btnSubmit:{label:"test",onClick:M(ep)}},{value:"recovery_stage",label:"Recovery",description:"To test and send to specific user to get their respective pending.",input:[{type:"multi-select",name:"user_id",label:"Choose User Id",placeholder:"Selected User ID",required:!0,data:es,control:T},{type:"multi-select",name:"stage_uuid",label:"Choose Stage Name",placeholder:"Selected Stage Name",data:eo,control:T},{type:"text",name:"action",label:"Action",value:"recovery_stage",control:T}],btnCancel:{label:"Cancel",onClick:()=>S.qk.closeAll()},btnSubmit:{label:"Recover",onClick:M(ep)}},{value:"send_message",label:"Send Message",description:"Send message to all pending claim user of selected stage.",input:[{type:"multi-select",name:"user_id",label:"Choose User Id",placeholder:"Selected User ID",required:!0,data:es,control:T},{type:"textarea",name:"message",label:"Write message",placeholder:"Write the message here",control:T},{type:"text",name:"action",label:"Action",value:"send_message",control:T}],btnCancel:{label:"Cancel",onClick:()=>S.qk.closeAll()},btnSubmit:{label:"Send",onClick:M(ep)}},{value:"send_pending",label:"Send Pending",description:"Are you sure you want to send the selected pendings?",input:[{type:"multi-select",name:"user_id",label:"Choose User Id",placeholder:"Selected User ID",required:!0,data:es,control:T},{type:"text",name:"action",label:"Action",value:"send_pending",control:T}],btnCancel:{label:"Cancel",onClick:()=>S.qk.closeAll()},btnSubmit:{label:"Send",onClick:M(ep)}}],eh=(0,y.a)("(max-height: 768px)"),eb=(0,w.Un)({columns:n.useMemo(()=>em,[em]),data:n.useMemo(()=>et,[et]),initialState:{density:"xs"},onPaginationChange:Y,onRowSelectionChange:ee,enableSorting:!1,enableRowSelection:!0,getRowId:e=>e.claim_id.toString(),selectAllMode:"all",manualPagination:!0,rowCount:eu,state:{pagination:X,rowSelection:Q},enableTopToolbar:!0,renderTopToolbar:({table:e})=>(0,a.jsxs)(A.l0,{control:T,className:"flex gap-4 p-4 px-6",children:[a.jsx(N.Y2,{name:"claim_id",placeholder:"Claim ID",disabled:!1,hideControls:!0,leftSection:a.jsx(u.JO,{icon:"mingcute:search-line",width:20,onClick:()=>console.log("clicked search"),className:"hover:text-[var(--fc-brand-700)] cursor-pointer"}),classNames:{input:"!rounded-lg border border-[--mantine-color-default-border] focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8"},control:T}),a.jsx(N.oi,{name:"actor_name",placeholder:"Actor",disabled:!1,leftSection:a.jsx(u.JO,{icon:"mingcute:search-line",width:20,onClick:()=>console.log("clicked search"),className:"hover:text-[var(--fc-brand-700)] cursor-pointer"}),classNames:{input:"!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8"},control:T}),a.jsx(N.oi,{name:"current_stage_name",placeholder:"Stage",disabled:!1,leftSection:a.jsx(u.JO,{icon:"mingcute:search-line",width:20,onClick:()=>console.log("clicked search"),className:"hover:text-[var(--fc-brand-700)] cursor-pointer"}),classNames:{input:"!rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8"},control:T}),(0,a.jsxs)(m.v,{opened:ea,onChange:en,shadow:"md",width:"target",offset:0,classNames:{dropdown:"rounded-none rounded-b-md border-none"},children:[a.jsx(p.e,{children:a.jsx(g.z,{disabled:0===Object.keys(Q).length,color:"var(--fc-brand-700)",ml:"auto",w:220,type:"button",variant:"filled",classNames:{root:(0,C.Z)("disabled:!bg-fc-neutral-200 disabled:border-transparent disabled:cursor-not-allowed",ea?"rounded-none rounded-t-md":"rounded-md")},children:"Action"})}),a.jsx(h.e,{onClick:()=>W(),children:eg.map(({label:e,description:t,value:r,input:n,btnCancel:s,btnSubmit:l},o)=>a.jsx(b.s,{classNames:{itemLabel:"font-light capitalize text-center"},onClick:()=>{B(r),S.qk.open({title:e,size:"sm",children:(0,a.jsxs)("div",{className:"space-y-9",children:[a.jsx("p",{className:"text-center",children:t}),n.map((e,t)=>{switch(e.type){case"select":return a.jsx(K,{...e},t);case"multi-select":return a.jsx(H,{...e},t);case"textarea":return a.jsx(J,{...e},t);case"text":return a.jsx(N.oi,{...e,name:e.name,defaultValue:e.value,display:"none"},t);default:return null}}),(0,a.jsxs)(f.Flex,{justify:"center",align:"center",gap:16,children:[a.jsx(g.z,{id:r,color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",type:"button",onClick:s.onClick,children:s.label}),a.jsx(g.z,{id:r,color:"var(--fc-brand-700)",radius:"md",type:"button",onClick:l.onClick,children:l.label})]})]}),withCloseButton:!1,classNames:{content:"p-6 space-y-6 rounded-lg",title:"text-3xl font-semibold text-[var(--fc-neutral-900)] capitalize text-center",header:"flex items-center justify-center"}})},children:e},o))})]})]}),enableBottomToolbar:!1,enableColumnActions:!1,enableStickyHeader:!0,mantinePaginationProps:{showRowsPerPage:!1},paginationDisplayMode:"pages",mantineTableContainerProps:{h:eh?"300":"450",mih:"150",px:"48",className:"overflow-auto"},mantinePaperProps:{classNames:{root:"!border-none !shadow-none w-full !bg-[var(--fc-neutral-100)]"}},mantineTableBodyRowProps:()=>({classNames:{tr:"!border-none"}})});return n.useEffect(()=>{ed&&er(ed)},[ed]),n.useEffect(()=>{(async()=>await (0,c.d5)({apps_label:I,cycle_id:O}))().then(el)},[I,O]),n.useEffect(()=>{(async()=>await (0,c.bp)({apps_label:I,cycle_id:O}))().then(ei)},[I,O]),(0,a.jsxs)(x.K,{children:[a.jsx(Z,{table:eb,actionsButton:a.jsx("div",{className:"flex gap-2",children:a.jsx(g.z,{color:"#E2E8F0",c:"var(--fc-neutral-900)",onClick:()=>{B("recovery_all"),W(),[{value:"recovery_all",label:"Recovery",description:"To test and send to specific user to get their respective pending by business prosess",input:[{type:"multi-select",name:"user_id",label:"Choose User Id",placeholder:"Selected User ID",required:!0,data:es,control:T},{type:"text",name:"action",label:"Action",value:"recovery_all",control:T}],btnCancel:{label:"Cancel",onClick:()=>{B(void 0),S.qk.closeAll()}},btnSubmit:{label:"Recover",onClick:M(ep)}}].map(({label:e,description:t,value:r,input:n,btnCancel:s,btnSubmit:l},o)=>{S.qk.open({title:e,size:"sm",children:(0,a.jsxs)("div",{className:"space-y-9",children:[a.jsx("p",{className:"text-center",children:t}),n.map((e,t)=>{switch(e.type){case"select":return a.jsx(K,{...e},t);case"multi-select":return a.jsx(H,{...e},t);case"textarea":return a.jsx(J,{...e},t);case"text":return a.jsx(N.oi,{...e,name:e.name,defaultValue:e.value,display:"none"},t);default:return null}}),(0,a.jsxs)(f.Flex,{justify:"center",align:"center",gap:16,children:[a.jsx(g.z,{id:r,color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",type:"button",onClick:s.onClick,children:s.label}),a.jsx(g.z,{id:r,color:"var(--fc-brand-700)",radius:"md",type:"button",onClick:l.onClick,children:l.label})]})]}),withCloseButton:!1,classNames:{content:"p-6 space-y-6 rounded-lg",title:"text-3xl font-semibold text-[var(--fc-neutral-900)] capitalize text-center",header:"flex items-center justify-center"}})})},className:"hover:!bg-[#E2E8F0] hover:!text-[var(--fc-neutral-900)] transition-all duration-300 ease-in-out",children:"Recovery"})})}),a.jsx(w.ZO,{table:eb})]})},Z=({table:e,actionsButton:t,className:r})=>{let n=!!e;return a.jsx("div",{className:(0,C.Z)("relative flex !bg-[#CBD5E1] rounded-t-lg mt-4 min-h-10",n&&"-mb-4"),children:(0,a.jsxs)(f.Flex,{justify:"space-between",align:"center",classNames:{root:(0,C.Z)("!py-3 !px-4 w-full")},children:[n&&a.jsx(w.TY,{autoContrast:!0,withEdges:!1,table:e,color:"var(--fc-brand-700)",classNames:{root:"",control:"!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[var(--fc-brand-700)] !hover:text-white/90 !hover:!border-[var(--fc-brand-700)] !transition-all !duration-300 !ease-in-out data-[active=true]:!bg-[var(--fc-brand-700)] data-[active=true]:!text-white/90 data-[active=true]:!border-[var(--fc-brand-700)]"}}),t]})})},B={root:"space-y-2",label:"text-sm font-semibold text-[#475569] capitalize mb"},T={root:B.root,input:"!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-[21.5px] pr-[21.5px]",label:B.label},U={root:B.root,input:"!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5",label:B.label},M={root:B.root,input:"!rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black py-2.5 pr-2.5 h-40",label:B.label},W=`
  .mantine-MultiSelect-input:focus,
  .mantine-MultiSelect-input:focus-visible,
  .mantine-MultiSelect-input:focus-within,
  .mantine-Textarea-input:focus,
  .mantine-Textarea-input:focus-visible,
  .mantine-Textarea-input:focus-within {
    outline: 2px solid var(--fc-brand-700);
    border-color: transparent;
    transition: all 0.1s ease;
  }
`,K=({name:e,label:t,placeholder:r,data:n,control:s,required:o})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx(N.Ph,{name:e,label:t,required:o,placeholder:r,checkIconPosition:"left",rightSection:a.jsx(u.JO,{icon:"tabler:chevron-down",width:"1rem",height:"1rem"}),data:n,disabled:!1,allowDeselect:!0,searchable:!0,nothingFoundMessage:"No data found",classNames:T,control:s}),a.jsx(l(),{id:W.__hash,children:W})]}),H=({name:e,label:t,placeholder:r,data:n,control:s,required:o})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx(N.NU,{name:e,label:t,required:o,placeholder:r,checkIconPosition:"left",rightSection:a.jsx(u.JO,{icon:"tabler:chevron-down",width:"1rem",height:"1rem"}),data:n,disabled:!1,searchable:!0,nothingFoundMessage:"No data found",classNames:U,control:s}),a.jsx(l(),{id:W.__hash,children:W})]}),J=({name:e,label:t,placeholder:r,control:n,required:s})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx(N.gx,{name:e,label:t,required:s,placeholder:r,resize:"vertical",classNames:M,control:n}),a.jsx(l(),{id:W.__hash,children:W})]}),$=function(){return a.jsx("div",{children:"CompletedClaim"})},G=function(){let e=(0,F.useParams)(),t="pending-claim"===e.claim_slug,r="completed-claim"===e.claim_slug,s="stage"===e.claim_slug,l="user"===e.claim_slug;return n.useEffect(()=>{!t&&!r&&s&&l&&(0,F.notFound)()},[t]),t?a.jsx(O,{}):r?a.jsx($,{}):a.jsx("div",{children:"ManageClaim"})}},11300:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>c});var a=r(83422);r(59342);var n=r(57992);let s=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\app\manage-cycle\[claim_slug]\_components\SideMenus\menus.tsx`),{__esModule:l,$$typeof:o}=s;s.default;let i=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\app\manage-cycle\[claim_slug]\_components\SideMenus\menus.tsx#default`),c={title:"Manage claim",description:"cycle management"};async function d({children:e}){return(0,a.jsxs)("div",{className:"flex h-[calc(100vh-146.5px)] w-full overflow-hidden",children:[a.jsx(i,{}),e]})}},51251:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(83422),n=r(90458),s=r(38016);function l(){return a.jsx(n.k,{align:"center",justify:"center",w:"100%",children:a.jsx(s.a,{color:"var(--fc-brand-700)"})})}},61988:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var a=r(83422);r(59342);var n=r(57992);let s=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\app\manage-cycle\[claim_slug]\_components\manage-cycle\index.tsx`),{__esModule:l,$$typeof:o}=s;s.default;let i=(0,n.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\src\app\manage-cycle\[claim_slug]\_components\manage-cycle\index.tsx#default`),c=function(){return a.jsx(i,{})}},94347:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>s});var a=r(83422);r(59342);var n=r(93301);let s={title:"cycle management",description:"Manage Claims"};async function l({children:e}){return await (0,n.I8)(),a.jsx("div",{className:"flex h-full",children:e})}},18765:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(83422),n=r(15948);function s(){return a.jsx(n.f,{visible:!0,zIndex:1e3,overlayProps:{radius:"sm",blur:2},loaderProps:{color:"var(--fc-brand-700)",type:"oval"}})}},50445:(e,t,r)=>{"use strict";r.d(t,{a:()=>s});var a=r(94276),n=r(10652);function s(e,t){return(0,n.r)(e,a.z,t)}},90458:(e,t,r)=>{"use strict";r.d(t,{k:()=>o});var a=r(57992);let n=(0,a.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\Flex\Flex.mjs`),{__esModule:s,$$typeof:l}=n;n.default;let o=(0,a.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\Flex\Flex.mjs#Flex`)},38016:(e,t,r)=>{"use strict";r.d(t,{a:()=>o});var a=r(57992);let n=(0,a.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\Loader\Loader.mjs`),{__esModule:s,$$typeof:l}=n;n.default;let o=(0,a.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\Loader\Loader.mjs#Loader`);(0,a.createProxy)(String.raw`D:\SCHINKELS\repo\SAFWA-BIZ-PROCESS\node_modules\.pnpm\@mantine+core@7.12.2_kplsgwvs2vtofl6xlhn72p4s34\node_modules\@mantine\core\esm\components\Loader\Loader.mjs#defaultLoaders`)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8290,6691,3350,7389,8874,3162,7585,2508,4306,4586,2941,299],()=>r(86576));module.exports=a})();