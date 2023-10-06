import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  constructor(private router: Router) {}
  dataAnalytics: boolean = false;
  newsletters: boolean = false;

  goBack() {
    this.router.navigate(['profile', 'settings']);
  }
}
