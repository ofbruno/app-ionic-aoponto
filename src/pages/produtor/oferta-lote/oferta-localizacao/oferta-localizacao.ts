import { WebApi, WebApiOpcoes } from '../../../../services/webapi/webapi.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { ModalLista } from '../../../modals/modal-lista';
import { OfertaAnexos } from '../oferta-anexos/oferta-anexos';
import { Mensagens } from '../../../../services/mensagens/mensagens.service';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'oferta-localizacao',
  templateUrl: 'oferta-localizacao.html'
})
export class OfertaLocalizacao {

  public lote: OfertaLote;
  public listaCidades: Array<{ id: number, descricao: string, estadoId: number }>;
  public listaEstados: Array<{ id: number, descricao: string }>;
  public requerido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private mensagens: Mensagens,
    private webapi: WebApi,
    private geo: Geolocation) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
  }

  public ngOnInit() {

    this.listaCidades = [];
    this.listaEstados = [];

    this.geo.getCurrentPosition()
      .then((position) => {
        this.lote.endereco.coordenadas = position.coords.latitude.toString() + ',' + position.coords.longitude;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public solicitarEstado() {

    if (this.listaEstados != null && this.listaEstados.length > 0) {
      this.abrirModalEstados();
      return;
    }

    let op = new WebApiOpcoes();
    op.exibirCarregando = false;

    this.webapi.getFile<Array<{id:number, nome:string, sigla:string}>>("././assets/json/estados.json", op).subscribe(
      estados => {
        this.listaEstados = estados.map(e => { return { id: e.id, descricao: e.nome } });
        this.listaEstados.sort(ordenar);
        this.abrirModalEstados();
      });

      function ordenar (a, b) {
        if (a.descricao > b.descricao) {
          return 1;
        }
        if (a.descricao < b.descricao) {
          return -1;
        }
        return 0;
      };
  }


  private abrirModalEstados() {

    let params = {
      nome: 'estados',
      lista: this.listaEstados,
      idSelecionado: this.lote.endereco.estadoId
    };

    let modal = this.modalCtrl.create(ModalLista, params);

    modal.onDidDismiss(estado => {

      if (estado && this.lote.enderecoId != estado.id) {
        this.lote.enderecoId = estado.id;
        this.lote.endereco.estadoId = estado.id;
        this.lote.endereco.estado = estado.descricao;
        this.lote.endereco.id = 0;
        this.lote.endereco.cidadeId = 0;
        this.lote.endereco.cidade = null;
      }
    });

    modal.present();
  }

  public solicitarCidade() {

    if (!this.lote.endereco.estadoId) {
      this.mensagens.alerta('Selecione o estado');
      return;
    }

    if (this.listaCidades.length > 0 && this.listaCidades[0].estadoId == this.lote.endereco.estadoId) {
      this.abrirModalCidades();
    }
    else {

      this.webapi.get<Array<{ id: number, nome: string, estadoId: number }>>('cidades', this.lote.endereco.estadoId.toString()).subscribe(
        cidades => {
          this.listaCidades = cidades.map(c => { return { id: c.id, descricao: c.nome, estadoId: c.estadoId } })
          this.abrirModalCidades();
        });
    }
  }

  private abrirModalCidades() {

    let params = {
      nome: 'cidades',
      lista: this.listaCidades,
      idSelecionado: this.lote.endereco.cidadeId
    };

    let modal = this.modalCtrl.create(ModalLista, params);

    modal.onDidDismiss(
      cidade => {
        if (cidade) {
          this.lote.endereco.cidadeId = cidade.id;
          this.lote.endereco.cidade = cidade.descricao;
        }
      });

    modal.present();
  }

  public async solicitarNomeLocalizacao() {

    let data = await this.mensagens.promptValor('Nome da propriedade', null, 'text', this.lote.endereco.nome);
    this.lote.endereco.nome = data;
  }

  public async solicitarEndereco() {

    let data = await this.mensagens.promptValor('Endereço', null, 'text', this.lote.endereco.logradouro);
    this.lote.endereco.logradouro = data;
  }

  public async solicitarNumero() {

    let data = await this.mensagens.promptValor('Número', null, 'text', this.lote.endereco.numero);
    this.lote.endereco.numero = data;
  }

  public async solicitarComplemento() {

    let data = await this.mensagens.promptValor('Complemento', null, 'text', this.lote.endereco.complemento);
    this.lote.endereco.complemento = data;
  }

  public consultarEnderecos() {

  }

  public voltar() {

    this.navCtrl.pop();
  }

  public proxima(event) {

    if (!this.lote.endereco.estadoId) {
      this.mensagens.toast('Informe o estado');
      this.requerido = 'estadoId';
      return;
    }

    if (!this.lote.endereco.cidadeId) {
      this.mensagens.toast('Informe a cidade');
      this.requerido = 'cidadeId';
      return;
    }

    if (!this.lote.endereco.logradouro) {
      this.mensagens.toast('Informe o endereço');
      this.requerido = 'logradouro';
      return;
    }

    this.navCtrl.push(OfertaAnexos, { lote: this.lote });
  }

}
