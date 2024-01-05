import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { take, skipWhile, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const router: Router = new Router
  // we will return one value 
  // and will will mark as complete
  return inject(AuthService).signedIn$.pipe(
    skipWhile(value => value === null), // we skip values equal to null
    map(value => !!value),
    take(1), // we fake any subscriber that this is complete 
    // value comming throw the pipe
    tap(authenticated => {
      if (authenticated) {
        return true;
      } else {
        router.navigateByUrl('/')
        return false;
      }
    })
  )
};
