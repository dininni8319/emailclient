import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, filter } from 'rxjs/operators'

// implements makes sure that we write code correctly
@Injectable() 
export class AuthHttpInterceptor implements HttpInterceptor {
  // can add logging inside this method to check the response that we got from the server
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler // next interceptor
  ): Observable<HttpEvent<any>> {
    // req.withCredentials = true // we can not modify directly this property
    // we have to clone the req object to modifiy or log the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    })
    // this is an Observable
    return next.handle(modifiedReq)
      // .pipe(
      //   // filter a specific event
      //   filter(val => val.type === HttpEventType.Sent),
      //   tap(val => {
      //     // we can hadle the different events that are coming out from the observable
      //     // we can use this to log the different events
      //    console.log('Sent the request!!');
         
      //     // if (val.type === HttpEventType.Sent) {
      //     //   console.log('Request was sent to the server');
      //     // }
      //     // if (val.type === HttpEventType.Response) {
      //     //   console.log('Got a response from the API', val);
      //     // }
      //   })
      // )
  }
}
