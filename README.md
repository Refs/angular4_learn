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
