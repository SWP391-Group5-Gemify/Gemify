import{a as T,b,c as k,d as E}from"./chunk-LYZZNHZC.js";import{b as F,c as Q,d as B}from"./chunk-T5JIUVYW.js";import"./chunk-I4Q263QN.js";import{c as I}from"./chunk-IMZNUD52.js";import{a as R,b as x}from"./chunk-5LB5J5WN.js";import"./chunk-IJCGWU3B.js";import"./chunk-RGNDWIHZ.js";import"./chunk-J7DIVVOQ.js";import{i as S,k as L,l as _,n as d}from"./chunk-Y2G3PEDF.js";import{Hb as h,Nb as f,Pb as g,Qb as v,Rb as n,Sb as i,Tb as M,gd as y,jc as m,kc as s,ma as p,mb as r,sc as C,xa as u,ya as l}from"./chunk-5JFLDQZH.js";function N(t,e){if(t&1&&(n(0,"a",2)(1,"div",4)(2,"mat-icon"),m(3),i(),n(4,"span"),m(5),i()()()),t&2){let a=e.$implicit;h("routerLink",a.route),r(3),s(a.icon),r(2),s(a.name)}}var D=(()=>{let e=class e{constructor(){this.navItems=[{name:"B\u1EA3ng Th\u1ED1ng K\xEA",icon:"home",route:"/store-manager/statistic-dashboard"},{name:"Qu\u1EA3n L\xFD Qu\u1EA7y H\xE0ng",icon:"attach_money",route:"/store-manager/counters"},{name:"Qu\u1EA3n L\xFD Kh\xE1ch H\xE0ng",icon:"family_restroom",route:"/store-manager/customers"},{name:"\u01AFu \u0110\xE3i",icon:"card_giftcard",route:"/store-manager/promotions"},{name:"Qu\u1EA3n L\xFD Trang S\u1EE9c",icon:"shopping_bag",route:"/store-manager/products-management"},{name:"\u0110\u01A1n H\xE0ng",icon:"receipt",route:"/store-manager/orders"},{name:"Ch\xEDnh S\xE1ch & \u0110i\u1EC1u Kho\u1EA3n",icon:"verified_user",route:"/store-manager/policy"}]}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=u({type:e,selectors:[["app-store-manager"]],standalone:!0,features:[C],decls:7,vars:0,consts:[["autosize","",1,"sidenav-content"],["opened","true","mode","side"],["mat-list-item","","routerLinkActive","sidenav-content__item--active",1,"sidenav-content__item",3,"routerLink"],[1,"sidenav-content__content"],[1,"sidenav-content__item-text"]],template:function(o,H){o&1&&(n(0,"mat-sidenav-container",0)(1,"mat-sidenav",1)(2,"mat-nav-list"),g(3,N,6,3,"a",2,f),i()(),n(5,"mat-sidenav-content",3),M(6,"router-outlet"),i()()),o&2&&(r(3),v(H.navItems))},dependencies:[I,x,R,E,b,k,T,B,Q,F,y,L,S,_]});let t=e;return t})();var P=[{path:"",component:D,children:[{path:"",redirectTo:"statistic-dashboard",pathMatch:"full"},{path:"statistic-dashboard",loadChildren:()=>import("./chunk-YGAVVAT3.js").then(t=>t.StatisticDashboardRoutingModule)},{path:"counters",loadChildren:()=>import("./chunk-RBK4KCB4.js").then(t=>t.CountersRoutingModule)},{path:"customers",loadChildren:()=>import("./chunk-WPJQN5P6.js").then(t=>t.CustomersRoutingModule)},{path:"promotions",loadChildren:()=>import("./chunk-MPDOM735.js").then(t=>t.PromotionsRoutingModule)},{path:"products-management",loadChildren:()=>import("./chunk-C4Z727JE.js").then(t=>t.ProductsManagementRoutingModule)},{path:"orders",loadChildren:()=>import("./chunk-5AVXJBQS.js").then(t=>t.OrdersRoutingModule)},{path:"policy",loadChildren:()=>import("./chunk-GLBJ5LZI.js").then(t=>t.PolicyRoutingModule)},{path:"**",redirectTo:"statistic-dashboard",pathMatch:"full"}]}],X=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=l({type:e}),e.\u0275inj=p({imports:[d.forChild(P),d]});let t=e;return t})();export{X as StoreManagerRoutingModule};
