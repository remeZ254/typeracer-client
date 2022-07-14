import { NgModule } from '@angular/core';
import { FocusDirective } from '@app/shared/directives/focus.directive';

@NgModule({
  declarations: [FocusDirective],
  exports: [FocusDirective],
})
export class SharedModule {}
