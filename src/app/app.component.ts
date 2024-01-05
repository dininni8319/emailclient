import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // first approach
  // signedIn = false

  // second approach
  signedin$!: BehaviorSubject<boolean | null>

  constructor(
    private authService: AuthService
  ) {

    // second approach
    this.signedin$ = this.authService.signedIn$
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(() => {})
    // setTimeout(() => {
    //   this.authService.signout().subscribe(() => {})
    // }, 5000)
  }
}
