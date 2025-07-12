import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonBadge,
  IonSkeletonText,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  trashOutline,
  addOutline,
  removeOutline,
  checkmarkOutline,
  storefront,
  bagCheckOutline,
  hourglassOutline,
} from 'ionicons/icons';

// Services
import { CartService, CartItem } from '../core/services/cart.service';
import { OrdersService } from '../core/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonInput,
    IonBadge,
    IonSkeletonText,
    IonButtons,
    IonBackButton,
  ],
})
export class CartPage implements OnInit {
  // Services injection
  private readonly cartService = inject(CartService);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly alertController = inject(AlertController);

  // Computed signals from cart service
  readonly items = this.cartService.items;
  readonly isLoading = this.cartService.isLoading;
  readonly total = this.cartService.total;
  readonly itemsCount = this.cartService.itemsCount;
  readonly isEmpty = this.cartService.isEmpty;
  readonly resumen = this.cartService.resumen;

  // Estado del checkout
  readonly isProcessingCheckout = this.ordersService.isCreatingOrder;

  // Computed para agrupar items por negocio
  readonly itemsByBusiness = computed(() => {
    const items = this.items();
    const grouped = new Map<number, { business: string; items: CartItem[] }>();

    items.forEach((item) => {
      const businessId = item.negocioId;
      if (!grouped.has(businessId)) {
        grouped.set(businessId, {
          business: item.negocioNombre,
          items: [],
        });
      }
      grouped.get(businessId)!.items.push(item);
    });

    return Array.from(grouped.entries()).map(([id, data]) => ({
      businessId: id,
      businessName: data.business,
      items: data.items,
      subtotal: data.items.reduce((sum, item) => sum + item.subtotal, 0),
    }));
  });

  // Costos adicionales
  readonly deliveryFee = computed(() => {
    // $35 por cada negocio diferente
    return this.itemsByBusiness().length * 35;
  });

  readonly serviceFee = computed(() => {
    // 5% del subtotal
    return Math.round(this.total() * 0.05);
  });

  readonly finalTotal = computed(() => {
    return this.total() + this.deliveryFee() + this.serviceFee();
  });

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Inicializar el servicio si es necesario
    this.cartService.initialize();
  }

  /**
   * Aumentar cantidad de un item
   */
  increaseQuantity(item: CartItem): void {
    this.cartService.actualizarCantidad(item.id, item.cantidad + 1);
  }

  /**
   * Disminuir cantidad de un item
   */
  decreaseQuantity(item: CartItem): void {
    if (item.cantidad > 1) {
      this.cartService.actualizarCantidad(item.id, item.cantidad - 1);
    } else {
      this.removeItem(item);
    }
  }

  /**
   * Actualizar cantidad directa
   */
  updateQuantity(item: CartItem, event: any): void {
    const newQuantity = parseInt(event.target.value) || 1;
    if (newQuantity >= 1) {
      this.cartService.actualizarCantidad(item.id, newQuantity);
    }
  }

  /**
   * Eliminar item del carrito
   */
  async removeItem(item: CartItem): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar producto',
      message: `¿Estás seguro de que quieres eliminar "${item.nombre}" del carrito?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.cartService.eliminarItem(item.id);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Vaciar carrito completo
   */
  async clearCart(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Vaciar carrito',
      message:
        '¿Estás seguro de que quieres eliminar todos los productos del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Vaciar',
          role: 'destructive',
          handler: () => {
            this.cartService.vaciarCarrito();
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Continuar comprando
   */
  continueShopping(): void {
    this.router.navigate(['/cliente/businesses']);
  }

  /**
   * Proceder al checkout
   */
  async proceedToCheckout(): Promise<void> {
    if (this.isEmpty()) {
      return;
    }

    try {
      // Crear el pedido usando el OrdersService
      const orderId = await this.ordersService.createOrderFromCart();

      if (orderId) {
        // Navegar a la página de confirmación
        this.router.navigate(['/cliente/cart/confirmation']);
      } else {
        throw new Error('No se pudo crear el pedido');
      }
    } catch (error) {
      console.error('Error en checkout:', error);

      // Mostrar alert de error
      const alert = await this.alertController.create({
        header: 'Error en el checkout',
        message: 'No se pudo procesar tu pedido. Por favor, intenta de nuevo.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  /**
   * Ir al detalle del negocio
   */
  goToBusiness(businessId: number): void {
    this.router.navigate(['/cliente/businesses', businessId]);
  }

  /**
   * Formatear precio
   */
  formatPrice(price: number): string {
    return `$${price.toFixed(0)}`;
  }

  /**
   * Registrar iconos
   */
  private addIcons(): void {
    addIcons({
      'cart-outline': cartOutline,
      'trash-outline': trashOutline,
      'add-outline': addOutline,
      'remove-outline': removeOutline,
      'checkmark-outline': checkmarkOutline,
      storefront: storefront,
      'bag-check-outline': bagCheckOutline,
      'hourglass-outline': hourglassOutline,
    });
  }
}
