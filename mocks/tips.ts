export interface PlantTip {
  id: string;
  title: string;
  content: string;
  category: 'watering' | 'light' | 'soil' | 'fertilizing' | 'propagation' | 'pests' | 'general';
  image?: string;
}

export const plantTips: PlantTip[] = [
  {
    id: '1',
    title: 'Understanding Plant Light Requirements',
    content: 'Different plants need different amounts of light. Low light plants can survive in areas with minimal natural light. Medium light plants need bright, indirect light for at least part of the day. Bright indirect light means placing plants near windows without direct sun rays touching the leaves. Direct light plants need several hours of direct sunlight daily.',
    category: 'light',
    image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Watering Best Practices',
    content: 'Most houseplants die from overwatering, not underwatering. Always check the soil moisture before watering. For most plants, water when the top 1-2 inches of soil feels dry. Water thoroughly until it drains from the bottom, then empty the drainage tray. Adjust frequency based on season - plants need less water in winter.',
    category: 'watering',
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Choosing the Right Soil',
    content: 'Different plants require different soil mixes. Most houseplants prefer well-draining potting mix. Succulents and cacti need special cactus mix with extra drainage. Tropical plants often benefit from peat-based mixes that retain some moisture. Adding perlite or pumice improves drainage for most plants.',
    category: 'soil',
    image: 'https://images.unsplash.com/photo-1631002165139-81c716532830?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Fertilizing Schedule',
    content: 'Most houseplants benefit from fertilizing during the growing season (spring and summer). Use a balanced, water-soluble fertilizer at half the recommended strength. Fertilize every 4-6 weeks during growing season and reduce or stop during winter. Always water plants before fertilizing to prevent root burn.',
    category: 'fertilizing',
    image: 'https://images.unsplash.com/photo-1605256585681-455837661b76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Propagation Methods',
    content: 'Many houseplants can be propagated at home. Stem cuttings: Cut below a node and place in water or soil. Leaf cuttings: Some plants can grow from a single leaf. Division: Separate root clumps when repotting. Air layering: For woody stems that are difficult to root. Seeds: The slowest but most natural method.',
    category: 'propagation',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Dealing with Common Pests',
    content: 'Spider mites, mealybugs, scale, and aphids are common houseplant pests. Regularly inspect plants, especially new ones. Isolate infected plants immediately. Treat with insecticidal soap, neem oil, or rubbing alcohol depending on the pest. Increase humidity to discourage spider mites. Maintain good air circulation to prevent pest problems.',
    category: 'pests',
    image: 'https://images.unsplash.com/photo-1598512199776-e0aa7b73f3d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    title: 'Increasing Humidity for Tropical Plants',
    content: 'Many tropical houseplants need higher humidity than typical indoor environments. Group plants together to create a microclimate. Use a humidifier near your plants. Create humidity trays by filling saucers with pebbles and water. Mist plants regularly, but be aware this only provides temporary humidity increase.',
    category: 'general',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'Seasonal Care Adjustments',
    content: 'Plants have different needs throughout the year. Reduce watering and stop fertilizing in winter when growth slows. Increase both in spring and summer during active growth. Move plants away from cold drafts in winter and hot air vents year-round. Consider supplemental grow lights during dark winter months.',
    category: 'general',
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  }
];