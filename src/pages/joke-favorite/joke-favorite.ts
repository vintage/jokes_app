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
    this.jokeService.getFavorite().then(jokes => {
      this.sortJokes(jokes);
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

  sortJokes(jokes: Joke[]) {
    let sortField = this.sortBy;
    let isReverse = sortField.startsWith('-');
    
    if (isReverse) {
      sortField = sortField.slice(1);
    }

    jokes = _.sortBy(jokes, sortField);
    if (isReverse) {
      jokes.reverse();
    }

    this.jokes = jokes;
  }

  sortByChange() {
    this.jokes = [];

    setTimeout(() => {
      this.updateJokes();
    }, 100);
  }
}
