import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  storefrontOutline,
  storefront,
  receiptOutline,
  receipt,
  personOutline,
  person,
  cartOutline,
  cart,
} from 'ionicons/icons';

// Services
import { CartService } from '../core/services/cart.service';
import { NotificacionesService } from '../core/services/notificaciones.service';

@Component({
  selector: 'app-cliente-tabs',
  templateUrl: './cliente-tabs.page.html',
  styleUrls: ['./cliente-tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
    IonFab,
    IonFabButton,
  ],
})
export class ClienteTabsPage implements OnInit {
  // Injección de dependencias con inject() - Angular 20
  private readonly cartService = inject(CartService);
  private readonly notificacionesService = inject(NotificacionesService);

  // Signals para estado reactivo
  readonly carritoItemsCount = this.cartService.itemsCount;
  readonly notificacionesCount = this.notificacionesService.unreadCount;

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Inicializar servicios si es necesario
    this.cartService.initialize();
    this.notificacionesService.initialize();
  }

  private addIcons() {
    addIcons({
      'home-outline': homeOutline,
      home: home,
      'storefront-outline': storefrontOutline,
      storefront: storefront,
      'receipt-outline': receiptOutline,
      receipt: receipt,
      'person-outline': personOutline,
      person: person,
      'cart-outline': cartOutline,
      cart: cart,
    });
  }
}
