import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

// Pages
import { JokeListPage } from '../pages/joke-list/joke-list';
import { AboutPage } from '../pages/about/about';

// Components

// Pipes

// Services
import { JokeService } from '../providers/joke/service';

let appConfig = {
  statusbarPadding: false,
  backButtonText: 'Wstecz',
};

export function provideStorage() {
 return new Storage(['sqlite', 'websql', 'indexeddb']);
}

@NgModule({
  declarations: [
    MyApp,
    // Pages
    JokeListPage,
    AboutPage

    // Components
    
    // Pipes
  ],
  imports: [
    IonicModule.forRoot(MyApp, appConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JokeListPage,
    AboutPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    JokeService
  ]
})
export class AppModule {}
