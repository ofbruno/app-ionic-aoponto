import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertaInicio } from './oferta-inicio/oferta-inicio';
import { OfertaRaca } from './oferta-raca/oferta-raca';
import { OfertaGenero } from './oferta-genero/oferta-genero';
import { OfertaNumeros } from './oferta-numeros/oferta-numeros';
import { OfertaDisponibilidade } from './oferta-disponibilidade/oferta-disponibilidade';
import { OfertaPreco } from './oferta-preco/oferta-preco';
import { OfertaFrete } from './oferta-frete/oferta-frete';
import { OfertaLocalizacao } from './oferta-localizacao/oferta-localizacao';
import { OfertaAnexos } from './oferta-anexos/oferta-anexos';
import { OfertaNumerosRegistro } from './oferta-numeros-registro/oferta-numeros-registro';

@NgModule({
  declarations: [
    OfertaInicio,
    OfertaRaca,
    OfertaGenero,
    OfertaNumeros,
    OfertaNumerosRegistro,
    OfertaDisponibilidade,
    OfertaPreco,
    OfertaFrete,
    OfertaLocalizacao,
    OfertaAnexos,
  ],
  imports: [
    IonicPageModule.forChild(OfertaInicio),
  ],
  entryComponents: [
    OfertaInicio,
    OfertaRaca,
    OfertaGenero,
    OfertaNumeros,
    OfertaNumerosRegistro,
    OfertaDisponibilidade,
    OfertaPreco,
    OfertaFrete,
    OfertaLocalizacao,
    OfertaAnexos,
  ]
})
export class OfertaLoteModule {}
