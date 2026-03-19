import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../../core/enums';

//services
import { CategoryService } from '../../../../core/services/category/category.service';
import { ToastService } from '../../../../core/services/toast/toast.service';

//components
import { SpinnerSmComponent } from "../../../../shared/components/ui/spinner-sm/spinner-sm.component";
import { AdminCardComponent } from "../../../../shared/components/layout/admin-card/admin-card.component";
import { DefaultInputComponent } from "../../../../shared/components/inputs/default-input/default-input.component";
import { LoaderComponent } from "../../../../shared/components/ui/loader/loader.component";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [AdminCardComponent, DefaultInputComponent, ReactiveFormsModule, RouterLink, SpinnerSmComponent, LoaderComponent]
})
export default class CategoryComponent implements OnInit {

  route = inject(ActivatedRoute)
  router = inject(Router)
  private fb = inject(FormBuilder)
  categoryService = inject(CategoryService)
  toastService = inject(ToastService)

  titleCard = signal("Incluir Categoria")
  categoryId = signal(Number(this.route.snapshot.params['id']) )
  isSending  = signal(false)
  isLoading = signal(false)

  categoryForm = this.fb.group({
    name: ['', [Validators.required]],
    order: new FormControl<number| null>(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    
  })

  ngOnInit() {
    
    if(this.categoryId() != 0){
      this.titleCard.set("Editar Categoria")
      this.isLoading.set(true)
      this.categoryService.httpGetCategory(this.categoryId()).pipe(
        finalize(()=>{
          this.isLoading.set(false)
        })
      ).subscribe({
          next: (res) =>{
            this.categoryForm.patchValue(res)
          },
          error: (err: HttpErrorResponse) =>{
          this.toastService.show(err.error, {type:EToastOptions.DANGER})
        },
      })
      
    }

  
  }

  submit(){
    if(!this.categoryForm.valid)
      return

    this.isSending.set(true)

    if(this.categoryId() == 0){

      this.categoryService.httpPostCategory({
        name: this.categoryForm.value.name ?? '',
        order: this.categoryForm.value.order ?? null
      }).pipe(
        finalize(()=>{
          this.isSending.set(false)
          
        })
      ).subscribe({
        next:(next)=>{
          this.toastService.show("Categoria incluída com sucesso", {type:EToastOptions.SUCCESS})
          this.router.navigate(['/gestor/categorias'])
        },
        error: (err: HttpErrorResponse) =>{
          this.toastService.show(err.error, {type:EToastOptions.DANGER})
        },
        complete: () =>{
        }
      })

    }else{

      this.categoryService.httpPutCategory(
        this.categoryId(),
        {
          name: this.categoryForm.value.name ?? '',
          order: this.categoryForm.value.order ?? null
        }
      ).pipe(
        finalize(()=>{
          this.isSending.set(false)
          
        })
      ).subscribe({
        next:(next)=>{
          this.toastService.show("Categoria atualizada com sucesso", {type:EToastOptions.SUCCESS})
          this.router.navigate(['/gestor/categorias'])
        },
        error: (err: HttpErrorResponse) =>{
          this.toastService.show(err.error, {type:EToastOptions.DANGER})
        },
        complete: () =>{
        }
      })
    }

    
  }

  deleteCategory(){
    this.isSending.set(true)
    this.categoryService.httpDeleteCategory(
      this.categoryId()
    )
    .pipe(
      finalize(()=>{
        this.isSending.set(false)
        
      })
    ).subscribe({
      next:(next)=>{
        this.toastService.show("Categoria apagada com sucesso", {type:EToastOptions.SUCCESS})
        this.router.navigate(['/gestor/categorias'])
      },
      error: (err: HttpErrorResponse) =>{
        this.toastService.show(err.error, {type:EToastOptions.DANGER})
      },
      complete: () =>{
      }
  })
    
  }

}
