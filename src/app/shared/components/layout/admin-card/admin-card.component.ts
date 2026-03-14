import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent {

  @Input({
    required: true,
  }) inputPageTitle = ''
}
