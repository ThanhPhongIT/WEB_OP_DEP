import { AbstractControl, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(phoneRe: RegExp): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} | null => {
	  const phone = phoneRe.test(control.value);
	  return phone ? {phoneNumber: {value: control.value}} : null;
	};
  }