import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { Star, MapPin, User, CheckCircle, ArrowLeft, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS, arSA } from 'date-fns/locale';

const ToolDetails = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];
  
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 3;

  // Mock data for the new fields
  const toolDetails = {
    ...tool,
    brand: "DeWalt",
    model: "DCD771C2",
    purchaseYear: "2022",
    subcategory: "tools",
    condition: "new",
    deposit: 50,
    ownerInstructions: "Veuillez manipuler avec précaution. Retourner l'outil propre et chargé. En cas de problème, contactez-moi immédiatement.",
    owner: {
      name: "Pierre Dubois",
      avatar: "/placeholder.svg",
      verified: true
    }
  };
  const categoryMap: Record<string, string> = {
    Jardinage: 'gardening',
    Entretien: 'maintenance',
    Sécurité: 'safety',
    Nouveautés: 'updates',
    Guides: 'guide',
    Transport: 'transport',
    Bricolage: 'diy',
    Electricité: 'electricity',
    Éclairage: 'lighting',
    Peinture: 'painting',
    Construction: 'construction',
    Plantes: 'plants',
    Nettoyage: 'cleaning',
    Décoration: 'decoration',
  };

  // Calculate prices with 5.4% fees
  const originalPrice = tool.price; // Original price entered by owner
  const feeRate = 0.054; // 5.4%
  const feeAmount = originalPrice * feeRate;
  const displayPrice = originalPrice + feeAmount;

  // Mock reviews data
  const allReviews = [
    { id: 1, user: "Marie L.", rating: 5, comment: "Excellent outil, très bien entretenu. Le propriétaire est très réactif et arrangeant.", date: "2024-06-15" },
    { id: 2, user: "Jean M.", rating: 4, comment: "Bon outil, fonctionne parfaitement. Quelques traces d'usure normale.", date: "2024-06-10" },
    { id: 3, user: "Sophie R.", rating: 5, comment: "Parfait ! Exactement ce dont j'avais besoin pour mes travaux.", date: "2024-06-05" },
    { id: 4, user: "Antoine B.", rating: 4, comment: "Outil de qualité, propriétaire disponible et sympa.", date: "2024-05-28" },
    { id: 5, user: "Lucie V.", rating: 5, comment: "Je recommande vivement, très bon rapport qualité-prix.", date: "2024-05-20" },
  ];

  const totalReviews = allReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentReviewPage - 1) * reviewsPerPage;
  const currentReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage);

  const handleFavoriteToggle = () => {
    if (isFavorite(tool.id)) {
      removeFromFavorites(tool.id);
    } else {
      addToFavorites(tool);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/search" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              {t('tools.back_to_results')}
            </Link>
          </div>

          {/* Owner Information */}
          <Card className="mb-6">
            <CardContent className={"p-6 flex"+ (language === 'ar' ? ' justify-end' : '')}>
              {language === 'ar' ? (
                <div className="flex items-center gap-4">
              
                <div >
                  <div className="flex items-center gap-2">
                    {toolDetails.owner.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('tools.verified')}
                      </Badge>
                    )}
                    <h2 className="text-xl font-semibold">{toolDetails.owner.name}</h2>
                    
                  </div>
                  <p className="text-gray-600">{t('tools.owner')}</p>
                </div>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={toolDetails.owner.avatar} alt={toolDetails.owner.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              ):(
                <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={toolDetails.owner.avatar} alt={toolDetails.owner.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div >
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{toolDetails.owner.name}</h2>
                    {toolDetails.owner.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('tools.verified')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600">{t('tools.owner')}</p>
                </div>
              </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Images */}
            <div>
              <img 
                src={tool.images[0]} 
                alt={tool.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                {tool.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${tool.title} ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Tool Information */}
            <div>
              <div className={"flex items-center gap-2 mb-4 "+ (language === 'ar' ? '[direction:ltr]' : '')}>
                <Badge variant="secondary">{t(`blog.category.${categoryMap[tool.category]}`)}</Badge>
                <Badge variant="outline">{t('blog.subcategory.tools')}</Badge>
                <Badge className="bg-green-500">{t('add_tool.condition_new')}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <span className="text-gray-600">{t('tools.brand')}:</span>
                    <span className="ml-2 font-medium">{toolDetails.brand}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('tools.model')}:</span>
                    <span className="ml-2 font-medium">{toolDetails.model}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('tools.year_of_purchase')}:</span>
                    <span className="ml-2 font-medium">{toolDetails.purchaseYear}</span>
                  </div>
                  <div className={"flex items-center gap-1 "+ (language === 'ar' ? 'justify-end' : '')}>
                    {language === 'ar' ? (
                      <>
                        <span className="text-gray-600">{tool.location}</span>
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{tool.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={"flex items-center gap-4 mb-6 "+ (language === 'ar' ? '[direction:ltr]' : '')}>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tool.rating}</span>
                  <span className="text-gray-500">({tool.reviews} avis)</span>
                </div>
              </div>

              <div className="bg-accent/5 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {displayPrice.toFixed(1)}€<span className="text-lg font-normal text-gray-600">/{t('tools.day')}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {t('tools.fees_and_taxes')} : {feeAmount.toFixed(1)} € (5,4% {t('tools.of')} {originalPrice} € {t('tools.charged')})
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {t('tools.deposit')}: {toolDetails.deposit}€ {t('tools.refunded')}
                </div>
                <div className="space-y-2">
                  <Link to={`/rent/${tool.id}`}>
                    <Button className="w-full" size="lg">
                      {t('tools.rent_now')}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleFavoriteToggle}
                  >
                    <Heart 
                      className={`h-4 w-4 mr-2 ${
                        isFavorite(tool.id) ? 'fill-red-500 text-red-500' : ''
                      }`} 
                    />
                    {isFavorite(tool.id) ? `${t('tools.remove_from_favorites')}` : `${t('tools.add_to_favorites')}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Description and Reviews */}
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('tools.desc')}</h2>
                  <p className="text-gray-700 mb-6">{tool.description}</p>
                  
                  {/* <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul> */}
                </CardContent>
              </Card>

              {/* Owner Instructions */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('tools.instructions')}</h2>
                  <p className="text-gray-700">{toolDetails.ownerInstructions}</p>
                </CardContent>
              </Card>

              {/* Reviews with Pagination */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('tools.reviews')}</h2>
                  <div className="space-y-4 mb-6">
                    {currentReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${
                                  star <= review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.user}</span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(review.date), 'dd MMMM yyyy', {
                              locale:
                                language === 'fr'
                                  ? fr
                                  : language === 'ar'
                                  ? arSA
                                  : enUS,
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
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
