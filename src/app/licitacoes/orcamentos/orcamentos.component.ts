import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrcamentoDTO} from '../licitacoes.service'

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.scss']
})
export class OrcamentosComponent {

  displayedColumns:string[] = ['empresa','cnpj','preco','producao','entrega'];

  constructor(
    public dialogRef: MatDialogRef<OrcamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public orcamentos: Array<OrcamentoDTO>) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
