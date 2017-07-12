import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) {}

  showContactAlert() {
    let alert = this.alertCtrl.create({
      title: 'Perełki',
      message: 'Skontaktuj się z nami na puppy.box@outlook.com'
    });

    alert.present();
  }

  openFacebook() {
    let url: string = 'https://www.facebook.com/n/?puppy.box.studio';
    this.iab.create(url, '_system');
  }

  openTwitter() {
    let url: string = 'https://twitter.com/puppybox_mobile';
    this.iab.create(url, '_system');
  }

  openContact() {
    this.showContactAlert();
  }

  close() {
    this.navCtrl.pop();
  }
}
