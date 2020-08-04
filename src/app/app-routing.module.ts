import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicitacoesComponent } from './licitacoes/licitacoes.component'
import { GerarLicitacaoComponent } from './licitacoes/gerar-licitacao.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { EntryComponent } from './entry/entry.component'

const routes: Routes = [
  { path:'licitacoes', component: LicitacoesComponent },
  { path:'licitacoes/nova', component: GerarLicitacaoComponent},
  { path:'', component: EntryComponent },
  { path:'**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
