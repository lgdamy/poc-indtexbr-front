import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

import { DatePipe } from '@angular/common';
import { pipe, Observable } from 'rxjs';

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

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class LicitacoesService {

  pipe : DatePipe = new DatePipe('en-US')

  constructor(private _http:HttpClient) { }

  consultaPorDatas(ini:Date,fim:Date,tamanho:number,pagina:number) : Observable<PageResponseDTO<LicitacaoDTO>> {
    const iniStr = ("0" + ini.getDate()).slice(-2) + ("0" + (ini.getMonth() + 1)).slice(-2) + ini.getFullYear();
    const fimStr = ("0" + fim.getDate()).slice(-2) + ("0" + (fim.getMonth() + 1)).slice(-2) + fim.getFullYear();
    
    return this._http.get<PageResponseDTO<LicitacaoDTO>>(
      baseUrl + '/v1?from=' + iniStr + '&to=' + fimStr + '&page=' + pagina + '&size=' + tamanho,
      httpOptions);
  }

  consultaPorId(id:number) : Observable<LicitacaoDTO> {
    return this._http.get<LicitacaoDTO>(baseUrl + '/v1/' + id, 
      httpOptions)
  }

  novaLicitacao(licitacao:LicitacaoDTO): Observable<number> {
    return this._http.post<number>(baseUrl + '/v1',
      {
        'category':licitacao.category,
        'group':licitacao.group,
        'color':licitacao.quantity,
        'quantity':licitacao.quantity,
        'dueTo': this.pipe.transform(licitacao.dueTo,'dd/MM/yyyy')
      },
      httpOptions);
  }
}
