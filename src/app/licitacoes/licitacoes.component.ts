import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { LicitacoesService, LicitacaoDTO } from './licitacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.component.html',
  styleUrls: ['./licitacoes.component.scss']
})
export class LicitacoesComponent implements OnInit {
  title = "Licitações"
  displayedColumns:string[] = ['id','criado','categoria','grupo','cor','prazo']
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
  datePickerRefresh = true;
  numLicitacaoRefresh = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private _service: LicitacoesService, private _alert:MatSnackBar) { }

  paginacaoAlterada(event: PageEvent) {
    this.tamanho = event.pageSize;
    this.pagina = event.pageIndex;
    this.buscarRegistros();
  }

  dataAlterada(event: MatDatepickerInputEvent<Date>) {
    this.ini = event.value['begin'];
    this.fim = event.value['end'];
    this._numLicitacaoRefresh();
    this.buscarRegistros();
  }

  numLicitacaoAlterado(event: Event) {
    var selected = event.target['value'];
    this._datePickerRefresh();
    if (selected != undefined && selected !== '' ) {
      this.buscaPorId(parseInt(selected))
    }
  }

  buscaPorId(id:number) {
    this.ini = undefined;
    this.fim = undefined;
    this.pagina = 0;
    this.paginator.pageIndex = 0;
    this._service.consultaPorId(id).subscribe(
      data => {
        this.registros = data['content'];
        this.length = data['totalElements'];
      },
      (error) => {
        this.abrirAlerta('Essa porra está fora!')
        this.registros = null;
        this.length = 0;
      }
    )
  }

  buscarRegistros() {
    if (this.ini != undefined || this.fim != undefined) {
      this._service.consultaPorDatas(this.ini, this.fim, this.tamanho, this.pagina).subscribe(
        data => {
          this.registros = data['content'];
          this.length = data['totalElements'];
        },
        (error) => {
          this.abrirAlerta('Essa porra está fora!')
          this.registros = null;
          this.length = 0;
        }
      )
    }
  }

  abrirAlerta(mensagem:string) {
    this._alert.open(mensagem, undefined, {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
    } )
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


}
