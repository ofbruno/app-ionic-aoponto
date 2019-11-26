import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { WebApi } from '@services/webapi/webapi.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'noticia-detalhes',
  templateUrl: 'noticia-detalhes.html'
})
export class NoticiaDetalhes {

  private id: number;
  public noticia: {};
  public carregando: boolean;

  constructor(public navParams: NavParams, private api: WebApi) {

    this.noticia = {};
  }

  ionViewWillEnter() {

    this.carregando = true;
    this.id = this.navParams.get("id");
    this.carregarNoticia();
  }

  carregarNoticia() {

    this.api.get<any>('noticias', this.id.toString())
      .pipe(
        finalize(() => this.carregando = false))
      .subscribe(
        noticia => this.noticia = noticia,
        erros => console.log(erros)
      );
  }

}