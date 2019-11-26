import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonicPage, AlertController, Platform } from 'ionic-angular';
import { Mensagens } from '../../../services/mensagens/mensagens.service';
import { GlobalService } from '../../../services/global/global.service';
import { Usuario } from '../../../models/usuario.model';
import { WebApi, WebApiOpcoes } from '../../../services/webapi/webapi.service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public perfil: Usuario;

  constructor(
    private navCtrl: NavController,
    private webapi: WebApi,
    private mensagens: Mensagens,
    private formBuilder: FormBuilder,
    private global: GlobalService,
    private platform: Platform) {

      this.perfil = this.global.usuario;
  }

  salvar() {

		this.webapi.put<Usuario>('usuarios', this.perfil).subscribe(
			() => {
        this.global.setarUsuarioLogado(this.perfil);
        this.mensagens.toast('Seus dados foram atualizados com sucesso.');
			});
  }

}
