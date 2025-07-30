
import React, { useState, useMemo, useEffect } from 'react';
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
import listingApiService from '@/services/ListingApi';

const MyAds = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserAndAds() {
      setLoading(true);
      try {
        const userRes = await listingApiService.getCurrentUser();
        // Fix linter error: ensure id is a string
        let id = '';
        if (userRes && typeof userRes === 'object') {
          if ('data' in userRes && userRes.data && typeof userRes.data === 'object' && 'id' in userRes.data) {
            id = (userRes.data as any).id;
          } else if ('id' in userRes) {
            id = (userRes as any).id;
          }
        }
        setUserId(id);
        const adsRes = await listingApiService.getTools({ ownerId: id });
        // adsRes may be { data: Tool[] } or Tool[]
        let adsArr = Array.isArray(adsRes) ? adsRes : (Array.isArray(adsRes?.data) ? adsRes.data : []);
        console.log('Fetched ads:', adsArr);
        console.log('Ads with REJETE status:', adsArr.filter(ad => ad.publicationStatus === 'REJETE'));
        setAds(adsArr);
      } catch (e) {
        toast({ title: 'Erreur', description: 'Impossible de charger vos annonces.' });
        setAds([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndAds();
  }, []);

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
    const filtered = ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (ad.category?.displayName || ad.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesValidation = validationFilter === 'all' || ad.publicationStatus === validationFilter;
      const matchesPublication = publicationFilter === 'all' || 
                                (publicationFilter === 'published' && ad.publicationStatus === 'PUBLIE') ||
                                (publicationFilter === 'unpublished' && ad.publicationStatus !== 'PUBLIE');
      const matchesCategory = categoryFilter === 'all' || (ad.category?.displayName || ad.category?.name) === categoryFilter;
      
      return matchesSearch && matchesValidation && matchesPublication && matchesCategory;
    });
    
    console.log('Filtering debug:', {
      totalAds: ads.length,
      validationFilter,
      publicationFilter,
      categoryFilter,
      searchTerm,
      filteredCount: filtered.length,
      rejectedAds: ads.filter(ad => ad.publicationStatus === 'REJETE'),
      filteredRejectedAds: filtered.filter(ad => ad.publicationStatus === 'REJETE')
    });
    
    return filtered;
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
      case 'PUBLIE': return 'bg-green-100 text-green-800';
      case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
      case 'REJETE': return 'bg-red-100 text-red-800';
      case 'SUSPENDU': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValidationStatusText = (status: string) => {
    switch (status) {
      case 'PUBLIE': return t('tools.published');
      case 'EN_ATTENTE': return t('tools.pending');
      case 'REJETE': return t('tools.rejected');
      case 'SUSPENDU': return t('tools.suspended');
      default: return status;
    }
  };

  const handleDeleteAd = async (adId: string) => {
    try {
      await listingApiService.deleteTool(adId);
      setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
      toast({ title: 'Succès', description: 'Votre annonce a été bien supprimée.' });
    } catch (e) {
      toast({ title: 'Erreur', description: 'Impossible de supprimer cette annonce.' });
    }
  };

  // Show loading spinner if loading
  if (loading) return <div className="py-8 text-center">Chargement...</div>;

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
                onPublishToggle={() => {}} // No-op as tools are moderated
                onDeleteAd={handleDeleteAd}
                getValidationStatusColor={getValidationStatusColor}
                getValidationStatusText={getValidationStatusText}
              />
            ) : (
              <AdListItem 
                key={ad.id}
                ad={ad}
                onPublishToggle={() => {}} // No-op as tools are moderated
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
