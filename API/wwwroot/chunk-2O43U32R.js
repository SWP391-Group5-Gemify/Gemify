import{a as W}from"./chunk-NBIFUMLF.js";import{a as k,b as H,c as V,e as N,f as I,h as $,i as R,j as A,k as F,l as j,n as L}from"./chunk-PT53JIWA.js";import"./chunk-J3BG4ZKK.js";import"./chunk-J7DIVVOQ.js";import{n as x}from"./chunk-Y2G3PEDF.js";import{Aa as y,D as M,Fb as s,Hb as _,L as D,Rb as i,Sb as a,Tb as C,Ub as p,Vb as g,cd as T,da as P,dd as G,fd as z,gd as B,jc as l,kc as b,lc as f,ma as E,mb as r,nb as O,sc as S,wc as c,xa as w,xc as h,ya as v,yc as u}from"./chunk-5JFLDQZH.js";var X=(()=>{let t=class t{constructor(){this.monthNumbers=["1","2","3","4","5","6","7","8","9","10","11","12"]}transform(n){if(!n)return"";let o=new Date(n),d=o.getDate(),q=o.getMonth(),J=o.getFullYear();return`ng\xE0y ${d} th\xE1ng ${this.monthNumbers[q]} n\u0103m ${J}`}};t.\u0275fac=function(o){return new(o||t)},t.\u0275pipe=y({name:"vietNameseDatePipe",type:t,pure:!0,standalone:!0});let e=t;return e})();function K(e,t){e&1&&C(0,"tr",22)}function Q(e,t){e&1&&C(0,"tr",23)}function Z(e,t){e&1&&(i(0,"th",24),l(1,"T\xEAn V\xE0ng"),a())}function ee(e,t){if(e&1&&(i(0,"td",25),l(1),a()),e&2){let m=t.$implicit;r(),f(" ",m.name," ")}}function te(e,t){e&1&&(i(0,"th",24),l(1,"H\xE0m L\u01B0\u1EE3ng"),a())}function ne(e,t){if(e&1&&(i(0,"td",25),l(1),a()),e&2){let m=t.$implicit;r(),f("",m.content,"%")}}function ie(e,t){e&1&&(i(0,"th",26),l(1,"B\xE1n Ra"),a())}function ae(e,t){if(e&1&&(i(0,"td",27),l(1),c(2,"currency"),a()),e&2){let m=t.$implicit;r(),f(" ",u(2,1,m.latestBidPrice,"VND")," ")}}function le(e,t){e&1&&(i(0,"th",28),l(1,"Mua V\xE0o"),a())}function oe(e,t){if(e&1&&(i(0,"td",29),l(1),c(2,"currency"),a()),e&2){let m=t.$implicit;r(),f(" ",u(2,1,m.latestAskPrice,"VND")," ")}}var Y=(()=>{let t=class t{constructor(n){this.goldService=n,this.prices=[],this.displayedColumns=["name","latestBidPrice","latestAskPrice","content"],this.currentDate$=D(1e3).pipe(P(0),M(()=>new Date))}ngOnInit(){this.getLatestGoldPrices(),this.loadTradingViewWidget()}loadTradingViewWidget(){let n=document.createElement("script");n.type="text/javascript",n.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",n.async=!0,n.innerHTML=`
    {
      "autosize": true,
      "symbol": "TVC:GOLD*FX_IDC:USDVND",
      "interval": "D",
      "timezone": "Asia/Ho_Chi_Minh",
      "theme": "light",
      "style": "1",
      "locale": "vi_VN",
      "allow_symbol_change": false,
      "calendar": false,
      "withdateranges": true,
      "details": true,
      "support_host": "https://www.tradingview.com"
    }`,document.getElementById("id-gold-chart-tradingview-widget")?.appendChild(n)}getLatestGoldPrices(){this.goldService.getLatestGoldPrices().subscribe({next:n=>{this.prices=n},error:n=>console.log(n)})}};t.\u0275fac=function(o){return new(o||t)(O(W))},t.\u0275cmp=w({type:t,selectors:[["app-gold-chart"]],standalone:!0,features:[S],decls:38,vars:14,consts:[[1,"flex","u-padding-left-small","u","padding-right-small"],[1,"table-gold"],[1,"timer","mat-elevation-z2"],[1,"timer__number"],[1,"timer__date"],[1,"table-gold__table","mat-elevation-z2"],[1,"table-gold__header"],["mat-table","",1,"table-gold__content",3,"dataSource"],["mat-header-row","","class","table-gold__sub-header",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["matColumnDef","name",1,"table-gold__item"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","content",1,"table-gold__item"],["matColumnDef","latestBidPrice",1,"table-gold__item"],["mat-header-cell","","class","table-gold__item--ask-cell-header",4,"matHeaderCellDef"],["mat-cell","","class","table-gold__item--ask-cell",4,"matCellDef"],["matColumnDef","latestAskPrice",1,"table-gold__item"],["mat-header-cell","","class","table-gold__item--bid-cell-header",4,"matHeaderCellDef"],["mat-cell","","class","table-gold__item--bid-cell",4,"matCellDef"],["id","id-gold-chart-tradingview-widget",1,"chart-gold"],[1,"chart-gold__header","mat-elevation-z2"],["mat-header-row","",1,"table-gold__sub-header"],["mat-row",""],["mat-header-cell",""],["mat-cell",""],["mat-header-cell","",1,"table-gold__item--ask-cell-header"],["mat-cell","",1,"table-gold__item--ask-cell"],["mat-header-cell","",1,"table-gold__item--bid-cell-header"],["mat-cell","",1,"table-gold__item--bid-cell"]],template:function(o,d){o&1&&(i(0,"div",0)(1,"section",1)(2,"div",2)(3,"p",3),l(4),c(5,"async"),c(6,"date"),a(),i(7,"p",4),l(8),c(9,"async"),c(10,"vietNameseDatePipe"),a()(),i(11,"div",5)(12,"h2",6)(13,"p"),l(14,"Gi\xE1 V\xE0ng C\u1EEDa H\xE0ng"),a(),i(15,"p"),l(16,"(\u0110\u01A1n v\u1ECB: VND/ch\u1EC9)"),a()(),i(17,"table",7),s(18,K,1,0,"tr",8)(19,Q,1,0,"tr",9),p(20,10),s(21,Z,2,0,"th",11)(22,ee,2,1,"td",12),g(),p(23,13),s(24,te,2,0,"th",11)(25,ne,2,1,"td",12),g(),p(26,14),s(27,ie,2,0,"th",15)(28,ae,3,4,"td",16),g(),p(29,17),s(30,le,2,0,"th",18)(31,oe,3,4,"td",19),g(),a()()(),i(32,"section",20)(33,"h2",21)(34,"p"),l(35,"Gi\xE1 V\xE0ng Th\u1EBF Gi\u1EDBi"),a(),i(36,"p"),l(37,"(VND/ounce)"),a()()()()),o&2&&(r(4),b(u(6,7,h(5,5,d.currentDate$),"hh:mm:ss a")),r(4),b(h(10,12,h(9,10,d.currentDate$))),r(9),_("dataSource",d.prices),r(),_("matHeaderRowDef",d.displayedColumns),r(),_("matRowDefColumns",d.displayedColumns))},dependencies:[B,T,z,G,L,k,V,R,N,H,A,I,$,F,j,X],styles:[".flex[_ngcontent-%COMP%]{display:flex;justify-content:stretch;align-items:flex-start;gap:2.4rem;padding-right:2.4rem;padding-left:2.4rem}.timer[_ngcontent-%COMP%]{position:relative;box-shadow:0 2px 10px #0000001a;width:100%;padding:4.8rem;background-color:#343638;text-align:center}.timer__number[_ngcontent-%COMP%]{display:block;color:#f8fafc;font-size:5.4rem;font-family:monospace}.timer__date[_ngcontent-%COMP%]{display:block;font-size:2.2rem;color:#f5f5f4;letter-spacing:1px;text-transform:uppercase;text-decoration:#f5f5f4}.table-gold[_ngcontent-%COMP%]{flex:1 1 40rem}.table-gold__header[_ngcontent-%COMP%]{text-align:center;padding:2.4rem 0;letter-spacing:1.4px;color:#f8fafc;background-color:#ea580c;text-transform:uppercase}.table-gold__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-child(1){font-size:2.2rem}.table-gold__sub-header[_ngcontent-%COMP%]{color:#343638;text-transform:uppercase;font-weight:900}.table-gold[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-gold[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:1.8rem 2.4rem}.table-gold[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:1.8rem;line-height:2.8rem}.table-gold[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:1.8rem}.table-gold__item--ask-cell-header[_ngcontent-%COMP%]{font-size:2.2rem!important;color:#ea580c}.table-gold__item--ask-cell[_ngcontent-%COMP%]{color:#ea580c;font-size:2.2rem!important;font-weight:900}.table-gold__item--bid-cell-header[_ngcontent-%COMP%]{font-size:2.2rem!important;color:#fb923c}.table-gold__item--bid-cell[_ngcontent-%COMP%]{color:#fb923c;font-size:2.2rem!important;font-weight:900}.chart-gold[_ngcontent-%COMP%]{height:70rem;flex:3 1 60rem}.chart-gold__header[_ngcontent-%COMP%]{text-align:center;padding:2.4rem 0;color:#f5f5f4;font-weight:1.5rem;background-color:#ea580c;text-transform:uppercase;letter-spacing:1.4px}.chart-gold__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-child(1){font-size:2.2rem}"]});let e=t;return e})();var re=[{path:"",component:Y}],be=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=v({type:t}),t.\u0275inj=E({imports:[x.forChild(re),x]});let e=t;return e})();export{be as GoldChartRoutingModule};
