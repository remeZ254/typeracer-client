import { Component } from '@angular/core';
import { ConfigService } from '@app/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly showFooter: boolean;

  constructor(private configService: ConfigService) {
    this.showFooter = this.configService.get('footer', 'show');
  }
}
