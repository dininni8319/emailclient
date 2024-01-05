import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredential {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean,
  username: string
}

export interface SignIn {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // the dollars sign tells us that this is an Observable
  // signedIn$ = new BehaviorSubject(false)
  signedIn$ = new BehaviorSubject<null | boolean>(null) // we dont know if the user is signed in or not
  constructor(private http: HttpClient) { }
  
  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`, 
      {
        username
      }
    )
  }

  signup(credentials: SignupCredential) {
    return this.http.post<SignupResponse>(
      `${this.rootUrl}/auth/signup`, 
      credentials
    ).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    )
  }
  
  checkAuth() {
    return this.http.get<SignedinResponse>(
      `${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedIn$.next(authenticated);
        })
      )
  }

  signout() {
    // we are not posting any data
    // api server is going to back, we will signout from the application
    // clearing out all the stored cookie in the header
    return this.http.post(
      `${this.rootUrl}/auth/signout`, {}
    )
      .pipe(
        tap(() => {
          this.signedIn$.next(false);
        })
      )
  }

  signin(credentials: SignIn) {
    return this.http.post(
      `${this.rootUrl}/auth/signin`, 
      credentials
    ).pipe(
      tap(() => {
        this.signedIn$.next(true)
      })
    )
  }
}
