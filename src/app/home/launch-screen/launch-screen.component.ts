import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/animations/animations';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-launch-screen',
  templateUrl: './launch-screen.component.html',
  styleUrls: ['./launch-screen.component.scss'],
  animations: [fadeIn],
})
export class LaunchScreenComponent {
  firstScreen: boolean = true;
  secondScreen: boolean = false;
  thirdScreen: boolean = false;
  fourthScreen: boolean = false;
  fifthScreen: boolean = false;
  constructor(private router: Router, private onboardingService: OnboardingService) {
    // setTimeout(() => {
    //   this.firstScreen = false;
    //   this.secondScreen = true;
    // }, 3000);
  }

  skipScreen() {
    this.secondScreen = false;
    this.fifthScreen = true;
  }

  goToBackScreen() {
    if (this.fifthScreen) {
      this.fifthScreen = false;
      this.fourthScreen = true;
    } else if (this.fourthScreen) {
      this.fourthScreen = false;
      this.thirdScreen = true;
    } else if (this.thirdScreen) {
      this.thirdScreen = false;
      this.secondScreen = true;
    } else if (this.secondScreen) {
      this.secondScreen = false;
      this.firstScreen = true;
    }
  }
  goToNextScreen() {
    if (this.firstScreen) {
      this.firstScreen = false;
      this.secondScreen = true;
    } else if (this.secondScreen) {
      this.secondScreen = false;
      this.thirdScreen = true;
    } else if (this.thirdScreen) {
      this.thirdScreen = false;
      this.fourthScreen = true;
    } else if (this.fourthScreen) {
      this.fourthScreen = false;
      this.fifthScreen = true;
    }
  }
  signIn() {
    this.router.navigate(['sign-in']);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }
  ngOnInit(): void {
    if (this.onboardingService.onboardingCompleted) {
      // this.firstScreen = false;
      setTimeout(() => {
        this.firstScreen = false;
        this.fifthScreen = true;
        // this.router.navigate(['sign-in']);
      }, 3000);
    } else {
      this.firstScreen = true;
      setTimeout(() => {
        this.firstScreen = false;
        this.secondScreen = true;
        this.onboardingService.setOnboardingCompleted(true);
      }, 3000);
    }
  }
}
