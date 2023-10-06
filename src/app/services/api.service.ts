import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl?: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.baseURL;
  }

  signUpFormModel = this.formBuilder.group({
    firstName: ['One', Validators.required],
    lastName: ['Two', Validators.required],
    email: ['one@gmail.com', [Validators.required, Validators.email]],
    password: ['One1Two2@', Validators.required],
    deviceToken: ['deviceToken', Validators.required],
  });

  createUser(formData: FormData) {
    const url = `${this.baseUrl}/user/create`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, formData, { headers });
  }

  createUserAccount() {
    const signUpdata = new FormData();
    signUpdata.append(
      'firstName',
      this.signUpFormModel.get('firstName')?.value || ''
    );
    signUpdata.append(
      'lastName',
      this.signUpFormModel.get('lastName')?.value || ''
    );
    signUpdata.append('email', this.signUpFormModel.get('email')?.value || '');
    signUpdata.append(
      'password',
      this.signUpFormModel.get('password')?.value || ''
    );
    signUpdata.append(
      'deviceToken',
      this.signUpFormModel.get('deviceToken')?.value || ''
    );

    return this.createUser(signUpdata);
  }

  loginFormModel = this.formBuilder.group({
    email: ['one@gmail.com', [Validators.required]],
    password: ['One1Two2@', [Validators.required]],
    deviceToken: ['deviceToken', Validators.required],
  });

  loginUser(loginUser: any) {
    const url = `${this.baseUrl}/auth/login`;
    return this.httpClient.post(url, loginUser);
  }

  loginUserAccount() {
    const loginData = {
      email: this.loginFormModel.get('email')?.value ?? '',
      password: this.loginFormModel.get('password')?.value || '',
      deviceToken: this.loginFormModel.get('deviceToken')?.value || '',
    };
    return this.loginUser(loginData);
  }
}
