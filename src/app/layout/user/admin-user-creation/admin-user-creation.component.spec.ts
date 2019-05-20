import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCreationComponent } from './admin-user-creation.component';

describe('AdminUserCreationComponent', () => {
  let component: AdminUserCreationComponent;
  let fixture: ComponentFixture<AdminUserCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
