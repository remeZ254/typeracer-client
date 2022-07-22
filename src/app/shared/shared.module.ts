import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
  ;
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FocusDirective } from './directives/focus.directive';
import { BackgroundComponent } from './components/background/background.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    BackgroundComponent,
    FocusDirective,
    FooterComponent,
    ThemeToggleComponent
  ],
  exports: [
    BackgroundComponent,
    FocusDirective,
    FooterComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
