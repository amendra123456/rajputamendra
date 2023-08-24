import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromVadodaraComponent } from './chardham-packages-from-vadodara.component';

describe('ChardhamPackagesFromVadodaraComponent', () => {
  let component: ChardhamPackagesFromVadodaraComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromVadodaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromVadodaraComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromVadodaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
