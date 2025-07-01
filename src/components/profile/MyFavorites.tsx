
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyFavorites = () => {
  const favorites = [
    {
      id: '1',
      title: 'Perceuse visseuse sans fil',
      owner: 'Marie Dubois',
      price: 20,
      rating: 4.8,
      location: 'Paris 15ème',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Scie sauteuse Bosch',
      owner: 'Paul Martin',
      price: 15,
      rating: 4.9,
      location: 'Paris 12ème',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Meuleuse d\'angle',
      owner: 'Sophie Durand',
      price: 18,
      rating: 4.7,
      location: 'Paris 8ème',
      image: '/placeholder.svg'
    }
  ];

  const handleRemoveFavorite = (id: string) => {
    // Remove from favorites logic
    console.log('Remove favorite:', id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Mes Favoris
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">Aucun favori pour le moment</p>
            <Link to="/search">
              <Button>Explorer le catalogue</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={favorite.image} 
                    alt={favorite.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{favorite.title}</h3>
                        <p className="text-sm text-muted-foreground">par {favorite.owner}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {favorite.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {favorite.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-primary">
                        {favorite.price}€/jour
                      </div>
                      <Link to={`/tool/${favorite.id}`}>
                        <Button size="sm">
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyFavorites;
