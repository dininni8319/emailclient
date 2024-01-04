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

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // the dollars sign tells us that this is an Observable
  signedIn$ = new BehaviorSubject(false)
  constructor(private http: HttpClient) { }
  
  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signup(credentials: SignupCredential) {
    return this.http.post<SignupResponse>(
      `${this.rootUrl}/auth/signup`, 
      credentials
    ).pipe(
      tap(() => {
        this.signedIn$.next(true)
      })
    )
  }
}
