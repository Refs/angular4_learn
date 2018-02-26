import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // 输入属性首先是一个属性，第二是用@input()装饰器注解的属性，
  // 声明一个stockCode属性代表股票代码，并用@input()修饰器注明是一个输入属性；同理声明一个代表股票数量的输入属性amount
  @Input()
  stockCode: string;
  @Input()
  amonut: number;

  constructor(routeInfo: ActivatedRoute) { }

  ngOnInit() {
  }

}
