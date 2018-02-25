import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Hero2BirthdayComponent } from './hero2-birthday/hero2-birthday.component';
import { ExponentialStrengthPipe } from './pipe/exponential-strength.pipe';


@NgModule({
  declarations: [
    AppComponent,
    Hero2BirthdayComponent,
    ExponentialStrengthPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
