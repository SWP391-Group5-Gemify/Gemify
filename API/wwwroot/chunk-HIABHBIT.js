import{a as It}from"./chunk-SDQNOOQT.js";import{d as Ct}from"./chunk-Q3IPZN2W.js";import{a as Ft,b as xt}from"./chunk-5LB5J5WN.js";import{a as Dt,b as Ot}from"./chunk-R2WOP35W.js";import{Ga as et,Ha as it,Hb as ft,Qa as ut,Ra as pt,Rb as P,Sb as U,Tb as gt,Xb as vt,_b as nt,a as j,b as J,fc as T,g as M,gc as b,gd as wt,hc as R,ic as G,jc as Y,la as dt,lc as Et,ma as ht,mb as st,nb as V,o as tt,q as _,sc as _t,tb as mt,v as lt,xa as H,ya as At}from"./chunk-5JFLDQZH.js";var yt=["video"],qt=["canvas"],jt=["resultsPanel"],L="assets/wasm/index.js",B="https://cdn.jsdelivr.net/npm/ngx-scanner-qrcode@1.6.9/wasm/index.js",Ht="https://cdn.jsdelivr.net/npm/ngx-scanner-qrcode@latest/wasm/index.js",Gt="data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABQAAAkAAgICAgICAgICAgICAgICAgICAgKCgoKCgoKCgoKCgoKCgoKCgoKCgwMDAwMDAwMDAwMDAwMDAwMDAwMDg4ODg4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC41NAAAAAAAAAAAAAAAACQEUQAAAAAAAAJAk0uXRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAANQAbGeUEQAAHZYZ3fASqD4P5TKBgocg+Bw/8+CAYBA4XB9/4EBAEP4nB9+UOf/6gfUCAIKyjgQ/Kf//wfswAAAwQA/+MYxAYOqrbdkZGQAMA7DJLCsQxNOij///////////+tv///3RWiZGBEhsf/FO/+LoCSFs1dFVS/g8f/4Mhv0nhqAieHleLy/+MYxAYOOrbMAY2gABf/////////////////usPJ66R0wI4boY9/8jQYg//g2SPx1M0N3Z0kVJLIs///Uw4aMyvHJJYmPBYG/+MYxAgPMALBucAQAoGgaBoFQVBUFQWDv6gZBUFQVBUGgaBr5YSgqCoKhIGg7+IQVBUFQVBoGga//SsFSoKnf/iVTEFNRTMu/+MYxAYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",Tt={audio:!1,video:!0},rt={lineWidth:1,strokeStyle:"green",fillStyle:"#55f02880"},ct={font:"15px serif",strokeStyle:"#fff0",fillStyle:"#ff0000"},D={src:"",fps:30,vibrate:300,decode:"utf-8",isBeep:!0,constraints:Tt,canvasStyles:[rt,ct]},Q=()=>"zbarWasm"in window,Yt=(o,s,c)=>{if(s&&Object.keys(s[o]).length){for(let t in c){let e=JSON.parse(JSON.stringify(J(j({},s[o]),{[t]:c[t]})));s[o]=s[o].hasOwnProperty(t)?s[o]:e}return s[o]}else return c},h=(o,s,c)=>{c?o.error(c):o.next(s),o.complete()},at=(o=!1)=>{if(o===!1)return;let s=new Audio(Gt);s.oncanplaythrough=()=>{let c=s.play();c&&c.catch(t=>{t.name==="NotAllowedError"||t.name})}},St=(o,s,c,t)=>{let e,i,n=s.width,l=s.height,r=n/l,a=parseInt(getComputedStyle(s).width),d=parseInt(getComputedStyle(s).height),g=a/d;c.innerHTML="",r>g?(e=a/n,i=a/r/l):(i=d/l,e=d*r/n);for(let w=0;w<o.length;w++){let v=o[w],m=document.createElement("canvas"),E=m.getContext("2d",{willReadFrequently:!0}),x={},F=[],f=[],u=0,p=0,z=t.length===2&&t[1]?.font?.replace(/[^0-9]/g,"");z&&/[0-9]/g.test(z)&&(u=parseFloat(z),p=(e||1)*u,Number.isNaN(p)&&(p=u));let W=v.points;for(let A=0;A<W.length;A++){let y=W?.[A]?.x??0,q=W?.[A]?.y??0;x[`x${A+1}`]=y,x[`y${A+1}`]=q,F.push(y),f.push(q)}let $=Math.max(...F),O=Math.min(...F),X=Math.max(...f),I=Math.min(...f);m.setAttribute("class","qrcode-polygon"),r>g?(m.style.top=I*i+(d-a/r)*.5+"px",m.style.left=O*e+"px",m.width=($-O)*e,m.height=(X-I)*e):(m.style.top=I*i+"px",m.style.left=O*e+(a-d*r)*.5+"px",m.width=($-O)*i,m.height=(X-I)*i);for(let A in t[0])E[A]=t[0][A];let K=[];for(let A=0;A<F.length;A++)K.push((x[`x${A+1}`]-O)*i),K.push((x[`y${A+1}`]-I)*e);let k=K.slice(0);for(E.beginPath(),E.moveTo(k.shift(),k.shift());k.length;)E.lineTo(k.shift(),k.shift());if(E.closePath(),E.fill(),E.stroke(),u){let A=document.createElement("div");A.setAttribute("class","qrcode-tooltip-temp"),A.innerText=v.value,A.style.maxWidth=(n>window.innerWidth?window.innerWidth*.9:n)+"px",A.style.borderRadius=`clamp(1px, ${e*u-10}px, 3px)`,A.style.paddingBlock=`clamp(1px, ${e*u-10}px, 3px)`,A.style.paddingInline=`clamp(2.5px, ${e*u-6}px, 10px)`;let y=`<svg xmlns="http://www.w3.org/2000/svg" width="${p}" height="${p}" viewBox="0 0 512 512"><rect x="128" y="128" width="336" height="336" rx="57" ry="57"></rect><path d="M383.5,128l.5-24a56.16,56.16,0,0,0-56-56H112a64.19,64.19,0,0,0-64,64V328a56.16,56.16,0,0,0,56,56h24"></path></svg>`,q=new DOMParser().parseFromString(y,"application/xml"),Z=A.ownerDocument.importNode(q.documentElement,!0);Z.style.marginLeft=`clamp(1px, ${e*u-10}px, 3px)`,A.appendChild(Z),Z.addEventListener("click",()=>window.navigator.clipboard.writeText(v.value)),A.addEventListener("click",()=>window.navigator.clipboard.writeText(v.value));let C=document.createElement("div");C.setAttribute("class","qrcode-tooltip"),C.appendChild(A),i=d/l,e=d*r/n,C.style.fontSize=e*u+"px",C.style.top=I*i+"px",C.style.left=O*e+(a-d*r)*.5+"px",C.style.width=($-O)*i+"px",C.style.height=(X-I)*i+"px";let N=document.createElement("span");N.innerText=v.value,N.style.top=I*i+-20*i+"px",N.style.left=O*e+(a-d*r)*.5+"px";let Lt=t[1]?.font?.split(" ")?.[1];N.style.fontFamily=Lt,N.style.fontSize=e*u+"px",N.style.color=t?.[1]?.fillStyle,c?.appendChild(C),c?.appendChild(N)}c?.appendChild(m)}},Qt=(o,s,c)=>{let t=s.getContext("2d",{willReadFrequently:!0});for(let e=0;e<o.length;e++){let i=o[e],n={},l=[],r=[],a=0,g=c[1]?.font?.split(" ")?.[0]?.replace(/[^0-9]/g,"");g&&/[0-9]/g.test(g)&&(a=parseFloat(g));let w=i.points;for(let f=0;f<w.length;f++){let u=w?.[f]?.x??0,p=w?.[f]?.y??0;n[`x${f+1}`]=u,n[`y${f+1}`]=p,l.push(u),r.push(p)}let v=Math.min(...l),m=Math.min(...r),E=()=>{for(let p in c[0])t[p]=c[0][p];let f=[];for(let p=0;p<l.length;p++)f.push(n[`x${p+1}`]),f.push(n[`y${p+1}`]);let u=f.slice(0);for(t.beginPath(),t.moveTo(u.shift(),u.shift());u.length;)t.lineTo(u.shift(),u.shift());t.closePath(),t.fill(),t.stroke()},x=document.createElement("canvas"),F=()=>{let f=c[1]?.font?.split(" ")?.[1];x.height=s.height,x.width=s.width;let u=x.getContext("2d",{willReadFrequently:!0});u.font=a+"px "+f;for(let p in c[1])u[p]=c[1][p];$t(u,i.value,v,m-5)};E(),F(),t.drawImage(x,0,0)}},zt=(o,s)=>{let c=s?.decode??D.decode,t=s?.canvasStyles?.length===2?s?.canvasStyles:[rt,ct],e=s?.isBeep??D.isBeep;return new Promise((i,n)=>{let l=new FileReader;l.onload=()=>{let r={name:o.name,file:o,url:URL.createObjectURL(o)},a=new Image;a.setAttribute("crossOrigin","anonymous"),a.onload=()=>M(void 0,null,function*(){let d=document.createElement("canvas");d.width=a.naturalWidth||a.width,d.height=a.naturalHeight||a.height;let g=d.getContext("2d");g.drawImage(a,0,0,d.width,d.height);let w=g.getImageData(0,0,d.width,d.height);if(Q()){let v=yield zbarWasm.scanImageData(w);if(v?.length){v.forEach(F=>F.value=F.decode(c?.toLocaleLowerCase())),Qt(v,d,t);let m=yield bt(d),E=URL.createObjectURL(m);i(Object.assign({},r,{data:v,url:E,canvas:d,file:((F,f)=>new File([F],f,{lastModified:new Date().getTime(),type:F.type}))(m,r.name)})),at(e)}else i(Object.assign({},r,{data:v,canvas:d}))}}),a.src=r.url},l.onerror=r=>n(r),l.readAsDataURL(o)})},bt=(o,s)=>new Promise((c,t)=>o.toBlob(e=>c(e),s)),Wt=(o,s)=>new File([o],s,{lastModified:new Date().getTime(),type:o.type}),Rt=(o=[],s,c,t,e=new _)=>(kt(o,c,t).then(i=>{Promise.all(Object.assign([],i).map(n=>zt(n,s))).then(n=>{h(e,n)}).catch(n=>h(e,null,n))}),e),$t=(o,s,c,t)=>{let e=o.measureText("M").width*1.2,i=s.split(`
`);for(var n=0;n<i.length;++n)o.fillText(i[n],c,t),o.strokeText(i[n],c,t),t+=e},kt=(o=[],s=100,c=100)=>{if(o.length&&(s<100||c<100)){let t=[];return new Promise((e,i)=>{for(let n of o){let l=new Image,r=new FileReader;r.onload=function(a){l.onload=function(){let d=document.createElement("canvas"),g=d.getContext("2d"),w=Math.round(l.width*(s/100)),v=Math.round(l.height*(s/100));d.width=w,d.height=v,g.drawImage(l,0,0,w,v),d.toBlob(m=>{let E=new File([m],n.name,{type:n.type});t.push(E),o.length===t.length&&e(t)},n.type,c/100)},l.src=a.target.result},r.onerror=a=>i(a),r.readAsDataURL(n)}})}else return Promise.resolve(o)},Nt=o=>{Object.assign([],o.childNodes).forEach(s=>o.removeChild(s))},Xt=o=>{o.getContext("2d",{willReadFrequently:!0}).clearRect(0,0,o.width,o.height)},ot=(o,s)=>{o.style.width=s.offsetWidth+"px",o.style.height=s.offsetHeight+"px"},Vt=(o=300)=>{o&&Kt()&&window?.navigator?.vibrate(o)},Kt=()=>{let o=navigator.userAgent||navigator.vendor||window.opera,s=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i,t=/^((?!chrome|android).)*safari/i;return!!(s.test(o)||c.test(o.substr(0,4)))&&!t.test(o)},Zt=(()=>{let s=class s{loadFiles(t=[],e,i){let n=new _;return kt(t,e,i).then(l=>{Promise.all(Object.assign([],l).map(r=>this.readAsDataURL(r))).then(r=>h(n,r)).catch(r=>h(n,null,r))}),n}loadFilesToScan(t=[],e,i,n){return Rt(t,e,i,n)}readAsDataURL(t){return new Promise((e,i)=>{let n=new FileReader;n.onload=()=>{let l={name:t.name,file:t,url:URL.createObjectURL(t)};e(l)},n.onerror=l=>i(l),n.readAsDataURL(t)})}};s.\u0275fac=function(e){return new(e||s)},s.\u0275prov=dt({token:s,factory:s.\u0275fac,providedIn:"root"});let o=s;return o})(),Jt=(o=new _,s)=>{let c=0,t=(e=!1)=>{let i=()=>{let r;try{let a=()=>{clearTimeout(r),Q()?setTimeout(()=>h(o,!0)):r=setTimeout(()=>a())};setTimeout(()=>a()),setTimeout(()=>clearTimeout(r),3e3)}catch{clearTimeout(r)}},n=document.querySelectorAll(`script[src="${B}"]`),l=document.querySelectorAll(`script[src="${Ht}"]`);if(n.length||l.length)i();else{let r=document.querySelectorAll(`script[src="${L}"]`);if(r.length===1)i();else if(r.forEach(a=>a.remove()),s){let a=s.createElement("script");s.setAttribute(a,"src",e?B:L),s.setAttribute(a,"type","text/javascript"),s.setAttribute(a,"async",""),s.appendChild(document.head,a),a.onload=()=>i(),a.onerror=()=>{c<2?(document.head.removeChild(a),t(!0)):h(o,!1,"Could not load script "+e?B:L)},c+=1}else{let a=document.createElement("script");a.setAttribute("src",e?B:L),a.setAttribute("type","text/javascript"),a.setAttribute("async",""),document.head.appendChild(a),a.onload=()=>i(),a.onerror=()=>{c<2?(document.head.removeChild(a),t(!0)):h(o,!1,"Could not load script "+e?B:L)},c+=1}}};return t(),o},Mt=(()=>{let s=class s{constructor(t,e){this.renderer=t,this.elementRef=e,this.event=new pt,this.src=D.src,this.fps=D.fps,this.vibrate=D.vibrate,this.decode=D.decode,this.isBeep=D.isBeep,this.config=D,this.constraints=D.constraints,this.canvasStyles=[rt,ct],this.isStart=!1,this.isPause=!1,this.isLoading=!1,this.isTorch=!1,this.data=new tt([]),this.devices=new tt([]),this.deviceIndexActive=0,this.dataForResize=[],this.ready=new _,this.STATUS={startON:()=>this.isStart=!0,pauseON:()=>this.isPause=!0,loadingON:()=>this.isLoading=!0,startOFF:()=>this.isStart=!1,pauseOFF:()=>this.isPause=!1,loadingOFF:()=>this.isLoading=!1,torchOFF:()=>this.isTorch=!1}}ngOnInit(){this.overrideConfig(),Jt(this.ready,this.renderer).subscribe(()=>{this.src&&this.loadImage(this.src),this.resize()})}start(t){let e=new _;return this.isStart?h(e,!1):this.safariWebRTC(e,t),e}stop(){this.STATUS.pauseOFF(),this.STATUS.startOFF(),this.STATUS.torchOFF(),this.STATUS.loadingOFF();let t=new _;try{clearTimeout(this.rAF_ID),this.video.nativeElement.srcObject.getTracks().forEach(e=>{e.stop(),h(t,!0)}),this.dataForResize=[],Xt(this.canvas.nativeElement),Nt(this.resultsPanel.nativeElement)}catch(e){h(t,!1,e)}return t}play(){let t=new _;return this.isPause?(this.video.nativeElement.play(),this.STATUS.pauseOFF(),this.requestAnimationFrame(),h(t,!0)):h(t,!1),t}pause(){let t=new _;return this.isStart?(clearTimeout(this.rAF_ID),this.video.nativeElement.pause(),this.STATUS.pauseON(),h(t,!0)):h(t,!1),t}playDevice(t,e=new _){let i=this.getConstraints(),n=this.isStart&&i?i.deviceId!==t:!0;switch(!0){case(t==="null"||t==="undefined"||!t):stop(),this.stop(),h(e,!1);break;case(t&&n):stop(),this.stop(),this.STATUS.loadingON(),this.deviceIndexActive=this.devices.value.findIndex(r=>r.deviceId===t);let l=J(j({},this.constraints),{audio:!1,video:j({deviceId:t},this.constraints.video)});navigator.mediaDevices.getUserMedia(l).then(r=>{this.video.nativeElement.srcObject=r,this.video.nativeElement.onloadedmetadata=()=>{this.video.nativeElement.play(),this.requestAnimationFrame(),h(e,!0),this.STATUS.startON(),this.STATUS.loadingOFF()}}).catch(r=>{this.eventEmit(!1),h(e,!1,r),this.STATUS.startOFF(),this.STATUS.loadingOFF()});break;default:h(e,!1),this.STATUS.loadingOFF();break}return e}loadImage(t){let e=new _;this.STATUS.startOFF(),this.STATUS.loadingON();let i=new Image;return i.setAttribute("crossOrigin","anonymous"),i.onload=()=>{Q()&&this.drawImage(i,n=>{h(e,n),this.STATUS.startOFF(),this.STATUS.loadingOFF()})},i.src=t,e}torcher(){let t=this.applyConstraints({advanced:[{torch:this.isTorch}]});return t.subscribe(()=>!1,()=>this.isTorch=!this.isTorch),t}applyConstraints(t,e=0){let i=new _;if(this.isStart){let n=this.video.nativeElement.srcObject;if(e!==null||e!==void 0||!Number.isNaN(e)){let l=n.getVideoTracks()[e];new window.ImageCapture(l).getPhotoCapabilities().then(()=>M(this,null,function*(){yield l.applyConstraints(t),ot(this.video.nativeElement,this.canvas.nativeElement),h(i,!0)})).catch(a=>{switch(a?.name){case"NotFoundError":case"DevicesNotFoundError":h(i,!1,"Required track is missing");break;case"NotReadableError":case"TrackStartError":h(i,!1,"Webcam or mic are already in use");break;case"OverconstrainedError":case"ConstraintNotSatisfiedError":h(i,!1,"Constraints can not be satisfied by avb. devices");break;case"NotAllowedError":case"PermissionDeniedError":h(i,!1,"Permission denied in browser");break;case"TypeError":h(i,!1,"Empty constraints object");break;default:h(i,!1,a);break}})}else h(i,!1,"Please check again deviceIndex")}else h(i,!1,"Please start the scanner");return i}getConstraints(t=0){return this.video.nativeElement.srcObject?.getVideoTracks()[t]?.getConstraints()}download(t=`ngx_scanner_qrcode_${Date.now()}.png`,e,i){let n=new _;return M(this,null,function*(){let l=yield bt(this.canvas.nativeElement),r=Wt(l,t);Rt([r],this.config,e,i,n).subscribe(a=>{a.forEach(d=>{if(d?.data?.length){let g=document.createElement("a");g.href=d.url,g.download=d.name,g.click(),g.remove()}})})}),n}resize(){window.addEventListener("resize",()=>{St(this.dataForResize,this.canvas.nativeElement,this.resultsPanel.nativeElement,this.canvasStyles),ot(this.video.nativeElement,this.canvas.nativeElement)})}overrideConfig(){"src"in this.config&&(this.src=this.config.src),"fps"in this.config&&(this.fps=this.config.fps),"vibrate"in this.config&&(this.vibrate=this.config.vibrate),"decode"in this.config&&(this.decode=this.config.decode),"isBeep"in this.config&&(this.isBeep=this.config.isBeep),"constraints"in this.config&&(this.constraints=Yt("constraints",this.config,Tt)),"canvasStyles"in this.config&&this.config?.canvasStyles?.length===2&&(this.canvasStyles=this.config.canvasStyles)}safariWebRTC(t,e){this.STATUS.startOFF(),this.STATUS.loadingON(),navigator.mediaDevices.getUserMedia(this.constraints).then(i=>{i.getTracks().forEach(n=>n.stop()),this.loadAllDevices(t,e)}).catch(i=>{h(t,!1,i),this.STATUS.startOFF(),this.STATUS.loadingOFF()})}loadAllDevices(t,e){navigator.mediaDevices.enumerateDevices().then(i=>{let n=i.filter(l=>l.kind=="videoinput");this.devices.next(n),n?.length>0?(h(t,n),e?e(n):this.playDevice(n[0].deviceId)):(h(t,!1,"No camera detected."),this.STATUS.startOFF(),this.STATUS.loadingOFF())}).catch(i=>{h(t,!1,i),this.STATUS.startOFF(),this.STATUS.loadingOFF()})}drawImage(t,e=()=>{}){return M(this,null,function*(){let i=this.canvas.nativeElement,n=i.getContext("2d",{willReadFrequently:!0});t instanceof HTMLImageElement&&(i.width=t.naturalWidth,i.height=t.naturalHeight,t.style.visibility="",this.video.nativeElement.style.visibility="hidden",this.renderer.setStyle(this.elementRef.nativeElement,"width",i.width+"px"),this.renderer.setStyle(this.elementRef.nativeElement,"maxWidth","100%"),this.renderer.setStyle(this.elementRef.nativeElement,"display","inline-block")),t instanceof HTMLVideoElement&&(i.width=t.videoWidth,i.height=t.videoHeight,t.style.visibility="",this.canvas.nativeElement.style.visibility="hidden"),ot(this.video.nativeElement,i),n.clearRect(0,0,i.width,i.height),n.drawImage(t,0,0,i.width,i.height);let l=n.getImageData(0,0,i.width,i.height),r=yield zbarWasm.scanImageData(l);if(r?.length){r.forEach(d=>d.value=d.decode(this.decode?.toLocaleLowerCase())),St(r,Object.freeze(this.canvas.nativeElement),this.resultsPanel.nativeElement,this.canvasStyles);let a=()=>{this.eventEmit(r),this.dataForResize=r};t instanceof HTMLImageElement&&(e(!0),a(),Vt(this.vibrate),at(this.isBeep)),t instanceof HTMLVideoElement&&(a(),Vt(this.vibrate),at(this.isBeep))}else e(!1),Nt(this.resultsPanel.nativeElement),this.dataForResize=[]})}eventEmit(t=!1){t!==!1&&this.data.next(t||[]),t!==!1&&this.event.emit(t||[])}requestAnimationFrame(t=100){try{clearTimeout(this.rAF_ID),this.rAF_ID=setTimeout(()=>{this.video.nativeElement.readyState===this.video.nativeElement.HAVE_ENOUGH_DATA&&(t=0,Q()&&this.drawImage(this.video.nativeElement),this.isStart&&!this.isPause&&this.requestAnimationFrame(t))},t||this.fps)}catch{clearTimeout(this.rAF_ID)}}get isReady(){return this.ready}ngOnDestroy(){this.pause()}};s.\u0275fac=function(e){return new(e||s)(V(mt),V(ut))},s.\u0275cmp=H({type:s,selectors:[["ngx-scanner-qrcode"]],viewQuery:function(e,i){if(e&1&&(T(yt,5),T(qt,5),T(jt,5)),e&2){let n;b(n=R())&&(i.video=n.first),b(n=R())&&(i.canvas=n.first),b(n=R())&&(i.resultsPanel=n.first)}},hostAttrs:[1,"ngx-scanner-qrcode"],inputs:{src:"src",fps:"fps",vibrate:"vibrate",decode:"decode",isBeep:"isBeep",config:"config",constraints:"constraints",canvasStyles:"canvasStyles"},outputs:{event:"event"},exportAs:["scanner"],decls:6,vars:0,consts:[["resultsPanel",""],["canvas",""],["video",""],[1,"origin-overlay"],[1,"origin-canvas"],["playsinline","",1,"origin-video"]],template:function(e,i){e&1&&gt(0,"div",3,0)(2,"canvas",4,1)(4,"video",5,2)},styles:[`.ngx-scanner-qrcode{display:block;position:relative}.origin-overlay{width:100%;position:absolute}.origin-overlay span{z-index:2;text-align:left;position:absolute}.origin-overlay .qrcode-polygon{z-index:1;position:absolute}.origin-canvas{width:100%;position:absolute}.origin-video{width:100%;background-color:#262626}.qrcode-tooltip{z-index:3;position:absolute}.qrcode-tooltip:hover .qrcode-tooltip-temp{display:block;position:absolute;cursor:copy}.qrcode-tooltip:hover .qrcode-tooltip-temp:active{color:#afafaf}.qrcode-tooltip .qrcode-tooltip-temp{bottom:0;left:50%;color:#fff;text-align:left;display:none;width:max-content;word-wrap:break-word;transform:translate(-50%);transform-style:preserve-3d;background-color:#000000d0;box-shadow:1px 1px 20px #000000e0}.qrcode-tooltip .qrcode-tooltip-temp svg{cursor:pointer}.qrcode-tooltip .qrcode-tooltip-temp svg rect{fill:none;stroke:#fff;stroke-linejoin:round;stroke-width:32px}.qrcode-tooltip .qrcode-tooltip-temp svg path{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px}.qrcode-tooltip .qrcode-tooltip-temp svg:active rect{stroke:#afafaf}.qrcode-tooltip .qrcode-tooltip-temp svg:active path{stroke:#afafaf}
`],encapsulation:2});let o=s;return o})();var Pt=(()=>{let s=class s{};s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=At({type:s}),s.\u0275inj=ht({providers:[Zt]});let o=s;return o})();var ee=["action"],S,Ut=(S=class{constructor(s,c){this.productService=s,this.basketService=c,this.config={constraints:{video:{width:window.innerWidth}}},this.scannedValue=""}ngAfterViewInit(){this.action.isReady.pipe(Ot(this)).subscribe(s=>{})}onEvent(s,c){console.log(s[0].value),this.scannedValue=s[0].value;let t=Number(this.scannedValue);this.productService.getProductById(t).subscribe({next:e=>{this.basketService.addProductItemToCurrentSellBasket(e,1)},error:e=>console.log(e)}),this.action.stop()}},S.\u0275fac=function(c){return new(c||S)(V(It),V(Ct))},S.\u0275cmp=H({type:S,selectors:[["app-barcode-scanner"]],viewQuery:function(c,t){if(c&1&&T(ee,5),c&2){let e;b(e=R())&&(t.action=e.first)}},standalone:!0,features:[_t],decls:9,vars:2,consts:[["action","scanner"],[1,"barcode-scanner"],[1,"barcode-scanner__title","u-margin-top-small"],[3,"event","config"],[1,"btn","btn--grad","btn--with-icon",3,"click"]],template:function(c,t){if(c&1){let e=vt();P(0,"div",1)(1,"h1",2),Y(2,"Qu\xE9t M\xE3 V\u1EA1ch"),U(),P(3,"ngx-scanner-qrcode",3,0),nt("event",function(n){et(e);let l=G(4);return it(t.onEvent(n,l))}),U(),P(5,"button",4),nt("click",function(){et(e);let n=G(4);return it(n.isStart?n.stop():n.start())}),P(6,"mat-icon"),Y(7,"add"),U(),Y(8),U()()}if(c&2){let e=G(4);st(3),ft("config",t.config),st(5),Et(" ",e.isStart?"D\u1EEBng Qu\xE9t M\xE3":"B\u1EAFt \u0110\u1EA7u Qu\xE9t M\xE3"," ")}},dependencies:[Pt,Mt,wt,xt,Ft],styles:[".barcode-scanner__title[_ngcontent-%COMP%]{line-height:2.4rem;background-color:#ea580c;color:#f8fafc;padding:1.6rem;text-transform:uppercase;letter-spacing:1.3px}button[_ngcontent-%COMP%]{margin-top:10px}"]}),S);Ut=lt([Dt()],Ut);export{Ut as a};