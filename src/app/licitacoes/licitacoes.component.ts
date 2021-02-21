import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { LicitacoesService, LicitacaoDTO, PageResponseDTO } from './licitacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';
import { AlertService } from '../alert.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss'],
})
export class LicitacoesComponent implements OnInit {
  title = "Licitações";
  displayedColumns:string[] = ['id','criado','categoria','grupo','cor','prazo'];
  registros: Array<LicitacaoDTO>;
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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(
    private _service: LicitacoesService,
    private _alert:AlertService,
    public loader : LoadingComponent) { }

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
    if ( this.ini != undefined && this.fim != undefined ) {
      this.loader.toggle = true
      this._service.consultaPorDatas(this.ini, this.fim, this.tamanho, this.pagina).subscribe(
        (data:PageResponseDTO<LicitacaoDTO>) => {
          this.registros = data.content;
          this.length = data.totalElements;
        },
        (error) => {
          this._alert.error(error.error.message);
          this.limparRegistros();
        }
      ).add(() => this.loader.toggle = false);
    } else if (this.numLicitacao != undefined && this.numLicitacao != 0 && !isNaN(this.numLicitacao)) {
      this.loader.toggle = true
      this._service.consultaPorId(this.numLicitacao).subscribe(
        (data: LicitacaoDTO) => {
          this.registros = [data];
          this.length = 1;
        },
        (error) => {
          this._alert.error(error)
          this.limparRegistros();
        }
      ).add(() => this.loader.toggle = false);
    }
  }

  ngOnInit(): void {
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
