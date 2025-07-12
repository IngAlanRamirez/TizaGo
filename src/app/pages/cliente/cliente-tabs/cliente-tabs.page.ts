import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
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
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  heart,
  heartOutline,
} from 'ionicons/icons';

// Services
import { CartService } from '../core/services/cart.service';
import { NotificacionesService } from '../core/services/notificaciones.service';
import { OrdersService } from '../core/services/orders.service';

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
export class ClienteTabsPage implements OnInit, OnDestroy {
  // Injección de dependencias con inject() - Angular 20
  private readonly cartService = inject(CartService);
  private readonly notificacionesService = inject(NotificacionesService);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  // Subject para manejar la limpieza de suscripciones
  private readonly destroy$ = new Subject<void>();

  // Signal para detectar si estamos en la ruta del carrito
  private readonly _isInCartRoute = signal<boolean>(false);

  // Signals para estado reactivo
  readonly carritoItemsCount = this.cartService.itemsCount;
  readonly activeOrdersCount = this.ordersService.activeOrders;

  // Computed signal para mostrar/ocultar FAB
  readonly shouldShowFab = computed(() => {
    return this.carritoItemsCount() > 0 && !this._isInCartRoute();
  });

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Inicializar servicios si es necesario
    this.cartService.initialize();
    this.notificacionesService.initialize();
    // OrdersService se inicializa automáticamente desde localStorage

    // Detectar ruta inicial
    this.checkCartRoute(this.router.url);

    // Subscribirse a cambios de ruta
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event: NavigationEnd) => {
        this.checkCartRoute(event.url);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkCartRoute(url: string): void {
    this._isInCartRoute.set(url.includes('/cliente/cart'));
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
      heart: heart,
      'heart-outline': heartOutline,
    });
  }
}
