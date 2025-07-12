import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSkeletonText,
  IonText,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  receiptOutline,
  timeOutline,
  checkmarkDoneOutline,
  refreshOutline,
  addOutline,
  eyeOutline,
  storefront,
  closeCircleOutline,
  hourglassOutline,
  restaurantOutline,
  carOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

// Services
import { OrdersService, Order } from '../core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSkeletonText,
    IonText,
    IonButtons,
  ],
})
export class OrdersPage implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  // Signals para estado reactivo
  private readonly _selectedFilter = signal<'all' | 'active' | 'completed'>(
    'all',
  );
  private readonly _isRefreshing = signal<boolean>(false);

  // Getters públicos
  readonly selectedFilter = this._selectedFilter.asReadonly();
  readonly isRefreshing = this._isRefreshing.asReadonly();

  // Referencias a los signals del servicio
  readonly orders = this.ordersService.orders;
  readonly activeOrders = this.ordersService.activeOrders;
  readonly completedOrders = this.ordersService.completedOrders;
  readonly totalOrders = this.ordersService.totalOrders;

  // Computed para pedidos filtrados
  readonly filteredOrders = computed(() => {
    const filter = this._selectedFilter();
    switch (filter) {
      case 'active':
        return this.activeOrders();
      case 'completed':
        return this.completedOrders();
      default:
        return this.orders();
    }
  });

  // Computed para mostrar estado vacío
  readonly isEmpty = computed(() => {
    return this.filteredOrders().length === 0;
  });

  readonly isLoading = computed(() => {
    // Si es la primera carga y no hay pedidos
    return this.totalOrders() === 0 && !this._isRefreshing();
  });

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Los pedidos se cargan automáticamente desde el servicio
  }

  /**
   * Cambiar filtro de pedidos
   */
  onFilterChange(filter: any): void {
    if (filter && typeof filter === 'string') {
      this._selectedFilter.set(filter as 'all' | 'active' | 'completed');
    }
  }

  /**
   * Refrescar lista de pedidos
   */
  async onRefresh(event: any): Promise<void> {
    this._isRefreshing.set(true);

    // Simular refresh (en producción sincronizaría con servidor)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    this._isRefreshing.set(false);
    event.target.complete();
  }

  /**
   * Ver detalle de un pedido
   */
  viewOrderDetail(orderId: string): void {
    this.router.navigate(['/cliente/orders', orderId]);
  }

  /**
   * Ir a la página de negocios para hacer un nuevo pedido
   */
  startNewOrder(): void {
    this.router.navigate(['/cliente/businesses']);
  }

  /**
   * Obtener información de estado del pedido
   */
  getOrderStatusInfo(status: Order['status']) {
    return this.ordersService.getOrderStatusInfo(status);
  }

  /**
   * Formatear precio
   */
  formatPrice(price: number): string {
    return this.ordersService.formatPrice(price);
  }

  /**
   * Formatear fecha corta
   */
  formatShortDate(date: Date): string {
    return this.ordersService.formatShortDate(date);
  }

  /**
   * Formatear fecha completa
   */
  formatDate(date: Date): string {
    return this.ordersService.formatDate(date);
  }

  /**
   * Obtener el primer negocio del pedido (para mostrar en la lista)
   */
  getMainBusiness(order: Order) {
    return order.businesses[0];
  }

  /**
   * Obtener el total de productos en el pedido
   */
  getTotalItems(order: Order): number {
    return order.businesses.reduce((total, business) => {
      return (
        total +
        business.items.reduce((businessTotal, item) => {
          return businessTotal + item.quantity;
        }, 0)
      );
    }, 0);
  }

  /**
   * Obtener texto descriptivo del pedido
   */
  getOrderDescription(order: Order): string {
    const totalItems = this.getTotalItems(order);
    const businessesCount = order.businesses.length;

    if (businessesCount === 1) {
      return `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'} de ${order.businesses[0].businessName}`;
    } else {
      return `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'} de ${businessesCount} negocios`;
    }
  }

  private addIcons() {
    addIcons({
      'receipt-outline': receiptOutline,
      'time-outline': timeOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'refresh-outline': refreshOutline,
      'add-outline': addOutline,
      'eye-outline': eyeOutline,
      storefront: storefront,
      'close-circle-outline': closeCircleOutline,
      'hourglass-outline': hourglassOutline,
      'restaurant-outline': restaurantOutline,
      'car-outline': carOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
    });
  }
}
