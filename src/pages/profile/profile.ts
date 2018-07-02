import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { FollowersPage } from '../followers/followers';
import { FolloweesPage } from '../followees/followees';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  user = firebase.auth().currentUser;
  uid = this.user.uid;

  followerCount: Observable<any[]>;
  followeeCount: Observable<any[]>;
  activity: Observable<any[]>;
  userData: Observable<any>;
  displayName: string;
  name: string;
  fullName: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
        
    console.log('ionViewDidLoad User: '+(this.uid)+' ProfilePage');
        
    var activity = this.uid+"-activity";

    this.followerCount = this.db.list("user-data/"+(this.uid)+"-followers").valueChanges();
    this.followeeCount = this.db.list("user-data/"+(this.uid)+"-followees").valueChanges();
        
    this.activity = this.db.list('user-data/'+activity).valueChanges()
      .map((array) => array.reverse()) as Observable<any[]>;

    this.userData = this.db.object('user-data/'+this.uid).valueChanges()
  
  }

  goToFollowers() {
    this.navCtrl.push(FollowersPage)
  }

  goToFollowees() {
    this.navCtrl.push(FolloweesPage)
  }
    
  goToDetailPage(event, active) {
    this.navCtrl.push(ArticleDetailPage, active)
  }

  goToSettingsPage() {
    this.navCtrl.push(ProfileSettingsPage)
  }

}
