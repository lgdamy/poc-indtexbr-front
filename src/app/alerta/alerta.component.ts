import { Component, Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MensagemData {
  titulo: string;
  mensagem: string;
}

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MensagemData) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

  callAlert(titulo:string,mensagem:string) {
    this.dialog.open(AlertaComponent,{
      width: '300px',
      data: {titulo:titulo,mensagem:mensagem}
    })
  }

}
