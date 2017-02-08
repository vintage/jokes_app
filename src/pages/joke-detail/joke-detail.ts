import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from "lodash";

import { JokeService } from '../../providers/joke/service';
import { Joke } from '../../providers/joke/model';

import { AboutPage } from '../about/about';

@Component({
  selector: 'page-joke-detail',
  templateUrl: 'joke-detail.html'
})
export class JokeDetailPage {
  isFavorite: boolean;
  joke: Joke;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private jokeService: JokeService,
  ) {
    this.joke = params.get('joke');
    this.isFavorite = false;
  }

  ionViewWillEnter() {
    this.jokeService.isFavorite(this.joke).then(isFavorite => {
      this.isFavorite = isFavorite;
    });
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }

  addFavorite() {
    this.isFavorite = true;
    this.jokeService.setFavorite(this.joke);
  }

  removeFavorite() {
    this.isFavorite = false;
    this.jokeService.removeFavorite(this.joke);
  }
}
