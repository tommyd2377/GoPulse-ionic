import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserPage } from '../user/user';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-followees',
  templateUrl: 'followees.html',
})

export class FolloweesPage {

  user = firebase.auth().currentUser;
  uid = this.user.uid;

  followees: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolloweesPage');
    var uidFollowees = this.uid+"-followees";
    this.followees = this.afDB.list('user-data/'+uidFollowees).valueChanges();
    console.log(this.followees)
  }

  goToProfilePage(event, followee) {
    this.navCtrl.push(UserPage, followee)
  }

}
