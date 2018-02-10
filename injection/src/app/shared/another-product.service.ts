import { Injectable } from '@angular/core';
import { ProductService, Product } from './product.service';
import { LoggerService } from './logger.service';

@Injectable()
// 首先AnotherProductService要实现ProductService,这就意味着前者拥有与后者相同的方法，
export class AnotherProductService implements ProductService {
  private logger: LoggerService;
  getProduct(): Product {

    return new Product(2, 'iphone8', 8777, '17年最新款，最NB的手机' );
  }

  constructor() { }

}
