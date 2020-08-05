import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerInput } from '@angular/material/datepicker';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { LicitacoesService, LicitacaoDTO } from './licitacoes.service';
import { AlertaComponent, MensagemData } from 'src/app/alerta/alerta.component'


@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss']
})
export class LicitacoesComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  registros: Array<LicitacaoDTO>;
  pageEvent: PageEvent;
  pageIndex: number;
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  quantidadeGerados: number = 10;
  private ini: Date;
  private fim: Date;
  private tamanho: number;
  private pagina: number;
  private data: MensagemData;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(AlertaComponent, { static: false }) alerta: AlertaComponent;

  constructor(private _service: LicitacoesService) { }

  paginacaoAlterada(event: PageEvent) {
    this.tamanho = event.pageSize;
    this.pagina = event.pageIndex;
    this.buscarRegistros();
  }

  dataAlterada(event: MatDatepickerInputEvent<Date>) {
    this.ini = event.value['begin'];
    this.fim = event.value['end'];
    this.pagina = 0;
    this.paginator.pageIndex = 0;
    if (this.ini != undefined && this.fim != undefined) {
      this._service.consultaPorDatas(this.ini, this.fim, this.tamanho, this.pagina).subscribe(
        data => {
          this.registros = data['content'];
          this.length = data['totalElements'];
        },
        (error) => {
          this.alerta.callAlert('ERRO', 'Essa porra ta fora');
          this.registros = null;
          this.length = 0;
        }
      );
    }
  }

  buscarRegistros() {
    if (this.ini != undefined || this.fim != undefined) {
      this._service.consultaPorDatas(this.ini, this.fim, this.tamanho, this.pagina).subscribe(
        data => {
          this.registros = data['content'];
          this.length = data['totalElements'];
        },
        (error) => {
          var data: MensagemData;
          data.titulo = 'ERRO';
          data
          this.alerta.callAlert('ERRO', 'Essa porra ta fora');
          this.registros = null;
          this.length = 0;
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
