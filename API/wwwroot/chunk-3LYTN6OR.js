import{a as g}from"./chunk-QVLUA4QC.js";import{a as u}from"./chunk-J3BG4ZKK.js";import{b as p}from"./chunk-Y2G3PEDF.js";import{D as n,a as i,b as s,ha as a,la as c,ra as l,zb as h}from"./chunk-5JFLDQZH.js";var m=function(e){return e.StoreManager="StoreManager",e.Repurchaser="Repurchaser",e.Cashier="Cashier",e.Seller="Seller",e.StoreOwner="StoreOwner",e}(m||{});var T=(()=>{let r=class r{constructor(t){this.http=t,this.baseAccountUrl=u.baseApiUrl.concat("/account"),this.currentUser=h(null),this.TOKEN_NAME="jwt_token"}get token(){return localStorage.getItem(this.TOKEN_NAME)}set token(t){t?localStorage.setItem(this.TOKEN_NAME,t):localStorage.removeItem(this.TOKEN_NAME)}login(t){return this.http.post(`${this.baseAccountUrl}/login`,t).pipe(a(o=>{this.currentUser.set(o),this.token=o.token}))}logout(){this.token=null,this.currentUser.set(null)}getCurrentUserProfile(){return this.http.get(this.baseAccountUrl).pipe(n(t=>s(i({},t),{image_Url:g.concatLinkToTokenFirebase(t.image_Url)})))}belongToAnyRoles(t){return t.some(o=>o===this.currentUser()?.role)}registerNewUser(t){return this.http.post(`${this.baseAccountUrl}/register`,t)}};r.\u0275fac=function(o){return new(o||r)(l(p))},r.\u0275prov=c({token:r,factory:r.\u0275fac,providedIn:"root"});let e=r;return e})();export{m as a,T as b};