import { Mensagens } from '../mensagens/mensagens.service';
import { WebApiHttpParams, WebApiOpcoes } from './webapi.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebApiInterceptor implements HttpInterceptor {

    private opcoes: WebApiOpcoes;
    private msgErroPadrao: string;

    constructor(private mensagens: Mensagens) {

        this.msgErroPadrao = 'Infelizmente tivemos um erro nesta operação. Tente novamente mais tarde.';
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.opcoes = new WebApiOpcoes();

        if (request.params instanceof WebApiHttpParams && request.params.opcoes) {
            this.opcoes = request.params.opcoes;
        }

        //this.mostrarCarregando();

        return next.handle(request)
            .map(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {

                        if (!event.ok) {
                            if (this.opcoes.exibirMensagemFalha) {
                                this.mensagens.toast(event.body);
                            }

                            event = event.clone({ body: null });
                            Observable.throw(event.body);
                        }
                    }

                    return event;
                }
            )
            .do(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (this.opcoes.exibirMensagemErro) {
                        this.mensagens.toast(this.msgErroPadrao);
                    }
                    console.log(err);
                }
            )
            .finally(
                () => {}//this.fecharCarregando()
            );
    }

    // private mostrarCarregando() : void {

    //     if (this.loadingAberto) {
    //       return;
    //     }

    //     if (this.opcoes.exibirCarregando) {

    //         this.loading = this.loadingCtrl.create({
    //             content: this.opcoes.mensagemCarregando + '...' || "Carregando..."
    //         });

    //         this.loading.present().then(() => this.loadingAberto = true);
    //     }
    // }

    // private fecharCarregando(): void {

    //     if (this.loadingAberto) {
    //         this.loading.dismiss().then(() => this.loadingAberto = false);
    //     }
    // }

}
