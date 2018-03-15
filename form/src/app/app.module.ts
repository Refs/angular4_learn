import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    MobileValidatorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
