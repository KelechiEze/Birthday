import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Star, 
  Quote, 
  Phone, 
  Image as ImageIcon,
  Award,
  Users,
  MapPin,
  MessageCircle,
  Lightbulb,
  Music,
  Menu,
  X
} from 'lucide-react';
import { CountdownTime, Achievement, Memory, Tribute } from './types';

// --- Confetti Utility ---
const triggerConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#B8860B', '#F4D03F', '#7A5C12', '#FFFFFF', '#FFD700'];

  const createPiece = () => {
    const piece = document.createElement('div');
    const size = Math.random() * 10 + 5 + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    piece.style.width = size;
    piece.style.height = size;
    piece.style.backgroundColor = color;
    piece.style.position = 'fixed';
    piece.style.bottom = '-20px';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.zIndex = '9999';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.pointerEvents = 'none';
    
    document.body.appendChild(piece);

    const destinationY = -100 - Math.random() * 100 + 'vh';
    const destinationX = (Math.random() - 0.5) * 400 + 'px';
    
    const animation = piece.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destinationX}, ${destinationY}) rotate(${Math.random() * 1000}deg)`, opacity: 0 }
    ], {
      duration: 1500 + Math.random() * 1500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => piece.remove();
  };

  const interval = setInterval(() => {
    if (Date.now() > animationEnd) {
      clearInterval(interval);
      return;
    }
    for (let i = 0; i < 5; i++) createPiece();
  }, 50);
};

// --- Birthday Confetti Function ---
const createBirthdayConfetti = () => {
  const colors = ['#B8860B', '#F4D03F', '#FFD700', '#FFFFFF', '#FF6B6B', '#45B7D1'];
  const confettiCount = 200;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 12 + 8 + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.width = size;
    confetti.style.height = size;
    confetti.style.backgroundColor = color;
    confetti.style.position = 'fixed';
    confetti.style.top = '-20px';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.zIndex = '99999';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);

    const destinationY = 100 + Math.random() * 100 + 'vh';
    const destinationX = (Math.random() - 0.5) * 300 + 'px';
    const rotation = Math.random() * 720;
    
    const animation = confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destinationX}, ${destinationY}) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => confetti.remove();
  }
};

// --- Sub-components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollTo = (id: string) => {
    triggerConfetti();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleSeeMore = () => {
    triggerConfetti();
    setTimeout(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-[#B8860B]/30 transition-layout">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-8 h-8 bg-[#B8860B] rounded-lg flex items-center justify-center">
            <Heart className="text-black w-5 h-5 fill-black" />
          </div>
          <span className="text-xl font-bold tracking-tight font-serif text-white">Happy <span className="text-[#B8860B]">Birthday</span></span>
        </div>
        
        {/* Mobile Toggle */}
        <button className="lg:hidden text-[#B8860B] p-2" onClick={() => { triggerConfetti(); setIsOpen(!isOpen); }}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
          {['about', 'timeline', 'gallery', 'wisdom', 'tributes'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#B8860B] transition-colors capitalize">
              {id === 'about' ? 'Our Hero' : id}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleSeeMore}
          className="hidden lg:flex bg-[#B8860B] hover:bg-[#C5A028] text-black px-6 py-2.5 rounded-full text-sm font-bold items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B8860B]/20"
        >
          See More <Star className="w-4 h-4 fill-black" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black border-t border-[#B8860B]/20 p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {['about', 'timeline', 'gallery', 'wisdom', 'tributes'].map((id) => (
            <button 
              key={id} 
              onClick={() => scrollTo(id)} 
              className="block w-full text-left text-gray-300 hover:text-[#B8860B] py-3 border-b border-white/5 capitalize text-lg"
            >
              {id === 'about' ? 'Our Hero' : id}
            </button>
          ))}
          <button 
            onClick={handleSeeMore}
            className="w-full bg-[#B8860B] text-black py-4 rounded-full font-bold text-center mt-4"
          >
            See More
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  const [buttonText, setButtonText] = useState('View Guest Book');
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [hasUnveiled, setHasUnveiled] = useState(false);

  // Reset on page reload - check for page refresh
  useEffect(() => {
    // Check if this is a page reload by looking for performance navigation
    const isPageReload = performance.navigation.type === performance.navigation.TYPE_RELOAD ||
                        performance.getEntriesByType('navigation')[0]?.type === 'reload';
    
    // Also check if we have a session flag for current session
    const sessionViewed = sessionStorage.getItem('currentSessionHasUnveiled');
    
    if (isPageReload || !sessionViewed) {
      // Reset for new session/page reload
      localStorage.removeItem('hasUnveiledPresent');
      sessionStorage.removeItem('currentSessionHasUnveiled');
      setHasUnveiled(false);
      setButtonText('Click to Unveil Present');
    } else {
      // Check localStorage for previous unveil
      const unveiled = localStorage.getItem('hasUnveiledPresent');
      if (unveiled === 'true') {
        setHasUnveiled(true);
        setButtonText('View Guest Book');
      } else {
        setButtonText('Click to Unveil Present');
      }
    }

    // Mark this session as having checked
    sessionStorage.setItem('currentSessionHasUnveiled', 'true');
  }, []);

  // Add CSS for confetti animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      @keyframes scale-in {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .animate-scale-in {
        animation: scale-in 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (!hasUnveiled) {
      // First click - show birthday surprise
      unveilPresent();
    } else {
      // Already unveiled - scroll to tributes
      scrollTo('tributes');
    }
  };

  const unveilPresent = () => {
    // Change button text
    setButtonText('🎁 Unveiling...');
    
    // Create birthday confetti
    createBirthdayConfetti();
    
    // Show birthday message after a short delay
    setTimeout(() => {
      setShowBirthdayMessage(true);
    }, 1000);
    
    // Store in localStorage and sessionStorage
    localStorage.setItem('hasUnveiledPresent', 'true');
    sessionStorage.setItem('currentSessionHasUnveiled', 'true');
    setHasUnveiled(true);
  };

  const closeBirthdayMessage = () => {
    setShowBirthdayMessage(false);
    setButtonText('View Guest Book');
  };

  const scrollTo = (id: string) => {
    triggerConfetti();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-28 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden bg-black">
      {/* Birthday Message Overlay */}
      {showBirthdayMessage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-[#B8860B] via-[#D4AF37] to-[#FFD700] p-1 rounded-3xl max-w-md mx-4 animate-scale-in">
            <div className="bg-black rounded-2xl p-8 md:p-12 text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Happy Birthday Dad!</h2>
              <p className="text-gray-300 mb-6 text-lg">Wishing you a day filled with joy, love, and blessings!</p>
              <button 
                onClick={closeBirthdayMessage}
                className="bg-[#B8860B] hover:bg-[#C5A028] text-black px-8 py-3 rounded-full font-bold transition-all text-lg transform hover:scale-105 active:scale-95"
              >
                Continue Celebration
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#B8860B]/10 blur-[120px] rounded-full -mr-32 md:-mr-64 -mt-32 md:-mt-64"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8 relative z-10 text-center lg:text-left transition-layout">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[#B8860B] font-semibold uppercase tracking-widest text-[10px] md:text-xs">
            <Star className="w-4 h-4 fill-[#B8860B]" />
            A Golden Celebration of Life
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-serif text-white">
            Honoring a <br className="hidden md:block" />
            <span className="gold-text">Golden Soul.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Join us as we celebrate the life and legacy of our dear Father. 
            A man of immense strength, grace, and eternal wisdom, born on January 31st.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button 
              onClick={handleButtonClick}
              className="bg-[#B8860B] hover:bg-[#C5A028] text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#B8860B]/30 text-lg transform hover:scale-105 active:scale-95"
            >
              {buttonText} <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollTo('timeline')}
              className="border border-[#B8860B]/40 hover:bg-[#B8860B]/10 text-[#B8860B] px-8 py-4 rounded-full font-bold transition-all text-lg transform hover:scale-105 active:scale-95"
            >
              See His History
            </button>
          </div>
        </div>
        
        <div className="relative mt-12 lg:mt-0 px-2 md:px-0">
          <div className="relative z-10 rounded-3xl overflow-hidden border-4 md:border-8 border-white/5 shadow-2xl transform lg:rotate-2">
            <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad1.jpeg" alt="Father Profile" className="w-full object-cover aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
          </div>
          <div className="hidden lg:block absolute -bottom-10 -left-10 z-20 w-56 h-56 rounded-2xl overflow-hidden border-4 border-[#B8860B] shadow-xl transform -rotate-6">
            <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad7.jpeg" alt="Father Moment" className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block absolute -top-6 -right-6 z-20 w-40 h-40 rounded-full overflow-hidden border-4 border-[#B8860B] shadow-xl">
            <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad2.jpeg" alt="Family" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/2 -right-12 w-24 h-24 bg-[#B8860B]/20 rounded-full blur-2xl opacity-50 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const year = new Date().getMonth() === 0 && new Date().getDate() > 31 ? new Date().getFullYear() + 1 : new Date().getFullYear();
    const difference = +new Date(`${year}-01-31T00:00:00`) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div id="countdown" className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-12 mb-16 md:mb-20 relative z-30 transition-layout scroll-mt-24">
      <div className="bg-[#111111] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-14 shadow-2xl border border-[#B8860B]/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 font-serif text-white">Counting Down To</h3>
          <p className="text-[#B8860B] text-sm md:text-lg font-medium tracking-wide">January 31st Celebration</p>
          <div className="mt-4 h-px w-full bg-[#B8860B]/20 hidden md:block"></div>
        </div>
        <div className="grid grid-cols-4 gap-4 md:gap-14">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-7xl font-black mb-1 text-white">{String(item.value).padStart(2, '0')}</div>
              <div className="text-[#B8860B] text-[10px] md:text-sm font-bold uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
 const milestones = [
    { year: '1961', title: 'The Beginning', desc: 'A future legend was born on a cold January morning.' },
    { year: '1997', title: 'First Child', desc: 'Had his first child Emmanuel, beginning his journey as a father.' },
    { year: '2000', title: 'Second Child', desc: 'Had his second child Kelechi, expanding his loving family.' },
    { year: '2001', title: 'Third Child', desc: 'Had his third child Onyinye, completing his beautiful family.' },
    { year: 'Today', title: 'Legacy', desc: 'The pillar of our home, radiating love and strength.' }
  ];

  return (
    <section id="timeline" className="py-16 md:py-32 px-4 md:px-6 bg-black relative">
       <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-20 px-2">
          <div className="text-[#B8860B] font-bold tracking-widest uppercase text-xs mb-4">A Life's Journey</div>
          <h2 className="text-3xl md:text-6xl font-black font-serif gold-text">Timeline of Greatness</h2>
        </div>
        <div className="relative border-l-2 border-[#B8860B]/40 ml-4 md:mx-auto max-w-2xl transition-layout">
          {milestones.map((m, i) => (
            <div key={i} className="mb-12 md:mb-16 ml-8 md:ml-12 relative">
              <div className="absolute -left-[35px] md:-left-[55px] top-0 w-4 h-4 md:w-8 md:h-8 rounded-full bg-black border-2 border-[#B8860B] shadow-[0_0_20px_#B8860B]"></div>
              <div className="bg-[#111111] p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-[#B8860B]/20 hover:border-[#B8860B]/60 transition-all">
                <div className="text-[#B8860B] font-black text-2xl md:text-3xl mb-1">{m.year}</div>
                <h4 className="text-white font-bold text-xl md:text-2xl mb-3 font-serif">{m.title}</h4>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImageCarousel: React.FC = () => {
  const row1Images = [
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad2.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad1.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad4.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad5.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad8.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad8.jpeg",
  ];
  
  const row2Images = [
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad6.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad8.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad7.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad3.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad2.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad4.jpeg",
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-black overflow-hidden transition-layout scroll-mt-24">
      <div className="text-center mb-16 md:mb-24 px-4">
        <div className="text-[#B8860B] font-bold tracking-widest uppercase text-xs mb-4">Visual Legacy</div>
        <h2 className="text-3xl md:text-6xl font-black font-serif gold-text">A Lifetime Captured</h2>
      </div>
      
      {/* Row 1 - Left to Right */}
      <div className="relative flex overflow-hidden mb-0">
        <div className="flex animate-marquee-ltr whitespace-nowrap">
          {[...row1Images, ...row1Images, ...row1Images].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-56 h-56 md:w-96 md:h-96 overflow-hidden">
              <img src={img} className="w-full h-full object-cover border border-[#B8860B]/10 hover:border-[#B8860B]/40 transition-all duration-700" alt={`Memory ${i}`} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Row 2 - Right to Left */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee-rtl whitespace-nowrap">
          {[...row2Images, ...row2Images, ...row2Images].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-56 h-56 md:w-96 md:h-96 overflow-hidden">
              <img src={img} className="w-full h-full object-cover border border-[#B8860B]/10 hover:border-[#B8860B]/40 transition-all duration-700" alt={`Memory ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WisdomCorner: React.FC = () => {
 const words = [
    { 
      text: "Let your yes be yes and your no be no. Whatever is more than this comes from evil.", 
      category: "Character",
      reference: "Matthew 5:37"
    },
    { 
      text: "Do not be anxious about anything, but in every situation, present your requests to God.", 
      category: "Approach",
      reference: "Philippians 4:6"
    },
    { 
      text: "Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain.", 
      category: "Unity",
      reference: "Psalm 127:1"
    },
    { 
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", 
      category: "Virtue",
      reference: "1 Corinthians 13:4"
    }
  ];

  return (
    <section id="wisdom" className="py-20 md:py-32 px-4 md:px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="text-center md:text-left transition-layout">
            <div className="text-[#B8860B] font-bold tracking-widest uppercase text-xs mb-4">Golden Advice</div>
            <h2 className="text-3xl md:text-6xl font-black font-serif gold-text">The Wisdom Vault</h2>
          </div>
          <p className="text-gray-400 max-w-sm text-center md:text-left mx-auto md:mx-0 text-base md:text-lg">Timeless principles and lessons passed down through sixty-three golden years.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-layout">
          {words.map((w, i) => (
            <div key={i} className="group p-8 md:p-10 bg-[#111111] rounded-2xl md:rounded-[2.5rem] border border-[#B8860B]/20 hover:bg-[#B8860B] transition-all duration-700 cursor-pointer" onClick={() => triggerConfetti()}>
              <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-[#B8860B] group-hover:text-black mb-6 md:mb-8 transition-colors" />
              <div className="text-[10px] md:text-xs uppercase font-bold text-[#B8860B] group-hover:text-black mb-4 tracking-wider transition-colors">{w.category}</div>
              <p className="text-gray-200 font-serif italic text-lg md:text-xl group-hover:text-black leading-relaxed transition-colors duration-500">"{w.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LegacySection: React.FC = () => {
  const achievements: Achievement[] = [
    { value: '63', label: 'Golden Years' },
    { value: '∞', label: 'Heart & Soul' },
    { value: '100%', label: 'Strength' },
    { value: 'Legend', label: 'Status' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1 relative transition-layout">
            <div className="rounded-2xl md:rounded-[3rem] overflow-hidden border border-[#B8860B]/40 shadow-2xl relative">
              <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad1.jpeg" alt="About Dad" className="w-full object-cover aspect-video md:aspect-auto" />
              <div className="absolute top-6 left-6 bg-[#B8860B] p-3 md:p-4 rounded-xl shadow-lg cursor-pointer" onClick={() => triggerConfetti()}>
                <Award className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-2 md:-bottom-12 md:-right-8 bg-[#111111] p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-[#B8860B]/40 w-44 md:w-72 cursor-pointer" onClick={() => triggerConfetti()}>
              <div className="text-[#B8860B] text-3xl md:text-5xl font-black mb-1">63rd</div>
              <div className="text-[10px] md:text-sm font-bold uppercase text-gray-500">Milestone Birthday</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8 md:space-y-12 text-center lg:text-left transition-layout">
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#B8860B] font-bold uppercase tracking-widest text-xs">
              <div className="w-10 md:w-16 h-[2px] bg-[#B8860B]"></div>
              The Hero
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-serif gold-text">
              A Life Defined <br className="hidden md:block" />
              by Pure Excellence.
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-xl font-light">
              Our Father is the foundation of every success we share. 
              His story is one of absolute perseverance and a kind of love that defines our family.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-[#111111] p-8 rounded-2xl md:rounded-3xl border border-[#B8860B]/20 space-y-4 shadow-sm cursor-pointer" onClick={() => triggerConfetti()}>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#B8860B]/20 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                  <Star className="text-[#B8860B] w-5 h-5 md:w-7 md:h-7 fill-[#B8860B]" />
                </div>
                <h4 className="font-bold text-xl md:text-2xl text-white">Brilliance</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Facing every challenge with a sharp mind and steady hand.</p>
              </div>
              <div className="bg-[#111111] p-8 rounded-2xl md:rounded-3xl border border-[#B8860B]/20 space-y-4 shadow-sm cursor-pointer" onClick={() => triggerConfetti()}>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#B8860B]/20 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                  <Heart className="text-[#B8860B] w-5 h-5 md:w-7 md:h-7 fill-[#B8860B]" />
                </div>
                <h4 className="font-bold text-xl md:text-2xl text-white">Devotion</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Putting family first, in every single breath and action taken.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-40 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {achievements.map((item) => (
            <div key={item.label} className="text-center p-8 md:p-14 bg-[#111111] rounded-2xl md:rounded-[3rem] border border-[#B8860B]/20 transform transition-all hover:-translate-y-2 hover:border-[#B8860B]/60 hover:shadow-xl hover:shadow-[#B8860B]/5 cursor-pointer" onClick={() => triggerConfetti()}>
              <div className="text-3xl md:text-6xl font-black mb-2 md:mb-3 text-white">{item.value}</div>
              <div className="text-[#B8860B] text-[10px] md:text-sm font-bold uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tributes: React.FC = () => {
 const tributes: Tribute[] = [
    { 
      name: 'Dorothy Eze', 
      relation: 'Beloved Wife', 
      message: 'My dearest husband, for all these years you have been the rock of our family. Your unwavering love, faith, and strength have been the foundation of our beautiful life together. Every day with you is a blessing.' 
    },
    { 
      name: 'Emmanuel Eze', 
      relation: 'First Son', 
      message: 'Dad, you have been my guiding light and greatest role model. Thank you for teaching me what it means to be a man of integrity, faith, and dedication. Your legacy lives on through me and I strive every day to make you proud.' 
    },
    { 
      name: 'Onyinye Eze', 
      relation: 'Daughter (Last Born)', 
      message: 'Daddy, my first hero and forever protector. You have always made me feel like the most special girl in the world. Your wisdom, laughter, and unconditional love are my greatest treasures. I am so blessed to be your daughter.' 
    },
    { 
      name: 'Kelechi Eze', 
      relation: 'Second Son', 
      message: 'To my father, my mentor, my inspiration. You taught me that true strength comes from faith and compassion. Every lesson you\'ve shared, every moment of guidance, has shaped who I am today. I am honored to carry your name and legacy forward.' 
    },
  ];

  return (
    <section id="tributes" className="py-20 md:py-32 px-4 md:px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 md:gap-24 items-start">
          <div className="lg:col-span-1 space-y-8 text-center lg:text-left transition-layout">
            <div className="text-[#B8860B] font-bold tracking-widest uppercase text-xs">The Guest Book</div>
            <h2 className="text-3xl md:text-6xl font-black font-serif gold-text leading-tight">Messages of Love</h2>
            <p className="text-gray-400 text-base md:text-xl font-light">Heartfelt messages from the people whose lives he has touched the most over the years.</p>
            <div className="pt-6 flex justify-center lg:justify-start">
              <div className="bg-[#B8860B] w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl shadow-[#B8860B]/30 animate-pulse cursor-pointer" onClick={() => triggerConfetti()}>
                <Quote className="text-black w-10 h-10 md:w-12 md:h-12" />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-1 md:grid-cols-2 gap-8 transition-layout">
            {tributes.map((item, idx) => (
              <div key={idx} className="bg-[#111111] p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-[#B8860B]/20 space-y-8 hover:border-[#B8860B]/60 transition-all group cursor-pointer" onClick={() => triggerConfetti()}>
                <div className="flex justify-center md:justify-start text-[#B8860B]">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-200 italic text-lg md:text-2xl leading-relaxed text-center md:text-left font-serif">"{item.message}"</p>
                <div className="flex items-center justify-center md:justify-start gap-5 pt-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B8860B] text-black rounded-full flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                    {item.name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-lg md:text-xl">{item.name}</div>
                    <div className="text-[10px] md:text-xs text-[#B8860B] uppercase font-bold tracking-widest">{item.relation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    triggerConfetti();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIconClick = (id: string) => {
    triggerConfetti();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black py-20 md:py-32 px-4 md:px-6 border-t border-[#B8860B]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-16 text-center sm:text-left transition-layout">
          <div className="sm:col-span-2 space-y-8">
            <div className="flex items-center justify-center sm:justify-start gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B8860B] rounded-lg flex items-center justify-center">
                <Heart className="text-black w-7 h-7 md:w-9 md:h-9 fill-black" />
              </div>
              <span className="text-3xl md:text-4xl font-bold tracking-tight font-serif text-white">Happy <span className="text-[#B8860B]">Birthday</span></span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg md:text-xl leading-relaxed mx-auto sm:mx-0 font-light">
              Celebrating sixty-three golden years of a life lived with purpose, love, and unwavering integrity.
            </p>
            <div className="flex justify-center sm:justify-start gap-6">
                <button onClick={() => handleIconClick('milestone-reflection')} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8860B] transition-all group" title="Milestone Reflection">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black" />
                </button>
                <button onClick={() => handleIconClick('gallery')} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8860B] transition-all group" title="Memory Gallery">
                  <ImageIcon className="w-5 h-5 md:w-6 md-h-6 text-white group-hover:text-black" />
                </button>
                <button onClick={() => handleIconClick('countdown')} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8860B] transition-all group" title="Countdown Timer">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black" />
                </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="font-bold text-xl md:text-2xl text-white font-serif">Quick Access</h4>
            <ul className="space-y-4 md:space-y-6 text-gray-400">
              {['about', 'timeline', 'gallery', 'tributes'].map((id) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="hover:text-[#B8860B] transition-colors capitalize text-lg md:text-xl font-light">
                    {id === 'about' ? 'Our Hero' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <h4 className="font-bold text-xl md:text-2xl text-white font-serif">Reach Family</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-400">
                <Phone className="w-6 h-6 text-[#B8860B]" />
                <span className="text-lg md:text-xl font-light">+1 (202) 555-0143</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-400">
                <Calendar className="w-6 h-6 text-[#B8860B]" />
                <span className="text-lg md:text-xl text-white font-medium underline decoration-[#B8860B] decoration-2">January 31st Celebration</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-white/5 text-center text-sm md:text-base text-gray-600 font-medium tracking-widest">
          © 2024 CRAFTED WITH LOVE FOR DAD'S GOLDEN MILESTONE.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#B8860B] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <LegacySection />
        <TimelineSection />
        
        <ImageCarousel />
        
        <WisdomCorner />
        
        {/* REDESIGNED: Sleek Honoring Section */}
        <section id="milestone-reflection" className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden transition-layout cursor-pointer scroll-mt-20" onClick={() => triggerConfetti()}>
          {/* Background Image with Elegant Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad5.jpeg" 
              className="w-full h-full object-cover opacity-50 transition-transform duration-10000 hover:scale-110" 
              alt="Sophisticated celebration background"
            />
            {/* Multi-layered gradient for superior text clarity and sleek feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
            <div className="max-w-3xl space-y-8 md:space-y-12 animate-in slide-in-from-left duration-1000 ease-out text-left">
              <div className="flex items-center gap-4 text-[#B8860B] font-black tracking-[0.4em] uppercase text-xs md:text-base">
                <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Milestone Reflection
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight font-serif text-white">
                Honoring the Best <br />
                <span className="gold-text">of the Best.</span>
              </h2>
              <div className="h-2 w-32 md:w-48 bg-[#B8860B] rounded-full gold-shadow"></div>
              <div className="space-y-6 md:space-y-8">
                <p className="text-gray-200 text-lg md:text-3xl max-w-2xl leading-relaxed font-light font-serif">
                  His life is a beacon of light for all of us. Sixty-three golden years 
                  of wisdom, laughter, and a legacy that continues to grow brighter 
                  with every passing day.
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-sm md:text-xl italic font-serif opacity-80 border-l-4 border-[#B8860B] pl-6 py-2">
                    "A father's legacy is the path he clears for his children, <br className="hidden md:block" /> built on a foundation of unyielding love and quiet strength."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Tributes />
      </main>
      <Footer />
    </div>
  );
}

export default App;