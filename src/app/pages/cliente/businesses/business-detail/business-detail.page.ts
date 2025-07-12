import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  starOutline,
  star,
  timeOutline,
  locationOutline,
  heartOutline,
  heart,
  addOutline,
  removeOutline,
  cartOutline,
  callOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

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
  IonChip,
  IonLabel,
  IonSkeletonText,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonToast,
  ViewWillEnter,
} from '@ionic/angular/standalone';

import { CartService } from '../../core/services/cart.service';

// Interfaces
interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  image: string;
  coverImage: string;
  isOpen: boolean;
  isFavorite: boolean;
  tags: string[];
  location: {
    address: string;
    distance: number;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  hours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  promotion?: {
    type: 'discount' | 'free_delivery' | 'special';
    value: string;
    description: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isPopular: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
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
    IonBadge,
    IonChip,
    IonLabel,
    IonSkeletonText,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonToast,
  ],
})
export class BusinessDetailPage implements OnInit, OnDestroy, ViewWillEnter {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private cartService = inject(CartService);

  // Signals para estado reactivo - Angular 20
  private readonly _business = signal<Business | null>(null);
  private readonly _categories = signal<ProductCategory[]>([]);
  private readonly _isLoading = signal<boolean>(true);
  private readonly _selectedCategory = signal<string>('all');
  private readonly _showToast = signal<boolean>(false);
  private readonly _toastMessage = signal<string>('');
  private readonly _isAddingToCart = signal<boolean>(false);

  // Computed signals
  readonly business = this._business.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly showToast = this._showToast.asReadonly();
  readonly toastMessage = this._toastMessage.asReadonly();
  readonly isAddingToCart = this._isAddingToCart.asReadonly();

  // Computed para productos filtrados
  readonly filteredProducts = computed(() => {
    const categories = this._categories();
    const selectedCategory = this._selectedCategory();

    if (selectedCategory === 'all') {
      return categories.reduce(
        (products, cat) => [...products, ...cat.products],
        [] as Product[],
      );
    }

    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.products : [];
  });

  // Computed para categorías con contador
  readonly categoriesWithCount = computed(() => {
    const categories = this._categories();
    const allCount = categories.reduce(
      (total, cat) => total + cat.products.length,
      0,
    );

    return [
      { id: 'all', name: 'Todos', count: allCount },
      ...categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        count: cat.products.length,
      })),
    ];
  });

  // Acceso a señales del carrito

  businessId: string = '';
  private initializationTimeout: any;

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Obtener ID inmediatamente pero sin cargar datos aún
    this.businessId = this.route.snapshot.paramMap.get('id') || '';
  }

  ionViewWillEnter() {
    // Usar ionViewWillEnter para cargar datos de manera segura en Ionic
    if (this.businessId) {
      // Pequeño delay para asegurar que la vista esté completamente lista
      this.initializationTimeout = setTimeout(() => {
        this.loadBusinessDetail();
      }, 100);
    }
  }

  ngOnDestroy() {
    // Limpiar timeouts para evitar memory leaks
    if (this.initializationTimeout) {
      clearTimeout(this.initializationTimeout);
    }
  }

  async loadBusinessDetail() {
    try {
      this._isLoading.set(true);

      // Verificar que tenemos un ID válido
      if (!this.businessId) {
        throw new Error('Business ID not found');
      }

      // Simular delay de carga
      await new Promise((resolve) => setTimeout(resolve, 800));

      const [business, categories] = await Promise.all([
        this.loadBusiness(this.businessId),
        this.loadBusinessCategories(this.businessId),
      ]);

      this._business.set(business);
      this._categories.set(categories);
    } catch (error) {
      console.error('Error loading business detail:', error);
      this.showToastMessage('Error al cargar el negocio');
      // Si hay error, regresar a la página anterior
      setTimeout(() => {
        this.goBack();
      }, 2000);
    } finally {
      this._isLoading.set(false);
    }
  }

  onCategoryChange(categoryId: string | number | undefined) {
    if (categoryId) {
      this._selectedCategory.set(categoryId.toString());
    }
  }

  async addToCart(product: Product) {
    const business = this._business();
    if (!business) return;

    this._isAddingToCart.set(true);

    try {
      const success = await this.cartService.agregarProducto({
        id: product.id,
        nombre: product.name,
        precio: product.price,
        negocioId: business.id,
        negocioNombre: business.name,
        imagen: product.image,
      });

      if (success) {
        this.showToastMessage(`${product.name} agregado al carrito`);
      } else {
        this.showToastMessage('Error al agregar producto');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showToastMessage('Error al agregar producto');
    } finally {
      this._isAddingToCart.set(false);
    }
  }

  removeFromCart(productId: number) {
    const cartItems = this.cartService.items();
    const item = cartItems.find((item) => item.productoId === productId);

    if (item) {
      if (item.cantidad > 1) {
        this.cartService.actualizarCantidad(item.id, item.cantidad - 1);
      } else {
        this.cartService.eliminarItem(item.id);
      }
    }
  }

  getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }

  isProductInCart(productId: number): boolean {
    return this.cartService.isProductInCart(productId);
  }

  toggleFavorite() {
    const business = this._business();
    if (business) {
      business.isFavorite = !business.isFavorite;
      this.showToastMessage(
        business.isFavorite ? 'Agregado a favoritos' : 'Eliminado de favoritos',
      );
    }
  }

  goBack() {
    this.location.back();
  }

  callBusiness() {
    const business = this._business();
    if (business?.contact.phone) {
      window.open(`tel:${business.contact.phone}`, '_system');
    }
  }

  private showToastMessage(message: string) {
    this._toastMessage.set(message);
    this._showToast.set(true);
    setTimeout(() => this._showToast.set(false), 3000);
  }

  private async loadBusiness(id: string): Promise<Business> {
    // Simular datos mock - en producción vendría de una API
    return {
      id: parseInt(id),
      name: 'Tacos El Compadre',
      category: 'Comida Mexicana',
      description:
        'Los mejores tacos de la ciudad con ingredientes frescos y salsas artesanales. Más de 20 años de tradición familiar.',
      rating: 4.8,
      reviewsCount: 324,
      deliveryTime: 25,
      deliveryFee: 35,
      minOrder: 150,
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
      coverImage:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop',
      isOpen: true,
      isFavorite: false,
      tags: ['Tacos', 'Quesadillas', 'Salsas', 'Mexicano', 'Tradicional'],
      location: {
        address: 'Av. Insurgentes Sur 1234, Col. Del Valle',
        distance: 1.2,
        coordinates: { lat: 19.4326, lng: -99.1332 },
      },
      contact: {
        phone: '+52 55 1234 5678',
        email: 'contacto@tacoscompadre.com',
        whatsapp: '+52 55 1234 5678',
      },
      hours: {
        Lunes: { open: '09:00', close: '22:00', isOpen: true },
        Martes: { open: '09:00', close: '22:00', isOpen: true },
        Miércoles: { open: '09:00', close: '22:00', isOpen: true },
        Jueves: { open: '09:00', close: '22:00', isOpen: true },
        Viernes: { open: '09:00', close: '23:00', isOpen: true },
        Sábado: { open: '09:00', close: '23:00', isOpen: true },
        Domingo: { open: '10:00', close: '21:00', isOpen: true },
      },
      promotion: {
        type: 'discount',
        value: '20%',
        description: '20% de descuento en tu primera orden',
      },
    };
  }

  private async loadBusinessCategories(
    businessId: string,
  ): Promise<ProductCategory[]> {
    // Simular datos mock - en producción vendría de una API
    return [
      {
        id: 'tacos',
        name: 'Tacos',
        description: 'Tacos artesanales con tortillas hechas a mano',
        products: [
          {
            id: 1,
            name: 'Tacos de Pastor',
            description:
              'Carne de cerdo marinada con especias, piña, cebolla y cilantro',
            price: 45,
            image:
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
            category: 'tacos',
            isAvailable: true,
            isPopular: true,
            ingredients: [
              'Carne de cerdo',
              'Piña',
              'Cebolla',
              'Cilantro',
              'Salsa verde',
            ],
            allergens: ['Gluten'],
          },
          {
            id: 2,
            name: 'Tacos de Asada',
            description:
              'Carne de res a la parrilla con guacamole y pico de gallo',
            price: 50,
            image:
              'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop',
            category: 'tacos',
            isAvailable: true,
            isPopular: true,
            ingredients: [
              'Carne de res',
              'Guacamole',
              'Pico de gallo',
              'Salsa roja',
            ],
            allergens: ['Gluten'],
          },
          {
            id: 3,
            name: 'Tacos de Pollo',
            description: 'Pollo asado con verduras y salsa chipotle',
            price: 40,
            image:
              'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=300&h=200&fit=crop',
            category: 'tacos',
            isAvailable: true,
            isPopular: false,
            ingredients: ['Pollo', 'Verduras', 'Salsa chipotle', 'Cebolla'],
            allergens: ['Gluten'],
          },
        ],
      },
      {
        id: 'quesadillas',
        name: 'Quesadillas',
        description: 'Quesadillas con queso Oaxaca y diferentes rellenos',
        products: [
          {
            id: 4,
            name: 'Quesadilla de Flor de Calabaza',
            description: 'Queso Oaxaca con flor de calabaza y epazote',
            price: 55,
            image:
              'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300&h=200&fit=crop',
            category: 'quesadillas',
            isAvailable: true,
            isPopular: true,
            ingredients: ['Queso Oaxaca', 'Flor de calabaza', 'Epazote'],
            allergens: ['Lácteos', 'Gluten'],
          },
          {
            id: 5,
            name: 'Quesadilla de Hongos',
            description: 'Hongos salteados con queso Oaxaca y hierbas',
            price: 60,
            image:
              'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop',
            category: 'quesadillas',
            isAvailable: true,
            isPopular: false,
            ingredients: ['Hongos', 'Queso Oaxaca', 'Hierbas finas'],
            allergens: ['Lácteos', 'Gluten'],
          },
        ],
      },
      {
        id: 'bebidas',
        name: 'Bebidas',
        description: 'Bebidas tradicionales y refrescos',
        products: [
          {
            id: 6,
            name: 'Agua de Horchata',
            description: 'Agua fresca de horchata con canela',
            price: 25,
            image:
              'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop',
            category: 'bebidas',
            isAvailable: true,
            isPopular: true,
            ingredients: ['Arroz', 'Canela', 'Azúcar', 'Leche'],
            allergens: ['Lácteos'],
          },
          {
            id: 7,
            name: 'Agua de Jamaica',
            description: 'Agua fresca de jamaica natural',
            price: 20,
            image:
              'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=200&fit=crop',
            category: 'bebidas',
            isAvailable: true,
            isPopular: false,
            ingredients: ['Flor de jamaica', 'Azúcar'],
            allergens: [],
          },
        ],
      },
    ];
  }

  private addIcons() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'star-outline': starOutline,
      star: star,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'heart-outline': heartOutline,
      heart: heart,
      'add-outline': addOutline,
      'remove-outline': removeOutline,
      'cart-outline': cartOutline,
      'call-outline': callOutline,
      'information-circle-outline': informationCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
    });
  }
}
