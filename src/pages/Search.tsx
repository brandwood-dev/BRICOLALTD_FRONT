
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { Search as SearchIcon, MapPin, Star, Filter, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Link, useSearchParams } from 'react-router-dom';

const Search = () => {
  const { t } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(mockTools);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTools = filteredTools.slice(startIndex, endIndex);

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
                {currentTools.map((tool) => {
                  const displayPrice = calculateDisplayPrice(tool.price);
                  return (
                    <div key={tool.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
                      {/* Image */}
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={tool.images[0]}
                          alt={tool.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {tool.rating} ({tool.reviews})
                          </div>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 truncate">
                          {tool.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {tool.location}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-bold text-primary">
                            {displayPrice.toFixed(1)}€<span className="text-sm font-normal text-gray-500">/{t('tools.day')}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            par {tool.owner}
                          </div>
                        </div>

                        <Link to={`/tool/${tool.id}`} className="w-full">
                          <Button size="sm" className="w-full" disabled={!tool.available}>
                            {tool.available ? t('tools.rent') : 'Indisponible'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
