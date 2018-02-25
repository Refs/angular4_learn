import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Hero2BirthdayComponent } from './hero2-birthday/hero2-birthday.component';


@NgModule({
  declarations: [
    AppComponent,
    Hero2BirthdayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
