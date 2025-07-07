
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Edit, Eye, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdEditDialog from './AdEditDialog';
import AdViewDialog from './AdViewDialog';
import MyAdsSearchAndFilters from './MyAdsSearchAndFilters';

const MyAds = () => {
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

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer">
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)} className="cursor-pointer">
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
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
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejetée';
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
      title: "Succès",
      description: "Votre annonce a été bien supprimée.",
    });
  };

  const renderAdCard = (ad: any) => (
    <div key={ad.id} className="border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img 
          src={ad.image} 
          alt={ad.title}
          className="w-full sm:w-20 h-48 sm:h-20 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-3 w-full sm:w-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold">{ad.title}</h3>
              <p className="text-sm text-muted-foreground">{ad.category}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Badge className={getValidationStatusColor(ad.validationStatus)}>
                {getValidationStatusText(ad.validationStatus)}
              </Badge>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`published-${ad.id}`}
                  checked={ad.published}
                  onCheckedChange={(checked) => handlePublishToggle(ad.id, checked)}
                />
                <Label htmlFor={`published-${ad.id}`} className="text-sm">
                  {ad.published ? 'Publié' : 'Non publié'}
                </Label>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {ad.rating}
            </div>
            <div>
              {ad.totalRentals} locations
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="font-semibold text-primary">
              {ad.price}€/jour
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </DialogTrigger>
                <AdEditDialog ad={ad} />
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </DialogTrigger>
                <AdViewDialog ad={ad} />
              </Dialog>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDeleteAd(ad.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Oui, je veux supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdList = (ad: any) => (
    <div key={ad.id} className="border rounded-lg p-3 flex items-center gap-4">
      <img 
        src={ad.image} 
        alt={ad.title}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{ad.title}</h3>
        <p className="text-xs text-muted-foreground">{ad.category}</p>
      </div>
      <Badge className={getValidationStatusColor(ad.validationStatus)} variant="outline">
        {getValidationStatusText(ad.validationStatus)}
      </Badge>
      <div className="flex items-center space-x-2">
        <Switch
          id={`list-published-${ad.id}`}
          checked={ad.published}
          onCheckedChange={(checked) => handlePublishToggle(ad.id, checked)}
        />
        <Label htmlFor={`list-published-${ad.id}`} className="text-xs">
          {ad.published ? 'Publié' : 'Non publié'}
        </Label>
      </div>
      <div className="font-semibold text-sm text-primary">
        {ad.price}€/jour
      </div>
      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <AdEditDialog ad={ad} />
        </Dialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <AdViewDialog ad={ad} />
        </Dialog>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => handleDeleteAd(ad.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Oui, je veux supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Mes Annonces
        </CardTitle>
        <Link to="/add-tool">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle annonce
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
            currentAds.map(ad => viewMode === 'grid' ? renderAdCard(ad) : renderAdList(ad))
          )}
        </div>
        
        {renderPagination()}

        {filteredAds.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAds.length)} sur {filteredAds.length} annonces
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyAds;
