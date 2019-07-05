import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { UserFollowersPage } from '../user-followers/user-followers';
import { UserFolloweesPage } from '../user-followees/user-followees';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage {

  isYou: boolean;
  currentUser = firebase.auth().currentUser;
  currentUserDisplayName = this.currentUser.displayName;
  currentUserUid = this.currentUser.uid;
  currentUserFullname;
  
  isFollowing: boolean;
  followeeKey: Observable<any[]>;
  followKey: string;
  followeeActivityKey: string;
  followeeActivity: Observable<any[]>;
  followFolloweeActivityRef: Observable<any[]>;
  followerActivityRef: Observable<any[]>;
  followFollowerKeys = [];
  
  followKeyTwo: string;
  followeeKeyTwo: Observable<any[]>;
  followeeActivityTwo: Observable<any[]>;
  followeeActivityKeyTwo: string;
  followeeActivityRefTwo: Observable<any[]>;
  followFolloweeActivityRefTwo: Observable<any[]>;
  followFolloweeKeysTwo = [];
  
  followerCount: Observable<any[]>;
  followeeCount: Observable<any[]>;
  activity: Observable<any[]>;
  followers: Observable<any[]>;
  followees: Observable<any[]>;
  followeesTwo: Observable<any[]>;

  //matches keys in afbd?
  fullname: string = this.navParams.get('fullname');
  displayName: string = this.navParams.get('displayName');
  uid: string = this.navParams.get('uid');

  //matches keys in afbd?
  followeeUsername: string = this.navParams.get('followeeUsername');
  followeeFullname: string = this.navParams.get('followeeFullname');
  followeeUid: string = this.navParams.get('followeeUid');
  //matches keys in afbd?
  
  followerUsername: string = this.navParams.get('followerUsername');
  followerFullname: string = this.navParams.get('followerFullname');
  followerUid: string = this.navParams.get('followerUid');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) { 
                
  }

  ionViewDidLoad() {

    const fullname = this.db.object("user-data/" + this.currentUserUid + "/fullname").valueChanges();

    if (this.currentUserUid === this.uid) {
      this.isYou = true;
      console.log('this is you')
    }
    
    //matches keys in afbd?
    this.followerUid;
    this.followerFullname;
    this.followerUsername;
    
    this.followeeUid;
    this.followeeFullname;
    this.followeeUsername;
    
    this.displayName;
    this.fullname;
    this.uid;

    if (this.uid) {
      console.log(this.uid)
      const activity = this.uid + "-activity";
        this.activity = this.db.list('user-data/' + activity).valueChanges()
          .map((array) => array.reverse()) as Observable<any[]>;
             this.followerCount = this.db.list("user-data/" + (this.uid) + "-followers").valueChanges();
             this.followeeCount = this.db.list("user-data/" + (this.uid) + "-followees").valueChanges();
    }
    else if (this.followeeUid) {
      console.log(this.followeeUid)
      const activity = this.followeeUid + "-activity";
        this.activity = this.db.list('user-data/' + activity).valueChanges()
          .map((array) => array.reverse()) as Observable<any[]>;
             this.followerCount = this.db.list("user-data/" + (this.followeeUid) + "-followers").valueChanges();
             this.followeeCount = this.db.list("user-data/" + (this.followeeUid) + "-followees").valueChanges();
    }
    else if (this.followerUid) {
      console.log(this.followerUid)
      const activity = this.followerUid + "-activity";
        this.activity = this.db.list('user-data/' + activity).valueChanges()
          .map((array) => array.reverse()) as Observable<any[]>;
             this.followerCount = this.db.list("user-data/" + (this.followerUid) + "-followers").valueChanges();
             this.followeeCount = this.db.list("user-data/" + (this.followerUid) + "-followees").valueChanges();
    }
    
    this.followees = this.db.list('user-data/' + this.currentUserUid + '-followees').snapshotChanges();
      this.followees.subscribe(followees => { 
        for (let followee of followees) {
          let userID = followee.payload.val().followeeUid;
          if (userID === this.uid) {
            this.isFollowing = true;
            this.followKey = followee.key;
            console.log(this.followKey)
          } 
        }
      })

  
    
    this.followers = this.db.list('user-data/' + this.currentUserUid + '-followers').valueChanges();
    this.followers.subscribe(results => {
      for (let result of results) {
        this.followeeActivity = this.db.list('user-data/' + result.followerUid + '-followee-activity').snapshotChanges();
        this.followeeActivity.subscribe(keyResults => {
          for (let keyResult of keyResults)
            if (keyResult.payload.val().followeeUid === this.uid) {    
              this.followFollowerKeys.push(keyResult.key)
            }
        })
      }
    })


      this.followeeActivityRefTwo = this.db.list("user-data/" + this.uid + "-activity").snapshotChanges();
      this.followeeActivityRefTwo.subscribe(keyResults => {
        for (let keyResult of keyResults) {
          if (keyResult.payload.val().followeeUid === this.uid) {
            this.followeeActivityKeyTwo = keyResult.key;
        }
      }
    })
    
    
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

      this.followers = this.db.list('user-data/' + this.currentUserUid + '-followers').valueChanges();
      this.followers.subscribe(results => {
        for (let result of results) {
          const followerActivity =  this.db.list('user-data/' + result.followerUid + '-followee-activity');
          followerActivity.push({ followeeUid: (this.uid), followeeFullname: (this.fullname), followeeUsername: (this.displayName),
            followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followingIsTrue: (true) });
        }
      })
    
    const follower = this.db.list("user-data/" + this.uid + "-followers");
      follower.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), followeeFullname: (this.fullname), 
      followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followedIsTrue: (true) });
    
    const activity2 = this.db.list("user-data/" + this.uid + "-activity");
      activity2.push({ followeeUid: (this.uid), followeeUsername: (this.displayName), followeeFullname: (this.fullname),
      followerUsername: (this.currentUserDisplayName), followerUid: (this.currentUserUid), followedIsTrue: (true) });

      this.isFollowing = true;
      console.log(this.isFollowing)
  }

  unfollow() {
    if (this.isFollowing) {

      this.followeeActivity = this.db.list("user-data/" + this.currentUserUid + "-activity").snapshotChanges();
      this.followeeActivity.subscribe(keyResults => {
        for (let keyResult of keyResults) {
          if (keyResult.payload.val().followeeUid === this.uid) {
            this.followeeActivityKey = keyResult.key;
            console.log(this.followeeActivityKey)
        }
      }
    })

      const unfollowRef = this.db.list("user-data/" + this.currentUserUid + "-activity");
      console.log(this.followeeActivityKey)
        unfollowRef.remove(this.followeeActivityKey).then(() => {
          console.log(this.followeeActivityKey + ': removed')
        }).catch(error => 
          console.log(error));
       
    

      const followActivityRef = this.db.list("user-data/" + this.currentUserUid + "-followees");
        followActivityRef.remove(this.followKey);
        console.log(this.followKey)
      
      this.followers = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
      this.followers.subscribe(followers => { 
        for (let follower of followers) {
          let userID = follower.followerUid;
          this.followerActivityRef = this.db.list("user-data/" + userID + "-followee-activity").snapshotChanges();
          this.followerActivityRef.subscribe(items => {
            for (let item of items) {
              for (let voteKey of this.followFollowerKeys) {
                if (item.key === voteKey) {
                  const newFollowerRef = this.db.list("user-data/" + userID + "-followee-activity");
                  newFollowerRef.remove(voteKey)
                } 
              }
            }
          })
        }
      })

      const unfollowRefTwo = this.db.list("user-data/" + this.uid + "-activity");
        unfollowRefTwo.remove(this.followKeyTwo);

        this.followeeKeyTwo = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
        this.followeeKeyTwo.subscribe(followers => { 
          for (let follower of followers) {
            let userID = follower.followerUid;
            if (userID === this.uid) {
              this.followKeyTwo = follower.key
            } 
          }
        })
      
      const followActivityRefTwo = this.db.list("user-data/" + this.uid+ "-followers");
        followActivityRefTwo.remove(this.followKeyTwo);
     
      this.isFollowing = false;
    }
  }

}