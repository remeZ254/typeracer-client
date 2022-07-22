import { Component } from '@angular/core';
import { Themes } from './shared/models/themes/themes.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme: Themes;

  onThemeChange(theme: Themes) {
    this.theme = theme;
  }
}
