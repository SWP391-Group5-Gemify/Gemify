import{a as c}from"./chunk-J3BG4ZKK.js";import{a as n,b as a}from"./chunk-Y2G3PEDF.js";import{la as s,ra as o}from"./chunk-5JFLDQZH.js";var h=function(i){return i.Active="C\xF2n Hi\u1EC7u L\u1EF1c",i.Expired="H\u1EBFt H\u1EA1n",i}(h||{});var d=(()=>{let r=class r{constructor(t){this.httpClient=t,this.basePromotionUrl=c.baseApiUrl.concat("/promotions")}getPromotions(t){let e=new n().set("pageIndex",t.pageIndex).set("pageSize",t.pageSize);return t.searchName&&(e=e.set("search",t.searchName)),t.status&&(e=e.set("status",t.status)),this.httpClient.get(this.basePromotionUrl,{params:e})}getPromotionByCode(t){return this.httpClient.get(`${this.basePromotionUrl}/${t}`)}getPromotionById(t){let e=this.basePromotionUrl.concat("/discounts");return this.httpClient.get(`${e}/${t}`)}createPromotion(t){return this.httpClient.post(`${this.basePromotionUrl}`,t)}disablePromotion(t){return this.httpClient.delete(`${this.basePromotionUrl}/${t}`)}};r.\u0275fac=function(e){return new(e||r)(o(a))},r.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();export{h as a,d as b};