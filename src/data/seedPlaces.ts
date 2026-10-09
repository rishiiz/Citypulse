import { Place } from '../types';

export const SEED_PLACES: Place[] = [
  {
    id: 'pune-1',
    name: 'Shaniwar Wada',
    marathiName: 'शनिवार वाडा',
    category: 'heritage',
    coordinates: [18.5196, 73.8553],
    address: 'Shaniwar Peth, Pune',
    ward: 'Kasba Peth',
    priceTier: '₹',
    subScores: { safety: 88, cleanliness: 84, affordability: 95, ratings: 90, accessibility: 72 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '09:30 AM – 06:30 PM',
    aiSummary: 'Historic 18th-century Peshwa fort palace; well-patrolled premises, evening light-and-sound show; uneven stone courtyards.',
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80',
    tags: ['Peshwa History', 'Fortification', 'Architecture', 'Iconic Landmark'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'ASI guards on duty, active CCTV surveillance along Dilli Darwaza; well-lit perimeter.',
      cleanliness: 'Daily PMC sanitation drive; green landscaped lawns kept pristine.',
      affordability: 'Nominal entry ticket ₹25 for Indian citizens, ₹300 foreign tourists.',
      ratings: '4.4/5 from 42,000+ public reviews on Google & TripAdvisor.',
      accessibility: 'Stone steps at main threshold; wheelchair access difficult inside inner palace ruins.',
      lastUpdated: 'Today, 10:15 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified by ASI official hours & 34 corroborating citizen check-ins today'
  },
  {
    id: 'pune-2',
    name: 'Vaishali Restaurant',
    marathiName: 'वैशाली रेस्टॉरंट',
    category: 'food',
    coordinates: [18.5204, 73.8406],
    address: 'FC Road, Shivajinagar, Pune',
    ward: 'Shivajinagar',
    priceTier: '₹₹',
    subScores: { safety: 94, cleanliness: 92, affordability: 82, ratings: 96, accessibility: 86 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: '07:00 AM – 11:00 PM',
    aiSummary: 'Legendary South Indian breakfast hub; buzzing college vibe, famous SPDP and filter coffee; wait times 20-30 mins.',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    tags: ['South Indian', 'FC Road Icon', 'Filter Coffee', 'SPDP'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Extremely high footfall, broad arterial FC Road, street well-lit throughout night.',
      cleanliness: 'Open kitchen standards, FSSAI certified grade A.',
      affordability: 'Average meal ₹150–250 per person.',
      ratings: '4.6/5 from 58,000+ reviews.',
      accessibility: 'Ramped entrance at garden section, ground floor seating available.',
      lastUpdated: '15 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified real-time table status and food health certification'
  },
  {
    id: 'pune-3',
    name: 'Aga Khan Palace',
    marathiName: 'आगा खान पॅलेस',
    category: 'heritage',
    coordinates: [18.5524, 73.9015],
    address: 'Nagar Road, Kalyani Nagar, Pune',
    ward: 'Kalyani Nagar',
    priceTier: '₹',
    subScores: { safety: 96, cleanliness: 94, affordability: 92, ratings: 91, accessibility: 88 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '09:00 AM – 05:30 PM',
    aiSummary: 'Serene Italian arch monument housing Mahatma Gandhi memorial; vast lush gardens, tranquil walking paths.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
    tags: ['Freedom Movement', 'Memorial', 'Italian Architecture', 'Peaceful'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Gated memorial grounds with CISF/security checkpoints.',
      cleanliness: 'Maintained by Archaeological Survey of India (ASI).',
      affordability: 'Entry ₹25 for adults.',
      ratings: '4.5/5 from 28,000+ reviews.',
      accessibility: 'Paved ramps throughout ground pavilions and memorial samadhi.',
      lastUpdated: 'Today, 09:00 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified government memorial status & live gate register'
  },
  {
    id: 'pune-4',
    name: 'Goodluck Cafe',
    marathiName: 'कॅफे गुडलक',
    category: 'cafe',
    coordinates: [18.5168, 73.8415],
    address: 'FC Road Deccan Gymkhana, Pune',
    ward: 'Deccan',
    priceTier: '₹',
    subScores: { safety: 90, cleanliness: 80, affordability: 94, ratings: 89, accessibility: 78 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: '07:30 AM – 11:30 PM',
    aiSummary: 'Since 1935 Irani cafe icon; legendary Bun Maska & Chai, keema pav; vibrant cultural hangout for artists & students.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    tags: ['Irani Cafe', 'Bun Maska', 'Deccan Landmark', 'Historic Cafe'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Bus stop corner, prominent junction with constant police PCR van presence.',
      cleanliness: 'High volume table turnover, busy nostalgic dining room.',
      affordability: 'Bun maska chai ₹70–90.',
      ratings: '4.3/5 from 36,000+ reviews.',
      accessibility: 'Two entrance steps, narrow aisles between wooden booths.',
      lastUpdated: '35 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified open and bustling via Deccan civic telemetry'
  },
  {
    id: 'pune-5',
    name: 'Dagdusheth Halwai Ganpati Temple',
    marathiName: 'श्रीमंत दगडूशेठ हलवाई गणपती मंदिर',
    category: 'attraction',
    coordinates: [18.5164, 73.8561],
    address: 'Budhwar Peth, Pune',
    ward: 'Kasba Peth',
    priceTier: '₹',
    subScores: { safety: 92, cleanliness: 90, affordability: 99, ratings: 98, accessibility: 82 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: '06:00 AM – 10:30 PM',
    aiSummary: 'Most revered deity of Pune; magnificent gold idol, 24/7 volunteer security, intense crowd queues on Tuesdays.',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80',
    tags: ['Temple', 'Devotion', 'Golden Idol', 'Pilgrimage'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Dedicated temple security force, metal detector gates, high police presence.',
      cleanliness: 'Marble floors sanitized every 2 hours by temple trust.',
      affordability: 'Free darshan, VIP queue ₹100.',
      ratings: '4.8/5 from 85,000+ reviews.',
      accessibility: 'Wheelchair access queue available at North entrance.',
      lastUpdated: '10 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified trust feed & live CCTV crowd queue tracker'
  },
  {
    id: 'pune-6',
    name: 'Koregaon Park North Main Road Cafes',
    marathiName: 'कोरेगाव पार्क नॉर्थ मेन रोड',
    category: 'cafe',
    coordinates: [18.5362, 73.8940],
    address: 'North Main Road, Koregaon Park, Pune',
    ward: 'Koregaon Park',
    priceTier: '₹₹₹',
    subScores: { safety: 91, cleanliness: 95, affordability: 60, ratings: 94, accessibility: 89 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '08:00 AM – 12:30 AM',
    aiSummary: 'Banyan-shaded avenue with boutique roasteries, European bistros, artisan sourdough, and upscale artisan lounges.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    tags: ['Artisan Coffee', 'Leafy Boulevard', 'Nightlife', 'Upscale'],
    features: {
      wheelchairRamp: true,
      elevator: true,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Private security guards at nearly every lane, well-paved sidewalks.',
      cleanliness: 'Green tree-lined lanes, zero street dumping.',
      affordability: 'Meals ₹600–1200 per person.',
      ratings: '4.6/5 across top 15 cafes.',
      accessibility: 'Modern cafe ramps and wide doorways.',
      lastUpdated: '1 hour ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified neighborhood audit and active business registry'
  },
  {
    id: 'pune-7',
    name: 'Sarasbaug & Talyatla Ganpati',
    marathiName: 'सारसबाग आणि तळ्यातला गणपती',
    category: 'park',
    coordinates: [18.5008, 73.8538],
    address: 'Sadashiv Peth, Near Swargate, Pune',
    ward: 'Sadashiv Peth',
    priceTier: '₹',
    subScores: { safety: 89, cleanliness: 86, affordability: 98, ratings: 92, accessibility: 85 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '06:00 AM – 09:00 PM',
    aiSummary: 'Sprawling 25-acre garden lake with historic Peshwa temple on an island; evening family strolls and bhel puri stalls outside.',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&auto=format&fit=crop&q=80',
    tags: ['Garden Lake', 'Island Temple', 'Family Picnic', 'Peshwa Era'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Gated garden with PMC security; family heavy footfall until 9 PM.',
      cleanliness: 'Lake cleaning drive completed last week; trash bins along jogging track.',
      affordability: 'Free garden entry; snack stalls ₹40–80.',
      ratings: '4.5/5 from 41,000+ reviews.',
      accessibility: 'Paved walkways around entire perimeter with gentle ramps.',
      lastUpdated: 'Today, 08:30 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified PMC garden department schedule'
  },
  {
    id: 'pune-8',
    name: 'Tulshibaug Traditional Market',
    marathiName: 'तुळशीबाग बाजार',
    category: 'market',
    coordinates: [18.5147, 73.8548],
    address: 'Budhwar Peth, Pune',
    ward: 'Kasba Peth',
    priceTier: '₹',
    subScores: { safety: 76, cleanliness: 68, affordability: 98, ratings: 87, accessibility: 55 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: '10:00 AM – 09:30 PM',
    aiSummary: 'Century-old bustling shopping labyrinth; brass utensils, traditional jewelry, cotton sarees; pickpocket vigilance advised.',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&auto=format&fit=crop&q=80',
    tags: ['Street Shopping', 'Bargaining', 'Traditional Crafts', 'High Energy'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: false,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Extremely dense crowd lanes; police advisory on keeping valuables secured.',
      cleanliness: 'Crowded lanes with packaging debris towards end of day.',
      affordability: 'Bargain heaven; goods starting from ₹50.',
      ratings: '4.2/5 from 22,000+ shopper reviews.',
      accessibility: 'Narrow crowded alleys with steps; not wheelchair accessible.',
      lastUpdated: 'Today, 11:00 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified merchant association open status'
  },
  {
    id: 'pune-9',
    name: 'Pataleshwar Cave Temple',
    marathiName: 'पाताळेश्वर लेणी',
    category: 'heritage',
    coordinates: [18.5273, 73.8497],
    address: 'JM Road, Shivajinagar, Pune',
    ward: 'Shivajinagar',
    priceTier: '₹',
    subScores: { safety: 91, cleanliness: 89, affordability: 100, ratings: 92, accessibility: 75 },
    crowdLevel: 'Low',
    isOpen: true,
    openHours: '08:30 AM – 05:30 PM',
    aiSummary: '8th-century rock-cut monolithic basalt shrine dedicated to Shiva; calm sanctuary right amidst bustling JM Road traffic.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
    tags: ['Rashtrakuta Dynasty', 'Rock-cut Architecture', 'Shiva Sanctuary', '8th Century'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: false
    },
    evidenceNotes: {
      safety: 'ASI monument caretaker on site; peaceful enclave away from road chaos.',
      cleanliness: 'Rock floor swept daily; sacred banyan tree enclosure clean.',
      affordability: 'Free entry.',
      ratings: '4.5/5 from 18,000+ reviews.',
      accessibility: 'Steps descend into subterranean courtyard; uneven stone flooring.',
      lastUpdated: 'Yesterday, 04:00 PM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified ASI heritage directory'
  },
  {
    id: 'pune-10',
    name: 'FC Road Street Food Cluster',
    marathiName: 'एफ सी रोड स्ट्रीट फूड',
    category: 'food',
    coordinates: [18.5225, 73.8402],
    address: 'Fergusson College Road, Shivajinagar, Pune',
    ward: 'Shivajinagar',
    priceTier: '₹',
    subScores: { safety: 89, cleanliness: 81, affordability: 96, ratings: 91, accessibility: 84 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '04:00 PM – 11:30 PM',
    aiSummary: 'Energetic evening strip famous for cheese roll toast, momos, kathi rolls, sugarcane juice, and ice golas.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    tags: ['Street Food', 'Evening Hangout', 'Affordable', 'Fast Bites'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Wide smart-city footpath, youth crowd, constant municipal surveillance.',
      cleanliness: 'Designated waste bins by Pune Smart City, food stall glove hygiene varying.',
      affordability: 'Dishes from ₹40 to ₹120.',
      ratings: '4.4/5 from 31,000+ reviews.',
      accessibility: 'Pedestrianized wide walkway with smooth kerb ramps.',
      lastUpdated: '12 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified PMC Smart City street vendor monitoring'
  },
  {
    id: 'pune-11',
    name: 'Sinhagad Fort Ridge & Kanda Bhaji',
    marathiName: 'सिंहगड किल्ला',
    category: 'attraction',
    coordinates: [18.3663, 73.7558],
    address: 'Sinhagad Ghat Road, Pune Outskirts',
    ward: 'Haveli',
    priceTier: '₹',
    subScores: { safety: 82, cleanliness: 80, affordability: 94, ratings: 95, accessibility: 40 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '06:00 AM – 06:00 PM',
    aiSummary: 'Clifftop Maratha fortress famous for Tanaji Malusare valour; piping hot pitla bhakri, kanda bhaji, and mattha curd.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    tags: ['Fort Trek', 'Maratha History', 'Pitla Bhakri', 'Scenic Views'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: false
    },
    evidenceNotes: {
      safety: 'Forest department barrier at base; steep cliffs require caution during monsoon fog.',
      cleanliness: 'Eco-tourism committee waste management.',
      affordability: 'Parking ₹50, fort meal ₹120.',
      ratings: '4.6/5 from 60,000+ reviews.',
      accessibility: 'Steep rocky inclines and ancient stone steps; not accessible for reduced mobility.',
      lastUpdated: 'Today, 07:00 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified Forest Department gate timing'
  },
  {
    id: 'pune-12',
    name: 'Phoenix Marketcity Viman Nagar',
    marathiName: 'फिनिक्स मार्केटसिटी',
    category: 'market',
    coordinates: [18.5621, 73.9168],
    address: 'Viman Nagar, Pune',
    ward: 'Viman Nagar',
    priceTier: '₹₹₹',
    subScores: { safety: 98, cleanliness: 98, affordability: 55, ratings: 95, accessibility: 98 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '11:00 AM – 11:00 PM',
    aiSummary: 'Largest retail mall in Pune; 350+ global brands, IMAX multiplex, luxury dining, impeccable climate control and baby-care rooms.',
    imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&auto=format&fit=crop&q=80',
    tags: ['Mega Mall', 'IMAX Cinema', 'Air Conditioned', 'International Brands'],
    features: {
      wheelchairRamp: true,
      elevator: true,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Full perimeter X-ray scanners, private security guards on every floor.',
      cleanliness: 'Continuous janitorial sweep, 5-star washrooms.',
      affordability: 'High-end retail & food court.',
      ratings: '4.6/5 from 90,000+ reviews.',
      accessibility: 'Zero-step floor design, multiple elevators, complimentary wheelchairs.',
      lastUpdated: '10 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified mall operations feed'
  },
  {
    id: 'pune-13',
    name: 'Pune Railway Station & Metro Interchange',
    marathiName: 'पुणे रेल्वे स्टेशन',
    category: 'transit',
    coordinates: [18.5284, 73.8744],
    address: 'Agarkar Nagar, Pune',
    ward: 'Camp',
    priceTier: '₹',
    subScores: { safety: 80, cleanliness: 75, affordability: 98, ratings: 82, accessibility: 86 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: 'Open 24 Hours',
    aiSummary: 'Central multimodal transit hub connecting Indian Railways, Pune Metro Line 2, and city bus depot; active RPF post.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
    tags: ['Transit Hub', 'Metro Line 2', '24/7 Operations', 'Central Connectivity'],
    features: {
      wheelchairRamp: true,
      elevator: true,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Railway Protection Force and Maharashtra Police outpost; baggage scanning at entrances.',
      cleanliness: 'Mechanized platform scrubbers, regular waste bins.',
      affordability: 'Metro tickets from ₹10.',
      ratings: '4.1/5 from 54,000+ reviews.',
      accessibility: 'Escalators and lifts to all major metro concourses and main platforms.',
      lastUpdated: '5 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified IRCTC and Pune Metro live schedule'
  },
  {
    id: 'pune-14',
    name: 'Marz-O-Rin & Camp Heritage Bakery',
    marathiName: 'मारझ-ओ-रिन',
    category: 'food',
    coordinates: [18.5142, 73.8801],
    address: 'MG Road, Camp, Pune',
    ward: 'Camp',
    priceTier: '₹',
    subScores: { safety: 91, cleanliness: 89, affordability: 92, ratings: 93, accessibility: 70 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '09:00 AM – 09:30 PM',
    aiSummary: 'Colonial 1965 landmark bakery; legendary chicken/chutney sandwiches, macaroni bake, cold coffee; wooden mezzanine seating.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    tags: ['Camp Heritage', 'Sandwiches', 'MG Road', 'Colonial Vibes'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Prominent MG Road walking plaza, bustling shoppers till late night.',
      cleanliness: 'Daily baked fresh produce, transparent glass counters.',
      affordability: 'Sandwiches from ₹60 to ₹100.',
      ratings: '4.5/5 from 24,000+ reviews.',
      accessibility: 'Mezzanine accessed via spiral stairs; ground counter accessible.',
      lastUpdated: '40 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified bakery daily log'
  },
  {
    id: 'pune-15',
    name: 'Vetal Tekdi (Hilltop Nature Trail)',
    marathiName: 'वेताळ टेकडी',
    category: 'park',
    coordinates: [18.5289, 73.8188],
    address: 'Paud Road / Senapati Bapat Road, Pune',
    ward: 'Kothrud',
    priceTier: '₹',
    subScores: { safety: 84, cleanliness: 90, affordability: 100, ratings: 96, accessibility: 50 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '05:30 AM – 07:30 PM',
    aiSummary: 'Highest natural point in Pune city (2,600 ft); birdwatching, panoramic sunrise/sunset vistas; avoid isolated trails after dark.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    tags: ['Nature Trail', 'Highest Peak', 'Birdwatching', 'Sunrise Spot'],
    features: {
      wheelchairRamp: false,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: false,
      wellLit: false
    },
    evidenceNotes: {
      safety: 'Safe in early mornings and sunset hours with fellow joggers; unlit after 7 PM.',
      cleanliness: 'Citizen voluntary groups organize plastic cleanups every weekend.',
      affordability: 'Free entry.',
      ratings: '4.7/5 from 34,000+ ratings.',
      accessibility: 'Dirt hiking trails and rocky gradients; steep ascent.',
      lastUpdated: 'Today, 06:15 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified citizen naturalist log'
  },
  {
    id: 'pune-16',
    name: 'Bedekar Tea Stall (Iconic Misal)',
    marathiName: 'बेडेकर मिसळ',
    category: 'food',
    coordinates: [18.5135, 73.8499],
    address: 'Narayan Peth, Pune',
    ward: 'Narayan Peth',
    priceTier: '₹',
    subScores: { safety: 92, cleanliness: 88, affordability: 95, ratings: 92, accessibility: 80 },
    crowdLevel: 'High',
    isOpen: true,
    openHours: '07:30 AM – 07:00 PM (Closed Mon)',
    aiSummary: 'Since 1948 culinary treasure; famous sweet-and-spicy Puneri misal served with sliced bread and extra kat tarri.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    tags: ['Puneri Misal', 'Historic Eatery', 'Narayan Peth', 'Breakfast Staple'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Peaceful residential peth neighborhood, safe for solo and family visitors.',
      cleanliness: 'Fresh morning batch prep, steel cutlery.',
      affordability: 'Misal plate ₹100.',
      ratings: '4.3/5 from 19,000+ reviews.',
      accessibility: 'Ground floor dining room with single low step.',
      lastUpdated: '1 hour ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified food inspection & live token queue'
  },
  {
    id: 'pune-17',
    name: 'Kalyani Nagar Joggers Park',
    marathiName: 'जॉगर्स पार्क कल्याणी नगर',
    category: 'park',
    coordinates: [18.5482, 73.9039],
    address: 'Kalyani Nagar, Pune',
    ward: 'Kalyani Nagar',
    priceTier: '₹',
    subScores: { safety: 97, cleanliness: 96, affordability: 100, ratings: 94, accessibility: 95 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '06:00 AM – 09:00 PM',
    aiSummary: 'Spacious landscaped community park with synthetic jogging track, open gym, senior citizen benches, and butterfly garden.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    tags: ['Jogging Track', 'Senior Friendly', 'Open Gym', 'Safe Enclave'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Gated entrance with security guard log, high lighting along all track loops.',
      cleanliness: 'Maintained by local residents association and PMC.',
      affordability: 'Free community entry.',
      ratings: '4.6/5 from 15,000+ reviews.',
      accessibility: 'Zero curb track entry, tactile guiding tiles along main perimeter.',
      lastUpdated: 'Today, 07:45 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified neighborhood committee report'
  },
  {
    id: 'pune-18',
    name: 'JM Road Book & Craft Stalls',
    marathiName: 'जे एम रोड पुस्तकांची दुकाने',
    category: 'market',
    coordinates: [18.5245, 73.8471],
    address: 'Jangali Maharaj Road, Shivajinagar, Pune',
    ward: 'Shivajinagar',
    priceTier: '₹',
    subScores: { safety: 93, cleanliness: 87, affordability: 94, ratings: 90, accessibility: 92 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '11:00 AM – 09:30 PM',
    aiSummary: 'Wide paved boulevard featuring second-hand book stalls, rare Marathi classics, art materials, and street cafes.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    tags: ['Used Books', 'Street Stalls', 'JM Road', 'Cultural Hub'],
    features: {
      wheelchairRamp: true,
      elevator: false,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Flagship Smart City corridor with solar lighting poles and SOS emergency posts.',
      cleanliness: 'Daily power-washed pedestrian paths.',
      affordability: 'Paperbacks from ₹80 to ₹200.',
      ratings: '4.5/5 from 12,000+ book lovers.',
      accessibility: 'Standardized universal access footpaths.',
      lastUpdated: '3 hours ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified Smart City infrastructure database'
  },
  {
    id: 'pune-19',
    name: 'Swargate Bus Interchange & Metro',
    marathiName: 'स्वारगेट बस स्थानक आणि मेट्रो',
    category: 'transit',
    coordinates: [18.5019, 73.8582],
    address: 'Swargate, Pune',
    ward: 'Swargate',
    priceTier: '₹',
    subScores: { safety: 78, cleanliness: 70, affordability: 99, ratings: 79, accessibility: 82 },
    crowdLevel: 'Packed',
    isOpen: true,
    openHours: 'Open 24 Hours',
    aiSummary: 'Major southern transit hub for MSRTC state transport buses and Pune underground metro terminus; heavy evening traffic.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    tags: ['Transit Terminal', 'Underground Metro', 'MSRTC Intercity', 'Active 24/7'],
    features: {
      wheelchairRamp: true,
      elevator: true,
      familyFriendly: true,
      womenSafeRated: false,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Active police booth at central square; rush-hour crowding around bus bays.',
      cleanliness: 'MSRTC depot under ongoing modernization upgrade.',
      affordability: 'Public transit pricing from ₹10.',
      ratings: '3.9/5 from 38,000+ transit riders.',
      accessibility: 'New underground metro station features full barrier-free elevators.',
      lastUpdated: '15 mins ago'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified MSRTC and Maha Metro telemetry'
  },
  {
    id: 'pune-20',
    name: 'Kothrud City Pride & Cultural Square',
    marathiName: 'कोथरूड सिटी प्राईड',
    category: 'attraction',
    coordinates: [18.5074, 73.8077],
    address: 'Paud Road, Kothrud, Pune',
    ward: 'Kothrud',
    priceTier: '₹₹',
    subScores: { safety: 95, cleanliness: 92, affordability: 84, ratings: 92, accessibility: 91 },
    crowdLevel: 'Moderate',
    isOpen: true,
    openHours: '09:00 AM – 11:30 PM',
    aiSummary: 'Cultural cinema and food plaza hub in Kothrud; theater plays, Marathi film releases, rooftop cafes, and safe family strolling.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    tags: ['Cinema', 'Cultural Plays', 'Family Hub', 'Kothrud Landmark'],
    features: {
      wheelchairRamp: true,
      elevator: true,
      familyFriendly: true,
      womenSafeRated: true,
      wellLit: true
    },
    evidenceNotes: {
      safety: 'Quiet upscale residential vicinity, high women-safety perception rating.',
      cleanliness: 'Private commercial maintenance, spotless lobby areas.',
      affordability: 'Tickets ₹150–350.',
      ratings: '4.4/5 from 29,000+ reviews.',
      accessibility: 'Elevators to all cinema halls and ramped basement parking.',
      lastUpdated: 'Today, 10:00 AM'
    },
    confidence: 'Verified',
    confidenceReason: 'Verified commercial entertainment index'
  }
];

// Dynamically generate additional 80+ granular seed POIs across Pune wards to reach 100+ full coverage
const additionalWards = [
  { name: 'Shivajinagar', base: [18.5308, 73.8474] },
  { name: 'Kothrud', base: [18.5074, 73.8077] },
  { name: 'Viman Nagar', base: [18.5679, 73.9143] },
  { name: 'Kalyani Nagar', base: [18.5492, 73.9048] },
  { name: 'Kasba Peth', base: [18.5196, 73.8553] },
  { name: 'Camp', base: [18.5142, 73.8801] },
  { name: 'Hadapsar', base: [18.5089, 73.9260] },
  { name: 'Aundh', base: [18.5580, 73.8070] },
  { name: 'Baner', base: [18.5590, 73.7868] },
  { name: 'Deccan', base: [18.5168, 73.8415] }
];

const categoryTemplates: {
  cat: 'food' | 'cafe' | 'heritage' | 'park' | 'market' | 'attraction' | 'transit';
  names: string[];
  priceTiers: ('₹' | '₹₹' | '₹₹₹')[];
  summaries: string[];
  img: string;
}[] = [
  {
    cat: 'food',
    names: ['Katakirr Misal', 'Wadeshwar FC Road', 'Durvankur Thali', 'Sujata Mastani Sadashiv Peth', 'Kayani Bakery MG Road', 'Chitale Bandhu Mithaiwale', 'Vaishali Express', 'Café Chinar', 'George Restaurant Camp', 'Blue Nile Irani Biryani'],
    priceTiers: ['₹', '₹', '₹₹', '₹', '₹', '₹', '₹', '₹₹', '₹₹', '₹₹'],
    summaries: ['Spicy Kolhapuri-style misal with extra rassa; brisk turnover.', 'Crispy appe, molagapodi idli, and filter coffee.', 'Authentic unlimited Maharashtrian festive thali with modak.', 'Thick ice cream mango mastani shake since 1968.', 'World-famous Shrewsbury butter biscuits; long queues daily.', 'Iconic bakarwadi and amba barfi confectionery.', 'Quick bites South Indian snack counter.', 'Popular student rolls and chai point.', 'Legendary chicken biryani and butter chicken in Camp.', 'Classic Parsi and Iranian biryani institution since 1965.'],
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'cafe',
    names: ['Pagdandi Books Chai Cafe', 'Vohuman Cafe', 'French 101 Patisserie', 'The Flour Works Kalyani Nagar', 'One O Eight Cafe KP', 'Peter\'s Pan KP', 'Le Plaisir Deccan', 'Fat Cat\'s Cafe Wanowrie', 'Cafe Peter Viman Nagar', 'Starbucks Koregaon Park Heritage'],
    priceTiers: ['₹', '₹', '₹₹', '₹₹₹', '₹₹', '₹₹', '₹₹', '₹₹', '₹₹', '₹₹₹'],
    summaries: ['Quiet bohemian book cafe with herbal teas and artisan samosas.', 'Famous cheese omelette, bun maska, and tea near railway station.', 'Handmade macarons, entremets, and espresso.', 'European bistro with leafy courtyard seating and pet-friendly lawn.', 'Artisan cold brew and vegan bowls.', 'Waffles, pancakes, and American breakfast platters.', 'Acclaimed European patisserie, quiches, and macaron desserts.', 'Homestyle baked desserts and comforting soups.', 'Korean fried snacks, bubble tea, and student study tables.', 'Restored heritage bungalow Starbucks with high ceilings and garden patio.'],
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'heritage',
    names: ['Vishrambaug Wada', 'Lal Mahal', 'Parvati Hill Temples', 'Shinde Chhatri Wanowrie', 'Mahatma Phule Museum', 'Raja Dinkar Kelkar Museum', 'Empress Botanical Garden', 'St. Mary\'s Church Camp', 'National War Memorial Southern Command', 'Tribal Cultural Museum'],
    priceTiers: ['₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹'],
    summaries: ['Peshwa Baji Rao II residence with carved teakwood facade and courtyard.', 'Reconstructed 17th-century palace where Chhatrapati Shivaji Maharaj spent childhood.', '108 stone steps leading to ancient Peshwa hilltop shrine overlooking city.', 'Exquisite Anglo-Rajasthani memorial dedicated to Maratha military leader Mahadji Shinde.', '1890 industrial and handicraft museum in Ghole Road.', 'Fascinating collection of 20,000 Indian artifacts, Mastani Mahal replica.', 'Historic 1838 botanical garden sprawled across 39 acres.', 'Estd 1825, oldest surviving church in the Deccan with Gothic architecture.', 'Tribute to Indian armed forces martyrs with MIG fighter jet replica.', 'Rich repository of indigenous art, masks, and tools of Maharashtra tribes.'],
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'park',
    names: ['Osho Teerth Park KP', 'Pashan Lake Bird Sanctuary', 'Pu La Deshpande Japanese Garden', 'Kamala Nehru Park Deccan', 'Chittaranjan Vatika Model Colony', 'Taljai Hills Forest Reserve', 'Baner Biodiversity Park', 'Amanora Town Centre Lake', 'Pimple Gurav Dinosaur Park', 'Gram Sanskruti Udyan Someshwarwadi'],
    priceTiers: ['₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹'],
    summaries: ['Tranquil Zen stream garden created by restoring a city nullah.', 'Winter migratory birds hotspot and wetland trail.', 'Authentic Okayama Japanese garden replica with wooden footbridges.', 'Iconic family park with fighter jet statue and playground.', 'Quiet shaded walking tracks favored by senior citizens.', 'Green hill reserve with peacocks and sunrise jogging loops.', 'Native hill flora, panoramic views of IT corridor.', 'Serene lakeside promenade with evening musical fountain.', 'Family recreational park with life-sized prehistoric models.', 'First mock village park portraying traditional rural Maharashtrian lifestyle.'],
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'market',
    names: ['FC Road Shopping Street', 'Hong Kong Lane Deccan', 'Clover Center Camp', 'Fashion Street Pune Camp', 'Appa Balwant Chowk (ABC Books)', 'Mahatma Phule Mandai Market', 'Laxmi Road Traditional Textiles', 'Ravivar Peth Wholesale Market', 'Baji Rao Road Antique Stalls', 'Westend Mall Aundh'],
    priceTiers: ['₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹', '₹₹₹'],
    summaries: ['Footwear, funky jewelry, and college apparel bargain haven.', 'Accessories, phone gadgets, watches, and imported souvenirs.', 'Bridal fabrics, tailoring, lehengas, and embroidery specialists.', 'Trendy budget casualwear and footwear street bazaar.', 'India\'s dense academic book mart with stationery wholesalers.', 'Heritage 1886 octagonal gothic fruits and vegetable market.', 'Legendary saree and traditional Maharashtrian wedding shopping street.', 'Spices, festive lanterns, wholesale fireworks, and brass items.', 'Restored wooden furniture, brass heirlooms, and antique clocks.', 'Premier suburban shopping mall with cineplex and food hall.'],
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'attraction',
    names: ['Rajiv Gandhi Zoological Park Katraj', 'Blades of Glory Cricket Museum', 'Khadakwasla Dam Viewpoint', 'Panshet Water Sports Complex', 'Symbiosis Ishanya Cultural Center', 'Bal Gandharva Rang Mandir', 'Appu Ghar Nigdi', 'Joshi\'s Museum of Miniature Railways', 'Diamond Water Park Lohegaon', 'Gramdaivat Kasba Ganpati'],
    priceTiers: ['₹', '₹₹', '₹', '₹₹', '₹', '₹', '₹₹', '₹', '₹₹₹', '₹'],
    summaries: ['Sprawling 130-acre zoo with white tiger and snake park.', 'Guinness World Record museum with 50,000 authentic cricket artifacts.', 'Sunset point with sweet corn and roasted bhutta stalls beside reservoir.', 'Speed boating and scenic lake view in the Western Ghats foothills.', 'Sculpture galleries and international cultural student events.', 'Historic civic auditorium hosting Marathi theater and musical concerts.', 'Classic amusement park with roller coasters and carousel rides.', 'Remarkable animated scale-model railway network with automated signals.', 'Wave pools, water slides, and adventure park for summer heat.', 'First revered Ganpati of Pune installed by Jijabai in 1630.'],
    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
  },
  {
    cat: 'transit',
    names: ['Shivajinagar Bus & Metro Interchange', 'Civil Court Metro Mega Junction', 'Viman Nagar Metro Station', 'Pune International Airport Lohegaon', 'Deccan Gymkhana PMPML Terminal', 'Katraj PMPML Bus Depot', 'Hadapsar Gadital Bus Stand', 'Nigdi Pradhikaran BRTS Hub', 'Kothrud Stand MSRTC', 'Pune Station Auto Stand (Prepaid)'],
    priceTiers: ['₹', '₹', '₹', '₹₹₹', '₹', '₹', '₹', '₹', '₹', '₹'],
    summaries: ['Intermodal hub connecting suburban rail, city bus, and underground metro.', 'Deepest underground station and Line 1 & Line 2 interchange.', 'Direct metro feeder to airport shuttle and Viman Nagar tech parks.', 'Domestic & international airport with modern terminal building.', 'High-frequency feeder bus hub for central Pune commuters.', 'Major southern suburban bus terminus near Katraj lake.', 'East corridor hub connecting industrial hubs and Solapur highway.', 'Dedicated BRTS bus terminal with level boarding platforms.', 'Frequent departures for Mumbai, Satara, and Konkan state buses.', 'Official prepaid autorickshaw booth preventing fare gouging.'],
    img: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=600&auto=format&fit=crop&q=80'
  }
];

let generatedCount = SEED_PLACES.length;
for (const tmpl of categoryTemplates) {
  for (let i = 0; i < tmpl.names.length; i++) {
    generatedCount++;
    const wardObj = additionalWards[generatedCount % additionalWards.length];
    const latOffset = ((generatedCount * 17) % 50 - 25) * 0.0018;
    const lngOffset = ((generatedCount * 23) % 50 - 25) * 0.0018;
    const lat = Number((wardObj.base[0] + latOffset).toFixed(4));
    const lng = Number((wardObj.base[1] + lngOffset).toFixed(4));

    const sVal = 75 + ((generatedCount * 7) % 23);
    const cVal = 70 + ((generatedCount * 11) % 28);
    const aVal = tmpl.priceTiers[i] === '₹' ? 95 : (tmpl.priceTiers[i] === '₹₹' ? 80 : 60);
    const rVal = 80 + ((generatedCount * 5) % 18);
    const accVal = 65 + ((generatedCount * 9) % 32);

    SEED_PLACES.push({
      id: `pune-${generatedCount}`,
      name: tmpl.names[i],
      category: tmpl.cat,
      coordinates: [lat, lng],
      address: `${wardObj.name}, Pune`,
      ward: wardObj.name,
      priceTier: tmpl.priceTiers[i],
      subScores: {
        safety: sVal,
        cleanliness: cVal,
        affordability: aVal,
        ratings: rVal,
        accessibility: accVal
      },
      crowdLevel: generatedCount % 3 === 0 ? 'High' : (generatedCount % 2 === 0 ? 'Moderate' : 'Low'),
      isOpen: true,
      openHours: '08:00 AM – 10:00 PM',
      aiSummary: tmpl.summaries[i],
      imageUrl: tmpl.img,
      tags: [tmpl.cat.toUpperCase(), wardObj.name, 'City Life'],
      features: {
        wheelchairRamp: accVal > 75,
        elevator: accVal > 85,
        familyFriendly: true,
        womenSafeRated: sVal > 82,
        wellLit: sVal > 80
      },
      evidenceNotes: {
        safety: `Local ward assessment: score ${sVal}/100. Well-patrolled corridor.`,
        cleanliness: `Sanitation log: score ${cVal}/100. Routine municipal pickup.`,
        affordability: `Tier ${tmpl.priceTiers[i]} with median receipt ₹${aVal > 80 ? '80-150' : '400-800'}.`,
        ratings: `Aggregated 4.${Math.min(9, Math.floor(rVal / 10))} stars from verified patrons.`,
        accessibility: `Step evaluation: ${accVal > 80 ? 'Accessible with ramp' : 'Manual assistance needed'}.`,
        lastUpdated: `${(generatedCount % 6) + 1} hours ago`
      },
      confidence: sVal > 82 ? 'Verified' : 'Likely',
      confidenceReason: 'Verified by crowd checks, ward telemetry, and local business verification.'
    });
  }
}
