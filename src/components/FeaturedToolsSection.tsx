
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Star, MapPin, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedToolsSection = () => {
  const { t } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const tools = [
    {
      id: "1",
      title: 'Perceuse Bosch Professional',
      price: 15,
      rating: 4.8,
      reviews: 24,
      location: 'Paris 15ème',
      images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: 'Bricolage',
      subcategory: 'Perceuses',
      available: true,
      owner: 'Marc D.',
      description: 'Perceuse professionnelle Bosch très puissante.',
      features: ['Puissante', 'Sans fil', 'Batterie longue durée'],
      period: 'jour'
    },
    {
      id: "2",
      title: 'Tronçonneuse Stihl',
      price: 25,
      rating: 4.9,
      reviews: 18,
      location: 'Lyon 3ème',
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: 'Jardinage',
      subcategory: 'Élagage',
      available: true,
      owner: 'Sophie L.',
      description: 'Tronçonneuse Stihl professionnelle pour tous vos travaux.',
      features: ['Moteur puissant', 'Légère', 'Facile à utiliser'],
      period: 'jour'
    },
    {
      id: "3",
      title: 'Bétonnière 140L',
      price: 35,
      rating: 4.7,
      reviews: 12,
      location: 'Marseille 8ème',
      images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: 'Bricolage',
      subcategory: 'Maçonnerie',
      available: true,
      owner: 'Pierre M.',
      description: 'Bétonnière électrique 140L pour vos travaux de maçonnerie.',
      features: ['140L', 'Électrique', 'Robuste'],
      period: 'jour'
    },
    {
      id: "4",
      title: 'Ponceuse excentrique',
      price: 12,
      rating: 4.6,
      reviews: 31,
      location: 'Toulouse 1er',
      images: ['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
      category: 'Bricolage',
      subcategory: 'Ponçage',
      available: true,
      owner: 'Anne R.',
      description: 'Ponceuse excentrique pour finitions parfaites.',
      features: ['Excentrique', 'Aspirateur intégré', 'Ergonomique'],
      period: 'jour'
    }
  ];

  const handleFavoriteToggle = (tool: any) => {
    if (isFavorite(tool.id)) {
      removeFromFavorites(tool.id);
    } else {
      addToFavorites(tool);
    }
  };

  // Calculate display price with 5.4% fees
  const calculateDisplayPrice = (originalPrice: number) => {
    const feeRate = 0.054;
    const feeAmount = originalPrice * feeRate;
    return originalPrice + feeAmount;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('tools.featured')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les outils les mieux notés et les plus demandés de notre communauté
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {tools.map((tool) => {
              const displayPrice = calculateDisplayPrice(tool.price);
              return (
                <CarouselItem key={tool.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover h-full">
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={tool.images[0]}
                    alt={tool.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {tool.category}
                    </Badge>
                    <Badge variant="outline" className="bg-white/90">
                      {tool.subcategory}
                    </Badge>
                  </div>
                  <button
                    onClick={() => handleFavoriteToggle(tool)}
                    className="absolute top-3 right-3 bg-white rounded-full p-1 hover:bg-gray-50"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isFavorite(tool.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {tool.rating} ({tool.reviews})
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 truncate">
                    {tool.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tool.location}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-primary">
                      {displayPrice.toFixed(1)}€<span className="text-sm font-normal text-gray-500">/{t('tools.day')}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      par {tool.owner}
                    </div>
                  </div>

                  <Link to={`/tool/${tool.id}`} className="w-full">
                    <Button size="sm" className="w-full">
                      {t('tools.rent')}
                    </Button>
                    </Link>
                  </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-10">
          <Link to="/search">
            <Button variant="outline" size="lg">
              Voir tous les outils
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;
