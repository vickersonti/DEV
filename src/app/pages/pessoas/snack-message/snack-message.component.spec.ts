import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackMessageComponent } from './snack-message.component';

describe('SnackMessageComponent', () => {
  let component: SnackMessageComponent;
  let fixture: ComponentFixture<SnackMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackMessageComponent]
    });
    fixture = TestBed.createComponent(SnackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
