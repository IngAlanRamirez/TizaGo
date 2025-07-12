import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonProgressBar,
  IonText,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  timeOutline,
  restaurantOutline,
  carOutline,
  checkmarkDoneOutline,
  storefront,
  receiptOutline,
  locationOutline,
  callOutline,
  refreshOutline,
  homeOutline,
  alertCircleOutline,
  cardOutline,
} from 'ionicons/icons';

// Services
import { OrdersService, Order } from '../../core/services/orders.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonProgressBar,
    IonButtons,
    IonBackButton,
    IonSkeletonText,
  ],
})
export class ConfirmationPage implements OnInit, OnDestroy {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  // Signals para estado reactivo
  private readonly _order = signal<Order | null>(null);
  private readonly _isLoading = signal<boolean>(true);
  private readonly _error = signal<string | null>(null);

  // Getters públicos
  readonly order = this._order.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly orderStatusInfo = computed(() => {
    const order = this._order();
    return order ? this.ordersService.getOrderStatusInfo(order.status) : null;
  });

  readonly progressValue = computed(() => {
    const order = this._order();
    if (!order) return 0;

    const statusProgress: Record<Order['status'], number> = {
      pending: 0.2,
      confirmed: 0.4,
      preparing: 0.6,
      on_way: 0.8,
      delivered: 1.0,
      cancelled: 0,
    };

    return statusProgress[order.status] || 0;
  });

  readonly estimatedTimeRemaining = computed(() => {
    const order = this._order();
    if (!order) return null;

    const now = new Date();
    const estimatedDelivery = order.estimatedDelivery;
    const diffMs = estimatedDelivery.getTime() - now.getTime();
    const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

    if (diffMinutes <= 0) {
      return 'Llegando pronto';
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} min`;
  });

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    this.loadOrderFromRoute();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadOrderFromRoute() {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      // Simular delay de carga
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Obtener el pedido actual del servicio
      const currentOrder = this.ordersService.currentOrder();

      if (currentOrder) {
        this._order.set(currentOrder);
      } else {
        // Si no hay pedido actual, intentar obtener del historial
        const orders = this.ordersService.orders();
        if (orders.length > 0) {
          this._order.set(orders[0]); // Usar el más reciente
        } else {
          throw new Error('No se encontró el pedido');
        }
      }
    } catch (error) {
      console.error('Error loading order:', error);
      this._error.set('Error al cargar el pedido');
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Ir al historial de pedidos
   */
  goToOrders(): void {
    this.router.navigate(['/cliente/orders']);
  }

  /**
   * Ir al inicio
   */
  goToHome(): void {
    this.router.navigate(['/cliente/home']);
  }

  /**
   * Llamar al restaurante
   */
  callBusiness(businessName: string): void {
    // Simular llamada (en producción sería un número real)
    const phoneNumber = '+52 55 1234 5678';
    window.open(`tel:${phoneNumber}`, '_system');
  }

  /**
   * Refrescar estado del pedido
   */
  async refreshOrder(): Promise<void> {
    const order = this._order();
    if (!order) return;

    this._isLoading.set(true);

    // Simular refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // El servicio ya maneja las actualizaciones automáticas
    this._isLoading.set(false);
  }

  /**
   * Formatear precio
   */
  formatPrice(price: number): string {
    return this.ordersService.formatPrice(price);
  }

  /**
   * Formatear fecha
   */
  formatDate(date: Date): string {
    return this.ordersService.formatDate(date);
  }

  /**
   * Formatear fecha corta
   */
  formatShortDate(date: Date): string {
    return this.ordersService.formatShortDate(date);
  }

  private addIcons() {
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'time-outline': timeOutline,
      'restaurant-outline': restaurantOutline,
      'car-outline': carOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      storefront: storefront,
      'receipt-outline': receiptOutline,
      'location-outline': locationOutline,
      'call-outline': callOutline,
      'refresh-outline': refreshOutline,
      'home-outline': homeOutline,
      'alert-circle-outline': alertCircleOutline,
      'card-outline': cardOutline,
    });
  }
}
