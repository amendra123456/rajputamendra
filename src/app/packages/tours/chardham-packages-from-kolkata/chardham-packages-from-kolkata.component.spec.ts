import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardhamPackagesFromKolkataComponent } from './chardham-packages-from-kolkata.component';

describe('ChardhamPackagesFromKolkataComponent', () => {
  let component: ChardhamPackagesFromKolkataComponent;
  let fixture: ComponentFixture<ChardhamPackagesFromKolkataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChardhamPackagesFromKolkataComponent]
    });
    fixture = TestBed.createComponent(ChardhamPackagesFromKolkataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
