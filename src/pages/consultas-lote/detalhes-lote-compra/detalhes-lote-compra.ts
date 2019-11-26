import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebApi } from '@services/webapi/webapi.service';
import { Mensagens } from '@services/mensagens/mensagens.service';
import { EtapaOfertaLote } from '@models/etapa-oferta-lote.model';
import { ConsultaOfertaLote } from '@models/consulta-oferta-lote.model';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

@Component({
  selector: 'detalhes-lote-compra',
  templateUrl: 'detalhes-lote-compra.html'
})
export class DetalhesLoteCompra {

  private loteId: number;
  public lote: ConsultaOfertaLote;
  public etapasCompra: Array<EtapaOfertaLote>;
  public mostrarMaisDetalhes: boolean;
  private fotos: Array<{ url: string }>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private webapi: WebApi, 
    private mensagens: Mensagens, 
    private modalCtrl: ModalController) {

    this.lote = new ConsultaOfertaLote();
  }

  ionViewWillEnter() {

    this.loteId = this.navParams.get("loteId");
    this.carregarDetalhesLote();
  }

  carregarDetalhesLote() {

    this.webapi.get<ConsultaOfertaLote>('ofertaslote/compra/detalhes', this.loteId.toString()).subscribe(dados => {
      this.lote = dados;      
      this.etapasCompra = dados.etapasCompra;

      if (this.lote.anexos != null) {
        this.fotos = new Array<{ url: string }>();
        this.lote.anexos.forEach(a => this.fotos.push({ url: a }));
      }
      
      this.mostrarMaisDetalhes = false;

      console.log(this.lote);
    });
  }

  maisDetalhes() {

    if (!this.lote || !this.lote.id) {
      return;
    }

    this.mostrarMaisDetalhes = !this.mostrarMaisDetalhes;
  }

  mostrarFotos(index) {

    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.fotos,
      initialSlide: index,
      closeIcon: 'arrow-back'
    });

    modal.present();//.then(() => this.mensagens.toast('Arraste para os lados e navegue pelas fotos. Para fechar, puxe para baixo.', false));
  }

}
