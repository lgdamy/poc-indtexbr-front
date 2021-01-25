import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  title="Bem-vindos"
  message="Esta corporação não seria nada sem vocês, build automático"
  constructor() { }

  ngOnInit(): void {
  }

}
