import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, BannerCtrlDirective } from './app.component';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule ],
  declarations: [ AppComponent, BannerCtrlDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
