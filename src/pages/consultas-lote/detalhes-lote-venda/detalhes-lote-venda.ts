import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi } from '@services/webapi/webapi.service';
import { Mensagens } from '@services/mensagens/mensagens.service';
import { EtapaOfertaLote } from '@models/etapa-oferta-lote.model';
import { ConsultaOfertaLote } from '@models/consulta-oferta-lote.model';

@Component({
  selector: 'detalhes-lote-venda',
  templateUrl: 'detalhes-lote-venda.html'
})
export class DetalhesLoteVenda {

  private loteId: number;
  public lote: ConsultaOfertaLote;
  public etapasVenda: Array<EtapaOfertaLote>;
  public mostrarMaisDetalhes: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webapi: WebApi, private mensagens: Mensagens) {

    this.lote = new ConsultaOfertaLote();
  }

  ionViewWillEnter() {

    this.loteId = this.navParams.get("loteId");
    this.carregarDetalhesLote();
  }

  carregarDetalhesLote() {

    this.webapi.get<ConsultaOfertaLote>('ofertaslote/venda/detalhes', this.loteId.toString()).subscribe(dados => {
      this.lote = dados;      
      this.etapasVenda = dados.etapasVenda;
      this.mostrarMaisDetalhes = false;
      
      console.log(this.lote);
    });
  }

  maisDetalhes() {

    if (!this.lote || !this.lote.id) {
      return;
    }

    this.mostrarMaisDetalhes = !this.mostrarMaisDetalhes;
  }

}
