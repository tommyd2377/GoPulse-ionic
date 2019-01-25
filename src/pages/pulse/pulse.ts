import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { ArticleDetailPage } from '../article-detail/article-detail';
import { publisherLists } from '../../publisher-list';
import { Http } from '@angular/http';

@Component({
  selector: 'page-pulse',
  templateUrl: 'pulse.html'
})

export class PulsePage {

  worldArticles: string;
  worldResults = [];
  triggerWorldArticles: boolean;
  usArticles: string;
  usResults = [];
  triggerUSArticles: boolean;
  businessArticles: string;
  businessResults = [];
  triggerBusinessArticles: boolean;
  healthArticles: string;
  healthResults = [];
  triggerHealthArticles: boolean;
  technologyArticles: string;
  technologyResults = [];
  triggerTechnologyArticles: boolean;
  scienceArticles: string;
  scienceResults = [];
  triggerScienceArticles: boolean;
  entertainmentArticles: string;
  entertainmentResults = [];
  triggerEntertainmentArticles: boolean;
  sportsArticles: string;
  sportsResults = [];
  triggerSportsArticles: boolean;
  apiKey: string = "f479cb7134e548bca82908661da32403";
  category: string = "world";

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              private http: Http,
              public publisher: publisherLists) {
    this.triggerWorld()
  }

  triggerWorld() {
    this.worldArticles = "https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity&pageSize=100&apiKey=" + this.apiKey;
      this.http.get(this.worldArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.worldResults = topResults.articles;
              this.triggerWorldArticles = true;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = false;
            }
  )}

  triggerUS() {
    this.usArticles = "https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&pageSize=100&apiKey=" + this.apiKey;
      this.http.get(this.usArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.usResults = topResults.articles;
              this.triggerUSArticles = true;
              this.triggerWorldArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = false;
            }
  )}

  triggerBusiness() {
      this.businessArticles = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + this.apiKey;
        this.http.get(this.businessArticles)
          .map(res => res.json())
            .subscribe(
              topResults => {
                this.businessResults = topResults.articles;
                this.triggerWorldArticles = false;
                this.triggerUSArticles = false;
                this.triggerBusinessArticles = true;
                this.triggerHealthArticles = false;
                this.triggerTechnologyArticles = false;
                this.triggerSportsArticles = false;
                this.triggerEntertainmentArticles = false;
                this.triggerScienceArticles = false;
              }
  )}

  triggerHealth() {
    this.healthArticles = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=" + this.apiKey;
      this.http.get(this.healthArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.healthResults = topResults.articles;
              this.triggerHealthArticles = true;
              this.triggerWorldArticles = false;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = false;
            }
  )}

  triggerTechnology() {
    this.technologyArticles = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=" + this.apiKey;
      this.http.get(this.technologyArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.technologyResults = topResults.articles;
              this.triggerWorldArticles = false;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = true;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = false;
            }
  )}

  triggerScience() {
    this.scienceArticles = "https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=" + this.apiKey;
      this.http.get(this.scienceArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.scienceResults = topResults.articles;
              this.triggerWorldArticles = false;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = true;
            }
  )}

  triggerEntertainment() {
    this.entertainmentArticles = "https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&category=entertainment&apiKey=" + this.apiKey;
      this.http.get(this.entertainmentArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.entertainmentResults = topResults.articles;
              this.triggerWorldArticles = false;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = true;
              this.triggerScienceArticles = false;
            }
  )}

  triggerSports() {
    this.sportsArticles = "https://newsapi.org/v2/top-headlines?country=us&language=en&sortBy=popularity&category=sports&apiKey=" + this.apiKey;
      this.http.get(this.sportsArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.sportsResults = topResults.articles;
              this.triggerWorldArticles = false;
              this.triggerUSArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = true;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = false;
            }
  )}

  ionSelected() {
    this.content.scrollToTop();
  }

  worldArticlePage(event, worldResult) {
    this.navCtrl.push(ArticleDetailPage, worldResult)
  }

  usArticlePage(event, usResult) {
    this.navCtrl.push(ArticleDetailPage, usResult)
  }

  businessArticlePage(event, businessResult) {
    this.navCtrl.push(ArticleDetailPage, businessResult)
  }

  sportsArticlePage(event, sportsResult) {
    this.navCtrl.push(ArticleDetailPage, sportsResult)
  }

  entertainmentArticlePage(event, entertainmentResult) {
    this.navCtrl.push(ArticleDetailPage, entertainmentResult)
  }

  technologyArticlePage(event, technologyResult) {
    this.navCtrl.push(ArticleDetailPage, technologyResult)
  }

  scienceArticlePage(event, scienceResult) {
    this.navCtrl.push(ArticleDetailPage, scienceResult)
  }

  healthArticlePage(event, healthResult) {
    this.navCtrl.push(ArticleDetailPage, healthResult)
  }

  
}
