import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';


@Injectable()
export class PushService {

  constructor(private platform: Platform, private firebase: Firebase) {

    this.platform.ready().then(() => this.inicializarPushes());
  }


  public obterTokenPush() : Promise<string> {

    if (!this.platform.is('cordova')) {
      return new Promise<string>((resolve) => resolve('chrome'));
    }

    return this.firebase.getToken();    
  }

  private inicializarPushes() {

    if (!this.platform.is('cordova')) {
      return;
    }

    this.firebase.onNotificationOpen().subscribe((data) => this.configurarRotas(data));
    this.firebase.onTokenRefresh().subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  private configurarRotas(data) {

    if (data.wasTapped) {
      console.log(data);
    }
    else {
      console.log(data);
    }
  }
}
