"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[474],{4785:(Y,L,o)=>{o.d(L,{i3:()=>P,Iq:()=>C});var s=o(8583),u=o(7716);class T{constructor(l,c){this._document=c;const f=this._textarea=this._document.createElement("textarea"),h=f.style;h.position="fixed",h.top=h.opacity="0",h.left="-999em",f.setAttribute("aria-hidden","true"),f.value=l,this._document.body.appendChild(f)}copy(){const l=this._textarea;let c=!1;try{if(l){const f=this._document.activeElement;l.select(),l.setSelectionRange(0,l.value.length),c=this._document.execCommand("copy"),f&&f.focus()}}catch(f){}return c}destroy(){const l=this._textarea;l&&(l.parentNode&&l.parentNode.removeChild(l),this._textarea=void 0)}}let t=(()=>{class m{constructor(c){this._document=c}copy(c){const f=this.beginCopy(c),h=f.copy();return f.destroy(),h}beginCopy(c){return new T(c,this._document)}}return m.\u0275fac=function(c){return new(c||m)(u.LFG(s.K0))},m.\u0275prov=u.Yz7({factory:function(){return new m(u.LFG(s.K0))},token:m,providedIn:"root"}),m})();const b=new u.OlP("CDK_COPY_TO_CLIPBOARD_CONFIG");let P=(()=>{class m{constructor(c,f,h){this._clipboard=c,this._ngZone=f,this.text="",this.attempts=1,this.copied=new u.vpe,this._pending=new Set,h&&null!=h.attempts&&(this.attempts=h.attempts)}copy(c=this.attempts){if(c>1){let f=c;const h=this._clipboard.beginCopy(this.text);this._pending.add(h);const A=()=>{const y=h.copy();y||!--f||this._destroyed?(this._currentTimeout=null,this._pending.delete(h),h.destroy(),this.copied.emit(y)):this._currentTimeout=this._ngZone.runOutsideAngular(()=>setTimeout(A,1))};A()}else this.copied.emit(this._clipboard.copy(this.text))}ngOnDestroy(){this._currentTimeout&&clearTimeout(this._currentTimeout),this._pending.forEach(c=>c.destroy()),this._pending.clear(),this._destroyed=!0}}return m.\u0275fac=function(c){return new(c||m)(u.Y36(t),u.Y36(u.R0b),u.Y36(b,8))},m.\u0275dir=u.lG2({type:m,selectors:[["","cdkCopyToClipboard",""]],hostBindings:function(c,f){1&c&&u.NdJ("click",function(){return f.copy()})},inputs:{text:["cdkCopyToClipboard","text"],attempts:["cdkCopyToClipboardAttempts","attempts"]},outputs:{copied:"cdkCopyToClipboardCopied"}}),m})(),C=(()=>{class m{}return m.\u0275fac=function(c){return new(c||m)},m.\u0275mod=u.oAB({type:m}),m.\u0275inj=u.cJS({}),m})()},5072:(Y,L,o)=>{o.d(L,{Yg:()=>j,u3:()=>Z});var s=o(7716),u=o(9490),T=o(9765),t=o(739),I=o(8071),b=o(7574),P=o(5257),C=o(3653),m=o(4395),l=o(8002),c=o(9761),f=o(6782),h=o(521);const y=new Set;let k,w=(()=>{class g{constructor(E){this._platform=E,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):F}matchMedia(E){return this._platform.WEBKIT&&function(g){if(!y.has(g))try{k||(k=document.createElement("style"),k.setAttribute("type","text/css"),document.head.appendChild(k)),k.sheet&&(k.sheet.insertRule(`@media ${g} {.fx-query-test{ }}`,0),y.add(g))}catch(O){console.error(O)}}(E),this._matchMedia(E)}}return g.\u0275fac=function(E){return new(E||g)(s.LFG(h.t4))},g.\u0275prov=s.Yz7({factory:function(){return new g(s.LFG(h.t4))},token:g,providedIn:"root"}),g})();function F(g){return{matches:"all"===g||""===g,media:g,addListener:()=>{},removeListener:()=>{}}}let j=(()=>{class g{constructor(E,S){this._mediaMatcher=E,this._zone=S,this._queries=new Map,this._destroySubject=new T.xQ}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(E){return K((0,u.Eq)(E)).some(p=>this._registerQuery(p).mql.matches)}observe(E){const p=K((0,u.Eq)(E)).map(e=>this._registerQuery(e).observable);let v=(0,t.aj)(p);return v=(0,I.z)(v.pipe((0,P.q)(1)),v.pipe((0,C.T)(1),(0,m.b)(0))),v.pipe((0,l.U)(e=>{const a={matches:!1,breakpoints:{}};return e.forEach(({matches:d,query:M})=>{a.matches=a.matches||d,a.breakpoints[M]=d}),a}))}_registerQuery(E){if(this._queries.has(E))return this._queries.get(E);const S=this._mediaMatcher.matchMedia(E),v={observable:new b.y(e=>{const a=d=>this._zone.run(()=>e.next(d));return S.addListener(a),()=>{S.removeListener(a)}}).pipe((0,c.O)(S),(0,l.U)(({matches:e})=>({query:E,matches:e})),(0,f.R)(this._destroySubject)),mql:S};return this._queries.set(E,v),v}}return g.\u0275fac=function(E){return new(E||g)(s.LFG(w),s.LFG(s.R0b))},g.\u0275prov=s.Yz7({factory:function(){return new g(s.LFG(w),s.LFG(s.R0b))},token:g,providedIn:"root"}),g})();function K(g){return g.map(O=>O.split(",")).reduce((O,E)=>O.concat(E)).map(O=>O.trim())}const Z={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"}},7001:(Y,L,o)=>{o.d(L,{ux:()=>S,ZX:()=>g});var s=o(625),u=o(7636),T=o(8583),t=o(7716),I=o(2458),b=o(1095),P=o(9765),C=o(5257),m=o(6782),l=o(7238),c=o(9238),f=o(5072),h=o(521);function A(p,v){if(1&p){const e=t.EpF();t.TgZ(0,"div",1),t.TgZ(1,"button",2),t.NdJ("click",function(){return t.CHM(e),t.oxw().action()}),t._uU(2),t.qZA(),t.qZA()}if(2&p){const e=t.oxw();t.xp6(2),t.Oqu(e.data.action)}}function y(p,v){}const k=new t.OlP("MatSnackBarData");class w{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}}const N=Math.pow(2,31)-1;class F{constructor(v,e){this._overlayRef=e,this._afterDismissed=new P.xQ,this._afterOpened=new P.xQ,this._onAction=new P.xQ,this._dismissedByAction=!1,this.containerInstance=v,this.onAction().subscribe(()=>this.dismiss()),v._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(v){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(v,N))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}}let j=(()=>{class p{constructor(e,a){this.snackBarRef=e,this.data=a}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}}return p.\u0275fac=function(e){return new(e||p)(t.Y36(F),t.Y36(k))},p.\u0275cmp=t.Xpm({type:p,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-simple-snackbar"],decls:3,vars:2,consts:[["class","mat-simple-snackbar-action",4,"ngIf"],[1,"mat-simple-snackbar-action"],["mat-button","",3,"click"]],template:function(e,a){1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA(),t.YNc(2,A,3,1,"div",0)),2&e&&(t.xp6(1),t.Oqu(a.data.message),t.xp6(1),t.Q6J("ngIf",a.hasAction))},directives:[T.O5,b.lW],styles:[".mat-simple-snackbar{display:flex;justify-content:space-between;align-items:center;line-height:20px;opacity:1}.mat-simple-snackbar-action{flex-shrink:0;margin:-8px -8px -8px 8px}.mat-simple-snackbar-action button{max-height:36px;min-width:0}[dir=rtl] .mat-simple-snackbar-action{margin-left:-8px;margin-right:8px}\n"],encapsulation:2,changeDetection:0}),p})();const K={snackBarState:(0,l.X$)("state",[(0,l.SB)("void, hidden",(0,l.oB)({transform:"scale(0.8)",opacity:0})),(0,l.SB)("visible",(0,l.oB)({transform:"scale(1)",opacity:1})),(0,l.eR)("* => visible",(0,l.jt)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,l.eR)("* => void, * => hidden",(0,l.jt)("75ms cubic-bezier(0.4, 0.0, 1, 1)",(0,l.oB)({opacity:0})))])};let Z=(()=>{class p extends u.en{constructor(e,a,d,M,D){super(),this._ngZone=e,this._elementRef=a,this._changeDetectorRef=d,this._platform=M,this.snackBarConfig=D,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new P.xQ,this._onExit=new P.xQ,this._onEnter=new P.xQ,this._animationState="void",this.attachDomPortal=_=>(this._assertNotAttached(),this._applySnackBarClasses(),this._portalOutlet.attachDomPortal(_)),this._live="assertive"!==D.politeness||D.announcementMessage?"off"===D.politeness?"off":"polite":"assertive",this._platform.FIREFOX&&("polite"===this._live&&(this._role="status"),"assertive"===this._live&&(this._role="alert"))}attachComponentPortal(e){return this._assertNotAttached(),this._applySnackBarClasses(),this._portalOutlet.attachComponentPortal(e)}attachTemplatePortal(e){return this._assertNotAttached(),this._applySnackBarClasses(),this._portalOutlet.attachTemplatePortal(e)}onAnimationEnd(e){const{fromState:a,toState:d}=e;if(("void"===d&&"void"!==a||"hidden"===d)&&this._completeExit(),"visible"===d){const M=this._onEnter;this._ngZone.run(()=>{M.next(),M.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._animationState="hidden",this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._onExit}ngOnDestroy(){this._destroyed=!0,this._completeExit()}_completeExit(){this._ngZone.onMicrotaskEmpty.pipe((0,C.q)(1)).subscribe(()=>{this._onExit.next(),this._onExit.complete()})}_applySnackBarClasses(){const e=this._elementRef.nativeElement,a=this.snackBarConfig.panelClass;a&&(Array.isArray(a)?a.forEach(d=>e.classList.add(d)):e.classList.add(a)),"center"===this.snackBarConfig.horizontalPosition&&e.classList.add("mat-snack-bar-center"),"top"===this.snackBarConfig.verticalPosition&&e.classList.add("mat-snack-bar-top")}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{const e=this._elementRef.nativeElement.querySelector("[aria-hidden]"),a=this._elementRef.nativeElement.querySelector("[aria-live]");if(e&&a){let d=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)&&(d=document.activeElement),e.removeAttribute("aria-hidden"),a.appendChild(e),null==d||d.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}}return p.\u0275fac=function(e){return new(e||p)(t.Y36(t.R0b),t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(h.t4),t.Y36(w))},p.\u0275cmp=t.Xpm({type:p,selectors:[["snack-bar-container"]],viewQuery:function(e,a){if(1&e&&t.Gf(u.Pl,7),2&e){let d;t.iGM(d=t.CRH())&&(a._portalOutlet=d.first)}},hostAttrs:[1,"mat-snack-bar-container"],hostVars:1,hostBindings:function(e,a){1&e&&t.WFA("@state.done",function(M){return a.onAnimationEnd(M)}),2&e&&t.d8E("@state",a._animationState)},features:[t.qOj],decls:3,vars:2,consts:[["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(e,a){1&e&&(t.TgZ(0,"div",0),t.YNc(1,y,0,0,"ng-template",1),t.qZA(),t._UZ(2,"div")),2&e&&(t.xp6(2),t.uIk("aria-live",a._live)("role",a._role))},directives:[u.Pl],styles:[".mat-snack-bar-container{border-radius:4px;box-sizing:border-box;display:block;margin:24px;max-width:33vw;min-width:344px;padding:14px 16px;min-height:48px;transform-origin:center}.cdk-high-contrast-active .mat-snack-bar-container{border:solid 1px}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:8px;max-width:100%;min-width:0;width:100%}\n"],encapsulation:2,data:{animation:[K.snackBarState]}}),p})(),g=(()=>{class p{}return p.\u0275fac=function(e){return new(e||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[[s.U8,u.eL,T.ez,b.ot,I.BQ],I.BQ]}),p})();const O=new t.OlP("mat-snack-bar-default-options",{providedIn:"root",factory:function(){return new w}});let S=(()=>{class p{constructor(e,a,d,M,D,_){this._overlay=e,this._live=a,this._injector=d,this._breakpointObserver=M,this._parentSnackBar=D,this._defaultConfig=_,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=j,this.snackBarContainerComponent=Z,this.handsetCssClass="mat-snack-bar-handset"}get _openedSnackBarRef(){const e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}openFromComponent(e,a){return this._attach(e,a)}openFromTemplate(e,a){return this._attach(e,a)}open(e,a="",d){const M=Object.assign(Object.assign({},this._defaultConfig),d);return M.data={message:e,action:a},M.announcementMessage===e&&(M.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,M)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,a){const M=t.zs3.create({parent:a&&a.viewContainerRef&&a.viewContainerRef.injector||this._injector,providers:[{provide:w,useValue:a}]}),D=new u.C5(this.snackBarContainerComponent,a.viewContainerRef,M),_=e.attach(D);return _.instance.snackBarConfig=a,_.instance}_attach(e,a){const d=Object.assign(Object.assign(Object.assign({},new w),this._defaultConfig),a),M=this._createOverlay(d),D=this._attachSnackBarContainer(M,d),_=new F(D,M);if(e instanceof t.Rgc){const x=new u.UE(e,null,{$implicit:d.data,snackBarRef:_});_.instance=D.attachTemplatePortal(x)}else{const x=this._createInjector(d,_),i=new u.C5(e,void 0,x),n=D.attachComponentPortal(i);_.instance=n.instance}return this._breakpointObserver.observe(f.u3.HandsetPortrait).pipe((0,m.R)(M.detachments())).subscribe(x=>{const i=M.overlayElement.classList;x.matches?i.add(this.handsetCssClass):i.remove(this.handsetCssClass)}),d.announcementMessage&&D._onAnnounce.subscribe(()=>{this._live.announce(d.announcementMessage,d.politeness)}),this._animateSnackBar(_,d),this._openedSnackBarRef=_,this._openedSnackBarRef}_animateSnackBar(e,a){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),a.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter(),a.duration&&a.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(a.duration))}_createOverlay(e){const a=new s.X_;a.direction=e.direction;let d=this._overlay.position().global();const M="rtl"===e.direction,D="left"===e.horizontalPosition||"start"===e.horizontalPosition&&!M||"end"===e.horizontalPosition&&M,_=!D&&"center"!==e.horizontalPosition;return D?d.left("0"):_?d.right("0"):d.centerHorizontally(),"top"===e.verticalPosition?d.top("0"):d.bottom("0"),a.positionStrategy=d,this._overlay.create(a)}_createInjector(e,a){return t.zs3.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:F,useValue:a},{provide:k,useValue:e.data}]})}}return p.\u0275fac=function(e){return new(e||p)(t.LFG(s.aV),t.LFG(c.Kd),t.LFG(t.zs3),t.LFG(f.Yg),t.LFG(p,12),t.LFG(O))},p.\u0275prov=t.Yz7({factory:function(){return new p(t.LFG(s.aV),t.LFG(c.Kd),t.LFG(t.gxx),t.LFG(f.Yg),t.LFG(p,12),t.LFG(O))},token:p,providedIn:g}),p})()},1436:(Y,L,o)=>{o.d(L,{gM:()=>a,AV:()=>D});var s=o(625),u=o(9238),T=o(8583),t=o(7716),I=o(2458),b=o(9243),P=o(9490),C=o(6461),m=o(5072),l=o(521),c=o(7636),f=o(9765),h=o(6782),A=o(5257),y=o(7238),k=o(946);const w={tooltipState:(0,y.X$)("state",[(0,y.SB)("initial, void, hidden",(0,y.oB)({opacity:0,transform:"scale(0)"})),(0,y.SB)("visible",(0,y.oB)({transform:"scale(1)"})),(0,y.eR)("* => visible",(0,y.jt)("200ms cubic-bezier(0, 0, 0.2, 1)",(0,y.F4)([(0,y.oB)({opacity:0,transform:"scale(0)",offset:0}),(0,y.oB)({opacity:.5,transform:"scale(0.99)",offset:.5}),(0,y.oB)({opacity:1,transform:"scale(1)",offset:1})]))),(0,y.eR)("* => hidden",(0,y.jt)("100ms cubic-bezier(0, 0, 0.2, 1)",(0,y.oB)({opacity:0})))])},j="tooltip-panel",K=(0,l.i$)({passive:!0}),O=new t.OlP("mat-tooltip-scroll-strategy"),S={provide:O,deps:[s.aV],useFactory:function(_){return()=>_.scrollStrategies.reposition({scrollThrottle:20})}},p=new t.OlP("mat-tooltip-default-options",{providedIn:"root",factory:function(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}});let e=(()=>{class _{constructor(i,n,r,R,B,W,G,Q,V,z,U,X){this._overlay=i,this._elementRef=n,this._scrollDispatcher=r,this._viewContainerRef=R,this._ngZone=B,this._platform=W,this._ariaDescriber=G,this._focusMonitor=Q,this._dir=z,this._defaultOptions=U,this._position="below",this._disabled=!1,this._viewInitialized=!1,this._pointerExitEventsInitialized=!1,this._viewportMargin=8,this._cssClassPrefix="mat",this.showDelay=this._defaultOptions.showDelay,this.hideDelay=this._defaultOptions.hideDelay,this.touchGestures="auto",this._message="",this._passiveListeners=[],this._destroyed=new f.xQ,this._handleKeydown=H=>{this._isTooltipVisible()&&H.keyCode===C.hY&&!(0,C.Vb)(H)&&(H.preventDefault(),H.stopPropagation(),this._ngZone.run(()=>this.hide(0)))},this._scrollStrategy=V,this._document=X,U&&(U.position&&(this.position=U.position),U.touchGestures&&(this.touchGestures=U.touchGestures)),z.change.pipe((0,h.R)(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)}),B.runOutsideAngular(()=>{n.nativeElement.addEventListener("keydown",this._handleKeydown)})}get position(){return this._position}set position(i){var n;i!==this._position&&(this._position=i,this._overlayRef&&(this._updatePosition(this._overlayRef),null===(n=this._tooltipInstance)||void 0===n||n.show(0),this._overlayRef.updatePosition()))}get disabled(){return this._disabled}set disabled(i){this._disabled=(0,P.Ig)(i),this._disabled?this.hide(0):this._setupPointerEnterEventsIfNeeded()}get message(){return this._message}set message(i){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this._message,"tooltip"),this._message=null!=i?String(i).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage(),this._ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")})}))}get tooltipClass(){return this._tooltipClass}set tooltipClass(i){this._tooltipClass=i,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe((0,h.R)(this._destroyed)).subscribe(i=>{i?"keyboard"===i&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){const i=this._elementRef.nativeElement;clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),i.removeEventListener("keydown",this._handleKeydown),this._passiveListeners.forEach(([n,r])=>{i.removeEventListener(n,r,K)}),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._ariaDescriber.removeDescription(i,this.message,"tooltip"),this._focusMonitor.stopMonitoring(i)}show(i=this.showDelay){if(this.disabled||!this.message||this._isTooltipVisible()&&!this._tooltipInstance._showTimeoutId&&!this._tooltipInstance._hideTimeoutId)return;const n=this._createOverlay();this._detach(),this._portal=this._portal||new c.C5(this._tooltipComponent,this._viewContainerRef),this._tooltipInstance=n.attach(this._portal).instance,this._tooltipInstance.afterHidden().pipe((0,h.R)(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),this._tooltipInstance.show(i)}hide(i=this.hideDelay){this._tooltipInstance&&this._tooltipInstance.hide(i)}toggle(){this._isTooltipVisible()?this.hide():this.show()}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(){if(this._overlayRef)return this._overlayRef;const i=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),n=this._overlay.position().flexibleConnectedTo(this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i);return n.positionChanges.pipe((0,h.R)(this._destroyed)).subscribe(r=>{this._updateCurrentPositionClass(r.connectionPair),this._tooltipInstance&&r.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:n,panelClass:`${this._cssClassPrefix}-${j}`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe((0,h.R)(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe((0,h.R)(this._destroyed)).subscribe(()=>{var r;return null===(r=this._tooltipInstance)||void 0===r?void 0:r._handleBodyInteraction()}),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(i){const n=i.getConfig().positionStrategy,r=this._getOrigin(),R=this._getOverlayPosition();n.withPositions([this._addOffset(Object.assign(Object.assign({},r.main),R.main)),this._addOffset(Object.assign(Object.assign({},r.fallback),R.fallback))])}_addOffset(i){return i}_getOrigin(){const i=!this._dir||"ltr"==this._dir.value,n=this.position;let r;"above"==n||"below"==n?r={originX:"center",originY:"above"==n?"top":"bottom"}:"before"==n||"left"==n&&i||"right"==n&&!i?r={originX:"start",originY:"center"}:("after"==n||"right"==n&&i||"left"==n&&!i)&&(r={originX:"end",originY:"center"});const{x:R,y:B}=this._invertPosition(r.originX,r.originY);return{main:r,fallback:{originX:R,originY:B}}}_getOverlayPosition(){const i=!this._dir||"ltr"==this._dir.value,n=this.position;let r;"above"==n?r={overlayX:"center",overlayY:"bottom"}:"below"==n?r={overlayX:"center",overlayY:"top"}:"before"==n||"left"==n&&i||"right"==n&&!i?r={overlayX:"end",overlayY:"center"}:("after"==n||"right"==n&&i||"left"==n&&!i)&&(r={overlayX:"start",overlayY:"center"});const{x:R,y:B}=this._invertPosition(r.overlayX,r.overlayY);return{main:r,fallback:{overlayX:R,overlayY:B}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),this._ngZone.onMicrotaskEmpty.pipe((0,A.q)(1),(0,h.R)(this._destroyed)).subscribe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}))}_setTooltipClass(i){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=i,this._tooltipInstance._markForCheck())}_invertPosition(i,n){return"above"===this.position||"below"===this.position?"top"===n?n="bottom":"bottom"===n&&(n="top"):"end"===i?i="start":"start"===i&&(i="end"),{x:i,y:n}}_updateCurrentPositionClass(i){const{overlayY:n,originX:r,originY:R}=i;let B;if(B="center"===n?this._dir&&"rtl"===this._dir.value?"end"===r?"left":"right":"start"===r?"left":"right":"bottom"===n&&"top"===R?"above":"below",B!==this._currentPosition){const W=this._overlayRef;if(W){const G=`${this._cssClassPrefix}-${j}-`;W.removePanelClass(G+this._currentPosition),W.addPanelClass(G+B)}this._currentPosition=B}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._passiveListeners.length||(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",()=>{this._setupPointerExitEventsIfNeeded(),this.show()}]):"off"!==this.touchGestures&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",()=>{this._setupPointerExitEventsIfNeeded(),clearTimeout(this._touchstartTimeout),this._touchstartTimeout=setTimeout(()=>this.show(),500)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;const i=[];if(this._platformSupportsMouseEvents())i.push(["mouseleave",()=>this.hide()],["wheel",n=>this._wheelListener(n)]);else if("off"!==this.touchGestures){this._disableNativeGesturesIfNecessary();const n=()=>{clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions.touchendHideDelay)};i.push(["touchend",n],["touchcancel",n])}this._addListeners(i),this._passiveListeners.push(...i)}_addListeners(i){i.forEach(([n,r])=>{this._elementRef.nativeElement.addEventListener(n,r,K)})}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(i){if(this._isTooltipVisible()){const n=this._document.elementFromPoint(i.clientX,i.clientY),r=this._elementRef.nativeElement;n!==r&&!r.contains(n)&&this.hide()}}_disableNativeGesturesIfNecessary(){const i=this.touchGestures;if("off"!==i){const n=this._elementRef.nativeElement,r=n.style;("on"===i||"INPUT"!==n.nodeName&&"TEXTAREA"!==n.nodeName)&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),("on"===i||!n.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent"}}}return _.\u0275fac=function(i){return new(i||_)(t.Y36(s.aV),t.Y36(t.SBq),t.Y36(b.mF),t.Y36(t.s_b),t.Y36(t.R0b),t.Y36(l.t4),t.Y36(u.$s),t.Y36(u.tE),t.Y36(void 0),t.Y36(k.Is),t.Y36(void 0),t.Y36(T.K0))},_.\u0275dir=t.lG2({type:_,inputs:{showDelay:["matTooltipShowDelay","showDelay"],hideDelay:["matTooltipHideDelay","hideDelay"],touchGestures:["matTooltipTouchGestures","touchGestures"],position:["matTooltipPosition","position"],disabled:["matTooltipDisabled","disabled"],message:["matTooltip","message"],tooltipClass:["matTooltipClass","tooltipClass"]}}),_})(),a=(()=>{class _ extends e{constructor(i,n,r,R,B,W,G,Q,V,z,U,X){super(i,n,r,R,B,W,G,Q,V,z,U,X),this._tooltipComponent=M}}return _.\u0275fac=function(i){return new(i||_)(t.Y36(s.aV),t.Y36(t.SBq),t.Y36(b.mF),t.Y36(t.s_b),t.Y36(t.R0b),t.Y36(l.t4),t.Y36(u.$s),t.Y36(u.tE),t.Y36(O),t.Y36(k.Is,8),t.Y36(p,8),t.Y36(T.K0))},_.\u0275dir=t.lG2({type:_,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-tooltip-trigger"],exportAs:["matTooltip"],features:[t.qOj]}),_})(),d=(()=>{class _{constructor(i){this._changeDetectorRef=i,this._visibility="initial",this._closeOnInteraction=!1,this._onHide=new f.xQ}show(i){clearTimeout(this._hideTimeoutId),this._closeOnInteraction=!0,this._showTimeoutId=setTimeout(()=>{this._visibility="visible",this._showTimeoutId=void 0,this._onShow(),this._markForCheck()},i)}hide(i){clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._visibility="hidden",this._hideTimeoutId=void 0,this._markForCheck()},i)}afterHidden(){return this._onHide}isVisible(){return"visible"===this._visibility}ngOnDestroy(){clearTimeout(this._showTimeoutId),clearTimeout(this._hideTimeoutId),this._onHide.complete()}_animationStart(){this._closeOnInteraction=!1}_animationDone(i){const n=i.toState;"hidden"===n&&!this.isVisible()&&this._onHide.next(),("visible"===n||"hidden"===n)&&(this._closeOnInteraction=!0)}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_onShow(){}}return _.\u0275fac=function(i){return new(i||_)(t.Y36(t.sBO))},_.\u0275dir=t.lG2({type:_}),_})(),M=(()=>{class _ extends d{constructor(i,n){super(i),this._breakpointObserver=n,this._isHandset=this._breakpointObserver.observe(m.u3.Handset)}}return _.\u0275fac=function(i){return new(i||_)(t.Y36(t.sBO),t.Y36(m.Yg))},_.\u0275cmp=t.Xpm({type:_,selectors:[["mat-tooltip-component"]],hostAttrs:["aria-hidden","true"],hostVars:2,hostBindings:function(i,n){2&i&&t.Udp("zoom","visible"===n._visibility?1:null)},features:[t.qOj],decls:3,vars:7,consts:[[1,"mat-tooltip",3,"ngClass"]],template:function(i,n){if(1&i&&(t.TgZ(0,"div",0),t.NdJ("@state.start",function(){return n._animationStart()})("@state.done",function(R){return n._animationDone(R)}),t.ALo(1,"async"),t._uU(2),t.qZA()),2&i){let r;t.ekj("mat-tooltip-handset",null==(r=t.lcZ(1,5,n._isHandset))?null:r.matches),t.Q6J("ngClass",n.tooltipClass)("@state",n._visibility),t.xp6(2),t.Oqu(n.message)}},directives:[T.mk],pipes:[T.Ov],styles:[".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"],encapsulation:2,data:{animation:[w.tooltipState]},changeDetection:0}),_})(),D=(()=>{class _{}return _.\u0275fac=function(i){return new(i||_)},_.\u0275mod=t.oAB({type:_}),_.\u0275inj=t.cJS({providers:[S],imports:[[u.rt,T.ez,s.U8,I.BQ],I.BQ,b.ZD]}),_})()},9811:(Y,L,o)=>{o.d(L,{j:()=>l});var s=o(7716),u=o(7001),T=o(6627),t=o(8583),I=o(1436),b=o(4785);function P(c,f){if(1&c){const h=s.EpF();s.TgZ(0,"div",6),s.NdJ("click",function(){return s.CHM(h),s.oxw().showCopySnack()}),s._uU(1),s.qZA()}if(2&c){const h=s.oxw();s.Q6J("cdkCopyToClipboard",h.value),s.xp6(1),s.hij(" ",h.value," ")}}function C(c,f){1&c&&s._UZ(0,"div",7)}function m(c,f){if(1&c){const h=s.EpF();s.TgZ(0,"mat-icon",8),s.NdJ("click",function(){return s.CHM(h),s.oxw().showCopySnack()}),s._uU(1," content_copy "),s.qZA()}if(2&c){const h=s.oxw();s.Q6J("cdkCopyToClipboard",h.value)}}let l=(()=>{class c{constructor(h){this.snackBar=h,this.canCopy=!0}ngOnInit(){console.log(this.value)}showCopySnack(){this.snackBar.open(`${this.label} zkop\xedrov\xe1n`,"OK",{duration:1500})}}return c.\u0275fac=function(h){return new(h||c)(s.Y36(u.ux))},c.\u0275cmp=s.Xpm({type:c,selectors:[["app-attribute"]],inputs:{value:"value",label:"label",icon:"icon",canCopy:"canCopy"},decls:9,vars:5,consts:[[1,"flex-row","team-attribute"],[1,"material-icons-outlined","attr-ico"],[1,"flex-container"],["class","flex-row attribute-value","matTooltip","Zkop\xedrovat",3,"cdkCopyToClipboard","click",4,"ngIf"],["class","block-copy",4,"ngIf"],["matTooltip","Zkop\xedrovat","matRipple","","color","accent","class","material-icons-outlined copy",3,"cdkCopyToClipboard","click",4,"ngIf"],["matTooltip","Zkop\xedrovat",1,"flex-row","attribute-value",3,"cdkCopyToClipboard","click"],[1,"block-copy"],["matTooltip","Zkop\xedrovat","matRipple","","color","accent",1,"material-icons-outlined","copy",3,"cdkCopyToClipboard","click"]],template:function(h,A){1&h&&(s.TgZ(0,"div",0),s.TgZ(1,"mat-icon",1),s._uU(2),s.qZA(),s.TgZ(3,"div",2),s.TgZ(4,"div"),s._uU(5),s.qZA(),s.YNc(6,P,2,2,"div",3),s.YNc(7,C,1,0,"div",4),s.qZA(),s.YNc(8,m,2,1,"mat-icon",5),s.qZA()),2&h&&(s.xp6(2),s.hij(" ",A.icon," "),s.xp6(3),s.hij(" ",A.label," "),s.xp6(1),s.Q6J("ngIf",A.value),s.xp6(1),s.Q6J("ngIf",!A.canCopy),s.xp6(1),s.Q6J("ngIf",A.canCopy))},directives:[T.Hw,t.O5,I.gM,b.i3],styles:[".attribute-value[_ngcontent-%COMP%]{cursor:pointer;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;min-width:0;flex:1}@media screen and (max-width: 560px){.attribute-value[_ngcontent-%COMP%]{max-width:160px}}.block-copy[_ngcontent-%COMP%]{position:absolute;top:0;right:0;bottom:0;left:0}.team-attribute[_ngcontent-%COMP%]{align-items:center;position:relative}.team-attribute[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:32px;height:32px}.attr-ico[_ngcontent-%COMP%]{margin-right:24px;font-size:32px}.copy[_ngcontent-%COMP%]{align-self:center;cursor:pointer;padding:8px;border-radius:50%;box-sizing:border-box;font-size:16px!important;position:absolute;right:0;top:0;margin:4px}[_nghost-%COMP%]:not(:last-child)   .team-attribute[_ngcontent-%COMP%]{margin-bottom:32px}",".flex-container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.flex-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.flex-item[_ngcontent-%COMP%]{flex:1 1 0;border-radius:5px;box-sizing:border-box;border:2px solid #fafafa;margin:8px;padding:24px 32px}.flex-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}@media screen and (max-width: 560px){.flex-item[_ngcontent-%COMP%]{min-width:100%;margin:8px 0}.flex-row[_ngcontent-%COMP%]{flex-wrap:wrap}}"]}),c})()},1347:(Y,L,o)=>{o.d(L,{t:()=>P});var s=o(8583),u=o(6627),T=o(4785),t=o(1436),I=o(7001),b=o(7716);let P=(()=>{class C{}return C.\u0275fac=function(l){return new(l||C)},C.\u0275mod=b.oAB({type:C}),C.\u0275inj=b.cJS({imports:[[s.ez,u.Ps,T.Iq,t.AV,I.ZX]]}),C})()},1397:(Y,L,o)=>{o.d(L,{h:()=>P});var s=o(205),u=o(2340),T=o(5304),t=o(7716),I=o(1841),b=o(4471);let P=(()=>{class C{constructor(l,c){this.http=l,this.loadingService=c}getGames(){return this.loadingService.startLoading(this.http.get(u.N.backendUrl+"/api/games").pipe((0,T.K)(this.handleError)))}getGameById(l){return this.loadingService.startLoading(this.http.get(`${u.N.backendUrl}/api/game/${l}`).pipe((0,T.K)(this.handleError)))}handleError(l){return u.N.production||console.error(l),(0,s._)(l)}}return C.\u0275fac=function(l){return new(l||C)(t.LFG(I.eN),t.LFG(b.b))},C.\u0275prov=t.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"}),C})()}}]);