import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailRevolverService {

  constructor(private emailService: EmailService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Email> {
    const { id } = route.params;
    return this.emailService.getEmail(id);
  }
}
