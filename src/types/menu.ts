export interface MenuItem {
  id: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  price: number;
  category: string;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  prepTime?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  nameAm: string;
  icon: string;
  description: string;
  descriptionAm: string;
  order: number;
}

export interface MenuSection {
  category: Category;
  items: MenuItem[];
}

export type MenuFilter = {
  category: string | null;
  searchQuery: string;
  priceRange: [number, number] | null;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'popular';
};

export const DEFAULT_MENU_FILTER: MenuFilter = {
  category: null,
  searchQuery: '',
  priceRange: null,
  dietary: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  },
  sortBy: 'popular',
};
