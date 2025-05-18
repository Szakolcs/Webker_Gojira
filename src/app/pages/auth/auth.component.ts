import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import SkillLevelEnum from '../../types/SkillLevelEnum';
import { AuthService } from '../../services/auth.service';
import User from '../../types/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignIn: boolean = true;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  skillLevels = Object.values(SkillLevelEnum);
  returnUrl: string = '/home';
  isLoading: boolean = false;
  errorMessage: string = '';
  private subscriptions?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      skillLevel: [SkillLevelEnum.Beginner, Validators.required],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(this.returnUrl).then(r => {});
    }
  }

  onSignIn(): void {
    if (this.signInForm.get("email")?.invalid) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.signInForm.get("password")?.invalid) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    const emailValue = this.signInForm.get("email")?.value;
    const passwordValue = this.signInForm.get("password")?.value;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signIn(emailValue, passwordValue)
      .then(ignored => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home').then(r => {});
      })
      .catch(error => {
        console.error('Login error:', error);
        this.isLoading = false;

        switch(error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-credential':
            this.errorMessage = 'Invalid email or password';
            break;
          default:
            this.errorMessage = 'Authentication failed. Please try again later.';
        }
      });
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password, ...userData } = this.signUpForm.value;

      const user: Partial<User> = {
        name: userData.name,
        skillLevel: userData.skillLevel,
        teamIds: [],
      };

      this.authService.signUp(email, password, user)
        .then(() => {
          this.authService.updateLoginStatus(true);
          this.router.navigateByUrl(this.returnUrl).then(r => {});
        })
        .catch(error => {
          console.error('Registration error:', error);
          this.isLoading = false;

          switch(error.code) {
            case 'auth/email-already-in-use':
              this.errorMessage = 'An account with this email already exists';
              break;
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email address';
              break;
            case 'auth/operation-not-allowed':
              this.errorMessage = 'Email/password accounts are not enabled';
              break;
            case 'auth/weak-password':
              this.errorMessage = 'Password is too weak';
              break;
            default:
              this.errorMessage = 'Registration failed. Please try again later.';
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
