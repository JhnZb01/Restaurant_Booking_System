import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Booking, User } from '@/types';

interface AppContextType {
  user: User | null;
  bookings: Booking[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
  toggleFavorite: (restaurantId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const login = useCallback((email: string, _password: string) => {
    setUser({
      id: '1',
      name: email.split('@')[0],
      email,
      favorites: [],
    });
  }, []);

  const signup = useCallback((name: string, email: string, _password: string) => {
    setUser({ id: '1', name, email, favorites: [] });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addBooking = useCallback((booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
  }, []);

  const toggleFavorite = useCallback((restaurantId: string) => {
    setUser(prev => {
      if (!prev) return prev;
      const favs = prev.favorites.includes(restaurantId)
        ? prev.favorites.filter(f => f !== restaurantId)
        : [...prev.favorites, restaurantId];
      return { ...prev, favorites: favs };
    });
  }, []);

  return (
    <AppContext.Provider value={{ user, bookings, isAuthenticated: !!user, login, signup, logout, addBooking, cancelBooking, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
