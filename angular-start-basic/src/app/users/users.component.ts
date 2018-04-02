import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service.client';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

}
