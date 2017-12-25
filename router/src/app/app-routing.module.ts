import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {Code404Component} from './code404/code404.component';
import {ProductDescComponent} from './product-desc/product-desc.component';
import {SellerInfoComponent} from './seller-info/seller-info.component';
import {ChatComponent} from './chat/chat.component';
import {LoginGuard} from './guard/login.guard';
import {UnsavedGuard} from './guard/unsaved.guard';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full' },
  // 辅助路由配置的方式与主路由的配置方式类似，只不过其要多一个配置outlet, 即指明当前的路由要显示在哪一个‘插座上面’，其它的没有定义outlet属性的路由，都会显示没有name属性的‘主插座’上面，
  {path: 'chat', component: ChatComponent, outlet: 'aux'},
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent, children: [
      {path: '', component: ProductDescComponent},
      // 注意子路由的配置 是相对于当前主路由的配置来的， 即如果我们想显示SellerInfoComponent组件的内容，浏览器的地址栏应该是 /product/3/seller/2的形式
      {path: 'seller/:id', component: SellerInfoComponent}
      // canActivate 属性的值可以是一个数组，这就意味着其可以接受多个路由守卫 当应用试图进入到此路由时，这个数组中指定的所有的守卫，会被依次去调用，若一旦有其中一个守卫返回为false 则路由请求，会被拒绝掉；我们现在只有loginGuard这一个守卫
    ], canActivate: [LoginGuard],
    canDeactivate: [UnsavedGuard]
  },
  // 我们在这地方只是指定了，路由护卫的类型，是LoginGuard这个类，但是谁来实例化这个类；angular将会使用依赖注入的机制来实例化这个类，依赖注入是后面的内容，
  // 现在我们只要在该模块@NgModule装饰器中的参数对象的providers属性中声明一下LoginGuard就可以了；
  {path: '**', component: Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard, UnsavedGuard]
})
export class AppRoutingModule { }
