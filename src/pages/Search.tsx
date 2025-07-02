
import React, { useState, useEffect } from 'react';
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
import { Link, useSearchParams } from 'react-router-dom';

const Search = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(mockTools);

  // Category mapping
  const categoryMap: { [key: string]: string } = {
    'jardinage': 'Jardinage',
    'bricolage': 'Bricolage', 
    'transport': 'Transport',
    'nettoyage': 'Nettoyage',
    'evenementiel': 'Événementiel'
  };

  // Subcategories mapping
  const subCategoriesMap: { [key: string]: string[] } = {
    'jardinage': ['Gazon', 'Terre', 'Bois', 'Arbre', 'Feuilles'],
    'bricolage': ['Construction', 'Électricité', 'Peinture', 'Vis et Boulons'],
    'transport': ['Charge lourde', 'Moteur', 'Roue'],
    'nettoyage': ['Tissus', 'Eau', 'Poussière'],
    'evenementiel': ['Son', 'Éclairage', 'Cuisine', 'Animation et Jeux', 'Décoration', 'Mobilier', 'Structure']
  };

  // Calculate display price with 5.4% fees
  const calculateDisplayPrice = (originalPrice: number) => {
    const feeRate = 0.054;
    const feeAmount = originalPrice * feeRate;
    return originalPrice + feeAmount;
  };

  useEffect(() => {
    // Filter tools based on selected category
    let filtered = mockTools;
    
    if (selectedCategory !== 'all') {
      const categoryName = categoryMap[selectedCategory];
      if (categoryName) {
        filtered = mockTools.filter(tool => 
          tool.category.toLowerCase().includes(categoryName.toLowerCase())
        );
      }
    }
    
    setFilteredTools(filtered);
  }, [selectedCategory]);

  // Set initial category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

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
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          <SelectItem value="jardinage">Jardinage</SelectItem>
                          <SelectItem value="bricolage">Bricolage</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="nettoyage">Nettoyage</SelectItem>
                          <SelectItem value="evenementiel">Événementiel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCategory !== 'all' && (
                      <div className="space-y-2">
                        <Label>Sous-catégorie</Label>
                        <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Toutes les sous-catégories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                            {subCategoriesMap[selectedCategory]?.map((subCat) => (
                              <SelectItem key={subCat} value={subCat.toLowerCase().replace(/\s+/g, '-')}>
                                {subCat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Prix par jour</Label>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={100}
                          step={5}
                          className="mt-2"
                        />
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                            {priceRange[0]}€
                          </span>
                          <span className="text-gray-400">-</span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                            {priceRange[1]}€
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Appliquer les filtres</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{filteredTools.length} outils trouvés</h1>
                  {selectedCategory !== 'all' && (
                    <p className="text-gray-600 mt-1">
                      Catégorie: {categoryMap[selectedCategory] || selectedCategory}
                    </p>
                  )}
                </div>
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
                {filteredTools.map((tool) => {
                  const displayPrice = calculateDisplayPrice(tool.price);
                  return (
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
                            <span className="text-lg font-bold text-accent">{displayPrice.toFixed(1)}€</span>
                            <span className="text-sm text-gray-500">/{tool.period}</span>
                          </div>
                          <Link to={`/tool/${tool.id}`}>
                            <Button size="sm" disabled={!tool.available}>
                              {tool.available ? 'Louer' : 'Indisponible'}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
