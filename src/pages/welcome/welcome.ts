
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth) {

                this.afAuth.authState.subscribe((auth) => {
                  if (auth) {
                    this.navCtrl.setRoot(TabsPage,{})
                    console.log("User: "+(auth.uid)+" routed from welcome")
                  }
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  login() {
    this.navCtrl.push(LoginPage);    
  }

}
