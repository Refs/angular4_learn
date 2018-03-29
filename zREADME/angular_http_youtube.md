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





