import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { of, Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
  constructor(
    private authService: AuthService
  ) {}  // copy of the client
 
  // we used the arrow function to bind the validate function to the http client
  validate = (control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const { value } = control

    // Add your validation logic here
    return this.authService
      .usernameAvailable(value)
      .pipe(
        map(value => {
          if (value.available) {
            return null;
          } else {
            return { nonUniqueUsername: true };
          }
        }),
        catchError((err) => {
          console.log(err);
          if(err.error.username) {
            // it will create an observable
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
    );
  }
}

