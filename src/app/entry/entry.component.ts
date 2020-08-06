import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  title="Bem-vindo"
  message="Esta corporação não seria nada sem você"
  constructor() { }

  ngOnInit(): void {
  }

}
