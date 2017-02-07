import { Injectable } from "@angular/core";

@Injectable()
export class AdService {
  constructor() {}

  initialize(key: string) {
    let engine = this.getEngine();
    if (engine) {
      engine.initialize(key, engine.BANNER);
    }
  }

  getEngine() {
    let engine = window["Appodeal"];
    return engine;
  }

  showBanner() {
    let engine = this.getEngine();
    if (!engine) {
      return;
    }

    engine.show(engine.BANNER_BOTTOM);
  }
}