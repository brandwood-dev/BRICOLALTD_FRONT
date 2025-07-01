
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, User, Clock } from 'lucide-react';

const Requests = () => {
  const requests = [
    {
      id: '1',
      toolName: 'Tondeuse à gazon électrique',
      owner: 'Marie Dubois',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'pending',
      totalPrice: 60,
      message: 'Bonjour, j\'aimerais louer votre tondeuse pour le weekend.'
    },
    {
      id: '2',
      toolName: 'Perceuse sans fil Bosch',
      owner: 'Paul Martin',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'accepted',
      totalPrice: 25,
      message: 'Disponible pour récupération après 14h.'
    },
    {
      id: '3',
      toolName: 'Scie circulaire',
      owner: 'Sophie Durand',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      status: 'declined',
      totalPrice: 35,
      message: 'Désolé, l\'outil n\'est plus disponible pour ces dates.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'declined': return 'Refusée';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Mes Demandes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{request.toolName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {request.owner}
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Du {request.startDate} au {request.endDate}
                </div>
                <div className="font-semibold text-primary">
                  {request.totalPrice}€
                </div>
              </div>

              <div className="bg-muted/50 p-3 rounded text-sm">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <p>{request.message}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {request.status === 'pending' && (
                  <Button variant="outline" size="sm">
                    Annuler la demande
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Contacter
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Requests;
