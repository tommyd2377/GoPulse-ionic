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
  articleCM: Observable<any[]>;
  voteCount: Observable<any[]>;
  cMCount: Observable<any[]>;
  commentCount: Observable<any[]>;
  dSCount: Observable<any[]>;
  articleComments: Observable<any[]>;
  followerVotesActivity: Observable<any[]>;
  followerCMActivity: Observable<any[]>;
  followerCommentActivity: Observable<any[]>;
  comments: Observable<any[]>;
  comment: string;
  twoThumbsUpIsTrue: boolean;
  changedMindIsTrue: boolean;
  commentIsTrue: boolean;
  username: string;
  followers: Observable<any[]>;
  followees: Observable<any[]>;
  results = [];

  user = firebase.auth().currentUser;
  uid = this.user.uid; 
  displayName = this.user.displayName;

  title: string = this.navParams.get('title');
  description: string = this.navParams.get('description');
  image: string = this.navParams.get('urlToImage');
  url: string = this.navParams.get('url');
  source = this.navParams.get('source');
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
    this.titleID = this.title.replace(/[^A-Z0-9]+/ig, "-");

    console.log('ionViewDidLoad User: '+this.uid+' ArticleDetailPage '+this.titleID);

    //this.comments = this.db.list("article-data/"+this.titleID+"-comments").valueChanges()
    //  .map((array) => array.reverse()) as Observable<any[]>;

    this.followees = this.db.list("user-data/"+this.uid+"-followees").valueChanges()
    this.followers = this.db.list("user-data/"+this.uid+"-followers").valueChanges()

    this.voteCount = this.db.list("article-data/"+this.titleID+"-votes").valueChanges()
    this.cMCount = this.db.list("article-data/"+this.titleID+"-cm").valueChanges()
    this.dSCount = this.db.list("article-data/"+this.titleID+"-ds").valueChanges()
    //this.commentCount = this.db.list("article-data/"+this.titleID+"-comments").valueChanges()

    
  
  }



  twoThumbsUp() {

    const articleVotes = this.db.list("article-data/"+this.titleID+"-votes")
      articleVotes.push({ uid: (this.uid), username: (this.displayName),
      url: (this.url), description: (this.description), source: (this.source),
      title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });

    const activity = this.db.list("user-data/"+this.uid+"-activity")
      activity.push({ uid: (this.uid), username: (this.displayName),
      url: (this.url), description: (this.description), source: (this.source),
      title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });

      this.followers = this.db.list('user-data/'+this.uid+'-followers').valueChanges()
      this.followers.subscribe(results => {
        for (let result of results) {
          const followerActivity =  this.db.list('user-data/'+result.followerUid+'-followee-activity')
          followerActivity.push({ uid: (this.uid), username: (this.displayName),
          url: (this.url), description: (this.description), source: (this.source),
          title: (this.title), urlToImage: (this.image), twoThumbsUpIsTrue: (true) });
        }});
  }

  changedMind() {
    
    const articleVotes = this.db.list("article-data/"+(this.titleID)+"-cm")
      articleVotes.push({ uid: (this.uid), username: (this.displayName),
      url: (this.url), description: (this.description), source: (this.source),
      title: (this.title), urlToImage: (this.image), changedMindIsTrue: (true) });

    const activity = this.db.list("user-data/"+this.uid+"-activity")
      activity.push({ uid: (this.uid), username: (this.displayName),
      url: (this.url), description: (this.description), source: (this.source),
      title: (this.title), urlToImage: (this.image), changedMindIsTrue: (true) });

      this.followers = this.db.list('user-data/'+this.uid+'-followers').valueChanges()
      this.followers.subscribe(results => {
        for (let result of results) {
          const followerCMActivity =  this.db.list('user-data/'+result.followerUid+'-followee-activity')
          followerCMActivity.push({ uid: (this.uid), username: (this.displayName),
          url: (this.url), description: (this.description), source: (this.source),
          title: (this.title), urlToImage: (this.image), changedMindIsTrue: (true) });
        }});
  }

  directSend() {
    
    //intersection of followers/following lists
    //check box list pop up of intersection
    //push data to selected users
    //push data to current user
    
    this.followers = this.db.list('user-data/'+this.uid+'-followers').valueChanges()
    this.followees = this.db.list('user-data/'+this.uid+'-followees').valueChanges()
    this.followees.subscribe(list => {
      for (let element of list) {
        console.log(element.followeeUid)
      }
    })
  }

  

  openWebpage() {

    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#04df04'
      },
      toolbar: {
          height: 44,
          color: '#04df04'
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
