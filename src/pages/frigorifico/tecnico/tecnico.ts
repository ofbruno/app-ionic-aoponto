import { WebApi } from '../../../services/webapi/webapi.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Mensagens } from '../../../services/mensagens/mensagens.service';

@Component({
  selector: 'tecnico',
  templateUrl: 'tecnico.html'
})
export class Tecnico {

  constructor(public navCtrl: NavController, private webapi: WebApi, private mensagens: Mensagens) {
  }

  ionViewDidLoad() {

  }

  
}
