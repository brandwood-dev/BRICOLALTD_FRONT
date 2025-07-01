
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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
    category: ad.category,
    price: ad.price,
    description: ''
  });

  const categories = ['Jardinage', 'Bricolage', 'Transport', 'Nettoyage', 'Événementiel'];

  const handleSave = () => {
    toast({
      title: "Succès",
      description: "Votre annonce a été modifiée avec succès.",
    });
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Modifier l'annonce</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre de l'annonce</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Prix par jour (€)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Décrivez votre outil..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdEditDialog;
