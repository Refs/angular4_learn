# angular2 - HTTP & Observables

> youtube : https://www.youtube.com/watch?v=ZDVN1uijFqY&list=PL67QbqrRRyyRzUcK5qJc5AOvit5_RPE1O

## curse1: getting started

> 在线 API 接口 : https://reqres.in/ 

> 课程代码 起步模板： `angular2-starter-basic`  : https://github.com/scotch-io/angular2-starter-basic 

* grap the http library | grap the forms module

```ts
// in app.module.ts

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
//   ...
  imports: [
    HttpModule,
    FormsModule
  ]
//   ....
})
export class AppModule { }


```


* create a new folder `shared`  and folder 'shared/models'

```bash

cd src/app/
mkdir shared 
mkdir shared/models
cd shared/models
touch user.model.ts

```

> in the models folder we can create user class ,so we can use that class across whole application . we are going to list users, creating users, updating users. it makes sense to have a user model so that we know what a user object looks like   
* code user.model.ts

```ts
// user.model.ts中

export class User {
  id: Number;
  first_name: String;
  last_name: String;
  avatar: String;
}

```

## course2: Observable Overview

> Promise is something that we send out once and we get one piece of information back. An Observable is actrually a data stream over time of a call that we can mke multiple times . so really what we're saying is we're going to have a pieceof data which we make a call just like a promise , so we have information here, then we we can actrually subscribe to that data stream and seehow the data works over time. so if we make a call to go grab , `let's say comments on a post (微博的评论) we can watch that stream ans as new comments come in we can see that data over time this really helps us make real-time reactive applications where we can actrually react on new data as it's coming through our stream`

### promise 与 observable的区别

*  对于promise , 无论是否去调用then, promise都会被立即去执行； 而observable 只是被创建，并不会去执行， 而只有在真正需要结果的时候，被订阅的时候，其才会去执行；  `如 去请求一个url，那对于promise来说，then的作用是处理返回结果，而http请求在第一步就已经发送了； 相反，对于observable来说，由于它发现你其实现在并不需要异步调用的结果，所以它干脆就不发送请求，而只有你真正需要响应数据的时候才会发送请求。。`

```ts

// 记本使用方式就是 创建一个 observable factory function 
getUsers() {
    return this.http.get('http://dfasd/api/comments');
}

// call the factory function in a higher level file. and subscribe the observable instance;
this.getUsers()
    .subscribe(
        users => console.log(users)
    )

```


* observable可以retry，或者多次调用。而promise 的状态一旦确定下来之后，就不会去改变了； 对于promise，不论在后面怎么调用then，实际上的异步操作只会被执行一次，多次调用没有效果；但是对于observable，多次调用forEach或者使用retry方法，能够触发多次异步操作。 if an observable makes a call and it doesn't go through we can actrually tell it to retry that call maybe three times . we can also relay a call so that we can take an HTTP call and relay it ;


## course3 First HTTP Call 

> the angular library follow the fecth standard for API calls and it's a standardized way to pass data around between  different sites > this going to a Response from the fectch standard and response always has a json methos on it to get all of the data out of that call . we don't have to worry about the implementation of the fetch standard . the cool thing about fetch is that it gives us a standardized way to get information about headers and different parts of the server that we're hitting  ;  

```ts
// app.component.ts中

// load Http OnInit 
import { Component , OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // custom a users variable which type is Array of User the class we define in ``shared/models/user.model.ts file;
  users: [User];

  constructor (private http: Http ) {

  }

  ngOnInit () {
    this.http.get('https://reqres.in/api/users')
      .subscribe(
          // since angular fellow fetch standard, the data's type is Response, all of the information is in the body of the Response instance, to utilize the information , we have to resolve the instance. because every Response instance have a json method, so we can call the method to resolve itself; 
          // 即我们之所以可以去调用json 方法，是因为Reponse 类型上面有这样一个json对象方法； 要明白这个本质，而不是盲从；
        // data => console.log(data)
        // data => console.log(data.json())
        data => this.users = data.json().data
      );
  }
}


```


```html
<!-- app.component.html中 -->

<h1>fadfasd</h1>

<div *ngIf= "users">
  <div *ngFor= "let user of users" >
    <h2> {{user.first_name}} </h2>
  </div>
</div>

```



> we injected private HTTP directly in the component , in the futrue we want to use HTTP and abstract it into a service , where we want to use HTTP ; we don't want to inject straghtly into the component , the component itself should not be concerned with how it gets data ,it just needs to know that it uses a service to get data , and the service is going to be what is reponsible for implementing the data getting and data creation or whatever we need to with our API
## course4 RxJS Operator

> mao is going to take hte data that we have and we can manipulate it and pass it back so that our HTTP call is just going to reformat the data 

> map doesn't exist on observable type yet , observable is very modular and we have to bring in the operators that we want to use 

```ts
// app.component.ts中

import { Component , OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user.model';
// load map and toPromise operator;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: [User];

  constructor (private http: Http ) {

  }

  ngOnInit () {
    this.http.get('https://reqres.in/api/users')
      .map(
        res => res.json().data
      )
      .subscribe(
        users => this.users = users
      );
     this.http.get('https://reqres.in/api/users')
      .toPromise()
      .then(
        data => console.log(data)
      );
  }
}

```

> we're importing these operators inside of app.component.ts , it's okay to let the here since app.component is going to encompass our entire app , so these operator would apply to our entire app , we like to improving this and bring those into app.module.ts this is where we import everything for our entire app 

```ts
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// 只需要在顶层去引用，组建中的引用，都可以删除了；
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## course5 Starting UserService

> let's removing HTTP and stopping from injecting it into a component , create a services folder in shared folder, in the folder we touch a new file user.service.client.ts 

```ts
// user.service.client.ts 

import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  // note 1 we won't use hard code url  in the http methods;
  private usersUrl = 'https://reqres.in/api/users';

  constructor (private http: Http) {
  }

    // nodte 2 give the method a return type, and document the method. so that in the file that call this method , we can see the document intelinces; 
  /**
   * getUser method
   * @returns {Observable<[User]>}
   * @memberof UserService
   */
  getUsers(): Observable<[User]> {
     return this.http.get(this.usersUrl)
      .map(
        res => res.json().data
      );
  }

  // get a single user

  // create a user

  // update a user

  // delete a user

  // tslint:disable-next-line:max-line-length
  // the service will be incharge of all of those things we just comment, and once we use the service, the component wont't need to deal with HTTP anymore

  // tslint:disable-next-line:max-line-length
  //  we're only creating the observables in this service. this service is not responsible for subscribing to get any data here . we just create cold observables. the app component will subscribe to it

}

```

> in the component which will use above service

```ts
// app.component.ts

import { Component , OnInit } from '@angular/core';
import { User } from './shared/models/user.model';
import { UserService } from './shared/services/user.service.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: [User];

  constructor (private userservice: UserService ) {

  }

  ngOnInit () {
    this.userservice.getUsers()
      .subscribe(
        users => this.users = users
      );
  }
}

```


## course 6 Error Handing

> handing errors when we talk to any sort of API is really important because even though we know what the format is going be of the content that we get back, but sometime that data might not come back the way we think it will , there might be a server error , there might be an error in the connection , alot of different things could go wrong 
> the way we handing the errors in working with the HTTP library and Observables is to use `catch`

* 首先要使用到rxjs 的catch 操作符， 在app.module.ts 中将其引入

* 其次在比对错误信息类型的时候，需要引入Response类型， 在 @angular/http将其引入

* fectch standard标准 https://fetch.spec.whatwg.org/#responses  

```ts
//  在 user.service.client.ts中

import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';

@Injectable()
export class UserService {

  private usersUrl = 'https://reqres.in/api/users';

  constructor (private http: Http) {
  }
  /**
   * getUser method
   * @returns {Observable<[User]>}
   * @memberof UserService
   */
  getUsers(): Observable<[User]> {
     return this.http.get(this.usersUrl)
      .map(
        res => res.json().data
      )

      // we could create a to handle all sorts of errors no matter wtat kind of call we're making and no matter what kind of server. let's go head further and try to make a more robust error handler
      .catch(
        err => {
          let errMessage: string;
          // tslint:disable-next-line:max-line-length
          // the cool thing the HTTP library does is it returns everything using that fecth standard we talking about . fecth standard will return a response , so we can use response to type hint what is coming back from our catch statement;
          if (err instanceof Response ) {
            // https://fetch.spec.whatwg.org/#responses  fecth standard
            // 如果 err  是 Response 实例，A response has an associated body (null or a body). Unless stated otherwise it is null（除非另有说明 否则为空）.
            // 我们可以使用response.json()去获取response的body, 当然这是body不为空的情况下；
            // tslint:disable-next-line:prefer-const
            let body = err.json() || '';
            // tslint:disable-next-line:prefer-const
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;

          } else {
            // tslint:disable-next-line:max-line-length
            // if a message comes through from the server , we'll set errMessage equal that message, otherwise we will take whatever coming back from the server and just convert it to string;
            errMessage = err.message ? err.message : err.toString();
          }

          return Observable.throw(errMessage);
        }
      );

  }

}


```

> refactory above code : reuse the error handle process

```ts

//  在 user.service.client.ts中

import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';

@Injectable()
export class UserService {

  private usersUrl = 'https://reqres.in/api/users';

  constructor (private http: Http) {
  }
  /**
   * getUser method
   * @returns {Observable<[User]>}
   * @memberof UserService
   */
  getUsers(): Observable<[User]> {
     return this.http.get(this.usersUrl)
      .map(
        res => res.json().data
      )
      .catch( this.handleError );
  }


    /**
   * get a single user
   *
   * @returns {Observable<User>}
   * @memberof UserService
   */
  getUser(): Observable<User> {
    return this.http.get('http://example.com/api/')
      .map(
        res => res.json().data
      )
      .catch(this.handleError);
  }

  /**
 *
 * handle any error from any server
 * @private
 * @param {any} err
 * @returns
 * @memberof UserService
 */
private handleError(err) {
    let errMessage: string;
    if (err instanceof Response ) {
      // tslint:disable-next-line:prefer-const
      let body = err.json() || '';
      // tslint:disable-next-line:prefer-const
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;

    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}

```


## Course 7 Users Component

> 主要是学习 父组件与子组件，在文档树里面的嵌套结构; 即逻辑上是嵌套关系，在文档的结构上面也是一个嵌套的关系；

```bash
cd src/app
ng g component users

# 若想去生成一个组件的子组件，要先进到该组建所在的文件夹里面，然后在正常的使用生成组件的命令就可以了；
cd users
ng g component user-create
ng g component user-edit
ng g component user-list
ng g component user-single

# 最后的文档树

|--src/
|  +--app/
|     +--users/
|        +--users.component.ts
|        +--users.component.html
|        +--user-create/
|           +--user-create.component.ts
|           +--user-create.component.html


```

## Course 8 Routing Our App

> 学习设计： 首先利用 sketch 或  adobe XD 将应用的原型设计出来，然后将其路由的轮廓设计出来；  I really like building the entire routing file from beging because we know how we our application is going to look , and it kind of gives us an outline of how to move through our application  as we build it
> 在app 目录下 新建一个文件 app.routing.ts 主要是学习如何将路由的配置 与 app.module.ts分割开来； 用一个单独的文件，去专门负责路由的配置

* 在app.routing.ts中去配置路由，细节就是，引入Routes 与 ModuleWithProviders 的意思在于，能够进行类型提示，这样当我们在配置路由的过程中出错的时候，其会进行相应的提示；

```ts
// app.routing.ts中

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

```

* 在 app.module.ts中将 routing 引入

```ts

import { routing } from './app.routing';
@NgModule({
  imports: [
    // routing = RouterModule.forRoot(routes) 按照这个式子，就与官方的文档保持一致了；
    routing
  ]
})

```

* 在index.html 中设置路径的编译的绝对位置

> Most routing applications should add a <base> element to the index.html as the first child in the <head> tag to tell the router how to compose navigation URLs.

```html
<base href='/' >

```

* 在host 组件中设置插座 outlet 的位置, 路由所匹配的组件 会在outlet 之后的位置显示；

```html
<router-outlet></router-outlet>
<!-- Routed views go here -->

```

## Course 9 Users List Component

*  在项目中引入jquery 与 bootstrap






















