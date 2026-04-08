import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ArrowLeft, Heart, Users } from 'lucide-react';
import { restaurants } from '@/data/restaurants';
import { useApp } from '@/contexts/AppContext';
import BookingModal from '@/components/BookingModal';
import { cn } from '@/lib/utils';

const RestaurantDetails = () => {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const { user, isAuthenticated, toggleFavorite } = useApp();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');

  if (!restaurant) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Restaurant not found</h2>
          <Link to="/restaurants" className="text-primary hover:underline">Back to restaurants</Link>
        </div>
      </div>
    );
  }

  const isFavorite = user?.favorites.includes(restaurant.id);
  const menuCategories = [...new Set(restaurant.menu.map(m => m.category))];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-20 left-4 md:left-8">
          <Link to="/restaurants" className="glass-card flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-card transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl font-bold text-foreground">{restaurant.name}</h1>
                {isAuthenticated && (
                  <button onClick={() => toggleFavorite(restaurant.id)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {restaurant.rating} ({restaurant.reviewCount} reviews)</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.address}</span>
                <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{restaurant.cuisine}</span>
                <span className="font-medium text-foreground">{restaurant.priceRange}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">{restaurant.description}</p>
            </div>
            <button onClick={() => setBookingOpen(true)} className="btn-premium whitespace-nowrap flex items-center gap-2">
              <Users className="h-4 w-4" /> Reserve Table
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          {(['menu', 'reviews', 'info'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors capitalize border-b-2",
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-16">
          {activeTab === 'menu' && (
            <div className="space-y-8">
              {menuCategories.map(cat => (
                <div key={cat}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">{cat}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restaurant.menu.filter(m => m.category === cat).map(item => (
                      <div key={item.id} className="glass-card p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <span className="font-semibold text-primary ml-4">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {restaurant.reviews.map(review => (
                <div key={review.id} className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.userName}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-accent text-accent' : 'text-border'}`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="glass-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Opening Hours
              </h3>
              <div className="space-y-2">
                {restaurant.openingHours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{h.day}</span>
                    <span className="text-muted-foreground">{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Location
                </h3>
                <p className="text-sm text-muted-foreground">{restaurant.address}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <BookingModal restaurant={restaurant} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default RestaurantDetails;
