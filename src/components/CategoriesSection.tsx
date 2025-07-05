
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scissors, Hammer, Droplets, Car, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      name: 'Jardinage',
      icon: Scissors,
      color: 'bg-green-100 text-green-700',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Bricolage',
      icon: Hammer,
      color: 'bg-orange-100 text-orange-700',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Nettoyage',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-700',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Transport',
      icon: Car,
      color: 'bg-purple-100 text-purple-700',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Événementiel',
      icon: Music,
      color: 'bg-pink-100 text-pink-700',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos catégories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez l'outil parfait selon vos besoins
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={index}
                to={`/search?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className={`absolute top-4 left-4 p-2 rounded-lg ${category.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-center">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
