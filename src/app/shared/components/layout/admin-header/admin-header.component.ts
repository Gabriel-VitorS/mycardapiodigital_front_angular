import { Component, inject, OnInit } from '@angular/core';
import {NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem} from '@ng-bootstrap/ng-bootstrap'
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../../core/enums';

//services
import { SidebarService } from '../../../../core/services/sidebar/sidebar.service';
import { CompanyService } from '../../../../core/services/company/company.service';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem]
})
export class AdminHeaderComponent implements OnInit {

  companyService = inject(CompanyService)
  themeService = inject(ThemeService)
  sidebarSerive = inject(SidebarService)
  toastService = inject(ToastService)
  authService = inject(AuthService)
  router = inject(Router)

  ngOnInit() {
    this.companyService.httpGetCompany().subscribe({
      error: (error: HttpErrorResponse) =>{
        console.log(error)
        this.toastService.show('Error aos buscar dados do usuário', {type: EToastOptions.DANGER})
      }
    })
  }

  loggout(){
    this.authService.logout()
    this.router.navigate(['/gestor/login'])
  }

}
