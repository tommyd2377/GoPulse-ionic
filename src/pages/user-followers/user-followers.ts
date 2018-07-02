import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserPage } from '../user/user';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-user-followers',
  templateUrl: 'user-followers.html',
})

export class UserFollowersPage {

  followers: Observable<any[]>;

  uid: string = this.navParams.get('uid');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolloweesPage');
    var uidFollowers = this.uid+"-followers";
    this.followers = this.afDB.list('user-data/'+uidFollowers).valueChanges();
  }

  goToProfilePage(event, follower) {
    this.navCtrl.push(UserPage, follower)
  }

}
