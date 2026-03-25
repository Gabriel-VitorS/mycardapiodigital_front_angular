import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

//emums
import { EToastOptions } from '../../../../core/enums';

//interfaces
import { CategoryParams, OptionsSelect } from '../../../../core/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

//services
import { CategoryService } from '../../../../core/services/category/category.service';
import { ToastService } from '../../../../core/services/toast/toast.service';

//components
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SelectInputComponent } from "../../../../shared/components/inputs/select-input/select-input.component";
import { BreadcrumbComponent } from "../../../../shared/components/ui/breadcrumb/breadcrumb.component";
import { AdminCardComponent } from "../../../../shared/components/layout/admin-card/admin-card.component";
import { DefaultInputComponent } from "../../../../shared/components/inputs/default-input/default-input.component";
import { LoaderComponent } from '../../../../shared/components/ui/loader/loader.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  imports: [BreadcrumbComponent, AdminCardComponent, LoaderComponent, NgbPagination, SelectInputComponent, ReactiveFormsModule, DefaultInputComponent, RouterLink]
})
export default class ListCategoriesComponent implements OnInit {

  categoryService = inject(CategoryService)
  private fb = inject(FormBuilder)
  toastService = inject(ToastService)

  categoryFilterForm = this.fb.nonNullable.group({
    selected_filter: '',
    value_filter: ''
  })

  isLoading = signal(true)
  hasFilter = signal(false)
  
  params: CategoryParams = {
    page: 1,
  }
  
  optionsSelect: OptionsSelect[] = [
    {label: 'Nome', value: 'name'},
  ]

  ngOnInit() {
    this.getAllCategory()
  }
  

  getAllCategory(){
    this.isLoading.set(true)

    this.categoryService.httpListCategory(
      this.params
    ).pipe(
      finalize(()=>{
        this.isLoading.set(false)
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.toastService.show(err.error, {type:EToastOptions.DANGER})
      }
    })
  }

  onPageChange(page: number){
    this.params.page = page
    this.getAllCategory()
  }

  searchData(){
    if(this.categoryFilterForm.value.selected_filter == 'name'){
      this.params['name'] = this.categoryFilterForm.value.value_filter
    }

    this.hasFilter.set(true)
    this.getAllCategory()
    
  }

  resetFilter(){
    this.categoryFilterForm.patchValue({
      value_filter: ''
    })
    delete this.params['name']
    this.params.page = 1
    this.hasFilter.set(false)
    this.getAllCategory()
  }

}
