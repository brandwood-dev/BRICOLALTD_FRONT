
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Proposer un outil
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Partagez vos outils avec la communauté et générez des revenus en les louant facilement
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Commission faible
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Paiement sécurisé
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                Gestion simplifiée
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <Tag className="h-6 w-6 mr-3" />
                    Informations de l'outil
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-lg font-semibold flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Titre de l'annonce
                      </Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Perceuse électrique Bosch Professional" 
                        className="h-12 text-lg border-2 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-lg font-semibold">Description détaillée</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Décrivez votre outil, son état, ses accessoires, son utilisation recommandée..."
                        className="min-h-[120px] border-2 focus:border-primary resize-none"
                      />
                    </div>
                  </div>

                  {/* Category and Condition */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Catégorie</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                      <Label className="text-lg font-semibold">État de l'outil</Label>
                      <Select>
                        <SelectTrigger className="h-12 border-2 focus:border-primary">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-lg font-semibold flex items-center">
                        <Euro className="h-5 w-5 mr-2 text-green-600" />
                        Prix par jour (€)
                      </Label>
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="25" 
                        className="h-12 border-2 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deposit" className="text-lg font-semibold flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-600" />
                        Caution (€)
                      </Label>
                      <Input 
                        id="deposit" 
                        type="number" 
                        placeholder="100" 
                        className="h-12 border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-lg font-semibold flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-red-600" />
                      Localisation
                    </Label>
                    <Input 
                      id="location" 
                      placeholder="Paris 15ème" 
                      className="h-12 border-2 focus:border-primary"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center">
                      <Camera className="h-5 w-5 mr-2 text-purple-600" />
                      Photos de l'outil
                    </Label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                        dragActive 
                          ? 'border-primary bg-primary/5 scale-105' 
                          : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Cliquez pour ajouter des photos ou glissez-déposez
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PNG, JPG jusqu'à 10MB (5 photos max)
                      </p>
                      <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                        Parcourir les fichiers
                      </Button>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label htmlFor="availability" className="text-lg font-semibold flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                      Disponibilité
                    </Label>
                    <Textarea 
                      id="availability" 
                      placeholder="Précisez vos créneaux de disponibilité (ex: Lun-Ven 8h-18h, Week-end sur demande...)"
                      className="min-h-[100px] border-2 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Upload className="h-5 w-5 mr-2" />
                    Publier l'annonce
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Conseils pour une annonce réussie
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm">Ajoutez plusieurs photos de qualité</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm">Décrivez précisément l'état de l'outil</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm">Fixez un prix compétitif</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm">Mentionnez les accessoires inclus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Guide */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Euro className="h-5 w-5 mr-2" />
                    Guide de prix
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Perceuse</span>
                    <span className="text-sm text-green-600 font-semibold">15-25€/jour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tronçonneuse</span>
                    <span className="text-sm text-green-600 font-semibold">25-40€/jour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Bétonnière</span>
                    <span className="text-sm text-green-600 font-semibold">30-50€/jour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Ponceuse</span>
                    <span className="text-sm text-green-600 font-semibold">10-20€/jour</span>
                  </div>
                </CardContent>
              </Card>

              {/* Security Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Sécurité & Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Assurance incluse</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Support 24/7</span>
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
