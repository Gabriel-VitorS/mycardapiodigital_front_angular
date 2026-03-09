import { Injectable, signal} from '@angular/core';
import { IToast, IToastOptions } from '../../interfaces/Toast.interface';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts = signal<IToast[]>([])

  show(text: string, options: IToastOptions = {}){
    this.toasts.update(current => [...current, {text, ...options, options}])
  }

  remove(toast: IToast) {
    this.toasts.update(current => current.filter(t => t !== toast))
	}

  clear(){
    this.toasts.update(current => current.slice(0, this.toasts.length))
  }

}
