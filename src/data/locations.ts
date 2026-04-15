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
  coordinates?: { x: number; y: number };
}

export const locationsData: LocationData[] = [
  {
    id: "borivali",
    name: "Borivali",
    address: "Near Station, Borivali East, Mumbai 400066",
    phone: "+91 98765 43213",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
    coordinates: { x: 28, y: 52 },
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
    address: "Sector 8, Kandivali West, Mumbai 400067",
    phone: "+91 98765 43210",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    coordinates: { x: 29, y: 55 },
    about: "Our flagship location in Kandivali is a state-of-the-art facility designed to provide the ultimate fitness experience. Spanning over 10,000 sq. ft., this gym is equipped with the latest international equipment and a team of elite trainers dedicated to your success.",
    services: [
      "Personal Training",
      "Group HIIT Classes",
      "Yoga & Meditation",
      "Functional Training",
      "Cardio & Endurance",
      "Strength Training"
    ],
    amenities: [
      "24/7 Access",
      "Luxury Locker Rooms",
      "Steam & Sauna",
      "Protein Bar",
      "Free Wi-Fi",
      "Valet Parking",
      "Towel Service"
    ]
  },
  {
    id: "mira-road",
    name: "Mira Road",
    address: "Sheetal Nagar, Mira Road, Thane 401107",
    phone: "+91 98765 43212",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200",
    coordinates: { x: 27, y: 48 },
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
    address: "Link Road, Malad East, Mumbai 400064",
    phone: "+91 98765 43214",
    hours: "6:00 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200",
    coordinates: { x: 30, y: 58 },
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
    address: "Orlem Church Road, Malad West, Mumbai 400064",
    phone: "+91 98765 43215",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
    coordinates: { x: 29, y: 57 },
    about: "The Orlem branch offers a cozy yet powerful workout environment. Known for its personalized attention and friendly community, it's the perfect place to start your fitness transformation.",
    services: [
      "Personal Training",
      "Yoga",
      "Aerobics",
      "Strength & Conditioning",
      "Post-Rehab Training"
    ],
    amenities: [
      "24/7 Access",
      "Boutique Studio Feel",
      "Modern Cardio Machines",
      "Changing Rooms",
      "Water Station",
      "Expert Guidance"
    ]
  },
  {
    id: "haridwar",
    name: "Haridwar",
    address: "Main Road, Haridwar, Uttarakhand 249401",
    phone: "+91 98765 43211",
    hours: "5:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200",
    coordinates: { x: 60, y: 25 },
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
    address: "Sundar Nagar, Malad West, Mumbai 400064",
    phone: "+91 98765 43220",
    hours: "24/7 Open",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    coordinates: { x: 31, y: 56 },
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
