"use strict";(()=>{var e={};e.id=2007,e.ids=[2007],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},31646:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>d,patchFetch:()=>l,requestAsyncStorage:()=>u,routeModule:()=>i,serverHooks:()=>c,staticGenerationAsyncStorage:()=>h});var a={};r.r(a),r.d(a,{GET:()=>p});var o=r(42429),n=r(13227),s=r(20279);async function p(e){return new Response(JSON.stringify({message:"Test health check for port 3030 Flowcraft"}),{status:200,headers:{"Content-Type":"application/json"}})}let i=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/healthCheck/route",pathname:"/api/healthCheck",filename:"route",bundlePath:"app/api/healthCheck/route"},resolvedPagePath:"D:\\SCHINKELS\\repo\\SAFWA-BIZ-PROCESS\\src\\app\\api\\healthCheck\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:h,serverHooks:c}=i,d="/api/healthCheck/route";function l(){return(0,s.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:h})}},42429:(e,t,r)=>{e.exports=r(30517)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8290],()=>r(31646));module.exports=a})();