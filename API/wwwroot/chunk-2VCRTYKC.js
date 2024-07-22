import{a as Ct,b as It,c as St,d as Dt,e as Mt,f as Tt,g as wt,h as Et,i as kt,j as Ft,k as Ot,l as Rt,n as zt}from"./chunk-PT53JIWA.js";import{c as _t}from"./chunk-VDIAIRGD.js";import{c as vt}from"./chunk-IMZNUD52.js";import{a as gt,b as fe}from"./chunk-5LB5J5WN.js";import{h as ft}from"./chunk-FXF7DOH7.js";import{b as bt,e as yt,f as xt}from"./chunk-F2JFFDTT.js";import{r as st,s as lt}from"./chunk-IJCGWU3B.js";import{c as Te,d as we,e as Ee,g as A,h as N,j as ke,k as Fe,l as Oe}from"./chunk-RGNDWIHZ.js";import{B as ot,E as pt,N as ct,S as dt,V as he,W as mt,Z as Me,ca as ie,fa as ut,ga as ht,v as at}from"./chunk-Y2G3PEDF.js";import{$c as it,Ab as P,Bb as xe,D as Be,Fa as Ke,Fb as u,Ga as O,Gb as K,Ha as R,Hb as m,Jb as x,Jc as ee,Ka as le,Kb as Ze,Lb as Je,Mb as C,Mc as q,Nc as tt,Ob as pe,Pb as ce,Qa as j,Qb as de,Ra as B,Rb as l,Sa as W,Sb as p,Tb as S,Ub as V,Vb as Q,W as Ve,Wb as D,Xb as $,Yb as me,_b as M,ac as c,ad as nt,bc as X,bd as te,cc as Y,da as H,ea as Qe,ec as T,fa as F,fc as ue,fd as rt,gc as v,gd as U,h as He,hc as g,ic as Ce,jb as Xe,jc as f,ka as ae,kc as k,la as $e,lc as L,ma as oe,mb as s,n as G,nb as d,oa as qe,pb as z,rc as Z,sa as Ue,sc as I,ta as Ge,ua as We,uc as Ie,vc as J,wa as _,wc as Se,xa as b,xb as Ye,ya as se,yc as De,z as je,za as y,zc as et}from"./chunk-5JFLDQZH.js";function Xt(n,t){n&1&&S(0,"mat-header-cell")}function Yt(n,t){if(n&1&&(l(0,"mat-cell"),S(1,"img",11),p()),n&2){let a=t.$implicit;s(),m("src",a.pictureUrl,Xe)("alt",a.productName)}}function Zt(n,t){n&1&&S(0,"mat-footer-cell")}function Jt(n,t){n&1&&(l(0,"mat-header-cell"),f(1,"Name"),p())}function ei(n,t){if(n&1&&(l(0,"mat-cell"),f(1),p()),n&2){let a=t.$implicit;s(),L(" ",a.productName," ")}}function ti(n,t){n&1&&(l(0,"mat-header-cell"),f(1,"Quantity"),p())}function ii(n,t){if(n&1&&(l(0,"mat-cell"),f(1),p()),n&2){let a=t.$implicit;s(),L(" ",a.quantity," ")}}function ni(n,t){n&1&&(l(0,"mat-header-cell"),f(1,"Price"),p())}function ri(n,t){if(n&1&&(l(0,"mat-cell"),f(1),Se(2,"currency"),p()),n&2){let a=t.$implicit;s(),L(" ",De(2,1,a.price,"VND")," ")}}function ai(n,t){n&1&&(l(0,"mat-header-cell"),f(1,"Total"),p())}function oi(n,t){if(n&1&&(l(0,"mat-cell"),f(1),Se(2,"currency"),p()),n&2){let a=t.$implicit,e=c();s(),L(" ",De(2,1,e.calculatePerItemTotalPrice(a),"VND")," ")}}function si(n,t){n&1&&S(0,"mat-header-row")}function li(n,t){n&1&&S(0,"mat-row")}var tn=(()=>{let t=class t{constructor(){this.displayedColumns=["pictureUrl","productName","quantity","price","total"]}calculatePerItemTotalPrice(e){return e.price*e.quantity}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=b({type:t,selectors:[["app-table-basket-items-summary"]],inputs:{basketItems:"basketItems"},standalone:!0,features:[I],decls:19,vars:3,consts:[[1,"table-basket-item",3,"dataSource"],["matColumnDef","pictureUrl"],[4,"matHeaderCellDef"],[4,"matCellDef"],[4,"matFooterCellDef"],["matColumnDef","productName"],["matColumnDef","quantity"],["matColumnDef","price"],["matColumnDef","total"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[1,"table-basket-item__product-img",3,"src","alt"]],template:function(i,r){i&1&&(l(0,"mat-table",0),V(1,1),u(2,Xt,1,0,"mat-header-cell",2)(3,Yt,2,2,"mat-cell",3)(4,Zt,1,0,"mat-footer-cell",4),Q(),V(5,5),u(6,Jt,2,0,"mat-header-cell",2)(7,ei,2,1,"mat-cell",3),Q(),V(8,6),u(9,ti,2,0,"mat-header-cell",2)(10,ii,2,1,"mat-cell",3),Q(),V(11,7),u(12,ni,2,0,"mat-header-cell",2)(13,ri,3,4,"mat-cell",3),Q(),V(14,8),u(15,ai,2,0,"mat-header-cell",2)(16,oi,3,4,"mat-cell",3),Q(),u(17,si,1,0,"mat-header-row",9)(18,li,1,0,"mat-row",10),p()),i&2&&(m("dataSource",r.basketItems),s(17),m("matHeaderRowDef",r.displayedColumns),s(),m("matRowDefColumns",r.displayedColumns))},dependencies:[U,rt,zt,Ct,St,kt,Mt,It,Ft,Dt,Tt,Et,wt,Ot,Rt,fe],styles:[".table-basket-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:14rem;height:100%;object-fit:contain}.table-basket-item[_ngcontent-%COMP%]   mat-cell[_ngcontent-%COMP%]{font-size:1.8rem}"]});let n=t;return n})();var mi=["*"];function ui(n,t){n&1&&Y(0)}var ze=(()=>{let t=class t{constructor(e){this._elementRef=e}focus(){this._elementRef.nativeElement.focus()}};t.\u0275fac=function(i){return new(i||t)(d(j))},t.\u0275dir=y({type:t,selectors:[["","cdkStepHeader",""]],hostAttrs:["role","tab"],standalone:!0});let n=t;return n})(),Pe=(()=>{let t=class t{constructor(e){this.template=e}};t.\u0275fac=function(i){return new(i||t)(d(z))},t.\u0275dir=y({type:t,selectors:[["","cdkStepLabel",""]],standalone:!0});let n=t;return n})(),hi=0;var w={NUMBER:"number",EDIT:"edit",DONE:"done",ERROR:"error"},Le=new qe("STEPPER_GLOBAL_OPTIONS"),_e=(()=>{let t=class t{get completed(){return this._completedOverride==null?this._getDefaultCompleted():this._completedOverride}set completed(e){this._completedOverride=e}_getDefaultCompleted(){return this.stepControl?this.stepControl.valid&&this.interacted:this.interacted}get hasError(){return this._customError==null?this._getDefaultError():this._customError}set hasError(e){this._customError=e}_getDefaultError(){return this.stepControl&&this.stepControl.invalid&&this.interacted}constructor(e,i){this._stepper=e,this.interacted=!1,this.interactedStream=new B,this.editable=!0,this.optional=!1,this._completedOverride=null,this._customError=null,this._stepperOptions=i||{},this._displayDefaultIndicatorType=this._stepperOptions.displayDefaultIndicatorType!==!1}select(){this._stepper.selected=this}reset(){this.interacted=!1,this._completedOverride!=null&&(this._completedOverride=!1),this._customError!=null&&(this._customError=!1),this.stepControl&&this.stepControl.reset()}ngOnChanges(){this._stepper._stateChanged()}_markAsInteracted(){this.interacted||(this.interacted=!0,this.interactedStream.emit(this))}_showError(){return this._stepperOptions.showError??this._customError!=null}};t.\u0275fac=function(i){return new(i||t)(d(ae(()=>E)),d(Le,8))},t.\u0275cmp=b({type:t,selectors:[["cdk-step"]],contentQueries:function(i,r,o){if(i&1&&T(o,Pe,5),i&2){let h;v(h=g())&&(r.stepLabel=h.first)}},viewQuery:function(i,r){if(i&1&&ue(z,7),i&2){let o;v(o=g())&&(r.content=o.first)}},inputs:{stepControl:"stepControl",label:"label",errorMessage:"errorMessage",ariaLabel:[_.None,"aria-label","ariaLabel"],ariaLabelledby:[_.None,"aria-labelledby","ariaLabelledby"],state:"state",editable:[_.HasDecoratorInputTransform,"editable","editable",q],optional:[_.HasDecoratorInputTransform,"optional","optional",q],completed:[_.HasDecoratorInputTransform,"completed","completed",q],hasError:[_.HasDecoratorInputTransform,"hasError","hasError",q]},outputs:{interactedStream:"interacted"},exportAs:["cdkStep"],standalone:!0,features:[xe,Ke,I],ngContentSelectors:mi,decls:1,vars:0,template:function(i,r){i&1&&(X(),u(0,ui,1,0,"ng-template"))},encapsulation:2,changeDetection:0});let n=t;return n})(),E=(()=>{let t=class t{get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this.steps&&this._steps?(this._isValidIndex(e),this.selected?._markAsInteracted(),this._selectedIndex!==e&&!this._anyControlsInvalidOrPending(e)&&(e>=this._selectedIndex||this.steps.toArray()[e].editable)&&this._updateSelectedItemIndex(e)):this._selectedIndex=e}get selected(){return this.steps?this.steps.toArray()[this.selectedIndex]:void 0}set selected(e){this.selectedIndex=e&&this.steps?this.steps.toArray().indexOf(e):-1}get orientation(){return this._orientation}set orientation(e){this._orientation=e,this._keyManager&&this._keyManager.withVerticalOrientation(e==="vertical")}constructor(e,i,r){this._dir=e,this._changeDetectorRef=i,this._elementRef=r,this._destroyed=new G,this.steps=new W,this._sortedHeaders=new W,this.linear=!1,this._selectedIndex=0,this.selectionChange=new B,this.selectedIndexChange=new B,this._orientation="horizontal",this._groupId=hi++}ngAfterContentInit(){this._steps.changes.pipe(H(this._steps),F(this._destroyed)).subscribe(e=>{this.steps.reset(e.filter(i=>i._stepper===this)),this.steps.notifyOnChanges()})}ngAfterViewInit(){this._stepHeader.changes.pipe(H(this._stepHeader),F(this._destroyed)).subscribe(e=>{this._sortedHeaders.reset(e.toArray().sort((i,r)=>i._elementRef.nativeElement.compareDocumentPosition(r._elementRef.nativeElement)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)),this._sortedHeaders.notifyOnChanges()}),this._keyManager=new ct(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation==="vertical"),(this._dir?this._dir.change:je()).pipe(H(this._layoutDirection()),F(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e)),this._keyManager.updateActiveItem(this._selectedIndex),this.steps.changes.subscribe(()=>{this.selected||(this._selectedIndex=Math.max(this._selectedIndex-1,0))}),this._isValidIndex(this._selectedIndex)||(this._selectedIndex=0)}ngOnDestroy(){this._keyManager?.destroy(),this.steps.destroy(),this._sortedHeaders.destroy(),this._destroyed.next(),this._destroyed.complete()}next(){this.selectedIndex=Math.min(this._selectedIndex+1,this.steps.length-1)}previous(){this.selectedIndex=Math.max(this._selectedIndex-1,0)}reset(){this._updateSelectedItemIndex(0),this.steps.forEach(e=>e.reset()),this._stateChanged()}_getStepLabelId(e){return`cdk-step-label-${this._groupId}-${e}`}_getStepContentId(e){return`cdk-step-content-${this._groupId}-${e}`}_stateChanged(){this._changeDetectorRef.markForCheck()}_getAnimationDirection(e){let i=e-this._selectedIndex;return i<0?this._layoutDirection()==="rtl"?"next":"previous":i>0?this._layoutDirection()==="rtl"?"previous":"next":"current"}_getIndicatorType(e,i=w.NUMBER){let r=this.steps.toArray()[e],o=this._isCurrentStep(e);return r._displayDefaultIndicatorType?this._getDefaultIndicatorLogic(r,o):this._getGuidelineLogic(r,o,i)}_getDefaultIndicatorLogic(e,i){return e._showError()&&e.hasError&&!i?w.ERROR:!e.completed||i?w.NUMBER:e.editable?w.EDIT:w.DONE}_getGuidelineLogic(e,i,r=w.NUMBER){return e._showError()&&e.hasError&&!i?w.ERROR:e.completed&&!i?w.DONE:e.completed&&i?r:e.editable&&i?w.EDIT:r}_isCurrentStep(e){return this._selectedIndex===e}_getFocusIndex(){return this._keyManager?this._keyManager.activeItemIndex:this._selectedIndex}_updateSelectedItemIndex(e){let i=this.steps.toArray();this.selectionChange.emit({selectedIndex:e,previouslySelectedIndex:this._selectedIndex,selectedStep:i[e],previouslySelectedStep:i[this._selectedIndex]}),this._containsFocus()?this._keyManager.setActiveItem(e):this._keyManager.updateActiveItem(e),this._selectedIndex=e,this.selectedIndexChange.emit(this._selectedIndex),this._stateChanged()}_onKeydown(e){let i=pt(e),r=e.keyCode,o=this._keyManager;o.activeItemIndex!=null&&!i&&(r===32||r===13)?(this.selectedIndex=o.activeItemIndex,e.preventDefault()):o.setFocusOrigin("keyboard").onKeydown(e)}_anyControlsInvalidOrPending(e){return this.linear&&e>=0?this.steps.toArray().slice(0,e).some(i=>{let r=i.stepControl;return(r?r.invalid||r.pending||!i.interacted:!i.completed)&&!i.optional&&!i._completedOverride}):!1}_layoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_containsFocus(){let e=this._elementRef.nativeElement,i=ot();return e===i||e.contains(i)}_isValidIndex(e){return e>-1&&(!this.steps||e<this.steps.length)}};t.\u0275fac=function(i){return new(i||t)(d(he,8),d(ee),d(j))},t.\u0275dir=y({type:t,selectors:[["","cdkStepper",""]],contentQueries:function(i,r,o){if(i&1&&(T(o,_e,5),T(o,ze,5)),i&2){let h;v(h=g())&&(r._steps=h),v(h=g())&&(r._stepHeader=h)}},inputs:{linear:[_.HasDecoratorInputTransform,"linear","linear",q],selectedIndex:[_.HasDecoratorInputTransform,"selectedIndex","selectedIndex",tt],selected:"selected",orientation:"orientation"},outputs:{selectionChange:"selectionChange",selectedIndexChange:"selectedIndexChange"},exportAs:["cdkStepper"],standalone:!0,features:[xe]});let n=t;return n})(),fi=(()=>{let t=class t{constructor(e){this._stepper=e,this.type="submit"}};t.\u0275fac=function(i){return new(i||t)(d(E))},t.\u0275dir=y({type:t,selectors:[["button","cdkStepperNext",""]],hostVars:1,hostBindings:function(i,r){i&1&&M("click",function(){return r._stepper.next()}),i&2&&me("type",r.type)},inputs:{type:"type"},standalone:!0});let n=t;return n})(),_i=(()=>{let t=class t{constructor(e){this._stepper=e,this.type="button"}};t.\u0275fac=function(i){return new(i||t)(d(E))},t.\u0275dir=y({type:t,selectors:[["button","cdkStepperPrevious",""]],hostVars:1,hostBindings:function(i,r){i&1&&M("click",function(){return r._stepper.previous()}),i&2&&me("type",r.type)},inputs:{type:"type"},standalone:!0});let n=t;return n})(),ve=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=se({type:t}),t.\u0275inj=oe({imports:[mt]});let n=t;return n})();function vi(n,t){if(n&1&&D(0,2),n&2){let a=c();m("ngTemplateOutlet",a.iconOverrides[a.state])("ngTemplateOutletContext",a._getIconContext())}}function gi(n,t){if(n&1&&(l(0,"span",7),f(1),p()),n&2){let a=c(2);s(),k(a._getDefaultTextForState(a.state))}}function bi(n,t){if(n&1&&(l(0,"span",8),f(1),p()),n&2){let a=c(3);s(),k(a._intl.completedLabel)}}function yi(n,t){if(n&1&&(l(0,"span",8),f(1),p()),n&2){let a=c(3);s(),k(a._intl.editableLabel)}}function xi(n,t){if(n&1&&(u(0,bi,2,1,"span",8)(1,yi,2,1),l(2,"mat-icon",7),f(3),p()),n&2){let a=c(2);C(0,a.state==="done"?0:a.state==="edit"?1:-1),s(3),k(a._getDefaultTextForState(a.state))}}function Ci(n,t){if(n&1&&u(0,gi,2,1)(1,xi,4,2),n&2){let a,e=c();C(0,(a=e.state)==="number"?0:1)}}function Ii(n,t){n&1&&(l(0,"div",4),D(1,9),p()),n&2&&(s(),m("ngTemplateOutlet",t.template))}function Si(n,t){if(n&1&&(l(0,"div",4),f(1),p()),n&2){let a=c();s(),k(a.label)}}function Di(n,t){if(n&1&&(l(0,"div",5),f(1),p()),n&2){let a=c();s(),k(a._intl.optionalLabel)}}function Mi(n,t){if(n&1&&(l(0,"div",6),f(1),p()),n&2){let a=c();s(),k(a.errorMessage)}}var Lt=["*"];function Ti(n,t){}function wi(n,t){if(n&1&&(Y(0),u(1,Ti,0,0,"ng-template",0)),n&2){let a=c();s(),m("cdkPortalOutlet",a._portal)}}var At=(n,t)=>({step:n,i:t}),Nt=n=>({animationDuration:n}),Ht=(n,t)=>({value:n,params:t});function Ei(n,t){n&1&&Y(0)}function ki(n,t){n&1&&S(0,"div",6)}function Fi(n,t){if(n&1&&(D(0,5),u(1,ki,1,0,"div",6)),n&2){let a=t.$implicit,e=t.$index,i=t.$index,r=t.$count;c(2);let o=Ce(4);m("ngTemplateOutlet",o)("ngTemplateOutletContext",J(3,At,a,e)),s(),C(1,i!==r-1?1:-1)}}function Oi(n,t){if(n&1){let a=$();l(0,"div",7),M("@horizontalStepTransition.done",function(i){O(a);let r=c(2);return R(r._animationDone.next(i))}),D(1,8),p()}if(n&2){let a=t.$implicit,e=t.$index,i=c(2);x("mat-horizontal-stepper-content-inactive",i.selectedIndex!==e),m("@horizontalStepTransition",J(8,Ht,i._getAnimationDirection(e),Ie(6,Nt,i._getAnimationDuration())))("id",i._getStepContentId(e)),K("aria-labelledby",i._getStepLabelId(e)),s(),m("ngTemplateOutlet",a.content)}}function Ri(n,t){if(n&1&&(l(0,"div",1)(1,"div",2),ce(2,Fi,2,6,null,null,pe),p(),l(4,"div",3),ce(5,Oi,2,11,"div",4,pe),p()()),n&2){let a=c();s(2),de(a.steps),s(3),de(a.steps)}}function zi(n,t){if(n&1){let a=$();l(0,"div",9),D(1,5),l(2,"div",10)(3,"div",11),M("@verticalStepTransition.done",function(i){O(a);let r=c(2);return R(r._animationDone.next(i))}),l(4,"div",12),D(5,8),p()()()()}if(n&2){let a=t.$implicit,e=t.$index,i=t.$index,r=t.$count,o=c(2),h=Ce(4);s(),m("ngTemplateOutlet",h)("ngTemplateOutletContext",J(10,At,a,e)),s(),x("mat-stepper-vertical-line",i!==r-1),s(),x("mat-vertical-stepper-content-inactive",o.selectedIndex!==e),m("@verticalStepTransition",J(15,Ht,o._getAnimationDirection(e),Ie(13,Nt,o._getAnimationDuration())))("id",o._getStepContentId(e)),K("aria-labelledby",o._getStepLabelId(e)),s(2),m("ngTemplateOutlet",a.content)}}function Pi(n,t){if(n&1&&ce(0,zi,6,18,"div",9,pe),n&2){let a=c();de(a.steps)}}function Li(n,t){if(n&1){let a=$();l(0,"mat-step-header",13),M("click",function(){let i=O(a).step;return R(i.select())})("keydown",function(i){O(a);let r=c();return R(r._onKeydown(i))}),p()}if(n&2){let a=t.step,e=t.i,i=c();x("mat-horizontal-stepper-header",i.orientation==="horizontal")("mat-vertical-stepper-header",i.orientation==="vertical"),m("tabIndex",i._getFocusIndex()===e?0:-1)("id",i._getStepLabelId(e))("index",e)("state",i._getIndicatorType(e,a.state))("label",a.stepLabel||a.label)("selected",i.selectedIndex===e)("active",i._stepIsNavigable(e,a))("optional",a.optional)("errorMessage",a.errorMessage)("iconOverrides",i._iconOverrides)("disableRipple",i.disableRipple||!i._stepIsNavigable(e,a))("color",a.color||i.color),K("aria-posinset",e+1)("aria-setsize",i.steps.length)("aria-controls",i._getStepContentId(e))("aria-selected",i.selectedIndex==e)("aria-label",a.ariaLabel||null)("aria-labelledby",!a.ariaLabel&&a.ariaLabelledby?a.ariaLabelledby:null)("aria-disabled",i._stepIsNavigable(e,a)?null:!0)}}var Ae=(()=>{let t=class t extends Pe{};t.\u0275fac=(()=>{let e;return function(r){return(e||(e=le(t)))(r||t)}})(),t.\u0275dir=y({type:t,selectors:[["","matStepLabel",""]],standalone:!0,features:[P]});let n=t;return n})(),ge=(()=>{let t=class t{constructor(){this.changes=new G,this.optionalLabel="Optional",this.completedLabel="Completed",this.editableLabel="Editable"}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=$e({token:t,factory:t.\u0275fac,providedIn:"root"});let n=t;return n})();function Ai(n){return n||new ge}var Ni={provide:ge,deps:[[new Ge,new We,ge]],useFactory:Ai},Ne=(()=>{let t=class t extends ze{constructor(e,i,r,o){super(r),this._intl=e,this._focusMonitor=i,this._intlSubscription=e.changes.subscribe(()=>o.markForCheck())}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._intlSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._elementRef)}focus(e,i){e?this._focusMonitor.focusVia(this._elementRef,e,i):this._elementRef.nativeElement.focus(i)}_stringLabel(){return this.label instanceof Ae?null:this.label}_templateLabel(){return this.label instanceof Ae?this.label:null}_getHostElement(){return this._elementRef.nativeElement}_getIconContext(){return{index:this.index,active:this.active,optional:this.optional}}_getDefaultTextForState(e){return e=="number"?`${this.index+1}`:e=="edit"?"create":e=="error"?"warning":e}};t.\u0275fac=function(i){return new(i||t)(d(ge),d(dt),d(j),d(ee))},t.\u0275cmp=b({type:t,selectors:[["mat-step-header"]],hostAttrs:["role","tab",1,"mat-step-header"],hostVars:2,hostBindings:function(i,r){i&2&&Ze("mat-"+(r.color||"primary"))},inputs:{state:"state",label:"label",errorMessage:"errorMessage",iconOverrides:"iconOverrides",index:"index",selected:"selected",active:"active",optional:"optional",disableRipple:"disableRipple",color:"color"},standalone:!0,features:[P,I],decls:10,vars:17,consts:[["matRipple","",1,"mat-step-header-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"],[1,"mat-step-icon-content"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-step-label"],[1,"mat-step-text-label"],[1,"mat-step-optional"],[1,"mat-step-sub-label-error"],["aria-hidden","true"],[1,"cdk-visually-hidden"],[3,"ngTemplateOutlet"]],template:function(i,r){if(i&1&&(S(0,"div",0),l(1,"div")(2,"div",1),u(3,vi,1,2,"ng-container",2)(4,Ci,2,1),p()(),l(5,"div",3),u(6,Ii,2,1,"div",4)(7,Si,2,1)(8,Di,2,1,"div",5)(9,Mi,2,1,"div",6),p()),i&2){let o;m("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disableRipple),s(),Je("mat-step-icon-state-",r.state," mat-step-icon"),x("mat-step-icon-selected",r.selected),s(2),C(3,r.iconOverrides&&r.iconOverrides[r.state]?3:4),s(2),x("mat-step-label-active",r.active)("mat-step-label-selected",r.selected)("mat-step-label-error",r.state=="error"),s(),C(6,(o=r._templateLabel())?6:r._stringLabel()?7:-1,o),s(2),C(8,r.optional&&r.state!="error"?8:-1),s(),C(9,r.state==="error"?9:-1)}},dependencies:[ut,te,gt],styles:['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape)}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color)}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color);background-color:var(--mat-stepper-header-icon-background-color)}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color)}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font);font-size:var(--mat-stepper-header-label-text-size);font-weight:var(--mat-stepper-header-label-text-weight);color:var(--mat-stepper-header-label-text-color)}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color)}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color);font-size:var(--mat-stepper-header-error-state-label-text-size)}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size);font-weight:var(--mat-stepper-header-selected-state-label-text-weight)}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color);color:var(--mat-stepper-header-selected-state-icon-foreground-color)}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color);color:var(--mat-stepper-header-edit-state-icon-foreground-color)}'],encapsulation:2,changeDetection:0});let n=t;return n})(),jt="500ms",Bt="225ms",Pt={horizontalStepTransition:Te("horizontalStepTransition",[N("previous",A({transform:"translate3d(-100%, 0, 0)",visibility:"hidden"})),N("current",A({transform:"none",visibility:"inherit"})),N("next",A({transform:"translate3d(100%, 0, 0)",visibility:"hidden"})),ke("* => *",Ee([we("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)"),Oe("@*",Fe(),{optional:!0})]),{params:{animationDuration:jt}})]),verticalStepTransition:Te("verticalStepTransition",[N("previous",A({height:"0px",visibility:"hidden"})),N("next",A({height:"0px",visibility:"hidden"})),N("current",A({height:"*",visibility:"inherit"})),ke("* <=> current",Ee([we("{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"),Oe("@*",Fe(),{optional:!0})]),{params:{animationDuration:Bt}})])},Hi=(()=>{let t=class t{constructor(e){this.templateRef=e}};t.\u0275fac=function(i){return new(i||t)(d(z))},t.\u0275dir=y({type:t,selectors:[["ng-template","matStepperIcon",""]],inputs:{name:[_.None,"matStepperIcon","name"]},standalone:!0});let n=t;return n})(),ji=(()=>{let t=class t{constructor(e){this._template=e}};t.\u0275fac=function(i){return new(i||t)(d(z))},t.\u0275dir=y({type:t,selectors:[["ng-template","matStepContent",""]],standalone:!0});let n=t;return n})(),Bi=(()=>{let t=class t extends _e{constructor(e,i,r,o){super(e,o),this._errorStateMatcher=i,this._viewContainerRef=r,this._isSelected=He.EMPTY,this.stepLabel=void 0}ngAfterContentInit(){this._isSelected=this._stepper.steps.changes.pipe(Qe(()=>this._stepper.selectionChange.pipe(Be(e=>e.selectedStep===this),H(this._stepper.selected===this)))).subscribe(e=>{e&&this._lazyContent&&!this._portal&&(this._portal=new bt(this._lazyContent._template,this._viewContainerRef))})}ngOnDestroy(){this._isSelected.unsubscribe()}isErrorState(e,i){let r=this._errorStateMatcher.isErrorState(e,i),o=!!(e&&e.invalid&&this.interacted);return r||o}};t.\u0275fac=function(i){return new(i||t)(d(ae(()=>Vt)),d(ie,4),d(Ye),d(Le,8))},t.\u0275cmp=b({type:t,selectors:[["mat-step"]],contentQueries:function(i,r,o){if(i&1&&(T(o,Ae,5),T(o,ji,5)),i&2){let h;v(h=g())&&(r.stepLabel=h.first),v(h=g())&&(r._lazyContent=h.first)}},hostAttrs:["hidden",""],inputs:{color:"color"},exportAs:["matStep"],standalone:!0,features:[Z([{provide:ie,useExisting:t},{provide:_e,useExisting:t}]),P,I],ngContentSelectors:Lt,decls:1,vars:0,consts:[[3,"cdkPortalOutlet"]],template:function(i,r){i&1&&(X(),u(0,wi,2,1,"ng-template"))},dependencies:[yt],encapsulation:2,changeDetection:0});let n=t;return n})(),Vt=(()=>{let t=class t extends E{get animationDuration(){return this._animationDuration}set animationDuration(e){this._animationDuration=/^\d+$/.test(e)?e+"ms":e}constructor(e,i,r){super(e,i,r),this._stepHeader=void 0,this._steps=void 0,this.steps=new W,this.animationDone=new B,this.labelPosition="end",this.headerPosition="top",this._iconOverrides={},this._animationDone=new G,this._animationDuration="",this._isServer=!Ue(at).isBrowser;let o=r.nativeElement.nodeName.toLowerCase();this.orientation=o==="mat-vertical-stepper"?"vertical":"horizontal"}ngAfterContentInit(){super.ngAfterContentInit(),this._icons.forEach(({name:e,templateRef:i})=>this._iconOverrides[e]=i),this.steps.changes.pipe(F(this._destroyed)).subscribe(()=>{this._stateChanged()}),this._animationDone.pipe(Ve((e,i)=>e.fromState===i.fromState&&e.toState===i.toState),F(this._destroyed)).subscribe(e=>{e.toState==="current"&&this.animationDone.emit()})}_stepIsNavigable(e,i){return i.completed||this.selectedIndex===e||!this.linear}_getAnimationDuration(){return this.animationDuration?this.animationDuration:this.orientation==="horizontal"?jt:Bt}};t.\u0275fac=function(i){return new(i||t)(d(he,8),d(ee),d(j))},t.\u0275cmp=b({type:t,selectors:[["mat-stepper"],["mat-vertical-stepper"],["mat-horizontal-stepper"],["","matStepper",""]],contentQueries:function(i,r,o){if(i&1&&(T(o,Bi,5),T(o,Hi,5)),i&2){let h;v(h=g())&&(r._steps=h),v(h=g())&&(r._icons=h)}},viewQuery:function(i,r){if(i&1&&ue(Ne,5),i&2){let o;v(o=g())&&(r._stepHeader=o)}},hostAttrs:["role","tablist"],hostVars:11,hostBindings:function(i,r){i&2&&(K("aria-orientation",r.orientation),x("mat-stepper-horizontal",r.orientation==="horizontal")("mat-stepper-vertical",r.orientation==="vertical")("mat-stepper-label-position-end",r.orientation==="horizontal"&&r.labelPosition=="end")("mat-stepper-label-position-bottom",r.orientation==="horizontal"&&r.labelPosition=="bottom")("mat-stepper-header-position-bottom",r.headerPosition==="bottom"))},inputs:{disableRipple:"disableRipple",color:"color",labelPosition:"labelPosition",headerPosition:"headerPosition",animationDuration:"animationDuration"},outputs:{animationDone:"animationDone"},exportAs:["matStepper","matVerticalStepper","matHorizontalStepper"],standalone:!0,features:[Z([{provide:E,useExisting:t}]),P,I],ngContentSelectors:Lt,decls:5,vars:2,consts:[["stepTemplate",""],[1,"mat-horizontal-stepper-wrapper"],[1,"mat-horizontal-stepper-header-container"],[1,"mat-horizontal-content-container"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id","mat-horizontal-stepper-content-inactive"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-stepper-horizontal-line"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id"],[3,"ngTemplateOutlet"],[1,"mat-step"],[1,"mat-vertical-content-container"],["role","tabpanel",1,"mat-vertical-stepper-content",3,"id"],[1,"mat-vertical-content"],[3,"click","keydown","tabIndex","id","index","state","label","selected","active","optional","errorMessage","iconOverrides","disableRipple","color"]],template:function(i,r){if(i&1&&(X(),u(0,Ei,1,0)(1,Ri,7,0)(2,Pi,2,0)(3,Li,1,23,"ng-template",null,0,et)),i&2){let o;C(0,r._isServer?0:-1),s(),C(1,(o=r.orientation)==="horizontal"?1:o==="vertical"?2:-1)}},dependencies:[te,Ne],styles:['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font);background:var(--mat-stepper-container-color)}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color);top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}'],encapsulation:2,data:{animation:[Pt.horizontalStepTransition,Pt.verticalStepTransition]},changeDetection:0});let n=t;return n})();var Qt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=se({type:t}),t.\u0275inj=oe({providers:[Ni,ie],imports:[Me,U,xt,ve,fe,ht,Vt,Ne,Me]});let n=t;return n})();function Vi(n,t){if(n&1){let a=$();l(0,"li",4)(1,"button",5),M("click",function(){let i=O(a).index,r=c();return R(r.selectStepByIndex(i))}),f(2),p()()}if(n&2){let a=t.$implicit,e=t.index,i=c();s(),x("btn-square--active",i.selectedIndex===e),m("disabled",!0),s(),L("",a.label," ")}}function Qi(n,t){if(n&1&&(l(0,"div"),D(1,6),p()),n&2){let a=c();s(),m("ngTemplateOutlet",a.selected.content)}}var ir=(()=>{let t=class t extends E{constructor(){super(...arguments),this.linearModeSelected=!0}ngOnInit(){this.linear=this.linearModeSelected}selectStepByIndex(e){this.selectedIndex=e}};t.\u0275fac=(()=>{let e;return function(r){return(e||(e=le(t)))(r||t)}})(),t.\u0275cmp=b({type:t,selectors:[["app-generic-stepper"]],inputs:{linearModeSelected:"linearModeSelected"},standalone:!0,features:[Z([{provide:E,useExisting:t}]),P,I],decls:4,vars:2,consts:[[1,"stepper"],[1,"stepper__nav"],["class","nav__item",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"nav__item"],[1,"btn-square","btn-square--primary-light",3,"click","disabled"],[3,"ngTemplateOutlet"]],template:function(i,r){i&1&&(l(0,"div",0)(1,"ul",1),u(2,Vi,3,4,"li",2),p(),u(3,Qi,2,1,"div",3),p()),i&2&&(s(2),m("ngForOf",r.steps),s(),m("ngIf",r.selected))},dependencies:[ve,vt,st,lt,ft,_t,Qt,U,it,nt,te],styles:[".stepper__nav[_ngcontent-%COMP%]{display:flex;align-items:center}"]});let n=t;return n})();var Ut="https://js.stripe.com/v3",$i=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,$t="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",qi=function(){for(var t=document.querySelectorAll('script[src^="'.concat(Ut,'"]')),a=0;a<t.length;a++){var e=t[a];if($i.test(e.src))return e}return null},qt=function(t){var a=t&&!t.advancedFraudSignals?"?advancedFraudSignals=false":"",e=document.createElement("script");e.src="".concat(Ut).concat(a);var i=document.head||document.body;if(!i)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return i.appendChild(e),e},Ui=function(t,a){!t||!t._registerWrapper||t._registerWrapper({name:"stripe-js",version:"4.0.0",startTime:a})},ne=null,be=null,ye=null,Gi=function(t){return function(){t(new Error("Failed to load Stripe.js"))}},Wi=function(t,a){return function(){window.Stripe?t(window.Stripe):a(new Error("Stripe.js not available"))}},Ki=function(t){return ne!==null?ne:(ne=new Promise(function(a,e){if(typeof window>"u"||typeof document>"u"){a(null);return}if(window.Stripe&&t&&console.warn($t),window.Stripe){a(window.Stripe);return}try{var i=qi();if(i&&t)console.warn($t);else if(!i)i=qt(t);else if(i&&ye!==null&&be!==null){var r;i.removeEventListener("load",ye),i.removeEventListener("error",be),(r=i.parentNode)===null||r===void 0||r.removeChild(i),i=qt(t)}ye=Wi(a,e),be=Gi(e),i.addEventListener("load",ye),i.addEventListener("error",be)}catch(o){e(o);return}}),ne.catch(function(a){return ne=null,Promise.reject(a)}))},Xi=function(t,a,e){if(t===null)return null;var i=t.apply(void 0,a);return Ui(i,e),i},re,Gt=!1,Wt=function(){return re||(re=Ki(null).catch(function(t){return re=null,Promise.reject(t)}),re)};Promise.resolve().then(function(){return Wt()}).catch(function(n){Gt||console.warn(n)});var rr=function(){for(var t=arguments.length,a=new Array(t),e=0;e<t;e++)a[e]=arguments[e];Gt=!0;var i=Date.now();return Wt().then(function(r){return Xi(r,a,i)})};export{tn as a,_e as b,fi as c,_i as d,ve as e,ir as f,rr as g};