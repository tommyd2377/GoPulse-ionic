import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user = firebase.auth().currentUser;
  uid = this.user.uid;
  activity: Observable<any[]>;

  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController,
              private afDB: AngularFireDatabase,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
    let followeeActivity = this.uid + "-followee-activity";
        
    this.activity = this.afDB.list('user-data/' + followeeActivity).valueChanges()
      .map((array) => array.reverse()) as Observable<any[]>;

      if (this.activity) {
        console.log(this.activity);
      }
  }

  ionSelected() {
    this.content.scrollToTop();
  }

  goToDetailPage(event, active) {
    this.navCtrl.push(ArticleDetailPage, active)
  }

}