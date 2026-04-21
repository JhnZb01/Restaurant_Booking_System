import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarDays, Clock, Users, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { timeSlots } from '@/data/restaurants';
const BookingModal = ({ restaurant, open, onClose }) => {
    const { addBooking, isAuthenticated } = useApp();
    const [date, setDate] = useState();
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(2);
    const [specialRequests, setSpecialRequests] = useState('');
    const [step, setStep] = useState('form');
    const handleSubmit = () => {
        if (!date || !time)
            return;
        addBooking({
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantImage: restaurant.image,
            date: format(date, 'yyyy-MM-dd'),
            time,
            guests,
            status: 'confirmed',
            specialRequests: specialRequests || undefined,
        });
        setStep('success');
    };
    const handleClose = () => {
        setStep('form');
        setDate(undefined);
        setTime('');
        setGuests(2);
        setSpecialRequests('');
        onClose();
    };
    const isValid = date && time && guests > 0;
    return (<AnimatePresence>
      {open && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={handleClose}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {step === 'form' ? 'Reserve a Table' : 'Booking Confirmed!'}
                </h2>
                <p className="text-sm text-muted-foreground">{restaurant.name}</p>
              </div>
              <button onClick={handleClose} className="rounded-lg p-2 hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground"/>
              </button>
            </div>

            {step === 'form' ? (<div className="p-6 space-y-5">
                {!isAuthenticated && (<div className="rounded-xl bg-accent/10 border border-accent/30 p-3 text-sm text-accent-foreground">
                    You can book as a guest, or sign in to manage your reservations.
                  </div>)}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary"/> Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn("input-premium text-left", !date && "text-muted-foreground")}>
                        {date ? format(date, 'PPP') : 'Select a date'}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} className="p-3 pointer-events-auto"/>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary"/> Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(slot => (<button key={slot} onClick={() => setTime(slot)} className={cn("rounded-lg border px-2 py-2 text-xs font-medium transition-all", time === slot
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50")}>
                        {slot}
                      </button>))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary"/> Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="rounded-lg border border-border w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                      -
                    </button>
                    <span className="text-lg font-semibold text-foreground w-8 text-center">{guests}</span>
                    <button onClick={() => setGuests(Math.min(12, guests + 1))} className="rounded-lg border border-border w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Special Requests</label>
                  <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Any dietary restrictions or special occasions?" className="input-premium min-h-[80px] resize-none" maxLength={500}/>
                </div>

                <button onClick={handleSubmit} disabled={!isValid} className={cn("btn-premium w-full text-center", !isValid && "opacity-50 cursor-not-allowed")}>
                  Confirm Reservation
                </button>
              </div>) : (<div className="p-6 text-center space-y-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <CheckCircle2 className="h-16 w-16 text-secondary mx-auto"/>
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground">You're all set!</h3>
                <div className="rounded-xl bg-muted p-4 text-left space-y-2 text-sm">
                  <p className="text-foreground"><strong>Restaurant:</strong> {restaurant.name}</p>
                  <p className="text-foreground"><strong>Date:</strong> {date && format(date, 'PPP')}</p>
                  <p className="text-foreground"><strong>Time:</strong> {time}</p>
                  <p className="text-foreground"><strong>Guests:</strong> {guests}</p>
                  {specialRequests && <p className="text-foreground"><strong>Notes:</strong> {specialRequests}</p>}
                </div>
                <button onClick={handleClose} className="btn-premium w-full text-center">Done</button>
              </div>)}
          </motion.div>
        </motion.div>)}
    </AnimatePresence>);
};
export default BookingModal;
