import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from './cart.service';

// Interfaces para el sistema de pedidos
export interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  productImage: string | undefined;
  price: number;
  quantity: number;
  subtotal: number;
  businessId: number;
  businessName: string;
}

export interface OrderBusiness {
  businessId: number;
  businessName: string;
  businessImage?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'on_way'
    | 'delivered'
    | 'cancelled';
  statusText: string;
  createdAt: Date;
  estimatedDelivery: Date;
  businesses: OrderBusiness[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    instructions?: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  // Signals para estado reactivo
  private readonly _orders = signal<Order[]>([]);
  private readonly _currentOrder = signal<Order | null>(null);
  private readonly _isCreatingOrder = signal<boolean>(false);

  // Getters públicos
  readonly orders = this._orders.asReadonly();
  readonly currentOrder = this._currentOrder.asReadonly();
  readonly isCreatingOrder = this._isCreatingOrder.asReadonly();

  // Computed signals
  readonly activeOrders = computed(() => {
    return this._orders().filter((order) =>
      ['pending', 'confirmed', 'preparing', 'on_way'].includes(order.status),
    );
  });

  readonly completedOrders = computed(() => {
    return this._orders().filter((order) =>
      ['delivered', 'cancelled'].includes(order.status),
    );
  });

  readonly totalOrders = computed(() => this._orders().length);

  constructor() {
    this.loadOrdersFromStorage();
  }

  /**
   * Crear un nuevo pedido desde el carrito
   */
  async createOrderFromCart(): Promise<string | null> {
    const cartItems = this.cartService.items();
    const cartTotal = this.cartService.total();

    if (cartItems.length === 0) {
      throw new Error('El carrito está vacío');
    }

    this._isCreatingOrder.set(true);

    try {
      // Simular delay de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Agrupar items por negocio
      const businessGroups = this.groupItemsByBusiness(cartItems);

      // Calcular costos
      const subtotal = cartTotal;
      const deliveryFee = businessGroups.length * 35; // $35 por negocio
      const serviceFee = Math.round(subtotal * 0.05); // 5%
      const total = subtotal + deliveryFee + serviceFee;

      // Crear el pedido
      const order: Order = {
        id: this.generateOrderId(),
        orderNumber: this.generateOrderNumber(),
        status: 'pending',
        statusText: 'Pedido recibido',
        createdAt: new Date(),
        estimatedDelivery: this.calculateEstimatedDelivery(),
        businesses: businessGroups.map((group) => ({
          businessId: group.businessId,
          businessName: group.businessName,
          businessImage: group.items[0]?.imagen,
          items: group.items.map((item) => ({
            id: item.id,
            productId: item.productoId,
            productName: item.nombre,
            productImage: item.imagen,
            price: item.precio,
            quantity: item.cantidad,
            subtotal: item.subtotal,
            businessId: item.negocioId,
            businessName: item.negocioNombre,
          })),
          subtotal: group.items.reduce((sum, item) => sum + item.subtotal, 0),
          deliveryFee: 35,
        })),
        subtotal,
        deliveryFee,
        serviceFee,
        total,
        paymentMethod: 'Efectivo', // Por ahora solo efectivo
        deliveryAddress: {
          street: 'Av. Insurgentes Sur 1234',
          city: 'Ciudad de México',
          postalCode: '03100',
          instructions: 'Tocar el timbre',
        },
        customer: {
          name: 'Usuario Cliente',
          phone: '+52 55 1234 5678',
          email: 'cliente@example.com',
        },
      };

      // Agregar a la lista de pedidos
      const currentOrders = this._orders();
      this._orders.set([order, ...currentOrders]);

      // Establecer como pedido actual
      this._currentOrder.set(order);

      // Guardar en localStorage
      this.saveOrdersToStorage();

      // Limpiar el carrito
      this.cartService.vaciarCarrito();

      // Simular actualizaciones de estado del pedido
      this.simulateOrderStatusUpdates(order.id);

      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      this._isCreatingOrder.set(false);
    }
  }

  /**
   * Obtener un pedido por ID
   */
  getOrderById(orderId: string): Order | null {
    return this._orders().find((order) => order.id === orderId) || null;
  }

  /**
   * Actualizar estado de un pedido
   */
  updateOrderStatus(
    orderId: string,
    status: Order['status'],
    statusText: string,
  ): void {
    const orders = this._orders();
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex !== -1) {
      const updatedOrder = { ...orders[orderIndex], status, statusText };
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = updatedOrder;

      this._orders.set(updatedOrders);

      // Actualizar pedido actual si es el mismo
      if (this._currentOrder()?.id === orderId) {
        this._currentOrder.set(updatedOrder);
      }

      this.saveOrdersToStorage();
    }
  }

  /**
   * Obtener el estado visual del pedido
   */
  getOrderStatusInfo(status: Order['status']) {
    const statusMap = {
      pending: { color: 'warning', icon: 'time-outline', text: 'Pendiente' },
      confirmed: {
        color: 'primary',
        icon: 'checkmark-circle-outline',
        text: 'Confirmado',
      },
      preparing: {
        color: 'secondary',
        icon: 'restaurant-outline',
        text: 'Preparando',
      },
      on_way: { color: 'tertiary', icon: 'car-outline', text: 'En camino' },
      delivered: {
        color: 'success',
        icon: 'checkmark-done-outline',
        text: 'Entregado',
      },
      cancelled: {
        color: 'danger',
        icon: 'close-circle-outline',
        text: 'Cancelado',
      },
    };

    return statusMap[status] || statusMap.pending;
  }

  /**
   * Formatear precio
   */
  formatPrice(price: number): string {
    return `$${price.toFixed(0)}`;
  }

  /**
   * Formatear fecha
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Formatear fecha corta
   */
  formatShortDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  // Métodos privados
  private groupItemsByBusiness(cartItems: CartItem[]) {
    const groups = new Map<
      number,
      { businessId: number; businessName: string; items: CartItem[] }
    >();

    cartItems.forEach((item: CartItem) => {
      const businessId = item.negocioId;
      if (!groups.has(businessId)) {
        groups.set(businessId, {
          businessId,
          businessName: item.negocioNombre,
          items: [],
        });
      }
      groups.get(businessId)!.items.push(item);
    });

    return Array.from(groups.values());
  }

  private generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `TZ${timestamp}${random}`;
  }

  private calculateEstimatedDelivery(): Date {
    const now = new Date();
    const estimatedMinutes = 25 + Math.floor(Math.random() * 20); // 25-45 min
    return new Date(now.getTime() + estimatedMinutes * 60000);
  }

  private saveOrdersToStorage(): void {
    try {
      const orders = this._orders().map((order) => ({
        ...order,
        createdAt: order.createdAt.toISOString(),
        estimatedDelivery: order.estimatedDelivery.toISOString(),
      }));
      localStorage.setItem('tiza_orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }

  private loadOrdersFromStorage(): void {
    try {
      const savedOrders = localStorage.getItem('tiza_orders');
      if (savedOrders) {
        const orders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          estimatedDelivery: new Date(order.estimatedDelivery),
        }));
        this._orders.set(orders);
      }
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
    }
  }

  private simulateOrderStatusUpdates(orderId: string): void {
    // Simular progreso del pedido
    setTimeout(() => {
      this.updateOrderStatus(
        orderId,
        'confirmed',
        'Pedido confirmado por el restaurante',
      );
    }, 30000); // 30 segundos

    setTimeout(() => {
      this.updateOrderStatus(
        orderId,
        'preparing',
        'Tu pedido está siendo preparado',
      );
    }, 120000); // 2 minutos

    setTimeout(() => {
      this.updateOrderStatus(orderId, 'on_way', 'El repartidor está en camino');
    }, 300000); // 5 minutos

    setTimeout(() => {
      this.updateOrderStatus(
        orderId,
        'delivered',
        'Pedido entregado exitosamente',
      );
    }, 480000); // 8 minutos
  }
}
