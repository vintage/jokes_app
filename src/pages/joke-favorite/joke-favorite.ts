import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { JokeDetailPage } from '../joke-detail/joke-detail';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-favorite',
  templateUrl: 'joke-favorite.html'
})
export class JokeFavoritePage {
  allJokes: Joke[];
  jokes: Joke[] = [];

  constructor(
    public navCtrl: NavController,
    private jokeService: JokeService,
  ) {
    this.jokes = [];
  }

  ionViewWillEnter() { 
    this.updateJokes();
  }

  updateJokes() {
    this.jokeService.getFavorite().then(jokes => {
      if (jokes.length === 0) {
        this.goBack();
      }
      
      this.allJokes = jokes;
    });
  }

  openJoke(joke: Joke) {
    this.navCtrl.push(JokeDetailPage, {
      joke: joke
    });
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }

  goBack() {
    this.navCtrl.popToRoot({animate: false});
  }

  setJokes(jokes: Joke[]) {
    this.jokes = jokes;
  }
}
