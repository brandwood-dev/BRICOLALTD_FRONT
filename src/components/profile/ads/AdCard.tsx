import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Eye, Trash2, Star } from 'lucide-react';
import AdEditDialog from '../AdEditDialog';
import AdViewDialog from '../AdViewDialog';

interface AdCardProps {
  ad: any;
  onPublishToggle: (adId: string, published: boolean) => void;
  onDeleteAd: (adId: string) => void;
  getValidationStatusColor: (status: string) => string;
  getValidationStatusText: (status: string) => string;
}

const AdCard = ({ ad, onPublishToggle, onDeleteAd, getValidationStatusColor, getValidationStatusText }: AdCardProps) => {
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
    <div className="border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img 
          src={primaryPhoto?.url || '/placeholder.svg'} 
          alt={ad.title}
          className="w-full sm:w-20 h-48 sm:h-20 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-3 w-full sm:w-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold">{ad.title}</h3>
              <p className="text-sm text-muted-foreground">{ad.category?.displayName || ad.category?.name}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Badge className={getPublicationStatusColor(ad.publicationStatus)}>
                {getPublicationStatusText(ad.publicationStatus)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getAvailabilityStatusText(ad.availabilityStatus)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {ad.reviewStats && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {ad.reviewStats.averageRating?.toFixed(1) || 0}
                <span className="text-muted-foreground">({ad.reviewStats.totalReviews || 0} avis)</span>
              </div>
            )}
            {ad._count && (
              <div>
                {ad._count.reservations || 0} locations
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="font-semibold text-primary">
              {ad.totalPrice ? `${ad.totalPrice.toFixed(2)}€/jour` : `${ad.basePrice}€/jour`}
              {ad.totalPrice && (
                <span className="text-xs text-muted-foreground ml-1">
                  (base: {ad.basePrice}€ + frais)
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </DialogTrigger>
                <AdEditDialog ad={ad} />
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </DialogTrigger>
                <AdViewDialog ad={ad} />
              </Dialog>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDeleteAd(ad.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Oui, je veux supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;