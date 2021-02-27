import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _alert: MatSnackBar) { }

  public error(error: any) {
    if (error != undefined && (typeof error === 'string' || error instanceof String)) {
      this._showAlert(true, error.toString())
    } else {
      const errormessage = (((error || {}).error || {} ).message);
      if (errormessage) {
        this._showAlert(true, errormessage);
      } else {
        const errorstatus = ((error || {}).status);
        if (errorstatus === 401) {
          this._showAlert(true, 'Não Autorizado')
        } else {
          this._showAlert(true, 'Falha na comunicação')
        }
      }
    }
  }

  public message(message: string) {
    this._showAlert(false, message);
  }

  private _showAlert(error: boolean, message: string) {
    this._alert.open(message, undefined, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: error ? ['alert-error'] : ['alert-normal']
    })
  }
}
