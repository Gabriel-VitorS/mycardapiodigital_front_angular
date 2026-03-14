import { Component, inject, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [RouterLink]
})
export class BreadcrumbComponent{

  themeService = inject(ThemeService)

  @Input({
    required: true,
  }) inputPageTitle = ''


}
