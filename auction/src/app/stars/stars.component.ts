import { Component, OnInit, Input} from '@angular/core';
// import {Input} from '@angular/compiler/src/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()
  private rating = 0;
  private stars: boolean[];
  constructor() {}

  ngOnInit() {
    this.stars = [];
    for (let i = 1; i <= 5; i++){
      //注意这个boolean值的生成方式，若传入的rating为3.5 则前面三个i 都会是false 后面两个为true;
      //即其会根据父组件传入的rating值的大小，而生成不同的数组，前台根据不同的boolean去生成相应的实心的货空心的星星；
      this.stars.push(i > this.rating);
    }
    // this.stars = [false, false, true, true, true];
    // this.rating = 0;
  }

}
