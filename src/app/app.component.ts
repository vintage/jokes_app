import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { JokeService } from '../providers/joke/service';
import { AdService } from '../providers/ads/service';

import { JokeListPage } from '../pages/joke-list/joke-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    private jokes: JokeService,
    private ads: AdService
  ) {
    Promise.all([
      this.platform.ready(),
      this.jokes.ready()
    ]).then(() => {
      this.rootPage = JokeListPage;

      let adKey = null;
      if (this.platform.is('ios')) {
        adKey = '9c503dd14d2b426d8d5d7fc9a43cf619d2446c264daa3823';
      } else {
        adKey = 'da9ffe302a50aa8cbfb3fc7a35eca9fc22275e77347d7b18';
      }

      StatusBar.hide();
      Splashscreen.hide();

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
