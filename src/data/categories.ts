import { Category } from '../types/menu';

export const categories: Category[] = [
  {
    id: 'ethiopian',
    name: 'Ethiopian',
    nameAm: 'የኢትዮጵያ ምግብ',
    icon: '🍲',
    description: 'Authentic Ethiopian traditional dishes',
    descriptionAm: 'የኢትዮጵያ ወግ የተላበሱ ምግቦች',
    order: 1,
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    nameAm: 'ቁርስ',
    icon: '🍳',
    description: 'Start your day with our delicious breakfast options',
    descriptionAm: 'ቀንዎን በጣም ዋጋ ያላቸው የቁርስ አማራጮች ይጀምሩ',
    order: 2,
  },
  {
    id: 'chicken',
    name: 'Chicken',
    nameAm: 'ዶሮ',
    icon: '🍗',
    description: 'Delicious chicken dishes prepared with care',
    descriptionAm: 'ጣፋጭ የዶሮ ምግቦች',
    order: 3,
  },
  {
    id: 'salad',
    name: 'Salads',
    nameAm: 'ሰላጣ',
    icon: '🥗',
    description: 'Fresh and healthy salads',
    descriptionAm: 'የተለያዩ ጤናማ ሰላጣዎች',
    order: 4,
  },
  {
    id: 'burger',
    name: 'Burgers',
    nameAm: 'በርገር',
    icon: '🍔',
    description: 'Juicy burgers made with premium beef',
    descriptionAm: 'ከፍተኛ ጥራት ያለው የበሬ ስጋ በርገሮች',
    order: 5,
  },
  {
    id: 'pizza',
    name: 'Pizza',
    nameAm: 'ፒዛ',
    icon: '🍕',
    description: 'Authentic Italian pizzas',
    descriptionAm: 'የጣሊያን ፒዛዎች',
    order: 6,
  },
  {
    id: 'pasta',
    name: 'Pasta',
    nameAm: 'ፓስታ',
    icon: '🍝',
    description: 'Delicious pasta dishes',
    descriptionAm: 'ጣፋጭ የፓስታ ምግቦች',
    order: 7,
  },
  {
    id: 'sandwich',
    name: 'Sandwiches',
    nameAm: 'ሳንድዊች',
    icon: '🥪',
    description: 'Fresh sandwiches and wraps',
    descriptionAm: 'የተለያዩ ሳንድዊቾች',
    order: 8,
  },
  {
    id: 'cake',
    name: 'Cakes',
    nameAm: 'ኬክ',
    icon: '🍰',
    description: 'Delicious cakes and desserts',
    descriptionAm: 'ጣፋጭ ኬኮች እና ጣፋጮች',
    order: 9,
  },
  {
    id: 'icecream',
    name: 'Ice Cream',
    nameAm: 'አይስክሪም',
    icon: '🍦',
    description: 'Creamy ice cream flavors',
    descriptionAm: 'ጣፋጭ አይስክሪሞች',
    order: 10,
  },
  {
    id: 'drinks',
    name: 'Drinks',
    nameAm: 'መጠጦች',
    icon: '🥤',
    description: 'Refreshing beverages',
    descriptionAm: 'የተለያዩ መጠጦች',
    order: 11,
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoriesOrdered = (): Category[] => {
  return [...categories].sort((a, b) => a.order - b.order);
};
