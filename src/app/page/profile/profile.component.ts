import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/animations/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations:[fade]
})
export class ProfileComponent {
  achievementsList = ['Stress Decrease', 'Focus Master', 'Consistent Schedule'];

  isAchievementAvailable = true;

  constructor(private router: Router) {}

  goToSettings() {
    this.router.navigate(['profile', 'settings']);
  }

  showProgress(progress: string) {
    if (progress === 'totalMeditation') {
      this.router.navigate(['profile', 'total-meditation']);
    } else if (progress === 'longestSession') {
      this.router.navigate(['profile', 'longest-session']);
    }
  }

  showAchievements(achievementsName: string) {
    this.router.navigate(['profile', 'show-achievements', achievementsName]);
  }
  ngOnInit(): void {
    // this.isAchievementAvailable = false;
  }
}
