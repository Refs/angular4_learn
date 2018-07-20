import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarouselDirective } from './carousel.directive';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, CarouselDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
