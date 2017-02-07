import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EmailComposer, InAppBrowser } from 'ionic-native';

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
    if (!window['cordova']) {
      return this.showContactAlert();
    }

    EmailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        let email = {
          to: 'puppy.box@outlook.com',
          subject: '[Perełki] Formularz kontaktowy'
        };
        EmailComposer.open(email);
      } else {
        this.showContactAlert();
      }
    });
  }

  close() {
    this.navCtrl.pop();
  }
}
