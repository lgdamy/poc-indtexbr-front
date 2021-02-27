import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';
import { DateAdapter } from '@angular/material/core';
import { validate } from 'json-schema';
import { AlertService } from '../alert.service';
import { NotificationService } from '../notification/notification.service';

export interface AuthResponseDTO {
  access_token: string,
  token_type: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
  jti: string
}

const baseUrl = environment.url_authentication;
const api_auth_token = environment.api_auth_token;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public loader: LoadingComponent,
    private _http: HttpClient,
    private _alert: AlertService,
    private _notification : NotificationService
  ) {this.buscarToken() }

  toggle:boolean = false;

  autenticar(user: string, password: string) {
    this.loader.toggle = true;
    const body = `grant_type=password&username=${user}&password=${password}`;

    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', api_auth_token)
    }
    this._http.post<AuthResponseDTO>(baseUrl + '/token', body, options)
      .subscribe(
        a => {
          this.definirToken(a);
          this._alert.message("Autorizado")
        },
        (error) => {
          this._alert.error('Não Autorizado');
          this.definirToken();
        }
      ).add(() => this.loader.toggle = false);
  }

  buscarToken(): string {
    if (localStorage.getItem('token') === null || new Date().getTime() > parseInt(localStorage.getItem('validade'))) {
      this.toggle = false;
      return '';
    }
    this.toggle = true;
    return 'Bearer ' + localStorage.getItem('token');
  }

  sair() {
    this.definirToken();
    this._alert.message('Desconectado')
  }

  private definirToken(resp?: AuthResponseDTO) {
    if (resp == undefined) {
      localStorage.removeItem('token');
      localStorage.removeItem('validade');
      this._notification.disconnect()
      this.toggle = false;
      return;
    }
    let exp = new Date().setTime(new Date().getTime() + resp.expires_in * 1000);
    localStorage.setItem('token', resp.access_token)
    localStorage.setItem('validade', exp.toString());
    this._notification.connect();
    this.toggle = true;
  }

}
