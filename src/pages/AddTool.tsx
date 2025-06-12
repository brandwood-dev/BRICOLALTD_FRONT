
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, Camera, Euro, Shield, MapPin, Calendar, Tag, FileText, Star } from 'lucide-react';

const AddTool = () => {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Proposer un outil
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partagez vos outils avec la communauté et générez des revenus en les louant facilement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="bg-accent text-accent-foreground">
                  <CardTitle className="text-xl flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Informations de l'outil
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-accent" />
                        Titre de l'annonce
                      </Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Perceuse électrique Bosch Professional" 
                        className="h-10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="font-medium">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Décrivez votre outil, son état, ses accessoires..."
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>

                  {/* Category and Condition */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium">Catégorie</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="garden">🌿 Jardinage</SelectItem>
                          <SelectItem value="construction">🔨 Construction</SelectItem>
                          <SelectItem value="automotive">🚗 Automobile</SelectItem>
                          <SelectItem value="electric">⚡ Électricité</SelectItem>
                          <SelectItem value="painting">🎨 Peinture</SelectItem>
                          <SelectItem value="cleaning">🧽 Nettoyage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-medium">État</Label>
                      <Select>
                        <SelectTrigger className="h-10">
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

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="font-medium flex items-center">
                        <Euro className="h-4 w-4 mr-2 text-accent" />
                        Prix par jour (€)
                      </Label>
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="25" 
                        className="h-10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deposit" className="font-medium flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-accent" />
                        Caution (€)
                      </Label>
                      <Input 
                        id="deposit" 
                        type="number" 
                        placeholder="100" 
                        className="h-10"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      Localisation
                    </Label>
                    <Input 
                      id="location" 
                      placeholder="Paris 15ème" 
                      className="h-10"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label className="font-medium flex items-center">
                      <Camera className="h-4 w-4 mr-2 text-accent" />
                      Photos
                    </Label>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <p className="font-medium text-foreground mb-1">
                        Cliquez ou glissez vos photos
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        PNG, JPG jusqu'à 10MB (5 photos max)
                      </p>
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Parcourir
                      </Button>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label htmlFor="availability" className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      Disponibilité
                    </Label>
                    <Textarea 
                      id="availability" 
                      placeholder="Ex: Lun-Ven 8h-18h, Week-end sur demande..."
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full h-12 font-medium bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Upload className="h-4 w-4 mr-2" />
                    Publier l'annonce
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Tips Card */}
              <Card>
                <CardHeader className="bg-accent text-accent-foreground pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Conseils
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <p className="text-sm">Photos de qualité</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <p className="text-sm">Description précise</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <p className="text-sm">Prix compétitif</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <p className="text-sm">Accessoires inclus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Guide */}
              <Card>
                <CardHeader className="bg-accent text-accent-foreground pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Euro className="h-4 w-4 mr-2" />
                    Prix moyens
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Perceuse</span>
                    <span className="font-medium">15-25€/j</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tronçonneuse</span>
                    <span className="font-medium">25-40€/j</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bétonnière</span>
                    <span className="font-medium">30-50€/j</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ponceuse</span>
                    <span className="font-medium">10-20€/j</span>
                  </div>
                </CardContent>
              </Card>

              {/* Security Card */}
              <Card>
                <CardHeader className="bg-accent text-accent-foreground pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-3 w-3 text-accent" />
                    <span>Assurance incluse</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-3 w-3 text-accent" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-3 w-3 text-accent" />
                    <span>Support 24/7</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTool;
