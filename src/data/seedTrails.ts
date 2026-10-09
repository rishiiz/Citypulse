import { HeritageTrail, TraditionEvent } from '../types';

export const HERITAGE_TRAILS: HeritageTrail[] = [
  {
    id: 'trail-peshwa',
    title: 'Peshwa-Era Heritage Walk',
    subtitle: 'From Grand Fortifications to Sacred Riverside Peths',
    durationMinutes: 90,
    distanceKm: 2.8,
    stopsCount: 4,
    difficulty: 'Easy',
    coverPhoto: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80',
    theme: '18th Century Maratha Empire',
    stops: [
      {
        id: 'stop-1',
        title: 'Shaniwar Wada (Dilli Darwaza)',
        era: '1732 CE — Peshwa Baji Rao I',
        coordinates: [18.5196, 73.8553],
        story: 'Built by Peshwa Baji Rao I as the nerve-center of the Maratha Confederacy. The imposing 21-foot teak Dilli Darwaza features 72 steel spikes positioned to deter war elephants. At its zenith, it was a seven-storey palace complex.',
        source: 'Wikipedia & Maharashtra State Archaeology Records',
        sourceUrl: 'https://en.wikipedia.org/wiki/Shaniwar_Wada',
        bestTime: '04:30 PM – 06:00 PM for golden hour photography',
        etiquette: 'Modest casual attire; do not scale restricted rampart ruins.',
        historicalYear: 'Circa 1860 British Survey Sketch',
        historicalPhoto: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Notice the lotus fountain (Hazari Karanje) with 197 nozzles inside the court.',
        audioNarration: {
          en: 'Welcome to Shaniwar Wada. Built in 1732 by Peshwa Baji Rao the First, this fortress was once the heart of the Maratha Empire spanning from Attock to Cuttack. Observe the massive wooden gates studded with iron spikes.',
          hi: 'शनिवार वाडा में आपका स्वागत है। 1732 में पेशवा बाजीराव प्रथम द्वारा निर्मित यह किला कभी मराठा साम्राज्य की सत्ता का केंद्र था। मुख्य दिल्ली दरवाजे पर लगे नुकीले लोहे के कील हाथियों के हमले को रोकने के लिए बनाए गए थे।',
          mr: 'शनिवार वाड्यात आपले स्वागत आहे. १७३२ मध्ये पेशवे बाजीराव पहिले यांनी बांधलेला हा वाडा मराठा साम्राज्याची राजधानी होता. अवाढव्य दिल्ली दरवाजावरील हत्तींचे हल्ले रोखणारे टोकदार खिळे आजही इतिहासाची साक्ष देतात.'
        }
      },
      {
        id: 'stop-2',
        title: 'Lal Mahal (Shivaji Maharaj Childhood Residence)',
        era: '1630 CE — Shahaji Raje Bhonsle',
        coordinates: [18.5186, 73.8565],
        story: 'Established by Shahaji Raje for his wife Jijabai and son Chhatrapati Shivaji Maharaj. Here, young Shivaji grew up and later staged the legendary daring night raid on Mughal commander Shaista Khan in 1663.',
        source: 'Chhatrapati Shivaji Maharaj Archives & Pune Gazeteer',
        sourceUrl: 'https://en.wikipedia.org/wiki/Lal_Mahal',
        bestTime: '10:00 AM – 12:00 PM',
        etiquette: 'Shoe rack at entrance; silence maintained in historical oil painting gallery.',
        historicalYear: '19th Century Lithograph',
        historicalPhoto: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Check out the life-size gold-and-black murals showing the Battle of Sinhagad.',
        audioNarration: {
          en: 'Lal Mahal stands as a sacred testament to Shivaji Maharaj childhood. Within these red ramparts, the master strategist mastered diplomacy and warfare.',
          hi: 'लाल महल छत्रपति शिवाजी महाराज के बचपन का निवास स्थान है। यहीं उन्होंने जिजामाता के मार्गदर्शन में स्वराज की प्रेरणा पाई थी।',
          mr: 'लाल महाल हा छत्रपती शिवाजी महाराज यांच्या बालपणीच्या पराक्रमाचा साक्षीदार आहे. राजमाता जिजाऊंच्या मार्गदर्शनाखाली स्वराज्याचे पहिले धडे महाराजांनी येथेच गिरवले.'
        }
      },
      {
        id: 'stop-3',
        title: 'Kasba Ganpati (Gramdaivat of Pune)',
        era: '1636 CE — Jijabai Bhosale',
        coordinates: [18.5209, 73.8576],
        story: 'The presiding patron deity (Gramdaivat) of Pune. The stone idol was discovered near the Mutha river and consecrated by Jijabai. It always takes first precedence in the historic Pune Ganesh festival immersion procession.',
        source: 'Pune Municipal Heritage Cell',
        sourceUrl: 'https://en.wikipedia.org/wiki/Kasba_Ganapati',
        bestTime: '08:00 AM or 07:00 PM evening aarti',
        etiquette: 'Remove shoes at threshold; photography restricted in sanctum sanctorum.',
        historicalYear: '1890 Silver Coin Emboss',
        historicalPhoto: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Traditional wooden sabha mandap features carved Peshwa-style cypress brackets.',
        audioNarration: {
          en: 'You are now at Kasba Ganpati, the historic Gramdaivat of Pune consecrated in 1636. Every major celebration and festival in Pune traditionally begins with blessings here.',
          hi: 'कसबा गणपति पुणे के कुलदेवता हैं। 1636 में जिजाऊ मांसाहब ने इस पावन मंदिर की स्थापना की थी।',
          mr: 'पुण्याचे ग्रामदैवत कसबा गणपती मंदिरात आपले स्वागत. १६३६ मध्ये स्थापन झालेली ही स्वयंभू मूर्ती संपूर्ण पुण्याचे श्रद्धास्थान आहे.'
        }
      },
      {
        id: 'stop-4',
        title: 'Vishrambaug Wada',
        era: '1807 CE — Peshwa Baji Rao II',
        coordinates: [18.5145, 73.8528],
        story: 'A lavish three-storey mansion built at a staggering cost of 200,000 rupees. Renowned for its intricate carved teakwood pillars, suru-shaped cypress colonnades, and ornate terracotta rooftop balconies.',
        source: 'ASI Western Circle & INTACH Pune',
        sourceUrl: 'https://en.wikipedia.org/wiki/Vishrambaug_Wada',
        bestTime: '11:00 AM – 04:00 PM',
        etiquette: 'Guided walk pamphlets available at reception.',
        historicalYear: '1888 Colonial Survey Photo',
        historicalPhoto: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Ground floor houses Pune Handloom & Crafts Emporium.',
        audioNarration: {
          en: 'Vishrambaug Wada represents the peak of Peshwa residential woodwork. The carved balcony facade showcases breathtaking Suru cypress pillar craftsmanship.',
          hi: 'विश्रामबाग वाडा पेशवाई वास्तुकला का अनुपम उदाहरण है। इसके नक्काशीदार सागवान के खंभे और झरोखे उस दौर के वैभव की याद दिलाते हैं।',
          mr: 'विश्रामबाग वाडा हा पेशवेकालीन लाकडी कोरीव कलेचा अद्वितीय नमुना आहे. सुरूं आकाराचे खांब आणि बाल्कनीतील नक्षीकाम डोळ्यांचे पारणे फेडते.'
        }
      }
    ]
  },
  {
    id: 'trail-streetfood',
    title: 'Historic Street-Food & Culinary Trail',
    subtitle: 'From 1935 Irani Chai to Spicy Peth Misal & Bakarwadi',
    durationMinutes: 75,
    distanceKm: 2.2,
    stopsCount: 3,
    difficulty: 'Easy',
    coverPhoto: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    theme: 'Authentic Puneri Flavors & Heritage Cafes',
    stops: [
      {
        id: 'stop-f1',
        title: 'Café Goodluck (Deccan)',
        era: '1935 CE — Irani Migrant Settlement',
        coordinates: [18.5168, 73.8415],
        story: 'Pune\'s oldest operating Irani cafe. Beloved across generations for its soft maska pao dipped in fragrant cardamom chai, spicy mutton keema, and caramel custard.',
        source: 'Puneri Food Chronicles & INTACH Intangible Heritage',
        sourceUrl: 'https://en.wikipedia.org/wiki/Irani_caf%C3%A9',
        bestTime: '08:00 AM for fresh bun maska or 05:00 PM tea rush',
        etiquette: 'Sharing tables with strangers is part of the authentic Irani culture.',
        historicalYear: '1942 Vintage B&W Facade',
        historicalPhoto: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Must try: Bun Maska paired with special irani chai.',
        audioNarration: {
          en: 'You are at Cafe Goodluck, founded in 1935. Feel the buzzing cross-table banter and aroma of freshly toasted bun maska.',
          hi: 'कैफे गुडलक में आपका स्वागत है, जो 1935 से पुणे के लोगों का पसंदीदा अड्डा है। यहां की ईरानी चाय और बन मस्का लाजवाब है।',
          mr: 'कॅफे गुडलक - १९३५ पासून डेक्कनची शान. अस्सल इराणी चहा आणि मऊ बन मस्काची चव प्रत्येक पुणेकराच्या ओठांवर असते.'
        }
      },
      {
        id: 'stop-f2',
        title: 'Chitale Bandhu Mithaiwale (Bajirao Road)',
        era: '1950 CE — Chitale Dairy Legacy',
        coordinates: [18.5140, 73.8510],
        story: 'The inventors and undisputed kings of Bakarwadi. Every day, thousands of packs of these spiraled, crispy spiced delicacies are bought by locals and diaspora worldwide.',
        source: 'Maharashtra Chamber of Commerce Records',
        sourceUrl: 'https://chitalebandhu.in',
        bestTime: '04:00 PM – 06:00 PM',
        etiquette: 'Token queue system strictly followed; express counters available.',
        historicalYear: '1955 First Milk Stall',
        historicalPhoto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Also pick up freshly made Amba Barfi (Mango Fudge).',
        audioNarration: {
          en: 'Chitale Bandhu is synonymous with Bakarwadi worldwide. Crisp, spicy, and perfectly fried with a secret generational spice blend.',
          hi: 'चितळे बंधू - बाकरवडी और आम्रखंड का सबसे प्रसिद्ध नाम। इनकी बाकरवडी पूरी दुनिया में जानी जाती है।',
          mr: 'चितळे बंधूंची बाकरवडी म्हणजे पुण्याची ओळख. खुसखुशीत आणि चवदार बाकरवडीची चव जगभरातील खवय्यांच्या पसंतीस उतरली आहे.'
        }
      },
      {
        id: 'stop-f3',
        title: 'Sujata Mastani (Sadashiv Peth)',
        era: '1968 CE — Kondhalkar Family',
        coordinates: [18.5090, 73.8520],
        story: 'Inventors of Pune\'s unique dessert drink: Mastani. A dense milk shake topped with full scoops of ice cream, nuts, and cherries, named affectionately after Peshwa Baji Rao\'s consort Mastani.',
        source: 'Pune Culinary Heritage Trust',
        sourceUrl: 'https://sujatamastani.com',
        bestTime: '08:00 PM – 10:30 PM post-dinner',
        etiquette: 'Stand and savor at the heritage peth marble counter.',
        historicalYear: '1970 Vintage Milk Churner',
        historicalPhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        currentPhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        curatorNotes: 'Classic signature: Mango Mastani with dry fruits.',
        audioNarration: {
          en: 'End your food journey at Sujata Mastani. The rich ice cream shake is named after queen Mastani and remains Pune ultimate midnight sweet craving.',
          hi: 'सुजाता मस्तानी - पुणे की यह खास मिठाई आइसक्रीम और गाढ़े शेक का अनूठा मेल है। इसका नाम मस्तानी बाई के नाम पर रखा गया है।',
          mr: 'सुजाता मस्तानी - पुण्याची सुप्रसिद्ध मस्तानी! आईस्क्रीम आणि रसाळ फळांच्या मिश्रणाचा हा अविस्मरणीय गोडवा तुमची संध्याकाळ परिपूर्ण करेल.'
        }
      }
    ]
  }
];

export const LOCAL_TRADITIONS: TraditionEvent[] = [
  {
    id: 'trad-1',
    title: 'Pune Ganeshotsav & Visarjan Miravnuk',
    category: 'Festival',
    dateStr: 'Annual Bhadrapada (10 Days)',
    location: 'Laxmi Road, Tilak Road, Kumthekar Road',
    coordinates: [18.5147, 73.8548],
    expectedCrowd: 'Very High',
    roadClosures: [
      'Laxmi Road closed to motorized traffic from Alka Talkies to Belbaug Chowk',
      'Tilak Road and Kumthekar Road vehicular diversion active',
      'Bajirao Road south corridor restricted'
    ],
    transitAdvisory: 'Use Pune Metro Line 2 (Civil Court / Garware College) and designated PMPML Ring Shuttle buses.',
    culturalTips: 'Dress in traditional attire; witness the rhythmic Dhol Tasha troupes (Yuva Vadya Pathak) leading the Manache 5 Ganpatis.'
  },
  {
    id: 'trad-2',
    title: 'Sant Tukaram Maharaj & Dnyaneshwar Palkhi Sohala',
    category: 'Heritage Procession',
    dateStr: 'Annual Ashadhi Ekadashi Season',
    location: 'Fergusson College Road -> Shaniwar Peth -> Saswad Route',
    coordinates: [18.5225, 73.8402],
    expectedCrowd: 'Very High',
    roadClosures: [
      'FC Road & Jangali Maharaj Road closed sequentially during transit',
      'Old Mumbai-Pune highway diversions near Khadki and Deccan'
    ],
    transitAdvisory: 'Special suburban rail frequency running between Lonavala and Pune Station.',
    culturalTips: 'Over 400,000 Warkaris singing abhangas on foot; citizens volunteer free water, poha, and medical aid along the entire route.'
  },
  {
    id: 'trad-3',
    title: 'Diwali Pahat Musical Dawn at Sarasbaug',
    category: 'Cultural Fair',
    dateStr: 'Diwali Narak Chaturdashi Morning (05:00 AM)',
    location: 'Sarasbaug Lawn Amphitheatre',
    coordinates: [18.5008, 73.8538],
    expectedCrowd: 'High',
    roadClosures: [
      'Swargate to Sarasbaug feeder lane parking regulated'
    ],
    transitAdvisory: 'Early morning autorickshaw counters and parking at Sanas Ground.',
    culturalTips: 'Families arrive in silk kurtas and nauvari sarees to light thousands of clay diyas and listen to classical Indian ragas at sunrise.'
  }
];
