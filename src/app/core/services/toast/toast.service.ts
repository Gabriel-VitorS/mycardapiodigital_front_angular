import { Injectable} from '@angular/core';
import { IToast, IToastOptions } from '../../interfaces/Toast.interface';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: IToast[] = []

  show(text: string, options: IToastOptions = {}){
    this.toasts.push({text, options: options})
  }

  remove(toast: IToast) {
    this.toasts = this.toasts.filter(t => t !== toast)
	}

  clear(){
    this.toasts.splice(0, this.toasts.length)
  }

}
