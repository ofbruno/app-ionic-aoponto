import { Injectable } from "@angular/core";
import { IOfertaLote } from "../../interfaces/oferta-lote.interface";
import { DaoBase }  from "./dao-base.service";


@Injectable()
export class DaoOfertaLote extends DaoBase {

  public salvarOfertasDisponiveis(ofertas) {
    super.salvar('ofertas-disponiveis', ofertas);
  }

  public obterOfertasDisponiveis() : Promise<Array<any>> {
    return super.obterLista<IOfertaLote>('ofertas-disponiveis');
  }

  public salvarComprasLote(compras) {
    super.salvar('compras-lote', compras);
  }

  public obterComprasLote() : Promise<Array<any>> {
    return super.obterLista<IOfertaLote>('compras-lote');
  }

  public salvarVendasLote(vendas) {
    super.salvar('vendas-lote', vendas);
  }

  public obterVendasLote() : Promise<Array<any>> {
    return super.obterLista<IOfertaLote>('vendas-lote');
  }
}
