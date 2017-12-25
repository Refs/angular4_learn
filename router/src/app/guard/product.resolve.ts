
// 这个组件的意义在于， 在进入商品详细信息路由之前，先读取商品的信息，读取好了之后，携带信息进入路由里面；

import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Product} from '../product/product.component';
import {Observable} from 'rxjs/Observable';

// 指定泛型就是 resolve 要解析出 数据的类型； 比如说我们现在想解析出 商品信息 这个数据类型 Product；
// 首先在产品组件里面声明一下Product类型，再将这个这个类 import进来；

export class ProductResolve implements Resolve<Product> {
  constructor(private router: Router) {
  }
  // ActivatedRouteSnapshot实际上就是，前面我们将路由参数传递的时候`this.routeInfo.snapshot.params['id']`即：
  // this.routeInfo.snapshot已经作为一个参数ActivatedRouteSnapshot的实例route传到resolve方法里面了；
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
    const productId: number = route.params['id'];
    if (productId === 1) {
      // 我们这地方并不会去真正的去发送请求，而只是做简单的判断，认为productId若等于1，则就是正确的，否则就id是错误的；
      // 若id是1,就返回一个指定泛型的实例；
      return new Product(1, 'iphone7');
    }else {
      // 若认为当前是一个错误的id的时候，就将其导航走；
      // 导航需要用到Router类的实例对象的 navigate方法，按照官方APi上的描述，我们先通过Constructor构造函数来creates the router service;创建router的实例，然后调用router的方法，进行导航；
      // 声明一个属性router，利用constructor函数，使其成为Router类的一个实例，然后通过调用该实例的navigate()方法，来完成导航；
      // 注意一点： ProductResolve类要用@injectable()装饰器装饰起来，因为只有这样 router类 才能注入进来，我们才能去调用constructor(private router: Router){}，而平常使用的component类之所以不用添加这个装饰器，是因为component已经继承了这个装饰器了；
      this.router.navigate(['/home']);
      return undefined;
    }
  }

}
