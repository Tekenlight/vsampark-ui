import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLinkageDialogComponent } from './user-linkage-dialog.component';

describe('UserLinkageDialogComponent', () => {
  let component: UserLinkageDialogComponent;
  let fixture: ComponentFixture<UserLinkageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLinkageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLinkageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
