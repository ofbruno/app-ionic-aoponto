import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { OfertaLocalizacao } from '../oferta-localizacao/oferta-localizacao';
import { OfertaFrete } from '../oferta-frete/oferta-frete';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';
import { ETipoLote } from '../../../../enums/enums';


@Component({
  selector: 'oferta-preco',
  templateUrl: 'oferta-preco.html'
})
export class OfertaPreco {

  public lote: OfertaLote;
  public prazos: Array<{ valor: number, descricao: string }>;
  public requerido: string;
  public receberOfertaPrecoComprador: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
    this.carregarPrazos();
  }

  private carregarPrazos() {

    this.prazos = [
      { valor: 1, descricao: 'À vista' },
      { valor: 14, descricao: '14 dias' },
      { valor: 21, descricao: '21 dias' },
      { valor: 30, descricao: '30 dias' },
      { valor: null, descricao: 'Informar outro' },
    ];

    if (this.lote.prazo && this.lote.prazo > 0 && this.prazos.find(x => x.valor == this.lote.prazo) == null) {
      this.prazos.push({ valor: this.lote.prazo, descricao: this.lote.prazo.toString() + ' dias' });
      this.prazos.sort((a, b) => a.valor - b.valor);
    }
  }

  public ativarReceberOferta() {

    this.receberOfertaPrecoComprador = !this.receberOfertaPrecoComprador;

    if (this.receberOfertaPrecoComprador) {
      this.lote.preco = null;
    }
  }

  public valorAlterado() {

    if (!this.lote.prazo) {
      this.solicitarPrazo();
    }
    else {
      this.proxima();
    }
  }

  private async solicitarPrazo() {

    let data = await this.mensagens.promptValor('Informe quantos dias', null, 'number', this.lote.prazo);

    if (data && data > 0 && this.prazos.find(x => x.valor == data) == null) {
      this.lote.prazo = data;
      this.prazos.push({ valor: data, descricao: data.toString() + ' dias' });
      this.prazos.sort((a, b) => a.valor - b.valor);
    }
  }

  public async solicitarPreco() {

    if (this.receberOfertaPrecoComprador) {
      return;
    }

    this.lote.preco = await this.mensagens.promptValor('Preço por arroba', null, 'number', this.lote.preco);
    this.requerido = '';
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima() {

    this.mensagens.hideToast();

    if (!this.lote.preco && !this.receberOfertaPrecoComprador) {
      this.mensagens.toast('Informe o preço da arroba.');
      this.requerido = 'preco';
      return;
    }

    if (!this.lote.prazo) {
      this.mensagens.toast('Informe o prazo desejado para recebimento.');
      this.requerido = 'prazo';
      return;
    }

    if (this.lote.tipo == ETipoLote.OutrosProdutores)
      this.navCtrl.push(OfertaFrete, { lote: this.lote });
    else
      this.navCtrl.push(OfertaLocalizacao, { lote: this.lote });
  }

}
