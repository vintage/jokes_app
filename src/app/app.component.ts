import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { JokeService } from '../providers/joke/service';

import { JokeListPage } from '../pages/joke-list/joke-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    private jokes: JokeService
  ) {
    Promise.all([
      this.platform.ready(),
      this.jokes.ready()
    ]).then(() => {
      this.rootPage = JokeListPage;
      
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
