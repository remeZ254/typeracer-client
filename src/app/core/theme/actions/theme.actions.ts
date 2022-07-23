import { Themes } from '@app/shared/models/themes/themes.enum';
import { createAction, props } from '@ngrx/store';

enum ThemeActions {
  CHANGE_THEME = '[Room] Connect',
}

export const changeTheme = createAction(ThemeActions.CHANGE_THEME, props<{ theme: Themes }>());
