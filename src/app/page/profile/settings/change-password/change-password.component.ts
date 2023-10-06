import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  isPopUpOpen: boolean = false;
  showPassword: boolean = false;
  showConfirmPass: boolean = false;
  showNewPass: boolean = false;

  password: string;

  oldPasswordModel: boolean = true;
  createPasswordModel: boolean = false;

  constructor(private router: Router) {
    this.password = 'password';
  }

  togglePasswordVisibility(password: string) {
    if (password === 'currentPassword') {
      this.showPassword = !this.showPassword;
    } else if (password === 'newPassword') {
      this.showNewPass = !this.showNewPass;
    } else if (password === 'confirmPassword') {
      this.showConfirmPass = !this.showConfirmPass;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  checkOldPassword() {
    this.createPasswordModel = true;
    this.oldPasswordModel = false;
  }

  updatePassword() {
    this.isPopUpOpen = true;
  }

  goBack() {
    this.router.navigate(['profile', 'settings']);
  }

  closePopup() {
    this.isPopUpOpen = false;
  }
}
