import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaNumeros } from '../oferta-numeros/oferta-numeros';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { Mensagens } from '../../../../services/mensagens/mensagens.service';

@Component({
  selector: 'oferta-genero',
  templateUrl: 'oferta-genero.html'
})
export class OfertaGenero {

  public lote: OfertaLote;
  public generos: Array<{ id: number, nome: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
    
    this.generos = [
      { id: 1, nome: 'Fêmeas' },
      { id: 2, nome: 'Machos' },
      { id: 3, nome: 'Machos castrados' },
    ];
  }

  public change() {

    if (this.lote.genero) {
      this.proxima();
    }
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima() {

    this.mensagens.hideToast();

    if (!this.lote.genero) {
      this.mensagens.toast('Selecione o tipo dos animais');
      return;
    }

    this.navCtrl.push(OfertaNumeros, { lote: this.lote });
  }
}