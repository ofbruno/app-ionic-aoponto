import { EtapaOfertaLote } from "./etapa-oferta-lote.model";

  export class ConsultaOfertaLote {

    id: number;
    codigo: string;
    dataHora: string;
    status: number;
    statusDescricao: string;
    enderecoCidade: string;
    enderecoEstado: string;
    tipoDescricao: string;
    genero: string;
    raca: string;
    quantidade: string;
    preco: string;
    idade: string;
    pesoMedio: number;
    prazo: string;
    disponibilidade: string;
    tipoFrete: string;
    comentarios: string;

    anexos: Array<string>;
    etapasVenda: Array<EtapaOfertaLote>;
    etapasCompra: Array<EtapaOfertaLote>;
  }
