import { NgModule } from '@angular/core';
import { DaoNotificacao } from './dao-notificacao.service';
import { DaoOfertaLote } from './dao-oferta-lote.service';

@NgModule({
  providers: [
    DaoNotificacao,
    DaoOfertaLote
  ]
})
export class DaoModule {}
