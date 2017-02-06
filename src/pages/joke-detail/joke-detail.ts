import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-detail',
  templateUrl: 'joke-detail.html'
})
export class JokeDetailPage {
  joke: Joke;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private jokeService: JokeService,
  ) {
    this.joke = params.get('joke');
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }

  addFavorite(joke: Joke) {
    this.jokeService.setFavorite(joke);
  }

  removeFavorite(joke: Joke) {    
    this.jokeService.removeFavorite(joke);
  }
}
