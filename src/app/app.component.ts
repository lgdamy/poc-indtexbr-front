import { Component } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IndTexBR';
  authenticated = false;
  constructor(
    public loader: LoadingComponent,
    public auth: AuthenticationService) {
  }
}
