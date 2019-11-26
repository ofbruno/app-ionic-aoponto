import { DaoNotificacao } from '../../services/dao/dao-notificacao.service';
import { NoticiaDetalhes } from '../noticias/noticia-detalhes';
import { GlobalService } from '../../services/global/global.service';
import { WebApi, WebApiOpcoes } from '../../services/webapi/webapi.service';
import { INotificacao } from '../../interfaces/notificacao.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalhesLoteCompra } from '../consultas-lote/detalhes-lote-compra/detalhes-lote-compra';

@Component({
  selector: 'notificacoes-lista',
  templateUrl: 'notificacoes-lista.html'
})
export class NotificacoesLista {

  public notificacoes: Array<INotificacao>;
  public existeMais: boolean;

  constructor(public navCtrl: NavController, private webapi: WebApi, private global: GlobalService, private daoNotificacao: DaoNotificacao) {

    this.notificacoes = new Array<INotificacao>();
    this.existeMais = true;
  }

  ionViewDidLoad() {

    this.obterNotificacoes();
    this.carregarNotificacoes();
  }

  carregarNotificacoes() {

      this.daoNotificacao.obterLista().then(notificacoes => this.notificacoes = notificacoes);
  }

  obterNotificacoes(infiniteScroll = null) {

    let limitId = 0;

    if (this.notificacoes.length > 0) {
      limitId = this.notificacoes[this.notificacoes.length - 1].id;
    }

    let opcoes = new WebApiOpcoes();
    opcoes.exibirCarregando = false;
    opcoes.adicionarParametro('limiteId', limitId);

    this.webapi
      .get<Array<INotificacao>>('notificacoes/usuario', null, opcoes)
      .subscribe(notificacoes => {
        this.existeMais = (notificacoes != null && notificacoes.length > 0);
        this.notificacoes = this.notificacoes.concat(notificacoes);

        if (infiniteScroll != null) {
          infiniteScroll.complete();
        }
      });
  }

  obterMais(infiniteScroll) {

    this.obterNotificacoes(infiniteScroll);
  }

  abrir(notificacao: INotificacao) {

    if (!notificacao.lido) {
      this.marcarComoLido(notificacao);
    }

    this.direcionar(notificacao);
  }

  direcionar(notificacao: INotificacao) {

    //this.navCtrl.push(DetalhesLoteCompraPage);

    switch(notificacao.tipo) {
      case 1:
        this.navCtrl.push(NoticiaDetalhes);
        break;
      case 2:
        let params = JSON.parse(notificacao.parametros);
        this.navCtrl.push(DetalhesLoteCompra, { loteId: params['loteId'] });
        break;
    }

  }

  marcarComoLido(notificacao: INotificacao) {

    notificacao.lido = true;

    /*
    let opcoes = new WebApiOpcoes();
    opcoes.exibirCarregando = false;
    opcoes.exibirMensagemErro = false;
    opcoes.exibirMensagemFalha = false;

    this.webapi.post(`notificacoes/ler/${notificacao.id}`, null, opcoes).subscribe();
    */
  }

}
