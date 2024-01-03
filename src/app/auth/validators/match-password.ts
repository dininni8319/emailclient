import { Validator, ValidationErrors, AbstractControl } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'}) // now we can use this class with the DJ 
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true}
    }  
  }
}
