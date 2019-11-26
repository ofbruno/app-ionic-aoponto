/*
* Modules
*/
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { DaoModule } from './../services/dao/dao.module';
import { LoginModule } from '../pages/login/login.module';
import { OfertaLoteModule } from '../pages/produtor/oferta-lote/oferta-lote.module'
import { ConsultasLoteModule } from '../pages/consultas-lote/consultas-lote.module';
import { TecnicoModule } from '@pages/frigorifico/tecnico.module';

/*
* Firebase
*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../firebase.config';

/*
* Plugins
*/
import { Keyboard } from '@ionic-native/keyboard';
import { Toast } from '@ionic-native/toast';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase'
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';

/*
* Services
*/
import { AutenticacaoService } from '../services/autenticacao/autenticacao.service';
import { GlobalService } from '../services/global/global.service';
import { Mensagens } from '../services/mensagens/mensagens.service';
import { WebApi } from '../services/webapi/webapi.service';
import { WebApiInterceptor } from '../services/webapi/webapi.interceptor';
import { PushService } from './../services/push/push.service'

/*
* Components & Pages
*/
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalLista } from '../pages/modals/modal-lista';
import { NotificacoesLista } from '../pages/notificacoes/notificacoes-lista';
import { NoticiaDetalhes } from '../pages/noticias/noticia-detalhes';
import { HideFabDirective } from '../directives/hide-fab/hide-fab';
import { ModalTexto } from '../pages/modals/modal-texto';
import { Cotacoes } from '../pages/cotacoes/cotacoes';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';

/*
* Pipes
*/
import { FilterArrayPipe } from '../pipes/filter-array.pipe';

/*
* Localização
*/
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';



registerLocaleData(localePtBr);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalLista,
    ModalTexto,
    Cotacoes,
    NotificacoesLista,
    NoticiaDetalhes,
    HideFabDirective,
    FilterArrayPipe,
    TextAvatarDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    DaoModule,
    LoginModule,
    OfertaLoteModule,
    TecnicoModule,
    ConsultasLoteModule,
    MomentModule,
    IonicModule.forRoot(MyApp, { pageTransition: 'ios-transition' }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.data),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalLista,
    ModalTexto,
    Cotacoes,
    NotificacoesLista,
    NoticiaDetalhes
  ],
  providers: [
    SplashScreen,
    Toast,
    ImagePicker,
    Camera,
    Keyboard,
    Geolocation,
    AngularFireAuth,
    Firebase,
    FirebaseAuthentication,
    WebApi,
    AutenticacaoService,
    GlobalService,
    Mensagens,
    Device,
    PushService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebApiInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ]
})
export class AppModule {}
