import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { JokeDetailPage } from '../joke-detail/joke-detail';
import { JokeFavoritePage } from '../joke-favorite/joke-favorite';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-list',
  templateUrl: 'joke-list.html'
})
export class JokeListPage {
  allJokes: Joke[];
  jokes: Joke[] = [];

  sortBy: string;
  sortByOptions: Object[] = [
    {title: 'Najlepsze',id: '-rate'},
    {title: 'Najnowsze',id: '-date'},
    {title: 'Najgorsze',id: 'rate',},
    {title: 'Najstarsze',id: 'date'},
  ];
  hasFavorites: boolean;

  constructor(
    public navCtrl: NavController,
    private jokeService: JokeService,
  ) {
    this.jokes = [];
    this.sortBy = '-date';
    this.hasFavorites = false;
  }

  ionViewWillEnter() {
    this.updateJokes();

    this.jokeService.getFavorite().then(favorite => {
      this.hasFavorites = favorite ? favorite.length > 0 : false;
    });
  }

  updateJokes() {
    this.jokeService.getAll().then(jokes => {
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

  openFavorites() {
    this.navCtrl.push(JokeFavoritePage, {}, {animate: false});
  }

  setJokes(jokes: Joke[]) {
    this.jokes = jokes;
  }

  sortJokes() {
    let sortField = this.sortBy;
    let isReverse = sortField.startsWith('-');
    
    if (isReverse) {
      sortField = sortField.slice(1);
    }

    let jokes = _.sortBy(this.allJokes, sortField);
    if (isReverse) {
      jokes.reverse();
    }

    this.allJokes = jokes;
  }

  sortByChange() {
    setTimeout(() => {
      this.sortJokes();
    }, 100);
  }
}
