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
        adKey = '8bdd31fd8416f9eef80403b5622d77624326adf55758fa2a';
      } else {
        adKey = 'b09006ec29ced78be8edbb0593061bfe0b4a1db066dcdf26';
      }

      StatusBar.hide();
      Splashscreen.hide();
      Keyboard.hideKeyboardAccessoryBar(false);

      this.ads.initialize(adKey);
      this.ads.showBanner();
    });
  }
}
