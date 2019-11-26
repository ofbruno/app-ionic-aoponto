import { Endereco } from "./endereco.model";
import { DateTime } from "ionic-angular";

export class OfertaLote {

    id: number;
    tipo: number;
    produtorId: number;
    racaId: number;
    disponibilidade: number;
    preco: number;
    prazo: number;
    tipoFrete: number;
    distanciaLimiteFrete: number;
    genero: number;
    idade: number;
    quantidade: number;
    pesoMedio: number;
    enderecoId: number;
    comentarios: string;
    dataHora: DateTime;
    endereco: Endereco;
    registros: Array<string>
    anexos: Array<string>

    constructor() {
      this.prazo = 0;
      this.disponibilidade = 0;
      this.endereco = new Endereco();
    }
  }
