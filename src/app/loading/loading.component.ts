import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'api-loader',
  templateUrl: './loading.component.html',
})
@Injectable()
export class LoadingComponent implements OnInit {

  toggle:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
