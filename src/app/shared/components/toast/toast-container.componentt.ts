import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast/toast.service';

//components
import { NgbToast } from '@ng-bootstrap/ng-bootstrap/toast';

@Component({
    selector: 'app-toasts',
    imports: [NgbToast],
    template: `
        @for (toast of toastService.toasts(); track toast){
            <ngb-toast
            [class]="toast.options.type"
            [autohide]="true"
            [delay]="toast.options.delay || 5000"
            (hidden)="toastService.remove(toast)">

                {{toast.text}}

            </ngb-toast>
        }
    `,
    host: {class: 'toast-container position-fixed top-0 end-0 p-3 text-light', style: 'z-index: 1200'}
})
export class ToastsContainer{
    readonly toastService = inject(ToastService)

}