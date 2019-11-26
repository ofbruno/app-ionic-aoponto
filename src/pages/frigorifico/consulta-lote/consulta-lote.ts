import { WebApi } from '../../../services/webapi/webapi.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Mensagens } from '../../../services/mensagens/mensagens.service';

@Component({
  selector: 'consulta-lote',
  templateUrl: 'consulta-lote.html'
})
export class ConsultaLote {

  constructor(public navCtrl: NavController, private webapi: WebApi, private mensagens: Mensagens) {
  }

  ionViewDidLoad() {

  }

  selecionarLote(loteId: number) {

    this.webapi.post('frigorifico/lotes').subscribe(
      () => this.mensagens.toast('Lote selecionado com sucesso.'),
      err => console.log(err)
    );

  }

}
