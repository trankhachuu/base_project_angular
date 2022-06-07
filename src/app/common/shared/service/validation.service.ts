import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

type Config = {
    [key: string]: string
}

@Injectable({ providedIn: 'root' })
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): any {
    const config: Config = {
      required: 'This field is required.',
      invalidCreditCard: 'Is invalid credit card number.',
      invalidEmailAddress: 'Invalid email address.',
      invalidPassword: 'Invalid password. Password must be within 4-50 non white space characters and at least one number',
      minlength: `This field is required to be at least ${validatorValue.requiredLength} characters.`,
      maxlength: `This field cannot be longer than ${validatorValue.requiredLength} characters.`,
      min: `This field should be at least ${validatorValue.min}.`,
      max: `This field cannot be more than ${validatorValue.max}.`,
      email: `Please enter a valid email address. For example abc@domain.com.`,
      invalidZip: 'Invalid zip code. Input 5 or 9 digit number.',
      invalidAshaNumber: 'Invalid ASHA number. Input 8 digit number.',
      invalidColor: 'Invalid color.',
      pattern: 'Invalid character(s).',
      invalidSlug: 'Invalid character(s). Only alphanumeric characters and hyphens are accepted.',
      invalidEduMail: `Please register using the email address issued by your academic institution, which should end in '.edu'.`,
      invalidFutureMonth: `Date must be in the future.`
    };
    return config[validatorName];
  }

  static creditCardValidator(control: FormControl): any {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control: FormControl): any {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { email: true };
    }
  }

  static passwordValidator(control: FormControl): any {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.trim()) {
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,50}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
  }

  static zipCode(control: FormControl): any {
    if (control.value && control.value.trim()) {
      if (control.value.match(/^[0-9]{5}(-[0-9]{4})?$/)) {
        return null;
      } else {
        return { invalidZip: true };
      }
    } else {
      return null;
    }
  }

  static colorPickerValidator(control: FormControl): any {
    if (control.value && control.value.trim()) {
      if (control.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        return null;
      } else {
        return { invalidColor: true };
      }
    } else {
      return null;
    }
  }

  static eduEmail(control: FormControl): any {
    if (control.value && control.value.trim()) {
      const validEmail = ValidationService.emailValidator(control);
      if (validEmail == null) {
        if (control.value.endsWith('.edu')) {
          return null;
        } else {
          return { invalidEduMail: true };
        }
      } else {
        return validEmail;
      }
    } else {
      return null;
    }
  }
}

export function validateFuture(monthCtrl: string, yearCtrl: string) {
  return (formGroup: FormGroup) => {
    const month = formGroup.controls[monthCtrl];
    const year = formGroup.controls[yearCtrl];

    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;

    if (month.value <= curMonth && year.value === curYear) {
      month.setErrors({ invalidFutureMonth: true });
    } else {
      if (month.hasError('invalidFutureMonth')) {
        month.setErrors({ invalidFutureMonth: null });
        month.updateValueAndValidity();
      }
    }
  };
}
