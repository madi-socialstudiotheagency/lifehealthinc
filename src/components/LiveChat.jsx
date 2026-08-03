import { useState } from 'react';
import { Calendar, X } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The floating chat bubble button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all hover:scale-110 z-50 w-16 h-16 flex items-center justify-center"
        aria-label={isOpen ? "Close Booking" : "Book Appointment"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
      </button>

      {/* The Modal containing the GHL form */}
      {isOpen && (
        <div className="fixed bottom-26 left-6 w-[calc(100%-3rem)] sm:w-96 h-[80vh] max-h-[600px] bg-white rounded-xl shadow-2xl z-50 border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-4 bg-slate-50 border-b border-slate-200 rounded-t-xl flex-shrink-0">
            <h3 className="font-bold text-slate-800">Book a Quick Call</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-800" aria-label="Close booking modal">
                <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow w-full h-full">
            <iframe
                src="https://api.leadconnectorhq.com/widget/booking/zAy1c6lp4SLPJspafNxY"
                style={{width:'100%',height:'100%',border:'none'}}
                id="chat_booking_widget"
                title="Book a Call"
            >
            </iframe>
          </div>
        </div>
      )}
    </>
  );
}