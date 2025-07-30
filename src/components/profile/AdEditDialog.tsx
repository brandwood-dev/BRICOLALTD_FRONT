
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, Euro, MapPin, Tag, FileText, Camera, X, Trash2 } from 'lucide-react';
import listingApiService from '@/services/ListingApi';

interface Ad {
  id: string;
  title: string;
  description: string;
  brand?: string;
  model?: string;
  year?: number;
  condition: string;
  pickupAddress: string;
  basePrice: number;
  depositAmount: number;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
  subcategory: {
    id: string;
    name: string;
    displayName: string;
  };
  ownerInstructions?: string;
  publicationStatus: string;
  availabilityStatus: string;
  photos: Array<{
    id: string;
    url: string;
    filename: string;
    isPrimary: boolean;
  }>;
}

interface AdEditDialogProps {
  ad: Ad;
}

const AdEditDialog = ({ ad }: AdEditDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: ad.title || '',
    brand: ad.brand || '',
    model: ad.model || '',
    year: ad.year?.toString() || '',
    category: ad.category?.displayName || ad.category?.name || '',
    subcategory: ad.subcategory?.displayName || ad.subcategory?.name || '',
    condition: ad.condition || '',
    price: ad.basePrice?.toString() || '',
    deposit: ad.depositAmount?.toString() || '',
    location: ad.pickupAddress || '',
    description: ad.description || '',
    instructions: ad.ownerInstructions || ''
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState(ad.photos || []);

  const categories = {
    'jardinage': 'Jardinage',
    'bricolage': 'Bricolage', 
    'transport': 'Transport',
    'nettoyage': 'Nettoyage',
    'evenementiel': 'Événementiel'
  };

  const subcategories = {
    'Jardinage': ['Gazon', 'Terre', 'Bois', 'Arbre', 'Feuilles'],
    'Bricolage': ['Construction', 'Électricité', 'Peinture', 'Vis et Boulons'],
    'Transport': ['Charge lourde', 'Moteur', 'Roue'],
    'Nettoyage': ['Tissus', 'Eau', 'Poussière'],
    'Événementiel': ['Son', 'Éclairage', 'Cuisine', 'Animation et Jeux', 'Décoration', 'Mobilier', 'Structure']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLIE': return 'bg-green-100 text-green-800';
      case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
      case 'REJETE': return 'bg-red-100 text-red-800';
      case 'SUSPENDU': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PUBLIE': return 'Publié';
      case 'EN_ATTENTE': return 'En attente';
      case 'REJETE': return 'Rejeté';
      case 'SUSPENDU': return 'Suspendu';
      default: return status;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (photoId: string) => {
    setExistingPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const setPrimaryPhoto = (photoId: string) => {
    setExistingPhotos(prev => 
      prev.map(photo => ({
        ...photo,
        isPrimary: photo.id === photoId
      }))
    );
  };

  const handleSave = async () => {
    try {
      const updateData = new FormData();
      updateData.append('title', formData.title);
      updateData.append('description', formData.description);
      updateData.append('brand', formData.brand);
      updateData.append('model', formData.model);
      updateData.append('year', formData.year);
      updateData.append('condition', formData.condition);
      updateData.append('basePrice', formData.price);
      updateData.append('depositAmount', formData.deposit);
      updateData.append('pickupAddress', formData.location);
      updateData.append('ownerInstructions', formData.instructions);
      updateData.append('category', formData.category);
      updateData.append('subcategoryId', formData.subcategory);

      // Add new photos
      selectedFiles.forEach((file, index) => {
        updateData.append('photos', file);
      });

      await listingApiService.updateTool(ad.id, updateData);
      
      toast({
        title: "Succès",
        description: "Votre annonce a été modifiée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'annonce. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Modifier l'annonce</DialogTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={getStatusColor(ad.publicationStatus)}>
            {getStatusText(ad.publicationStatus)}
          </Badge>
          {ad.publicationStatus === 'REJETE' && (
            <span className="text-sm text-red-600">
              Votre annonce a été rejetée. Vous pouvez la modifier et la soumettre à nouveau.
            </span>
          )}
        </div>
      </DialogHeader>
      <div className="space-y-6">
        {/* Informations générales */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Informations générales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'annonce *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                placeholder="Ex: Bosch"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                placeholder="Ex: GSB 13 RE"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Année d'achat</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                placeholder="Ex: 2022"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Décrivez votre outil, son état, ses accessoires..."
              rows={4}
            />
          </div>
        </div>

        {/* Catégorisation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            Catégorisation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Catégorie *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, value]) => (
                    <SelectItem key={key} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Sous-catégorie</Label>
              <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une sous-catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>État de l'outil *</Label>
            <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
              <SelectTrigger>
                <SelectValue placeholder="État de l'outil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">✨ Neuf</SelectItem>
                <SelectItem value="excellent">🌟 Excellent</SelectItem>
                <SelectItem value="good">👍 Bon</SelectItem>
                <SelectItem value="fair">👌 Correct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tarification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Euro className="h-5 w-5 mr-2" />
            Tarification
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix par jour (€) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deposit">Caution (€)</Label>
              <Input
                id="deposit"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Localisation
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="location">Adresse ou ville *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Paris 15ème"
            />
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Photos
          </h3>
          
          {/* Existing Photos */}
          {existingPhotos.length > 0 && (
            <div className="space-y-3">
              <Label>Photos existantes</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {existingPhotos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt="Photo de l'outil"
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryPhoto(photo.id)}
                          className="h-8 w-8 p-0"
                          title={photo.isPrimary ? "Photo principale" : "Définir comme principale"}
                        >
                          {photo.isPrimary ? "★" : "☆"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeExistingPhoto(photo.id)}
                          className="h-8 w-8 p-0"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {photo.isPrimary && (
                      <div className="absolute top-1 left-1">
                        <Badge className="bg-blue-500 text-white text-xs">Principale</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* New Photos Upload */}
          <div className="space-y-3">
            <Label>Ajouter de nouvelles photos</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Glissez vos images ici ou cliquez pour parcourir
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Parcourir les fichiers
                </Button>
              </label>
            </div>
            
            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Nouvelles photos sélectionnées</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Nouvelle photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeSelectedFile(index)}
                          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                          title="Supprimer"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Consignes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Consignes d'utilisation
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Consignes du propriétaire</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              placeholder="Ex: Prévoir une rallonge électrique, nettoyer après usage..."
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline">Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdEditDialog;
