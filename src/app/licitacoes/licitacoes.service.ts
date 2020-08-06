import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod'

export interface LicitacaoDTO {
  id:number
  category:string
  group:string
  color:string
  quantity:string
  createdAt:Date
  dueTo:Date
}

const baseUrl = environment.url_processo_industrial

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

  constructor(private _http:HttpClient) { }

  consultaPorDatas(ini:Date,fim:Date,tamanho:number,pagina:number) {
    const iniStr = ("0" + ini.getDate()).slice(-2) + ("0" + (ini.getMonth() + 1)).slice(-2) + ini.getFullYear();
    const fimStr = ("0" + fim.getDate()).slice(-2) + ("0" + (fim.getMonth() + 1)).slice(-2) + fim.getFullYear();
    
    return this._http.get(
      baseUrl + '/v1?from=' + iniStr + '&to=' + fimStr + '&page=' + pagina + '&size=' + tamanho,
      httpOptions);
  }

  consultaPorId(id:number) {
    return this._http.get(baseUrl + '/v1/' + id, 
      httpOptions)
  }

  novaLicitacao(licitacao:LicitacaoDTO) {
    return this._http.post(baseUrl + '/v1',
      licitacao,
      httpOptions);
  }
}
