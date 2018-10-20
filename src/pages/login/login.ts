import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  email;
  password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( (user) => {
      if (user) {
        this.navCtrl.setRoot(TabsPage,{})
      }
    })
  }

  userLogin() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    this.afAuth.authState.subscribe( (user) => {
      if (user) {

      }
    })
    this.navCtrl.push(TabsPage)
  } 
}
