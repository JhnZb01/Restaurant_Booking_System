import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';
import type { Restaurant } from '@/types';
import { useApp } from '@/contexts/AppContext';

interface Props {
  restaurant: Restaurant;
  index?: number;
}

const RestaurantCard = ({ restaurant, index = 0 }: Props) => {
  const { user, isAuthenticated, toggleFavorite } = useApp();
  const isFavorite = user?.favorites.includes(restaurant.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group card-hover rounded-2xl overflow-hidden bg-card border border-border/50"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          width={1200}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          {isAuthenticated && (
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(restaurant.id); }}
              className="rounded-full bg-card/80 backdrop-blur-sm p-2 transition-colors hover:bg-card"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : 'text-foreground'}`} />
            </button>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            {restaurant.cuisine}
          </span>
          <span className="rounded-lg bg-card/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
            {restaurant.priceRange}
          </span>
        </div>
      </div>
      <Link to={`/restaurant/${restaurant.id}`} className="block p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">{restaurant.name}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {restaurant.rating} ({restaurant.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {restaurant.location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
