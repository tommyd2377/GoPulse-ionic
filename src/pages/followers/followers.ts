import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserPage } from '../user/user';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {

  user = firebase.auth().currentUser;
  uid = this.user.uid;

  followers: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolloweesPage');
    var uidFollowers = this.uid + "-followers";
    this.followers = this.afDB.list('user-data/' + uidFollowers).valueChanges();
  }

  goToProfilePage(event, follower) {
    this.navCtrl.push(UserPage, follower)
  }
}
