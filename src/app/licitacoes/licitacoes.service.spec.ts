import { TestBed } from '@angular/core/testing';

import { LicitacoesService } from './licitacoes.service';

describe('LicitacoesService', () => {
  let service: LicitacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicitacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
