import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmailRevolverService {

  constructor(
    private emailService: EmailService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Email> {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => { // if there is an error, it will redirect to not-foud route
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY;
      })
    )
  }
}
