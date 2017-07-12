import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdService } from '../providers/ads/service';

import { JokeListPage } from '../pages/joke-list/joke-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ads: AdService
  ) {
    Promise.all([
      this.platform.ready()
    ]).then(() => {
      this.rootPage = JokeListPage;

      let adKey = null;
      if (this.platform.is('ios')) {
        adKey = 'ca-app-pub-4764697513834958/2315864060';
      } else {
        adKey = 'ca-app-pub-4764697513834958/1118332466';
      }

      this.splashScreen.hide();
      this.statusBar.hide();

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
