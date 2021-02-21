import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

import { DatePipe } from '@angular/common';
import { pipe, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

export interface LicitacaoDTO {
  id:number
  category:string
  group:string
  color:string
  quantity:string
  createdAt: Date
  dueTo: Date
}

export interface PageResponseDTO<T> {
  page:number
  pageSize:number
  totalElements:number
  content:Array<T>
}

const baseUrl = environment.url_processo_industrial + '/listings'

@Injectable({
  providedIn: 'root'
})
export class LicitacoesService {

  pipe : DatePipe = new DatePipe('en-US')

  constructor(private _http:HttpClient, private _auth : AuthenticationService) { }

  consultaPorDatas(ini:Date,fim:Date,tamanho:number,pagina:number) : Observable<PageResponseDTO<LicitacaoDTO>> {
    const iniStr = ("0" + ini.getDate()).slice(-2) + ("0" + (ini.getMonth() + 1)).slice(-2) + ini.getFullYear();
    const fimStr = ("0" + fim.getDate()).slice(-2) + ("0" + (fim.getMonth() + 1)).slice(-2) + fim.getFullYear();

    return this._http.get<PageResponseDTO<LicitacaoDTO>>(
      baseUrl + '/v1?from=' + iniStr + '&to=' + fimStr + '&page=' + pagina + '&size=' + tamanho,
      this.headers());
  }

  consultaPorId(id:number) : Observable<LicitacaoDTO> {
    return this._http.get<LicitacaoDTO>(baseUrl + '/v1/' + id, 
    this.headers())
  }

  novaLicitacao(licitacao:LicitacaoDTO): Observable<number> {
    const httpOptions = {}
    return this._http.post<number>(baseUrl + '/v1',
      {
        'category':licitacao.category,
        'group':licitacao.group,
        'color':licitacao.quantity,
        'quantity':licitacao.quantity,
        'dueTo': this.pipe.transform(licitacao.dueTo,'dd/MM/yyyy')
      },
      this.headers())
      ;
  }

  private headers(): object {
    return {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Authorization': this._auth.buscarToken()
        })
      }
  }
}
