import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { OfertaLocalizacao } from '../oferta-localizacao/oferta-localizacao';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';

@Component({
  selector: 'oferta-frete',
  templateUrl: 'oferta-frete.html'
})
export class OfertaFrete {

  public lote: OfertaLote;
  public requerido: string;
  public opcoes: Array<{ valor: number, descricao: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
    this.carregarOpcoes()
  }

  private carregarOpcoes() {

    this.opcoes = [
      { valor: 1, descricao: 'Comprador' },
      { valor: 2, descricao: 'Eu' },
      { valor: 3, descricao: 'Eu (distância limite)' }
    ];
  }

  public valorAlterado() {

    if (!this.lote.tipoFrete || (this.lote.tipoFrete == 3 && !this.lote.distanciaLimiteFrete)) {
      this.solicitarDistancia();
    }
    else {
      this.proxima();
    }
  }

  private async solicitarDistancia() {

    let data = await this.mensagens.promptValor('Informe a distancia em km', null, 'number', this.lote.distanciaLimiteFrete);

    if (data && data > 0 && this.opcoes.find(x => x.valor == data) == null) {
      this.lote.distanciaLimiteFrete = data;
    }
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima() {

    if (!this.lote.idade) {
      this.mensagens.toast('Informe a idade aproximada dos animais');
      this.requerido = 'idade';
      return;
    }

    if (!this.lote.pesoMedio) {
      this.mensagens.toast('Informe o peso médio dos animais deste lote');
      this.requerido = 'pesoMedio';
      return;
    }

    if (!this.lote.quantidade) {
      this.mensagens.toast('Informe a quantidade de animais deste lote');
      this.requerido = 'quantidade';
      return;
    }

    this.navCtrl.push(OfertaLocalizacao, { lote: this.lote });
  }
}
