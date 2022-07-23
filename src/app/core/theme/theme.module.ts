import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { THEME_STATE_TOKEN, themeReducer } from './reducers/theme.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(THEME_STATE_TOKEN, themeReducer),
  ],
})
export class ThemeModule {}
