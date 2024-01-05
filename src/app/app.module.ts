import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule, // when the app is loaded, we will load this module
    SharedModule
  ],
  providers: [
    // override the DJ system, 
    // we are telling angular that if anyone asks for type HTTP_INTERCEPTORS
    // go ahead and add the class AuthHttpInterceptor
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthHttpInterceptor, 
      multi: true 
    }
  ], // old version of DJ
  bootstrap: [AppComponent]
})
export class AppModule { }
