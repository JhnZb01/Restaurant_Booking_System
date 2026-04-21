import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Heart, CalendarDays, UtensilsCrossed } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/restaurants', label: 'Restaurants' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, isAuthenticated, logout } = useApp();
    const location = useLocation();
    return (<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary"/>
          <span className="font-display text-xl font-bold text-foreground">Dine Delight</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (<Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}>
              {link.label}
            </Link>))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (<div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80">
                <User className="h-4 w-4"/>
                {user?.name}
              </button>
              <AnimatePresence>
                {profileOpen && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-lg overflow-hidden">
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                      <CalendarDays className="h-4 w-4"/> My Bookings
                    </Link>
                    <Link to="/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4"/> Favorites
                    </Link>
                    <button onClick={() => { logout(); setProfileOpen(false); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-destructive hover:bg-muted transition-colors">
                      <LogOut className="h-4 w-4"/> Sign Out
                    </button>
                  </motion.div>)}
              </AnimatePresence>
            </div>) : (<Link to="/login" className="btn-premium text-sm">Sign In</Link>)}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden bg-background border-b border-border">
            <div className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map(link => (<Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground py-2">
                  {link.label}
                </Link>))}
              {isAuthenticated ? (<>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground py-2">My Bookings</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm font-medium text-destructive py-2 text-left">Sign Out</button>
                </>) : (<Link to="/login" onClick={() => setMobileOpen(false)} className="btn-premium text-sm text-center">Sign In</Link>)}
            </div>
          </motion.div>)}
      </AnimatePresence>
    </nav>);
};
export default Navbar;
