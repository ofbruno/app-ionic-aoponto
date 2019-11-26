import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi } from '../../services/webapi/webapi.service';
import { Mensagens } from '../../services/mensagens/mensagens.service';
import { OfertaLote } from '../../models/oferta-lote.model';

@Component({
  selector: 'cotacoes',
  templateUrl: 'cotacoes.html'
})
export class Cotacoes {

  constructor(public navCtrl: NavController, public navParams: NavParams, private webapi: WebApi, private mensagens: Mensagens) {

  }

}
