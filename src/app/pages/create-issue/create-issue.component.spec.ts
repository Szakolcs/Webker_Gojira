import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueComponent } from './create-issue.component';

describe('CreateComponent', () => {
  let component: CreateIssueComponent;
  let fixture: ComponentFixture<CreateIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-issue', () => {
    expect(component).toBeTruthy();
  });
});
