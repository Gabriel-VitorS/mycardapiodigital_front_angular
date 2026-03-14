import { Component, inject, Input, OnInit, output, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-img-logo-input',
  templateUrl: './img-logo-input.component.html',
  styleUrls: ['./img-logo-input.component.scss'],
  imports: [ImageCropperComponent]
})
export class ImgLogoInputComponent implements OnInit {

  private modalService = inject(NgbModal)

  @ViewChild('myModal') modalTemplate!: TemplateRef<any> 
  cropper = viewChild.required<ImageCropperComponent>('cropper');

  @Input({required: true}) inputUrlImage!: null | string
  imageReady = output<File>()
  
  imageChangedEvent: Event | null = null;
  croppedImage: any = null;


  ngOnInit() {
  }
  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    
    this.modalService.open(this.modalTemplate)
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl
    if(event.blob){
      const file = new File([event.blob], 'upload.png', {type: 'image/png'})
      this.imageReady.emit(file)
    }
  }

  cropImage(){
    this.cropper().crop()
    this.modalService.dismissAll()
  }

}
