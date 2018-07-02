import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  authState;

  constructor(public http: Http,
              private afAuth: AngularFireAuth) {

                this.afAuth.authState.subscribe((auth) => {
                  this.authState = auth;
                });
    
                console.log('Hello AuthProvider Provider');
  }

  authenticated(): boolean {
    return this.authState !== null;
  }

  currentUser() {
    return this.authenticated ? this.authState.auth : null;
  }
  
  currentUserId(): string {
    return this.authState.uid;
  }

}

