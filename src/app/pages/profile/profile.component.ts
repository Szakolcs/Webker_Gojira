import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import User from '../../types/User';
import SkillLevelEnum from '../../types/SkillLevelEnum';
import Issue from '../../types/Issue';
import StatusEnum from '../../types/StatusEnum';
import issues from '../../database/issues';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  editProfileForm: FormGroup;
  isEditing: boolean = false;
  skillLevels = Object.values(SkillLevelEnum);
  errorMessage: string = '';
  successMessage: string = '';

  completedIssues: Issue[] = [];
  issuesByDate: { date: string, count: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      skillLevel: [SkillLevelEnum.Beginner, Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.UserData.subscribe((user: User | null) => {
      this.currentUser = user;

      if (this.currentUser) {
        this.editProfileForm.patchValue({
          name: this.currentUser.name,
          skillLevel: this.currentUser.skillLevel
        });

        this.loadCompletedIssues();
      }
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isEditing && this.currentUser) {
      this.editProfileForm.patchValue({
        name: this.currentUser.name,
        skillLevel: this.currentUser.skillLevel
      });
    }
  }

  saveProfile(): void {
    if (this.editProfileForm.valid && this.currentUser) {
      try {
        const updatedUser: User = {
          ...this.currentUser,
          name: this.editProfileForm.value.name,
          skillLevel: this.editProfileForm.value.skillLevel
        };
        const success = this.authService.updateUser(updatedUser);

        if (success) {
          this.currentUser = updatedUser;
          this.successMessage = 'Profile updated successfully';
          this.isEditing = false;
        } else {
          this.errorMessage = 'Failed to update profile';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred while updating profile';
        console.error('Profile update error:', error);
      }
    }
  }

  private loadCompletedIssues(): void {
    if (this.currentUser) {
      this.completedIssues = issues.filter(issue =>
        issue.assigneeId === this.currentUser?.id &&
        issue.status === StatusEnum.Completed
      );

      this.groupIssuesByDate();
    }
  }

  private groupIssuesByDate(): void {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const dateArray: { date: string, count: number }[] = [];
    for (let d = new Date(oneMonthAgo); d <= today; d.setDate(d.getDate() + 1)) {
      dateArray.push({
        date: d.toISOString().split('T')[0],
        count: 0
      });
    }

    this.completedIssues.forEach(issue => {
      const issueDate = new Date(issue.updatedAt).toISOString().split('T')[0];
      const dateEntry = dateArray.find(d => d.date === issueDate);
      if (dateEntry) {
        dateEntry.count++;
      }
    });

    this.issuesByDate = dateArray;
  }
}
