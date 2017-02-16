import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Insomnia, Keyboard } from 'ionic-native';

import { AdService } from '../providers/ads/service';

import { JokeListPage } from '../pages/joke-list/joke-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    private ads: AdService
  ) {
    Promise.all([
      this.platform.ready()
    ]).then(() => {
      this.rootPage = JokeListPage;

      if (window['cordova']) {
        setInterval(() => {
          Insomnia.keepAwake();
        }, 5000);
      }

      let adKey = null;
      if (this.platform.is('ios')) {
        adKey = 'ca-app-pub-4764697513834958/2315864060';
      } else {
        adKey = 'ca-app-pub-4764697513834958/1118332466';
      }

      StatusBar.hide();
      Splashscreen.hide();
      Keyboard.hideKeyboardAccessoryBar(false);

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
