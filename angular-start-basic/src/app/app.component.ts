import { Component , OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { User } from './shared/models/user.model';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { UserService } from './shared/services/user.service.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app';
  users: [User];

  constructor (private userservice: UserService ) {

  }

  ngOnInit () {
    this.userservice.getUsers()
      .subscribe(
        users => this.users = users
      );
  }
}


// tslint:disable-next-line:max-line-length
// we injected private HTTP directly in the component , in the futrue we want to use HTTP and abstract it into a service , where we want to use HTTP ; we don't want to inject straghtly into the component , the component itself should not be concerned with how it gets data ,it just needs to know that it uses a service to get data , and the service is going to be what is reponsible for implementing the data getting and data creation or whatever we need to with our API

// 目的就是将HTTP从组建中彻底的分离出去；组建不需要去关心去服务器请求东西，其如果有需要就去userService去要；
