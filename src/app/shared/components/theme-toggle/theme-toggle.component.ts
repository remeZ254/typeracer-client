import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { changeTheme } from '@app/core/theme/actions/theme.actions';
import { Themes } from '@app/shared/models/themes/themes.enum';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemeToggleComponent implements OnInit {
  readonly icon$: BehaviorSubject<IconDefinition>;
  private theme: Themes;

  constructor(private store: Store) {
    this.icon$ = new BehaviorSubject<IconDefinition>(this.getIconFromTheme(Themes.BRIGHT));
  }

  ngOnInit() {
    this.theme = this.getTheme();
    this.setTheme();
  }

  toggleTheme() {
    const themes = Object.values(Themes);
    this.theme = themes[(themes.indexOf(this.theme) + 1) % themes.length];
    this.setTheme();
  }

  private getTheme(): Themes {
    const theme = window.localStorage.getItem('theme');
    return this.isInstanceOfTheme(theme) ? theme : Themes.BRIGHT;
  }

  private setTheme() {
    window.document.body.removeAttribute('class');
    if (this.theme === Themes.DARK) {
      window.document.body.classList.add('dark');
    }

    window.localStorage.setItem('theme', this.theme);
    this.icon$.next(this.getIconFromTheme(this.theme));
    this.store.dispatch(changeTheme({ theme: this.theme }));
  }

  private getIconFromTheme(theme: Themes): IconDefinition {
    const themeIconResolver: Record<Themes, IconDefinition> = {
      [Themes.BRIGHT]: faSun,
      [Themes.DARK]: faMoon,
    };

    return themeIconResolver[theme];
  }

  private isInstanceOfTheme(theme: string): theme is Themes {
    return Object.values(Themes).includes(theme as Themes);
  }
}
