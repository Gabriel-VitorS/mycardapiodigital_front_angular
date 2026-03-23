import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { OptionsSelect, ProductParams } from '../../../../core/interfaces';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../../core/enums';
import { BreadcrumbComponent } from "../../../../shared/components/ui/breadcrumb/breadcrumb.component";
import { AdminCardComponent } from "../../../../shared/components/layout/admin-card/admin-card.component";
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from "../../../../shared/components/inputs/select-input/select-input.component";
import { DefaultInputComponent } from "../../../../shared/components/inputs/default-input/default-input.component";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  imports: [BreadcrumbComponent, AdminCardComponent, RouterLink, CurrencyPipe, NgbPagination, SelectInputComponent, DefaultInputComponent, ReactiveFormsModule]
})
export default class ListProductsComponent implements OnInit {

  productService = inject(ProductService)
  toastService = inject(ToastService)
  fb = inject(FormBuilder)

  productFilterForm = this.fb.nonNullable.group({
    selected_filter: '',
    value_filter: ''
  })

  optionsSelect: OptionsSelect[] =[
    {label: 'Nome', value: 'name'},
    {label: 'Em destaque? (s/n)', value: 'highlight'},
    {label: 'Visível online? (s/n)', value: 'visible_online'},
    {label: 'Categoria', value: 'category'}
  ]

  page = signal(1)
  isLoading = signal(true)
  hasFilter = signal(false)

  params: ProductParams = {
    page: this.page(),
    
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this.isLoading.set(true)

    this.productService.httpListProducts(this.params)
    .pipe(
      finalize(()=>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      error: (err: HttpErrorResponse) =>{
        this.toastService.show(err.error, {type: EToastOptions.DANGER})
      }
    })
  }

  onPageChange(page: number){
    this.page.set(page)
    this.getAllProducts()
  }

  resetFilter(){
    delete this.params['category']
    delete this.params['highlight']
    delete this.params['visible_online']
    delete this.params['id']
    delete this.params['name']
    this.productFilterForm.patchValue({value_filter: ''})
    this.hasFilter.set(false)
    this.page.set(1)

    this.getAllProducts()
  }

  searchData(){
    if(this.productFilterForm.value.selected_filter == 'name'){
      this.params['name'] = this.productFilterForm.value.value_filter
    }

    if(this.productFilterForm.value.selected_filter == 'category'){
      this.params['category'] = this.productFilterForm.value.value_filter
    }

    if(this.productFilterForm.value.selected_filter == 'highlight'){
      if(this.productFilterForm.value.value_filter?.toLowerCase() == 's')
        this.params['highlight'] = 'true'
      else
        this.params['highlight'] = 'false'
    }

    if(this.productFilterForm.value.selected_filter == 'visible_online'){
      if(this.productFilterForm.value.value_filter?.toLowerCase() == 's')
        this.params['visible_online'] = 'true'
      else
        this.params['visible_online'] = 'false'
    }

    this.hasFilter.set(true)
    this.getAllProducts()
  }

}
