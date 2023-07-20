import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowAudienceDemographicComponent } from './know-audience-demographic.component';

describe('KnowAudienceDemographicComponent', () => {
  let component: KnowAudienceDemographicComponent;
  let fixture: ComponentFixture<KnowAudienceDemographicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowAudienceDemographicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowAudienceDemographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
