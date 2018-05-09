# angular4_learn

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
