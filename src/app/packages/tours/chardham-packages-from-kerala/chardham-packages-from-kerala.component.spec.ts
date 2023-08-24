import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromKeralaComponent } from './chardham-packages-from-kerala.component';

describe('ChardhamPackagesFromKeralaComponent', () => {
  let component: ChardhamPackagesFromKeralaComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromKeralaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromKeralaComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromKeralaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
