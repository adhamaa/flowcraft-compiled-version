(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[377],{60377:function(e,a,t){Promise.resolve().then(t.bind(t,64112))},64112:function(e,a,t){"use strict";t.d(a,{default:function(){return D}});var s=t(66628),r=t(46024),n=t(43182);t(86581),t(46174);var l=t(58635),i=t(86454),c=t(8793),o=t(98004),d=t(60020),u=t(27852),m=t(62159),h=t(35241),b=t(26933),p=t(53133),x=t(41338),g=t(80184),f=t(57469),v=e=>{let{opened:a,toggle:t}=e,{selectedApp:r,setSelectedApp:n}=(0,h.j)(),{createQueryString:i}=(0,x.Z)(),v=(0,b.useSearchParams)().get("selected_app"),y=(0,b.useRouter)(),j=(0,b.usePathname)(),{data:w,isLoading:C}=(0,f.a)({queryKey:["applications"],queryFn:()=>(0,g.AY)()});return(0,s.jsxs)("section",{className:(0,l.Z)("px-20 py-1 bg-[var(--fc-neutral-100)]","shadow-[inset_4px_4px_10px_0_rgb(203_213_225_/_0.25)]"),children:[" ",(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsxs)("div",{className:(0,l.Z)("flex items-center"),children:[(0,s.jsx)("h2",{className:"font-bold text-lg",children:"Applications"}),"\xa0",r&&(0,s.jsx)("span",{children:"(".concat(r,")")}),(0,s.jsx)(o.k,{className:"ml-auto text-sm",onClick:t,color:"blue",children:(0,s.jsxs)("span",{className:"flex items-center gap-2 text-[var(--fc-brand-700)]",children:[a?"Hide":"Unhide",(0,s.jsx)(c.JO,{icon:"tabler:chevron-down",width:"1rem",height:"1rem",rotate:a?90:0})]})})]}),(0,s.jsx)(d.U,{in:a,children:(0,s.jsxs)("div",{className:"flex gap-7 pt-7",children:[C&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(u.O,{height:192,width:176,radius:"md"}),(0,s.jsx)(u.O,{height:192,width:176,radius:"md"}),(0,s.jsx)(u.O,{height:192,width:176,radius:"md"}),(0,s.jsx)(u.O,{height:192,width:176,radius:"md"})]}),!C&&(null==w?void 0:w.map((e,t)=>{let{apps_label:r,apps_name:c}=e,o="/claims_logo.svg";return(0,s.jsxs)(m.z,{variant:"default",classNames:{root:r!=v?"!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none":"!w-44 !h-48 bg-white shadow-lg !rounded-xl !border-none shadow-[var(--fc-brand-700)]/30",label:"flex flex-col items-center justify-center"},onClick:()=>{n(c),y.push(j+"?"+i("selected_app",r))},children:[o?(0,s.jsx)(p.default,{src:o,width:a?400:600,height:a?500:700,className:(0,l.Z)("object-cover"),alt:"process illustration"}):(0,s.jsx)("div",{className:"bg-[var(--fc-brand-700)] w-32 h-32 rounded-full flex justify-center items-center font-semibold text-white text-2xl text-center",children:(0,s.jsx)("p",{className:"w-20 whitespace-pre-wrap",children:"FREE DEMO"})}),(0,s.jsx)("p",{className:"text-wrap text-sm text-[#4F4F4F]",children:c})]},t)}))]})})]})]})},y=t(72850),j=t.n(y);t(61982);var w=t(49326),C=t(51747),k=t(12706),_=t(2437),N=t(6906),S=t(7539),F=t(46738),P=t(46034),A=t(89815),z=t(19660),T=t(66254),Z=t(73610),O=t(38352);let R={memory:"memory",cache:"cache",database:"database"};R.memory,R.cache,R.database;var q=t(97338),B=e=>{let{opened:a,statusIndicator:t,isPagination:n}=e,{resetDiagramLocalStorage:i}=(0,T.Z)(),[o,d]=r.useState([]),{createQueryString:u}=(0,x.Z)(),h=(0,b.useRouter)(),v=(0,b.usePathname)(),y="/manage-cycle"===v,B="/cycle"===v,D=(0,b.useSearchParams)(),I=D.get("selected_app"),E=D.get("data_source"),L=D.get("status"),[M,J]=r.useState(E||(B?"database":"success")),[K,Y]=r.useState({pageIndex:0,pageSize:25}),{data:U}=(0,f.a)({queryKey:["cycle",I,E],queryFn:()=>(0,g.mY)({apps_label:I,datasource_type:E}),enabled:!!(B&&I&&E)}),W={page:K.pageIndex+1,per_page:K.pageSize,status:L},{data:G,total_items:H}=(0,f.a)({queryKey:["pending-claim",W],queryFn:()=>(0,g.xO)(W),enabled:!!(y&&L),placeholderData:q.Wk}).data||{},Q=(0,O.cI)(),V=[{group:"crud",menu:[{label:"Add new cycle",onClick:()=>console.log("reload"),disabled:!0},{label:"Delete cycle",onClick:()=>console.log("Delete"),disabled:!0},{label:"Duplicate cycle",onClick:async e=>{let{original:{cycle_id:a,app_label:t,app_name:r,cycle_active:n}}=e,l="WIP"===(await n).toString();A.qk.open({title:"Duplicate Cycle",children:(0,s.jsxs)(s.Fragment,{children:[l?(0,s.jsxs)(C.x,{size:"sm",children:["The process cycle can be duplicated at a status cycle that is either ",(0,s.jsx)("strong",{children:"active, inactive, or deleted"}),"."]}):(0,s.jsxs)(C.x,{size:"sm",children:["Are you sure you want to duplicate ",(0,s.jsxs)("strong",{children:[r," - cycle id: ",a]}),"?"]}),(0,s.jsxs)(k.Flex,{gap:16,justify:"end",mt:"md",children:[(0,s.jsx)(m.z,{onClick:()=>A.qk.closeAll(),color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",children:"Cancel"}),(0,s.jsx)(m.z,{disabled:l,onClick:async()=>{await (0,g.xq)({cycle_id:a.toString(),apps_label:t}).then(e=>{e.error?z.Z.error(e.error_message):z.Z.success(e.message)}).catch(e=>{z.Z.error(e.message)}).finally(()=>{A.qk.closeAll()})},color:"var(--fc-brand-700)",radius:"md",children:"Yes"})]})]}),overlayProps:{backgroundOpacity:.55,blur:10},radius:"md"})},disabled:!1}]},{group:"reset",menu:[{label:"Reload Business Process",onClick:async e=>{let{original:{cycle_id:a,app_label:t,app_name:r}}=e;A.qk.open({title:"Confirm update",children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(C.x,{size:"sm",children:["Are you sure you want to Reload ",(0,s.jsxs)("strong",{children:[r," - cycle id: ",a]}),"?"]}),(0,s.jsxs)(k.Flex,{gap:16,justify:"end",mt:"md",children:[(0,s.jsx)(m.z,{onClick:()=>A.qk.closeAll(),color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",children:"Cancel"}),(0,s.jsx)(m.z,{onClick:async()=>{try{let e=await (0,g.PA)({cycle_id:a.toString(),apps_label:t});z.Z.success(e.message)}catch(e){z.Z.error("Failed to reload business process\nIncorect cycle id or application label provided")}finally{A.qk.closeAll()}},color:"var(--fc-brand-700)",radius:"md",children:"Yes"})]})]}),overlayProps:{backgroundOpacity:.55,blur:10},radius:"md"})},disabled:!1},{label:"Optimize business process ",onClick:()=>console.log("Optimize"),disabled:!0}]}],X=(e,a)=>{B&&"mrt-row-actions"!==e.column.id&&h.push(v+"/"+a.original.cycle_id+"?"+u("","")),i()},$=(0,w.Un)({columns:B?[{header:"Cycle name",accessorFn:e=>e.cycle_name},{header:"Cycle id",accessorFn:e=>e.cycle_id},{header:"Applications",accessorFn:e=>e.app_name},{header:"Date created",accessorFn:e=>e.cycle_created},{header:"Last edited date",accessorFn:e=>e.cycle_updated},{header:"No of stages",accessorFn:e=>e.no_of_stages},{header:"Status",accessorFn:e=>e.cycle_active,Cell:e=>{let{cell:a}=e;return(0,s.jsx)("div",{className:"flex gap-2 items-center",children:(0,s.jsx)("span",{className:(0,l.Z)("capitalize rounded-full px-2 py-1 text-sm font-semibold",t&&"bg-green-500 text-white"),children:a.getValue()})})}}]:y?[{header:"Cycle id",accessorFn:e=>e.cycle_id},{header:"Applications",accessorFn:e=>e.apps_name},{header:"Claim id",accessorFn:e=>e.claim_id},{header:"Stage name",accessorFn:e=>"N/A"},{header:"Actor",accessorFn:e=>e.user_name},{header:"Last updated date",accessorFn:e=>e.last_updated_datetime}]:[],data:r.useMemo(()=>o,[o]),onPaginationChange:Y,manualPagination:y,rowCount:H,state:{pagination:K},initialState:{showGlobalFilter:!0},enableRowActions:B,enableSorting:!1,enableTopToolbar:!1,enableBottomToolbar:!1,enableColumnActions:!1,positionActionsColumn:"last",displayColumnDefOptions:{"mrt-row-actions":{header:"",size:5}},renderRowActions:e=>{let{row:a}=e;return(0,s.jsxs)(_.v,{classNames:{item:"hover:bg-[#FBFAFC] hover:text-[var(--fc-brand-700)] hover:!border-r-2 border-[var(--fc-brand-700)] ring-0",dropdown:"!p-0 ring-0"},children:[(0,s.jsx)(_.v.Target,{children:(0,s.jsx)(N.A,{variant:"transparent",color:"black",size:"lg",radius:"md","aria-label":"Settings",children:(0,s.jsx)(c.JO,{className:"cursor-pointer rounded",icon:"tabler:dots",width:"1.25rem",height:"1.25rem"})})}),(0,s.jsx)(_.v.Dropdown,{children:V.map((e,t)=>(0,s.jsxs)("div",{children:[e.menu.map(e=>(0,s.jsx)(_.v.Item,{onClick:()=>e.onClick(a),disabled:e.disabled,children:e.label},e.label)),(0,s.jsx)(_.v.Divider,{className:"!m-0"})]},e.group+t))})]})},mantinePaginationProps:{rowsPerPageOptions:["5","10","15"],showRowsPerPage:!1},paginationDisplayMode:"pages",mantinePaperProps:{classNames:{root:"!border-none !shadow-none w-full px-16"}},mantineTableBodyRowProps:e=>{let{row:a}=e;return{classNames:{tr:"!border-none"}}},mantineTableBodyCellProps:e=>{let{cell:a,row:t}=e;return{onClick:()=>X(a,t),classNames:{td:"mrt-row-actions"!==a.column.id&&"cursor-pointer"}}}});r.useEffect(()=>{B&&d(null!=U?U:[])},[U,B]),r.useEffect(()=>{y&&d(null!=G?G:[])},[G,y]),r.useEffect(()=>{I&&B&&!E&&h.push(v+"?"+u("data_source",M))},[M,u,E,v,h,I]),r.useEffect(()=>{I&&y&&!L&&h.push(v+"?"+u("status",M))},[M,u,E,v,h,I]);let ee=[{tooltip:"Reload Business Process (All)",icon:"heroicons-outline:refresh",disabled:!B,onClick:async()=>{A.qk.open({title:"Confirm update",children:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(C.x,{size:"sm",children:["Are you sure you want to Reload ",(0,s.jsx)("strong",{children:"The Business Process"}),"?"]}),(0,s.jsxs)(k.Flex,{gap:16,justify:"end",mt:"md",children:[(0,s.jsx)(m.z,{onClick:()=>A.qk.closeAll(),color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",children:"Cancel"}),(0,s.jsx)(m.z,{onClick:async()=>{try{let e=await (0,g.PA)();z.Z.success(e.message)}catch(e){z.Z.error(e.message)}finally{A.qk.closeAll()}},color:"var(--fc-brand-700)",radius:"md",children:"Yes"})]})]}),overlayProps:{backgroundOpacity:.55,blur:10},radius:"md"})}},...y?[]:[{tooltip:"Filter",icon:"heroicons-outline:adjustments",disabled:!0},{tooltip:"Sort",icon:"heroicons-outline:switch-vertical",disabled:!0}]],[ea,et]=r.useReducer((e,a)=>a.reduce((e,a)=>{let{cycle_id:t,cycle_name:s}=a;return e.push({value:t,label:s}),e},[]),[]),es=[{label:"Add Cycle",type:"button",disabled:!0,canShow:B,onClick:()=>h.push("#"),variant:"filled",color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",size:"sm",fz:14,mr:"auto",classNames:{root:"disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]"},icon:(0,s.jsx)(c.JO,{className:"cursor-pointer rounded",icon:"heroicons-outline:plus-circle",width:"1rem",height:"1rem"})}];return(0,s.jsx)("section",{className:"flex flex-col items-center",children:o.length?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(S.K,{className:"w-full py-20",children:[(0,s.jsxs)(k.Flex,{justify:"start",align:"center",classNames:{root:"px-20"},children:[es.map((e,a)=>{let{label:t,canShow:r,icon:n,...l}=e;return r&&(0,s.jsx)(m.z,{leftSection:n,...l,children:t},t+a)}),y&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Z.Ph,{name:"cycle_id",placeholder:"Cycle Name",checkIconPosition:"left",rightSection:(0,s.jsx)(c.JO,{icon:"tabler:chevron-down",width:"1rem",height:"1rem"}),data:ea,disabled:!1,allowDeselect:!0,searchable:!0,nothingFoundMessage:"No stage found",classNames:{root:"space-y-2 w-96 mr-auto",input:"!rounded-lg py-6 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black",label:"text-sm font-semibold text-[#475569] capitalize mb"},onClick:()=>(0,g.mY)({apps_label:I,datasource_type:R.memory}).then(et),onChange:e=>h.push(v+"/pending-claim?"+u("cycle_id",e)),control:Q.control}),(0,s.jsx)(j(),{id:"d8d58d4153d38465",children:".mantine-Select-option>svg{color:var(--fc-brand-700);opacity:1}"})]}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(w.Tq,{table:$,placeholder:"Search Cycle",leftSection:(0,s.jsx)(c.JO,{icon:"mingcute:search-line",width:20,onClick:()=>console.log("clicked search"),className:"hover:text-[var(--fc-brand-700)] cursor-pointer"}),classNames:{input:"!rounded-lg border !border-[--mantine-color-default-border] w-96 focus:outline-none focus:ring-2 focus:ring-[var(--fc-brand-700)] focus:border-transparent transition-all duration-300 ease-in-out !bg-[#FFF] focus:!bg-white placeholder:ml-8"}}),n&&(0,s.jsx)(w.TY,{table:$,color:"var(--fc-brand-700)"}),(0,s.jsx)("div",{className:"flex ml-2 gap-4",children:ee.map((e,a)=>(0,s.jsx)(F.u,{label:e.tooltip,children:(0,s.jsx)(N.A,{disabled:null==e?void 0:e.disabled,onClick:e.onClick,variant:"transparent",bg:"var(--fc-neutral-100)",color:"black",size:"lg",radius:"md","aria-label":"Settings",children:(0,s.jsx)(c.JO,{icon:e.icon,width:"1rem",height:"1rem"})})},e.tooltip+a))})]})]}),B&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.m,{color:"var(--fc-brand-700)",variant:"default",value:M,onChange:e=>{h.push(v+"?"+u("data_source",e),{scroll:!1}),J(e)},classNames:{root:"m-auto",tab:"!py-[1.6rem] !border-white data-[active=true]:text-[var(--fc-brand-700)] data-[active=true]:!border-[var(--fc-brand-700)] hover:bg-transparent",list:"before:!content-none"},children:(0,s.jsx)(P.m.List,{children:[{name:"memory",value:"memory",disabled:!1},{name:"cache",value:"cache",disabled:!1},{name:"database",value:"database",disabled:!1}].map(e=>(0,s.jsx)(P.m.Tab,{disabled:e.disabled,value:e.value,fz:20,fw:600,children:(0,s.jsx)("span",{className:"capitalize ~text-base/lg",children:e.name})},e.name))})}),(0,s.jsxs)("div",{className:"relative w-screen",children:[(0,s.jsx)("div",{className:"absolute top-12 border w-full border-black/5 z-50"}),(0,s.jsx)(w.ZO,{table:$})]}),(0,s.jsx)(w.Bm,{stackAlertBanner:!0,table:$})]}),y&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.m,{color:"var(--fc-brand-700)",variant:"default",value:M,onChange:e=>{h.push(v+"?"+u("status",e),{scroll:!1}),J(e)},classNames:{root:"m-auto",tab:"!py-[1.6rem] !border-white data-[active=true]:text-[var(--fc-brand-700)] data-[active=true]:!border-[var(--fc-brand-700)] hover:bg-transparent",list:"before:!content-none"},children:(0,s.jsx)(P.m.List,{children:[{name:"WIP",value:"wip",disabled:!1},{name:"Success",value:"success",disabled:!1},{name:"Failed",value:"failed",disabled:!1}].map(e=>(0,s.jsx)(P.m.Tab,{disabled:e.disabled,value:e.value,fz:20,fw:600,children:(0,s.jsx)("span",{className:"capitalize ~text-base/lg",children:e.name})},e.name))})}),(0,s.jsxs)("div",{className:"relative w-screen",children:[(0,s.jsx)("div",{className:"absolute top-12 border w-full border-black/5 z-50"}),(0,s.jsx)(w.ZO,{table:$})]}),(0,s.jsx)(w.Bm,{stackAlertBanner:!0,table:$})]})]})}):(0,s.jsxs)("div",{className:(0,l.Z)("p-20 text-center",!a&&"text-xl"),children:[(0,s.jsx)(p.default,{src:"/process-pana.svg",width:a?400:600,height:a?500:700,className:(0,l.Z)("object-cover"),alt:"process illustration"}),B&&(0,s.jsx)("span",{children:"Explore business process cycles by clicking on the application"}),y&&(0,s.jsx)("span",{children:"Manage your cycles by clicking on the application "})]})})};function D(e){let{}=e,[a,{toggle:t}]=(0,n.q)(!0);return(0,s.jsxs)("div",{className:(0,l.Z)("w-full"),children:[(0,s.jsx)(i.default,{title:["Business Process","Cycle Management"],multiple:!0}),(0,s.jsx)(v,{opened:a,toggle:t}),(0,s.jsx)(B,{isPagination:!0,opened:a})]})}},86454:function(e,a,t){"use strict";var s=t(66628),r=t(46024),n=t(8793),l=t(2437),i=t(2730),c=t(6906),o=t(70784),d=t(90049),u=t(62159),m=t(58635),h=t(26933);a.default=e=>{let{title:a,multiple:t=!1,className:b}=e,p=(0,h.useRouter)(),x=(0,h.usePathname)(),g=t?"/manage-cycle"===x?"Cycle Management":"/cycle"===x?"Business Process":void 0:a,[f,v]=r.useState(!1),[y,j]=r.useReducer((e,a)=>a.target.textContent,g);if(t&&!Array.isArray(a))throw Error('"title" props should be an array when "multiple" props is true');return(0,s.jsxs)("section",{className:(0,m.Z)("flex items-center px-20 py-10",b),children:[!t&&(0,s.jsx)("h1",{className:"font-semibold text-xl",children:y}),(0,s.jsxs)(l.v,{opened:f,onChange:v,shadow:"md",width:"target",children:[t&&(0,s.jsx)(i.e,{children:(0,s.jsxs)("span",{className:"flex items-center space-x-4 min-w-60",children:[(0,s.jsx)("h1",{className:"font-semibold text-xl",children:y}),(0,s.jsx)(c.A,{variant:"transparent",color:"black",size:"lg",radius:"md","aria-label":"Home Selection",ml:"auto",onClick:()=>v(e=>!e),children:(0,s.jsx)(n.JO,{icon:"heroicons:chevron-down",width:"2rem",rotate:f?90:0})})]})}),(0,s.jsx)(o.e,{onClick:j,children:t&&a.map((e,a)=>(0,s.jsx)(d.s,{onClick:()=>p.push("Cycle Management"===e?"/manage-cycle":"/cycle"),children:e},a))})]}),"Business Process"===a&&(0,s.jsx)(u.z,{disabled:!0,variant:"filled",color:"var(--fc-neutral-100)",c:"var(--fc-neutral-900)",radius:"md",size:"sm",fz:14,ml:"auto",leftSection:(0,s.jsx)(n.JO,{className:"cursor-pointer rounded",icon:"heroicons-outline:plus-circle",width:"1rem",height:"1rem"}),classNames:{root:"disabled:!bg-[#f1f3f5] disabled:!text-[#adb5bd]"},children:"Add Business Process"})]})}},35241:function(e,a,t){"use strict";t.d(a,{M:function(){return l},j:function(){return i}});var s=t(66628),r=t(46024);let n=r.createContext(void 0),l=e=>{let{children:a}=e,[t,l]=r.useState(""),[i,c]=r.useState({prev:"",curr:""});return(0,s.jsx)(n.Provider,{value:{selectedApp:t,setSelectedApp:l,url:i,setUrl:c},children:a})},i=()=>{let e=r.useContext(n);if(!e)throw Error("useGlobalStateContext must be used within a GlobalStateProvider");return e}},41338:function(e,a,t){"use strict";var s=t(26933),r=t(46024);a.Z=()=>{let e=(0,s.useSearchParams)();return{createQueryString:r.useCallback((a,t)=>{let s=new URLSearchParams(e.toString());return""!==a&&""!==t&&s.set(a,t),s.toString()},[e]),removeQueryString:r.useCallback(a=>{let t=new URLSearchParams(e.toString());return t.delete(a),t.toString()},[e]),remainQueryString:r.useCallback(()=>new URLSearchParams(e.toString()).toString(),[e])}}},86581:function(){},46174:function(){},61982:function(){},17825:function(e,a,t){"use strict";t.d(a,{X:function(){return r},g:function(){return n}}),t(46024);var s=t(17233);t(66628);let[r,n]=(0,s.R)("Tabs component was not found in the tree")},46034:function(e,a,t){"use strict";t.d(a,{m:function(){return k}});var s=t(66628),r=t(15305),n=t(40001);t(46024);var l=t(98136),i=t(42220),c=t(7745),o=t(85698),d=t(7737),u=t(74917),m=t(39115),h=t(53175),b=t(49570),p=t(16417),x=t(17825),g=t(40145),f=t(389),v=t(24524),y=t(60596);let j="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",w={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,allowTabDeactivation:!1,unstyled:!1,inverted:!1,variant:"default",placement:"left"},C=(0,c.Z)((e,a)=>{let{radius:t,color:s,autoContrast:r}=a;return{root:{"--tabs-radius":(0,i.H5)(t),"--tabs-color":(0,o.p)(s,e),"--tabs-text-color":(0,u.o)(r,e)?(0,d.R)({color:s,theme:e,autoContrast:r}):void 0}}}),k=(0,p.d5)((e,a)=>{let t=(0,m.w)("Tabs",w,e),{defaultValue:i,value:c,onChange:o,orientation:d,children:u,loop:p,id:g,activateTabWithKeyboard:f,allowTabDeactivation:v,variant:k,color:_,radius:N,inverted:S,placement:F,keepMounted:P,classNames:A,styles:z,unstyled:T,className:Z,style:O,vars:R,autoContrast:q,mod:B,...D}=t,I=(0,r.M)(g),[E,L]=(0,n.C)({value:c,defaultValue:i,finalValue:null,onChange:o}),M=(0,h.y)({name:"Tabs",props:t,classes:y.Z,className:Z,style:O,classNames:A,styles:z,unstyled:T,vars:R,varsResolver:C});return(0,s.jsx)(x.X,{value:{placement:F,value:E,orientation:d,id:I,loop:p,activateTabWithKeyboard:f,getTabId:(0,l.A)("".concat(I,"-tab"),j),getPanelId:(0,l.A)("".concat(I,"-panel"),j),onChange:L,allowTabDeactivation:v,variant:k,color:_,radius:N,inverted:S,keepMounted:P,unstyled:T,getStyles:M},children:(0,s.jsx)(b.x,{ref:a,id:I,variant:k,mod:[{orientation:d,inverted:"horizontal"===d&&S,placement:"vertical"===d&&F},B],...M("root"),...D,children:u})})});k.classes=y.Z,k.displayName="@mantine/core/Tabs",k.Tab=v.n,k.Panel=f.A,k.List=g.d},60596:function(e,a,t){"use strict";t.d(a,{Z:function(){return s}});var s={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",panel:"m_b0c91715",tab:"m_4ec4dce6",tabSection:"m_fc420b1f","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"}},40145:function(e,a,t){"use strict";t.d(a,{d:function(){return d}});var s=t(66628);t(46024);var r=t(39115),n=t(49570),l=t(16417),i=t(17825),c=t(60596);let o={},d=(0,l.d5)((e,a)=>{let t=(0,r.w)("TabsList",o,e),{children:l,className:c,grow:d,justify:u,classNames:m,styles:h,style:b,mod:p,...x}=t,g=(0,i.g)();return(0,s.jsx)(n.x,{...x,...g.getStyles("list",{className:c,style:b,classNames:m,styles:h,props:t,variant:g.variant}),ref:a,role:"tablist",variant:g.variant,mod:[{grow:d,orientation:g.orientation,placement:"vertical"===g.orientation&&g.placement,inverted:g.inverted},p],"aria-orientation":g.orientation,__vars:{"--tabs-justify":u},children:l})});d.classes=c.Z,d.displayName="@mantine/core/TabsList"},389:function(e,a,t){"use strict";t.d(a,{A:function(){return d}});var s=t(66628);t(46024);var r=t(39115),n=t(49570),l=t(16417),i=t(17825),c=t(60596);let o={},d=(0,l.d5)((e,a)=>{let t=(0,r.w)("TabsPanel",o,e),{children:l,className:c,value:d,classNames:u,styles:m,style:h,mod:b,keepMounted:p,...x}=t,g=(0,i.g)(),f=g.value===d,v=g.keepMounted||p?l:f?l:null;return(0,s.jsx)(n.x,{...x,...g.getStyles("panel",{className:c,classNames:u,styles:m,style:[h,f?void 0:{display:"none"}],props:t}),ref:a,mod:[{orientation:g.orientation},b],role:"tabpanel",id:g.getPanelId(d),"aria-labelledby":g.getTabId(d),children:v})});d.classes=c.Z,d.displayName="@mantine/core/TabsPanel"},24524:function(e,a,t){"use strict";t.d(a,{n:function(){return b}});var s=t(66628);t(46024);var r=t(39067),n=t(85698),l=t(65660),i=t(39115),c=t(16417),o=t(31591),d=t(98004),u=t(17825),m=t(60596);let h={},b=(0,c.d5)((e,a)=>{let t=(0,i.w)("TabsTab",h,e),{className:c,children:m,rightSection:b,leftSection:p,value:x,onClick:g,onKeyDown:f,disabled:v,color:y,style:j,classNames:w,styles:C,vars:k,mod:_,...N}=t,S=(0,l.rZ)(),{dir:F}=(0,o.gm)(),P=(0,u.g)(),A=x===P.value,z={classNames:w,styles:C,props:t};return(0,s.jsxs)(d.k,{...N,...P.getStyles("tab",{className:c,style:j,variant:P.variant,...z}),disabled:v,unstyled:P.unstyled,variant:P.variant,mod:[{active:A,disabled:v,orientation:P.orientation,inverted:P.inverted,placement:"vertical"===P.orientation&&P.placement},_],ref:a,role:"tab",id:P.getTabId(x),"aria-selected":A,tabIndex:A||null===P.value?0:-1,"aria-controls":P.getPanelId(x),onClick:e=>{P.onChange(P.allowTabDeactivation&&x===P.value?null:x),null==g||g(e)},__vars:{"--tabs-color":y?(0,n.p)(y,S):void 0},onKeyDown:(0,r.R)({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:P.activateTabWithKeyboard,loop:P.loop,orientation:P.orientation||"horizontal",dir:F,onKeyDown:f}),children:[p&&(0,s.jsx)("span",{...P.getStyles("tabSection",z),"data-position":"left",children:p}),m&&(0,s.jsx)("span",{...P.getStyles("tabLabel",z),children:m}),b&&(0,s.jsx)("span",{...P.getStyles("tabSection",z),"data-position":"right",children:b})]})});b.classes=m.Z,b.displayName="@mantine/core/TabsTab"},98136:function(e,a,t){"use strict";function s(e,a){return t=>{if("string"!=typeof t||0===t.trim().length)throw Error(a);return"".concat(e,"-").concat(t)}}t.d(a,{A:function(){return s}})},57469:function(e,a,t){"use strict";t.d(a,{a:function(){return n}});var s=t(26732),r=t(91348);function n(e,a){return(0,r.r)(e,s.z,a)}}}]);