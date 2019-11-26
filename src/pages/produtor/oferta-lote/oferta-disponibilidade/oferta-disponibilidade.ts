import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { OfertaPreco } from '../oferta-preco/oferta-preco';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';

@Component({
  selector: 'oferta-disponibilidade',
  templateUrl: 'oferta-disponibilidade.html'
})
export class OfertaDisponibilidade {

  public lote: OfertaLote;
  public disponibilidades: Array<{ valor: number, descricao: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagens: Mensagens) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
    this.carregarDisponibilidades();
  }

  private carregarDisponibilidades() {

    this.disponibilidades = [
      { valor: 1, descricao: 'Imediatamente' },
      { valor: 15, descricao: '15 dias' },
      { valor: 30, descricao: '30 dias' },
      { valor: 45, descricao: '45 dias' },
      { valor: null, descricao: 'Informar outra' },
    ];

    if (this.lote.disponibilidade && this.lote.disponibilidade > 0 && this.disponibilidades.find(x => x.valor == this.lote.disponibilidade) == null) {
      this.disponibilidades.push({ valor: this.lote.disponibilidade, descricao: this.lote.disponibilidade.toString() + ' dias' });
      this.disponibilidades.sort((a, b) => a.valor - b.valor);
    }
  }

  public valorAlterado() {

    if (!this.lote.disponibilidade) {
      this.solicitarDisponibilidade();
    }
    else {
      this.proxima();
    }
  }

  private async solicitarDisponibilidade() {

    let data = await this.mensagens.promptValor('Informe quantos dias', null, 'number', this.lote.disponibilidade);

    if (data && data > 0 && this.disponibilidades.find(x => x.valor == data) == null) {
      this.lote.disponibilidade = data;
      this.disponibilidades.push({ valor: data, descricao: data.toString() + ' dias' });
      this.disponibilidades.sort((a, b) => a.valor - b.valor);
    }
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima() {

    this.mensagens.hideToast();

    if (!this.lote.disponibilidade) {
      this.mensagens.toast('Informe em quantos dias os animais deste lote estarão disponíveis');
      return;
    }

    this.navCtrl.push(OfertaPreco, { lote: this.lote });
  }
}
