import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { UtensilsCrossed, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (mode === 'login') {
      login(email, password);
      toast.success('Welcome back!');
    } else {
      signup(name, email, password);
      toast.success('Account created!');
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">TableCraft</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === 'login' ? 'Sign in to manage your reservations' : 'Join us for exceptional dining'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                className="input-premium pl-11"
                maxLength={100}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="input-premium pl-11"
              maxLength={255}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="input-premium pl-11"
              maxLength={128}
            />
          </div>
          <button type="submit" className="btn-premium w-full text-center">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary font-medium hover:underline">
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
