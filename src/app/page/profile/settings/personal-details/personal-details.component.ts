import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent {
  @ViewChild('fileInput') fileInput: any;

  profileUpdateModel: boolean = false;
  imageUrl: any = '../../../../../assets/icons/PersonalDetails.svg';
  constructor(private router: Router, public formbuilder: FormBuilder) {
    this.profileUpdateForm();
  }
  profileUpdate!: FormGroup;

  profileUpdateForm() {
    this.profileUpdate = this.formbuilder.group({
      file: [null],
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  openUploadProfile() {
    this.fileInput.nativeElement.click();
  }
  goBack() {
    this.router.navigate(['profile', 'settings']);
  }
  updateDetail() {
    if (this.profileUpdate.valid) {
      const formData = this.profileUpdate.value;
      console.log('Form data:', formData);
      this.profileUpdateModel = true;
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  uploadFile(e: any) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
        this.profileUpdate.patchValue({
          file: reader.result,
        });
      };
    }
  }
  closePopup() {
    this.profileUpdateModel = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
