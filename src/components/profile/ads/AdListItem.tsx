import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Eye, Trash2 } from 'lucide-react';
import AdEditDialog from '../AdEditDialog';
import AdViewDialog from '../AdViewDialog';

interface AdListItemProps {
  ad: any;
  onPublishToggle: (adId: string, published: boolean) => void;
  onDeleteAd: (adId: string) => void;
  getValidationStatusColor: (status: string) => string;
  getValidationStatusText: (status: string) => string;
}

const AdListItem = ({ ad, onPublishToggle, onDeleteAd, getValidationStatusColor, getValidationStatusText }: AdListItemProps) => {
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

  const getAvailabilityStatusText = (status: string) => {
    switch (status) {
      case 'DISPONIBLE': return 'Disponible';
      case 'OCCUPE': return 'Occupé';
      case 'MAINTENANCE': return 'En maintenance';
      default: return status;
    }
  };

  const primaryPhoto = ad.photos?.find(photo => photo.isPrimary) || ad.photos?.[0];

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <img 
          src={primaryPhoto?.url || '/placeholder.svg'} 
          alt={ad.title}
          className="w-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{ad.title}</h3>
          <p className="text-xs text-muted-foreground">{ad.category?.displayName || ad.category?.name}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge className={getPublicationStatusColor(ad.publicationStatus)} variant="outline">
          {getPublicationStatusText(ad.publicationStatus)}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {getAvailabilityStatusText(ad.availabilityStatus)}
        </Badge>
        <div className="font-semibold text-primary text-sm">
          {ad.totalPrice ? `${ad.totalPrice.toFixed(2)}€/jour` : `${ad.basePrice}€/jour`}
          {ad.totalPrice && (
            <span className="text-xs text-muted-foreground ml-1">
              (base: {ad.basePrice}€ + frais)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdListItem;