import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email: string;
  password: string;
  date;
  currentTime;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe( (user) => {
      if (user) {
        this.navCtrl.setRoot(TabsPage,{})
      }
    })
  }

  userLogin() {
    return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => { 
      this.date = new Date();
      this.currentTime = this.date.getTime();
      let user = firebase.auth().currentUser;
      let uid = user.uid;
      console.log("login: " + uid);
      const userData = this.db.object('user-data/' + uid);
      userData.update({ signedIn: (this.currentTime)});
      this.navCtrl.push(TabsPage);
    })
    .catch(error => 
      console.log("login error: " + error));
  } 
}