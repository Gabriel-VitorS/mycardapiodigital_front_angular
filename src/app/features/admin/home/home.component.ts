import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MenuConfigService } from '../../../core/services/menu-config/menu-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink]
})
export default class HomeComponent implements OnInit {

  menuConfigService = inject(MenuConfigService)
  constructor() { }

  ngOnInit() {
    this.menuConfigService.httpGetMenuConfig().subscribe()
  }

}
