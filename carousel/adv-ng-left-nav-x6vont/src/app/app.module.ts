import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router, NavigationStart } from '@angular/router';

import { AppComponent } from './app.component';
import { LeftNavComponent } from './left-nav.component';
import { LeftNavDirective } from './left-nav.directive';
import { LeftNav } from './left-nav.service';
import { RouteA } from './route-a.component';
import { RouteB } from './route-b.component';
import { RouteC } from './route-c.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'a', component: RouteA},
      {path: 'b', component: RouteB},
      {path: 'c', component: RouteC},
      {path: '', pathMatch: 'full', redirectTo: 'a'},
    ]),
  ],
  declarations: [
    AppComponent,
    LeftNavComponent,
    LeftNavDirective,
    RouteA,
    RouteB,
    RouteC,
  ],
  bootstrap:    [ AppComponent ],
  providers: [
    LeftNav,
  ]
})
export class AppModule {

  constructor(router: Router, leftNav: LeftNav) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        leftNav.clearContents();
      }
    })

  }
}
