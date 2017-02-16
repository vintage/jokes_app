import { Injectable } from "@angular/core";

@Injectable()
export class AdService {
  constructor() {}

  initialize(key: string) {
    let engine = this.getEngine();
    if (engine) {
      engine.banner.config({
        id: key,
        isTesting: false,
        autoShow: false,
        overlap: false
      });
    }
  }

  getEngine() {
    let engine = window["admob"];
    return engine;
  }

  showBanner() {
    let engine = this.getEngine();
    if (!engine) {
      return;
    }
    
    engine.banner.prepare();
    engine.banner.show();
  }
}