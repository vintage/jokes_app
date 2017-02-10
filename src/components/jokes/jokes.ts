import { Component, EventEmitter } from '@angular/core';

import { Joke } from '../../providers/joke/model';

@Component({
  selector: 'jokes',
  templateUrl: 'jokes.html',
  inputs: ['jokes'],
  outputs: ['jokeSelect'],
})
export class JokesComponent {
  jokes: Joke[];

  jokeSelect = new EventEmitter(true);

  constructor() {

  }

  jokeClick(joke: Joke) {
    this.jokeSelect.emit(joke);
  }
}
