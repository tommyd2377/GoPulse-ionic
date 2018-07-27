import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { Http } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-publisher',
  templateUrl: 'publisher.html',
})

export class PublisherPage {

  topResults = [];
  allResults = [];
  topUrl: string;
  allUrl: string;
  articleType: string = "top";
  toggleTop: boolean;
  toggleAll: boolean;
  apiKey: string = "f479cb7134e548bca82908661da32403";
  topArticles;
  allArticles;

  id: string = this.navParams.get('id');
  name: string = this.navParams.get('name');
  description: string = this.navParams.get('description');
  image: string = this.navParams.get('image');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http) {
                this.showTop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublisherPage');
    this.id;
    this.name;
    this.description;
    this.image;
    this.getAllArticles();
    this.getTopArticles();
  }

  topArticlePage(event, topResult) {
    this.navCtrl.push(ArticleDetailPage, topResult)
  }

  allArticlePage(event, allResult) {
    this.navCtrl.push(ArticleDetailPage, allResult)
  }

  showTop() {
    this.toggleTop  = true;
    this.toggleAll = false;
  }

  showAll() {
    this.toggleTop = false;
    this.toggleAll = true;
  }

  getTopArticles() {
    this.topUrl = 'https://newsapi.org/v2/top-headlines?sources=' + this.id + '&language=en&apiKey=' + this.apiKey;
      this.http.get(this.topUrl)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.topResults = topResults.articles;
              console.log(this.topResults)
            }
          )}

  getAllArticles() {
    this.allUrl = 'https://newsapi.org/v2/everything?sources=' + this.id + '&language=en&pageSize=100&apiKey=' + this.apiKey;
      this.http.get(this.allUrl)
        .map(res => res.json())
          .subscribe(
            allResults => {
              this.allResults = allResults.articles;
              console.log(this.allResults)
            }
          )}
}
