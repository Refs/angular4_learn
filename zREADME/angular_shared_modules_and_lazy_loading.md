#  Angular Shared Modules And Lazy Loading  

> 了解 angular 的方方面面， 而每一个方面，都有其要解决的问题；

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
    // we are going to create a static forRoot method , that is going to return a module with providers object , so the ngModule property is the module itself with all its component definitions and here we give the providers that are associated to the module so if someone simply imports the shared module . It would not receive the lesson service  

    static forRoot() : ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [LessonService]
        }
    }
}

```

so how can the main module still have access to the lesson service well, instead of importing shared module we now need to call sharedModule.forRoot() . 

```ts
/* app.ts */

export class App {
    constructor ( lessonService: LessonService ){

    }
}

@NgModule({
    declarations: [App],
    imports: [
        BrowserModule,
        RouterModule.forRoot( routeConfig ),
        // This is means that the application module will see all the components of the shared module and the LessonService will still be instantiated and added to the global dependency injection pool just like before . 

        // The difference is that now whenever we import the sharedModule into the courses module which is being lazy loaded a duplicate(完全一样的东西) instance of lesson service will not be creative but course module will still see the components of the sharedModule , one last thing  let's remove the declaaration of lesson service from the providers list as well if we try this oue we will see that we still have only one instance of LessonService being created at application start time but If we noe select the Courses menu , we are going to trigger the lazy loading od the courses module we , we can see that no more instances of lessonService were created and this is the behavior that we intended meaning the Lesson service is an application wide singleton . It's the same instance that gets used in our main appliaction module, in any feature module that is synchronously loaded and also in any module that gets lazy loaded and so discovers lazy loading and router as we can see it's a very userful feature for improving the performance of large application and it's very simple to configure in the router m we are now going to go over 
        SharedModule.forRoot()
    ]
})

```


## related acticles

1. When to use Angular’s forRoot() method

>  https://medium.com/@chrishouse/when-to-use-angulars-forroot-method-400094a0ebb7

2. The NgModule ‘forRoot()’ Convention 

> http://angularfirst.com/the-ngmodule-forroot-convention/

* The forRoot convention implies that a given module must be registered with the root NgModule of an application while involing the forRoot() method.  What is special about this method that it needs to called at the root of an application as opposed to any other NgModule?

Even though importing the additional providers fo the froRoot() methos 

Components and directives on the other hand are instantiated multiple times , once per instance in the markup. In addition . In addition , these items are scoped to the NgModule in which they are imported to prevent naming conflicts where teo compoennts might have the same selector for example . Because of this difference in dependency injection behavior , the need to differentiate an NgModule containing components and directive from a ModuleWithProviders con

Dependency injection , however , doesn't always work this simply . There are times when all the application's NgMouldes are not available during the bootstrap process. Lazy-Loading is such an example . When lazy-loading an NgModule during routing , the providers registered in the lazy-loaded NgModule and its children aren't available during the bootstrap process and Angular is unable to register them at that time . Therefore , they are added as providers only when the route is loaded and furthermore they are soped to the 

> 结论的做法是，创建一个 随意的 ShareModule 目的是为了利用 forRoot 方法，去封装 自己要在全局中使用的 service , 然后将其 注册在 根模块中， 这样 自己的lazy loading 模块，的组件或 指令类的构造函数中，就可以直接去 注入这个全局的服务； 此处的关键点 有一个 shareModule 的意义只有一个就是注册全局的 service. 

> 上面 再向 更深一层去挖掘就是，我们所创建的 module 依据不同的使用情况，也是可以进行分类的； 之前自己的最熟悉的莫过于 feature module 自己去创建这个module 来实现 懒加载； 而自己上述 自己在创建 用来注册 全局的， lazy loding module 和 eager module 都可以使用的 service 时，所创建的 module  就是 share Module

3. 根據 Style Guide 的模組章節，會建議我們會將 Angular 專案分成以下幾個模組：

共享模組 (SharedModule)
核心模組 (CoreModule)
特性模組 (FeatureModule)

> 参考文章： 使用 forRoot() 幫助 SharedModule 提供單一實例服務

https://poychang.github.io/use-forroot-to-provide-services-in-angular-shared-module/

> ****  参考文档： Angular: Understanding Modules and Services 用来理解上述的模块 分类 ，非常重要；

https://medium.com/@michelestieven/organizing-angular-applications-f0510761d65a