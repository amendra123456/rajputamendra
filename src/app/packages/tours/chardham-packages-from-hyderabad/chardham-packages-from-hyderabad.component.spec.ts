import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromHyderabadComponent } from './chardham-packages-from-hyderabad.component';

describe('ChardhamPackagesFromHyderabadComponent', () => {
  let component: ChardhamPackagesFromHyderabadComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromHyderabadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromHyderabadComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromHyderabadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
