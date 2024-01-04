import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { SignupCredential } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], 
       // angular will run first the syn validator
       // involves resources
      [this.uniqueUsername.validate as AsyncValidatorFn]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]) 
  }, 
  { validators: [this.matchPassword.validate] }
  );

  ngOnInit(): void { 
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    // we must subscribe to send a request
    this.authService.signup(this.authForm.value as SignupCredential)
      .subscribe({
        next:(response) => { // called when emits a value
          // Navigate to some other route
          
        },
        // complete() { // called after the request complete successfully

        // },
        error: (err) => { // called any time that emits an error
          if (!err.status && this.authForm) {
            this.authForm.setErrors({ noConnection: true })
          } else {
            this.authForm.setErrors({ unknownError: true })
          }
        }
      });
  }
}
