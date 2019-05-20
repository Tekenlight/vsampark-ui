import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApproveRejectComponent } from './company-approve-reject.component';

describe('CompanyApproveRejectComponent', () => {
  let component: CompanyApproveRejectComponent;
  let fixture: ComponentFixture<CompanyApproveRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApproveRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
