
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { Search as SearchIcon, MapPin, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredTools] = useState(mockTools);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Filtres</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Recherche</Label>
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Nom de l'outil..." className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Localisation</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Ville, code postal..." className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          <SelectItem value="garden">Jardinage</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="automotive">Automobile</SelectItem>
                          <SelectItem value="electric">Électricité</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Prix par jour: {priceRange[0]}€ - {priceRange[1]}€</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Note minimum</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les notes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les notes</SelectItem>
                          <SelectItem value="4">4+ étoiles</SelectItem>
                          <SelectItem value="4.5">4.5+ étoiles</SelectItem>
                          <SelectItem value="5">5 étoiles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Disponibilité</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les outils" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les outils</SelectItem>
                          <SelectItem value="available">Disponible maintenant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">Appliquer les filtres</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{filteredTools.length} outils trouvés</h1>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={tool.images[0]} 
                        alt={tool.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {!tool.available && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          Non disponible
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <Link to={`/tool/${tool.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-accent">
                          {tool.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                        <span className="text-sm text-gray-500">({tool.reviews} avis)</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{tool.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-bold text-accent">{tool.price}€</span>
                          <span className="text-sm text-gray-500">/{tool.period}</span>
                        </div>
                        <Button size="sm" disabled={!tool.available}>
                          {tool.available ? 'Louer' : 'Indisponible'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
