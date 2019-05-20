import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCompanyComponent } from './claim-company.component';

describe('ClaimCompanyComponent', () => {
  let component: ClaimCompanyComponent;
  let fixture: ComponentFixture<ClaimCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
