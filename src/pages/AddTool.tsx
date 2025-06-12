
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload } from 'lucide-react';

const AddTool = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Proposer un outil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l'annonce</Label>
                <Input id="title" placeholder="Ex: Perceuse électrique Bosch Professional" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez votre outil, son état, ses accessoires..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="garden">Jardinage</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="automotive">Automobile</SelectItem>
                      <SelectItem value="electric">Électricité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">État</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="État de l'outil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Neuf</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Bon</SelectItem>
                      <SelectItem value="fair">Correct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix par jour (€)</Label>
                  <Input id="price" type="number" placeholder="25" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deposit">Caution (€)</Label>
                  <Input id="deposit" type="number" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input id="location" placeholder="Paris 15ème" />
              </div>

              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Cliquez pour ajouter des photos ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Disponibilité</Label>
                <Textarea 
                  id="availability" 
                  placeholder="Précisez vos créneaux de disponibilité..."
                  className="min-h-[80px]"
                />
              </div>

              <Button className="w-full" size="lg">
                Publier l'annonce
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTool;
