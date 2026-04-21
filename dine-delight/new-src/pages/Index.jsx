import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Search } from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';
import { restaurants } from '@/data/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (<div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Fine dining ambiance" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background"/>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
            Discover & Book<br />
            <span className="gradient-text">Exceptional Dining</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Reserve tables at the finest restaurants in your city. Unforgettable experiences await.
          </motion.p>
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} onSubmit={handleSearch} className="flex items-center gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search restaurants, cuisines..." className="input-premium pl-12" maxLength={100}/>
            </div>
            <button type="submit" className="btn-premium flex items-center gap-2">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
            { label: 'Restaurants', value: '200+' },
            { label: 'Happy Diners', value: '50K+' },
            { label: 'Cities', value: '12' },
            { label: 'Avg Rating', value: '4.7★' },
        ].map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Cuisine Sections */}
      {['Italian', 'Japanese', 'French', 'Indian', 'Mexican', 'Mediterranean'].map((cuisineName) => {
            const cuisineRestaurants = restaurants.filter(r => r.cuisine === cuisineName);
            if (cuisineRestaurants.length === 0)
                return null;
            return (<section key={cuisineName} className="py-12 container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">{cuisineName} Traditional Cuisine</h2>
                <p className="text-muted-foreground mt-1">Experience the authentic flavors of {cuisineName} culture</p>
              </div>
              <Link to={`/restaurants?search=${cuisineName}`} className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View All <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuisineRestaurants.slice(0, 4).map((r, i) => (<RestaurantCard key={r.id} restaurant={r} index={i}/>))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link to={`/restaurants?search=${cuisineName}`} className="btn-premium inline-flex items-center gap-2">
                View All {cuisineName} <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
          </section>);
        })}

      {/* How it works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            { icon: Search, title: 'Discover', desc: 'Browse top-rated restaurants by cuisine, location, or mood.' },
            { icon: Star, title: 'Choose', desc: 'View menus, photos, reviews, and find your perfect spot.' },
            { icon: MapPin, title: 'Reserve', desc: 'Book your table instantly with real-time availability.' },
        ].map((item, i) => (<Link to="/restaurants" key={item.title}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-8 h-full hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="h-7 w-7 text-primary group-hover:text-inherit"/>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              </Link>))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Dine Delight. All rights reserved.</p>
        </div>
      </footer>
    </div>);
};
export default HomePage;
