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
        adKey = '9c503dd14d2b426d8d5d7fc9a43cf619d2446c264daa3823';
      } else {
        adKey = 'da9ffe302a50aa8cbfb3fc7a35eca9fc22275e77347d7b18';
      }

      StatusBar.hide();
      Splashscreen.hide();
      Keyboard.hideKeyboardAccessoryBar(false);

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
