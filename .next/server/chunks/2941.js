exports.id=2941,exports.ids=[2941],exports.modules={24243:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=24243,e.exports=t},93301:(e,t,s)=>{"use strict";s.d(t,{I8:()=>j,handlers:()=>C});var n=s(92493);let r=["/"],a=[...process.env.WITH_AUTH?["/cycle"]:[],"/profile","/documentation","/maintenance","/manage-cycle","/manage-account"],o=["/auth/signin","/auth/signup"];var i=s(43350),c=s(5113),l=s(60027),u=s(37061),d=s(64020),h=s(89693);let p=d.createPool({host:process.env.DRIZZLE_DATABASE_HOST,user:process.env.DRIZZLE_DATABASE_USER,password:process.env.DRIZZLE_DATABASE_PASSWORD,database:process.env.DRIZZLE_DATABASE_NAME}),m=(0,u.tS)(p,{logger:!0});var w=s(29148),f=s(75513),_=s(79184),g=s(78870),k=s(32692);let y=(0,w.iq)("tbl_fc_user",{id:(0,f.L7)("id",{length:255}).primaryKey().$defaultFn(()=>crypto.randomUUID()),name:(0,f.L7)("name",{length:255}),password:(0,f.L7)("password",{length:255}),email:(0,f.L7)("email",{length:255}).notNull(),emailVerified:(0,_.AB)("emailVerified",{mode:"date",fsp:3}),image:(0,f.L7)("image",{length:255})}),U=(0,w.iq)("tbl_fc_account",{userId:(0,f.L7)("userId",{length:255}).notNull().references(()=>y.id,{onDelete:"cascade"}),type:(0,f.L7)("type",{length:255}).$type().notNull(),provider:(0,f.L7)("provider",{length:255}).notNull(),providerAccountId:(0,f.L7)("providerAccountId",{length:255}).notNull(),refresh_token:(0,f.L7)("refresh_token",{length:255}),access_token:(0,f.L7)("access_token",{length:255}),expires_at:(0,g.e$)("expires_at"),token_type:(0,f.L7)("token_type",{length:255}),scope:(0,f.L7)("scope",{length:255}),id_token:(0,f.L7)("id_token",{length:2048}),session_state:(0,f.L7)("session_state",{length:255}),login_count:(0,g.e$)("login_count")},e=>({compoundKey:(0,k.CK)({columns:[e.provider,e.providerAccountId]})})),I=(0,w.iq)("tbl_fc_session",{sessionToken:(0,f.L7)("sessionToken",{length:255}).primaryKey(),userId:(0,f.L7)("userId",{length:255}).notNull().references(()=>y.id,{onDelete:"cascade"}),expires:(0,_.AB)("expires",{mode:"date"}).notNull()}),A=(0,w.iq)("tbl_fc_verificationToken",{identifier:(0,f.L7)("identifier",{length:255}).notNull(),token:(0,f.L7)("token",{length:255}).notNull(),expires:(0,_.AB)("expires",{mode:"date"}).notNull()},e=>({compoundKey:(0,k.CK)({columns:[e.identifier,e.token]})})),P=function(){let e=(0,l.J)(m);return e.createUser=async e=>{let t=crypto.randomUUID();return await m.insert(y).values({...e,id:t}),await m.select().from(y).where((0,h.eq)(y.id,t)).then(e=>e[0])},e.getUser=async e=>await m.select().from(y).where((0,h.eq)(y.id,e)).then(e=>e[0])??null,e.getUserByEmail=async e=>await m.select().from(y).where((0,h.eq)(y.email,e)).then(e=>e[0])??null,e.createSession=async e=>(await m.insert(I).values(e),await m.select().from(I).where((0,h.eq)(I.sessionToken,e.sessionToken)).then(e=>e[0])),e.getSessionAndUser=async e=>await m.select({session:I,user:y}).from(I).where((0,h.eq)(I.sessionToken,e)).innerJoin(y,(0,h.eq)(y.id,I.userId)).then(e=>e[0])??null,e.updateUser=async e=>{if(!e.id)throw Error("No user id.");return await m.update(y).set(e).where((0,h.eq)(y.id,e.id)),await m.select().from(y).where((0,h.eq)(y.id,e.id)).then(e=>e[0])},e.updateSession=async e=>(await m.update(I).set(e).where((0,h.eq)(I.sessionToken,e.sessionToken)),await m.select().from(I).where((0,h.eq)(I.sessionToken,e.sessionToken)).then(e=>e[0])),e.updateAccountLoginCount=async e=>{let t=await m.select().from(U).where((0,h.eq)(U.userId,e)).then(e=>e[0]??null);return t?(await m.update(U).set({login_count:t.login_count+1}).where((0,h.eq)(U.userId,e)),await m.select().from(U).where((0,h.eq)(U.userId,e)).then(e=>e[0])):null},e.linkAccount=async e=>{await m.insert(U).values(e)},e.getUserByAccount=async e=>{let t=await m.select().from(U).where((0,h.xD)((0,h.eq)(U.providerAccountId,e.providerAccountId),(0,h.eq)(U.provider,e.provider))).leftJoin(y,(0,h.eq)(U.userId,y.id)).then(e=>e[0])??null;return t?{...t.tbl_fc_user,login_count:t.tbl_fc_account.login_count}:null},e.deleteSession=async e=>{let t=await m.select().from(I).where((0,h.eq)(I.sessionToken,e)).then(e=>e[0])??null;return await m.delete(I).where((0,h.eq)(I.sessionToken,e)),t},e.createVerificationToken=async e=>(await m.insert(A).values(e),await m.select().from(A).where((0,h.eq)(A.identifier,e.identifier)).then(e=>e[0])),e.useVerificationToken=async e=>{try{let t=await m.select().from(A).where((0,h.xD)((0,h.eq)(A.identifier,e.identifier),(0,h.eq)(A.token,e.token))).then(e=>e[0])??null;return await m.delete(A).where((0,h.xD)((0,h.eq)(A.identifier,e.identifier),(0,h.eq)(A.token,e.token))),t}catch(e){throw Error("No verification token found.")}},e.deleteUser=async e=>{let t=await m.select().from(y).where((0,h.eq)(y.id,e)).then(e=>e[0]??null);return await m.delete(y).where((0,h.eq)(y.id,e)),t},e.unlinkAccount=async e=>{await m.delete(U).where((0,h.xD)((0,h.eq)(U.providerAccountId,e.providerAccountId),(0,h.eq)(U.provider,e.provider)))},{...e}}();var v=s(8944);let L=v.z.object({email:v.z.string().email("Email is invalid").default(""),password:v.z.string().min(6,"Password must be at least 6 characters").default("")});v.z.object({username:v.z.string().min(2,"Name is required").default(""),email:v.z.string().email("Email is invalid").default(""),password:v.z.string().min(6,"Password must be at least 6 characters").default(""),confirmPassword:v.z.string().min(6,"Passwords must match").default("")}).refine(e=>e.password===e.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]});var E=s(96330),T=s(6113),S=s(77586);class N extends n.UC{constructor(e){super(),this.code=e,this.message=e}}let q=async({email:e})=>{let t=new URL("/businessProcess/user",process.env.NEXT_PUBLIC_API_URL);t.searchParams.set("email",e);let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME+":pass2468").toString("base64")}`},cache:"no-cache"});if(404===s.status)return[];if(!s.ok)throw Error("Failed to get user details.");let[n]=(await s.json()).data;return n},b=async({email:e})=>{let t=new URL("/businessProcess/getProfilePicture",process.env.NEXT_PUBLIC_API_URL);t.searchParams.set("email",e);let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME+":pass2468").toString("base64")}`},cache:"no-cache"});if(404===s.status)return[];if(!s.ok)throw Error("Failed to get profile picture.");return(await s.json()).url},R=async({action:e,notes:t,object:s,process_state:n,sysapp:r,sysfunc:a,userid:o,json_object:i,location_url:c})=>{let l=new URL("/auditrail/businessProcess/",process.env.NEXT_PUBLIC_API_URL);l.searchParams.set("action",e),l.searchParams.set("notes",t),l.searchParams.set("object",s),l.searchParams.set("process_state",n),l.searchParams.set("sysapp",r),l.searchParams.set("sysfunc",a),l.searchParams.set("userid",o),l.searchParams.set("json_object",JSON.stringify(i)),l.searchParams.set("location_url",encodeURIComponent(process.env.AUTH_URL+c));let u=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME+":"+(0,S.I)(process.env.NEXT_PUBLIC_API_PASSWORD)).toString("base64")}`},cache:"no-cache"});return 404===u.status?[]:await u.json()},B="/api/auth",D={providers:[(0,c.Z)({credentials:{identifier:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){try{let{email:t,password:s}=await L.parseAsync(e),n=await P.getUserByEmail?.(t);if(!n)throw new N("User account does not exist");let r=(0,S.I)(n.password,process.env.FERNET_KEY);if(s!==r)throw new N("Password is not correct");return n}catch(e){if(e instanceof E.k)throw new N("System error. Please contact support");if(e instanceof v.jm)throw new N(e.errors[0].message);throw e}}})],debug:!1,pages:{signIn:"/auth/signin",error:"/"},callbacks:{async jwt(e){if("update"===e.trigger){let t=await b({email:e.token.email}),s=await q({email:e.token.email});return e.token={...e.token,image:t,name:s.name},e.token}if(e.account){let t=await b({email:e.token.email}),s=await q({email:e.token.email}),n=await P.getUserByAccount(e.account),r=n?.login_count;if("credentials"===e.account.provider){let n=new Date(Date.now()+2592e6),a=(0,T.randomUUID)(),o=await P.createSession({userId:e.user.id,sessionToken:a,expires:n});e.token.session_token=o.sessionToken,e.token.user_id=e.user.id,e.token.login_count=r,e.token.image=t,e.token.name=s.name}}return e.token},session:async e=>(e.session.user&&(e.session.user.session_token=e.token.session_token,e.session.user.user_id=e.token.user_id,e.session.user.login_count=e.token.login_count,e.session.user.image=e.token.image,e.session.user.name=e.token.name),e.session),async redirect({url:e,baseUrl:t}){if(e.startsWith("/"))return`${t}${e}`;let s=new URL(e).origin===t,n=e.includes("callbackUrl=");return s&&n?decodeURIComponent(e.split("callbackUrl=")[1]):s?e:t},authorized({auth:e,request:t}){let{nextUrl:s}=t,n=!!e?.user;s.pathname.startsWith("/api/auth");let c=r.includes(s.pathname);o.includes(s.pathname);let l=a.some(e=>s.pathname.startsWith(e));if(c)return i.NextResponse.redirect(new URL("/cycle",t.url));if(l&&!n){let e=new URL(`${B}/signin`,s.origin);return e.searchParams.append("callbackUrl",s.href),Response.redirect(e)}return!0}},events:{signIn:async e=>{await R({action:"login",location_url:"/auth/signin",object:"src/auth/index.ts",process_state:"LOGIN",sysfunc:'"signIn" func ',userid:e.user.id,sysapp:"FLOWCRAFTBUSINESSPROCESS",notes:"User logged in",json_object:{...e.user,...e.account}})},signOut:async e=>{await R({action:"logout",location_url:"/auth/signout",object:"src/auth/index.ts",process_state:"LOGOUT",sysfunc:'"signOut" func ',userid:e.token.user_id,sysapp:"FLOWCRAFTBUSINESSPROCESS",notes:"User logged out",json_object:{...e.token}}),"token"in e&&e.token?.session_token&&(await P.deleteSession?.(e.token.session_token),await P.updateAccountLoginCount?.(e.token.user_id))}},trustHost:!0,session:{strategy:"jwt"},basePath:B},{handlers:C,auth:j,signOut:x,signIn:O}=(0,n.ZP)({adapter:P,...D})},77586:(e,t,s)=>{"use strict";s.d(t,{I:()=>r});var n=s(41511);let r=(e,t)=>(t=t||process.env.FERNET_KEY,n.p.decrypt(e,t))}};