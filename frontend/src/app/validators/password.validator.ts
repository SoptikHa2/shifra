import {AbstractControl, ValidatorFn} from "@angular/forms";

export const PasswordMatcher = (control: AbstractControl) : any => {
  if(control.parent === undefined || control.parent === null)
    return null;
  const password = control.parent.get('password');
  const repassword = control.parent.get('re_password');
  if(!password || !repassword) return null;
  return password.value === repassword.value ? null : { passwordNoMatch: true };
};

