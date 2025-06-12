
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wrench, Hammer, Car, Zap, Leaf, Drill } from 'lucide-react';

const CategoriesSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'garden',
      name: t('categories.garden'),
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      count: '500+ outils'
    },
    {
      id: 'construction',
      name: t('categories.construction'),
      icon: Hammer,
      color: 'bg-orange-100 text-orange-600',
      count: '800+ outils'
    },
    {
      id: 'automotive',
      name: t('categories.automotive'),
      icon: Car,
      color: 'bg-blue-100 text-blue-600',
      count: '300+ outils'
    },
    {
      id: 'electric',
      name: t('categories.electric'),
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
      count: '400+ outils'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différentes catégories d'outils disponibles à la location
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer card-hover"
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                <category.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
