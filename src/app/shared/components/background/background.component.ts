import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getTheme } from '@app/core/theme/reducers/theme.reducer';
import { Themes } from '@app/shared/models/themes/themes.enum';
import { select, Store } from '@ngrx/store';
import { random } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  readonly theme$: Observable<Themes>;
  readonly Themes = Themes;

  constructor(private store: Store) {
    this.theme$ = this.store.pipe(select(getTheme));
  }

  clouds(length: number) {
    return Array.from({ length }, () => ({
      transform: `scale(${random(0.3, 0.6)})`,
      animationDuration: `${random(15, 35)}s`,
    }));
  }

  stars(length: number) {
    return Array.from({ length }, () => {
      const size = `${Math.random() * 5}px`;
      return {
        width: size,
        height: size,
        left: `${Math.floor(Math.random() * 4000)}px`,
        top: `${Math.floor(Math.random() * 1000)}px`,
        animationDuration: `${random(15, 300)}s`,
      };
    });
  }
}
