import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromPuneComponent } from './chardham-packages-from-pune.component';

describe('ChardhamPackagesFromPuneComponent', () => {
  let component: ChardhamPackagesFromPuneComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromPuneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromPuneComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromPuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
