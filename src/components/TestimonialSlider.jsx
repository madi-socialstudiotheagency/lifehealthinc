import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Harold Gothard",
    text: "The best of the best. I spoke with both Matthew, and Payton on different occasions, and they are both very knowledgeable, and are looking to provide Information, and the best coverage for the best price.",
    rating: 5
  },
  {
    name: "Bella Miller",
    text: "Matthew made life insurance simple and stress-free. He explained everything clearly, answered all my questions with patience, and genuinely cared about finding the right fit for me. I never felt pressured, only supported.",
    rating: 5
  },
  {
    name: "Jasmine England",
    text: "Matthew is very transparent, knowledgeable, and easy to understand. No fluff! Just straight to the point. He works hard and will do what it takes to get you approved. You can trust that you're in good hands with him.",
    rating: 5
  },
  {
    name: "Christian Buot",
    text: "Matthew was amazing! I was referred by my grandmother who he helped get life insurance. He helped me get an IUL to set up and secure a tax-free retirement. The process was easy and took under 30 mins to get approved!",
    rating: 5
  },
  {
    name: "Chris Acevedo",
    text: "Thank God for LifeHealthInc. I found myself in a situation where my employer didn't want to cover me after I got hurt. Thankfully, I came across a gentleman named Matthew who was able to get me fully covered in less than a week!",
    rating: 5
  },
  {
    name: "Ric Berger",
    text: "Matthew Anderson is very knowledgable and professional as we went over several options and provided the me with the best one that met my needs for my requested life insurance. Matthew was quick and able to meet my policy without any issues.",
    rating: 5
  },
  {
    name: "Timothy Lindgren",
    text: "Matthew went above and beyond to help educate me and find the best possible plan for my situation, all at a much better price than others I had spoken with. I highly recommend his services to anyone who values honesty and professionalism.",
    rating: 5
  },
  {
    name: "John Killeron",
    text: "I am pleased to recommend Matt, he is professional, knowledgeable, responsive and takes the time to explain coverage options clearly. He will guide you to make the right decision with zero pressure, just an outstanding person.",
    rating: 5
  },
  {
    name: "Nicole H",
    text: "Matthew was honestly very kind and super informative of his work. Every question I asked him, he responded thoroughly. Great experience.",
    rating: 5
  },
  {
    name: "Paul Sebastian",
    text: "He is very knowledgeable, patient, and genuinely listens to your concerns and questions. Definitely recommend working with Matthew Anderson for all your insurance needs.",
    rating: 5
  },
  {
    name: "Alden Swiesz",
    text: "Took excellent care of me and my family finding us comprehensive coverage within our budget. Such a pleasure to work with them!",
    rating: 5
  },
  {
    name: "Daniel Slabaugh",
    text: "I was referred by a great friend to get a hold of Matthew on my insurance needs. He was very prompt on getting me the best coverage with the least amount of out-of-pocket and also a very reasonable amount per month to pay.",
    rating: 5
  },
  {
    name: "Annie Worsham",
    text: "Matthew has been so kind throughout this process. I can't thank him enough! Went above and beyond for my family and I. THANK YOU!",
    rating: 5
  },
  {
    name: "JoAnn Sinicropi",
    text: "Matthew is a very professional & caring person. He helps you choose your best option. Thank you Matthew!",
    rating: 5
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
              <Quote className="w-12 h-12 mb-6 mx-auto" style={{color: '#FFFFFF'}} />
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{color: '#FFFFFF'}} />
                ))}
              </div>

              <p className="text-white text-lg md:text-xl text-center mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="text-center">
                <p className="font-bold text-xl text-white">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-slate-300 text-sm mt-1">Verified Google Review</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        onClick={() => paginate(-1)}
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      
      <Button
        onClick={() => paginate(1)}
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8' 
                : 'opacity-50 hover:opacity-75'
            }`}
            style={{backgroundColor: '#FFFFFF'}}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}