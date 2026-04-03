import { AfterViewInit, Component, computed, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe, Location } from '@angular/common';
import { MenuService } from '../../../../core/services/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  imports: [CurrencyPipe]
})
export default class ModalProductComponent implements OnInit, AfterViewInit, OnDestroy {

  private modalService = inject(NgbModal)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalRef?: NgbModalRef
  
  @ViewChild('myModal') modalTemplate!: TemplateRef<any>
  
  menuService = inject(MenuService)
  productId = signal(Number(this.route.snapshot.params['id'])) 

  isDarkTheme = computed(()=>{
    return this.menuService.getMenu()?.configuration.background_color === '#252525'
  })

  ngOnInit() {
    // this.openModal()
    this.menuService.httpGetProduct(this.productId()).subscribe()
  }

  ngAfterViewInit(): void {
    this.openModal()
    
  }

  ngOnDestroy(): void {   
    if(this.modalRef)
      this.modalRef.close()
  }

  openModal(){
    this.modalRef = this.modalService.open(this.modalTemplate,{
      fullscreen: 'sm',
      backdrop: 'static',
      scrollable: true,

    })

    this.modalRef.result.then(
      (result) =>{
        this.router.navigate(['../../'], {relativeTo: this.route})
      }
    )
  }

  

}
