
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedToolsSection = () => {
  const { t } = useLanguage();

  const tools = [
    {
      id: 1,
      name: 'Perceuse Bosch Professional',
      price: 15,
      rating: 4.8,
      reviews: 24,
      location: 'Paris 15ème',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'Électrique',
      available: true,
      owner: 'Marc D.'
    },
    {
      id: 2,
      name: 'Tronçonneuse Stihl',
      price: 25,
      rating: 4.9,
      reviews: 18,
      location: 'Lyon 3ème',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'Jardinage',
      available: true,
      owner: 'Sophie L.'
    },
    {
      id: 3,
      name: 'Bétonnière 140L',
      price: 35,
      rating: 4.7,
      reviews: 12,
      location: 'Marseille 8ème',
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'Construction',
      available: true,
      owner: 'Pierre M.'
    },
    {
      id: 4,
      name: 'Ponceuse excentrique',
      price: 12,
      rating: 4.6,
      reviews: 31,
      location: 'Toulouse 1er',
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'Électrique',
      available: true,
      owner: 'Anne R.'
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-100">
                  {t('tools.available')}
                </Badge>
                <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {tool.rating} ({tool.reviews})
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 truncate">
                  {tool.name}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {tool.location}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-primary">
                    {tool.price}€<span className="text-sm font-normal text-gray-500">/{t('tools.day')}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    par {tool.owner}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/tool/${tool.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      {t('tools.rent')}
                    </Button>
                  </Link>
                  <Link to={`/tool/${tool.id}`}>
                    <Button size="sm" variant="outline">
                      {t('tools.details')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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
