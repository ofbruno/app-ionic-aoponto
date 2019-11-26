import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi, WebApiOpcoes } from '@services/webapi/webapi.service';
import { DaoOfertaLote } from '@services/dao/dao-oferta-lote.service';
import { DetalhesLoteVenda } from '@pages/consultas-lote/detalhes-lote-venda/detalhes-lote-venda';
import { IOfertaLote } from '@interfaces/oferta-lote.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'consulta-vendas',
  templateUrl: 'consulta-vendas.html'
})
export class ConsultaVendas {

  public vendas: Array<IOfertaLote>;
  public carregandoTela: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: WebApi, private daoOferta: DaoOfertaLote) {

  }

  ngOnInit() {

    this.carregandoTela = true;
    this.consultarVendas(null);
  }

  consultarVendas(refresher) {

    let getOpcoes = new WebApiOpcoes();

    getOpcoes.exibirCarregando = false;
    getOpcoes.mensagemCarregando = "Buscando suas vendas";

    if (refresher == null) {
      this.daoOferta.obterVendasLote().then(vendas => this.vendas = vendas).catch(erro => console.log(erro));
    }

    this.api.get<IOfertaLote[]>('ofertaslote/vendas', null, getOpcoes)
      .pipe(finalize(() => {
        this.carregandoTela = false;

        if (refresher != null) {
          refresher.complete();
        }
      }))
      .subscribe(vendas => {
        this.vendas = vendas;
        this.daoOferta.salvarVendasLote(vendas);

      });
  }

  detalhes(oferta: IOfertaLote) {

    this.navCtrl.push(DetalhesLoteVenda, { loteId: oferta.id });
  }

}
