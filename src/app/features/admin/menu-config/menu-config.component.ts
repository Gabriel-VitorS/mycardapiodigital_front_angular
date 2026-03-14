import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//interfaces
import { OptionsSelect } from '../../../core/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

//enum
import { EToastOptions } from '../../../core/enums';

//services
import { MenuConfigService } from '../../../core/services/menu-config/menu-config.service';
import { ToastService } from '../../../core/services/toast/toast.service';

//component
import { BreadcrumbComponent } from "../../../shared/components/ui/breadcrumb/breadcrumb.component";
import { AdminCardComponent } from "../../../shared/components/layout/admin-card/admin-card.component";
import { LoaderComponent } from "../../../shared/components/ui/loader/loader.component";
import { DefaultInputComponent } from "../../../shared/components/inputs/default-input/default-input.component";
import { UrlInputComponent } from "../../../shared/components/inputs/url-input/url-input.component";
import { SelectInputComponent } from "../../../shared/components/inputs/select-input/select-input.component";
import { ImgLogoInputComponent } from "../../../shared/components/inputs/img-logo-input/img-logo-input.component";
import { SpinnerSmComponent } from "../../../shared/components/ui/spinner-sm/spinner-sm.component";

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.scss'],
  imports: [BreadcrumbComponent, AdminCardComponent, LoaderComponent, ReactiveFormsModule, DefaultInputComponent, UrlInputComponent, SelectInputComponent, ImgLogoInputComponent, SpinnerSmComponent]
})
export default class MenuConfigComponent implements OnInit {

  private fb = inject(FormBuilder)
  menuConfigService = inject(MenuConfigService)
  imageRead = signal<File | null>(null)
  toastService = inject(ToastService)


  isLoading = signal(true)
  isSending = signal(false)

  selectOptions: OptionsSelect[] = [
    {label: 'Claro', value: '#F8F9FA'},
    {label: 'Escuro', value: '#252525'}
  ]

  menuConfigForm = this.fb.group({
    name_company: ['', [Validators.required]],
    url: ['', [Validators.required, Validators.pattern('[A-Za-z0-9-]+')]],
    theme_color: ['', [Validators.required]],
    background_color: ['', Validators.required],
  })

  ngOnInit() {
    this.getMenuConfig()
  }

  getMenuConfig(){
    this.isLoading.set(true)
    this.menuConfigService.httpGetMenuConfig().pipe(
      finalize(()=>{ 
        this.isLoading.set(false)
        this.isSending.set(false)
      })
    ).subscribe({
      next: (res) =>{
        this.menuConfigForm.patchValue(res)
      }
    })

  }

  onImageCropped(file: File){
    this.imageRead.set(file)
  }

  submit(){

    if(this.menuConfigService.getMenuIsConfigured()){

      this.menuConfigService.httpPutMenuConfig(
        this.menuConfigService.getMenuConfig()?.id ?? 0,
        {
          name_company: this.menuConfigForm.value.name_company ?? '',
          url: this.menuConfigForm.value.url ?? '',
          background_color: this.menuConfigForm.value.background_color ?? '',
          theme_color: this.menuConfigForm.value.theme_color ?? ''
        }
      ).pipe(
        finalize(()=>{
          this.isSending.set(false)
          this.toastService.show('Configuração atualizada com sucesso', {type: EToastOptions.SUCCESS})
        })
      ).subscribe({
        next: ()=>{
          this.getMenuConfig()
        },
        error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show(err.error ?? 'Error', {type:EToastOptions.DANGER})
      }
      })

    }else{

      this.menuConfigService.httpPostMenuConfig(
        {
          name_company: this.menuConfigForm.value.name_company ?? '',
          url: this.menuConfigForm.value.url ?? '',
          background_color: this.menuConfigForm.value.background_color ?? '',
          theme_color: this.menuConfigForm.value.theme_color ?? ''
        }
      ).pipe(
        finalize(()=>{
          this.toastService.show('Configuração atualizada com sucesso', {type: EToastOptions.SUCCESS})
        })
      ).subscribe({
        next: ()=>{
          this.getMenuConfig()
        },
        error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show(err.error ?? 'Error', {type:EToastOptions.DANGER})
      }
      })

    }
    
    const FILE = this.imageRead()

    if(!FILE) return
    this.isSending.set(true)

    const FORM_DATA = new FormData()
    
    FORM_DATA.append('logo_image', FILE)
    
    this.menuConfigService.httpPostImageLogo(FORM_DATA).pipe(
      finalize(()=>{
        this.isSending.set(false)
        this.toastService.show('Logo atualizada com sucesso', {type: EToastOptions.SUCCESS})
      })
    ).subscribe({
      error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show(err.error ?? 'Error', {type:EToastOptions.DANGER})
      }
    })
  }

}
