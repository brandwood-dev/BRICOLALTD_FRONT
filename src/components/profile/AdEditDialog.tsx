
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Euro, MapPin, Tag, FileText, Camera } from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  category: string;
  price: number;
  published: boolean;
  validationStatus: string;
  rating: number;
  totalRentals: number;
  image: string;
}

interface AdEditDialogProps {
  ad: Ad;
}

const AdEditDialog = ({ ad }: AdEditDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: ad.title,
    brand: '',
    model: '',
    year: '',
    category: ad.category,
    subcategory: '',
    condition: '',
    price: ad.price,
    deposit: '',
    location: '',
    description: '',
    instructions: ''
  });

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

  const handleSave = () => {
    toast({
      title: "Succès",
      description: "Votre annonce a été modifiée avec succès.",
    });
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Modifier l'annonce</DialogTitle>
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
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
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
          
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Glissez vos images ici ou cliquez pour parcourir
            </p>
            <Button variant="outline" size="sm">
              Parcourir les fichiers
            </Button>
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
