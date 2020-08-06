import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  title = "Página não encontrada"
  message = "Este recurso não está disponível ou não existe"
  constructor() { }

  ngOnInit(): void {
  }

}
