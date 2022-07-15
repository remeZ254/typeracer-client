import { Component } from '@angular/core';
import { ConfigService } from '@app/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly creatorName: string;
  readonly creatorPhone: string;

  constructor(private configService: ConfigService) {
    this.creatorName = this.configService.get('creator', 'name');
    this.creatorPhone = this.configService.get('creator', 'phone');
  }
}
