import { Course, Instructor, Testimonial, AreaLocation, TheoryQuestion, Manoeuvre, ShowMeTellMeQuestion } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'intensive-10day',
    title: '10-Day Complete Pass Course',
    subtitle: 'Zero experience to full UK licence',
    duration: '10 Days (40 Hours)',
    hours: 40,
    price: 1395,
    originalPrice: 1480,
    popular: true,
    description: 'Our most successful fast-track course. Designed for novice learners who want to compress months of weekly lessons into two focused weeks with practical test included.',
    idealFor: 'Complete beginners or learners with under 5 hours experience',
    features: [
      '40 hours of 1-to-1 professional tuition',
      'DVSA fast-track practical test booking included',
      'Free 3 months Driving Test Success 4-in-1 App',
      'Mock driving tests on official local test routes',
      'Dedicated Grade A DVSA approved instructor',
      'He-Man dual-control hybrid vehicle provided for test'
    ]
  },
  {
    id: 'intensive-5day',
    title: '5-Day Intensive Booster',
    subtitle: 'Fast track for partially trained learners',
    duration: '5 Days (25 Hours)',
    hours: 25,
    price: 895,
    originalPrice: 940,
    description: 'Ideal if you have previous driving experience or had lessons a while ago and need to rapidly hone your manoeuvres, independent driving, and pass standard.',
    idealFor: 'Learners with 15–20 hours prior tuition',
    features: [
      '25 hours of focused 1-to-1 driving tuition',
      'All 4 DVSA manoeuvres mastered to test standard',
      'Sat-nav independent driving practice (20 mins test segment)',
      'Practical test car hire included on final day',
      'Flexible full-day scheduling (5 hours/day)'
    ]
  },
  {
    id: 'intensive-3day',
    title: '3-Day Express Refresher',
    subtitle: 'Confidence polish & test preparation',
    duration: '3 Days (15 Hours)',
    hours: 15,
    price: 545,
    description: 'Quick confidence booster for learners whose test is imminent, or drivers returning after a test failure who need specific fault correction.',
    idealFor: 'Test-ready drivers needing final polish',
    features: [
      '15 hours concentrated road tuition',
      'Deep dive into tricky junctions and multi-lane roundabouts',
      '2 full realistic mock driving tests with examiner scorecard',
      'Car hire for test day included'
    ]
  },
  {
    id: 'weekly-block',
    title: '10-Hour Saver Block',
    subtitle: 'Our most popular weekly lessons package',
    duration: '5 x 2-Hour Lessons',
    hours: 10,
    price: 330,
    originalPrice: 350,
    description: 'Save £20 upfront with our discounted 10-hour block. Consistent 2-hour slots build muscle memory twice as fast as single hours.',
    idealFor: 'Regular weekly progress fitting around work or study',
    features: [
      '5 x 2-hour weekly driving sessions',
      'Door-to-door home, college, or workplace pickup',
      'Digital pupil scorecard & progress tracking in online portal',
      'Choice of manual or automatic transmission'
    ]
  },
  {
    id: 'weekly-payg',
    title: 'Weekly Pay-As-You-Go',
    subtitle: 'Maximum flexibility with no upfront lock-in',
    duration: '2 Hours per session',
    hours: 2,
    price: 70,
    description: 'Pay lesson by lesson directly to your instructor. Perfect if you prefer to spread the cost and pace lessons according to your weekly schedule.',
    idealFor: 'Flexible budgets and variable availability',
    features: [
      '£35 per hour standard rate (£37 automatic)',
      'No lump sum commitment required',
      'Flexible re-scheduling up to 48 hours in advance',
      'Full syllabus coverage from cockpit drill to test standard'
    ]
  }
];

export const INSTRUCTORS_DATA: Instructor[] = [
  {
    id: 'anthony-smith',
    name: 'Anthony Smith',
    rating: 4.98,
    reviewsCount: 142,
    grade: 'DVSA Grade A',
    areas: ['Leicester', 'Narborough', 'Wigston', 'Blaby'],
    postcodes: ['LE19', 'LE1', 'LE2', 'LE8'],
    transmission: 'manual',
    car: 'Toyota Yaris Mild-Hybrid (2024)',
    hourlyRate: 34,
    experienceYears: 16,
    firstTimePassRate: 85,
    avatarBg: 'bg-emerald-800',
    avatarInitials: 'AS',
    bio: 'Anthony has coached over 500 pupils to their pink licence across South Leicestershire. Known for calm patience and mastering tricky spiral roundabouts.'
  },
  {
    id: 'julie-vance',
    name: 'Julie Vance',
    rating: 4.95,
    reviewsCount: 98,
    grade: 'DVSA Grade A',
    areas: ['Birmingham Central', 'Edgbaston', 'Solihull', 'Sutton Coldfield'],
    postcodes: ['B1', 'B2', 'B15', 'B91', 'B72'],
    transmission: 'automatic',
    car: 'Volkswagen Polo Automatic (2024)',
    hourlyRate: 36,
    experienceYears: 12,
    firstTimePassRate: 84,
    avatarBg: 'bg-teal-800',
    avatarInitials: 'JV',
    bio: 'Specialising in automatic tuition and nervous drivers. Julie holds advanced coaching diplomas and creates a stress-free cockpit environment.'
  },
  {
    id: 'john-mckinley',
    name: 'John McKinley',
    rating: 4.99,
    reviewsCount: 184,
    grade: 'Senior Coach',
    areas: ['Belfast', 'Lisburn', 'Newtownabbey', 'Castlereagh'],
    postcodes: ['BT1', 'BT2', 'BT9', 'BT28', 'BT36'],
    transmission: 'manual',
    car: 'Ford Fiesta EcoBoost 1.0 (2023)',
    hourlyRate: 35,
    experienceYears: 22,
    firstTimePassRate: 88,
    avatarBg: 'bg-slate-800',
    avatarInitials: 'JM',
    bio: 'Legendary Belfast instructor with 22 years of experience. Pupils consistently praise his encyclopaedic knowledge of Boucher Road test routes.'
  },
  {
    id: 'nate-carver',
    name: 'Nate Carver',
    rating: 4.92,
    reviewsCount: 110,
    grade: 'DVSA Grade A',
    areas: ['Coalville', 'Ibstock', 'Ashby-de-la-Zouch', 'Loughborough'],
    postcodes: ['LE67', 'LE65', 'LE11'],
    transmission: 'manual',
    car: 'Renault Clio E-Tech Hybrid (2024)',
    hourlyRate: 34,
    experienceYears: 9,
    firstTimePassRate: 83,
    avatarBg: 'bg-emerald-900',
    avatarInitials: 'NC',
    bio: 'Nate excels at breaking down complex dual carriageway maneuvers and parking geometry into simple, unforgettable reference points.'
  },
  {
    id: 'hamish-catanach',
    name: 'Hamish Catanach',
    rating: 4.97,
    reviewsCount: 76,
    grade: 'DVSA Grade A',
    areas: ['Coventry', 'Warwick', 'Leamington Spa', 'Kenilworth'],
    postcodes: ['CV1', 'CV3', 'CV31', 'CV34', 'CV8'],
    transmission: 'manual',
    car: 'Ford Puma EcoBoost (2024)',
    hourlyRate: 35,
    experienceYears: 14,
    firstTimePassRate: 86,
    avatarBg: 'bg-emerald-800',
    avatarInitials: 'HC',
    bio: 'Hamish is famed for rapid intensive pass courses, routinely taking beginners from zero to full licence in under 4 weeks with high first-time pass scores.'
  },
  {
    id: 'tony-sykes',
    name: 'Tony Sykes',
    rating: 4.94,
    reviewsCount: 165,
    grade: 'Senior Coach',
    areas: ['Nottingham', 'West Bridgford', 'Beeston', 'Derby'],
    postcodes: ['NG1', 'NG2', 'NG9', 'DE1', 'DE22'],
    transmission: 'automatic',
    car: 'Toyota Corolla Hybrid Touring (2024)',
    hourlyRate: 36,
    experienceYears: 18,
    firstTimePassRate: 87,
    avatarBg: 'bg-teal-900',
    avatarInitials: 'TS',
    bio: 'Tony has trained both civilian drivers and military personnel under our MOD project. Known for crisp communication and mock tests that make the real DVSA test feel easy.'
  },
  {
    id: 'claire-pendleton',
    name: 'Claire Pendleton',
    rating: 4.96,
    reviewsCount: 89,
    grade: 'DVSA Grade A',
    areas: ['London South West', 'Wimbledon', 'Putney', 'Battersea'],
    postcodes: ['SW1', 'SW19', 'SW15', 'SW11'],
    transmission: 'both',
    car: 'Mini Cooper 5-Door (2024)',
    hourlyRate: 38,
    experienceYears: 11,
    firstTimePassRate: 82,
    avatarBg: 'bg-slate-700',
    avatarInitials: 'CP',
    bio: 'London urban driving specialist. Claire equips learners to navigate narrow residential roads, red routes, cycle boxes, and the Tolworth / Morden test centres with utter confidence.'
  },
  {
    id: 'rhys-davies',
    name: 'Rhys Davies',
    rating: 4.93,
    reviewsCount: 64,
    grade: 'DVSA Grade A',
    areas: ['Cardiff Central', 'Newport', 'Penarth', 'Barry'],
    postcodes: ['CF10', 'CF11', 'CF24', 'NP20'],
    transmission: 'manual',
    car: 'Vauxhall Corsa Turbo (2024)',
    hourlyRate: 34,
    experienceYears: 8,
    firstTimePassRate: 84,
    avatarBg: 'bg-emerald-950',
    avatarInitials: 'RD',
    bio: 'Fluent Welsh and English instructor with exceptional knowledge of the Cardiff Llanishen test routes and steep hill starts.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'rev-1',
    reviewerName: 'Harrison Hastie',
    instructorName: 'Nate Carver',
    city: 'Ibstock, Leicestershire',
    testCentre: 'Loughborough Test Centre',
    rating: 5,
    date: '14 Sept 2026',
    minors: 1,
    reviewText: 'Nate was a great instructor and very friendly. Passed first time with just 1 minor fault! The intensive preparation on country lanes and town junctions took all the fear away. 0 complaints!',
    courseType: '5-Day Intensive Booster',
    transmission: 'manual'
  },
  {
    id: 'rev-2',
    reviewerName: 'Kevin Thompson',
    instructorName: 'John McKinley',
    city: 'Belfast, Northern Ireland',
    testCentre: 'Boucher Road DTC',
    rating: 5,
    date: '28 August 2026',
    minors: 0,
    reviewText: 'John was an absolute amazing instructor, helped me a lot and such an easy guy to talk to. Patience of a saint, helped me get my licence finally with a clean sheet (zero driving faults)! Will miss our chats.',
    courseType: '10-Day Complete Course',
    transmission: 'manual'
  },
  {
    id: 'rev-3',
    reviewerName: 'Juliet Morris de la Mata',
    instructorName: 'Hamish Catanach',
    city: 'Warwickshire',
    testCentre: 'Warwick DTC',
    rating: 5,
    date: '10 July 2026',
    minors: 2,
    reviewText: 'Hamish was great, he helped me pass in just over a month! After dreading driving for years, his calm explanations of parallel parking and dual carriageway slip roads gave me the exact confidence I needed.',
    courseType: '10-Hour Block Saver',
    transmission: 'manual'
  },
  {
    id: 'rev-4',
    reviewerName: 'Ben Carmichael',
    instructorName: 'Tony Sykes',
    city: 'Leicester',
    testCentre: 'Wigston DTC',
    rating: 5,
    date: '19 June 2026',
    minors: 2,
    reviewText: 'Nice! I had Tony, really nice bloke who pushed me to my goals and made sure I understood why we do each observation check. Passed first time with flying colours. Highly recommended.',
    courseType: 'Weekly Lessons',
    transmission: 'automatic'
  },
  {
    id: 'rev-5',
    reviewerName: 'Julie Vance-Foster',
    instructorName: 'Anthony Smith',
    city: 'Leicester',
    testCentre: 'Cannock Street DTC',
    rating: 5,
    date: '2 May 2026',
    minors: 3,
    reviewText: 'Julie passed first time! After moving from London I needed a UK manual licence quickly for work. Anthony organized the lessons around my shifts and taught me real-world hazard perception.',
    courseType: '10-Day Intensive',
    transmission: 'manual'
  }
];

export const LOCATIONS_DATA: AreaLocation[] = [
  {
    id: 'leicestershire',
    name: 'Leicestershire & HQ',
    region: 'East Midlands',
    postcodePrefixes: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE8', 'LE10', 'LE11', 'LE18', 'LE19', 'LE65', 'LE67'],
    passRate: 84.6,
    activeInstructors: 34,
    testCentres: ['Leicester (Cannock St)', 'Leicester (Wigston)', 'Loughborough', 'Hinckley'],
    description: 'Our founding headquarters since 1985 in Narborough. Complete coverage across Leicester, Oadby, Wigston, Loughborough, and Coalville.'
  },
  {
    id: 'west-midlands',
    name: 'Birmingham & West Midlands',
    region: 'West Midlands',
    postcodePrefixes: ['B1', 'B2', 'B3', 'B15', 'B17', 'B72', 'B73', 'B91', 'WS1', 'WV1'],
    passRate: 81.2,
    activeInstructors: 42,
    testCentres: ['Kingstanding', 'Garretts Green', 'Sutton Coldfield', 'Shirley', 'Kings Heath'],
    description: 'Extensive coverage across Birmingham city centre, Solihull, Sutton Coldfield, and the Black Country with dual-control manual and automatic hatchbacks.'
  },
  {
    id: 'warwickshire',
    name: 'Warwickshire & Coventry',
    region: 'West Midlands',
    postcodePrefixes: ['CV1', 'CV2', 'CV3', 'CV8', 'CV31', 'CV32', 'CV34'],
    passRate: 83.1,
    activeInstructors: 18,
    testCentres: ['Warwick', 'Coventry'],
    description: 'Covering Coventry, Warwick, Royal Leamington Spa, and Kenilworth with specialized mock tests on Warwick A46 bypass routes.'
  },
  {
    id: 'nottinghamshire',
    name: 'Nottingham & East Midlands',
    region: 'East Midlands',
    postcodePrefixes: ['NG1', 'NG2', 'NG7', 'NG9', 'NG11', 'NG16'],
    passRate: 82.5,
    activeInstructors: 21,
    testCentres: ['Nottingham (Colwick)', 'Nottingham (Chilwell)'],
    description: 'Comprehensive tuition across Nottingham, West Bridgford, Beeston, and Wollaton with high 1st-time pass rates on local test routes.'
  },
  {
    id: 'derbyshire',
    name: 'Derby & South Derbyshire',
    region: 'East Midlands',
    postcodePrefixes: ['DE1', 'DE3', 'DE21', 'DE22', 'DE24'],
    passRate: 81.9,
    activeInstructors: 14,
    testCentres: ['Derby (Alvaston)'],
    description: 'Serving Derby city, Mickleover, Littleover, and surrounding Derbyshire villages with experienced local DVSA Grade A instructors.'
  },
  {
    id: 'northern-ireland',
    name: 'Belfast & Northern Ireland',
    region: 'Northern Ireland',
    postcodePrefixes: ['BT1', 'BT2', 'BT9', 'BT12', 'BT28', 'BT36', 'BT41', 'BT60'],
    passRate: 86.8,
    activeInstructors: 26,
    testCentres: ['Belfast (Boucher Road)', 'Belfast (Balmoral)', 'Lisburn', 'Ballymena', 'Portadown'],
    description: 'Major Northern Ireland driving school network covering Greater Belfast, Lisburn, Antrim, Portadown, Lurgan, and Craigavon.'
  },
  {
    id: 'london',
    name: 'London Metro',
    region: 'Greater London',
    postcodePrefixes: ['SW1', 'SW11', 'SW15', 'SW19', 'E1', 'N1', 'SE1'],
    passRate: 79.4,
    activeInstructors: 28,
    testCentres: ['Morden', 'Tolworth', 'Isleworth', 'Wanstead', 'Hither Green'],
    description: 'Specialist urban driving instruction navigating complex red routes, 20mph zones, cycle superhighways, and outer London test centres.'
  },
  {
    id: 'south-wales',
    name: 'Cardiff & South Wales',
    region: 'Wales',
    postcodePrefixes: ['CF10', 'CF11', 'CF14', 'CF24', 'NP19', 'NP20'],
    passRate: 83.7,
    activeInstructors: 15,
    testCentres: ['Cardiff (Llanishen)', 'Newport'],
    description: 'Friendly bilingual instruction across Cardiff, Penarth, Barry, and Newport with high first-time pass rates on hilly South Wales terrain.'
  }
];

export const THEORY_QUESTIONS_DATA: TheoryQuestion[] = [
  {
    id: 1,
    category: 'Stopping Distances & Braking',
    question: 'In good dry conditions, what is the typical overall stopping distance (thinking distance + braking distance) when travelling at 50 mph?',
    options: [
      '36 metres (118 feet / 9 car lengths)',
      '53 metres (175 feet / 13 car lengths)',
      '73 metres (240 feet / 18 car lengths)',
      '96 metres (315 feet / 24 car lengths)'
    ],
    correctIndex: 1,
    explanation: 'At 50 mph, thinking distance is 15 metres and braking distance is 38 metres, giving an overall stopping distance of 53 metres (approx 13 car lengths). Remember stopping distances double in wet weather!',
    highwayCodeRef: 'Highway Code Rule 126'
  },
  {
    id: 2,
    category: 'Motorway Driving',
    question: 'When may you drive on the hard shoulder of a smart motorway?',
    options: [
      'Whenever the traffic on the other lanes slows below 40 mph',
      'Only when a red X is displayed above your lane',
      'When an illuminated speed limit sign is displayed directly above the hard shoulder',
      'At any time between 10pm and 6am'
    ],
    correctIndex: 2,
    explanation: 'On all-lane running or dynamic smart motorways, you can use the hard shoulder as a live lane ONLY when a speed limit is illuminated above it. A red X indicates the lane is closed due to a hazard or stranded vehicle.',
    highwayCodeRef: 'Highway Code Rule 269'
  },
  {
    id: 3,
    category: 'Vulnerable Road Users',
    question: 'You are approaching a zebra crossing. Pedestrians are waiting at the pavement kerb to cross. What must you do?',
    options: [
      'Sound your horn to alert them that you are approaching',
      'Speed up to clear the crossing before they step onto the road',
      'Slow down, prepare to stop, and give way to pedestrians waiting to cross',
      'Flash your headlights to invite them across while maintaining rolling speed'
    ],
    correctIndex: 2,
    explanation: 'Under the updated Highway Code Hierarchy of Road Users (Rule H2), drivers should give way to pedestrians waiting to cross at a zebra crossing, and MUST stop once a pedestrian has stepped onto the crossing. Never wave or flash headlights.',
    highwayCodeRef: 'Highway Code Rule 195 & Rule H2'
  },
  {
    id: 4,
    category: 'Junctions & Roundabouts',
    question: 'You are approaching a multi-lane roundabout to take an intermediate exit (straight ahead, around 12 o\'clock). Unless road markings indicate otherwise, which lane should you normally select?',
    options: [
      'The right-hand lane, indicating right on approach',
      'The left-hand lane, without indicating on approach, then signalling left after passing the exit before the one you want',
      'Any lane as long as you maintain a speed over 30 mph',
      'The right-hand lane, keeping your left indicator on throughout'
    ],
    correctIndex: 1,
    explanation: 'For going straight ahead at a roundabout (intermediate exit), stay in the left-hand lane unless road signs or arrows designate otherwise. Do not signal on approach; signal left just after passing the exit preceding your exit.',
    highwayCodeRef: 'Highway Code Rule 186'
  },
  {
    id: 5,
    category: 'Speed Limits & Carriageways',
    question: 'What is the national speed limit for a standard passenger car travelling on an unlit dual carriageway with a central reservation barrier, where no signs show a lower limit?',
    options: [
      '50 mph',
      '60 mph',
      '70 mph',
      '80 mph'
    ],
    correctIndex: 2,
    explanation: 'The national speed limit on a dual carriageway (separated by a central reservation) or motorway for cars and motorcycles is 70 mph (112 km/h). On single carriageway roads it is 60 mph.',
    highwayCodeRef: 'Highway Code Rule 124'
  }
];

export const MANOEUVRES_DATA: Manoeuvre[] = [
  {
    id: 'parallel-park',
    name: 'Parallel Parking at the Kerb',
    dvsaCode: 'DVSA EXAM TASK 1',
    diagramSvg: 'parallel',
    keySteps: [
      'Pull alongside target vehicle (approx 1 metre away, level with its front bumper/mirrors).',
      'Select Reverse gear, prepare all-around 360° observations (especially right blind spot).',
      'Reverse slowly on clutch bite until rear wheels align with target car\'s rear bumper.',
      'Apply 1 full turn left lock into a 45° angle towards the kerb.',
      'Straighten wheels and reverse until near corner is in line with target vehicle.',
      'Full lock right to bring front end in parallel with the kerb within 30cm, cancel lock and secure.'
    ],
    examinerChecks: [
      'Full 360° observations before every wheel movement',
      'Giving way to approaching traffic, cyclists, and pedestrians immediately',
      'Finishing reasonably close and parallel to kerb without mounting or scuffing'
    ],
    commonFaults: [
      'Failing to check right blind spot before swinging nose into road',
      'Rushing the manoeuvre without clutch control',
      'Mounting or hard-striking the kerb (Serious Fault)'
    ]
  },
  {
    id: 'reverse-bay-park',
    name: 'Reverse into a Parking Bay',
    dvsaCode: 'DVSA EXAM TASK 2',
    diagramSvg: 'bay-reverse',
    keySteps: [
      'Position vehicle approx 1.5–2 car widths away from parking bays.',
      'Count 3 lines forward from your target parking bay (reference point).',
      'Full 360° all-round observation check for pedestrians and moving cars.',
      'Select Reverse, apply full steering lock towards the bay at creeping walking pace.',
      'Use both wing mirrors to monitor gap between painted white lines.',
      'Straighten steering wheel (2 turns back) when car is parallel, reverse back until rear is within bay.'
    ],
    examinerChecks: [
      'Car completely inside the bay markings (not on or over white lines)',
      'Continuous observations throughout the entire reversing movement',
      'Slow, controlled speed using clutch bite'
    ],
    commonFaults: [
      'Only looking in rear mirror instead of physical shoulder checks',
      'Stopping straddling the white bay line without correcting'
    ]
  },
  {
    id: 'pull-up-right',
    name: 'Pull Up on the Right & Reverse',
    dvsaCode: 'DVSA EXAM TASK 3',
    diagramSvg: 'pull-up-right',
    keySteps: [
      'Check interior mirror, right door mirror, and right blind spot before indicating.',
      'Cross safely to the right-hand side of the road at a shallow angle when clear.',
      'Stop parallel to the right kerb, apply handbrake and select neutral.',
      'When asked to reverse, engage reverse and carry out full 360° checks.',
      'Reverse back straight for approximately 2 car lengths, keeping close to kerb.',
      'Before re-joining traffic flow, check all mirrors and both blind spots.'
    ],
    examinerChecks: [
      'Not cutting in front of oncoming vehicles when crossing the road',
      'Staying reasonably parallel without touching the right kerb',
      'Full observation before pulling back into normal left lane'
    ],
    commonFaults: [
      'Pulling over too close to an opposite junction or bend',
      'Failing to give way to oncoming cars while reversing'
    ]
  },
  {
    id: 'emergency-stop',
    name: 'Controlled Emergency Stop',
    dvsaCode: 'DVSA EXAM TASK 4 (1 in 3 Tests)',
    diagramSvg: 'emergency',
    keySteps: [
      'Examiner will brief you: "Shortly I will ask you to stop as quickly and safely as possible. When I raise my hand and say STOP, bring the car to a halt."',
      'Drive normally. Do not anticipate or check mirrors when command is given.',
      'React immediately: Firm, progressive pressure on footbrake followed swiftly by clutch down.',
      'Keep both hands firmly on the steering wheel in a straight line.',
      'Once stopped, apply handbrake and select neutral.',
      'Take a breath; before moving off again, perform full 360° checks (both blind spots).'
    ],
    examinerChecks: [
      'Prompt reaction without hesitation or steering divergence',
      'Controlling the car under heavy braking with ABS engagement if necessary',
      'Thorough all-round observation before resuming normal driving'
    ],
    commonFaults: [
      'Checking mirrors before braking (wasting critical stopping distance)',
      'Pressing clutch down before the brake (coasting under emergency)',
      'Moving off without checking the right blind spot'
    ]
  }
];

export const SHOW_ME_TELL_ME_DATA: ShowMeTellMeQuestion[] = [
  {
    id: 'tell-me-1',
    type: 'tell-me',
    whenAsked: 'Before moving off',
    question: 'Tell me how you’d check that the brakes are working before starting a journey.',
    answer: 'Brakes should not feel spongy or slack. You should test them as you set off; the car should not pull to one side, and the pedal should feel firm and responsive.',
    safetyTip: 'Always test at walking pace immediately after leaving your driveway or kerb.'
  },
  {
    id: 'tell-me-2',
    type: 'tell-me',
    whenAsked: 'Before moving off',
    question: 'Tell me where you’d find the information for the recommended tyre pressures for this car and how tyre pressures should be checked.',
    answer: 'Refer to the manufacturer’s guide (owner’s handbook) or the tyre pressure sticker inside the driver’s door frame or fuel flap. Check and adjust pressures using a reliable gauge when tyres are cold. Don\'t forget the spare tyre and remember to refit valve caps.',
    safetyTip: 'Check weekly; under-inflated tyres increase fuel consumption and risk blowouts.'
  },
  {
    id: 'show-me-1',
    type: 'show-me',
    whenAsked: 'While driving',
    question: 'When it’s safe to do so, can you show me how you’d wash and clean the rear windscreen?',
    answer: 'Operate the control on the right-hand wiper stalk (usually pushing forward or twisting the outer ring) to activate the rear screen washer and wiper. Keep eyes on the road throughout.',
    safetyTip: 'Only execute when road conditions ahead are clear and straight.'
  },
  {
    id: 'show-me-2',
    type: 'show-me',
    whenAsked: 'While driving',
    question: 'When it’s safe to do so, can you show me how you’d set the rear demister?',
    answer: 'Press the heated rear window button on the central dashboard console (the rectangular icon with wavy upward lines). The indicator light will illuminate.',
    safetyTip: 'Keep attention on surrounding road; do not take eyes off the carriageway for more than a fraction of a second.'
  }
];
