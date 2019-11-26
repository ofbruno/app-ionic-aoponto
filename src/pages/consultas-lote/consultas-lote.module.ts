import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ConsultaOfertas } from './consulta-ofertas/consulta-ofertas';
import { ConsultaCompras } from './consulta-compras/consulta-compras';
import { ConsultaVendas } from './consulta-vendas/consulta-vendas';
import { DetalhesLoteCompra } from './detalhes-lote-compra/detalhes-lote-compra';
import { DetalhesLoteVenda } from './detalhes-lote-venda/detalhes-lote-venda';
import { DetalhesLoteOferta } from './detalhes-lote-oferta/detalhes-lote-oferta';

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ConsultaOfertas,
    ConsultaCompras,
    ConsultaVendas,
    DetalhesLoteCompra,
    DetalhesLoteVenda,
    DetalhesLoteOferta
  ],
  imports: [
    ionicGalleryModal.GalleryModalModule,
    IonicPageModule.forChild(DetalhesLoteCompra),
  ],
  entryComponents: [
    ConsultaOfertas,
    ConsultaCompras,
    ConsultaVendas,
    DetalhesLoteCompra,
    DetalhesLoteVenda,
    DetalhesLoteOferta
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig
    }
  ]
})
export class ConsultasLoteModule {}
