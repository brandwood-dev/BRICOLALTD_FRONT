
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import MyAdsSearchAndFilters from './MyAdsSearchAndFilters';
import AdCard from './ads/AdCard';
import AdListItem from './ads/AdListItem';
import AdsPagination from './ads/AdsPagination';

const MyAds = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Tondeuse à gazon électrique',
      category: 'Jardinage',
      price: 25,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.8,
      totalRentals: 12,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Marteau-piqueur professionnel',
      category: 'Bricolage',
      price: 45,
      published: false,
      validationStatus: 'pending',
      rating: 4.9,
      totalRentals: 8,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Nettoyeur haute pression',
      category: 'Nettoyage',
      price: 30,
      published: true,
      validationStatus: 'rejected',
      rating: 4.5,
      totalRentals: 5,
      image: '/placeholder.svg'
    },
    {
      id: '4',
      title: 'Perceuse visseuse sans fil',
      category: 'Bricolage',
      price: 20,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.7,
      totalRentals: 15,
      image: '/placeholder.svg'
    },
    {
      id: '5',
      title: 'Scie sauteuse professionnelle',
      category: 'Bricolage',
      price: 35,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.6,
      totalRentals: 9,
      image: '/placeholder.svg'
    },
    {
      id: '6',
      title: 'Taille-haie électrique',
      category: 'Jardinage',
      price: 28,
      published: false,
      validationStatus: 'pending',
      rating: 4.4,
      totalRentals: 6,
      image: '/placeholder.svg'
    },
    {
      id: '7',
      title: 'Aspirateur industriel',
      category: 'Nettoyage',
      price: 40,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.9,
      totalRentals: 18,
      image: '/placeholder.svg'
    },
    {
      id: '8',
      title: 'Ponceuse orbitale',
      category: 'Bricolage',
      price: 22,
      published: true,
      validationStatus: 'rejected',
      rating: 4.3,
      totalRentals: 4,
      image: '/placeholder.svg'
    },
    {
      id: '9',
      title: 'Souffleur de feuilles',
      category: 'Jardinage',
      price: 18,
      published: true,
      validationStatus: 'confirmed',
      rating: 4.5,
      totalRentals: 11,
      image: '/placeholder.svg'
    },
    {
      id: '10',
      title: 'Nettoyeur vapeur',
      category: 'Nettoyage',
      price: 32,
      published: false,
      validationStatus: 'pending',
      rating: 4.2,
      totalRentals: 7,
      image: '/placeholder.svg'
    }
  ]);

  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [validationFilter, setValidationFilter] = useState('all');
  const [publicationFilter, setPublicationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrage des annonces
  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ad.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesValidation = validationFilter === 'all' || ad.validationStatus === validationFilter;
      const matchesPublication = publicationFilter === 'all' || 
                                (publicationFilter === 'published' && ad.published) ||
                                (publicationFilter === 'unpublished' && !ad.published);
      const matchesCategory = categoryFilter === 'all' || ad.category === categoryFilter;
      
      return matchesSearch && matchesValidation && matchesPublication && matchesCategory;
    });
  }, [ads, searchTerm, validationFilter, publicationFilter, categoryFilter]);

  // Calculs de pagination
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAds = filteredAds.slice(startIndex, endIndex);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, validationFilter, publicationFilter, categoryFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getValidationStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValidationStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t('tools.approved');
      case 'pending': return t('tools.pending');
      case 'rejected': return t('tools.rejected');
      default: return status;
    }
  };

  const handlePublishToggle = (adId: string, published: boolean) => {
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? { ...ad, published } : ad
      )
    );
  };

  const handleDeleteAd = (adId: string) => {
    setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
    toast({
      title: t('message.success'),
      description: t('ads.delete.success'),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          {t('tools.my_ads')}
        </CardTitle>
        <Link to="/add-tool">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('tools.new_ad')}</span>
            <span className="sm:hidden">{t('tools.new_ad')}</span>
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <MyAdsSearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          validationFilter={validationFilter}
          onValidationFilterChange={setValidationFilter}
          publicationFilter={publicationFilter}
          onPublicationFilterChange={setPublicationFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        <div className={viewMode === 'grid' ? 'space-y-4' : 'space-y-2'}>
          {filteredAds.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune annonce trouvée pour les critères sélectionnés.
            </div>
          ) : (
            currentAds.map(ad => viewMode === 'grid' ? (
              <AdCard 
                key={ad.id}
                ad={ad}
                onPublishToggle={handlePublishToggle}
                onDeleteAd={handleDeleteAd}
                getValidationStatusColor={getValidationStatusColor}
                getValidationStatusText={getValidationStatusText}
              />
            ) : (
              <AdListItem 
                key={ad.id}
                ad={ad}
                onPublishToggle={handlePublishToggle}
                onDeleteAd={handleDeleteAd}
                getValidationStatusColor={getValidationStatusColor}
                getValidationStatusText={getValidationStatusText}
              />
            ))
          )}
        </div>
        
        <AdsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredAds.length}
        />
      </CardContent>
    </Card>
  );
};

export default MyAds;
