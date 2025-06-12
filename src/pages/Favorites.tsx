
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, MapPin, ArrowLeft } from 'lucide-react';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
              </Link>
            </div>
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Aucun favori pour le moment</h1>
              <p className="text-gray-600 mb-6">Explorez notre catalogue et ajoutez vos outils préférés à vos favoris</p>
              <Link to="/search">
                <Button>Explorer le catalogue</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">Mes favoris</h1>
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
              {favorites.length} outil{favorites.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((tool) => (
              <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={tool.images[0]} 
                    alt={tool.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => removeFromFavorites(tool.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tool.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{tool.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-accent">
                      {tool.price}€<span className="text-sm font-normal text-gray-600">/jour</span>
                    </div>
                    <Link to={`/tool/${tool.id}`}>
                      <Button size="sm">Voir détails</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
