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
        adKey = '';
      } else {
        adKey = '';
      }

      StatusBar.hide();
      Splashscreen.hide();

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
