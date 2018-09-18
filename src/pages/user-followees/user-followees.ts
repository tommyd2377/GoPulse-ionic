import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-user-followees',
  templateUrl: 'user-followees.html',
})

export class UserFolloweesPage {

  followees: Observable<any[]>;
  uidFollowees;
  uid: string = this.navParams.get('uid');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolloweesPage');
    this.uidFollowees = this.uid + "-followees";
    this.followees = this.afDB.list('user-data/' + this.uidFollowees).valueChanges();
  }

  goToProfilePage(event, followee) {
    this.navCtrl.push(UserPage, followee);
  }

}
