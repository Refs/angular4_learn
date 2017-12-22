import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Array<Product>;

  private imgUrl = 'http://placehold.it/320x150';

  constructor() { }
  ngOnInit() {
    this.products = [
      new Product(1, '第一个商品', 1.99, 3.5, '我是第一个商品，看清楚没有', ['电子产品', '硬件设施']),
      new Product(2, '第二个商品', 2.99, 2.5, '我是第二个商品，看清楚没有', ['电子产品']),
      new Product(3, '第三个商品', 3.99, 3.5, '我是第三个商品，看清楚没有', [ '硬件设施']),
      new Product(4, '第四个商品', 4.99, 4.5, '我是第四个商品，看清楚没有', ['图书', '硬件设施']),
      new Product(5, '第五个商品', 5.99, 1.5, '我是第五个商品，看清楚没有', [ '图书']),
      new Product(6, '第六个商品', 6.99, 2.5, '我是第六个商品，看清楚没有', ['电子产品', '硬件设施']),
    ];
    this.products.push(new Product(6, '第七个商品', 6.99, 2.5, '我是第六个商品，看清楚没有', ['电子产品', '硬件设施']));
  }
}
export class Product{
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ){
  }
}
