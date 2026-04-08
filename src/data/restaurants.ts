import restaurant1 from '@/assets/restaurant-1.jpg';
import restaurant2 from '@/assets/restaurant-2.jpg';
import restaurant3 from '@/assets/restaurant-3.jpg';
import restaurant4 from '@/assets/restaurant-4.jpg';
import restaurant5 from '@/assets/restaurant-5.jpg';
import restaurant6 from '@/assets/restaurant-6.jpg';
import type { Restaurant } from '@/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Bella Vita',
    cuisine: 'Italian',
    rating: 4.8,
    reviewCount: 324,
    priceRange: '$$$',
    location: 'Downtown',
    address: '123 Main Street, Downtown',
    image: restaurant1,
    gallery: [restaurant1],
    description: 'Authentic Italian cuisine in a cozy brick-walled setting. Our chef brings generations of family recipes from Tuscany to your table.',
    featured: true,
    tags: ['Romantic', 'Wine Bar', 'Pasta'],
    openingHours: [
      { day: 'Mon-Thu', hours: '11:00 AM - 10:00 PM' },
      { day: 'Fri-Sat', hours: '11:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '12:00 PM - 9:00 PM' },
    ],
    menu: [
      { id: 'm1', name: 'Truffle Risotto', description: 'Arborio rice with black truffle and parmesan', price: 28, category: 'Mains' },
      { id: 'm2', name: 'Osso Buco', description: 'Braised veal shanks with gremolata', price: 36, category: 'Mains' },
      { id: 'm3', name: 'Bruschetta', description: 'Toasted bread with tomato, basil, garlic', price: 12, category: 'Starters' },
      { id: 'm4', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 14, category: 'Desserts' },
    ],
    reviews: [
      { id: 'r1', userName: 'Sarah M.', rating: 5, comment: 'Absolutely incredible pasta. Best Italian food in the city!', date: '2024-03-15', avatar: 'SM' },
      { id: 'r2', userName: 'James L.', rating: 4, comment: 'Great ambiance and food. Service could be a bit faster.', date: '2024-03-10', avatar: 'JL' },
    ],
  },
  {
    id: '2',
    name: 'Sakura Zen',
    cuisine: 'Japanese',
    rating: 4.9,
    reviewCount: 512,
    priceRange: '$$$$',
    location: 'Midtown',
    address: '456 Oak Avenue, Midtown',
    image: restaurant2,
    gallery: [restaurant2],
    description: 'A minimalist zen dining experience featuring the freshest sushi and omakase menus curated by Master Chef Tanaka.',
    featured: true,
    tags: ['Omakase', 'Sushi Bar', 'Premium'],
    openingHours: [
      { day: 'Mon-Thu', hours: '12:00 PM - 10:00 PM' },
      { day: 'Fri-Sat', hours: '12:00 PM - 11:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    menu: [
      { id: 'm5', name: 'Omakase (12 pieces)', description: "Chef's selection of premium nigiri", price: 120, category: 'Omakase' },
      { id: 'm6', name: 'Dragon Roll', description: 'Shrimp tempura, eel, avocado', price: 22, category: 'Rolls' },
      { id: 'm7', name: 'Wagyu Tataki', description: 'Seared A5 wagyu with ponzu', price: 45, category: 'Starters' },
      { id: 'm8', name: 'Matcha Mochi', description: 'Handmade green tea mochi ice cream', price: 10, category: 'Desserts' },
    ],
    reviews: [
      { id: 'r3', userName: 'Emily K.', rating: 5, comment: 'The omakase experience was transcendent. Worth every penny.', date: '2024-03-12', avatar: 'EK' },
      { id: 'r4', userName: 'David R.', rating: 5, comment: 'Best sushi I have ever had. The fish is incredibly fresh.', date: '2024-03-08', avatar: 'DR' },
    ],
  },
  {
    id: '3',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    rating: 4.7,
    reviewCount: 289,
    priceRange: '$$$',
    location: 'West End',
    address: '789 Elm Boulevard, West End',
    image: restaurant3,
    gallery: [restaurant3],
    description: 'Parisian charm meets modern elegance. Enjoy classic French cuisine with a contemporary twist in our beautiful marble-accented dining room.',
    featured: true,
    tags: ['Brunch', 'Wine Pairing', 'Elegant'],
    openingHours: [
      { day: 'Mon-Fri', hours: '8:00 AM - 10:00 PM' },
      { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '9:00 AM - 9:00 PM' },
    ],
    menu: [
      { id: 'm9', name: 'Duck Confit', description: 'Slow-cooked duck leg with roasted potatoes', price: 32, category: 'Mains' },
      { id: 'm10', name: 'French Onion Soup', description: 'Classic soup with gruyere crouton', price: 14, category: 'Starters' },
      { id: 'm11', name: 'Crème Brûlée', description: 'Vanilla bean custard with caramelized sugar', price: 12, category: 'Desserts' },
    ],
    reviews: [
      { id: 'r5', userName: 'Marie P.', rating: 5, comment: 'Feels like being in Paris! The croissants are to die for.', date: '2024-03-14', avatar: 'MP' },
    ],
  },
  {
    id: '4',
    name: 'Spice Palace',
    cuisine: 'Indian',
    rating: 4.6,
    reviewCount: 198,
    priceRange: '$$',
    location: 'East Side',
    address: '321 Spice Lane, East Side',
    image: restaurant4,
    gallery: [restaurant4],
    description: 'A regal Indian dining experience with authentic recipes from across the subcontinent. Our tandoor oven produces the most succulent dishes.',
    featured: false,
    tags: ['Tandoori', 'Vegetarian Friendly', 'Buffet'],
    openingHours: [
      { day: 'Mon-Sun', hours: '11:00 AM - 11:00 PM' },
    ],
    menu: [
      { id: 'm12', name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken', price: 18, category: 'Mains' },
      { id: 'm13', name: 'Lamb Biryani', description: 'Fragrant basmati rice with slow-cooked lamb', price: 22, category: 'Mains' },
      { id: 'm14', name: 'Samosa Platter', description: 'Crispy pastries with spiced potato filling', price: 10, category: 'Starters' },
    ],
    reviews: [
      { id: 'r6', userName: 'Raj P.', rating: 5, comment: 'Reminds me of home cooking. The biryani is exceptional!', date: '2024-03-11', avatar: 'RP' },
    ],
  },
  {
    id: '5',
    name: 'Casa del Sol',
    cuisine: 'Mexican',
    rating: 4.5,
    reviewCount: 167,
    priceRange: '$$',
    location: 'South Beach',
    address: '555 Sunset Drive, South Beach',
    image: restaurant5,
    gallery: [restaurant5],
    description: 'Vibrant Mexican flavors in a lively atmosphere. From street-style tacos to gourmet moles, every dish is a celebration.',
    featured: false,
    tags: ['Tacos', 'Margaritas', 'Lively'],
    openingHours: [
      { day: 'Mon-Thu', hours: '11:00 AM - 10:00 PM' },
      { day: 'Fri-Sun', hours: '11:00 AM - 12:00 AM' },
    ],
    menu: [
      { id: 'm15', name: 'Tacos al Pastor', description: 'Marinated pork with pineapple and cilantro', price: 14, category: 'Mains' },
      { id: 'm16', name: 'Guacamole Fresco', description: 'Made tableside with ripe avocados', price: 12, category: 'Starters' },
      { id: 'm17', name: 'Churros', description: 'Cinnamon sugar churros with chocolate sauce', price: 8, category: 'Desserts' },
    ],
    reviews: [
      { id: 'r7', userName: 'Carlos G.', rating: 4, comment: 'Authentic flavors! The margaritas are the best in town.', date: '2024-03-09', avatar: 'CG' },
    ],
  },
  {
    id: '6',
    name: 'Aegean Terrace',
    cuisine: 'Mediterranean',
    rating: 4.8,
    reviewCount: 256,
    priceRange: '$$$',
    location: 'Harbor View',
    address: '888 Ocean Blvd, Harbor View',
    image: restaurant6,
    gallery: [restaurant6],
    description: 'Breathtaking ocean views paired with fresh Mediterranean seafood. Our rooftop terrace is the perfect setting for sunset dining.',
    featured: true,
    tags: ['Seafood', 'Rooftop', 'Sunset Views'],
    openingHours: [
      { day: 'Mon-Sun', hours: '12:00 PM - 11:00 PM' },
    ],
    menu: [
      { id: 'm18', name: 'Grilled Octopus', description: 'Char-grilled with lemon, capers, olive oil', price: 26, category: 'Starters' },
      { id: 'm19', name: 'Seafood Platter', description: 'Lobster, prawns, mussels, and grilled fish', price: 58, category: 'Mains' },
      { id: 'm20', name: 'Baklava', description: 'Honey-soaked phyllo with pistachios', price: 10, category: 'Desserts' },
    ],
    reviews: [
      { id: 'r8', userName: 'Anna S.', rating: 5, comment: 'The sunset views combined with amazing seafood — unforgettable!', date: '2024-03-13', avatar: 'AS' },
    ],
  },
];

export const cuisineTypes = ['All', 'Italian', 'Japanese', 'French', 'Indian', 'Mexican', 'Mediterranean'];
export const priceRanges = ['All', '$', '$$', '$$$', '$$$$'];
export const locations = ['All', 'Downtown', 'Midtown', 'West End', 'East Side', 'South Beach', 'Harbor View'];
export const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];
