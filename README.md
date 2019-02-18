# angular4_learn

> https://www.youtube.com/watch?v=djsHG6thIlQ&list=PL67QbqrRRyyTAMKgM_kFcGRFjSBMchKc3&index=10&t=3s

http://xiaoshuangtech.com/accounts/profile?to=KVeCvM88xD1cLdfZLq5layNUVNLjI77JE5bkecoPA70pUfAw8UZawaVNEAZUt%2FCtJ68GBwZ0o%2FtByifXutA7%2Bg%3D%3D&from=win

## 如何让代码写的更优雅

* 公共的服务 http.server.ts  http.server.route.js

* 善于利用工厂函数：

```js
// 官方文档
import { ValidatorFn, AbstractControl } from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp) : ValidatorFn {
  return (control: AbstractControl): {[key:string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null
  }
}

// 教案
export function (control: AbsctractControl): {[key: string]: any} {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null
}

// 哪一种方式更优雅， 一看便知道
```
> 上述的代码都是写在一个validaotr.ts 中的，我们的使用的时候，就去直接通过import 去引用里面的验证函数然后去使用； 其实我们应该去更进一步，将这些方法都放在一个服务中，在使用的地方去注入该服务，然后去调用服务的方法；这就是注入与非注入的区别 若我们引用的是一个函数或对象，则我们无需去注入，而直接使用就可以了，但若我们通过import去引用的是一个类，则我们需要先实例化该类，然后再去调用类上面的方法，这就是依赖注入所要做的事情了；

* 所利用 ge set 函数 或别名等快捷方式

```js
ngOnInit(): void {
  this.heroForm = new FormGroup({
    'name': new FormControl(this.hero.name, [
      Validators.required,
      Validators.minLength(4),
      forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]),
    'alterEgo': new FormControl(this.hero.alterEgo),
    'power': new FormControl(this.hero.power, Validators.required)
  });
}

get name() { return this.heroForm.get('name'); }

get power() { return this.heroForm.get('power'); }
```

Instead you'll write a canActivate() guard to redirect anonymous users to the login page 


In ordre to prevent the route from loading until the data is fetched. The router gaurds require an observable to complete , meaning it has emitted all of its values . 

Import this resolver in the crisis-center-routing.module.ts and add a resolver object to the CrisisDetailComponent route configuration.

remember to add the CrisisDetailResolver service to the CrisisCenterRoutingModule's providers array.

In the route parameters example , you only dealt with paramwters specific to the route, but what if you wanted optional parameters available to all routes? this is where query parameters come into play.

Fragments refer to certain elements on the page identified with an id attribute.

Update the AuthGuard to provide a session_id query that will remain after navigationg to another route. 

Add an anchor element so that you can jump to certain point on the page.

Add the NavigationExtras object to the router.navigate method that navigates you to the /login route.

```ts
import { Injectable } from '@angular/core';
import {  CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor ( private anthService: AuthService, private router: Router) {}

  canActivate() {

  }


  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true};

    this.authService.redirectUrl = url;

    let sessionId = 123456;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        'session_id': sessionId
      },
      fragment: 'anchor'
    }

    this.router.navigate(['/login'], navigationExtras);
    return false;

  }
}


```

You can also preserve query parameters anf fragmeters across navigations without hhaving to provide them agin when navigating . In the LoginComponent , you'll add an objdect as the second argument in the router.navigate function and provide queryParamsHandling and preserveFragment to pas along the 

