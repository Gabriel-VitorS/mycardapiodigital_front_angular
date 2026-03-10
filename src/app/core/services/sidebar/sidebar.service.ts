import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidebarOpen = signal(false)

  toggleSidebar(){
    this.sidebarOpen.update(state => !state)
  }

  closeSidebar(){
    this.sidebarOpen.set(false)
  }

  openSidebar(){
    this.sidebarOpen.set(true)
  }

}
