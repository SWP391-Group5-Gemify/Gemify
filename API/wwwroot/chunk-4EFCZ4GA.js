import{a as Se,b as Q}from"./chunk-DQDUUP7C.js";import{a as be}from"./chunk-SDQNOOQT.js";import{a as ve,b as we}from"./chunk-XZROBWBU.js";import{b as ye,d as x}from"./chunk-Q3IPZN2W.js";import{a as ge}from"./chunk-NBIFUMLF.js";import"./chunk-SJZSMRH2.js";import{c as F,d as _e}from"./chunk-S4RKVEPS.js";import{c as Ce}from"./chunk-FJL2MCY3.js";import{a as Pe}from"./chunk-64L7DANL.js";import{a as oe,b as ae,c as se,d as de,e as ce,f as pe,g as ue,h as M}from"./chunk-EMMCAKQR.js";import"./chunk-QVLUA4QC.js";import"./chunk-VDIAIRGD.js";import{a as me}from"./chunk-V5J7M4I7.js";import{c as re}from"./chunk-IMZNUD52.js";import{a as D,b as le}from"./chunk-5LB5J5WN.js";import{a as he}from"./chunk-JWFBI43Q.js";import"./chunk-BRZQVLQ6.js";import{a as fe,b as T}from"./chunk-R2WOP35W.js";import"./chunk-J3BG4ZKK.js";import"./chunk-FXF7DOH7.js";import"./chunk-JJPOC4CD.js";import"./chunk-F2JFFDTT.js";import"./chunk-IJCGWU3B.js";import"./chunk-RGNDWIHZ.js";import"./chunk-J7DIVVOQ.js";import{j as ie,n as O}from"./chunk-Y2G3PEDF.js";import{D as v,Fb as R,Ga as g,Ha as h,Hb as u,Nb as $,P as z,Pb as U,Qb as L,Rb as o,Sb as a,Tb as I,Xb as W,_b as l,_c as Z,a as A,ac as H,ad as ee,b as V,cd as te,fc as C,fd as ne,gc as P,gd as k,hc as S,jb as G,jc as c,kc as b,lc as X,ma as N,mb as d,nb as m,sc as E,tc as J,v as j,vc as K,wc as _,xa as w,xc as y,ya as q,yc as Y}from"./chunk-5JFLDQZH.js";var De=(s,e)=>({"card-product__status--available":s,"card-product__status--unavailable":e}),Ee=(()=>{let e=class e{constructor(t,n,r){this.basketService=t,this.router=n,this.notificationService=r,this.ProductStatusEnum=Se}addProductItemToBasket(){this.basketService.addProductItemToCurrentSellBasket(this.product,1),this.notificationService.show(`Th\xEAm s\u1EA3n ph\u1EA9m ${this.product.name} v\xE0o gi\u1ECF h\xE0ng th\xE0nh c\xF4ng.`)}onGoToProductDetail(){this.router.navigate([this.router.url+"/"+this.product.id])}};e.\u0275fac=function(n){return new(n||e)(m(x),m(ie),m(me))},e.\u0275cmp=w({type:e,selectors:[["app-card-product"]],inputs:{product:"product"},standalone:!0,features:[E],decls:27,vars:14,consts:[["appearance","outlined",1,"card-product"],["mat-card-image","",1,"card-product__img",3,"alt","src"],[1,"card-product__name"],[1,"card-product__content"],[1,"card-product__price"],[1,"card-product__quantity"],[1,"card-product__quantity--text"],[1,"card-product__quantity--number"],[1,"card-product__status",3,"ngClass"],[1,"card-product__actions"],[1,"btn","btn--grad","btn--with-icon",3,"click"],[1,"btn","btn--primary","btn--with-icon",3,"click"]],template:function(n,r){n&1&&(o(0,"mat-card",0),I(1,"img",1),o(2,"mat-card-header",2)(3,"mat-card-title"),c(4),a(),o(5,"mat-card-subtitle"),c(6),a()(),o(7,"mat-card-content",3)(8,"p",4),c(9),_(10,"currency"),a(),o(11,"p",5)(12,"span",6),c(13,"S\u1ED1 l\u01B0\u1EE3ng:"),a(),o(14,"span",7),c(15),a()(),o(16,"p",8),c(17),a()(),o(18,"mat-card-actions",9)(19,"button",10),l("click",function(){return r.addProductItemToBasket()}),o(20,"mat-icon"),c(21,"add"),a(),c(22,"Gi\u1ECF h\xE0ng"),a(),o(23,"button",11),l("click",function(){return r.onGoToProductDetail()}),o(24,"mat-icon"),c(25,"info"),a(),c(26,"Chi ti\u1EBFt"),a()()()),n&2&&(d(),u("alt",r.product.name)("src",r.product.imageUrl,G),d(3),b(r.product.name),d(2),b(r.product.subCategoryName),d(3),b(Y(10,8,r.product.productPrice,"VND")),d(6),b(r.product.quantity),d(),u("ngClass",K(11,De,r.product.status==r.ProductStatusEnum.Available,r.product.status==r.ProductStatusEnum.Unavailable)),d(),b(r.product.status))},dependencies:[M,oe,ce,se,pe,ue,de,ae,k,Z,ne,le,D],styles:['.card-product[_ngcontent-%COMP%]{height:54rem;display:flex;flex-direction:column;justify-content:flex-end;border-radius:10px;padding:1.2rem}.card-product__img[_ngcontent-%COMP%]{justify-self:center;align-self:center;height:23rem;max-width:80%;-o-object-fit:center;object-fit:center}.card-product__name[_ngcontent-%COMP%]{flex:1;align-self:center;text-align:center}.card-product__content[_ngcontent-%COMP%]{width:100%;font-size:1.6rem;display:grid;gap:1.2rem;padding:.8rem;grid-template-columns:1fr 1fr 1fr 1fr;grid-template-areas:"price price quantity quantity" "price price status status"}.card-product__price[_ngcontent-%COMP%]{grid-area:price;align-self:center;justify-self:center;font-size:2.4rem;font-weight:900;overflow-wrap:break-word;word-wrap:break-word;word-break:break-all}.card-product__quantity[_ngcontent-%COMP%]{grid-area:quantity;padding:.8rem;justify-self:center}.card-product__quantity--text[_ngcontent-%COMP%]{text-transform:uppercase;font-size:1.4rem}.card-product__quantity--number[_ngcontent-%COMP%]{margin-left:.8rem;font-weight:700;font-size:2.2rem}.card-product__status[_ngcontent-%COMP%]{grid-area:status;text-transform:uppercase;padding:1.2rem;font-weight:900;justify-self:stretch;text-align:center;box-shadow:0 1px 4px 2px #0000001a;border:1px solid rgba(0,0,0,.1);background-color:#f5f5f4;letter-spacing:1.05px}.card-product__status--available[_ngcontent-%COMP%]{color:#ea580c}.card-product__status--unavailable[_ngcontent-%COMP%]{color:#343638}.card-product__actions[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch;gap:1.2rem}.card-product__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{justify-self:center;flex:1}']});let s=e;return s})();var Te=["goldsDropdownRef"],Fe=["subCategoriesDropdownRef"],xe=["sortsQuantityDropdownRef"],Be=["nameSearchInputRef"],Re=()=>[5,10,25,100];function Oe(s,e){if(s&1&&(o(0,"p"),c(1),a()),s&2){let i=e.ngIf,t=H();d(),X("Gi\u1ECF h\xE0ng hi\u1EC7n t\u1EA1i ",t.getCountTotalItemsAddedInToBasketSource(i.saleItems),"")}}function Qe(s,e){s&1&&(o(0,"div")(1,"p"),c(2,"No data fits your search"),a()())}function Ae(s,e){if(s&1&&I(0,"app-card-product",19),s&2){let i=e.$implicit;u("product",i)}}var f,B=(f=class{constructor(e,i,t,n,r){this.productService=e,this.goldService=i,this.basketService=t,this.dialog=n,this.smsService=r,this.productParams={pageSize:10,pageIndex:0,searchName:void 0,goldTypeId:void 0,subCategoryId:void 0,sortQuantity:void 0,categoryId:void 0,status:void 0},this.totalProducts=0,this.sortsQuantityDropdown=[{name:"\u2193 S\u1ED1 l\u01B0\u1EE3ng: gi\u1EA3m d\u1EA7n",value:Q.QuantityDesc},{name:"\u2191 S\u1ED1 l\u01B0\u1EE3ng: t\u0103ng d\u1EA7n",value:Q.QuantityAsc}]}ngOnInit(){this.loadProducts(),this.loadSubCategoriesDropdown(),this.loadGoldsDropdown(),this.loadBasketIdAndPhoneDropdown()}onPageChange(e){this.productParams.pageIndex=e.pageIndex,this.productParams.pageSize=e.pageSize,this.loadProducts()}loadProducts(){this.products$=this.productService.getProducts(V(A({},this.productParams),{pageIndex:this.productParams.pageIndex+1})).pipe(v(e=>(this.productParams.pageIndex=e.pageIndex-1,this.productParams.pageSize=e.pageSize,this.totalProducts=e.count,e.data)),z(e=>{throw console.error("Error loading products",e),e}))}loadSubCategoriesDropdown(){this.productService.getSubCategories().pipe(T(this),v(e=>e.map(i=>({value:i.id,name:i.name})))).subscribe({next:e=>{this.subCategoriesDropdown=e},error(e){console.error(e)}})}loadGoldsDropdown(){this.goldService.getAllGolds().pipe(T(this)).subscribe({next:e=>{this.goldsDropdown=e.data.map(i=>({value:i.id,name:i.name}))},error(e){console.error(e)}})}onSelectChangeGoldIdFromParent(e){this.productParams.goldTypeId=e?.value,this.onResetPaginatorToFirstPage(),this.loadProducts()}onSelectChangeSubCategoryIdFromParent(e){this.productParams.subCategoryId=e?.value,this.onResetPaginatorToFirstPage(),this.loadProducts()}onSelectChangeSortQuantityFromParent(e){this.productParams.sortQuantity=e?.value,this.onResetPaginatorToFirstPage(),this.loadProducts()}onValueChangesNameFromParent(e){this.productParams.searchName=e,this.onResetPaginatorToFirstPage(),this.loadProducts()}onResetFilters(){this.subCategoriesDropdownRef.onClearSelection(),this.goldsDropdownRef.onClearSelection(),this.sortsQuantityDropdownRef.onClearSelection(),this.nameSearchInputRef.onClearInputFilter(),this.productParams.goldTypeId=void 0,this.productParams.subCategoryId=void 0,this.productParams.sortQuantity=void 0,this.loadProducts()}onResetPaginatorToFirstPage(){this.productParams.pageIndex=0,this.paginator&&this.paginator.firstPage()}loadBasketIdAndPhoneDropdown(){this.basketIdAndPhoneDropdown$=this.basketService.getBaskets().pipe(v(e=>e.map(i=>({value:i.id,name:this.basketService.generateTempTicketId(i)}))))}onSelectChangeBasketIdAndPhoneFromParent(e){let i=e?.value;i&&this.basketService.loadBasketById(i)}getCountTotalItemsAddedInToBasketSource(e){return e.reduce((i,t)=>i+t.quantity,0)}onOpenModalAndCreateBasketWithCustomerPhone(){this.dialog.open(ve,{width:"30rem",height:"30rem",disableClose:!0}).beforeClosed().pipe(T(this)).subscribe(i=>{if(i){var t=this.basketService.createEmptyBasketWithPhoneNumber(i.phoneNumber,ye.SELL);this.loadBasketIdAndPhoneDropdown();var n=this.basketService.generateTempTicketId(t),r={phoneNumber:i.phoneNumber,basketCode:n};this.smsService.sendSms(r).subscribe()}})}},f.\u0275fac=function(i){return new(i||f)(m(be),m(ge),m(x),m(Ce),m(we))},f.\u0275cmp=w({type:f,selectors:[["app-products"]],viewQuery:function(i,t){if(i&1&&(C(Te,5),C(Fe,5),C(xe,5),C(Be,5),C(F,5)),i&2){let n;P(n=S())&&(t.goldsDropdownRef=n.first),P(n=S())&&(t.subCategoriesDropdownRef=n.first),P(n=S())&&(t.sortsQuantityDropdownRef=n.first),P(n=S())&&(t.nameSearchInputRef=n.first),P(n=S())&&(t.paginator=n.first)}},standalone:!0,features:[E],decls:32,vars:18,consts:[["subCategoriesDropdownRef",""],["goldsDropdownRef",""],["sortsQuantityDropdownRef",""],["nameSearchInputRef",""],["chooseExistingBasket",""],[1,"filter-controls","u-margin-bottom-small","mat-elevation-z2"],[1,"filter-controls__dropdowns"],["label","Ch\u1ECDn lo\u1EA1i trang s\u1EE9c",3,"onSelectionChange","options"],["label","Ch\u1ECDn lo\u1EA1i v\xE0ng",3,"onSelectionChange","options"],["label","S\u1EAFp x\u1EBFp s\u1ED1 l\u01B0\u1EE3ng",3,"onSelectionChange","options"],[1,"filter-controls__filter-and-reset"],["label","T\xECm ki\u1EBFm theo t\xEAn",3,"onValueChanges"],[1,"btn","btn--primary-dark","btn--with-icon",3,"click"],[1,"add-basket"],[1,"btn","btn--grad","btn--with-icon",3,"click"],["label","Ch\u1ECDn gi\u1ECF h\xE0ng",3,"onSelectionChange","options"],[4,"ngIf"],["aria-label","Select page",2,"background-color","#FAFAFA",3,"page","length","pageSize","pageSizeOptions"],[1,"grid","grid--responsive","u-margin-top-small"],[3,"product"]],template:function(i,t){if(i&1){let n=W();o(0,"section",5)(1,"div",6)(2,"app-generic-dropdown",7,0),l("onSelectionChange",function(p){return g(n),h(t.onSelectChangeSubCategoryIdFromParent(p))}),a(),o(4,"app-generic-dropdown",8,1),l("onSelectionChange",function(p){return g(n),h(t.onSelectChangeGoldIdFromParent(p))}),a(),o(6,"app-generic-dropdown",9,2),l("onSelectionChange",function(p){return g(n),h(t.onSelectChangeSortQuantityFromParent(p))}),a()(),o(8,"div",10)(9,"app-generic-search",11,3),l("onValueChanges",function(p){return g(n),h(t.onValueChangesNameFromParent(p))}),a(),o(11,"button",12),l("click",function(){return g(n),h(t.onResetFilters())}),o(12,"mat-icon"),c(13,"filter_alt_off"),a(),c(14,"X\xF3a b\u1ED9 l\u1ECDc"),a()()(),o(15,"section",13)(16,"button",14),l("click",function(){return g(n),h(t.onOpenModalAndCreateBasketWithCustomerPhone())}),o(17,"mat-icon"),c(18,"shopping_basket"),a(),c(19,"T\u1EA1o gi\u1ECF h\xE0ng m\u1EDBi "),a(),o(20,"app-generic-dropdown",15,4),_(22,"async"),l("onSelectionChange",function(p){return g(n),h(t.onSelectChangeBasketIdAndPhoneFromParent(p))}),a(),R(23,Oe,2,1,"p",16),_(24,"async"),a(),o(25,"mat-paginator",17),l("page",function(p){return g(n),h(t.onPageChange(p))}),a(),o(26,"section",18),R(27,Qe,3,0,"div",16),_(28,"async"),U(29,Ae,1,1,"app-card-product",19,$),_(31,"async"),a()}i&2&&(d(2),u("options",t.subCategoriesDropdown),d(2),u("options",t.goldsDropdown),d(2),u("options",t.sortsQuantityDropdown),d(14),u("options",y(22,9,t.basketIdAndPhoneDropdown$)),d(3),u("ngIf",y(24,11,t.basketService.basketSource$)),d(2),u("length",t.totalProducts)("pageSize",t.productParams.pageSize)("pageSizeOptions",J(17,Re)),d(2),u("ngIf",y(28,13,t.products$)===null),d(2),L(y(31,15,t.products$)))},dependencies:[k,ee,te,M,re,_e,F,D,Ee,he,Pe],styles:["img[_ngcontent-%COMP%]{width:100%;height:20rem;object-fit:cover}.add-basket[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:2.4rem;align-items:center}.add-basket[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.8rem}.add-basket[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-self:flex-start}"]}),f);B=j([fe()],B);var Ve=[{path:"",component:B},{path:":id",loadChildren:()=>import("./chunk-N3MKURJO.js").then(s=>s.ProductDetailsRoutingModule)}],_t=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=q({type:e}),e.\u0275inj=N({imports:[O.forChild(Ve),O]});let s=e;return s})();export{_t as ProductsRoutingModule};
