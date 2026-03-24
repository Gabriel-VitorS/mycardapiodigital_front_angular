import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { CategoryService } from '../../../../core/services/category/category.service';
import { OptionsSelect } from '../../../../core/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminCardComponent } from "../../../../shared/components/layout/admin-card/admin-card.component";
import { LoaderComponent } from "../../../../shared/components/ui/loader/loader.component";
import { DefaultInputComponent } from "../../../../shared/components/inputs/default-input/default-input.component";
import { SpinnerSmComponent } from "../../../../shared/components/ui/spinner-sm/spinner-sm.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MoneyInputComponent } from "../../../../shared/components/inputs/money-input/money-input.component";
import { SelectInputComponent } from "../../../../shared/components/inputs/select-input/select-input.component";
import { CheckboxInputComponent } from "../../../../shared/components/inputs/checkbox-input/checkbox-input.component";
import { TextareaInputComponent } from "../../../../shared/components/inputs/textarea-input/textarea-input.component";
import { ImgProductInputComponent } from "../../../../shared/components/inputs/img-product-input/img-product-input.component";
import { ToastService } from '../../../../core/services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EToastOptions } from '../../../../core/enums';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [AdminCardComponent, LoaderComponent, DefaultInputComponent, SpinnerSmComponent, ReactiveFormsModule, RouterLink, MoneyInputComponent, SelectInputComponent, CheckboxInputComponent, TextareaInputComponent, ImgProductInputComponent]
})
export default class ProductComponent implements OnInit {

  route = inject(ActivatedRoute)
  productService = inject(ProductService)
  categoryService = inject(CategoryService)
  private fb = inject(FormBuilder)
  toastService = inject(ToastService)
  router = inject(Router)

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    value: ['0', [Validators.required]],
    category: [0, [Validators.required]],
    highlight: [false],
    visible_online: [true],
    details: ['']
  })

  imageRead = signal<File | null>(null)
  productId = signal(Number(this.route.snapshot.params['id']))
  isLoading = signal(true)
  isSending = signal(false)
  titleCard = signal("Incluir Produto")

  optionsSelect: OptionsSelect[] = []

  onImageCropped(file: File){
    this.imageRead.set(file)
  }

  ngOnInit() {
    this.categoryService.httpListCategory({page: 1, limit: 999})
    .pipe(
      finalize(()=>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      next: (res) =>{
        this.optionsSelect = res.data.map(category => ({ value: `${category.id}`, label: category.name }) )

      }
    })

    if(this.productId() != 0){
      this.titleCard.set("Editar Produto")
      this.isLoading.set(true)

      this.productService.httpGetProduct(this.productId())
      .pipe(
        finalize(()=>{
          this.isLoading.set(false)
        })
      )
      .subscribe({
        next: (res) =>{
          
          this.productForm.patchValue({
            name: res.name,
            value: `${res.value}`,
            category: res.category_id,
            highlight: res.highlight == 1 ? true : false,
            visible_online: res.visible_online == 1 ? true : false,
            details: res.details
          })
        }
      })
    }
    

  }

  deleteProduct(){
    this.isSending.set(true)
    this.productService.httpDeleteProduct(this.productId())
    .pipe(
      finalize(()=>{
        this.isSending.set(false)
      })
    )
    .subscribe({
      next:(next)=>{
        this.sendImageProduct(next)
        this.toastService.show("Produto apagado com sucesso", {type:EToastOptions.SUCCESS})
        this.router.navigate(['/gestor/produtos'])
      },
      error: (err: HttpErrorResponse) =>{
        console.log(err)
        this.toastService.show(err.error, {type:EToastOptions.DANGER})
      },
    })
  }

  submit(){
    if(!this.productForm.valid)
      return
    
    this.isSending.set(true)

    if(this.productId() == 0){

      this.productService.httpPostProduct({
        name: this.productForm.value.name ?? '',
        category_id: this.productForm.value.category ?? 0,
        details: this.productForm.value.details ?? '',
        highlight: this.productForm.value.highlight ?? false,
        visible_online: this.productForm.value.visible_online ?? false,
        value: `${this.productForm.value.value}`
      })
      .pipe(
        finalize(()=>{
          this.isSending.set(false)
        })
      )
      .subscribe({
        next:(next)=>{
          this.sendImageProduct(next)
          this.toastService.show("Produto incluído com sucesso", {type:EToastOptions.SUCCESS})
          this.router.navigate(['/gestor/produtos'])
        },
        error: (err: HttpErrorResponse) =>{
          console.log(err)
          this.toastService.show(err.error, {type:EToastOptions.DANGER})
        },
      })
    }else{

      this.productService.httpPutProduct(
        this.productId(),
        {
        name: this.productForm.value.name ?? '',
        category_id: this.productForm.value.category ?? 0,
        details: this.productForm.value.details ?? '',
        highlight: this.productForm.value.highlight ?? false,
        visible_online: this.productForm.value.visible_online ?? false,
        value: `${this.productForm.value.value}`
      })
      .pipe(
        finalize(()=>{
          this.isSending.set(false)
        })
      )
      .subscribe({
          next:(next)=>{
            this.sendImageProduct(this.productId())
            this.toastService.show("Produto atualizado com sucesso", {type:EToastOptions.SUCCESS})
            this.router.navigate(['/gestor/produtos'])
        },
        error: (err: HttpErrorResponse) =>{
          console.log(err)
          this.toastService.show(err.error, {type:EToastOptions.DANGER})
        },
      })
      
    }
    
    
  }

  

  private sendImageProduct(id: number){
    const FILE = this.imageRead()

    if(!FILE)
      return

    this.isSending.set(true)

    const FORM_DATA = new FormData()
    
    FORM_DATA.append('image', FILE)
    FORM_DATA.append('id', id.toString())

    this.productService.httpPostImageProduct(FORM_DATA)
    .subscribe({
      next: (next)=>{
        this.toastService.show("Imagem incluída com sucesso", {type:EToastOptions.SUCCESS})
      },
      error: (err: HttpErrorResponse)=>{
        this.toastService.show(err.error, {type:EToastOptions.DANGER})
      }
    })
    

  }

}
