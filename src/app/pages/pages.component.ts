import { Component, ViewEncapsulation } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout class="p-0">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
