
import { Tecnico } from './tecnico/tecnico';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    Tecnico
  ],
  imports: [
    IonicPageModule.forChild(Tecnico),
  ],
})
export class TecnicoModule {
  
}
