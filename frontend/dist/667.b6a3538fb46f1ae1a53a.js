"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[667],{5667:(xt,$,h)=>{h.r($),h.d($,{CipherGamesModule:()=>St});var _=h(8583),t=h(7716),F=h(5917),Z=h(2340),W=h(5304),me=h(1841);let _e=(()=>{class i{constructor(e){this.http=e}getGames(){return this.http.get(Z.N.backendUrl+"/api/games").pipe((0,W.K)(this.handleError))}getGameById(e){return this.http.get(`${Z.N.backendUrl}/api/game/${e}`).pipe((0,W.K)(this.handleError))}handleError(e){return Z.N.production||console.error(e),(0,F.of)(null)}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(me.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var ge=h(6237),o=h(2458);const fe=["*",[["mat-card-footer"]]],ve=["*","mat-card-footer"],De=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],be=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"];let Me=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=t.lG2({type:i,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),i})(),Ae=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=t.lG2({type:i,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-card-title"]}),i})(),we=(()=>{class i{constructor(){this.align="start"}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=t.lG2({type:i,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-card-actions"],hostVars:2,hostBindings:function(e,a){2&e&&t.ekj("mat-card-actions-align-end","end"===a.align)},inputs:{align:"align"},exportAs:["matCardActions"]}),i})(),ke=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=t.lG2({type:i,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-card-image"]}),i})(),Se=(()=>{class i{constructor(e){this._animationMode=e}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(ge.Qb,8))},i.\u0275cmp=t.Xpm({type:i,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(e,a){2&e&&t.ekj("_mat-animation-noopable","NoopAnimations"===a._animationMode)},exportAs:["matCard"],ngContentSelectors:ve,decls:2,vars:0,template:function(e,a){1&e&&(t.F$t(fe),t.Hsn(0),t.Hsn(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),i})(),xe=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-card-header"],ngContentSelectors:be,decls:4,vars:0,consts:[[1,"mat-card-header-text"]],template:function(e,a){1&e&&(t.F$t(De),t.Hsn(0),t.TgZ(1,"div",0),t.Hsn(2,1),t.qZA(),t.Hsn(3,2))},encapsulation:2,changeDetection:0}),i})(),Ie=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[o.BQ],o.BQ]}),i})();var ee=h(6627),k=h(1095);function Ve(i,s){if(1&i&&(t.TgZ(0,"mat-card",2),t.TgZ(1,"mat-card-header"),t.TgZ(2,"mat-card-title"),t._uU(3),t.qZA(),t.qZA(),t._UZ(4,"img",3),t.TgZ(5,"mat-card-content"),t.TgZ(6,"div",4),t.TgZ(7,"mat-icon",5),t._uU(8," schedule "),t.qZA(),t._uU(9," Otev\u0159eno do: "),t._UZ(10,"br"),t._uU(11),t.ALo(12,"date"),t.qZA(),t.TgZ(13,"div",4),t.TgZ(14,"mat-icon",5),t._uU(15," groups "),t.qZA(),t._uU(16," Obsazenost: "),t._UZ(17,"br"),t._uU(18),t.qZA(),t.qZA(),t.TgZ(19,"mat-card-actions"),t.TgZ(20,"button",6),t._uU(21," P\u0158IPOJIT SE "),t.qZA(),t.TgZ(22,"button",6),t._uU(23," DETAIL "),t.qZA(),t.qZA(),t.qZA()),2&i){const e=s.$implicit;t.xp6(3),t.Oqu(e.name),t.xp6(8),t.hij(" ",t.xi3(12,3,e.deadline_signup,"longDate")," "),t.xp6(7),t.hij(" ","0 /"+e.teammax," ")}}function Te(i,s){if(1&i&&(t.ynx(0),t.YNc(1,Ve,24,6,"mat-card",1),t.BQk()),2&i){const e=s.ngIf;t.xp6(1),t.Q6J("ngForOf",e)}}let Ye=(()=>{class i{constructor(e){this.gameService=e,this.gamesObs=this.gameService.getGames()}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(_e))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-cipher-game-list"]],decls:2,vars:3,consts:[[4,"ngIf"],["class","cipher-game-card",4,"ngFor","ngForOf"],[1,"cipher-game-card"],["mat-card-image","","src","https://picsum.photos/250/150"],[2,"display","flex","align-items","center","margin-bottom","16px"],[1,"material-icons-outlined",2,"margin-right","18px"],["mat-button",""]],template:function(e,a){1&e&&(t.YNc(0,Te,2,1,"ng-container",0),t.ALo(1,"async")),2&e&&t.Q6J("ngIf",t.lcZ(1,1,a.gamesObs))},directives:[_.O5,_.sg,Se,xe,Ae,ke,Me,ee.Hw,we,k.lW],pipes:[_.Ov,_.uU],styles:["[_nghost-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.cipher-game-card[_ngcontent-%COMP%]{flex:1 1 0;min-width:300px;margin:16px}.calendar-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px}@media only screen and (min-width: 700px){.cipher-game-card[_ngcontent-%COMP%]{max-width:450px}}"]}),i})();var Ee=h(9838),I=h(9238),V=h(625),S=h(7636),Fe=h(5656),y=h(9765);h(5319),h(6682),h(6461),h(5257),h(9761),h(5435),h(9490),h(521),h(7238),h(3679),h(8295),h(9983),h(946);let T=(()=>{class i{constructor(){this.changes=new y.xQ,this.calendarLabel="Calendar",this.openCalendarLabel="Open calendar",this.closeCalendarLabel="Close calendar",this.prevMonthLabel="Previous month",this.nextMonthLabel="Next month",this.prevYearLabel="Previous year",this.nextYearLabel="Next year",this.prevMultiYearLabel="Previous 24 years",this.nextMultiYearLabel="Next 24 years",this.switchToMonthViewLabel="Choose date",this.switchToMultiYearViewLabel="Choose month and year"}formatYearRange(e,a){return`${e} \u2013 ${a}`}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275prov=t.Yz7({factory:function(){return new i},token:i,providedIn:"root"}),i})();const _t={provide:new t.OlP("mat-datepicker-scroll-strategy"),deps:[V.aV],useFactory:function(i){return()=>i.scrollStrategies.reposition()}};let wt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[T,_t],imports:[[_.ez,k.ot,V.U8,I.rt,S.eL,o.BQ],Fe.ZD]}),i})();const kt=[{path:"",component:Ye}];let St=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[_.ez,Ee.Bz.forChild(kt),Ie,ee.Ps,k.ot,o.si,wt]]}),i})()}}]);