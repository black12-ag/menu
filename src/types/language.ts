/**
 * Language Type Definition
 */
export type Language = 'en' | 'am';

/**
 * Translation Object Type
 */
export type TranslationValue = string | { [key: string]: TranslationValue };

export interface Translation {
  [key: string]: TranslationValue;
}

/**
 * Language Context Type
 */
export interface LanguageContextType {
  /** Current language */
  language: Language;
  /** Set language */
  setLanguage: (lang: Language) => void;
  /** Translate function */
  t: (key: string, fallback?: string) => string;
  /** Text direction */
  dir: 'ltr' | 'rtl';
  /** Check if Amharic */
  isAmharic: boolean;
}

/**
 * Translation Keys for Type Safety
 */
export type TranslationKey =
  | 'nav.home'
  | 'nav.menu'
  | 'nav.about'
  | 'nav.contact'
  | 'menu.categories'
  | 'menu.addToCart'
  | 'menu.price'
  | 'cart.title'
  | 'cart.empty'
  | 'cart.checkout'
  | 'search.placeholder'
  | 'common.loading'
  | 'common.error'
  | 'common.retry'
  | 'common.close'
  | 'common.cancel'
  | 'common.save'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta';
