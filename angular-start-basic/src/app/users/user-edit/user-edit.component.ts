import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service.client';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor( private userService: UserService, private route: ActivatedRoute ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const id = parseInt( this.route.snapshot.paramMap.get('id')) ;
    this.userService.getUser(id)
      .subscribe(
        user => {
          this.user = user;
          console.log(this.user);
        }
      );
  }

}
