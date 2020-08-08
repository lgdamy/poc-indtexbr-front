import { Component } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IndTexBR';
  apiLoader;
  constructor(public loader: LoadingComponent) {
  }
}
