import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent {
  clouds() {
    return Array.from({ length: 5 }, (_, index: number) => index + 1);
  }
}
