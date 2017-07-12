import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  return new Storage({
    driverOrder: ['sqlite', 'websql', 'indexeddb']
  });
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
    BrowserModule,
    HttpModule,
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

    // Ionic Native
    SplashScreen,
    StatusBar,
    InAppBrowser,

    JokeService,
    AdService
  ]
})
export class AppModule {}
