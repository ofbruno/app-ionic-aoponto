import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';


@Injectable()
export class Mensagens {

  constructor(private alertCtrl: AlertController, private toastCtrl: Toast, private loadingCtrl: LoadingController) {

  }

  public alerta(mensagem: string, titulo?: string): void {

    this.alertCtrl.create({
      subTitle: mensagem,
      buttons: ['OK']
    }).present();
  }

  public promptValor(label: string, mensagem?: string, tipo?: string, valor?: any, placeholder?: string): Promise<any> {

    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        subTitle: label,
        message: mensagem,
        inputs: [
          {
            name: 'valor',
            placeholder: placeholder,
            type: tipo,
            value: valor
          },
        ],
        buttons: [{
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: (data) => {
            resolve(data.valor);
          }
        }]
      });

      alert.present();

    });

  }

  public toast(mensagem: string, mostrarAlertaAoFalhar: boolean = true): void {

    let tempo = '3000';

    if (mensagem.length > 100) {
      tempo = '5000';
    }

    this.toastCtrl.show(mensagem, tempo, 'center').subscribe(
      null,
      () => {
        if (mostrarAlertaAoFalhar) {
          this.alerta(mensagem);
        }
      });
  }

  public hideToast(): void {

    this.toastCtrl.hide();
  }

  public mostrarAguarde(mensagem?: string): Loading {

    if (mensagem == "" || mensagem == null) {
      mensagem = "Favor aguardar...";
    }

    var loading = this.loadingCtrl.create({
      content: mensagem,
      //dismissOnPageChange: true
    });

    loading.present();

    return loading;
  }

  public fecharAguarde(loading: Loading): void {

    if (loading == null) {
      return;
    }
    
    loading.dismiss();
  }

}
