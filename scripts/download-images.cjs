/**
 * Food Image Downloader
 * Downloads high-quality food images from Unsplash
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Food categories with search terms
const foodImages = {
  // Breakfast
  'breakfast-1': 'ethiopian-chechebsa-honey',
  'breakfast-2': 'ethiopian-chechebsa-egg',
  'breakfast-3': 'ethiopian-breakfast-egg',
  'breakfast-4': 'ethiopian-ful-fava-beans',
  'breakfast-5': 'ethiopian-ful-breakfast',
  'breakfast-6': 'scrambled-eggs-breakfast',

  // Salads
  'salad-1': 'green-salad-fresh',
  'salad-2': 'greek-salad-feta',
  'salad-3': 'caesar-salad',
  'salad-4': 'chicken-salad',
  'salad-5': 'tuna-salad',

  // Burgers
  'burger-1': 'classic-burger-beef',
  'burger-2': 'cheese-burger-double',
  'burger-3': 'chicken-burger-crispy',
  'burger-4': 'bacon-burger',
  'burger-5': 'veggie-burger',

  // Pizza
  'pizza-1': 'margherita-pizza',
  'pizza-2': 'pepperoni-pizza',
  'pizza-3': 'hawaiian-pizza',
  'pizza-4': 'meat-lovers-pizza',
  'pizza-5': 'veggie-pizza',

  // Pasta
  'pasta-1': 'spaghetti-bolognese',
  'pasta-2': 'fettuccine-alfredo',
  'pasta-3': 'penne-arrabbiata',
  'pasta-4': 'chicken-carbonara',

  // Sandwiches
  'sandwich-1': 'club-sandwich',
  'sandwich-2': 'tuna-sandwich',
  'sandwich-3': 'chicken-wrap',
  'sandwich-4': 'veggie-wrap',

  // Cakes
  'cake-1': 'chocolate-cake-slice',
  'cake-2': 'cheesecake-slice',
  'cake-3': 'tiramisu-dessert',
  'cake-4': 'carrot-cake',
  'cake-5': 'black-forest-cake',

  // Ice Cream
  'icecream-1': 'vanilla-ice-cream',
  'icecream-2': 'chocolate-ice-cream',
  'icecream-3': 'strawberry-ice-cream',
  'icecream-4': 'mango-sorbet',

  // Drinks
  'drinks-1': 'espresso-coffee',
  'drinks-2': 'cappuccino-coffee',
  'drinks-3': 'latte-coffee',
  'drinks-4': 'americano-coffee',
  'drinks-5': 'fresh-orange-juice',
  'drinks-6': 'milkshake-chocolate',
  'drinks-7': 'soft-drink-cola',
  'drinks-8': 'bottled-water',
};

// Unsplash image URLs (using specific photo IDs for reliable images)
const unsplashImages = {
  'breakfast-1': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=400&fit=crop',
  'breakfast-2': 'https://images.unsplash.com/photo-1525351484163-7529414395d8?w=400&h=400&fit=crop',
  'breakfast-3': 'https://images.unsplash.com/photo-1482049016gy-4ba0055d3e57?w=400&h=400&fit=crop',
  'breakfast-4': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=400&fit=crop',
  'breakfast-5': 'https://images.unsplash.com/photo-1533089862017-5614ecb352ae?w=400&h=400&fit=crop',
  'breakfast-6': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=400&fit=crop',

  'salad-1': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
  'salad-2': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
  'salad-3': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop',
  'salad-4': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
  'salad-5': 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=400&fit=crop',

  'burger-1': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
  'burger-2': 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop',
  'burger-3': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop',
  'burger-4': 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop',
  'burger-5': 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop',

  'pizza-1': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
  'pizza-2': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
  'pizza-3': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
  'pizza-4': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
  'pizza-5': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',

  'pasta-1': 'https://images.unsplash.com/photo-1626844131082-256783844137?w=400&h=400&fit=crop',
  'pasta-2': 'https://images.unsplash.com/photo-1645112411341-6c4fd936714b?w=400&h=400&fit=crop',
  'pasta-3': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
  'pasta-4': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=400&fit=crop',

  'sandwich-1': 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&h=400&fit=crop',
  'sandwich-2': 'https://images.unsplash.com/photo-1550507992-eb63f0b20b65?w=400&h=400&fit=crop',
  'sandwich-3': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop',
  'sandwich-4': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop',

  'cake-1': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
  'cake-2': 'https://images.unsplash.com/photo-1524351199678-941a58a3df26?w=400&h=400&fit=crop',
  'cake-3': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop',
  'cake-4': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop',
  'cake-5': 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop',

  'icecream-1': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  'icecream-2': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  'icecream-3': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
  'icecream-4': 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=400&h=400&fit=crop',

  'drinks-1': 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
  'drinks-2': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
  'drinks-3': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
  'drinks-4': 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop',
  'drinks-5': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=400&fit=crop',
  'drinks-6': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
  'drinks-7': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop',
  'drinks-8': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
};

const imagesDir = path.join(__dirname, '../public/images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory:', imagesDir);
}

// Download image function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} already exists`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...\n');
  
  const entries = Object.entries(unsplashImages);
  let successCount = 0;
  let failCount = 0;
  
  for (const [id, url] of entries) {
    const filename = `${id}.jpg`;
    try {
      await downloadImage(url, filename);
      successCount++;
      // Small delay to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
      failCount++;
    }
  }
  
  console.log(`\n✓ Downloaded ${successCount} images`);
  if (failCount > 0) {
    console.log(`✗ Failed to download ${failCount} images`);
  }
  console.log(`\nImages saved to: ${imagesDir}`);
}

// Run the download
downloadAllImages().catch(console.error);
