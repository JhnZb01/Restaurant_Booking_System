import { motion } from 'framer-motion';
import { UtensilsCrossed, Star, Users, MapPin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <UtensilsCrossed className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">About Dine Delight</h1>
          <p className="text-lg text-muted-foreground">Elevating your dining experiences across the city.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 md:p-12 mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Founded with a passion for exceptional culinary experiences, Dine Delight was born from a simple idea: making it effortless to discover and reserve tables at the finest restaurants. We believe that a great meal is more than just food; it's about the ambiance, the service, and the memories created around the table.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we partner with top-rated restaurants, hidden gems, and iconic eateries to provide our users with unparalleled access to the best dining the city has to offer. Whether it's a romantic dinner, a business lunch, or a family gathering, Dine Delight is your trusted companion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Community First', desc: 'Connecting food lovers with passionate chefs.' },
            { icon: Star, title: 'Quality Assured', desc: 'Curated selection of highly-rated restaurants.' },
            { icon: MapPin, title: 'Local Discovery', desc: 'Find the best spots in your neighborhood.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
