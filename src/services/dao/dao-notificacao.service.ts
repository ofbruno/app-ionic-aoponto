import { Injectable } from "@angular/core";
import { INotificacao } from "../../interfaces/notificacao.interface";
import { DaoBase }  from "./dao-base.service";


@Injectable()
export class DaoNotificacao extends DaoBase {

  public salvar(notificacoes) {
    super.salvar('notificacoes', notificacoes);
  }

  public obterLista() : Promise<Array<any>> {
    return super.obterLista<INotificacao>('notificacoes');
  }
}
