import {AbstractControl} from "@angular/forms";

export const EmailMatcher = (control: AbstractControl) : any => {
  const email : string= control.value;
  if(email === '') return null;
  const _pom : string[] = email.split('@');
  if(_pom.length !== 2) return {email: true};
  const _pom2 : string [] = _pom[1].split('.');
  if(_pom2.length < 2 || _pom2[1] === "" || _pom2[0] === "") return {email: true};
  return null;
};
