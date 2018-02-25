import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero2-birthday',
  templateUrl: './hero2-birthday.component.html',
  styleUrls: ['./hero2-birthday.component.css']
})
export class Hero2BirthdayComponent implements OnInit {

  birthday: any = new Date(1988, 3, 2);
  toggle: any = false;

  get formate () {
    return this.toggle ? 'mediumDate' : 'short';
  }

  toggleFormate() {
    this.toggle = !this.toggle;
  }

  constructor() { }

  ngOnInit() {
  }

}
