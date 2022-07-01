import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [AppRoutingModule, BrowserModule, FormsModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
