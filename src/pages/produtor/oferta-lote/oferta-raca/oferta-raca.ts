import { OfertaLote } from '../../../../models/oferta-lote.model'
import { IdNome } from '../../../../models/id-nome.model';
import { WebApi } from '../../../../services/webapi/webapi.service';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { OfertaGenero } from '../oferta-genero/oferta-genero';
import { HomePage } from '../../../home/home';
import { ETipoLote } from '../../../../enums/enums';
import { GlobalService } from '../../../../services/global/global.service';

@Component({
  selector: 'oferta-raca',
  templateUrl: 'oferta-raca.html'
})
export class OfertaRaca {

  public lote: OfertaLote;
  public racas: Array<IdNome>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private mensagens: Mensagens,
    private webapi: WebApi,
    private global: GlobalService) {

      let tipoLote = this.navParams.get("tipo") || ETipoLote.Frigorifico;

      if (this.lote == null) {
        this.lote = new OfertaLote();
        this.lote.tipo = tipoLote;
        this.lote.produtorId = this.global.usuario.id;
      }
  }

  public ngOnInit() {

    this.carregarRacas();
  }

  private carregarRacas() {

    this.webapi.get<IdNome[]>('racas').subscribe(racas => this.racas = racas);
  }

  public change() {

    if (this.lote.racaId) {
      this.proxima();
    }
  }

  public cancelar() {

    this.navCtrl.setRoot(HomePage);
  }

  public proxima() {

    this.mensagens.hideToast();

    if (!this.lote.racaId) {
      this.mensagens.toast('Selecione a raça dos animais');
      return;
    }

    this.navCtrl.push(OfertaGenero, { lote: this.lote }).then(() => {
      this.navCtrl.remove(0);
    });
  }
}
