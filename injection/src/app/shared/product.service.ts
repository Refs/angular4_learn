import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor() { }
  //1.3 声明一个getProduct()方法，返回一个Product类型的实例
  getProduct() : Product {
      return new Product(0,'iphone7',5899,'最新款iphone7手机')
  }

}
export class Product {
  //1.2 利用构造函数来定义里面的字段，
  constructor(
      public id:number,
      public title:string,
      public price:number,
      public desc:string
  ){}
}
