
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, Camera, Euro, Shield, MapPin, Tag, FileText, Settings, Calendar } from 'lucide-react';

const AddTool = () => {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = {
    'jardinage': 'Jardinage',
    'bricolage': 'Bricolage', 
    'transport': 'Transport',
    'nettoyage': 'Nettoyage',
    'evenementiel': 'Événementiel'
  };

  const subcategories = {
    'jardinage': ['Gazon', 'Terre', 'Bois', 'Arbre', 'Feuilles'],
    'bricolage': ['Construction', 'Électricité', 'Peinture', 'Vis et Boulons'],
    'transport': ['Charge lourde', 'Moteur', 'Roue'],
    'nettoyage': ['Tissus', 'Eau', 'Poussière'],
    'evenementiel': ['Son', 'Éclairage', 'Cuisine', 'Animation et Jeux', 'Décoration', 'Mobilier', 'Structure']
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <main className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
              <Tag className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Proposer un outil
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partagez vos outils avec la communauté et générez des revenus en les louant facilement
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 border-b">
              <CardTitle className="text-2xl flex items-center text-foreground">
                <Settings className="h-6 w-6 mr-3 text-accent" />
                Informations de l'outil
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    Informations générales
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-medium text-foreground">
                        Titre de l'annonce *
                      </Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Perceuse électrique Bosch Professional" 
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="brand" className="text-sm font-medium text-foreground">
                        Marque
                      </Label>
                      <Input 
                        id="brand" 
                        placeholder="Ex: Bosch" 
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="model" className="text-sm font-medium text-foreground">
                        Modèle
                      </Label>
                      <Input 
                        id="model" 
                        placeholder="Ex: GSB 13 RE" 
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="year" className="text-sm font-medium text-foreground">
                        Année d'achat
                      </Label>
                      <Input 
                        id="year" 
                        type="number"
                        placeholder="Ex: 2022" 
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-medium text-foreground">
                      Description
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Décrivez votre outil, son état, ses accessoires..."
                      className="min-h-[120px] resize-none text-base"
                    />
                  </div>
                </div>

                {/* Category Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Catégorisation
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">Catégorie *</Label>
                      <Select onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categories).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">Sous-catégorie</Label>
                      <Select disabled={!selectedCategory}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Choisir une sous-catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory && subcategories[selectedCategory as keyof typeof subcategories]?.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">État de l'outil *</Label>
                    <Select>
                      <SelectTrigger className="h-12 text-base">
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

                {/* Pricing Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Euro className="h-5 w-5 mr-2 text-accent" />
                    Tarification
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="price" className="text-sm font-medium text-foreground">
                        Prix par jour (€) *
                      </Label>
                      <div className="relative">
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="25" 
                          className="h-12 text-base pl-8"
                        />
                        <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="deposit" className="text-sm font-medium text-foreground">
                        Caution (€)
                      </Label>
                      <div className="relative">
                        <Input 
                          id="deposit" 
                          type="number" 
                          placeholder="100" 
                          className="h-12 text-base pl-8"
                        />
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-accent" />
                    Localisation
                  </h3>
                  
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-sm font-medium text-foreground">
                      Adresse ou ville *
                    </Label>
                    <Input 
                      id="location" 
                      placeholder="Paris 15ème" 
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                {/* Photos Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-accent" />
                    Photos
                  </h3>
                  
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-accent bg-accent/10 scale-[1.02]' 
                        : 'border-border hover:border-accent hover:bg-accent/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-accent" />
                      </div>
                      <p className="text-lg font-medium text-foreground mb-2">
                        Ajoutez vos photos
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Glissez vos images ici ou cliquez pour parcourir
                      </p>
                      <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Parcourir les fichiers
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">
                        PNG, JPG jusqu'à 10MB • 5 photos maximum
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    Consignes d'utilisation
                  </h3>
                  
                  <div className="space-y-3">
                    <Label htmlFor="instructions" className="text-sm font-medium text-foreground">
                      Consignes du propriétaire
                    </Label>
                    <Textarea 
                      id="instructions" 
                      placeholder="Ex: Prévoir une rallonge électrique, nettoyer après usage, manipulation délicate..."
                      className="min-h-[100px] resize-none text-base"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    size="lg"
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Publier l'annonce
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTool;
