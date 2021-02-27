import { Component, OnInit, OnDestroy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { LicitacoesService, LicitacaoDTO, OrcamentoDTO, PageResponseDTO } from './licitacoes.service';
import { LoadingComponent } from '../loading/loading.component';
import { AlertService } from '../alert.service';
import { MatDialog } from '@angular/material/dialog';
import { OrcamentosComponent } from './orcamentos/orcamentos.component';
import { NotificationService } from '../notification/notification.service';
import { Subscription } from 'rxjs';

export interface Registro {
  reg : LicitacaoDTO,
  change: boolean
}

@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss'],
})
export class LicitacoesComponent implements OnInit, OnDestroy {
  title = "Licitações";
  displayedColumns: string[] = ['id', 'criado', 'categoria', 'grupo', 'cor', 'prazo', 'orcamentos'];
  registros: Array<Registro>;
  pageEvent: PageEvent;
  pageIndex: number;
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  quantidadeGerados: number = 10;
  private ini: Date;
  private fim: Date;
  private tamanho: number = this.pageSize;
  private pagina: number = 0;
  private numLicitacao: number;
  datePickerRefresh = true;
  numLicitacaoRefresh = true;
  private websockets : Subscription;
  

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(
    private _service: LicitacoesService,
    private _notification: NotificationService,
    private _alert: AlertService,
    public loader: LoadingComponent,
    public dialog: MatDialog) {
  }

  paginacaoAlterada(event: PageEvent) {
    this.tamanho = event.pageSize;
    this.pagina = event.pageIndex;
    this.buscarRegistros();
  }

  dataAlterada(event: MatDatepickerInputEvent<Date>) {
    this.ini = event.value['begin'];
    this.fim = event.value['end'];
    this.numLicitacao = undefined;
    this.pagina = 0;
    this.paginator.pageIndex = 0;
    this._numLicitacaoRefresh();
    this.buscarRegistros();
  }

  numLicitacaoAlterado(event: Event) {
    this.numLicitacao = Number(event.target['value']);
    this.ini = undefined;
    this.fim = undefined;
    this.pagina = 0;
    this.paginator.pageIndex = 0;
    this._datePickerRefresh();
    this.buscarRegistros();
  }

  buscarRegistros() {
    if (this.ini != undefined && this.fim != undefined) {
      this.loader.toggle = true
      this._service.consultaPorDatas(this.ini, this.fim, this.tamanho, this.pagina).subscribe(
        (data: PageResponseDTO<LicitacaoDTO>) => {
          this.registros = data.content.map(lic => {
            return {reg : lic, change: false}
          });
          this.length = data.totalElements;
        },
        (error) => {
          this._alert.error(error);
          this.limparRegistros();
        }
      ).add(() => this.loader.toggle = false);
    } else if (this.numLicitacao != undefined && this.numLicitacao != 0 && !isNaN(this.numLicitacao)) {
      this.loader.toggle = true
      this._service.consultaPorId(this.numLicitacao).subscribe(
        (data: LicitacaoDTO) => {
          this.registros = [{reg : data, change: false}];
          this.length = 1;
        },
        (error) => {
          this._alert.error(error)
          this.limparRegistros();
        }
      ).add(() => this.loader.toggle = false);
    }
  }

  buscarOrcamentos(licitacao: number) {
    if (licitacao !== undefined) {
      this.loader.toggle = true;
      this._service.consultarOrcamentos(licitacao).subscribe(
        (data: OrcamentoDTO[]) => {
          this.dialog.open(OrcamentosComponent, {
            data: data,
            panelClass: 'no-padding-container'
          })
        },
        (error) => {
          this._alert.error(error);
        }
      ).add(() => this.loader.toggle = false);
    }
  }


  ngOnInit(): void {
    this.websockets = this._notification.orcamento$.subscribe(o => {
      if (this.registros) {
        this.registros
        .filter(r => r.reg && r.reg.id == o.listing)
        .forEach(r => {
          const qtd = r.reg.proposals + 1
          r.reg.proposals = qtd;
          r.change = true;
          setTimeout(() => r.change = false, 2000);
        });
      }
    })
  }

  ngOnDestroy() {
    this.websockets.unsubscribe();
  }



  private _datePickerRefresh() {
    setTimeout(() => this.datePickerRefresh = false);
    setTimeout(() => this.datePickerRefresh = true);
  }

  private _numLicitacaoRefresh() {
    setTimeout(() => this.numLicitacaoRefresh = false);
    setTimeout(() => this.numLicitacaoRefresh = true);
  }

  private limparRegistros() {
    this.registros = null;
    this.length = 0;
  }




}
