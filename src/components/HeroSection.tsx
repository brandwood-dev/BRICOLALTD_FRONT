
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section 
      className="hero-gradient py-20 px-4 relative bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        {/* Search bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xl max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('hero.search.placeholder')}
                className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('hero.search.location')}
                className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white"
              />
            </div>
            <Link to="/search">
              <Button size="lg" className="h-12 px-8 bg-accent hover:bg-accent/90 text-white">
                {t('hero.search.button')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-white">
          <div>
            <div className="text-3xl font-bold">5000+</div>
            <div className="text-white/80">Outils disponibles</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2000+</div>
            <div className="text-white/80">Utilisateurs actifs</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-white/80">Villes couvertes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
