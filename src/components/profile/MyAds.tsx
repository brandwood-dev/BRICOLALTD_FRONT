
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Eye, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdEditDialog from './AdEditDialog';
import AdViewDialog from './AdViewDialog';

const MyAds = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Tondeuse à gazon électrique',
      category: 'Jardinage',
      price: 25,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.8,
      totalRentals: 12,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Marteau-piqueur professionnel',
      category: 'Bricolage',
      price: 45,
      published: false,
      validationStatus: 'pending',
      rating: 4.9,
      totalRentals: 8,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Nettoyeur haute pression',
      category: 'Nettoyage',
      price: 30,
      published: true,
      validationStatus: 'rejected',
      rating: 4.5,
      totalRentals: 5,
      image: '/placeholder.svg'
    }
  ]);

  const getValidationStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValidationStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  const handlePublishToggle = (adId: string, published: boolean) => {
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? { ...ad, published } : ad
      )
    );
  };

  const handleDeleteAd = (adId: string) => {
    setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
    toast({
      title: "Succès",
      description: "Votre annonce a été bien supprimée.",
    });
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
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">{ad.category}</p>
                    </div>
                    <Badge className={getValidationStatusColor(ad.validationStatus)}>
                      {getValidationStatusText(ad.validationStatus)}
                    </Badge>
                  </div>
                  
                  {/* Statut de publication */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Statut de publication :</Label>
                    <RadioGroup 
                      value={ad.published ? 'published' : 'unpublished'} 
                      onValueChange={(value) => handlePublishToggle(ad.id, value === 'published')}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id={`published-${ad.id}`} />
                        <Label htmlFor={`published-${ad.id}`} className="text-sm">Publié</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unpublished" id={`unpublished-${ad.id}`} />
                        <Label htmlFor={`unpublished-${ad.id}`} className="text-sm">Non publié</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              onClick={() => handleDeleteAd(ad.id)}
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyAds;
