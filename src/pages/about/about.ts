import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
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
    new InAppBrowser(url, '_system');
  }

  openTwitter() {
    let url: string = 'https://twitter.com/puppybox_mobile';
    new InAppBrowser(url, '_system');
  }

  openContact() {
    this.showContactAlert();
  }

  close() {
    this.navCtrl.pop();
  }
}
