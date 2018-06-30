#  Angular Shared Modules And Lazy Loading  

> https://www.youtube.com/watch?v=SBSnsNHQYo4

In this lesson we are going to cover lazy loading and services . We are going to see how should we configure our services in the case that we have a shared module that is used in both the root application or one of its synchronously loaded feature moduls and and other modules that are lazy loaded . 

It is coming right up , let's first understand the problem we are trying to resolve , so take a look at this simple example: 

```ts
/* lessons.service.ts */

import { Injectable } from '@angular/core';

@Injectable()
export class LessonsService {
    constructor() {
        console.log('built lessons service instance ... ')
    }
}

```


```ts
/* courses.module.ts */

const routeConfig = [
    {path: '', component: Course},
    {path: 'legacy-list', redirectTo: '/lessons', pathMatch: 'full' },
    { 
        path: ':id', 
        canActivate: [CanCourseDetailActivate], 
        canDeactivate: [CanCourseDetailDeactivate],
        component: CourseDetail
    }

]

```