import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  currentConfirmPasswordForm: FormGroup;

  submittedForgotPass: boolean = false;

  forgotPassModel = true; //true
  emailVerificationModel = false;
  resetPasswordModel = false; //false

  isPopUpOpen: boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });

    this.otpForm = this.formBuilder.group({
      otpInput1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otpInput4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });

    this.currentConfirmPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6), // Minimum length requirement
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'), // Confirm password validator
      }
    );
  }

  goBack() {
    this.router.navigate(['sign-in']);
  }

  ngOnInit(): void {}

  recoverPassword() {
    this.emailVerificationModel = true;
    this.forgotPassModel = false;
    this.resetPasswordModel = false;
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(email)) {
        this.forgotPasswordForm.get('email')?.setErrors({ pattern: true });
      } else {
        console.log('Submitted email:', email);
      }
    } else if (this.forgotPasswordForm.value.email === '') {
      this.forgotPasswordForm.get('email')?.setErrors({ pattern: true });
    }
  }

  verifyOtp() {
    this.resetPasswordModel = true;
    this.emailVerificationModel = false;
    this.forgotPassModel = false;

    if (this.otpForm.valid) {
      console.log('OTP Form submitted:', this.otpForm.value);
    } else {
    }
  }

  newPassword() {
    this.onSubmit();
    if (this.currentConfirmPasswordForm.valid) {
      this.isPopUpOpen = true;
    }
  }

  onSubmit() {
    this.submittedForgotPass = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closePopup() {
    this.isPopUpOpen = false;
  }

  goToForgotPassword() {
    this.resetPasswordModel = false;
    this.emailVerificationModel = false;
    this.forgotPassModel = true;
  }

  goToemailVerification() {
    this.emailVerificationModel = true;
    this.forgotPassModel = false;
    this.resetPasswordModel = false;
  }

  showHidepass(passwordType: string) {
    if (passwordType === 'password') {
      this.showPassword = !this.showPassword;
    } else if (passwordType === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  // submitOtpForm() {
  //   if (this.otpForm.valid) {
  //     const otp =
  //       this.otpForm.value.otpInput1 +
  //       this.otpForm.value.otpInput2 +
  //       this.otpForm.value.otpInput3 +
  //       this.otpForm.value.otpInput4;
  //     console.log('Submitted OTP:', otp);
  //   } else {
  //     // OTP form is not valid, display error messages if needed
  //   }
  // }
  // submitForgotPasswordForm() {
  //   if (this.forgotPasswordForm.valid) {
  //     const email = this.forgotPasswordForm.value.email;
  //     console.log('Submitted email:', email);
  //   } else {
  //     // Display error messages or handle invalid form data
  //   }
  // }
}
