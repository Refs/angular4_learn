import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service.client';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;

  constructor( private userSerivce: UserService, private route: ActivatedRoute ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const id: number =  parseInt( this.route.snapshot.paramMap.get('id') ) ;
    this.userSerivce.getUser(id)
      .subscribe(
        user => this.user = user
      );
  }

}
