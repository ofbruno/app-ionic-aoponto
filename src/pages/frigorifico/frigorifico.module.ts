import { ConsultaLote } from './consulta-lote/consulta-lote';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
      ConsultaLote
  ],
  imports: [
    IonicPageModule.forChild(ConsultaLote),
  ],
})
export class FrigorificoModule {
  
}
