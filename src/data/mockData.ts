
export const mockTools = [
  {
    id: '1',
    title: 'Perceuse électrique Bosch Professional',
    description: 'Perceuse sans fil 18V avec batterie et chargeur. Parfaite pour tous vos travaux de bricolage.',
    price: 25,
    period: 'jour',
    category: 'construction',
    location: 'Paris 15ème',
    owner: 'Jean Dupont',
    rating: 4.8,
    reviews: 23,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    features: ['Batterie 18V', 'Chargeur inclus', 'Mandrin auto-serrant', '2 vitesses']
  },
  {
    id: '2',
    title: 'Tondeuse électrique Gardena',
    description: 'Tondeuse électrique silencieuse, idéale pour les petits jardins jusqu\'à 400m².',
    price: 35,
    period: 'jour',
    category: 'garden',
    location: 'Lyon 6ème',
    owner: 'Marie Martin',
    rating: 4.6,
    reviews: 15,
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    available: true,
    features: ['Coupe 32cm', 'Bac de ramassage 40L', 'Réglage hauteur', 'Électrique 1400W']
  },
  {
    id: '3',
    title: 'Clés à molette professionnelles',
    description: 'Set de clés à molette de qualité professionnelle. Diverses tailles disponibles.',
    price: 15,
    period: 'jour',
    category: 'automotive',
    location: 'Marseille 8ème',
    owner: 'Pierre Durand',
    rating: 4.9,
    reviews: 31,
    images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    available: false,
    features: ['Acier trempé', '5 tailles différentes', 'Poignée ergonomique', 'Mallette incluse']
  },
  {
    id: '4',
    title: 'Multimètre numérique Fluke',
    description: 'Multimètre de précision pour tous vos tests électriques. Professionnel et fiable.',
    price: 20,
    period: 'jour',
    category: 'electric',
    location: 'Toulouse Centre',
    owner: 'Sophie Leroy',
    rating: 5.0,
    reviews: 8,
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    available: true,
    features: ['Écran LCD', 'Test continuité', 'Mesure AC/DC', 'Sonde de température']
  }
];

export const mockBlogPosts = [
  {
    id: '1',
    title: 'Guide complet : Comment choisir sa perceuse',
    excerpt: 'Découvrez tous nos conseils pour bien choisir votre perceuse selon vos besoins et votre budget.',
    content: 'Le choix d\'une perceuse dépend de plusieurs facteurs importants...',
    author: 'Expert ToolShare',
    date: '2024-01-15',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '5 min'
  },
  {
    id: '2',
    title: '10 outils indispensables pour débuter en jardinage',
    excerpt: 'Notre sélection des outils essentiels pour créer et entretenir votre jardin comme un pro.',
    content: 'Le jardinage est une activité passionnante qui nécessite quelques outils de base...',
    author: 'Marie Jardins',
    date: '2024-01-10',
    category: 'Jardinage',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '7 min'
  },
  {
    id: '3',
    title: 'Entretien des outils : nos conseils pratiques',
    excerpt: 'Apprenez à bien entretenir vos outils pour prolonger leur durée de vie et maintenir leurs performances.',
    content: 'Un bon entretien de vos outils est essentiel pour garantir leur longévité...',
    author: 'Paul Technique',
    date: '2024-01-05',
    category: 'Entretien',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '4 min'
  }
];

export const mockCategories = [
  { id: 'garden', name: 'Jardinage', count: 250 },
  { id: 'construction', name: 'Construction', count: 180 },
  { id: 'automotive', name: 'Automobile', count: 95 },
  { id: 'electric', name: 'Électricité', count: 120 }
];
