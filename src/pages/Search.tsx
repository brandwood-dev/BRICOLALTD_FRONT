
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
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useSearchParams } from 'react-router-dom';
import { Filter, MapPin, SearchIcon, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const API_URL = 'http://localhost:3001/tools';

const Search = () => {
  const { t } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null);
  const addressTimeout = useRef<NodeJS.Timeout | null>(null);
  const [location, setLocation] = useState('');
  const [tools, setTools] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

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

  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null);

  // Handle favorite toggle
  const handleFavoriteToggle = async (toolId: string, toolTitle: string) => {
    if (favoriteLoading === toolId) return; // Prevent multiple clicks
    
    try {
      setFavoriteLoading(toolId);
      if (isFavorite(toolId)) {
        await removeFromFavorites(toolId);
        toast({ title: 'Retiré des favoris', description: toolTitle });
      } else {
        await addToFavorites(toolId);
        toast({ title: 'Ajouté aux favoris', description: toolTitle });
      }
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la modification des favoris',
        variant: 'destructive'
      });
    } finally {
      setFavoriteLoading(null);
    }
  };

  // Add this function to reset all filters
  const resetFilters = () => {
    setSearchText('');
    setLocation('');
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setPriceRange([0, 1000]);
    setCurrentPage(1);
  };

  // Address autocomplete handler
  useEffect(() => {
    if (!addressInput) {
      setAddressSuggestions([]);
      return;
    }
    if (addressTimeout.current) clearTimeout(addressTimeout.current);
    addressTimeout.current = setTimeout(async () => {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressInput)}&addressdetails=1&limit=5`);
      const data = await res.json();
      setAddressSuggestions(data);
    }, 300);
    // eslint-disable-next-line
  }, [addressInput]);

  // Fetch tools from backend
  const fetchTools = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedSubCategory !== 'all') params.append('subcategory', selectedSubCategory);
      if (searchText) params.append('search', searchText);
      params.append('page', String(currentPage));
      params.append('limit', String(itemsPerPage));
      params.append('minPrice', String(priceRange[0]));
      params.append('maxPrice', String(priceRange[1]));
      params.append('sortBy', sortBy);
      // GEOSEARCH: add lat/lon/radius if address selected
      if (selectedCoords) {
        params.append('latitude', String(selectedCoords.lat));
        params.append('longitude', String(selectedCoords.lon));
        params.append('radius', '10'); // 10km default
      }
      const res = await fetch(`${API_URL}?${params.toString()}`);
      if (!res.ok) throw new Error('Erreur lors du chargement des outils');
      const data = await res.json();
      
      // Map backend fields to frontend expectations
      const mappedTools = (data.data || []).map(tool => {
        console.log('Tool data:', tool); // Debug log
        return {
          ...tool,
          images: tool.photos?.map(photo => photo.url) || [],
          price: tool.basePrice,
          location: tool.pickupAddress,
          category: tool.category?.name || tool.category,
          owner: tool.owner?.firstName ? `${tool.owner.firstName} ${tool.owner.lastName}` : 'Unknown',
          rating: tool.reviewStats?.averageRating || 0,
          reviews: tool.reviewStats?.totalReviews || 0,
          available: tool.availabilityStatus === 'AVAILABLE' || tool.availabilityStatus === 'DISPONIBLE' || tool.availabilityStatus === 'available'
        };
      });
      
      setTools(mappedTools);
      setTotal(data.total || 0);
    } catch (err) {
      toast({ title: 'Erreur', description: err.message || 'Erreur inconnue', variant: 'destructive' });
      setTools([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
    // eslint-disable-next-line
  }, [selectedCategory, selectedSubCategory, searchText, priceRange[0], priceRange[1], currentPage, sortBy, selectedCoords]);

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

  // Remove all mockTools/filter logic, use tools and total from API
  // Calculate pagination
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTools = tools.slice(startIndex, endIndex);

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
                        <Input 
                          placeholder="Nom de l'outil..." 
                          className="pl-10"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Adresse</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Adresse, ville..."
                          className="pl-10"
                          value={addressInput}
                          onChange={e => {
                            setAddressInput(e.target.value);
                            setSelectedCoords(null);
                          }}
                          autoComplete="off"
                        />
                        {addressSuggestions.length > 0 && (
                          <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow-lg max-h-48 overflow-auto">
                            {addressSuggestions.map((s, idx) => (
                              <div
                                key={s.place_id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                  setAddressInput(s.display_name);
                                  setSelectedCoords({ lat: parseFloat(s.lat), lon: parseFloat(s.lon) });
                                  setAddressSuggestions([]);
                                }}
                              >
                                {s.display_name}
                              </div>
                            ))}
                          </div>
                        )}
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
                          max={1000}
                          min={0}
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

                    <Button className="w-full" onClick={resetFilters}>Réinitialiser les filtres</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{total} outils trouvés</h1>
                  {selectedCategory !== 'all' && (
                    <p className="text-gray-600 mt-1">
                      Catégorie: {categoryMap[selectedCategory] || selectedCategory}
                    </p>
                  )}
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
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
                {loading ? (
                  <div className="col-span-full text-center py-10">
                    <p>Chargement des outils...</p>
                  </div>
                ) : currentTools.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <p>Aucun outil trouvé pour vos critères de recherche.</p>
                  </div>
                ) : (
                  currentTools.map((tool) => {
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
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFavoriteToggle(tool.id, tool.title);
                            }}
                            disabled={favoriteLoading === tool.id}
                            className={`absolute top-3 right-3 px-3 py-1.5 rounded-full shadow-md transition-colors text-sm font-medium ${
                              isFavorite(tool.id) 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            } ${favoriteLoading === tool.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-1">
                              {favoriteLoading === tool.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <Heart 
                                  className={`h-4 w-4 ${isFavorite(tool.id) ? 'fill-white' : 'text-gray-400'}`} 
                                />
                              )}
                              <span className="hidden sm:inline">
                                {favoriteLoading === tool.id 
                                  ? '...' 
                                  : isFavorite(tool.id) 
                                    ? 'Retirer' 
                                    : 'Favoris'
                                }
                              </span>
                            </div>
                          </button>
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
                              {tool.available ? (t('tools.rent') || 'Louer') : 'Indisponible'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
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
