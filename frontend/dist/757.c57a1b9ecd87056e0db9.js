"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[757],{8757:(J,f,s)=>{s.r(f),s.d(f,{AuthModule:()=>L});var u=s(8583),e=s(7716),g=s(6334),l=s(3423),r=s(3679),m=s(8295),d=s(9983),c=s(1095),p=s(4885);function v(t,o){if(1&t&&(e.TgZ(0,"div",13),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.error," ")}}function w(t,o){1&t&&(e.ynx(0),e._uU(1," P\u0159ihl\xe1sit se "),e.BQk())}function C(t,o){1&t&&e._UZ(0,"mat-spinner",14),2&t&&e.Q6J("diameter",36)}let Z=(()=>{class t{constructor(n,i,a){this.authService=n,this.router=i,this.formBuilder=a,this.loggingIn=!1,this.loginFormGroup=a.group({username:[""],password:[""]})}ngOnInit(){}login(){this.loggingIn=!0,this.authService.login(this.loginFormGroup.value.username,this.loginFormGroup.value.password).then(n=>{n?this.authService.returnFromPromotedLogin():(this.error=this.authService.getError(),"Nespr\xe1vn\xe9 heslo nebo u\u017eivatelsk\xe9 jm\xe9no"==this.error&&this.loginFormGroup.reset()),this.loggingIn=!1})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(g.e),e.Y36(l.F0),e.Y36(r.qu))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:21,vars:5,consts:[[3,"formGroup","ngSubmit"],[1,"grow-container","label"],[1,"mat-display-3"],["appearance","outline",1,"form-item"],["matInput","","formControlName","username"],["type","password","matInput","","formControlName","password"],["class","error form-item",4,"ngIf"],[1,"buttons"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[4,"ngIf","ngIfElse"],["spinner",""],["mat-button","","color","accent","type","button","routerLink","/auth/register"],[1,"grow-container"],[1,"error","form-item"],[2,"margin","5px auto",3,"diameter"]],template:function(n,i){if(1&n&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return i.login()}),e.TgZ(1,"div",1),e.TgZ(2,"h1",2),e._uU(3,"Login"),e.qZA(),e.qZA(),e.TgZ(4,"mat-form-field",3),e.TgZ(5,"mat-label"),e._uU(6,"U\u017eivatelsk\xe9 jm\xe9no"),e.qZA(),e._UZ(7,"input",4),e.qZA(),e.TgZ(8,"mat-form-field",3),e.TgZ(9,"mat-label"),e._uU(10,"Heslo"),e.qZA(),e._UZ(11,"input",5),e.qZA(),e.YNc(12,v,2,1,"div",6),e.TgZ(13,"div",7),e.TgZ(14,"button",8),e.YNc(15,w,2,0,"ng-container",9),e.YNc(16,C,1,1,"ng-template",null,10,e.W1O),e.qZA(),e.TgZ(18,"button",11),e._uU(19," Nem\xe1m \xfa\u010det "),e.qZA(),e.qZA(),e._UZ(20,"div",12),e.qZA()),2&n){const a=e.MAs(17);e.Q6J("formGroup",i.loginFormGroup),e.xp6(12),e.Q6J("ngIf",i.error),e.xp6(2),e.Q6J("disabled",i.loggingIn),e.xp6(1),e.Q6J("ngIf",!i.loggingIn)("ngIfElse",a)}},directives:[r._Y,r.JL,r.sg,m.KE,m.hX,d.Nt,r.Fj,r.JJ,r.u,u.O5,c.lW,l.rH,p.$g],styles:["@media screen and (max-width: 560px){.buttons[_ngcontent-%COMP%]{margin-top:128px}}","form[_ngcontent-%COMP%]{display:flex;height:100%;flex-direction:column;align-items:center;font-size:1.1rem}.form-item[_ngcontent-%COMP%]{width:calc(100% - 256px)}mat-form-field[_ngcontent-%COMP%]{font-size:18px}button[_ngcontent-%COMP%]{width:150px;height:48px;margin:0 8px;font-size:1.1rem}.grow-container[_ngcontent-%COMP%]{display:flex;width:100%;flex:1 1;align-items:center;justify-content:center;box-sizing:border-box}.grow-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:64px 0 0}@media screen and (max-width: 560px){.form-item[_ngcontent-%COMP%]{width:calc(100% - 64px)}.grow-container[_ngcontent-%COMP%]{box-sizing:border-box}.grow-container[_ngcontent-%COMP%]:last-child{min-height:48px;flex-grow:0}}.error[_ngcontent-%COMP%]{padding:12px 0;margin-bottom:16px;text-align:center;border-radius:5px}.buttons[_ngcontent-%COMP%]{display:flex}.label[_ngcontent-%COMP%]{text-align:center;flex:2 1}"]}),t})();var _=s(6627);const M=t=>{if(null==t.parent)return null;const o=t.parent.get("password"),n=t.parent.get("re_password");return o&&n&&o.value!==n.value?{passwordNoMatch:!0}:null};function P(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.usernameErrorMessage()," ")}}function b(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.emailErrorMessage()," ")}}function I(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.passwordErrorMessage()," ")}}function O(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.rePasswordErrorMessage()," ")}}function T(t,o){if(1&t&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.error," ")}}function A(t,o){1&t&&(e.ynx(0),e._uU(1," Registrovat se "),e.BQk())}function U(t,o){1&t&&e._UZ(0,"mat-spinner",19),2&t&&e.Q6J("diameter",36)}let E=(()=>{class t{constructor(n){this.authService=n,this.addingUser=!1,this.username=new r.NI("",[r.kI.required,r.kI.minLength(4),r.kI.maxLength(80)]),this.email=new r.NI("",[r.kI.required,r.kI.email]),this.password=new r.NI("",[r.kI.required,r.kI.minLength(6),r.kI.maxLength(100)]),this.rePassword=new r.NI("",[r.kI.required,M]),this.registerFormGroup=new r.cw({username:this.username,email:this.email,password:this.password,re_password:this.rePassword})}ngOnInit(){}register(){this.addingUser=!0,this.authService.register(this.username.value,this.email.value,this.password.value).then(n=>{n?this.authService.returnFromPromotedLogin():this.error=this.authService.getError(),this.addingUser=!1})}usernameErrorMessage(){return this.username.hasError("required")?"Po\u017eadov\xe1no":this.username.hasError("minlength")?"U\u017eivatelsk\xe9 jm\xe9no mus\xed m\xedt alenpo\u0148 4 znaky":this.username.hasError("maxlength")?"U\u017eivatelsk\xe9 jm\xe9no mus\xed m\xedt nev\xedce 80 znak\u016f":void 0}emailErrorMessage(){return this.email.hasError("required")?"Po\u017eadov\xe1no":this.email.hasError("email")?"Neplatn\xfd email":void 0}passwordErrorMessage(){return this.password.hasError("required")?"Po\u017eadov\xe1no":this.password.hasError("minlength")?"Heslo mus\xed m\xedt alespo\u0148 6 znak\u016f":this.password.hasError("maxlength")?"Heslo mus\xed m\xedt nejv\xedce 100 znak\u016f":void 0}rePasswordErrorMessage(){return this.rePassword.hasError("required")?"Po\u017eadov\xe1no":this.rePassword.hasError("passwordNoMatch")?"Hesla se neshoduj\xed":void 0}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(g.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],decls:34,vars:9,consts:[[3,"formGroup","ngSubmit"],[1,"grow-container","label"],[1,"mat-display-3"],["appearance","outline",1,"form-item"],["matInput","","formControlName","username"],[4,"ngIf"],["matInput","","formControlName","email"],[1,"password-form-fields","form-item"],["appearance","outline"],["type","password","matInput","","formControlName","password"],["type","password","matInput","","formControlName","re_password"],["class","error form-item",4,"ngIf"],[1,"buttons"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[4,"ngIf","ngIfElse"],["spinner",""],["mat-button","","color","accent","type","button","routerLink","/auth/login"],[1,"grow-container"],[1,"error","form-item"],[2,"margin","5px auto",3,"diameter"]],template:function(n,i){if(1&n&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return i.register()}),e.TgZ(1,"div",1),e.TgZ(2,"h1",2),e._uU(3,"Register"),e.qZA(),e.qZA(),e.TgZ(4,"mat-form-field",3),e.TgZ(5,"mat-label"),e._uU(6,"U\u017eivatelsk\xe9 jm\xe9no"),e.qZA(),e._UZ(7,"input",4),e.YNc(8,P,2,1,"mat-error",5),e.qZA(),e.TgZ(9,"mat-form-field",3),e.TgZ(10,"mat-label"),e._uU(11,"Email"),e.qZA(),e._UZ(12,"input",6),e.YNc(13,b,2,1,"mat-error",5),e.qZA(),e.TgZ(14,"div",7),e.TgZ(15,"mat-form-field",8),e.TgZ(16,"mat-label"),e._uU(17,"Heslo"),e.qZA(),e._UZ(18,"input",9),e.YNc(19,I,2,1,"mat-error",5),e.qZA(),e.TgZ(20,"mat-form-field",8),e.TgZ(21,"mat-label"),e._uU(22,"Heslo znovu"),e.qZA(),e._UZ(23,"input",10),e.YNc(24,O,2,1,"mat-error",5),e.qZA(),e.qZA(),e.YNc(25,T,2,1,"div",11),e.TgZ(26,"div",12),e.TgZ(27,"button",13),e.YNc(28,A,2,0,"ng-container",14),e.YNc(29,U,1,1,"ng-template",null,15,e.W1O),e.qZA(),e.TgZ(31,"button",16),e._uU(32," M\xe1m \xfa\u010det "),e.qZA(),e.qZA(),e._UZ(33,"div",17),e.qZA()),2&n){const a=e.MAs(30);e.Q6J("formGroup",i.registerFormGroup),e.xp6(8),e.Q6J("ngIf",i.username.invalid),e.xp6(5),e.Q6J("ngIf",i.email.invalid),e.xp6(6),e.Q6J("ngIf",i.password.invalid),e.xp6(5),e.Q6J("ngIf",i.rePassword.invalid),e.xp6(1),e.Q6J("ngIf",i.error),e.xp6(2),e.Q6J("disabled",!i.registerFormGroup.valid||i.addingUser),e.xp6(1),e.Q6J("ngIf",!i.addingUser)("ngIfElse",a)}},directives:[r._Y,r.JL,r.sg,m.KE,m.hX,d.Nt,r.Fj,r.JJ,r.u,u.O5,c.lW,l.rH,m.TO,p.$g],styles:["form[_ngcontent-%COMP%]{display:flex;height:100%;flex-direction:column;align-items:center;font-size:1.1rem}.form-item[_ngcontent-%COMP%]{width:calc(100% - 256px)}mat-form-field[_ngcontent-%COMP%]{font-size:18px}button[_ngcontent-%COMP%]{width:150px;height:48px;margin:0 8px;font-size:1.1rem}.grow-container[_ngcontent-%COMP%]{display:flex;width:100%;flex:1 1;align-items:center;justify-content:center;box-sizing:border-box}.grow-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:64px 0 0}@media screen and (max-width: 560px){.form-item[_ngcontent-%COMP%]{width:calc(100% - 64px)}.grow-container[_ngcontent-%COMP%]{box-sizing:border-box}.grow-container[_ngcontent-%COMP%]:last-child{min-height:48px;flex-grow:0}}.error[_ngcontent-%COMP%]{padding:12px 0;margin-bottom:16px;text-align:center;border-radius:5px}.buttons[_ngcontent-%COMP%]{display:flex}.label[_ngcontent-%COMP%]{text-align:center;flex:2 1}",".password-form-fields[_ngcontent-%COMP%]{width:calc(100% - 256px);margin-bottom:16px}.password-form-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:calc(50% - 16px)}.password-form-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:first-child{margin-right:16px}.password-form-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:last-child{margin-left:16px}@media screen and (max-width: 560px){.password-form-fields[_ngcontent-%COMP%]{width:calc(100% - 64px);flex-direction:column}.password-form-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%;margin:0!important}}"]}),t})();var h=s(6888),x=s(8002);let y=(()=>{class t{constructor(n){this.authService=n}canActivate(n,i){return this.authService.user.asObservable().pipe((0,h.n)(a=>null==a),(0,x.U)(a=>!a.loggedIn))}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(g.e))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var N=s(3342);const q=[{path:"login",component:Z,canActivate:[y]},{path:"register",component:E,canActivate:[(()=>{class t{constructor(n){this.authService=n}canActivate(n,i){return this.authService.user.asObservable().pipe((0,h.n)(a=>null==a),(0,N.b)(console.log),(0,x.U)(a=>!a.loggedIn||null==a.person.mail))}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(g.e))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()]}];let L=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[u.ez,l.Bz.forChild(q),d.c,_.Ps,c.ot,r.UX,p.Cq]]}),t})()}}]);