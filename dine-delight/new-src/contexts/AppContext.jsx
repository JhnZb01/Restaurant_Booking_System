import React, { createContext, useContext, useState, useCallback } from 'react';
const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const login = useCallback((email, _password) => {
        setUser({
            id: '1',
            name: email.split('@')[0],
            email,
            favorites: [],
        });
    }, []);
    const signup = useCallback((name, email, _password) => {
        setUser({ id: '1', name, email, favorites: [] });
    }, []);
    const logout = useCallback(() => {
        setUser(null);
    }, []);
    const addBooking = useCallback((booking) => {
        const newBooking = {
            ...booking,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setBookings(prev => [newBooking, ...prev]);
    }, []);
    const cancelBooking = useCallback((id) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }, []);
    const toggleFavorite = useCallback((restaurantId) => {
        setUser(prev => {
            if (!prev)
                return prev;
            const favs = prev.favorites.includes(restaurantId)
                ? prev.favorites.filter(f => f !== restaurantId)
                : [...prev.favorites, restaurantId];
            return { ...prev, favorites: favs };
        });
    }, []);
    return (<AppContext.Provider value={{ user, bookings, isAuthenticated: !!user, login, signup, logout, addBooking, cancelBooking, toggleFavorite }}>
      {children}
    </AppContext.Provider>);
};
export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error('useApp must be used within AppProvider');
    return ctx;
};
