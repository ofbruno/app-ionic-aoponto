import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { Mensagens } from './../mensagens/mensagens.service';
import { WebApi, WebApiOpcoes } from './../webapi/webapi.service';
import { Login } from '../../models/login.model';
import { Usuario } from '../../models/usuario.model';
import { GlobalService } from './../global/global.service';
import { INotificacao } from '../../interfaces/notificacao.interface';
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';
import { PushService } from '../push/push.service';
import { DaoNotificacao } from '../dao/dao-notificacao.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';


@Injectable()
export class AutenticacaoService {

	public avisarRegistroLoginWebApi: EventEmitter<boolean> = new EventEmitter();
	private novoUsuarioCadastro: Login;

	constructor(
		private firebaseAuth: FirebaseAuthentication,
		private mensagens: Mensagens,
		private webapi: WebApi,
		private device: Device,
		private platform: Platform,
		private push: PushService,
		private daoNotificacao: DaoNotificacao,
		private global: GlobalService) {

		this.novoUsuarioCadastro = null;
		this.monitorarAutenticacao();
	}


	//--------------------------
	// Funções públicas
	//--------------------------
	public loginComGoogle() {

	}

	public loginComFacebook() {

	}

	public loginComEmail(credentials) {

		var loading = this.mensagens.mostrarAguarde();

		this.firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(
			() => {
				this.mensagens.fecharAguarde(loading);
				//callback(true);
			},
			() => {
				this.mensagens.fecharAguarde(loading);
				this.mensagens.toast('E-mail ou senha inválidos');
				//callback(false);
			});
	}

	public logout() {

		this.firebaseAuth.signOut().then(
			dados => console.log(dados),
			erros => console.log(erros)
		);
	}

	public criarUsuario(credentials) {

		var loading = this.mensagens.mostrarAguarde();

		this.novoUsuarioCadastro = new Login();
		this.novoUsuarioCadastro.nome = credentials.nome;
		this.novoUsuarioCadastro.telefone = credentials.telefone;
		this.novoUsuarioCadastro.tipoUsuario = credentials.tipo;

		this.firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
			() => {
				this.mensagens.fecharAguarde(loading);
			},
			() => {
				this.mensagens.fecharAguarde(loading);
				this.mensagens.toast('Infelizmente não foi possível criar o usuário neste momento. Tente novamente em alguns instantes.');
			}
		);
	}

	public registrarLoginWebApi(login: Login) {

		this.webapi.post<Usuario>('login', login).subscribe(
			usuario => {
				this.global.setarUsuarioLogado(usuario);
				this.push.obterTokenPush().then(token => this.enviarDadosAparelho(token));
				this.carregarNotificacoes();
				this.avisarRegistroLoginWebApi.emit(true);
			},
			erro => {
				console.log('Erro ao tentar registrar login na api:');
				console.log(erro);
				this.avisarRegistroLoginWebApi.emit(false);
			}, 
			() => {
				this.novoUsuarioCadastro = null;
			});
	}

	//--------------------------
	// Funções privadas
	//--------------------------
	private monitorarAutenticacao() {

		if (this.platform.is('cordova')) {
			this.firebaseAuth.onAuthStateChanged().subscribe(userInfo => this.aoObterEstadoLogin(userInfo));
		}
		else {
			let dadosLogin = new Login();

			dadosLogin.email = 'ofbruno@gmail.com';
			dadosLogin.firebaseId = 'qUuFRbTCuDfjiVnrjAGsQWzSNRJ2';
			dadosLogin.emailVerificado = false;

			this.registrarLoginWebApi(dadosLogin);
		}
	}

	private enviarDadosAparelho(token: string) {

		let aparelho = { tokenPush: token, uuid: '', modelo: '' };

		if (this.platform.is('cordova')) {
			aparelho.uuid = this.device.uuid;
			aparelho.modelo = this.device.model;
		}
		else {
			aparelho.uuid = 'chrome';
			aparelho.modelo = 'chrome';
		}

		let opcoesPost = new WebApiOpcoes();
		opcoesPost.exibirMensagemFalha = false;
		opcoesPost.exibirMensagemErro = false;

		this.webapi.post<any>('usuarios/aparelho', aparelho, opcoesPost).subscribe(
			() => {
				console.log('Aparelho atualizado com sucesso.');
			},
			(erro) => {
				console.log('Erro ao tentar atualizar os dados do aparelho:');
				console.log(erro);
			}
		);
	}

	private carregarNotificacoes() {

		let limitIdInferior = 0;
		let opcoesGet = new WebApiOpcoes();

		opcoesGet.exibirCarregando = false;
		opcoesGet.adicionarParametro('limitIdInferior', limitIdInferior);

		this.webapi
			.get<Array<INotificacao>>('notificacoes/usuario', null, opcoesGet)
			.subscribe(data => {
				this.daoNotificacao.salvar(data);
			});
	}

	//--------------------------
	// Eventos
	//--------------------------
	public aoRegistrarLoginWebApi() {

		return this.avisarRegistroLoginWebApi;
	}

	private aoObterEstadoLogin(user: firebase.User) {

		if (!user) {
			this.global.setarUsuarioDeslogado();
			return;
		}

		let dadosLogin = new Login();
		dadosLogin.email = user.email;
		dadosLogin.firebaseId = user.uid;
		dadosLogin.nome = user.displayName;
		dadosLogin.fotoUrl = user.photoURL;
		dadosLogin.telefone = user.phoneNumber;
		dadosLogin.emailVerificado = user.emailVerified;

		if (this.novoUsuarioCadastro != null) {
			dadosLogin.nome = this.novoUsuarioCadastro.nome;
			dadosLogin.telefone = this.novoUsuarioCadastro.telefone;
			dadosLogin.tipoUsuario = this.novoUsuarioCadastro.tipoUsuario;
		}

		this.registrarLoginWebApi(dadosLogin);
	}
}
