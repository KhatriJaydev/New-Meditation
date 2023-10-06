import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AddIconComponent } from './home/add-icon/add-icon.component';
import { OnboardingService } from './services/onboarding.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AddIconComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [OnboardingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
