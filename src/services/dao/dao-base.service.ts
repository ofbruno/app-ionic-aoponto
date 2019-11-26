import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Platform } from "ionic-angular";


@Injectable()
export class DaoBase {

    private pronto: boolean = false;


    constructor(private storage: Storage, private platform: Platform) {

        this.platform.ready().then(() => this.pronto = true);
    }


    protected salvar(chave: string, valor: any) {

        if (!this.pronto) {
            return;
        }

        this.storage.set(chave, valor);
    }

    protected obterDados<T>(chave: string) : Promise<T> {

        if (!this.pronto) {
            return;
        }

        return this.storage.get(chave);
    }

    protected obterLista<T>(chave: string) : Promise<Array<T>> {

        if (!this.pronto) {
            return;
        }

        return this.storage.get(chave);
    }

    protected obterValor(chave: string) {

        if (!this.pronto) {
            return;
        }

        return this.storage.get(chave);
    }

}

