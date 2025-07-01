
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyAds = () => {
  const ads = [
    {
      id: '1',
      title: 'Tondeuse à gazon électrique',
      category: 'Jardinage',
      price: 25,
      status: 'active',
      views: 45,
      rating: 4.8,
      totalRentals: 12,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Marteau-piqueur professionnel',
      category: 'Bricolage',
      price: 45,
      status: 'rented',
      views: 23,
      rating: 4.9,
      totalRentals: 8,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Nettoyeur haute pression',
      category: 'Nettoyage',
      price: 30,
      status: 'inactive',
      views: 12,
      rating: 4.5,
      totalRentals: 5,
      image: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'rented': return 'Loué';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Mes Annonces
        </CardTitle>
        <Link to="/add-tool">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle annonce
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ads.map((ad) => (
            <div key={ad.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">{ad.category}</p>
                    </div>
                    <Badge className={getStatusColor(ad.status)}>
                      {getStatusText(ad.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {ad.views} vues
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {ad.rating}
                    </div>
                    <div>
                      {ad.totalRentals} locations
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-primary">
                      {ad.price}€/jour
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyAds;
