import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'modal-lista',
  templateUrl: 'modal-lista.html'
})
export class ModalLista {

  public listaItens: Array<{ id:string, descricao:string }>;
  public idSelecionado: string;
  public nome: string;
  public searchText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.listaItens = this.navParams.get('lista');
    this.nome = this.navParams.get('nome') || '';
    this.idSelecionado = this.navParams.get('idSelecionado') || '';
  }

  pesquisar($input) {
    
  }

  selecionar(item: { id:string, descricao:string }) {
    
    this.idSelecionado = item.id;
    this.viewCtrl.dismiss(item);
  }

  fechar() {

    this.viewCtrl.dismiss();
  }
}
