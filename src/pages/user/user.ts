import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { UserFollowersPage } from '../user-followers/user-followers';
import { UserFolloweesPage } from '../user-followees/user-followees';
import { FollowersPage } from '../followers/followers';
import { FolloweesPage } from '../followees/followees';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage {

  user = firebase.auth().currentUser
  displayName1 = this.user.displayName;
  uid1 = this.user.uid;

  followerCount: Observable<any[]>;
  followeeCount: Observable<any[]>;
  activity: Observable<any[]>;

  fullname: string = this.navParams.get('fullname');
  displayName: string = this.navParams.get('displayName');
  uid: string = this.navParams.get('uid');

  followeeUsername: string = this.navParams.get('followeeUsername')

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad User: '+(this.uid)+' UserPage');
    this.followeeUsername;
    this.displayName;
    this.fullname;
    this.uid;

    var activity = this.uid+"-activity";

    this.followerCount = this.db.list("user-data/"+(this.uid)+"-followers").valueChanges();
    this.followeeCount = this.db.list("user-data/"+(this.uid)+"-followees").valueChanges();
    
    this.activity = this.db.list('user-data/'+activity).valueChanges()
    .map((array) => array.reverse()) as Observable<any[]>;
  }

  goToFollowers(event, uid) {
    this.navCtrl.push(UserFollowersPage, uid)
  }

  goToFollowees(event, uid) {
    this.navCtrl.push(UserFolloweesPage, uid)
  }

  goToDetailPage(event, active) {
    this.navCtrl.push(ArticleDetailPage, active)
  }

  follow() {
    const activity1 = this.db.list("user-data/"+this.uid1+"-activity")
      activity1.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followeeFullname: (this.fullname), followerUsername: (this.displayName1), followerUid: (this.uid1),
      followingIsTrue: (true) });
    
    const followees = this.db.list("user-data/"+this.uid1+"-followees")
      followees.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followeeFullname: (this.fullname), followerUsername: (this.displayName1), followerUid: (this.uid1),
      followingIsTrue: (true) });
    
    const follower = this.db.list("user-data/"+this.uid+"-followers")
      follower.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followerUsername: (this.displayName1), followerUid: (this.uid1), followedIsTrue: (true) });
    
    const activity2= this.db.list("user-data/"+this.uid+"-activity")
      activity2.push({ followeeUid: (this.uid), followeeUsername: (this.displayName),
      followerUsername: (this.displayName1), followerUid: (this.uid1), followedIsTrue: (true) });
  }

}
