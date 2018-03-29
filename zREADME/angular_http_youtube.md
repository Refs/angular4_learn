# angular2 - HTTP & Observables

> youtube : https://www.youtube.com/watch?v=ZDVN1uijFqY&list=PL67QbqrRRyyRzUcK5qJc5AOvit5_RPE1O

## getting started

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







