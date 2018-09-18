import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-user-followers',
  templateUrl: 'user-followers.html',
})

export class UserFollowersPage {

  followers: Observable<any[]>;
  uidFollowers;
  uid: string = this.navParams.get('uid');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolloweesPage');
    this.uidFollowers = this.uid + "-followers";
    this.followers = this.afDB.list('user-data/' + this.uidFollowers).valueChanges();
  }

  goToProfilePage(event, follower) {
    this.navCtrl.push(UserPage, follower)
  }

}
