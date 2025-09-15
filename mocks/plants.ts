import { Plant } from '@/types/plant';

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'The Swiss Cheese Plant is famous for its quirky natural leaf holes and is a popular houseplant that can be propagated in water or soil.',
    waterFrequency: 7,
    lightRequirement: 'bright-indirect',
    humidity: 'medium',
    temperature: {
      min: 18,
      max: 30,
    },
    fertilizeFrequency: 30,
    difficulty: 'easy',
    toxicity: 'mildly-toxic',
    propagation: ['stem cuttings', 'air layering'],
    commonIssues: [
      {
        name: 'Yellow Leaves',
        symptoms: ['Yellowing leaves', 'Dry leaf edges'],
        solutions: ['Check watering routine', 'Increase humidity', 'Ensure proper light exposure']
      },
      {
        name: 'No Leaf Holes',
        symptoms: ['New leaves without characteristic holes'],
        solutions: ['Increase light exposure', 'Ensure plant is mature enough', 'Be patient as younger plants develop holes with age']
      }
    ],
    tips: [
      'Wipe leaves occasionally to remove dust',
      'Rotate the plant regularly for even growth',
      'Support with a moss pole as it grows',
      'Mist occasionally to increase humidity'
    ]
  },
  {
    id: '2',
    name: 'Snake Plant',
    scientificName: 'Dracaena trifasciata',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: "The Snake Plant is one of the most tolerant houseplants you can find. It's perfect for beginners and purifies air even at night.",
    waterFrequency: 14,
    lightRequirement: 'low',
    humidity: 'low',
    temperature: {
      min: 15,
      max: 32,
    },
    fertilizeFrequency: 60,
    difficulty: 'easy',
    toxicity: 'mildly-toxic',
    propagation: ['leaf cuttings', 'division'],
    commonIssues: [
      {
        name: 'Root Rot',
        symptoms: ['Soft, mushy base', 'Yellow or brown leaves', 'Foul smell'],
        solutions: ['Reduce watering frequency', 'Ensure well-draining soil', 'Check for proper drainage']
      },
      {
        name: 'Wrinkled Leaves',
        symptoms: ['Curling leaves', 'Wrinkled appearance'],
        solutions: ['Check watering schedule', 'Increase watering if soil is completely dry']
      }
    ],
    tips: [
      'Can survive in low light but grows faster in brighter conditions',
      'Allow soil to dry completely between waterings',
      'Perfect for bedrooms as it releases oxygen at night',
      'Rarely needs repotting'
    ]
  },
  {
    id: '3',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'The Peace Lily is known for its air-purifying qualities and elegant white flowers. It dramatically droops when thirsty, making it easy to know when to water.',
    waterFrequency: 7,
    lightRequirement: 'medium',
    humidity: 'high',
    temperature: {
      min: 18,
      max: 30,
    },
    fertilizeFrequency: 60,
    difficulty: 'easy',
    toxicity: 'toxic',
    propagation: ['division'],
    commonIssues: [
      {
        name: 'Brown Leaf Tips',
        symptoms: ['Brown, crispy leaf edges', 'Yellowing leaves'],
        solutions: ['Increase humidity', 'Use filtered water', 'Check for drafts']
      },
      {
        name: 'No Blooms',
        symptoms: ['Healthy foliage but no flowers'],
        solutions: ['Ensure adequate light', 'Apply diluted phosphorus-rich fertilizer', 'Be patient as blooming is seasonal']
      }
    ],
    tips: [
      'Drooping leaves indicate it needs water',
      'Mist regularly to increase humidity',
      'Keep away from pets and children due to toxicity',
      'Wipe leaves occasionally to remove dust'
    ]
  },
  {
    id: '4',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    image: 'https://images.unsplash.com/photo-1608909283264-0e6c0e12c5d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'The Fiddle Leaf Fig is a popular indoor tree with large, violin-shaped leaves that can grow up to 10 feet tall.',
    waterFrequency: 7,
    lightRequirement: 'bright-indirect',
    humidity: 'medium',
    temperature: {
      min: 18,
      max: 30,
    },
    fertilizeFrequency: 30,
    difficulty: 'hard',
    toxicity: 'mildly-toxic',
    propagation: ['stem cuttings', 'air layering'],
    commonIssues: [
      {
        name: 'Leaf Drop',
        symptoms: ['Leaves falling off', 'Brown spots on leaves'],
        solutions: ['Maintain consistent care routine', 'Avoid drafts and sudden temperature changes', 'Check for proper light exposure']
      },
      {
        name: 'Brown Spots',
        symptoms: ['Dark brown spots on leaves', 'Yellowing around spots'],
        solutions: ['Check watering habits', 'Ensure proper drainage', 'Treat for bacterial infection if necessary']
      }
    ],
    tips: [
      'Dislikes being moved or relocated',
      'Rotate regularly for even growth',
      'Clean leaves with a damp cloth',
      'Avoid direct sunlight which can scorch leaves'
    ]
  },
  {
    id: '5',
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    image: 'https://images.unsplash.com/photo-1572688985715-89801a8b5cc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Pothos is an easy-to-grow indoor plant with trailing vines and heart-shaped leaves. It comes in various patterns including golden, marble, and neon.',
    waterFrequency: 10,
    lightRequirement: 'low',
    humidity: 'low',
    temperature: {
      min: 15,
      max: 32,
    },
    fertilizeFrequency: 60,
    difficulty: 'easy',
    toxicity: 'toxic',
    propagation: ['stem cuttings'],
    commonIssues: [
      {
        name: 'Yellow Leaves',
        symptoms: ['Yellowing leaves', 'Leaf drop'],
        solutions: ['Adjust watering schedule', 'Check light conditions', 'Ensure proper drainage']
      },
      {
        name: 'Leggy Growth',
        symptoms: ['Long stems with few leaves', 'Sparse appearance'],
        solutions: ['Increase light exposure', 'Prune regularly to encourage bushier growth']
      }
    ],
    tips: [
      'Extremely forgiving and great for beginners',
      'Can be grown in water indefinitely',
      'Trim regularly to maintain desired shape',
      'Keep away from pets due to toxicity'
    ]
  },
  {
    id: '6',
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'The Rubber Plant is a classic houseplant with glossy, dark green leaves. It can grow into a large indoor tree with proper care.',
    waterFrequency: 7,
    lightRequirement: 'bright-indirect',
    humidity: 'medium',
    temperature: {
      min: 16,
      max: 27,
    },
    fertilizeFrequency: 30,
    difficulty: 'easy',
    toxicity: 'mildly-toxic',
    propagation: ['stem cuttings', 'air layering'],
    commonIssues: [
      {
        name: 'Leaf Drop',
        symptoms: ['Lower leaves falling off', 'Yellowing before dropping'],
        solutions: ['Maintain consistent watering', 'Avoid moving the plant', 'Check for proper drainage']
      }
    ],
    tips: [
      'Wipe leaves regularly to maintain shine',
      'Prune to control size and shape',
      'Rotate occasionally for even growth'
    ]
  },
  {
    id: '7',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    image: 'https://images.unsplash.com/photo-1631377819268-d716cd610cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'The ZZ Plant is virtually indestructible with glossy, waxy leaves. Perfect for low-light conditions and infrequent watering.',
    waterFrequency: 21,
    lightRequirement: 'low',
    humidity: 'low',
    temperature: {
      min: 15,
      max: 30,
    },
    fertilizeFrequency: 90,
    difficulty: 'easy',
    toxicity: 'toxic',
    propagation: ['leaf cuttings', 'division'],
    commonIssues: [
      {
        name: 'Overwatering',
        symptoms: ['Yellow leaves', 'Soft stems', 'Root rot'],
        solutions: ['Reduce watering frequency', 'Ensure proper drainage', 'Allow soil to dry completely']
      }
    ],
    tips: [
      'Extremely drought tolerant',
      'Grows slowly but steadily',
      'Perfect for offices and low-light areas'
    ]
  },
  {
    id: '8',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    image: 'https://images.unsplash.com/photo-1586093248292-4e6f6c2b8b7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Spider Plants are easy-care plants that produce baby plantlets, making them perfect for propagation and sharing with friends.',
    waterFrequency: 7,
    lightRequirement: 'medium',
    humidity: 'medium',
    temperature: {
      min: 18,
      max: 24,
    },
    fertilizeFrequency: 30,
    difficulty: 'easy',
    toxicity: 'non-toxic',
    propagation: ['plantlets', 'division'],
    commonIssues: [
      {
        name: 'Brown Leaf Tips',
        symptoms: ['Brown, crispy leaf tips'],
        solutions: ['Use filtered water', 'Increase humidity', 'Avoid over-fertilizing']
      }
    ],
    tips: [
      'Safe for pets and children',
      'Produces baby plants that can be propagated',
      'Great for hanging baskets'
    ]
  },
  {
    id: '9',
    name: 'Philodendron',
    scientificName: 'Philodendron hederaceum',
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af2e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Heart-leaf Philodendron is a fast-growing trailing plant with heart-shaped leaves. Perfect for beginners and low-light conditions.',
    waterFrequency: 7,
    lightRequirement: 'medium',
    humidity: 'medium',
    temperature: {
      min: 18,
      max: 27,
    },
    fertilizeFrequency: 30,
    difficulty: 'easy',
    toxicity: 'toxic',
    propagation: ['stem cuttings'],
    commonIssues: [
      {
        name: 'Leggy Growth',
        symptoms: ['Long stems with sparse leaves'],
        solutions: ['Increase light exposure', 'Prune regularly', 'Pinch growing tips']
      }
    ],
    tips: [
      'Can trail or climb with support',
      'Very easy to propagate in water',
      'Tolerates neglect well'
    ]
  },
  {
    id: '10',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af2e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Aloe Vera is a succulent with medicinal properties. The gel inside its leaves can be used to treat minor burns and skin irritations.',
    waterFrequency: 14,
    lightRequirement: 'bright-indirect',
    humidity: 'low',
    temperature: {
      min: 13,
      max: 27,
    },
    fertilizeFrequency: 90,
    difficulty: 'easy',
    toxicity: 'mildly-toxic',
    propagation: ['offsets', 'leaf cuttings'],
    commonIssues: [
      {
        name: 'Soft Leaves',
        symptoms: ['Mushy, translucent leaves'],
        solutions: ['Reduce watering', 'Ensure proper drainage', 'Move to brighter location']
      }
    ],
    tips: [
      'Allow soil to dry completely between waterings',
      'Produces medicinal gel in leaves',
      'Produces baby plants (pups) that can be separated'
    ]
  },
  {
    id: '11',
    name: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Boston Ferns are classic houseplants with feathery, arching fronds. They prefer high humidity and indirect light.',
    waterFrequency: 5,
    lightRequirement: 'medium',
    humidity: 'high',
    temperature: {
      min: 16,
      max: 24,
    },
    fertilizeFrequency: 30,
    difficulty: 'moderate',
    toxicity: 'non-toxic',
    propagation: ['division', 'runners'],
    commonIssues: [
      {
        name: 'Brown Fronds',
        symptoms: ['Brown, crispy fronds', 'Dropping leaves'],
        solutions: ['Increase humidity', 'Keep soil consistently moist', 'Avoid direct sunlight']
      }
    ],
    tips: [
      'Mist regularly or use a humidifier',
      'Keep soil consistently moist but not soggy',
      'Perfect for bathrooms with good light'
    ]
  },
  {
    id: '12',
    name: 'Jade Plant',
    scientificName: 'Crassula ovata',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Jade Plants are succulent shrubs with thick, fleshy leaves. They are symbols of good luck and can live for decades with proper care.',
    waterFrequency: 14,
    lightRequirement: 'bright-indirect',
    humidity: 'low',
    temperature: {
      min: 18,
      max: 24,
    },
    fertilizeFrequency: 60,
    difficulty: 'easy',
    toxicity: 'mildly-toxic',
    propagation: ['leaf cuttings', 'stem cuttings'],
    commonIssues: [
      {
        name: 'Leaf Drop',
        symptoms: ['Leaves falling off easily'],
        solutions: ['Reduce watering', 'Ensure adequate light', 'Check for root rot']
      }
    ],
    tips: [
      'Allow soil to dry between waterings',
      'Can develop red edges in bright light',
      'Prune to maintain tree-like shape'
    ]
  }
];