import { Themes } from '@app/shared/models/themes/themes.enum';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { changeTheme } from '../actions/theme.actions';

export const THEME_STATE_TOKEN = 'theme';

export interface ThemeState {
  theme: Themes;
}

export const themeInitialState: ThemeState = {
  theme: Themes.BRIGHT,
};

export const themeReducer = createReducer(
  themeInitialState,
  on(
    changeTheme,
    (state: ThemeState, { theme }: { theme: Themes }): ThemeState => ({
      ...state,
      theme,
    })
  )
);

const getThemeState = createFeatureSelector<ThemeState>(THEME_STATE_TOKEN);

export const getTheme = createSelector(getThemeState, (themeState: ThemeState) => themeState.theme);
