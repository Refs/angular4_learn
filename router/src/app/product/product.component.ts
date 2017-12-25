import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private productId: number;
  constructor(private routeInfo: ActivatedRoute)  { }

  ngOnInit() {
    // this.productId = this.routeInfo.snapshot.params['id']; 参数快照的方式；
    this.routeInfo.params.subscribe((params: Params) => this.productId = params['id']);
 }

}

export class Product {
  constructor(public id: number, public name: string) {
  }
}
