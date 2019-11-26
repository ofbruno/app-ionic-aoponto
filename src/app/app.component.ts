import { ConsultaOfertas } from './../pages/consultas-lote/consulta-ofertas/consulta-ofertas';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { OfertaInicio } from '../pages/produtor/oferta-lote/oferta-inicio/oferta-inicio';
import { LoginPage } from '../pages/login/login/login';
import { GlobalService } from '../services/global/global.service';
import { AutenticacaoService } from '../services/autenticacao/autenticacao.service';
import { PerfilPage } from '../pages/login/perfil/perfil';
import { ConsultaCompras } from '../pages/consultas-lote/consulta-compras/consulta-compras';
import { ConsultaVendas } from '../pages/consultas-lote/consulta-vendas/consulta-vendas';
import { Cotacoes } from '../pages/cotacoes/cotacoes';
import { Tecnico } from '@pages/frigorifico/tecnico/tecnico';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, icon: string, component: any }>;
  splash:boolean;

  constructor(
    private platform: Platform,
    //private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private global: GlobalService,
    private autenticacao: AutenticacaoService) {

      if (!this.global.appCarregou) {
        this.splash = true;
      }

      this.pages = [
        { title: 'Início', icon: 'fa fa-fw fa-home', component: HomePage },
        { title: 'Nova oferta', icon: 'fa fa-fw fa-bullhorn', component: OfertaInicio },
        { title: 'Pesquisar ofertas', icon: 'fa fa-fw fa-search', component: ConsultaOfertas },
        { title: 'Minhas vendas', icon: 'fa fa-fw fa-usd', component: ConsultaVendas },
        { title: 'Minhas compras', icon: 'fa fa-fw fa-credit-card', component: ConsultaCompras },
        { title: 'Cotações', icon: 'fa fa-fw fa-line-chart', component: Cotacoes },
        { title: 'Técnico', icon: 'fa fa-pencil', component: Tecnico }
      ];

      this.initializeApp();
  }


  private initializeApp() {

    this.platform.ready().then(() => {

      this.autenticacao.aoRegistrarLoginWebApi().subscribe(sucesso => this.nav.setRoot(HomePage));
      this.fecharSplashScreen();

      //this.statusBar.styleDefault();
      //this.statusBar.backgroundColorByHexString("#A52A2A");
      //this.statusBar.styleLightContent();
    });
  }

  private fecharSplashScreen() {

    if (this.splash) {
      setTimeout(() => this.splash = false, 4000);
      this.global.appCarregou = true;
    }

    setTimeout(() => {
      this.splashScreen.hide();
    }, 100);
  }


  public abrirPagina(page) {

    this.nav.setRoot(page.component);
  }

  public abrirLogin() {

    if (this.global.usuarioLogado) {
      return;
    }

    this.nav.push(LoginPage);
  }

  public sair() {

    if (this.platform.is('cordova')) {
      this.autenticacao.logout();
    }
    else {
      this.nav.push(LoginPage);
    }
  }

  public abrirPerfil() {

    if (!this.global.usuarioLogado) {
      return;
    }

    this.nav.setRoot(PerfilPage);
  }
}
