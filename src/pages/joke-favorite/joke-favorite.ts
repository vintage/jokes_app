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
