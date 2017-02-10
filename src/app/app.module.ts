import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

// Pages
import { JokeListPage } from '../pages/joke-list/joke-list';
import { JokeFavoritePage } from '../pages/joke-favorite/joke-favorite';
import { JokeDetailPage } from '../pages/joke-detail/joke-detail';
import { AboutPage } from '../pages/about/about';

// Components
import { PaginatorComponent } from '../components/paginator/paginator';
import { JokesComponent } from '../components/jokes/jokes';

// Pipes

// Services
import { JokeService } from '../providers/joke/service';
import { AdService } from '../providers/ads/service';

let appConfig = {
  statusbarPadding: false,
  backButtonText: 'Wstecz',
  mode: 'md'
};

export function provideStorage() {
 return new Storage(['sqlite', 'websql', 'indexeddb']);
}

@NgModule({
  declarations: [
    MyApp,
    // Pages
    JokeListPage,
    JokeFavoritePage,
    JokeDetailPage,
    AboutPage,

    // Components
    PaginatorComponent,
    JokesComponent
    
    // Pipes
  ],
  imports: [
    IonicModule.forRoot(MyApp, appConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JokeListPage,
    JokeFavoritePage,
    JokeDetailPage,
    AboutPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    JokeService,
    AdService
  ]
})
export class AppModule {}
