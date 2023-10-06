import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  constructor(private router: Router) {}
  promotions: boolean = false;
  dailyAlerts: boolean = false;
  pushAlerts: boolean = false;

  goBack() {
    this.router.navigate(['profile', 'settings']);
  }
}
