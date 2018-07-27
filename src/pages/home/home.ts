import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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
  
  constructor(public navCtrl: NavController,
              private afDB: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage User: '+(this.uid))
    let followeeActivity = this.uid + "-followee-activity";
        
    this.activity = this.afDB.list('user-data/' + followeeActivity).valueChanges()
      .map((array) => array.reverse()) as Observable<any[]>;
  }

  goToDetailPage(event, active) {
    this.navCtrl.push(ArticleDetailPage, active)
  }
    
}








