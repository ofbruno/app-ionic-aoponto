import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'modal-texto',
  templateUrl: 'modal-texto.html'
})
export class ModalTexto {

  @ViewChild('inputTexto') inputTexto;

  public texto: string;
  public titulo: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.texto = this.navParams.get('texto');
    this.titulo = this.navParams.get('titulo');

    //keyboard.disableScroll(true);
  }

  ngAfterViewChecked() {

    this.inputTexto.setFocus()
  }

  confirmar(item) {

    this.viewCtrl.dismiss(this.texto);
  }

  fechar() {

    this.viewCtrl.dismiss();
  }
}
