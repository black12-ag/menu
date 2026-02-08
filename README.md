# 🍽️ Restaurant Menu - Interactive 3D Food Builder

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A modern, bilingual (English/Amharic) restaurant menu web application with an interactive 3D burger builder, featuring Ethiopian traditional dishes and international cuisine.**

🌐 **Live Demo**: [https://restaurant-menu-demo.netlify.app](https://restaurant-menu-demo.netlify.app)

---

## ✨ Features

### 🍔 Interactive 3D Burger Builder

- **Visual Layer System**: See your burger being built in real-time with animated layers
- **Add/Remove Ingredients**: Customize your burger with lettuce, tomato, cheese, onions, pickles
- **Double Burger Option**: Toggle double patty with extra cheese (+85 ETB)
- **Real-time Price Calculation**: Watch the price update as you add ingredients
- **Bilingual Interface**: English and Amharic (አማርኛ) support

### 🍲 Ethiopian Traditional Dishes

- **Sarma** - Grape leaves stuffed with rice and spices
- **Injera with Doro Wat** - Spicy chicken stew
- **Injera with Key Wat** - Spicy beef stew
- **Tibs** - Sautéed beef/lamb with onions and peppers
- **Kitfo** - Ethiopian steak tartare
- **Shiro** - Chickpea flour stew
- **Gomen** - Collard greens
- And more!

### 🍗 Chicken Dishes

- Grilled Chicken Breast
- Crispy Fried Chicken
- Chicken Wings
- Chicken Tikka
- Chicken Alfredo
- And more!

### 📱 Mobile-First Design

- Fully responsive layout optimized for mobile phones
- Touch-friendly interface
- Fast loading with optimized images
- Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

| Technology            | Purpose         |
| --------------------- | --------------- |
| **React 18**          | UI Library      |
| **TypeScript**        | Type Safety     |
| **Vite**              | Build Tool      |
| **Tailwind CSS**      | Styling         |
| **Framer Motion**     | Animations      |
| **React Router**      | Navigation      |
| **Netlify Functions** | Backend API     |
| **Netlify**           | Hosting & CI/CD |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/black12-ag/menu.git

# Navigate to project directory
cd menu

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
cinema-cafe-menu/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── netlify/
│   └── functions/
│       └── create-order.ts     # Netlify Function for orders
├── public/
│   └── images/                 # Food images
├── src/
│   ├── components/
│   │   ├── BurgerBuilder/      # Interactive burger builder
│   │   ├── Header/             # Navigation header
│   │   └── ...
│   ├── data/
│   │   ├── menuData.ts         # Menu items data
│   │   └── categories.ts       # Categories data
│   ├── pages/
│   │   ├── HomePage/           # Landing page
│   │   ├── MenuPage/           # Menu listing
│   │   └── ItemDetailPage/     # Item details + burger builder
│   ├── services/
│   │   └── orderService.ts     # Order management
│   └── types/                  # TypeScript types
├── netlify.toml                # Netlify configuration
└── README.md                   # This file
```

---

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** for continuous deployment to **Netlify**:

1. Push to `main` branch triggers deployment
2. GitHub Actions builds the project
3. Automatic deployment to Netlify
4. Live site updated instantly

---

## 📝 API Endpoints

### Create Order

```http
POST /.netlify/functions/create-order
Content-Type: application/json

{
  "items": [
    {
      "id": "burger-1",
      "name": "Classic Burger",
      "price": 395,
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "phone": "+251911234567",
  "notes": "Extra spicy please"
}
```

**Response:**

```json
{
  "success": true,
  "order": {
    "orderId": "ORD-ABC123-XYZ",
    "tableNumber": 15,
    "total": 790,
    "status": "pending"
  }
}
```

---

## 🎨 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Menu with Categories

![Menu](screenshots/menu.png)

### Interactive Burger Builder

![Burger Builder](screenshots/burger-builder.png)

### Ethiopian Dishes

![Ethiopian](screenshots/ethiopian.png)

---

## 🌟 Key Features Explained

### Burger Builder Animation System

The burger builder uses **Framer Motion** for smooth layer animations:

- Layers animate in with spring physics when added
- Layers slide out when removed
- Double burger adds extra patty with "2x" indicator

### Bilingual Support

All menu items include both English and Amharic:

```typescript
{
  name: "Cheese Burger",
  nameAm: "ቺዝ በርገር",
  description: "Double cheese burger",
  descriptionAm: "ድርብ ቺዝ በርገር"
}
```

### Order Generation

Each order gets:

- Unique Order ID (e.g., `ORD-ABC123-XYZ`)
- Random Table Number (1-50)
- Timestamp
- Total calculation

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Black12** - [GitHub](https://github.com/black12-ag)

---

## 🙏 Acknowledgments

- Food images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Ethiopian food descriptions inspired by traditional recipes

---

<div align="center">

### 🍽️ Enjoy Your Meal! 🍽️

**[⬆ Back to Top](#-restaurant-menu---interactive-3d-food-builder)**

</div>
