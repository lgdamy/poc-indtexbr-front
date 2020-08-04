import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarLicitacaoComponent } from './gerar-licitacao.component';

describe('GerarLicitacaoComponent', () => {
  let component: GerarLicitacaoComponent;
  let fixture: ComponentFixture<GerarLicitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarLicitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
