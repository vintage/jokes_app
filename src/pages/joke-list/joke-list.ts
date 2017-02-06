import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-list',
  templateUrl: 'joke-list.html'
})
export class JokeListPage {
  coins: number;
  jokes: Joke[] = [];

  constructor(
    public navCtrl: NavController,
    private jokeService: JokeService,
  ) {
    
  }

  ionViewWillEnter() { 
    this.updateJokes();
  }

  updateJokes() {
    this.jokeService.getAll().then(jokes => {
      this.jokes = jokes;
    });
  }

  openJoke(joke: Joke) {
    // this.navCtrl.push(JokeDetailPage, {
    //   joke: joke
    // });
  }

  logoClick() {
    // Do some crazy stuff here
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
