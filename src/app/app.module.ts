import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PulsePage } from '../pages/pulse/pulse';
import { SearchProvider } from '../providers/search-model/search-model';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';

import { ArticleDetailPageModule } from '../pages/article-detail/article-detail.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { PublisherPageModule } from '../pages/publisher/publisher.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfileSettingsPageModule } from '../pages/profile-settings/profile-settings.module';
import { UserPageModule } from '../pages/user/user.module';
import { FollowersPageModule } from '../pages/followers/followers.module';
import { FolloweesPageModule } from '../pages/followees/followees.module';
import { SearchPageModule } from '../pages/search/search.module';
import { UserFollowersPageModule } from '../pages/user-followers/user-followers.module';
import { UserFolloweesPageModule } from '../pages/user-followees/user-followees.module';
import { publisherLists } from '../publisher-list';

//News API key = f479cb7134e548bca82908661da32403

export const firebaseConfig = {
  apiKey: "AIzaSyAJNsnnVl8HfbViTs5qCNGHs2AzN2BKSTE",
  authDomain: "gopulse-acf2b.firebaseapp.com",
  databaseURL: "https://gopulse-acf2b.firebaseio.com",
  projectId: "gopulse-acf2b",
  storageBucket: "gopulse-acf2b.appspot.com",
  messagingSenderId: "604663955164"
};

@NgModule({
  declarations: [
    MyApp,
    PulsePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ArticleDetailPageModule,
    ProfilePageModule,
    PublisherPageModule,
    SignupPageModule,
    WelcomePageModule,
    LoginPageModule,
    ProfileSettingsPageModule,
    UserPageModule,
    PublisherPageModule,
    FollowersPageModule,
    FolloweesPageModule,
    SearchPageModule,
    UserFollowersPageModule,
    UserFolloweesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PulsePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    ThemeableBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SearchProvider,
    publisherLists
  ]
})
export class AppModule {}
