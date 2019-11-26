import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { OfertaDisponibilidade } from '../oferta-disponibilidade/oferta-disponibilidade';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';

@Component({
  selector: 'oferta-numeros-registro',
  templateUrl: 'oferta-numeros-registro.html'
})
export class OfertaNumerosRegistro {

  public lote: OfertaLote;
  public registros: Array<{id: number, numero: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
    this.registros = new Array<{id: number, numero: string}>();

    for (let i: number = 1; i <= this.lote.quantidade; i++) {
      this.registros.push({id: i, numero: ''});
    }
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima(event) {

    this.lote.registros = new Array<string>();
    this.registros.forEach(registro => this.lote.registros.push(registro.numero));

    this.navCtrl.push(OfertaDisponibilidade, { lote: this.lote });
  }
}
