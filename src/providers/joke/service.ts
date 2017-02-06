import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import _ from "lodash";

import { Joke} from "./model";

@Injectable()
export class JokeService {
  items: Joke[];

  constructor(
    public http: Http,
    private storage: Storage
  ) {
    this.items = [];
  }

  ready() {
    if (this.items.length > 0) {
      return Promise.resolve(true);
    }

    return new Promise(resolve => {
      this.http.get("assets/data/jokes.json").subscribe(res => {
        let json = res.json();
        this.items = json.map(data => {
          return new Joke(data);
        });

        resolve(true);
      });
    });
  }

  getAll(): Promise<Joke[]> {
    return new Promise(resolve => {
      resolve(this.items);
    });
  }

  getById(id: string): Promise<Joke> {
    return this.getByIds([id])[0];
  }

  getByIds(ids: string[]): Promise<Joke[]> {
    ids = ids || [];

    return this.getAll().then(jokes => {
      let filtered = jokes.filter(joke => {
        return ids.indexOf(joke.id) !== -1;
      });

      return filtered;
    });
  }

  getFavorite(): Promise<Joke[]> {
    return this.storage.get('jokes_favorite').then(joke_ids => {
      return this.getByIds(joke_ids).then(jokes => {
        return jokes;
      });
    });
  }

  isFavorite(joke: Joke) {
    return this.getFavorite().then(jokes => {
      return !!_.some(jokes, joke);
    });
  }

  setFavorite(joke: Joke) {
    return this.getFavorite().then(jokes => {
      if (!_.some(jokes, joke)) {
        jokes.push(joke);

        return this.storage.set('jokes_favorite', jokes.map(c => c.id));
      } else {
        return false;
      }
    });
  }

  removeFavorite(joke: Joke) {
    return this.getFavorite().then(jokes => {
      if (_.some(jokes, joke)) {
        _.remove(jokes, joke);

        return this.storage.set('jokes_favorite', jokes.map(j => j.id));
      } else {
        return false;
      }
    });
  }
}