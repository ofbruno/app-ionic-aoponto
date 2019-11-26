import { DetalhesLoteCompra } from '@pages/consultas-lote/detalhes-lote-compra/detalhes-lote-compra';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi, WebApiOpcoes } from '@services/webapi/webapi.service';
import { DaoOfertaLote } from '@services/dao/dao-oferta-lote.service';
import { IOfertaLote } from '@interfaces/oferta-lote.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'consulta-compras',
  templateUrl: 'consulta-compras.html'
})
export class ConsultaCompras {

  public compras: Array<IOfertaLote>;
  public carregandoTela: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: WebApi, private daoOferta: DaoOfertaLote) {

  }

  ngOnInit() {

    this.carregandoTela = true;
    this.consultarCompras(null);
  }

  consultarCompras(refresher) {

    let getOpcoes = new WebApiOpcoes();

    getOpcoes.exibirCarregando = false;
    getOpcoes.mensagemCarregando = "Buscando suas compras";

    if (refresher == null) {
      this.daoOferta.obterComprasLote().then(compras => this.compras = compras).catch(erro => console.log(erro));
    }

    this.api.get<IOfertaLote[]>('ofertaslote/compras', null, getOpcoes)
      .pipe(finalize(() => {
        this.carregandoTela = false;

        if (refresher != null) {
          refresher.complete();
        }
      }))
      .subscribe(compras => {
        this.compras = compras;
        this.daoOferta.salvarComprasLote(compras);
      });
  }

  detalhes(oferta: IOfertaLote) {

    this.navCtrl.push(DetalhesLoteCompra, { loteId: oferta.id });
  }

}
