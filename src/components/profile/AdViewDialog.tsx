import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const AdViewDialog = ({ ad }: { ad: any }) => {
  const getPublicationStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLIE': return 'bg-green-100 text-green-800';
      case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
      case 'REJETE': return 'bg-red-100 text-red-800';
      case 'SUSPENDU': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPublicationStatusText = (status: string) => {
    switch (status) {
      case 'PUBLIE': return 'Publié';
      case 'EN_ATTENTE': return 'En attente';
      case 'REJETE': return 'Rejeté';
      case 'SUSPENDU': return 'Suspendu';
      default: return status;
    }
  };

  const primaryPhoto = ad.photos?.find((photo: any) => photo.isPrimary) || ad.photos?.[0];

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Aperçu de l'annonce</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="flex gap-6">
          <img 
            src={primaryPhoto?.url || '/placeholder.svg'} 
            alt={ad.title}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold">{ad.title}</h2>
              <p className="text-muted-foreground">
                {ad.category?.displayName || ad.category?.name} - {ad.subcategory?.displayName || ad.subcategory?.name}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getPublicationStatusColor(ad.publicationStatus)}>
                {getPublicationStatusText(ad.publicationStatus)}
              </Badge>
            </div>
            
            <div className="text-2xl font-bold text-primary">
              {ad.totalPrice ? `${ad.totalPrice.toFixed(2)}€/jour` : `${ad.basePrice}€/jour`}
              {ad.totalPrice && (
                <div className="text-sm text-muted-foreground mt-1">
                  Prix de base: {ad.basePrice}€ + frais de service
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">Description</h3>
          <p className="text-muted-foreground">{ad.description}</p>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdViewDialog; 