import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from '@app/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly items: string[];

  constructor(private configService: ConfigService) {
    this.items = this.configService.get('footer');
  }
}
