import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants, cuisineTypes, priceRanges } from '@/data/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import { cn } from '@/lib/utils';

const RestaurantsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [cuisine, setCuisine] = useState('All');
  const [price, setPrice] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const handleSearch = useCallback((q) => setSearch(q), []);

  const filtered = useMemo(() => {
    let result = restaurants.filter((r) => {
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
      const matchCuisine = cuisine === 'All' || r.cuisine === cuisine;
      const matchPrice = price === 'All' || r.priceRange === price;
      return matchSearch && matchCuisine && matchPrice;
    });
    result.sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a.name.localeCompare(b.name));
    return result;
  }, [search, cuisine, price, sortBy]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Explore Restaurants</h1>
          <p className="text-muted-foreground">Find your next dining experience</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((c) =>
              <button
                key={c}
                onClick={() => setCuisine(c)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-medium transition-all border",
                  cuisine === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/50"
                )}>
                
                  {c}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((p) =>
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-medium transition-all border",
                  price === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/50"
                )}>
                
                  {p}
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
              
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ?
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No restaurants found. Try adjusting your filters.</p>
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) =>
          <RestaurantCard key={r.id} restaurant={r} index={i} />
          )}
          </div>
        }
      </div>
    </div>);

};

export default RestaurantsPage;