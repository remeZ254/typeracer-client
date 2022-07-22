import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Themes } from '@app/shared/models/themes/themes.enum';
import { random } from 'lodash';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  @Input() theme: Themes;
  readonly Themes = Themes;

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
