import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth) {
                this.afAuth.authState.subscribe( (user) => {
                  if (!user) {
                    this.navCtrl.setRoot(WelcomePage,{})
                    console.log("User: "+(user.uid)+" sign out")
                  }
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettingsPage');
  }

  signOut() {
   return this.afAuth.auth.signOut()
    .then(() => 
      console.log("success"))
    .catch(error => 
      console.log(error));
  }


}
