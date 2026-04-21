import { motion } from 'framer-motion';
import { CalendarDays, Clock, Users, X, AlertCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { bookings, cancelBooking, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center glass-card p-10">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Sign in required</h2>
          <p className="text-muted-foreground mb-4">Please sign in to view your bookings.</p>
          <Link to="/login" className="btn-premium inline-block">Sign In</Link>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground mb-8">Manage your restaurant reservations</p>
        </motion.div>

        {bookings.length === 0 ?
        <div className="text-center py-16 glass-card">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">Start exploring restaurants and make your first reservation!</p>
            <Link to="/restaurants" className="btn-premium inline-block">Browse Restaurants</Link>
          </div> :

        <div className="space-y-4">
            {bookings.map((booking, i) =>
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden">
            
                <div className="flex flex-col sm:flex-row">
                  <img
                src={booking.restaurantImage}
                alt={booking.restaurantName}
                className="w-full sm:w-32 h-32 object-cover"
                loading="lazy"
                width={128}
                height={128} />
              
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{booking.restaurantName}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {booking.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {booking.time}</span>
                          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {booking.guests} guests</span>
                        </div>
                      </div>
                      <span className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    booking.status === 'confirmed' ? 'bg-secondary/10 text-secondary' :
                    booking.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                    'bg-accent/10 text-accent-foreground'
                  )}>
                        {booking.status}
                      </span>
                    </div>
                    {booking.status === 'confirmed' &&
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="mt-3 flex items-center gap-1 text-xs text-destructive hover:underline">
                  
                        <X className="h-3.5 w-3.5" /> Cancel Reservation
                      </button>
                }
                  </div>
                </div>
              </motion.div>
          )}
          </div>
        }
      </div>
    </div>);

};

export default Dashboard;