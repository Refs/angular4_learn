// import Routes | ModuleWithProviders to give us type hints, when we code ;
// the type hints is always useful because it call always tell us if we have a route that isn't configured correctly

import { RouterModule , Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes  = [
  // the type hints is always useful because it call always tell us if we have a route that isn't configured correctly
  // tslint:disable-next-line:max-line-length
  // I really like building the entire routing file from beging because we know how we our application is going to look , and it kind of gives us an outline of how to move through our application  as we build it


];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

