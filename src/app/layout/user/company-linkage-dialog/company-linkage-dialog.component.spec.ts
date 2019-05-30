import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLinkageDialogComponent } from './company-linkage-dialog.component';

describe('CompanyLinkageDialogComponent', () => {
  let component: CompanyLinkageDialogComponent;
  let fixture: ComponentFixture<CompanyLinkageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLinkageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLinkageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
