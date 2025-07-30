import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToolDetails } from '@/hooks/useTools';
import { useToast } from '@/hooks/use-toast';
import listingApiService from '@/services/ListingApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, MapPin, User, CheckCircle, ArrowLeft, Heart, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tool, ToolReview } from '@/types/tool';

const ToolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { tool, loading, error, fetchTool } = useToolDetails();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [reviews, setReviews] = useState<ToolReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [allReviewsState, setAllReviewsState] = useState<ToolReview[]>([]);
  
  // Edit review state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);
  
  // User review state
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [checkingUserReview, setCheckingUserReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTool(id);
    }
  }, [id]); // Only depend on id changes

  // Mock reviews data (since backend doesn't have reviews yet)
  const allReviews: ToolReview[] = [
    { 
      id: '1', 
      rating: 5, 
      comment: "Excellent outil, très bien entretenu. Le propriétaire est très réactif et arrangeant.", 
      createdAt: "2024-06-15",
      user: { firstName: "Marie", lastName: "L." }
    },
    { 
      id: '2', 
      rating: 4, 
      comment: "Bon outil, fonctionne parfaitement. Quelques traces d'usure normale.", 
      createdAt: "2024-06-10",
      user: { firstName: "Jean", lastName: "M." }
    },
    { 
      id: '3', 
      rating: 5, 
      comment: "Parfait ! Exactement ce dont j'avais besoin pour mes travaux.", 
      createdAt: "2024-06-05",
      user: { firstName: "Sophie", lastName: "R." }
    },
  ];

  // Fetch reviews from backend (replace mock)
  useEffect(() => {
    if (tool?.id) {
      listingApiService.getToolReviews(tool.id).then(res => {
        setAllReviewsState((res.data as ToolReview[]) || []);
      });
      
      // Check if current user has reviewed this tool
      setCheckingUserReview(true);
      listingApiService.checkUserReview(tool.id)
        .then(res => {
          setHasUserReviewed((res as any).hasReviewed);
        })
        .catch(err => {
          console.error('Error checking user review:', err);
          setHasUserReviewed(false);
        })
        .finally(() => {
          setCheckingUserReview(false);
        });
    }
  }, [tool?.id]);

  const reviewsPerPage = 3;
  const totalReviews = allReviewsState.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentReviewPage - 1) * reviewsPerPage;
  const currentReviews = allReviewsState.slice(startIndex, startIndex + reviewsPerPage);

  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!tool || favoriteLoading) return;
    
    try {
      setFavoriteLoading(true);
      if (isFavorite(tool.id)) {
        await removeFromFavorites(tool.id);
        toast({ title: 'Retiré des favoris', description: tool.title });
      } else {
        await addToFavorites(tool.id);
        toast({ title: 'Ajouté aux favoris', description: tool.title });
      }
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la modification des favoris',
        variant: 'destructive'
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool) return;
    setReviewSubmitting(true);
    setReviewError(null);
    try {
      await listingApiService.createToolReview(tool.id, { rating: reviewRating, comment: reviewComment });
      toast({ title: 'Avis soumis', description: 'Merci pour votre retour !' });
      setReviewComment('');
      setReviewRating(5);
      setHasUserReviewed(true); // Mark as reviewed
      // Refresh reviews
      const res = await listingApiService.getToolReviews(tool.id);
      setAllReviewsState((res.data as ToolReview[]) || []);
    } catch (err: any) {
      setReviewError(err.message || 'Erreur lors de la soumission de l\'avis');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleEditReview = (review: ToolReview) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleUpdateReview = async (reviewId: string) => {
    if (!tool) return;
    setEditSubmitting(true);
    try {
      await listingApiService.updateToolReview(tool.id, reviewId, { 
        rating: editRating, 
        comment: editComment 
      });
      toast({ title: 'Avis modifié', description: 'Votre avis a été mis à jour avec succès !' });
      setEditingReviewId(null);
      // Refresh reviews
      const res = await listingApiService.getToolReviews(tool.id);
      setAllReviewsState((res.data as ToolReview[]) || []);
    } catch (err: any) {
      toast({ 
        title: 'Erreur', 
        description: err.message || 'Erreur lors de la modification de l\'avis',
        variant: 'destructive'
      });
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!tool) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
    
    try {
      await listingApiService.deleteToolReview(tool.id, reviewId);
      toast({ title: 'Avis supprimé', description: 'Votre avis a été supprimé avec succès !' });
      
      // Refresh reviews
      const res = await listingApiService.getToolReviews(tool.id);
      setAllReviewsState((res.data as ToolReview[]) || []);
      
      // Check if user still has a review after deletion
      setCheckingUserReview(true);
      try {
        const checkRes = await listingApiService.checkUserReview(tool.id);
        setHasUserReviewed((checkRes as any).hasReviewed);
      } catch (err) {
        console.error('Error checking user review after deletion:', err);
        setHasUserReviewed(false);
      } finally {
        setCheckingUserReview(false);
      }
    } catch (err: any) {
      toast({ 
        title: 'Erreur', 
        description: err.message || 'Erreur lors de la suppression de l\'avis',
        variant: 'destructive'
      });
    }
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(5);
    setEditComment('');
  };

  // Check if current user is the author of the review
  const isCurrentUserReview = (review: ToolReview) => {
    // For now, we'll show edit/delete for all reviews
    // In a real app, you'd compare with the current user's ID
    // This would require getting the current user from context or API
    return true; // Temporary - show for all reviews
  };

  const getConditionDisplayName = (condition: string) => {
    const conditionMap: Record<string, string> = {
      'NEUF': 'Neuf',
      'TRES_BON': 'Très bon état',
      'BON': 'Bon état',
      'MOYEN': 'État moyen',
      'MAUVAIS': 'Mauvais état'
    };
    return conditionMap[condition] || condition;
  };

  const getAvailabilityStatusDisplay = (status: string) => {
    const statusMap: Record<string, string> = {
      'DISPONIBLE': 'Disponible',
      'RESERVE': 'Réservé',
      'SUSPENDU': 'Suspendu',
      'EN_ATTENTE': 'En attente de validation'
    };
    return statusMap[status] || status;
  };

  const getAvailabilityStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'DISPONIBLE': 'bg-green-500',
      'RESERVE': 'bg-orange-500',
      'SUSPENDU': 'bg-red-500',
      'EN_ATTENTE': 'bg-yellow-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-96 w-full mb-4" />
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <Skeleton className="h-32 w-full mb-6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Outil non trouvé</h1>
              <p className="text-gray-600 mb-6">
                {error || "L'outil que vous recherchez n'existe pas ou a été supprimé."}
              </p>
              <Link to="/search">
                <Button>Retour à la recherche</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate prices with 5.4% fees
  const originalPrice = tool.basePrice;
  const feeRate = 0.054;
  const feeAmount = originalPrice * feeRate;
  const displayPrice = originalPrice + feeAmount;

  const primaryPhoto = tool.photos.find(photo => photo.isPrimary) || tool.photos[0];
  const allPhotos = tool.photos.length > 0 ? tool.photos : [{ url: '/placeholder.svg', filename: 'placeholder', isPrimary: true }];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/search" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour aux résultats
            </Link>
          </div>

          {/* Owner Information */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt={`${tool.owner.firstName} ${tool.owner.lastName}`} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      {tool.owner.firstName} {tool.owner.lastName}
                    </h2>
                    {tool.owner.isVerified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600">Propriétaire</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Images */}
            <div>
              <img 
                src={allPhotos[selectedImageIndex]?.url || '/placeholder.svg'} 
                alt={tool.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                {allPhotos.map((photo, index) => (
                  <img 
                    key={photo.id || index}
                    src={photo.url} 
                    alt={`${tool.title} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity ${
                      selectedImageIndex === index ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Tool Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{tool.category.displayName}</Badge>
                <Badge variant="outline">{tool.subcategory.displayName}</Badge>
                <Badge className="bg-green-500">{getConditionDisplayName(tool.condition)}</Badge>
                <Badge className={getAvailabilityStatusColor(tool.availabilityStatus)}>
                  {getAvailabilityStatusDisplay(tool.availabilityStatus)}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {tool.brand && (
                    <div>
                      <span className="text-gray-600">Marque:</span>
                      <span className="ml-2 font-medium">{tool.brand}</span>
                    </div>
                  )}
                  {tool.model && (
                    <div>
                      <span className="text-gray-600">Modèle:</span>
                      <span className="ml-2 font-medium">{tool.model}</span>
                    </div>
                  )}
                  {tool.year && (
                    <div>
                      <span className="text-gray-600">Année d'achat:</span>
                      <span className="ml-2 font-medium">{tool.year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{tool.pickupAddress}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {tool.reviewStats?.averageRating || 0}
                  </span>
                  <span className="text-gray-500">
                    ({tool.reviewStats?.totalReviews || 0} avis)
                  </span>
                </div>
              </div>

              <div className="bg-accent/5 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {displayPrice.toFixed(1)}€<span className="text-lg font-normal text-gray-600">/jour</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Incluant taxes et frais : {feeAmount.toFixed(1)} € (5,4% des {originalPrice} € saisis par le loueur)
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Caution: {tool.depositAmount}€ (remboursée en fin de location)
                </div>
                <div className="space-y-2">
                  <Link to={`/rent/${tool.id}`}>
                    <Button 
                      className="w-full" 
                      size="lg"
                      disabled={tool.availabilityStatus !== 'DISPONIBLE'}
                    >
                      {tool.availabilityStatus === 'DISPONIBLE' ? 'Louer maintenant' : 'Non disponible'}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                  >
                    {favoriteLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    ) : (
                      <Heart 
                        className={`h-4 w-4 mr-2 ${
                          isFavorite(tool.id) ? 'fill-red-500 text-red-500' : ''
                        }`} 
                      />
                    )}
                    {favoriteLoading 
                      ? 'Modification...' 
                      : isFavorite(tool.id) 
                        ? 'Retirer des favoris' 
                        : 'Ajouter aux favoris'
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Description */}
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 mb-6">{tool.description}</p>
                  
                  {tool.ownerInstructions && (
                    <>
                      <h3 className="text-lg font-semibold mb-3">Consignes du propriétaire</h3>
                      <p className="text-gray-700">{tool.ownerInstructions}</p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Reviews with Pagination and Submission */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Avis des locataires</h2>
                  
                  {/* Review form - only show if user hasn't reviewed */}
                  {!hasUserReviewed && !checkingUserReview && (
                    <form onSubmit={handleReviewSubmit} className="mb-6 space-y-2">
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className={star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}
                            aria-label={`Note ${star}`}
                          >
                            <Star className="h-5 w-5" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="w-full border rounded p-2"
                        rows={3}
                        placeholder="Votre avis..."
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        required
                      />
                      <div className="flex items-center gap-2">
                        <Button type="submit" disabled={reviewSubmitting || !reviewComment.trim()}>
                          {reviewSubmitting ? 'Envoi...' : 'Envoyer mon avis'}
                        </Button>
                        {reviewError && <span className="text-red-500 text-sm">{reviewError}</span>}
                      </div>
                    </form>
                  )}
                  
                  {/* Show message if user has already reviewed */}
                  {hasUserReviewed && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✅ Vous avez déjà laissé un avis pour cet outil.
                      </p>
                    </div>
                  )}
                  <div className="space-y-4 mb-6">
                    {currentReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        {editingReviewId === review.id ? (
                          // Edit mode
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              {[1,2,3,4,5].map(star => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setEditRating(star)}
                                  className={star <= editRating ? 'text-yellow-400' : 'text-gray-300'}
                                  aria-label={`Note ${star}`}
                                >
                                  <Star className="h-5 w-5" />
                                </button>
                              ))}
                            </div>
                            <textarea
                              className="w-full border rounded p-2"
                              rows={3}
                              placeholder="Votre avis..."
                              value={editComment}
                              onChange={e => setEditComment(e.target.value)}
                              required
                            />
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateReview(review.id)}
                                disabled={editSubmitting || !editComment.trim()}
                              >
                                {editSubmitting ? 'Modification...' : 'Sauvegarder'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={cancelEdit}
                                disabled={editSubmitting}
                              >
                                Annuler
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // View mode
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="font-medium">
                                  {review.user?.firstName || review.reviewer?.firstName} {review.user?.lastName || review.reviewer?.lastName}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: fr })}
                                </span>
                              </div>
                              {/* Edit/Delete buttons - only show for user's own reviews */}
                              {isCurrentUserReview(review) && (
                                <div className="flex items-center gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleEditReview(review)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleDeleteReview(review.id)}
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentReviewPage(Math.max(1, currentReviewPage - 1))}
                            className={currentReviewPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {[...Array(totalPages)].map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              onClick={() => setCurrentReviewPage(index + 1)}
                              isActive={currentReviewPage === index + 1}
                              className="cursor-pointer"
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentReviewPage(Math.min(totalPages, currentReviewPage + 1))}
                            className={currentReviewPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
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

export default ToolDetails;
