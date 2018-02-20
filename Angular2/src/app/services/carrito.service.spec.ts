import { TestBed, async, inject } from '@angular/core/testing';
import { carroService } from './carro.service';

describe('carroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [carroService]
    });
  });

  it('should ...', inject([carroService], (service: carroService) => {
    expect(service).toBeTruthy();
  }));
});
