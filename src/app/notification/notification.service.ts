import { Injectable } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client'
import { environment } from 'src/environments/environment'
import { AlertService } from '../alert.service';
import { OrcamentoDTO } from '../licitacoes/licitacoes.service'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  wsUrl: string = environment.url_websocket;
  stompClient: any;
  conn: boolean = true;
  private orcamentoSubject = new Subject<OrcamentoDTO>();
  public orcamento$ : Observable<OrcamentoDTO> = this.orcamentoSubject.asObservable();

  constructor(
    private _alert: AlertService) {
     }

  connect(){
    this.conn = true;
    if (!this.stompClient) {
      const socket = new SockJS(this.wsUrl);
      this.stompClient = Stomp.over(socket);
    }
    const self = this
    var orcamento : OrcamentoDTO
    this.stompClient.connect({}, function (frame) {
      self.stompClient.subscribe("/topic/proposals", function (event) {
        try {
          orcamento = JSON.parse(event.body);
          self._alert.message(orcamento.company + " acaba de orçar a licitação #" + orcamento.listing);
          self.updateSubject(orcamento);
        } catch (error) {
          self.errorCallBack(error)
        }
      });
    })
  }

  public updateSubject(orcamento : OrcamentoDTO) {
    this.orcamentoSubject.next(orcamento);
  }

  disconnect() {
    if (this.stompClient) {
      this.conn = false;
      this.stompClient.disconnect();
    }
  }

  private errorCallBack(error: any) {
    setTimeout(() => {
      if (this.conn) {
        this._alert.error("Conexão instável");
        this.connect();
      }
    }, 30000);
  }
}
