import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PulsePage } from '../pulse/pulse';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';
import { SearchPage } from '../search/search';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PulsePage;
  tab3Root = SearchPage;
  tab4Root = ProfilePage;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController) {
                //try getting rid of this
                this.afAuth.authState.subscribe(user => {
                  if (user) {
                    console.log("User "+(user.uid)+" here somewhere")
                  }
                  else {
                    this.navCtrl.setRoot(WelcomePage,{})
                  }
                })
  }
}