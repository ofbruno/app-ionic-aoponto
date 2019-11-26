import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AutenticacaoService } from '../../../services/autenticacao/autenticacao.service';
import { HomePage } from '../../home/home';
import { Mensagens } from '../../../services/mensagens/mensagens.service';
import { UsuarioCadastroPage } from '../cadastro/usuario-cadastro';
import { Keyboard } from '@ionic-native/keyboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit, OnDestroy {

  authForm: FormGroup;
  loginForm: FormGroup;
  loginError: string;
  passwordtype: string;
  iconEye: string;
  colorEye: string;
  keyboardOpen: boolean;
  keyboardShow: Subscription;
  keyboardHide: Subscription;

  constructor(
    private navCtrl: NavController,
    private auth: AutenticacaoService,
    private mensagens: Mensagens,
    private formBuilder: FormBuilder,
    private keyboard: Keyboard) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

    this.passwordtype = 'password';
    this.iconEye = 'ios-eye-outline';
    this.colorEye = 'dark';
    this.keyboardOpen = false;

    // this.auth.aoRegistrarLoginWebApi().subscribe(
    //   (sucesso) => {
    //     if (sucesso) {
    //       this.navCtrl.setRoot(HomePage);
    //     }
    //   }
    // );          
  }

  ngOnInit(): void {

    this.keyboardShow = this.keyboard.onKeyboardShow().subscribe(() => { this.keyboardOpen = true; });
    this.keyboardHide = this.keyboard.onKeyboardHide().subscribe(() => { this.keyboardOpen = false; });
  }

  ngOnDestroy(): void {

    this.keyboardShow.unsubscribe();
    this.keyboardHide.unsubscribe();
  }

  exibirSenha() {

    if (this.passwordtype == 'password') {
      this.passwordtype = 'text';
      this.iconEye = 'eye';
      this.colorEye = 'primary';
    }
    else {
      this.passwordtype = 'password';
      this.iconEye = 'ios-eye-outline';
      this.colorEye = 'dark';
    }
  }

  loginEmail() {

    if (!this.loginForm.valid) {
      this.mensagens.toast('Informe seus dados de acesso');
      return;
    }

    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.loginComEmail(credentials);
  }

  loginGoogle() {

    this.auth.loginComGoogle();
  }

  loginFacebook() {

  }

  recuperarSenha() {

  }

  cadastrarUsuario() {

    this.navCtrl.push(UsuarioCadastroPage);
  }

}
