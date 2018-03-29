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




