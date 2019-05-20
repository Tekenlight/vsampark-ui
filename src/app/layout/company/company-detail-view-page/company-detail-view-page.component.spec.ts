import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailViewPageComponent } from './company-detail-view-page.component';

describe('CompanyDetailViewPageComponent', () => {
  let component: CompanyDetailViewPageComponent;
  let fixture: ComponentFixture<CompanyDetailViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDetailViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
