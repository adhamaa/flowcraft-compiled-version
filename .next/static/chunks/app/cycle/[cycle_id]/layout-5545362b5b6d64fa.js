(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5662],{3868:function(e,a,t){Promise.resolve().then(t.bind(t,30423))},30423:function(e,a,t){"use strict";t.d(a,{default:function(){return $}});var n=t(66628),c=t(26933),d=t(46024),r=t(80184),l=t(43182),u=t(46034),s=t(40145),i=t(24524),o=t(389),b=t(51828),f=t(46738),v=t(51747),h=t(12706),m=t(62159),g=t(8793),p=e=>{let{isRestructure:a,isCollapse:t,isSideMenuCollapse:c,onClick:d,disabled:r}=e;return(0,n.jsx)("div",{className:"flex items-end justify-end mt-auto py-2 border-t",children:(0,n.jsxs)(m.z,{disabled:r,variant:"transparent",color:"var(--fc-brand-700)",fz:16,...a&&{leftSection:(0,n.jsx)(g.JO,{className:"rounded",icon:"heroicons-solid:rectangle-group",width:"1.75rem"})},onClick:d,bg:"transparent",children:[a&&"Restructure",t&&(0,n.jsx)(g.JO,{icon:"tabler:chevron-down",width:"3rem",rotate:c?15:45,className:"text-[var(--fc-brand-700)]"})]})})},x=t(58635),y=t(41338),_=t(89815),$=function(){let[e,{toggle:a}]=(0,l.q)(!1),[t,g]=d.useState(),[$,j]=d.useState(),[S,C]=d.useState(),[w,k]=d.useState(),{createQueryString:N,remainQueryString:P}=(0,y.Z)(),L=(0,c.useSearchParams)(),A=(0,c.useParams)(),R=(0,c.useRouter)(),V=(0,c.usePathname)(),z=V.includes("/stage/deleted/"),O=L.get("selected_app"),q=L.get("data_source"),E=A.cycle_id,F=A.stage_uuid,U="inactive"===w||"deleted"===w,Z=V.includes("/stage/deleted/")?"deleted_stage":V.includes("/stage/")?"stages":V.includes("/cycle/")?"general":"";d.useEffect(()=>{async function e(){let e=await (0,r._y)({cycle_id:E,apps_label:O,datasource_type:q});g(await (0,r.bp)({cycle_id:E,apps_label:O,datasource_type:q})),j(e)}E&&O&&q&&e()},[E,q,O]),d.useEffect(()=>{async function e(){let e=await (0,r.M3)({apps_label:O,cycle_id:E,datasource_type:q});k(e.cycle_status),C(e.cycle_uuid)}E&&O&&q&&e()},[E,q,O]);let G=z?$:t,J=[{name:"Cycle",value:"cycle",disabled:!1,onChange:async e=>{var a,n;"general"===e?R.push("/cycle/".concat(E,"/")+"?"+P()):"stages"===e?R.push("/cycle/".concat(E,"/stage/").concat(null==t?void 0:null===(a=t[0])||void 0===a?void 0:a.stage_uuid,"/")+"?"+P()):"deleted_stage"===e&&R.push("/cycle/".concat(E,"/stage/deleted/").concat(null==$?void 0:null===(n=$[0])||void 0===n?void 0:n.stage_uuid,"/")+"?"+P())},children:{defaultValue:Z,data:[{name:"General Information",value:"general",disabled:!1},{name:"Stages",value:"stages",disabled:!1,onChange:async e=>{R.push("/cycle/".concat(E,"/stage/").concat(e,"/")+"?"+P())},children:{defaultValue:F,data:null==t?void 0:t.map(e=>({name:e.stage_name,value:e.stage_uuid,disabled:!1}))}},{name:"Deleted Stage",value:"deleted_stage",disabled:!1,onChange:async e=>{R.push("/cycle/".concat(E,"/stage/deleted/").concat(e,"/")+"?"+P())},children:{defaultValue:F,data:null==$?void 0:$.map(e=>({name:e.stage_name,value:e.stage_uuid,disabled:!1}))}}]}}];return(0,n.jsx)("aside",{children:(0,n.jsxs)(u.m,{value:J[0].value,component:"div",orientation:"vertical",classNames:{root:"h-full",tab:"!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold",tabLabel:"~text-md/lg",list:"flex-nowrap"},children:[(0,n.jsxs)(s.d,{children:[(0,n.jsx)(n.Fragment,{}),J.map(e=>(0,n.jsx)(i.n,{value:e.value,disabled:e.disabled,className:"",children:e.name},e.value)),(0,n.jsx)(p,{isSideMenuCollapse:e,isCollapse:!0,onClick:a})]}),J.map(a=>(0,n.jsx)(o.A,{value:a.value,children:(0,n.jsxs)(u.m,{value:a.children.defaultValue,orientation:"vertical",classNames:{root:(0,x.Z)("h-full"),tab:"!border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold",tabLabel:"~text-md/lg",list:"flex-nowrap"},onChange:a.onChange,children:[!e&&(0,n.jsxs)(s.d,{children:[(0,n.jsx)(n.Fragment,{}),a.children.data.map(e=>(0,n.jsx)(i.n,{value:e.value,disabled:e.disabled,children:e.name},e.value))]}),a.children.data.map(a=>{var t,c;return(0,n.jsx)(o.A,{value:a.value,children:a.children&&(0,n.jsxs)(u.m,{value:null===(t=a.children)||void 0===t?void 0:t.defaultValue,orientation:"vertical",classNames:{root:"h-full",tab:"w-40 !border-r-0 !border-l-4 !rounded-none data-[active=true]:!border-[var(--fc-brand-700)] ml-4 my-4 !pl-1 hover:bg-transparent data-[active=true]:font-semibold",tabLabel:"~text-md/lg",list:"!flex-nowrap"},onChange:a.onChange,children:[(null==G?void 0:G.length)===0&&(0,n.jsx)("div",{className:"flex justify-start items-start p-7 h-full w-max italic",children:"No stages found"}),!e&&!!(null==G?void 0:G.length)&&(0,n.jsxs)(s.d,{children:[(0,n.jsx)(n.Fragment,{}),(0,n.jsx)(b.ScrollAreaAutosize,{children:null===(c=a.children.data)||void 0===c?void 0:c.map((e,a)=>(0,n.jsx)(f.u,{label:e.name,position:"right",children:(0,n.jsx)(i.n,{value:e.value,disabled:e.disabled,classNames:{tabLabel:"truncate"},children:e.name},e.value)},a))}),(0,n.jsx)(p,{isSideMenuCollapse:e,isRestructure:!0,onClick:()=>{U?(0,r.GL)({cycle_id:E,status_code:"2"}).then(()=>{R.push("/cycle/restructure/".concat(S,"?")+N("cycle_id",E))}):_.qk.open({title:"Restructure Cycle",children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(v.x,{size:"sm",children:["The restructuring process is only possible during an ",(0,n.jsx)("strong",{children:"inactive"})," status cycle."]}),(0,n.jsx)(h.Flex,{gap:16,justify:"end",mt:"md",children:(0,n.jsx)(m.z,{onClick:()=>_.qk.closeAll(),color:"var(--fc-brand-700)",radius:"md",children:"Close"})})]}),overlayProps:{backgroundOpacity:.55,blur:10},radius:"md"})}})]})]})},a.value)})]})},a.value))]})})}},41338:function(e,a,t){"use strict";var n=t(26933),c=t(46024);a.Z=()=>{let e=(0,n.useSearchParams)();return{createQueryString:c.useCallback((a,t)=>{let n=new URLSearchParams(e.toString());return""!==a&&""!==t&&n.set(a,t),n.toString()},[e]),removeQueryString:c.useCallback(a=>{let t=new URLSearchParams(e.toString());return t.delete(a),t.toString()},[e]),remainQueryString:c.useCallback(()=>new URLSearchParams(e.toString()).toString(),[e])}}},80184:function(e,a,t){"use strict";t.d(a,{A6:function(){return P},AY:function(){return d},B7:function(){return b},BI:function(){return x},Cp:function(){return y},GL:function(){return v},GX:function(){return w},JZ:function(){return u},Jx:function(){return z},M3:function(){return l},M_:function(){return L},PA:function(){return $},U1:function(){return f},Vh:function(){return S},Vp:function(){return C},X8:function(){return O},Xc:function(){return g},Xi:function(){return c},ZU:function(){return R},_y:function(){return i},bp:function(){return s},d5:function(){return k},ek:function(){return A},in:function(){return m},mY:function(){return r},ow:function(){return V},q2:function(){return _},w9:function(){return o},xO:function(){return N},xn:function(){return h},xq:function(){return j},zm:function(){return p}}),t(63804);var n=t(44233),c=(0,n.$)("07fd71094c296382131ae74ad2984e00ce014dd9"),d=(0,n.$)("272b96a42ca94b0191405494003aadd08bad2365"),r=(0,n.$)("080ae4ee1f297589b0b9f25700ffb47f48782773"),l=(0,n.$)("9186f8e8ceec5e51c05d4ac327faebfe4ccf1129");(0,n.$)("427b730a1474e16aa451e977ddc02a8478a6b3f9");var u=(0,n.$)("61744b7b22be68545c3fd130ca85876d778429bc"),s=(0,n.$)("e87ef483b03d2ea9c078ed8a0ba274d92e78c23c"),i=(0,n.$)("cff6238c54e9f361e591c1e66a5135903bbfe4dd"),o=(0,n.$)("d6ca4ac908d414c7211ff320e7b16220034e3c7d"),b=(0,n.$)("b757b35b35a4386a4b9092be080773453389b5cb"),f=(0,n.$)("eba7413b57e02171d30406fe4947a0f7eb2703d6"),v=(0,n.$)("1428ed7ab66a956a38055adf6a8df43170874fc6"),h=(0,n.$)("0c5fd6b8e75d1a94b0bf92d7f9ad7844e74cf977"),m=(0,n.$)("77933a84b28cf622b2dba02d40a09f313e30651e"),g=(0,n.$)("d7c528da49173659187a5fb5cec24f22cab9072a"),p=(0,n.$)("6beb8ddf854fa69c122b86a91c0265c64c43cc33"),x=(0,n.$)("c78a5d8e11445e9dac53429f6e05b8081b8ebd4a"),y=(0,n.$)("962ce742d5cb17f22d59012020621ac1bcf8952e"),_=(0,n.$)("709fa232a4839ca0bb20ccfc5b6d90e1f0040dbe"),$=(0,n.$)("ee9cb352c81cb3c8bbdec486b3f10b4e42c86098"),j=(0,n.$)("a9ce1efcd83a14cd21a0aed41b576f46ccd29e5d"),S=(0,n.$)("b8605e39846778e97f8d7b4a921473b43af6fa0a"),C=(0,n.$)("16fca09bfdb8f96d2e5db151935a834b59321e93"),w=(0,n.$)("0d7f0367dd3a12bb447e43aba28788d912a59c5a"),k=(0,n.$)("8217098c211656db7c520ab598f5428a2ed3dc7c"),N=(0,n.$)("cf93e1eef89c4a1f4152c54b96c183350fe4549a"),P=(0,n.$)("ce28763aee675e78b47316181eaf8241762aead9");(0,n.$)("123f4f142bcba1cfe87c3b814eeb78f8c2db0b1e"),(0,n.$)("261680d6fd1955cfb9d7c1180581aa708211695d");var L=(0,n.$)("698785d5b061b1ea5d2ca4cc0e5833f8bdfeb022"),A=(0,n.$)("9c7de0d66f94886f4cbd73da7ea0cfd7dece9a2b"),R=(0,n.$)("6c5a5dccba5b23ec6f3bce22d68e8464e8e5eb54"),V=(0,n.$)("552bbbe68d63eebb15cbfe2fa618ad3358cdb19b"),z=(0,n.$)("696bd584de94b84a6dc6458ad598b7d451d9a707"),O=(0,n.$)("7881f0128f8964dffab5baf936228e68cff1d349")}},function(e){e.O(0,[3610,9220,2159,1251,8437,1828,6738,3777,6218,6862,1744],function(){return e(e.s=3868)}),_N_E=e.O()}]);