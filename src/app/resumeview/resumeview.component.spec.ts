import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeviewComponent } from './resumeview.component';

describe('ResumeviewComponent', () => {
  let component: ResumeviewComponent;
  let fixture: ComponentFixture<ResumeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
