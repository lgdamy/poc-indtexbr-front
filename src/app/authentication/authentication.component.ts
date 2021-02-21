import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  title='Autenticação'
  formGroup:FormGroup;

  constructor(
    public service : AuthenticationService,
    private _formBuilder : FormBuilder,
    private _alert : AlertService
    ) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      user : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    })
  }

  autenticar() {
    if (this.formGroup.invalid) {
      this._alert.error('Informe suas credenciais');
      return;
    }
    let user = this.formGroup.value.user;
    let password = this.formGroup.value.password;
    this.service.autenticar(user,password);
  }
}
