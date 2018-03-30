// import Routes | ModuleWithProviders to give us type hints, when we code ;
// the type hints is always useful because it call always tell us if we have a route that isn't configured correctly

import { RouterModule , Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

export const routes: Routes  = [
  // the type hints is always useful because it call always tell us if we have a route that isn't configured correctly
  // tslint:disable-next-line:max-line-length
  // I really like building the entire routing file from beging because we know how we our application is going to look , and it kind of gives us an outline of how to move through our application  as we build it
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    // children: [
    //   {
    //     path: '',
    //     component: UserListComponent
    //   },
    //   {
    //     path: 'create',
    //     component: UserCreateComponent
    //   },
    //   {
    //     path: ':id',
    //     component: UserSingleComponent
    //   },
    //   {
    //     path: ':di/edit',
    //     component: UserEditComponent
    //   }
    // ]
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

// bring this router module into our app module

