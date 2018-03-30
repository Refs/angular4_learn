import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';

@Injectable()
export class UserService {

  private usersUrl = 'https://reqres.in/api/users';

  constructor (private http: Http) {
  }

  // grap all users

  // type this method return, this getUser method is going to return an Observable. and this observable will have an array of users


  /**
   * getUser method
   * @returns {Observable<[User]>}
   * @memberof UserService
   */
  getUsers(): Observable<[User]> {
     return this.http.get(this.usersUrl)
      .map(
        res => res.json().data
      )
      // catch is a rxjs operator we still need to load it in the app.module.ts
      // .catch(
      //   err => Observable.throw(err.json().data || 'there is a server error!')
      // );
      // tslint:disable-next-line:max-line-length
      // we could create a to handle all sorts of errors no matter wtat kind of call we're making and no matter what kind of server. let's go head further and try to make a more robust error handler
      .catch(
        err => {
          let errMessage: string;
          // tslint:disable-next-line:max-line-length
          // the cool thing the HTTP library does is it returns everything using that fecth standard we talking about . fecth standard will return a response , so we can use response to type hint what is coming back from our catch statement;
          if (err instanceof Response ) {
            // https://fetch.spec.whatwg.org/#responses  fecth standard
            // 如果 err  是 Response 实例，A response has an associated body (null or a body). Unless stated otherwise it is null（除非另有说明 否则为空）.
            // 我们可以使用response.json()去获取response的body, 当然这是body不为空的情况下；
            // tslint:disable-next-line:prefer-const
            let body = err.json() || '';
            // tslint:disable-next-line:prefer-const
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;

          } else {
            // tslint:disable-next-line:max-line-length
            // if a message comes through from the server , we'll set errMessage equal that message, otherwise we will take whatever coming back from the server and just convert it to string;
            errMessage = err.message ? err.message : err.toString();
          }

          return Observable.throw(errMessage);
        }
      );

  }

  // get a single user

  // create a user

  // update a user

  // delete a user

  // tslint:disable-next-line:max-line-length
  // the service will be incharge of all of those things we just comment, and once we use the service, the component wont't need to deal with HTTP anymore

  // tslint:disable-next-line:max-line-length
  //  we're only creating the observables in this service. this service is not responsible for subscribing to get any data here . we just create cold observables. the app component will subscribe to it

}


