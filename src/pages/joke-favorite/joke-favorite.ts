import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import _ from "lodash";

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
  searchPhrase: string = '';

  constructor(
    public navCtrl: NavController,
    private jokeService: JokeService,
  ) {
    this.jokes = [];
  }

  ionViewWillEnter() { 
    this.updateJokes().then(() => {
      this.sortJokes();
    });
  }

  updateJokes() {
    return this.jokeService.getFavorite().then(jokes => {
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

  sortJokes() {
    let sortField = 'rate';

    let jokes = _.sortBy(this.allJokes, sortField);
    jokes.reverse();

    this.allJokes = jokes;
  }

  sortByChange() {
    setTimeout(() => {
      this.sortJokes();
    }, 100);
  }

  onSearch() {
    this.updateJokes().then(() => {
      if (this.searchPhrase) {
        let comparePhrase = this.searchPhrase.toLowerCase();
        this.allJokes = this.allJokes.filter(joke => {
          return joke.content.toLowerCase().indexOf(comparePhrase) !== -1;
        });
      }

      this.sortJokes();
    });
  }
}
