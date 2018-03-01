import { Component, OnInit, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input()
  greeting: string;

  @Input()
  user: {name: string};

  message = '初始化消息';

  constructor() { }

  ngOnInit() {
  }

}
