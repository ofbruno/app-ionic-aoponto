import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { OfertaInicio } from '../produtor/oferta-lote/oferta-inicio/oferta-inicio';
import { NotificacoesLista } from '../notificacoes/notificacoes-lista';
import { GlobalService } from '../../services/global/global.service';
import { IFeed } from '@interfaces/feed.interface';
import { WebApiOpcoes, WebApi } from '@services/webapi/webapi.service';
import { finalize } from 'rxjs/operators';
import { INoticia } from '@interfaces/noticia.interface';
import { NoticiaDetalhes } from '@pages/noticias/noticia-detalhes';
import { LoginPage } from '@pages/login/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public fab: FabContainer;
  public fabButtonOpened: Boolean;
  public feed: Array<IFeed>;
  public carregandoTela: boolean;

  //public feed: Array<{ origem:string, imagem:string, titulo:string, descricao:string, tempo:string, textLink:string }>;

  constructor(public navCtrl: NavController, public global: GlobalService, private api: WebApi) {

    this.fabButtonOpened=false;

    // this.feed = [
    //   { origem: 'Notícia', imagem: 'assets/imgs/angus.jpg', titulo: 'Comercialização é principal dificuldade para criador de Angus, mostra pesquisa.', descricao: 'Executivo da associação dos criadores da raça afirma que há mercado, mas a gestão dos negócios é o maior desafio para aumentar a clientela.', tempo: 'Há 10 min', textLink: 'Leia mais' },
    //   { origem: 'Frigorífico Supremo', imagem: 'assets/imgs/abate.jpg', titulo: 'Abate', descricao: 'Seus animais estão na fila para abate.', tempo: 'Há 40 min', textLink: null },
    //   { origem: 'Frigorífico Supremo', imagem: undefined, titulo: 'Chegaram', descricao: 'Seus animais chegaram ao destino e já foram recebidos pelo frigorífico.', tempo: 'Há 4 horas', textLink: null },
    //   { origem: 'Frigorífico Supremo', imagem: 'assets/imgs/mapa.jpg', titulo: 'Viajando', descricao: 'O caminhão com seus animais está na estrada.', tempo: 'Há 6 horas', textLink: 'Acompanhe'},
    //   { origem: 'Notícia', imagem: 'assets/imgs/angus2.jpg', titulo: 'Raças bovinas: angus garante produção de carne com qualidade superior.', descricao: 'Entre as características que tornam a raça muito rentável para a pecuária de corte estão: fertilidade, longevidade, precocidade e rusticidade.', tempo: 'Há 10 horas', textLink: 'Leia mais'}
    // ];
  }

  ngOnInit() {

    this.carregarFeed(null);
  }

  carregarFeed(refresher) {

    let opcoes = new WebApiOpcoes();
    opcoes.exibirCarregando = false;

    // if (refresher == null) {
    //   this.daoFeed.obterFeed().then(feed => this.feed = feed).catch(erro => console.log(erro));
    // }

    this.api.get<Array<IFeed>>('home', null, opcoes)
      .pipe(finalize(() => {
        this.carregandoTela = false;

        if (refresher != null) {
          refresher.complete();
        }
      }))
      .subscribe(feed => {
        this.feed = feed;
        //this.daoFeed.salvarFeed(feed);
      },
      erro => {
        console.log(erro);
      });
  }

  abrirNoticia(id: number) {

    this.navCtrl.push(NoticiaDetalhes, { id: id });
  }

  public abrirLogin() {

    this.navCtrl.push(LoginPage);
  }

  novaOferta() {

    this.fab.close();
    this.navCtrl.setRoot(OfertaInicio);
  }

  closeFab() {

    this.fab.close();
    this.fabButtonOpened = !this.fabButtonOpened;
  }

  abrirNotificacoes() {

    this.navCtrl.setRoot(NotificacoesLista);
  }

  openFabButton(fab: FabContainer) {

    this.fab = fab;
    this.fabButtonOpened = !this.fabButtonOpened;
  }
}
