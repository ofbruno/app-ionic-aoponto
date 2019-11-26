import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { Mensagens } from '../../../../services/mensagens/mensagens.service';
import { OfertaNumerosRegistro } from '../oferta-numeros-registro/oferta-numeros-registro';

@Component({
  selector: 'oferta-numeros',
  templateUrl: 'oferta-numeros.html'
})
export class OfertaNumeros {

  public lote: OfertaLote;
  public requerido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
  }

  public async solicitarQuantidade() {

    this.lote.quantidade = await this.mensagens.promptValor('Quantidade de animais', null, 'number', this.lote.quantidade);
    this.requerido = '';
  }

  public async solicitarIdade() {

    this.lote.idade = await this.mensagens.promptValor('Idade aproximada (meses)', null, 'number', this.lote.idade);
    this.requerido = '';
  }

  public async solicitarPesoMedio() {

    this.lote.pesoMedio = await this.mensagens.promptValor('Peso médio (Kg)', null, 'number', this.lote.pesoMedio);
    this.requerido = '';
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima(event) {

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

    this.navCtrl.push(OfertaNumerosRegistro, { lote: this.lote });
  }
}
