import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search-model/search-model';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserPage } from '../user/user';
import { PublisherPage } from '../publisher/publisher';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {

  searchType: string = "userSearch";
  searchingUsers: boolean;
  searchingPublishers: boolean;
  userResults;
  publisherResults;
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private search: SearchProvider) {
                this.showUserSearch()
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSearchPage');
    this.search.getUsers(this.startAt, this.endAt)
      .subscribe(userResults => this.userResults = userResults)

    this.search.getPublishers(this.startAt, this.endAt)
      .subscribe(publisherResults => this.publisherResults = publisherResults)
  }

  searchUsers($event) {
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")
  }

  searchPublishers($event) {
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")
  }

  goToUserProfile(event, user) {
    this.navCtrl.push(UserPage, user)
  }

  publisherPage(event, publisher) {
    this.navCtrl.push(PublisherPage, publisher)
  }

  showUserSearch() {
    this.searchingUsers = true;
    this.searchingPublishers = false;
  }

  showPublisherSearch() {
    this.searchingUsers = false;
    this.searchingPublishers = true;
  }

}
