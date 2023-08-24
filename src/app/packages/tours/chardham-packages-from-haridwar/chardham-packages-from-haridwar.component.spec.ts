import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromHaridwarComponent } from './chardham-packages-from-haridwar.component';

describe('ChardhamPackagesFromHaridwarComponent', () => {
  let component: ChardhamPackagesFromHaridwarComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromHaridwarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromHaridwarComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromHaridwarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
