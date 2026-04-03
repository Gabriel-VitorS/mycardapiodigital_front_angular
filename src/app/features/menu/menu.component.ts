import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MenuService } from '../../core/services/menu/menu.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  host: {'class' : 'page-menu'},
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CurrencyPipe, RouterOutlet, RouterLinkWithHref],
})
export default class MenuComponent implements OnInit {

  router = inject(ActivatedRoute)
  menuService = inject(MenuService)

  menuName = signal(this.router.snapshot.params['name'])

  menuConfig = computed(()=> this.menuService.getMenu()?.configuration)
  menuBackgroundColor = computed(() => this.menuService.getMenu()?.configuration.background_color)
  menuCategories = computed(()=> this.menuService.getMenu()?.categories)

  selectedCategory = signal<number | null>(null)
  
  isDarkTheme = computed(()=>{
    return this.menuConfig()?.background_color === '#252525'
  })

  showList = signal(true)

  filtredCategories = computed(()=> {
    // this.showList.set(true)
    const list = this.menuCategories()

    const id = this.selectedCategory()
    // this.showList.set(true)

    if(!id) return list
    
    return list?.filter(c => c.id == id)
  }
)
  
  ngOnInit() {
    this.menuService.httpGetMenu(this.menuName()).subscribe()
    this.menuConfig()?.theme_color
  }

  selectCategory(idCategory: number){
    this.showList.set(false)

    if(idCategory == 0)
      this.selectedCategory.set(null)
    else
      this.selectedCategory.set(idCategory)

    setTimeout(()=>this.showList.set(true), 0)
    
  }

  scrollToCategory(idCategory: number){
    const element = document.getElementById(`${idCategory}`)
    
    if(element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start'})
  }
  

}
