import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromBanagaloreComponent } from './chardham-packages-from-banagalore.component';

describe('ChardhamPackagesFromBanagaloreComponent', () => {
  let component: ChardhamPackagesFromBanagaloreComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromBanagaloreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromBanagaloreComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromBanagaloreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
