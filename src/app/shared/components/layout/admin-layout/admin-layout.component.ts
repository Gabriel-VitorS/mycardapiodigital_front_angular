import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [RouterOutlet, AdminHeaderComponent, AdminSidebarComponent]
})
export class AdminLayoutComponent{

}
