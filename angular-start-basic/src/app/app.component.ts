import { Component , OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app';
  users: [User];

  constructor (private http: Http ) {

  }

  ngOnInit () {
    this.http.get('https://reqres.in/api/users')
      .subscribe(
        // data => console.log(data.json())
        data => this.users = data.json().data
      );
  }
}


// tslint:disable-next-line:max-line-length
// we injected private HTTP directly in the component , in the futrue we want to use HTTP and abstract it into a service , where we want to use HTTP ; we don't want to inject straghtly into the component , the component itself should not be concerned with how it gets data ,it just needs to know that it uses a service to get data , and the service is going to be what is reponsible for implementing the data getting and data creation or whatever we need to with our API
