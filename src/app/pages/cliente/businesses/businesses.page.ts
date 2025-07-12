import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  starOutline,
  star,
  timeOutline,
  locationOutline,
  heartOutline,
  heart,
  closeOutline,
  checkmarkOutline,
  refreshOutline,
} from 'ionicons/icons';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonCard,
  IonCardContent,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonCheckbox,
  IonRange,
  IonText,
  ViewWillEnter,
} from '@ionic/angular/standalone';

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
  };
  promotion?: {
    type: 'discount' | 'free_delivery' | 'special';
    value: string;
    description: string;
  };
}

type SortOption =
  | 'rating'
  | 'delivery_time'
  | 'delivery_fee'
  | 'distance'
  | 'popularity';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
    IonCard,
    IonCardContent,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonCheckbox,
    IonRange,
    IonText,
  ],
})
export class BusinessesPage implements OnInit, OnDestroy, ViewWillEnter {
  // Signals para estado reactivo - Angular 20
  private readonly _businesses = signal<Business[]>([]);
  private readonly _categories = signal<string[]>([]);
  private readonly _isLoading = signal<boolean>(true);
  private readonly _searchTerm = signal<string>('');
  private readonly _selectedCategories = signal<string[]>([]);
  private readonly _sortBy = signal<SortOption>('rating');
  private readonly _showOpenOnly = signal<boolean>(false);
  private readonly _priceRange = signal<{ lower: number; upper: number }>({
    lower: 0,
    upper: 1000,
  });
  private readonly _showFilters = signal<boolean>(false);

  // Computed signals
  readonly businesses = this._businesses.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly selectedCategories = this._selectedCategories.asReadonly();
  readonly sortBy = this._sortBy.asReadonly();
  readonly showOpenOnly = this._showOpenOnly.asReadonly();
  readonly priceRange = this._priceRange.asReadonly();
  readonly showFilters = this._showFilters.asReadonly();

  // Computed para filtros y búsqueda
  readonly filteredBusinesses = computed(() => {
    let filtered = this._businesses();

    // Filtro por término de búsqueda
    const searchTerm = this._searchTerm().toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm) ||
          business.description.toLowerCase().includes(searchTerm) ||
          business.category.toLowerCase().includes(searchTerm) ||
          business.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
    }

    // Filtro por categorías
    const selectedCategories = this._selectedCategories();
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((business) =>
        selectedCategories.includes(business.category),
      );
    }

    // Filtro por negocios abiertos
    if (this._showOpenOnly()) {
      filtered = filtered.filter((business) => business.isOpen);
    }

    // Filtro por rango de precio (delivery fee)
    const priceRange = this._priceRange();
    filtered = filtered.filter(
      (business) =>
        business.deliveryFee >= priceRange.lower &&
        business.deliveryFee <= priceRange.upper,
    );

    // Ordenamiento
    const sortBy = this._sortBy();
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'delivery_time':
          return a.deliveryTime - b.deliveryTime;
        case 'delivery_fee':
          return a.deliveryFee - b.deliveryFee;
        case 'distance':
          return a.location.distance - b.location.distance;
        case 'popularity':
          return b.reviewsCount - a.reviewsCount;
        default:
          return 0;
      }
    });

    return filtered;
  });

  readonly activeFiltersCount = computed(() => {
    let count = 0;
    if (this._selectedCategories().length > 0) count++;
    if (this._showOpenOnly()) count++;
    if (this._priceRange().lower > 0 || this._priceRange().upper < 1000)
      count++;
    return count;
  });

  private initializationTimeout: any;

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // No cargar datos aquí, esperar a ionViewWillEnter
  }

  ionViewWillEnter() {
    // Usar ionViewWillEnter para cargar datos de manera segura en Ionic
    this.initializationTimeout = setTimeout(() => {
      this.loadInitialData();
    }, 100);
  }

  ngOnDestroy() {
    // Limpiar timeouts para evitar memory leaks
    if (this.initializationTimeout) {
      clearTimeout(this.initializationTimeout);
    }
  }

  async loadInitialData() {
    this._isLoading.set(true);

    try {
      const [businesses, categories] = await Promise.all([
        this.loadBusinesses(),
        this.loadCategories(),
      ]);

      this._businesses.set(businesses);
      this._categories.set(categories);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this._isLoading.set(false);
    }
  }

  async onRefresh(event: any) {
    try {
      await this.loadInitialData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      if (event?.target) {
        event.target.complete();
      }
    }
  }

  onSearchInput(event: any) {
    try {
      this._searchTerm.set(event?.target?.value || '');
    } catch (error) {
      console.error('Error handling search input:', error);
    }
  }

  onSortChange(event: any) {
    try {
      this._sortBy.set(event?.detail?.value || 'rating');
    } catch (error) {
      console.error('Error handling sort change:', error);
    }
  }

  toggleCategory(category: string) {
    const current = this._selectedCategories();
    if (current.includes(category)) {
      this._selectedCategories.set(current.filter((c) => c !== category));
    } else {
      this._selectedCategories.set([...current, category]);
    }
  }

  toggleOpenOnly() {
    this._showOpenOnly.set(!this._showOpenOnly());
  }

  onPriceRangeChange(event: any) {
    try {
      const value = event?.detail?.value;
      if (
        value &&
        typeof value.lower === 'number' &&
        typeof value.upper === 'number'
      ) {
        this._priceRange.set({
          lower: value.lower,
          upper: value.upper,
        });
      }
    } catch (error) {
      console.error('Error handling price range change:', error);
    }
  }

  toggleFavorite(businessId: number, event?: Event) {
    // Prevenir propagación del evento para evitar conflictos con routerLink
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const businesses = this._businesses().map((business) =>
        business.id === businessId
          ? { ...business, isFavorite: !business.isFavorite }
          : business,
      );
      this._businesses.set(businesses);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  clearFilters() {
    this._selectedCategories.set([]);
    this._showOpenOnly.set(false);
    this._priceRange.set({ lower: 0, upper: 1000 });
    this._searchTerm.set('');
  }

  toggleFilters() {
    this._showFilters.set(!this._showFilters());
  }

  // Métodos de datos mock
  private async loadBusinesses(): Promise<Business[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: 1,
        name: 'Tacos El Güero',
        category: 'Mexicana',
        description: 'Auténticos tacos mexicanos preparados al momento',
        rating: 4.8,
        reviewsCount: 245,
        deliveryTime: 25,
        deliveryFee: 35,
        minOrder: 150,
        image: 'assets/businesses/tacos-el-guero.jpg',
        coverImage: 'assets/businesses/covers/tacos-el-guero-cover.jpg',
        isOpen: true,
        isFavorite: false,
        tags: ['tacos', 'mexicana', 'picante', 'tradicional'],
        location: {
          address: 'Av. Revolución 123, Centro',
          distance: 1.2,
        },
        promotion: {
          type: 'discount',
          value: '20% OFF',
          description: 'En tu primer pedido',
        },
      },
      {
        id: 2,
        name: 'Pizza Italiana',
        category: 'Pizza',
        description: 'Pizzas artesanales con ingredientes importados de Italia',
        rating: 4.6,
        reviewsCount: 189,
        deliveryTime: 35,
        deliveryFee: 45,
        minOrder: 200,
        image: 'assets/businesses/pizza-italiana.jpg',
        coverImage: 'assets/businesses/covers/pizza-italiana-cover.jpg',
        isOpen: true,
        isFavorite: true,
        tags: ['pizza', 'italiana', 'artesanal', 'queso'],
        location: {
          address: 'Calle Roma 456, Condesa',
          distance: 2.1,
        },
      },
      {
        id: 3,
        name: 'Sushi Express',
        category: 'Japonesa',
        description:
          'Sushi fresco y rolls especiales preparados por chef japonés',
        rating: 4.9,
        reviewsCount: 324,
        deliveryTime: 40,
        deliveryFee: 60,
        minOrder: 300,
        image: 'assets/businesses/sushi-express.jpg',
        coverImage: 'assets/businesses/covers/sushi-express-cover.jpg',
        isOpen: true,
        isFavorite: false,
        tags: ['sushi', 'japonesa', 'fresco', 'premium'],
        location: {
          address: 'Zona Rosa, Local 7',
          distance: 3.2,
        },
        promotion: {
          type: 'free_delivery',
          value: 'Envío gratis',
          description: 'En pedidos mayores a $400',
        },
      },
      {
        id: 4,
        name: 'Café Central',
        category: 'Café',
        description: 'Café de especialidad y repostería artesanal',
        rating: 4.7,
        reviewsCount: 156,
        deliveryTime: 15,
        deliveryFee: 25,
        minOrder: 80,
        image: 'assets/businesses/cafe-central.jpg',
        coverImage: 'assets/businesses/covers/cafe-central-cover.jpg',
        isOpen: false,
        isFavorite: true,
        tags: ['café', 'repostería', 'desayuno', 'especialidad'],
        location: {
          address: 'Plaza Mayor 89',
          distance: 0.8,
        },
      },
      {
        id: 5,
        name: 'Hamburguesas Gourmet',
        category: 'Hamburguesas',
        description: 'Hamburguesas gourmet con carne angus y papas artesanales',
        rating: 4.5,
        reviewsCount: 278,
        deliveryTime: 30,
        deliveryFee: 40,
        minOrder: 180,
        image: 'assets/businesses/hamburguesas-gourmet.jpg',
        coverImage: 'assets/businesses/covers/hamburguesas-gourmet-cover.jpg',
        isOpen: true,
        isFavorite: false,
        tags: ['hamburguesas', 'gourmet', 'angus', 'papas'],
        location: {
          address: 'Av. Insurgentes 567',
          distance: 1.8,
        },
        promotion: {
          type: 'special',
          value: '2x1',
          description: 'En hamburguesas los martes',
        },
      },
      {
        id: 6,
        name: 'Mariscos La Costa',
        category: 'Mariscos',
        description: 'Mariscos frescos del Pacífico, especialidad en ceviches',
        rating: 4.4,
        reviewsCount: 198,
        deliveryTime: 45,
        deliveryFee: 55,
        minOrder: 250,
        image: 'assets/businesses/mariscos-la-costa.jpg',
        coverImage: 'assets/businesses/covers/mariscos-la-costa-cover.jpg',
        isOpen: true,
        isFavorite: false,
        tags: ['mariscos', 'ceviche', 'fresco', 'pacífico'],
        location: {
          address: 'Mercado del Mar, Local 12',
          distance: 4.1,
        },
      },
    ];
  }

  private async loadCategories(): Promise<string[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      'Mexicana',
      'Pizza',
      'Japonesa',
      'Café',
      'Hamburguesas',
      'Mariscos',
      'Italiana',
      'China',
      'Vegetariana',
      'Postres',
      'Bebidas',
      'Saludable',
    ];
  }

  private addIcons() {
    addIcons({
      'search-outline': searchOutline,
      'filter-outline': filterOutline,
      'star-outline': starOutline,
      star: star,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'heart-outline': heartOutline,
      heart: heart,
      'close-outline': closeOutline,
      'checkmark-outline': checkmarkOutline,
      'refresh-outline': refreshOutline,
    });
  }
}
