import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { UserFollowersPage } from '../user-followers/user-followers';
import { UserFolloweesPage } from '../user-followees/user-followees';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage {

  currentUser = firebase.auth().currentUser;
  currentUserDisplayName = this.currentUser.displayName;
  currentUserUid = this.currentUser.uid;

  followerCount: Observable<any[]>;
  followeeCount: Observable<any[]>;
  activity: Observable<any[]>;
  followers: Observable<any[]>;

  fullname: string = this.navParams.get('fullname');
  displayName: string = this.navParams.get('displayName');
  uid: string = this.navParams.get('uid');

  followeeUsername: string = this.navParams.get('followeeUsername');
  followeeFullname: string = this.navParams.get('followeeFullname');
  followeeUid: string = this.navParams.get('followeeUid');
  
  followerUsername: string = this.navParams.get('followerUsername');
  followerFullname: string = this.navParams.get('followerFullname');
  followerUid: string = this.navParams.get('followerUid');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private db: AngularFireDatabase) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage. User: ' + (this.uid));
    this.followeeUsername;
    this.displayName;
    this.fullname;
    this.uid;

    const activity = this.uid + "-activity";

    this.followerCount = this.db.list("user-data/" + (this.uid) + "-followers").valueChanges();
    this.followeeCount = this.db.list("user-data/" + (this.uid) + "-followees").valueChanges();
    
    this.activity = this.db.list('user-data/' + activity).valueChanges()
      .map((array) => array.reverse()) as Observable<any[]>;
  }

  goToFollowers(event, uid) {
    this.navCtrl.push(UserFollowersPage, uid);
  }

  goToFollowees(event, uid) {
    this.navCtrl.push(UserFolloweesPage, uid);
  }

  goToDetailPage(event, active) {
    this.navCtrl.push(ArticleDetailPage, active);
  }

  follow() {
    const currentUserActivity = this.db.list("user-data/" + this.currentUserUid + "-activity");
      currentUserActivity.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followeeFullname: (this.fullname), followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid),
      followingIsTrue: (true) });
    
    const followees = this.db.list("user-data/" + this.currentUserUid + "-followees");
      followees.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followeeFullname: (this.fullname), followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid),
      followingIsTrue: (true) });

      this.followers = this.db.list('user-data/' + this.currentUserUid + '-followee-activity').valueChanges();
      this.followers.subscribe(results => {
        for (let result of results) {
          const followerActivity =  this.db.list('user-data/' + result.followerUid + '-followee-activity');
          followerActivity.push({ followeeUid: (this.uid), followeeUsername: (this.displayName),
            followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followingIsTrue: (true) });
        }
      })
    
    const follower = this.db.list("user-data/" + this.uid + "-followers");
      follower.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), 
      followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followedIsTrue: (true) });
    
    const activity2= this.db.list("user-data/" + this.uid + "-activity");
      activity2.push({ followeeUid: (this.uid), followeeUsername: (this.displayName),
      followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followedIsTrue: (true) });

      this.followers = this.db.list('user-data/' + this.uid + '-followee-activity').valueChanges();
      this.followers.subscribe(results => {
        for (let result of results) {
          const followerActivity =  this.db.list('user-data/' + result.followerUid + '-followee-activity');
          followerActivity.push({ followeeUid: (this.uid), followeeUsername: (this.displayName),
            followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followedIsTrue: (true) });
        }
      })
  }
}
