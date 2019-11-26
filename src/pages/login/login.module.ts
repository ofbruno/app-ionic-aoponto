import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login/login';
import { UsuarioCadastroPage } from './cadastro/usuario-cadastro';
import { PerfilPage } from './perfil/perfil';

@NgModule({
  declarations: [
    LoginPage,
    UsuarioCadastroPage,
    PerfilPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    LoginPage,
    UsuarioCadastroPage,
    PerfilPage
  ]
})
export class LoginModule {}
