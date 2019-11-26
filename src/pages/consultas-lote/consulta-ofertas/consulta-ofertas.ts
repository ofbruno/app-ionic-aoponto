import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi, WebApiOpcoes } from '@services/webapi/webapi.service';
import { DaoOfertaLote } from '@services/dao/dao-oferta-lote.service';
import { IOfertaLote } from '@interfaces/oferta-lote.interface';
import { DetalhesLoteOferta } from '../detalhes-lote-oferta/detalhes-lote-oferta';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'consulta-ofertas',
  templateUrl: 'consulta-ofertas.html'
})
export class ConsultaOfertas {

  public ofertas: Array<IOfertaLote>;
  public carregandoTela: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webapi: WebApi, private daoOferta: DaoOfertaLote) {
  }

  ngOnInit() {

    this.carregandoTela = true;
    this.consultarOfertas(null);
  }

  consultarOfertas(refresher) {

    let getOpcoes = new WebApiOpcoes();
    getOpcoes.exibirCarregando = false;
    getOpcoes.mensagemCarregando = "Buscando ofertas";

    if (refresher == null) {
      this.daoOferta.obterOfertasDisponiveis().then(ofertas => this.ofertas = ofertas).catch(erro => console.log(erro));
    }

    this.webapi.get<IOfertaLote[]>('ofertaslote', null, getOpcoes)
      .pipe(
        finalize(() => {
          this.carregandoTela = false;

          if (refresher != null) {
            refresher.complete();
          }
        }))
      .subscribe(
        ofertas => {
          this.ofertas = ofertas;
          this.daoOferta.salvarOfertasDisponiveis(ofertas);
        });
  }


  detalhes(oferta: IOfertaLote) {

    this.navCtrl.push(DetalhesLoteOferta, { loteId: oferta.id });
  }

}
