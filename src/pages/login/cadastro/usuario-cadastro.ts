import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { AutenticacaoService } from '../../../services/autenticacao/autenticacao.service';
import { Mensagens } from '@services/mensagens/mensagens.service';

@Component({
  selector: 'page-usuario-cadastro',
  templateUrl: 'usuario-cadastro.html'
})
export class UsuarioCadastroPage {

  signupError: string;
  form: FormGroup;
  passwordtype: string;
  colorEye: string;
  passwordtypeConfirm: string;
  colorEyeConfirm: string;
  mensagensValidacao: {};

  constructor(private fb: FormBuilder, private navCtrl: NavController, private auth: AutenticacaoService, private mensagens: Mensagens) {

    this.criarForumulario();

    this.passwordtype = 'password';
    this.colorEye = 'dark';
    this.passwordtypeConfirm = 'password';
    this.colorEyeConfirm = 'dark';
  }

  criarForumulario() {

    this.form = this.fb.group({
      nome: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telefone: [''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      tipo: ['', Validators.compose([Validators.required])]
    });
  }

  validarCadastro(dados: any): boolean {

    if (!dados.nome) {
      this.mensagens.toast('Nome não informado.');
      return false;
    }

    if (!dados.email) {
      this.mensagens.toast('E-mail não informado.');
      return false;
    }

    if (!dados.password) {
      this.mensagens.toast('Informe uma senha.');
      return false;
    }

    if (dados.password.length < 6) {
      this.mensagens.toast('A senha deve possuir pelo menos 6 caracteres.');
      return false;
    }

    if (!dados.passwordConfirm) {
      this.mensagens.toast('Confirme a senha informada.');
      return false;
    }

    if (dados.password != dados.passwordConfirm) {
      this.mensagens.toast('Senha não confirmada corretamente.');
      return false;
    }

    if (!dados.tipo) {
      this.mensagens.toast('Selecione seu perfil.');
      return false;
    }

    return true;
  }

  exibirSenha(campo: number) {

    if (campo == 1) {
      if (this.passwordtype == 'password') {
        this.passwordtype = 'text';
        this.colorEye = 'primary';
      }
      else {
        this.passwordtype = 'password';
        this.colorEye = 'dark';
      }
    }
    else if (campo == 2) {
      if (this.passwordtypeConfirm == 'password') {
        this.passwordtypeConfirm = 'text';
        this.colorEyeConfirm = 'primary';
      }
      else {
        this.passwordtypeConfirm = 'password';
        this.colorEyeConfirm = 'dark';
      }
    }
  }

  criarUsuario() {

    let dados = {
      email: this.form.value.email,
      password: this.form.value.password,
      passwordConfirm: this.form.value.passwordConfirm,
      nome: this.form.value.nome,
      telefone: this.form.value.telefone,
      tipo: this.form.value.tipo
    };

    if (!this.validarCadastro(dados)) {
      return;
    }

    this.auth.criarUsuario(dados);
  }
}
