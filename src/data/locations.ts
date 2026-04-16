export interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  about: string;
  services: string[];
  amenities: string[];
  coordinates?: { lat: number; lng: number };
}

export const locationsData: LocationData[] = [
  {
    id: "borivali",
    name: "Borivali",
    address: "1st Floor, Above Star Bazaar, Near Railway Station, Borivali East, Mumbai, Maharashtra 400066",
    phone: "+91 98765 43213",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
    coordinates: { lat: 19.2220606, lng: 72.8590031 },
    about: "Conveniently located near the station, our Borivali gym is perfect for commuters and locals alike. We offer a premium fitness experience with a focus on functional strength and endurance.",
    services: [
      "Functional Training",
      "Powerlifting",
      "TRX Training",
      "Endurance Coaching",
      "Core Blast Classes"
    ],
    amenities: [
      "24/7 Access",
      "Premium Equipment",
      "Locker Rooms",
      "Air Conditioned",
      "Music System",
      "Supplement Store"
    ]
  },
  {
    id: "kandivali",
    name: "Kandivali",
    address: "1st floor, Kach compound, Zero No. road, Singh estate, Kandivali east, Mumbai 400101",
    phone: "+91 8451818055",
    hours: "Mon-Sat: 6AM-12AM, Sun: 2PM-8PM",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    coordinates: { lat: 19.2034567, lng: 72.8727588 },
    about: "Located in the heart of Singh Estate, our Kandivali East branch offers a massive workout floor with specialized zones for every fitness style. From high-intensity cardio to heavy weight training, we provide the perfect environment for your transformation.",
    services: [
      "Personal Training",
      "Crossfit",
      "Strength Training",
      "Cardio"
    ],
    amenities: [
      "Valet Parking",
      "Certified Trainers",
      "Steam Room",
      "Shower room"
    ]
  },
  {
    id: "mira-road",
    name: "Mira Road",
    address: "3rd Floor, Shanti Shopping Centre, Sheetal Nagar, Mira Road East, Thane, Maharashtra 401107",
    phone: "+91 98765 43212",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200",
    coordinates: { lat: 19.2818422, lng: 72.8818832 },
    about: "The Mira Road branch is known for its high-energy atmosphere and community-driven approach. Whether you're a beginner or a pro, our facility offers the perfect environment to push your limits.",
    services: [
      "Zumba Classes",
      "CrossFit Training",
      "Bodybuilding Prep",
      "HIIT Sessions",
      "Nutrition Counseling"
    ],
    amenities: [
      "24/7 Access",
      "Dedicated Cardio Zone",
      "Heavy Lifting Area",
      "Shower Facilities",
      "Juice Bar",
      "Bike Parking"
    ]
  },
  {
    id: "malad-east",
    name: "Malad East",
    address: "4th Floor, Evershine Mall, Link Road, Malad East, Mumbai, Maharashtra 400064",
    phone: "+91 98765 43214",
    hours: "6:00 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200",
    coordinates: { lat: 19.1783562, lng: 72.8501905 },
    about: "Our Malad East facility is a hub for fitness enthusiasts. With a massive floor area and specialized zones for different training styles, it's the ultimate playground for your fitness journey.",
    services: [
      "Mixed Martial Arts",
      "Kickboxing",
      "Pilates",
      "Weight Training",
      "Stretching Zone"
    ],
    amenities: [
      "MMA Ring",
      "Steam Room",
      "Cafeteria",
      "Lounge Area",
      "Parking Space",
      "Digital Lockers"
    ]
  },
  {
    id: "orlem",
    name: "Orlem",
    address: "1st floor Grotto Heritage, Malad Marve Rd, opp Orlem Church, Lourdes Colony, Malad West, Mumbai, Maharashtra 400064",
    phone: "+91 7027028387",
    hours: "24/6 Mon-Sat, Sun: 11AM-8PM",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
    coordinates: { lat: 19.1955104, lng: 72.8373156 },
    about: "Situated right opposite the iconic Orlem Church, our Orlem branch is the community hub for fitness enthusiasts in Malad West. With 24/6 access and premium amenities like ice showers, we push the boundaries of luxury fitness.",
    services: [
      "Personal Training",
      "Crossfit",
      "Strength Training",
      "Cardio"
    ],
    amenities: [
      "Certified Trainers",
      "Steam Room",
      "Shower room",
      "Ice Shower"
    ]
  },
  {
    id: "haridwar",
    name: "Haridwar",
    address: "2nd Floor, Pentagon Mall, Main Road, SIDCUL, Haridwar, Uttarakhand 249403",
    phone: "+91 98765 43211",
    hours: "5:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200",
    coordinates: { lat: 29.935142, lng: 78.0770637 },
    about: "Located in the heart of Haridwar, our facility brings modern fitness to the holy city. We focus on holistic wellness, combining traditional strength training with modern functional movements in a serene environment.",
    services: [
      "Strength Training",
      "Yoga Classes",
      "Weight Management",
      "Cardio Training",
      "Flexibility Workshops"
    ],
    amenities: [
      "Spacious Workout Floor",
      "Modern Equipment",
      "Changing Rooms",
      "Filtered Water",
      "Personal Lockers",
      "CCTV Security"
    ]
  },
  {
    id: "sundar-nagar",
    name: "Sundar Nagar",
    address: "Ground Floor, SV Road, Sundar Nagar, Goregaon West, Mumbai, Maharashtra 400104",
    phone: "+91 98765 43220",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    coordinates: { lat: 19.1747503, lng: 72.8447587 },
    about: "Our Sundar Nagar branch is the newest addition to The Gym Culture family. This facility is designed with a modern aesthetic and features cutting-edge equipment to help you achieve your fitness goals in style.",
    services: [
      "Personal Training",
      "Group HIIT",
      "Yoga",
      "Functional Training",
      "Strength Training"
    ],
    amenities: [
      "24/7 Access",
      "Modern Equipment",
      "Locker Rooms",
      "Protein Bar",
      "Free Wi-Fi",
      "Parking"
    ]
  }
];
