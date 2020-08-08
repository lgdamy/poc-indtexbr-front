import { Component, OnInit } from '@angular/core';
import { LicitacoesService, LicitacaoDTO } from './licitacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerar-licitacao',
  templateUrl: './gerar-licitacao.component.html',
  styleUrls: ['./gerar-licitacao.component.scss']
})
export class GerarLicitacaoComponent implements OnInit {
  title = "Gerar Licitação";
  formGroup:FormGroup;
  constructor(
    private _formBuilder:FormBuilder,
    private _service: LicitacoesService,
    private _alert:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.formGroup=this._formBuilder.group({
      categoria: new FormControl('',Validators.required),
      grupo: new FormControl('', Validators.required),
      cor: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required),
      dataLimite: new FormControl('',Validators.required)
    });
  }

  parseDTO() : LicitacaoDTO {
    const form = this.formGroup.value;
    if (this.formGroup.invalid) {
      this.abrirAlerta('Informe os campos obrigatórios');
      return;
    }
    const dto : LicitacaoDTO = <LicitacaoDTO>{
      category: form.categoria,
      group: form.grupo,
      color: form.cor,
      quantity: form.quantidade,
      dueTo: form.dataLimite,
    };
    return dto;
  }

  gerarLicitacao() {
    var dto = this.parseDTO()
    if (dto != undefined) {
      this._service.novaLicitacao(dto).subscribe(
        data => this.abrirAlerta('Licitação Gerada #' + data)
      ,(error) => {
          this.abrirAlerta(error.error.message)
        })
    }
  }

  abrirAlerta(mensagem:string) {
    this._alert.open(mensagem || 'Falha na comunicação', undefined, {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
    } )
  }

}
