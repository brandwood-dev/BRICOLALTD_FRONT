
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, Clock } from 'lucide-react';

const Reservations = () => {
  const reservations = [
    {
      id: '1',
      toolName: 'Perceuse sans fil',
      owner: 'Marie Dubois',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'completed',
      price: 25,
      location: 'Paris 15ème',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      toolName: 'Scie circulaire',
      owner: 'Paul Martin',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'active',
      price: 35,
      location: 'Paris 12ème',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      toolName: 'Ponceuse orbitale',
      owner: 'Sophie Durand',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'upcoming',
      price: 20,
      location: 'Paris 8ème',
      image: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminée';
      case 'active': return 'En cours';
      case 'upcoming': return 'À venir';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mes Réservations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <img 
                  src={reservation.image} 
                  alt={reservation.toolName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{reservation.toolName}</h3>
                      <p className="text-sm text-muted-foreground">par {reservation.owner}</p>
                    </div>
                    <Badge className={getStatusColor(reservation.status)}>
                      {getStatusText(reservation.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Du {reservation.startDate} au {reservation.endDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {reservation.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-primary">
                      {reservation.price}€
                    </div>
                    <div className="flex gap-2">
                      {reservation.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Noter
                        </Button>
                      )}
                      {reservation.status === 'active' && (
                        <Button variant="outline" size="sm">
                          Contacter
                        </Button>
                      )}
                      {reservation.status === 'upcoming' && (
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      )}
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

export default Reservations;
