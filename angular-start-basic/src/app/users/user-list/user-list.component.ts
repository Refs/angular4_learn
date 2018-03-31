import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service.client';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: [User];
  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
        console.log(this.users);
      }
      );
  }

}
