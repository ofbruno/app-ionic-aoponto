import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Mensagens } from '../mensagens/mensagens.service';


@Injectable()
export class WebApi {

  private urlBase: string = 'http://aoponto.kinghost.net/app/api';
  //private urlBase: string = 'webapiLocal';


  constructor(private http: HttpClient, private global: GlobalService, private mensagens: Mensagens) {
  }


  public getFile<T>(recurso: string, opcoes?: WebApiOpcoes): Observable<T> {

    if (opcoes == null) {
      opcoes = new WebApiOpcoes();
    }

    let parametros = this.CriarParametros(opcoes);
    let loading = null;

    if (opcoes.exibirCarregando) {
      loading = this.mensagens.mostrarAguarde(opcoes.mensagemCarregando);
    }

    return this.http.get<T>(recurso, { params: parametros }).finally(() => this.mensagens.fecharAguarde(loading));
  }

  public get<T>(recurso: string, parametro?: string, opcoes?: WebApiOpcoes): Observable<T> {

    if (opcoes == null) {
      opcoes = new WebApiOpcoes();
    }

    let url = this.urlBase + '/' + recurso + '/' + (parametro || '');
    let headers = this.CriarHeaders();    
    let parametros = this.CriarParametros(opcoes);    
    let loading = null;

    if (opcoes.exibirCarregando) {
      loading = this.mensagens.mostrarAguarde(opcoes.mensagemCarregando);
    }

    return this.http.get<T>(url, { params: parametros, headers: headers }).finally(() => this.mensagens.fecharAguarde(loading));
  }

  public post<T>(recurso: string, dados?: any, opcoes?: WebApiOpcoes): Observable<T> {

    if (opcoes == null) {
      opcoes = new WebApiOpcoes();
    }

    let loading = null;

    if (opcoes.exibirCarregando) {
      loading = this.mensagens.mostrarAguarde(opcoes.mensagemCarregando);
    }

    return this.http.post<T>(this.urlBase + '/' + recurso, dados, { headers: this.CriarHeaders() }).finally(() => this.mensagens.fecharAguarde(loading));
  }

  public put<T>(recurso: string, dados?: any, opcoes?: WebApiOpcoes): Observable<T> {

    if (opcoes == null) {
      opcoes = new WebApiOpcoes();
    }

    let loading = null;

    if (opcoes.exibirCarregando) {
      loading = this.mensagens.mostrarAguarde(opcoes.mensagemCarregando);
    }

    return this.http.put<T>(this.urlBase + '/' + recurso, dados, { headers: this.CriarHeaders() }).finally(() => this.mensagens.fecharAguarde(loading));
  }

  private CriarParametros(opcoes: WebApiOpcoes): WebApiHttpParams {

    if (opcoes == null) {
      return null;
    }

    let params = new WebApiHttpParams(opcoes);

    if (opcoes.parametros && opcoes.parametros.length > 0) {

      opcoes.parametros.forEach(p => {
        params[p.nome] = p.valor;
      });
    }

    return params;
  }

  private CriarHeaders() {

    if (!this.global.usuarioLogado) {
      return null;
    }

    if (!this.global.usuario.token || !this.global.usuario.id) {
      return null;
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('x-token', this.global.usuario.token.toString() + '.' + this.global.usuario.id.toString());
    return headers;
  }

}

export class WebApiOpcoes {

  parametros: Array<{ nome: string, valor: string }>;
  mensagemCarregando: string;
  exibirCarregando: boolean;
  exibirMensagemErro: boolean;
  exibirMensagemSucesso: boolean;
  exibirMensagemFalha: boolean;

  constructor() {

    this.parametros = new Array<{ nome: string, valor: string }>();
    this.mensagemCarregando = "Aguarde";
    this.exibirCarregando = true;
    this.exibirMensagemErro = true;
    this.exibirMensagemSucesso = false;
    this.exibirMensagemFalha = true;
  }

  adicionarParametro(nome: string, valor: any): void {

    this.parametros.push({ nome: nome, valor: valor.toString() });
  }
}

export class WebApiHttpParams extends HttpParams {

  constructor(public opcoes: WebApiOpcoes) {
    super();
  }
}
