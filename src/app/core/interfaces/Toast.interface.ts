import { EToastOptions } from "../enums/ToastOptions.enum";

export interface IToast{
    text: string
    options: IToastOptions
}

export interface IToastOptions{
    type?: EToastOptions
    delay?: number
}