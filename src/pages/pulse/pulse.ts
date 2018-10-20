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

  allArticles: string;
  allResults = [];
  triggerAllArticles: boolean;
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
  category: string = "all";

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              private http: Http,
              public publisher: publisherLists) {
                this.triggerAll()
  }

  triggerAll() {
    this.allArticles = "https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=" + this.apiKey;
      this.http.get(this.allArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.allResults = topResults.articles;
              this.triggerAllArticles = true;
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
                this.triggerAllArticles = false;
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
              this.triggerAllArticles = false;
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
              this.triggerAllArticles = false;
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
              this.triggerAllArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = false;
              this.triggerScienceArticles = true;
            }
  )}

  triggerEntertainment() {
    this.entertainmentArticles = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=" + this.apiKey;
      this.http.get(this.entertainmentArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.entertainmentResults = topResults.articles;
              this.triggerAllArticles = false;
              this.triggerBusinessArticles = false;
              this.triggerHealthArticles = false;
              this.triggerTechnologyArticles = false;
              this.triggerSportsArticles = false;
              this.triggerEntertainmentArticles = true;
              this.triggerScienceArticles = false;
            }
  )}

  triggerSports() {
    this.sportsArticles = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=" + this.apiKey;
      this.http.get(this.sportsArticles)
        .map(res => res.json())
          .subscribe(
            topResults => {
              this.sportsResults = topResults.articles;
              this.triggerAllArticles = false;
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

  businessArticlePage(event, businessResult) {
    this.navCtrl.push(ArticleDetailPage, businessResult)
  }

  allArticlePage(event, allResult) {
    this.navCtrl.push(ArticleDetailPage, allResult)
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
