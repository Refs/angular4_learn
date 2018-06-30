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

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routeConfig),
        SharedMoudle
    ],
    declarations:[
        Courses,
        CoursesList,
        CourseDetail
    ],
    exports: [
        CoursesList
    ],
    providers: [
        CanCourseDetailDeactivate,
        CanCourseDetailActivate,
        // We are going to add the LessonsService to the providers of both our lay loaded module the courses module and to our root application as well
        LessonsService
    ]
})

```

```ts
/* courses.component.ts */

import ...

@component({
    selector: 'Courses',
    templete: `
        <h1> Courses <h1>
        <course-list [course]='course'></course-list>
    `
})
export class Courses {
    constructor(lessonsService: LessonsService) {}
    courses = coursesData.courses;
}


```

The lessons service like most services , but not all is meant to be an application wide singleton , this is probably the most common use case for a service, so we are gong to use this service in multiple palces of our application . Let's inject in the courses component and also  in the main component of our application ,

```ts
/* app.ts */




```


Lesson service is suppoed to be an application wipe singleton so , so why two instances when instance comes from the fact that we have added lesson service to the providers of course module and the second instance comes from the shred module which we have importrf into the courses module in order to fix this we need to understand what's going on  here.

Whenever we lay load a module what angular will do is it will create a dependency injection sub context fro that particular module which is a chell context of the root dependency injection module . So in a lazy loaded module with providers the services inside those providers are only visible to the module itself.  this is unlike when we import a feature module  in which case the services will be injected in a gobal dependency injection pool , why does this happen ? why is the dependency injection behavior different for the case of lazy loaded modules ?

There is a good reason for that a lesson service implementation used by the main application is actually a completely different implementation than the lesson service used by the lazy loaded module those might be two different version of the same service 

For example when we lazy load a module we want to make sure that none of the services that it brings overwrite anything in the main application  Otherwise we might fall into very hard to troubelshoot error situations where the behavior of our application is dependent upon the sequence of navigation actions that triggered lazy loaded modules 

The first thing we need to do to fix this issue is to remove LessonService from the list of providers of the shared module 

```ts
// shared.module.ts

import { NgMoudle } from '@angular/core';
import { LessonsList } from './lessons-list.component';
import { CommonModule } from '@angular/common';
// import { LessonService } from './lessons.service';

@NgModuel ({
    declarations: [LessonsList],
    exports: [LessonsList],
    imports: [CommonModule]
})
export class SharedModule {
    // we are going to create a static forRoot method , that is going to return a module with providers object , so the ngModule property is the module itself with all its component definitions and here we give the providers that are associated to the module so if someone simply imports the shared module . It would not receive the lesson service so how can the main module still have access to the lesson service well, instead of importing shared module we now need to call shared module dot 
}

```