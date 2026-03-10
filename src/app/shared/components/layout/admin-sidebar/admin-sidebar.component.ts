import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

//services
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { SidebarService } from '../../../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  imports: [RouterLink, RouterLinkActive]
})
export class AdminSidebarComponent{

  themService = inject(ThemeService)
  sidebarService = inject(SidebarService)
  
  menuGroup = [
    {name: 'Início', path: '/gestor/inicio', icon: 'bi bi-house'},
    {name: 'Config Cardápio', path: '/gestor/configuracao-cardapio', icon: 'bi bi-gear'},
    {name: 'Categorias', path: '/gestor/categorias', icon: 'bi bi-tags'},
    {name: 'Produtos', path: '/gestor/produtos', icon: 'bi bi-box'}

  ]

}
