import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class GlobalService {

  public appCarregou: boolean;
  public usuario: Usuario;
  public usuarioLogado: boolean;

  constructor() {

    this.appCarregou = false;
    this.usuarioLogado = false;
  }

  public setarUsuarioLogado(usuario: Usuario) {

    if (!usuario) {
      return;
    }

    this.usuario = usuario;
    this.usuarioLogado = true;
  }

  public setarUsuarioDeslogado() {

    this.usuario = null;
    this.usuarioLogado = false;
  }
}
