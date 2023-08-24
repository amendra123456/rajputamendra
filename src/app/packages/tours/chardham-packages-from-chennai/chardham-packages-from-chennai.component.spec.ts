import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromChennaiComponent } from './chardham-packages-from-chennai.component';

describe('ChardhamPackagesFromChennaiComponent', () => {
  let component: ChardhamPackagesFromChennaiComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromChennaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromChennaiComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromChennaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
