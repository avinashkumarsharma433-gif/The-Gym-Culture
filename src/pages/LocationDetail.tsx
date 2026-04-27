import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  ArrowLeft, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  Activity, 
  Coffee, 
  Wifi, 
  Car, 
  Wind,
  Dumbbell,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  HelpCircle,
  Instagram,
  Twitter,
  Facebook,
  X,
  Play
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { locationsData } from '../data/locations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = locationsData.find(loc => loc.id === id);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-display text-6xl uppercase mb-8">Location Not Found</h1>
          <Link to="/locations" className="bg-brand text-white px-12 py-6 rounded-lg font-display text-2xl uppercase tracking-widest inline-block">
            Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  const serviceImages: Record<string, string> = {
    "Functional Training": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
    "Powerlifting": "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?q=80&w=800",
    "TRX Training": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800",
    "Endurance Coaching": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Core Blast Classes": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    "Personal Training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    "Group HIIT Classes": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800",
    "Yoga & Meditation": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    "Crossfit": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
    "Cardio": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Cardio & Endurance": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Strength Training": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Zumba Classes": "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=800",
    "CrossFit Training": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
    "Bodybuilding Prep": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800",
    "HIIT Sessions": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800",
    "Nutrition Counseling": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800",
    "Mixed Martial Arts": "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=800",
    "Kickboxing": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800",
    "Pilates": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800",
    "Weight Training": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Stretching Zone": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800",
    "Yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    "Aerobics": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800",
    "Strength & Conditioning": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Post-Rehab Training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    "Weight Management": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800",
    "Cardio Training": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Flexibility Workshops": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    "Group HIIT": "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=800"
  };

  const amenityImages: Record<string, string> = {
    "24/7 Access": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Luxury Locker Rooms": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Steam & Sauna": "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800",
    "Protein Bar": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800",
    "Free Wi-Fi": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Valet Parking": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800",
    "Towel Service": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800",
    "Premium Equipment": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Locker Rooms": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Air Conditioned": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Music System": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Supplement Store": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800",
    "Dedicated Cardio Zone": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Heavy Lifting Area": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Shower Facilities": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Juice Bar": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800",
    "Bike Parking": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800",
    "MMA Ring": "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=800",
    "Steam Room": "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800",
    "Cafeteria": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800",
    "Lounge Area": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Parking Space": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800",
    "Digital Lockers": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Boutique Studio Feel": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Modern Cardio Machines": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800",
    "Changing Rooms": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Water Station": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Expert Guidance": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    "Spacious Workout Floor": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Modern Equipment": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "Filtered Water": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Personal Lockers": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "CCTV Security": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    "Parking": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800",
    "Certified Trainers": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    "Shower room": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
    "Ice Shower": "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800"
  };

  const trainers = [
    { name: "Vikram Singh", role: "Head Coach", specialty: "Bodybuilding & Prep", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400" },
    { name: "Priya Sharma", role: "Senior Trainer", specialty: "Yoga & Flexibility", image: "https://images.unsplash.com/photo-1548690312-e3b507d17a4d?q=80&w=400" },
    { name: "Rahul Verma", role: "Strength Coach", specialty: "Powerlifting", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400" },
    { name: "Anjali Gupta", role: "HIIT Specialist", specialty: "Weight Loss", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400" }
  ];

  const plans = [
    { name: "Basic", price: "2,499", period: "month", features: ["Gym Access", "Locker Room", "Basic Training", "Standard Hours"] },
    { name: "Premium", price: "4,999", period: "month", features: ["24/7 Access", "Personal Trainer (2/mo)", "All Classes", "Steam & Sauna"], popular: true },
    { name: "Elite", price: "12,999", period: "quarter", features: ["Unlimited PT", "Nutrition Plans", "Recovery Zone", "Priority Support"] }
  ];

  const faqs = [
    { q: "What are the operating hours?", a: "Most of our branches are open 24/7. Some specific locations operate from 6:00 AM to 12:00 AM. Please check the header for this branch's specific hours." },
    { q: "Do you offer personal training?", a: "Yes, we have a team of certified elite trainers. You can book a trial session at the reception or through our app." },
    { q: "Can I access other branches?", a: "Premium and Elite members get access to all The Gym Culture locations across India." },
    { q: "Is there a trial period?", a: "We offer a 1-day free trial for all new visitors to experience our facility and equipment." }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-ink/95 backdrop-blur-2xl px-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-h-[90vh] max-w-[calc(90vh*9/16)] aspect-[9/16] glass rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 z-10 mx-auto"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all z-50 group border border-white/20"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                <video 
                  src={activeVideo} 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    if (target.src.includes('tgc-universal-video.mp4')) return;
                    target.src = '/tgc-universal-video.mp4';
                    target.play().catch(err => console.log('Autoplay prevented on fallback:', err.message));
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 smooth-gradient-t z-10" />
          <motion.img 
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src={location.image} 
            alt={location.name} 
            className="w-full h-full object-cover grayscale opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <button 
              onClick={() => navigate('/locations')}
              className="flex items-center gap-2 text-brand font-mono text-sm uppercase tracking-widest mb-8 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Locations
            </button>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-6">{location.name}</h1>
            <div className="flex flex-wrap gap-8 text-paper/60 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand" /> {location.address}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand" /> {location.hours}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand" /> {location.phone}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">About this branch</span>
              <h2 className="font-display text-5xl md:text-7xl uppercase mb-10 tracking-tight">The Best Fitness <br /> Experience in {location.name}</h2>
              <p className="text-xl text-paper/60 font-light leading-relaxed mb-12">
                {location.about}
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center mt-12 w-full">
                <button className="btn-glow h-12 md:h-14 flex-1 md:flex-none w-full md:w-auto !px-8 md:!px-12 rounded-full font-display text-sm md:text-base uppercase tracking-widest flex items-center justify-center group m-0">
                  Join This Branch
                </button>
                <button 
                  onClick={() => setActiveVideo(`/${location.name.replace(/\s+/g, '-')}-Video.mp4`)}
                  className="glass h-12 md:h-14 w-full md:w-auto flex-1 md:flex-none px-8 rounded-full font-display text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-3 group hover:bg-white/10 transition-all border border-white/10 hover:border-brand/40 m-0"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(233,1,2,0.4)] shrink-0">
                    <Play className="w-3 h-3 md:w-4 md:h-4 fill-white text-white ml-0.5" />
                  </div>
                  Watch Video
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-4 rounded-[4rem] overflow-hidden"
            >
              <img 
                src={location.image} 
                alt="Gym Interior" 
                className="w-full h-full object-cover rounded-[3rem] grayscale"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-24 px-6 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">What we offer</span>
              <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight">Available Services</h2>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="swiper-prev-services w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button className="swiper-next-services w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-prev-services',
              nextEl: '.swiper-next-services',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="services-swiper !px-10 !pt-8 !pb-24 -mx-10"
          >
            {location.services.map((service, i) => (
              <SwiperSlide key={i}>
                <div className="glass rounded-[3rem] overflow-hidden group h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={serviceImages[service] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"} 
                      alt={service}
                      className="w-full h-full object-cover grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 smooth-gradient-t opacity-60" />
                    <div className="absolute bottom-6 left-8">
                      <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white mb-4">
                        <Zap className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-10 flex-grow">
                    <h3 className="font-display text-3xl uppercase mb-4 tracking-wide">{service}</h3>
                    <p className="text-paper/40 font-light text-sm leading-relaxed">
                      Experience world-class {service.toLowerCase()} designed to push your boundaries and achieve peak performance.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Amenities Carousel */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">The Experience</span>
              <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight">Premium Amenities</h2>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="swiper-prev-amenities w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button className="swiper-next-amenities w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-prev-amenities',
              nextEl: '.swiper-next-amenities',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="amenities-swiper !px-10 !pt-8 !pb-24 -mx-10"
          >
            {location.amenities.map((amenity, i) => (
              <SwiperSlide key={i}>
                <div className="glass rounded-[2.5rem] overflow-hidden group h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={amenityImages[amenity] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"} 
                      alt={amenity}
                      className="w-full h-full object-cover grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-ink/40" />
                  </div>
                  <div className="p-8 flex-grow">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand mb-4">
                      <Star className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-wide">{amenity}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">The Experts</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-8">Elite Trainers</h2>
            <p className="max-w-2xl mx-auto text-paper/40 font-light text-lg">
              Our certified trainers are here to guide you through every step of your fitness journey with personalized attention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="glass p-4 rounded-[3rem] overflow-hidden mb-6">
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 smooth-gradient-t opacity-80" />
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all shadow-xl">
                        <Instagram className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all shadow-xl">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all shadow-xl">
                        <Facebook className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-1">{trainer.name}</h3>
                  <p className="text-brand font-mono text-[10px] uppercase tracking-widest mb-2">{trainer.role}</p>
                  <p className="text-paper/40 text-sm font-light italic">{trainer.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Pricing</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-8">Membership Plans</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-12 rounded-[4rem] relative overflow-hidden flex flex-col ${plan.popular ? 'border-brand/40 shadow-2xl shadow-brand/10 scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-8 right-8 bg-brand text-white px-4 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-3xl uppercase mb-2 tracking-wide">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-display text-brand">₹{plan.price}</span>
                  <span className="text-paper/40 font-light">/{plan.period}</span>
                </div>
                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand" />
                      <span className="text-paper/60 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-6 rounded-2xl font-display text-2xl uppercase tracking-widest transition-all ${plan.popular ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'glass hover:bg-white/10'}`}>
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Existing) */}

      {/* Gallery Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Inside Look</span>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-8">Facility Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative rounded-3xl overflow-hidden glass ${i === 1 || i === 4 ? 'col-span-2 row-span-2' : ''} aspect-square`}
              >
                <img 
                  src={`https://picsum.photos/seed/locationsgallery${location.id}${i}/800/800`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Testimonials</span>
              <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Member Reviews</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex text-brand">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current"/>)}
              </div>
              <span className="font-mono text-sm uppercase">4.8/5 ({location.name})</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="glass p-8 rounded-3xl"
               >
                 <div className="flex text-brand mb-6">
                   {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current"/>)}
                 </div>
                 <p className="text-paper/60 font-light italic mb-8">"Absolutely phenomenal facility. The equipment is top tier and the trainers in {location.name} are super supportive. Best gym I've joined."</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-brand/20">
                      <img src={`https://picsum.photos/seed/memberreview${location.id}${i}/100/100`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display uppercase tracking-wide">Local Member</h4>
                      <p className="font-mono text-[10px] uppercase text-paper/40 tracking-widest">Active 6 months</p>
                    </div>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Questions</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-8">Common Inquiries</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                >
                  <span className="font-display text-2xl uppercase tracking-wide flex items-center gap-4">
                    <HelpCircle className="text-brand w-6 h-6" /> {faq.q}
                  </span>
                  {activeFaq === i ? <Minus className="w-6 h-6 text-brand" /> : <Plus className="w-6 h-6" />}
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-paper/60 font-light leading-relaxed text-lg">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-20 rounded-[4rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="font-display text-6xl md:text-8xl uppercase mb-8 relative z-10">Start Your Journey Today</h2>
            <p className="text-xl text-paper/60 font-light mb-12 relative z-10">
              Join the {location.name} community and transform your life with the best equipment and trainers in the business.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button className="bg-brand text-white px-12 py-6 rounded-lg font-display text-2xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl shadow-brand/20">
                Join Now
              </button>
              <button className="glass hover:bg-white/10 px-12 py-6 rounded-lg font-display text-2xl uppercase tracking-widest transition-all">
                Contact Branch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LocationDetail;
