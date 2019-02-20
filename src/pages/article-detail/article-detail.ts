import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})

export class ArticleDetailPage {

  options: ThemeableBrowserOptions;
  activity: Observable<any[]>;
  articleVotes: Observable<any[]>;
  articleReads: Observable<any[]>;
  voteCount: Observable<any[]>;
  voteActivity: Observable<any[]>;
  voteActivityFollowers: Observable<any[]>;
  voteActivityFollower: Observable<any[]>;
  voteActivityFollowerKey: Observable<any[]>;
  voteFollowerActivityRef: Observable<any[]>;
  userVoteKey: Observable<any[]>;
  userVoteActivityKey: Observable<any[]>;
  voteKey: string;
  voteActivityKey: string;
  readCount: Observable<any[]>;
  commentCount: Observable<any[]>;
  dSCount: Observable<any[]>;
  articleComments: Observable<any[]>;
  followerVotesActivity: Observable<any[]>;
  followerCMActivity: Observable<any[]>;
  followerCommentActivity: Observable<any[]>;
  comments: Observable<any[]>;
  comment: string;
  twoThumbsUpIsTrue: boolean;
  commentIsTrue: boolean;
  username: string;
  followers: Observable<any[]>;
  followees: Observable<any[]>;
  results = [];
  hasLiked: boolean;
  voteFollowerKeys = [];
  user = firebase.auth().currentUser;
  uid = this.user.uid; 
  displayName = this.user.displayName;
  date;
  currentTime;

  title: string = this.navParams.get('title');
  description: string = this.navParams.get('description');
  image: string = this.navParams.get('urlToImage');
  url: string = this.navParams.get('url');
  source = this.navParams.get('source');
  content = this.navParams.get('content');
  titleID: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private themeableBrowser: ThemeableBrowser,
              private db: AngularFireDatabase) { }
               
  ionViewDidLoad() {
    
    this.title;
    this.description;
    this.image;
    this.source;
    this.url;
    this.content;
    this.titleID = this.title.replace(/[^A-Z0-9]+/ig, "-");


    this.followees = this.db.list("user-data/" + this.uid + "-followees").valueChanges();
    this.followers = this.db.list("user-data/" + this.uid + "-followers").valueChanges();

    this.voteCount = this.db.list("article-data/" + this.titleID  + "-votes").valueChanges();

    this.userVoteKey = this.db.list("article-data/" + this.titleID  + "-votes").snapshotChanges();
    this.userVoteKey.subscribe(keyResults => {
        for (let keyResult of keyResults) {
            if (keyResult.payload.val().uid === this.uid) {
              this.voteKey = keyResult.key;
              this.hasLiked = true;
            }
        }
    })
      
    this.userVoteActivityKey = this.db.list("user-data/" + this.uid + "-activity").snapshotChanges();
    this.userVoteActivityKey.subscribe(keyResults => {
        for (let keyResult of keyResults) {
          if (keyResult.payload.val().description === this.description) {
            this.voteActivityKey = keyResult.key;
        }
      }
    })
    
    this.voteActivityFollowers = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
    this.voteActivityFollowers.subscribe(results => {
      for (let result of results) {
        this.voteActivityFollowerKey = this.db.list('user-data/' + result.followerUid + '-followee-activity').snapshotChanges();
        this.voteActivityFollowerKey.subscribe(keyResults => {
          for (let keyResult of keyResults)
            if (keyResult.payload.val().description === this.description) {    
              this.voteFollowerKeys.push(keyResult.key)
            }
        })
      }
    })

    this.dSCount = this.db.list("article-data/" + this.titleID + "-ds").valueChanges();
    this.readCount = this.db.list("article-data/" + this.titleID + "-reads").valueChanges();
  }

  twoThumbsUp() {
    
    this.hasLiked = true;
    this.date = new Date();
    this.currentTime = this.date.getTime();

    const articleVotes = this.db.list("article-data/" + this.titleID + "-votes");
      articleVotes.push({ uid: (this.uid), username: (this.displayName), content: (this.content),
      url: (this.url), description: (this.description), source: (this.source), createdAt: (this.currentTime),
      title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });

    const activity = this.db.list("user-data/" + this.uid + "-activity");
      activity.push({ uid: (this.uid), username: (this.displayName), createdAt: (this.currentTime),
      url: (this.url), description: (this.description), source: (this.source), content: (this.content),
      title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });

    this.followers = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
    this.followers.subscribe(results => {
      for (let result of results) {
        const followerActivity =  this.db.list('user-data/' + result.followerUid + '-followee-activity');
        followerActivity.push({ uid: (this.uid), username: (this.displayName), createdAt: (this.currentTime),
        url: (this.url), description: (this.description), source: (this.source), content: (this.content),
        title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });
      }
    });
  }

  decTwoThumbsUp() {

    if (this.hasLiked) {
      const voteRef = this.db.list("article-data/" + this.titleID  + "-votes");
        voteRef.remove(this.voteKey);
      
      const voteActivityRef = this.db.list("user-data/" + this.uid + "-activity");
        voteActivityRef.remove(this.voteActivityKey);
      
      this.followers = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
      this.followers.subscribe(followers => { 
        for (let follower of followers) {
          let userID = follower.followerUid;
          this.voteFollowerActivityRef = this.db.list("user-data/" + userID + "-followee-activity").snapshotChanges();
          this.voteFollowerActivityRef.subscribe(items => {
            for (let item of items) {
              for (let voteKey of this.voteFollowerKeys) {
                if (item.key === voteKey) {
                  const newFollowerRef = this.db.list("user-data/" + userID + "-followee-activity");
                  newFollowerRef.remove(voteKey)
                } 
              }
            }
          })
        }
      })
      this.hasLiked = false;
    }
  }
    
  newComment() {

  }

  directSend() {
    
    //intersection of followers/following lists
    //check box list pop up of intersection
    //push data to selected users
    //push data to current user
    
    this.followers = this.db.list('user-data/' + this.uid + '-followers').valueChanges();
    this.followees = this.db.list('user-data/' + this.uid + '-followees').valueChanges();
    this.followees.subscribe(list => {
      for (let element of list) {
        console.log(element.followeeUid);
      }
    })
  }

  openWebpage() {

    this.date = new Date();
    this.currentTime = this.date.getTime()

    const articleReads = this.db.list("article-data/" + this.titleID + "-reads");
    articleReads.push({ uid: (this.uid), username: (this.displayName), createdAt: (this.currentTime),
      url: (this.url), description: (this.description), source: (this.source),
      title: (this.title), urlToImage: (this.image), hasReadIsTrue: (true) });


    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: 'rgb(0, 110, 255)'
      },
      toolbar: {
          height: 44,
          color: 'rgb(0, 110, 255)'
      },
      title: {
          color: '#003264ff',
          showPageTitle: true
      },
      backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
      },
      forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
      },
      closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
      },
      customButtons: [
          {
              image: 'share',
              imagePressed: 'share_pressed',
              align: 'right',
              event: 'sharePressed'
          }
      ],
      menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
              {
                  event: 'helloPressed',
                  label: 'Hello World!'
              },
              {
                  event: 'testPressed',
                  label: 'Test!'
              }
          ]
      },
      backButtonCanClose: true
      };

      const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.url, '_blank', options);

      browser.on('closePressed').subscribe(data => {
        browser.close();
      })
  }

}