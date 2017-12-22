import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {Code404Component} from './code404/code404.component';
import {ProductDescComponent} from './product-desc/product-desc.component';
import {SellerInfoComponent} from './seller-info/seller-info.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent, children: [
      {path: '', component: ProductDescComponent},
      // 注意子路由的配置 是相对于当前主路由的配置来的， 即如果我们想显示SellerInfoComponent组件的内容，浏览器的地址栏应该是 /product/3/seller/2的形式
      {path: 'seller/:id', component: SellerInfoComponent}
    ]},
  {path: '**', component: Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
