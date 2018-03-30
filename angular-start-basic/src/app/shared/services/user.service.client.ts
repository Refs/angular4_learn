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
      .catch( this.handleError );

  }

  // get a single user

  // create a user

  // update a user

  // delete a user

  // tslint:disable-next-line:max-line-length
  // the service will be incharge of all of those things we just comment, and once we use the service, the component wont't need to deal with HTTP anymore

  // tslint:disable-next-line:max-line-length
  //  we're only creating the observables in this service. this service is not responsible for subscribing to get any data here . we just create cold observables. the app component will subscribe to it


/**
 *
 * handle any error from any server
 * @private
 * @param {any} err
 * @returns
 * @memberof UserService
 */
private handleError(err) {
    let errMessage: string;
    if (err instanceof Response ) {
      // tslint:disable-next-line:prefer-const
      let body = err.json() || '';
      // tslint:disable-next-line:prefer-const
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;

    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}


