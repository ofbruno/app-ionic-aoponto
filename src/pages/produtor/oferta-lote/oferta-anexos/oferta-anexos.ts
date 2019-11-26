import { WebApi, WebApiOpcoes } from '../../../../services/webapi/webapi.service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { OfertaRaca } from '../oferta-raca/oferta-raca';
import { HomePage } from '../../../home/home';
import { OfertaLote } from '../../../../models/oferta-lote.model'
import { ModalTexto } from '../../../modals/modal-texto';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { GalleryModal } from 'ionic-gallery-modal';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Mensagens } from '@services/mensagens/mensagens.service';
//import firebase from 'firebase';

@Component({
  selector: 'oferta-anexos',
  templateUrl: 'oferta-anexos.html'
})
export class OfertaAnexos {

  public lote: OfertaLote;
  public fotoUrl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private webapi: WebApi,
    private imagePicker: ImagePicker,
    private mensagem: Mensagens,
    private camera: Camera) {

    this.lote = this.navParams.get("lote") || new OfertaLote();
  }


  public adicionarComentarios() {

    let params = { titulo: 'Comentários', texto: this.lote.comentarios };
    let modal = this.modalCtrl.create(ModalTexto, params);

    modal.onDidDismiss(data => {

      if (data) {
        this.lote.comentarios = data;
      }
    });

    modal.present();
  }

  public anexarFoto() {

    if (this.lote.anexos == null) {
      this.lote.anexos = new Array<string>();
    }

    this.imagePicker.getPictures({}).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.lote.anexos.push(results[i]);
        }
      },
      (err) => {
        this.mensagem.alerta(err);
      });
  }

  public anexarCamera(): void {

    if (this.lote.anexos == null) {
      this.lote.anexos = new Array<string>();
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: false
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        this.lote.anexos.push(imageData);
      },
      (err) => {
        //this.mensagem.alerta(err);
      });
  }

  public anexarVideo() {
    if (this.lote.anexos == null) {
      this.lote.anexos = new Array<string>();
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        this.lote.anexos.push(imageData);
      },
      (err) => {
        //this.mensagem.alerta(err);
      });

  }

  mostrarFotos(index) {

    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.lote.anexos,
      initialSlide: index,
      closeIcon: 'arrow-back'
    });

    modal.present();//.then(() => this.mensagens.toast('Arraste para os lados e navegue pelas fotos. Para fechar, puxe para baixo.', false));
  }

  private generateUUID(): any {

    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
  }

  public voltar() {

    this.navCtrl.pop();
  }

  public salvarLote() {

    this.alertCtrl.create({
      //title: 'Ao Ponto',
      subTitle: 'Confirma a oferta do lote informado?',
      buttons: [
        {
          text: 'Ainda não',
          handler: null
        },
        {
          text: 'Sim',
          handler: () => {
            this.enviarLote();
          }
        }
      ]
    }).present();

  }

  private enviarLote() {

    this.webapi.post('ofertaslote', this.montarLoteSalvar(), { exibirMensagemSucesso: true } as WebApiOpcoes)
      .subscribe(() => this.navCtrl.setRoot(HomePage), err => console.log(err));
  }

  private montarLoteSalvar() {

    let o = {
      tipo: this.lote.tipo,
      racaId: this.lote.racaId,
      preco: this.lote.preco,
      prazo: this.lote.prazo,
      disponibilidade: this.lote.disponibilidade,
      genero: this.lote.genero,
      idade: this.lote.idade,
      quantidade: this.lote.quantidade,
      pesoMedio: this.lote.pesoMedio,
      tipoFrete: this.lote.tipoFrete,
      distanciaLimiteFrete: this.lote.distanciaLimiteFrete,
      registros: [],
      comentarios: this.lote.comentarios,
      enderecoId: this.lote.enderecoId,
      enderecoNome: this.lote.endereco.nome,
      enderecoLogradouro: this.lote.endereco.logradouro,
      enderecoNumero: this.lote.endereco.numero,
      enderecoComplemento: this.lote.endereco.complemento,
      enderecoCidadeId: this.lote.endereco.cidadeId,
      enderecoEstadoId: this.lote.endereco.estadoId,
      enderecoCoordenadas: this.lote.endereco.coordenadas,
      enderecoCoordenadasEndereco: this.lote.endereco.coordenadasEndereco
    };

    if (this.lote.registros) {
      this.lote.registros.forEach(x => {
        if (x && x.trim() != '') {
          o.registros.push(x);
        }
      });
    }

    return o;
  }

  private pergunarLoteNovo() {

    this.alertCtrl.create({
      title: 'Ao Ponto',
      subTitle: 'Lote enviado com sucesso. Deseja ofertar outro lote?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.navCtrl.setRoot(OfertaRaca);
          }
        }
      ]
    }).present();
  }

}
