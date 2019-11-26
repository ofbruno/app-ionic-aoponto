import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaRaca } from '../oferta-raca/oferta-raca';
import { ETipoLote } from '../../../../enums/enums';
import { GlobalService } from '../../../../services/global/global.service';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';
import { LoginPage } from '../../../login/login/login';

@Component({
  selector: 'oferta-inicio',
  templateUrl: 'oferta-inicio.html'
})
export class OfertaInicio {

  constructor(public navCtrl: NavController, public navParams: NavParams, private global: GlobalService, private mensagens: Mensagens) {

    if (!this.global.usuarioLogado) {
      this.mensagens.toast('Para realizar a oferta do lote, favor confirmar seu login.');
      this.navCtrl.push(LoginPage).then(() => {
        this.navCtrl.remove(0);
      });
    }
  }

  public comecar(tipo) {

    this.navCtrl.push(OfertaRaca, { tipo: tipo });
  }
}
