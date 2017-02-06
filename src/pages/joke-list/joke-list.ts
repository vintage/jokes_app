import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { JokeDetailPage } from '../joke-detail/joke-detail';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-list',
  templateUrl: 'joke-list.html'
})
export class JokeListPage {
  jokes: Joke[] = [];
  sortBy: string;
  sortByOptions: Object[] = [
    {title: 'Najlepsze',id: '-rate'},
    {title: 'Najnowsze',id: '-date'},
    {title: 'Najgorsze',id: 'rate',},
    {title: 'Najstarsze',id: 'date'},
  ];

  constructor(
    public navCtrl: NavController,
    private jokeService: JokeService,
  ) {
    this.jokes = [];
    this.sortBy = '-rate';
  }

  ionViewWillEnter() { 
    this.updateJokes();
  }

  updateJokes() {
    this.jokeService.getAll().then(jokes => {
      this.jokes = jokes;
      this.sortJokes();
    });
  }

  openJoke(joke: Joke) {
    this.navCtrl.push(JokeDetailPage, {
      joke: joke
    });
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

  sortJokes() {
    let sortField = this.sortBy;
    let isReverse = sortField.startsWith('-');
    
    if (isReverse) {
      sortField = sortField.slice(1);
    }

    let jokes = _.sortBy(this.jokes, sortField);
    if (isReverse) {
      jokes.reverse();
    }

    this.jokes = jokes;
  }

  sortByChange() {
    this.sortJokes();
  }
}
