"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[349],{349:(kt,I,l)=>{l.r(I),l.d(I,{CipherModule:()=>Ot});var d=l(8583),z=l(5917),U=l(323),_=l(3190),J=l(6888),Y=l(3342),c=l(2238),t=l(7716),x=l(1095),f=l(6627),M=l(6715);function j(e,a){if(1&e&&t._UZ(0,"img",9),2&e){const i=t.oxw();t.Q6J("src",i.data.img,t.LSH)}}function V(e,a){if(1&e&&t._UZ(0,"markdown",10),2&e){const i=t.oxw();t.Q6J("data",i.data.msg)}}let S=(()=>{class e{constructor(i){this.data=i}ngOnInit(){}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(c.WI))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-hint-dialog"]],decls:14,vars:3,consts:[["mat-dialog-title",""],[1,"mat-typography"],["alt","obr\xe1zek","class","image",3,"src",4,"ngIf"],[3,"data",4,"ngIf"],["target","_blank","tabindex","-1",2,"display","none",3,"href"],["fileLink",""],["mat-raised-button","","color","primary","tabindex","-1",1,"download",3,"click"],["align","end"],["mat-button","","mat-dialog-close","","tabindex","0","color","accent"],["alt","obr\xe1zek",1,"image",3,"src"],[3,"data"]],template:function(i,s){if(1&i){const n=t.EpF();t.TgZ(0,"h2",0),t._uU(1," N\xe1pov\u011bda "),t.qZA(),t.TgZ(2,"mat-dialog-content",1),t.YNc(3,j,1,1,"img",2),t.YNc(4,V,1,1,"markdown",3),t._UZ(5,"a",4,5),t.TgZ(7,"button",6),t.NdJ("click",function(){return t.CHM(n),t.MAs(6).click()}),t.TgZ(8,"mat-icon"),t._uU(9," download "),t.qZA(),t._uU(10," Soubor ke sta\u017een\xed "),t.qZA(),t.qZA(),t.TgZ(11,"mat-dialog-actions",7),t.TgZ(12,"button",8),t._uU(13,"Skr\xfdt"),t.qZA(),t.qZA()}2&i&&(t.xp6(3),t.Q6J("ngIf",s.data.img),t.xp6(1),t.Q6J("ngIf",s.data.msg),t.xp6(1),t.Q6J("href",s.data.hint_file,t.LSH))},directives:[c.uh,c.xY,d.O5,x.lW,f.Hw,c.H8,c.ZT,M.lF],styles:[".download[_ngcontent-%COMP%]{width:100%;height:64px}.image[_ngcontent-%COMP%]{width:100%}"]}),e})();var u=l(2340),G=l(205),A=l(5304),$=l(1841),K=l(4471);let T=(()=>{class e{constructor(i,s){this.http=i,this.loadingService=s}getVisibleCiphers(i){return this.loadingService.startLoading(this.http.get(u.N.backendUrl+`/api/game/${i}/ciphers`).pipe((0,A.K)(this.handleError)))}getCipher(i){return this.loadingService.startLoading(this.http.get(u.N.backendUrl+`/api/cipher/${i}`).pipe((0,A.K)(this.handleError)))}makeAttempt(i,s){return this.loadingService.startLoading(this.http.post(u.N.backendUrl+`/api/cipher/${i}/attempt`,{answer:s}))}openHint(i){return this.loadingService.startLoading(this.http.post(`${u.N.backendUrl}/api/hint/${i}`,{}))}handleError(i){return u.N.production||console.error(i),(0,G._)(i)}}return e.\u0275fac=function(i){return new(i||e)(t.LFG($.eN),t.LFG(K.b))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var X=l(9075),v=l(3423),C=l(8295),D=l(9983),r=l(2458),p=l(9490),b=l(9765),g=l(6782),W=l(9761),Z=l(9238),F=l(8345),h=l(6461),H=l(3679);let q=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[r.BQ],r.BQ]}),e})();const y=["*"],et=["text"];function st(e,a){if(1&e&&t._UZ(0,"mat-pseudo-checkbox",5),2&e){const i=t.oxw();t.Q6J("state",i.selected?"checked":"unchecked")("disabled",i.disabled)}}const at=["*",[["","mat-list-avatar",""],["","mat-list-icon",""],["","matListAvatar",""],["","matListIcon",""]]],nt=["*","[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]"];let R=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=t.lG2({type:e,selectors:[["","mat-list-avatar",""],["","matListAvatar",""]],hostAttrs:[1,"mat-list-avatar"]}),e})(),w=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=t.lG2({type:e,selectors:[["","mat-list-icon",""],["","matListIcon",""]],hostAttrs:[1,"mat-list-icon"]}),e})();const lt=(0,r.Kr)(class{}),rt=(0,r.Kr)(class{}),mt={provide:H.JU,useExisting:(0,t.Gpc)(()=>O),multi:!0};class dt{constructor(a,i,s){this.source=a,this.option=i,this.options=s}}let N=(()=>{class e extends rt{constructor(i,s,n){super(),this._element=i,this._changeDetector=s,this.selectionList=n,this._selected=!1,this._disabled=!1,this._hasFocus=!1,this.selectedChange=new t.vpe,this.checkboxPosition="after",this._inputsInitialized=!1}get color(){return this._color||this.selectionList.color}set color(i){this._color=i}get value(){return this._value}set value(i){this.selected&&!this.selectionList.compareWith(i,this.value)&&this._inputsInitialized&&(this.selected=!1),this._value=i}get disabled(){return this._disabled||this.selectionList&&this.selectionList.disabled}set disabled(i){const s=(0,p.Ig)(i);s!==this._disabled&&(this._disabled=s,this._changeDetector.markForCheck())}get selected(){return this.selectionList.selectedOptions.isSelected(this)}set selected(i){const s=(0,p.Ig)(i);s!==this._selected&&(this._setSelected(s),(s||this.selectionList.multiple)&&this.selectionList._reportValueChange())}ngOnInit(){const i=this.selectionList;i._value&&i._value.some(n=>i.compareWith(n,this._value))&&this._setSelected(!0);const s=this._selected;Promise.resolve().then(()=>{(this._selected||s)&&(this.selected=!0,this._changeDetector.markForCheck())}),this._inputsInitialized=!0}ngAfterContentInit(){(0,r.E0)(this._lines,this._element)}ngOnDestroy(){this.selected&&Promise.resolve().then(()=>{this.selected=!1});const i=this._hasFocus,s=this.selectionList._removeOptionFromList(this);i&&s&&s.focus()}toggle(){this.selected=!this.selected}focus(){this._element.nativeElement.focus()}getLabel(){return this._text&&this._text.nativeElement.textContent||""}_isRippleDisabled(){return this.disabled||this.disableRipple||this.selectionList.disableRipple}_handleClick(){!this.disabled&&(this.selectionList.multiple||!this.selected)&&(this.toggle(),this.selectionList._emitChangeEvent([this]))}_handleFocus(){this.selectionList._setFocusedOption(this),this._hasFocus=!0}_handleBlur(){this.selectionList._onTouched(),this._hasFocus=!1}_getHostElement(){return this._element.nativeElement}_setSelected(i){return i!==this._selected&&(this._selected=i,i?this.selectionList.selectedOptions.select(this):this.selectionList.selectedOptions.deselect(this),this.selectedChange.emit(i),this._changeDetector.markForCheck(),!0)}_markForCheck(){this._changeDetector.markForCheck()}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(t.SBq),t.Y36(t.sBO),t.Y36((0,t.Gpc)(()=>O)))},e.\u0275cmp=t.Xpm({type:e,selectors:[["mat-list-option"]],contentQueries:function(i,s,n){if(1&i&&(t.Suo(n,R,5),t.Suo(n,w,5),t.Suo(n,r.X2,5)),2&i){let o;t.iGM(o=t.CRH())&&(s._avatar=o.first),t.iGM(o=t.CRH())&&(s._icon=o.first),t.iGM(o=t.CRH())&&(s._lines=o)}},viewQuery:function(i,s){if(1&i&&t.Gf(et,5),2&i){let n;t.iGM(n=t.CRH())&&(s._text=n.first)}},hostAttrs:["role","option",1,"mat-list-item","mat-list-option","mat-focus-indicator"],hostVars:15,hostBindings:function(i,s){1&i&&t.NdJ("focus",function(){return s._handleFocus()})("blur",function(){return s._handleBlur()})("click",function(){return s._handleClick()}),2&i&&(t.uIk("aria-selected",s.selected)("aria-disabled",s.disabled)("tabindex",-1),t.ekj("mat-list-item-disabled",s.disabled)("mat-list-item-with-avatar",s._avatar||s._icon)("mat-primary","primary"===s.color)("mat-accent","primary"!==s.color&&"warn"!==s.color)("mat-warn","warn"===s.color)("mat-list-single-selected-option",s.selected&&!s.selectionList.multiple))},inputs:{disableRipple:"disableRipple",checkboxPosition:"checkboxPosition",color:"color",value:"value",selected:"selected",disabled:"disabled"},outputs:{selectedChange:"selectedChange"},exportAs:["matListOption"],features:[t.qOj],ngContentSelectors:nt,decls:7,vars:5,consts:[[1,"mat-list-item-content"],["mat-ripple","",1,"mat-list-item-ripple",3,"matRippleTrigger","matRippleDisabled"],[3,"state","disabled",4,"ngIf"],[1,"mat-list-text"],["text",""],[3,"state","disabled"]],template:function(i,s){1&i&&(t.F$t(at),t.TgZ(0,"div",0),t._UZ(1,"div",1),t.YNc(2,st,1,2,"mat-pseudo-checkbox",2),t.TgZ(3,"div",3,4),t.Hsn(5),t.qZA(),t.Hsn(6,1),t.qZA()),2&i&&(t.ekj("mat-list-item-content-reverse","after"==s.checkboxPosition),t.xp6(1),t.Q6J("matRippleTrigger",s._getHostElement())("matRippleDisabled",s._isRippleDisabled()),t.xp6(1),t.Q6J("ngIf",s.selectionList.multiple))},directives:[r.wG,d.O5,r.nP],encapsulation:2,changeDetection:0}),e})(),O=(()=>{class e extends lt{constructor(i,s,n,o){super(),this._element=i,this._changeDetector=n,this._focusMonitor=o,this._multiple=!0,this._contentInitialized=!1,this.selectionChange=new t.vpe,this.tabIndex=0,this.color="accent",this.compareWith=(m,k)=>m===k,this._disabled=!1,this.selectedOptions=new F.Ov(this._multiple),this._tabIndex=-1,this._onChange=m=>{},this._destroyed=new b.xQ,this._onTouched=()=>{}}get disabled(){return this._disabled}set disabled(i){this._disabled=(0,p.Ig)(i),this._markOptionsForCheck()}get multiple(){return this._multiple}set multiple(i){const s=(0,p.Ig)(i);s!==this._multiple&&(this._multiple=s,this.selectedOptions=new F.Ov(this._multiple,this.selectedOptions.selected))}ngAfterContentInit(){var i;this._contentInitialized=!0,this._keyManager=new Z.Em(this.options).withWrap().withTypeAhead().withHomeAndEnd().skipPredicate(()=>!1).withAllowedModifierKeys(["shiftKey"]),this._value&&this._setOptionsFromValues(this._value),this._keyManager.tabOut.pipe((0,g.R)(this._destroyed)).subscribe(()=>{this._allowFocusEscape()}),this.options.changes.pipe((0,W.O)(null),(0,g.R)(this._destroyed)).subscribe(()=>{this._updateTabIndex()}),this.selectedOptions.changed.pipe((0,g.R)(this._destroyed)).subscribe(s=>{if(s.added)for(let n of s.added)n.selected=!0;if(s.removed)for(let n of s.removed)n.selected=!1}),null===(i=this._focusMonitor)||void 0===i||i.monitor(this._element).pipe((0,g.R)(this._destroyed)).subscribe(s=>{var n;if("keyboard"===s||"program"===s){let o=0;for(let m=0;m<this.options.length;m++)if(null===(n=this.options.get(m))||void 0===n?void 0:n.selected){o=m;break}this._keyManager.setActiveItem(o)}})}ngOnChanges(i){const s=i.disableRipple,n=i.color;(s&&!s.firstChange||n&&!n.firstChange)&&this._markOptionsForCheck()}ngOnDestroy(){var i;null===(i=this._focusMonitor)||void 0===i||i.stopMonitoring(this._element),this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0}focus(i){this._element.nativeElement.focus(i)}selectAll(){return this._setAllOptionsSelected(!0)}deselectAll(){return this._setAllOptionsSelected(!1)}_setFocusedOption(i){this._keyManager.updateActiveItem(i)}_removeOptionFromList(i){const s=this._getOptionIndex(i);return s>-1&&this._keyManager.activeItemIndex===s&&(s>0?this._keyManager.updateActiveItem(s-1):0===s&&this.options.length>1&&this._keyManager.updateActiveItem(Math.min(s+1,this.options.length-1))),this._keyManager.activeItem}_keydown(i){const s=i.keyCode,n=this._keyManager,o=n.activeItemIndex,m=(0,h.Vb)(i);switch(s){case h.L_:case h.K5:!m&&!n.isTyping()&&(this._toggleFocusedOption(),i.preventDefault());break;default:if(s===h.A&&this.multiple&&(0,h.Vb)(i,"ctrlKey")&&!n.isTyping()){const k=this.options.some(P=>!P.disabled&&!P.selected);this._setAllOptionsSelected(k,!0,!0),i.preventDefault()}else n.onKeydown(i)}this.multiple&&(s===h.LH||s===h.JH)&&i.shiftKey&&n.activeItemIndex!==o&&this._toggleFocusedOption()}_reportValueChange(){if(this.options&&!this._isDestroyed){const i=this._getSelectedOptionValues();this._onChange(i),this._value=i}}_emitChangeEvent(i){this.selectionChange.emit(new dt(this,i[0],i))}writeValue(i){this._value=i,this.options&&this._setOptionsFromValues(i||[])}setDisabledState(i){this.disabled=i}registerOnChange(i){this._onChange=i}registerOnTouched(i){this._onTouched=i}_setOptionsFromValues(i){this.options.forEach(s=>s._setSelected(!1)),i.forEach(s=>{const n=this.options.find(o=>!o.selected&&this.compareWith(o.value,s));n&&n._setSelected(!0)})}_getSelectedOptionValues(){return this.options.filter(i=>i.selected).map(i=>i.value)}_toggleFocusedOption(){let i=this._keyManager.activeItemIndex;if(null!=i&&this._isValidIndex(i)){let s=this.options.toArray()[i];s&&!s.disabled&&(this._multiple||!s.selected)&&(s.toggle(),this._emitChangeEvent([s]))}}_setAllOptionsSelected(i,s,n){const o=[];return this.options.forEach(m=>{(!s||!m.disabled)&&m._setSelected(i)&&o.push(m)}),o.length&&(this._reportValueChange(),n&&this._emitChangeEvent(o)),o}_isValidIndex(i){return i>=0&&i<this.options.length}_getOptionIndex(i){return this.options.toArray().indexOf(i)}_markOptionsForCheck(){this.options&&this.options.forEach(i=>i._markForCheck())}_allowFocusEscape(){this._tabIndex=-1,setTimeout(()=>{this._tabIndex=0,this._changeDetector.markForCheck()})}_updateTabIndex(){this._tabIndex=0===this.options.length?-1:0}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(t.SBq),t.$8M("tabindex"),t.Y36(t.sBO),t.Y36(Z.tE))},e.\u0275cmp=t.Xpm({type:e,selectors:[["mat-selection-list"]],contentQueries:function(i,s,n){if(1&i&&t.Suo(n,N,5),2&i){let o;t.iGM(o=t.CRH())&&(s.options=o)}},hostAttrs:["role","listbox",1,"mat-selection-list","mat-list-base"],hostVars:3,hostBindings:function(i,s){1&i&&t.NdJ("keydown",function(o){return s._keydown(o)}),2&i&&t.uIk("aria-multiselectable",s.multiple)("aria-disabled",s.disabled.toString())("tabindex",s._tabIndex)},inputs:{disableRipple:"disableRipple",tabIndex:"tabIndex",color:"color",compareWith:"compareWith",disabled:"disabled",multiple:"multiple"},outputs:{selectionChange:"selectionChange"},exportAs:["matSelectionList"],features:[t._Bn([mt]),t.qOj,t.TTD],ngContentSelectors:y,decls:1,vars:0,template:function(i,s){1&i&&(t.F$t(),t.Hsn(0))},styles:['.mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list-base .mat-subheader{margin:0}.mat-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:transparent}.mat-list-base .mat-subheader{height:48px;line-height:16px}.mat-list-base .mat-subheader:first-child{margin-top:-8px}.mat-list-base .mat-list-item,.mat-list-base .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base .mat-list-item .mat-list-item-content,.mat-list-base .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base .mat-list-item .mat-list-item-content-reverse,.mat-list-base .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base .mat-list-item .mat-list-item-ripple,.mat-list-base .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar,.mat-list-base .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list-base .mat-list-item.mat-2-line,.mat-list-base .mat-list-option.mat-2-line{height:72px}.mat-list-base .mat-list-item.mat-3-line,.mat-list-base .mat-list-option.mat-3-line{height:88px}.mat-list-base .mat-list-item.mat-multi-line,.mat-list-base .mat-list-option.mat-multi-line{height:auto}.mat-list-base .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base .mat-list-item .mat-list-text,.mat-list-base .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base .mat-list-item .mat-list-text>*,.mat-list-base .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base .mat-list-item .mat-list-text:empty,.mat-list-base .mat-list-option .mat-list-text:empty{display:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base .mat-list-item .mat-list-avatar,.mat-list-base .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list-base .mat-list-item .mat-list-icon,.mat-list-base .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list-base .mat-list-item .mat-divider,.mat-list-base .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base .mat-list-item .mat-divider,[dir=rtl] .mat-list-base .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list-base[dense]{padding-top:4px;display:block}.mat-list-base[dense] .mat-subheader{height:40px;line-height:8px}.mat-list-base[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list-base[dense] .mat-list-item,.mat-list-base[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-item-content,.mat-list-base[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list-base[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base[dense] .mat-list-item .mat-list-item-ripple,.mat-list-base[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list-base[dense] .mat-list-item.mat-2-line,.mat-list-base[dense] .mat-list-option.mat-2-line{height:60px}.mat-list-base[dense] .mat-list-item.mat-3-line,.mat-list-base[dense] .mat-list-option.mat-3-line{height:76px}.mat-list-base[dense] .mat-list-item.mat-multi-line,.mat-list-base[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list-base[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base[dense] .mat-list-item .mat-list-text,.mat-list-base[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-text>*,.mat-list-base[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base[dense] .mat-list-item .mat-list-text:empty,.mat-list-base[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base[dense] .mat-list-item .mat-list-avatar,.mat-list-base[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list-base[dense] .mat-list-item .mat-list-icon,.mat-list-base[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list-base[dense] .mat-list-item .mat-divider,.mat-list-base[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:none}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:transparent;text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}mat-action-list .mat-list-item{cursor:pointer;outline:inherit}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:none}.mat-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active .mat-selection-list:focus{outline-style:dotted}.cdk-high-contrast-active .mat-list-option:hover,.cdk-high-contrast-active .mat-list-option:focus,.cdk-high-contrast-active .mat-nav-list .mat-list-item:hover,.cdk-high-contrast-active .mat-nav-list .mat-list-item:focus,.cdk-high-contrast-active mat-action-list .mat-list-item:hover,.cdk-high-contrast-active mat-action-list .mat-list-item:focus{outline:dotted 1px}.cdk-high-contrast-active .mat-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .mat-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.mat-list-option:not(.mat-list-single-selected-option):not(.mat-list-item-disabled):hover,.mat-nav-list .mat-list-item:not(.mat-list-item-disabled):hover,.mat-action-list .mat-list-item:not(.mat-list-item-disabled):hover{background:none}}\n'],encapsulation:2,changeDetection:0}),e})(),ct=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[r.uc,r.si,r.BQ,r.us,d.ez],r.uc,r.BQ,r.us,q]}),e})();function pt(e,a){1&e&&t._UZ(0,"img",13)}function ht(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"div",11),t._UZ(1,"a",14,15),t.TgZ(3,"button",16),t.NdJ("click",function(){return t.CHM(i),t.MAs(2).click()}),t.TgZ(4,"mat-icon",17),t._uU(5,"download"),t.qZA(),t._uU(6," Soubor ke sta\u017een\xed "),t.qZA(),t.qZA()}if(2&e){const i=t.oxw(2);t.xp6(1),t.Q6J("href",i.cipher.cipher_file,t.LSH)}}function ut(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"mat-list-option",20),t.NdJ("click",function(){const o=t.CHM(i).$implicit,m=t.oxw(3);return m.hintClick(o.hint_id,m.cipher)}),t.TgZ(1,"mat-icon",21),t._uU(2," help_outline "),t.qZA(),t.TgZ(3,"div",22),t._uU(4," N\xe1pov\u011bda "),t.qZA(),t.TgZ(5,"div",22),t._uU(6),t.qZA(),t.qZA()}if(2&e){const i=a.$implicit,s=t.oxw(3);t.xp6(6),t.hij(" (",s.getHintCostText(i),") ")}}function gt(e,a){if(1&e&&(t.TgZ(0,"mat-selection-list",18),t.YNc(1,ut,7,1,"mat-list-option",19),t.qZA()),2&e){const i=t.oxw(2);t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",i.cipher.hints)}}function ft(e,a){if(1&e){const i=t.EpF();t.ynx(0),t.TgZ(1,"div",1),t._uU(2),t.qZA(),t.TgZ(3,"div",2),t._uU(4),t.qZA(),t.YNc(5,pt,1,0,"img",3),t.TgZ(6,"div",4),t._UZ(7,"markdown",5),t.qZA(),t.YNc(8,ht,7,1,"div",6),t.TgZ(9,"div",7),t._uU(10," N\xe1pov\u011bdy "),t.qZA(),t.YNc(11,gt,2,2,"mat-selection-list",8),t.TgZ(12,"mat-form-field",9),t.TgZ(13,"mat-label"),t._uU(14," \u0158e\u0161en\xed "),t.qZA(),t._UZ(15,"textarea",10),t.qZA(),t.TgZ(16,"div",11),t.TgZ(17,"button",12),t.NdJ("click",function(){return t.CHM(i),t.oxw().makeAttempt()}),t._uU(18," Odevzdat "),t.qZA(),t.qZA(),t.BQk()}if(2&e){const i=t.oxw();t.xp6(2),t.hij(" ",i.cipher.name," "),t.xp6(2),t.hij(" ",i.cipher.score," Bod\u016f "),t.xp6(1),t.Q6J("ngIf",i.cipher.img),t.xp6(2),t.Q6J("data",i.cipher.description),t.xp6(1),t.Q6J("ngIf",i.cipher.cipher_file),t.xp6(3),t.Q6J("ngIf",i.cipher.hints)}}let vt=(()=>{class e{constructor(i,s,n,o){this.cipherService=i,this.domSanitizer=s,this.dialog=n,this.route=o,this.cipherId=this.route.snapshot.params.id,this.cipherObs=this.cipherService.getCipher(this.cipherId),this.cipherObs.subscribe(m=>{this.cipher=m})}getHintCostText(i){return i.score_cost&&i.time_cost?`-${i.score_cost} bod\u016f, -${i.time_cost} sekund`:i.score_cost?`-${i.score_cost} bod\u016f`:i.time_cost?`-${i.time_cost} sekund`:"Zdarma"}ngOnInit(){}hintClick(i,s){const n=s.hints.find(o=>o.hint_id===i);if(null!=n){if(!n.score_cost&&!n.time_cost)return void this.cipherService.openHint(i).pipe((0,_.w)(o=>this.dialog.open(S,{data:o,width:"100%"}).afterClosed())).subscribe();this.dialog.open(U.K,{data:{text:"Opravdu chcete n\xe1pov\u011bdu?"}}).afterClosed().pipe((0,J.n)(o=>!o),(0,_.w)(o=>o?this.cipherService.openHint(i):(0,z.of)(null)),(0,Y.b)(o=>{null!=o&&(n.score_cost=n.time_cost=void 0)}),(0,_.w)(o=>this.dialog.open(S,{data:o,width:"100%"}).afterClosed())).subscribe()}}trustUrl(i){return this.domSanitizer.bypassSecurityTrustUrl(i)}makeAttempt(){}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(T),t.Y36(X.H7),t.Y36(c.uw),t.Y36(v.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-cipher"]],decls:1,vars:1,consts:[[4,"ngIf"],[1,"mat-display-1","label"],[1,"score-display"],["class","main-image","src","https://picsum.photos/900","alt","obr\xe1zek",4,"ngIf"],[1,"cipher-container"],[1,"markdown",3,"data"],["class","button-row",4,"ngIf"],[1,"mat-display-1","hint-label"],["class","hint-list",3,"multiple",4,"ngIf"],["appearance","outline",1,"solution"],["rows","5","matInput",""],[1,"button-row"],["mat-raised-button","","color","primary",3,"click"],["src","https://picsum.photos/900","alt","obr\xe1zek",1,"main-image"],["target","_blank",2,"display","none",3,"href"],["fileLink",""],["mat-raised-button","","color","accent",3,"click"],[2,"margin-right","2px"],[1,"hint-list",3,"multiple"],["style","cursor: pointer",3,"click",4,"ngFor","ngForOf"],[2,"cursor","pointer",3,"click"],["mat-list-icon",""],["mat-line",""]],template:function(i,s){1&i&&t.YNc(0,ft,19,6,"ng-container",0),2&i&&t.Q6J("ngIf",s.cipher)},directives:[d.O5,M.lF,C.KE,C.hX,D.Nt,x.lW,f.Hw,O,d.sg,N,w,r.X2],styles:["[_nghost-%COMP%]{display:block;padding:0 64px 64px;box-sizing:border-box}@media screen and (max-width: 560px){[_nghost-%COMP%]{padding:0 32px 64px}}.main-image[_ngcontent-%COMP%]{width:100%;padding-bottom:16px}.score-display[_ngcontent-%COMP%]{text-align:center;font-size:21px;padding-bottom:8px;margin-bottom:16px;border-bottom:2px solid white}.label[_ngcontent-%COMP%]{text-align:center;margin-bottom:8px;padding:32px 0 16px;border-bottom:2px solid white}@media screen and (max-width: 325px){.cipher-container[_ngcontent-%COMP%]{width:95%}}.button-row[_ngcontent-%COMP%]{margin-top:32px;text-align:center}.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;height:64px;padding:0 48px;font-size:16px}.solution[_ngcontent-%COMP%]{width:100%;margin-top:32px;font-size:18px}.hint-label[_ngcontent-%COMP%]{text-align:center;margin:32px 0 8px}.hint-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex}"]}),e})();var bt=l(1397);function _t(e,a){if(1&e&&(t.TgZ(0,"div",2),t._uU(1),t.qZA()),2&e){const i=a.ngIf;t.xp6(1),t.hij(" ",i.name," ")}}function xt(e,a){1&e&&(t.TgZ(0,"mat-icon",8),t._uU(1," done_outline "),t.qZA())}function Mt(e,a){1&e&&(t.TgZ(0,"mat-icon",9),t._uU(1," help_outline "),t.qZA())}const Ct=function(e){return["/cipher",e]};function yt(e,a){if(1&e&&(t.TgZ(0,"div",4),t.O4$(),t._UZ(1,"svg",5),t.kcU(),t.TgZ(2,"div"),t.YNc(3,xt,2,0,"mat-icon",6),t.YNc(4,Mt,2,0,"mat-icon",7),t._UZ(5,"br"),t._uU(6),t.qZA(),t.qZA()),2&e){const i=a.$implicit;t.Q6J("routerLink",t.VKq(4,Ct,i.cipher_id)),t.xp6(3),t.Q6J("ngIf",i.solved),t.xp6(1),t.Q6J("ngIf",!i.solved),t.xp6(2),t.hij(" ",i.name," ")}}function Lt(e,a){if(1&e&&(t.ynx(0),t.YNc(1,yt,7,6,"div",3),t.BQk()),2&e){const i=a.ngIf;t.xp6(1),t.Q6J("ngForOf",i)}}const wt=[{path:":id",component:vt},{path:"visible/:id",component:(()=>{class e{constructor(i,s,n){this.cipherService=i,this.gameService=s,this.route=n,this.ciphersObs=this.cipherService.getVisibleCiphers(this.route.snapshot.params.id),this.gameObs=this.gameService.getGameById(this.route.snapshot.params.id)}ngOnInit(){}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(T),t.Y36(bt.h),t.Y36(v.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-cipher-list"]],decls:4,vars:6,consts:[["class","mat-display-1",4,"ngIf"],[4,"ngIf"],[1,"mat-display-1"],["class","main-menu-item noselect","matRipple","",3,"routerLink",4,"ngFor","ngForOf"],["matRipple","",1,"main-menu-item","noselect",3,"routerLink"],["viewBox","0 0 1 1"],["class","material-icons-outlined success",4,"ngIf"],["class","material-icons-outlined warn",4,"ngIf"],[1,"material-icons-outlined","success"],[1,"material-icons-outlined","warn"]],template:function(i,s){1&i&&(t.YNc(0,_t,2,1,"div",0),t.ALo(1,"async"),t.YNc(2,Lt,2,1,"ng-container",1),t.ALo(3,"async")),2&i&&(t.Q6J("ngIf",t.lcZ(1,2,s.gameObs)),t.xp6(2),t.Q6J("ngIf",t.lcZ(3,4,s.ciphersObs)))},directives:[d.O5,d.sg,r.wG,v.rH,f.Hw],pipes:[d.Ov],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;width:100%;height:100%;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;align-items:center;justify-content:center}.main-menu-item[_ngcontent-%COMP%]{border-radius:32px;display:grid;position:relative;flex:1;min-width:256px;margin:32px;border:2px solid white;cursor:pointer;overflow:hidden}.main-menu-item[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{grid-area:1/1}.main-menu-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:absolute;width:100%;height:100%;top:0;left:0;align-items:center;justify-content:center}.main-menu-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px}.filler[_ngcontent-%COMP%]{flex:1;min-width:256px;margin:0 32px;height:0}@media screen and (max-width: 560px){.main-menu-item[_ngcontent-%COMP%]{min-width:calc(100% - 64px);height:calc(50% - 64px);cursor:auto}}","[_nghost-%COMP%]{align-content:flex-start}.main-menu-item[_ngcontent-%COMP%]{max-height:200px}.mat-display-1[_ngcontent-%COMP%]{margin-top:48px}mat-icon.done[_ngcontent-%COMP%]{color:green}"]}),e})()}];let Ot=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[d.ez,v.Bz.forChild(wt),M.JP,H.u5,f.Ps,r.si,x.ot,C.lN,D.c,ct,c.Is]]}),e})()}}]);