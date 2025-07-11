import { Injectable, signal, computed, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaces
export interface CartItem {
  id: string;
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  negocioId: number;
  negocioNombre: string;
  imagen?: string;
}

export interface CartResumen {
  items: CartItem[];
  total: number;
  itemsCount: number;
  negociosCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Signals para estado reactivo - Angular 20
  private readonly _items = signal<CartItem[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Computed signals para valores derivados
  readonly items = this._items.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed values
  readonly itemsCount = computed(() =>
    this._items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly total = computed(() =>
    this._items().reduce((total, item) => total + item.subtotal, 0),
  );

  readonly negociosCount = computed(() => {
    const negociosUnicos = new Set(this._items().map((item) => item.negocioId));
    return negociosUnicos.size;
  });

  readonly isEmpty = computed(() => this._items().length === 0);

  readonly resumen = computed<CartResumen>(() => ({
    items: this._items(),
    total: this.total(),
    itemsCount: this.itemsCount(),
    negociosCount: this.negociosCount(),
  }));

  // BehaviorSubject para compatibilidad con observables
  private readonly _carritoSubject = new BehaviorSubject<CartItem[]>([]);
  readonly carrito$ = this._carritoSubject.asObservable();

  private readonly STORAGE_KEY = 'tizago-carrito';

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Inicializar el servicio
   */
  initialize(): void {
    this.loadFromStorage();
  }

  /**
   * Agregar producto al carrito
   */
  async agregarProducto(producto: {
    id: number;
    nombre: string;
    precio: number;
    negocioId: number;
    negocioNombre: string;
    imagen?: string;
  }): Promise<boolean> {
    try {
      this._isLoading.set(true);
      this._error.set(null);

      const currentItems = this._items();
      const existingItemIndex = currentItems.findIndex(
        (item) => item.productoId === producto.id,
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Actualizar cantidad si ya existe
        newItems = currentItems.map((item, index) => {
          if (index === existingItemIndex) {
            const newCantidad = item.cantidad + 1;
            return {
              ...item,
              cantidad: newCantidad,
              subtotal: item.precio * newCantidad,
            };
          }
          return item;
        });
      } else {
        // Agregar nuevo item
        const newItem: CartItem = {
          id: this.generateItemId(),
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          subtotal: producto.precio,
          negocioId: producto.negocioId,
          negocioNombre: producto.negocioNombre,
          imagen: producto.imagen,
        };
        newItems = [...currentItems, newItem];
      }

      this._items.set(newItems);
      this._carritoSubject.next(newItems);
      this.saveToStorage();

      return true;
    } catch (error) {
      this._error.set('Error al agregar producto al carrito');
      console.error('Error agregando producto:', error);
      return false;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Actualizar cantidad de un item
   */
  actualizarCantidad(itemId: string, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminarItem(itemId);
      return;
    }

    const currentItems = this._items();
    const newItems = currentItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          cantidad,
          subtotal: item.precio * cantidad,
        };
      }
      return item;
    });

    this._items.set(newItems);
    this._carritoSubject.next(newItems);
    this.saveToStorage();
  }

  /**
   * Eliminar item del carrito
   */
  eliminarItem(itemId: string): void {
    const currentItems = this._items();
    const newItems = currentItems.filter((item) => item.id !== itemId);

    this._items.set(newItems);
    this._carritoSubject.next(newItems);
    this.saveToStorage();
  }

  /**
   * Vaciar carrito
   */
  vaciarCarrito(): void {
    this._items.set([]);
    this._carritoSubject.next([]);
    this.saveToStorage();
  }

  /**
   * Obtener items por negocio
   */
  getItemsByNegocio(negocioId: number): CartItem[] {
    return this._items().filter((item) => item.negocioId === negocioId);
  }

  /**
   * Verificar si un producto está en el carrito
   */
  isProductInCart(productoId: number): boolean {
    return this._items().some((item) => item.productoId === productoId);
  }

  /**
   * Obtener cantidad de un producto específico
   */
  getProductQuantity(productoId: number): number {
    const item = this._items().find((item) => item.productoId === productoId);
    return item?.cantidad || 0;
  }

  // Métodos privados
  private generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const savedItems = localStorage.getItem(this.STORAGE_KEY);
      if (savedItems) {
        const items = JSON.parse(savedItems) as CartItem[];
        this._items.set(items);
        this._carritoSubject.next(items);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}
