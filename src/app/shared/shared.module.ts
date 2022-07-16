import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
  ;
import { BackgroundComponent } from './components/background/background.component';
import { FooterComponent } from './components/footer/footer.component';
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    BackgroundComponent,
    FocusDirective,
    FooterComponent
  ],
  exports: [
    BackgroundComponent,
    FocusDirective,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}
