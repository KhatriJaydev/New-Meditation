import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { fadeInRightAndSlide } from 'src/app/animations/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [fadeInRightAndSlide],
})
export class SignInComponent {
  showPassword = false;

  constructor(
    public router: Router,
    private onboardingService: OnboardingService,
    public apiService: ApiService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signUP() {
    this.router.navigate(['/sign-up']);
  }

  forgotPassword() {
    this.router.navigate(['sign-in', 'forgot-password']);
  }
  goBack() {
    this.onboardingService.setOnboardingCompleted(false);
    this.router.navigate(['home']);
  }
  userLogin() {
    this.apiService.loginUserAccount().subscribe(
      (response) => {
        this.router.navigate(['tabs', 'dashboard']);
        console.log('Login Response:', response);
      },
      (error) => {
        console.error('Login Error:', error);
      }
    );
  }
}
