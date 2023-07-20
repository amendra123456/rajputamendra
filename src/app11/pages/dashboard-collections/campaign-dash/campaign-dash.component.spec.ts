import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDashComponent } from './campaign-dash.component';

describe('CampaignDashComponent', () => {
  let component: CampaignDashComponent;
  let fixture: ComponentFixture<CampaignDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
