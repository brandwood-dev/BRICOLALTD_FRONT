
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { Star, MapPin, User, Shield, Calendar as CalendarIcon, ArrowLeft, Heart, CheckCircle, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ToolDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];

  // Calendar states
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  
  // Reviews pagination
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 3;
  
  // Mock extended tool data to match new requirements
  const extendedTool = {
    ...tool,
    brand: 'Bosch',
    model: 'GSB 13 RE',
    year: 2022,
    subcategory: 'Construction',
    condition: 'Excellent',
    deposit: 100,
    ownerInstructions: 'Prévoir une rallonge électrique. Nettoyer après usage. Manipulation délicate pour les matériaux fragiles.',
    owner: {
      name: 'Jean Dupont',
      avatar: '/placeholder.svg',
      verified: true
    }
  };

  // Mock reviews data
  const allReviews = [
    { id: 1, user: 'Marie L.', rating: 5, date: 'il y a 2 semaines', comment: 'Excellent outil, très bien entretenu. Le propriétaire est très réactif et arrangeant.' },
    { id: 2, user: 'Pierre M.', rating: 4, date: 'il y a 1 mois', comment: 'Bonne qualité, conforme à la description. Récupération et retour faciles.' },
    { id: 3, user: 'Sophie B.', rating: 5, date: 'il y a 1 mois', comment: 'Parfait pour mes travaux de bricolage. Je recommande vivement!' },
    { id: 4, user: 'Thomas R.', rating: 4, date: 'il y a 2 mois', comment: 'Outil en bon état, propriétaire sympathique et de bon conseil.' },
    { id: 5, user: 'Isabelle D.', rating: 5, date: 'il y a 2 mois', comment: 'Excellent service, outil performant. Rien à redire!' },
  ];

  // Unavailable dates (mock data)
  const unavailableDates = [
    new Date(2025, 6, 15),
    new Date(2025, 6, 16),
    new Date(2025, 6, 22),
    new Date(2025, 6, 23),
  ];

  // Pagination calculations
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

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    );
  };

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

            {/* Informations principales */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{tool.category}</Badge>
                <Badge variant="outline">{extendedTool.subcategory}</Badge>
                {tool.available ? (
                  <Badge className="bg-green-500">Disponible</Badge>
                ) : (
                  <Badge variant="destructive">Non disponible</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-600">Marque:</span>
                  <span>{extendedTool.brand}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-600">Modèle:</span>
                  <span>{extendedTool.model}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-600">Année:</span>
                  <span>{extendedTool.year}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-600">État:</span>
                  <Badge variant="outline">✨ {extendedTool.condition}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tool.rating}</span>
                  <span className="text-gray-500">({tool.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tool.location}</span>
                </div>
              </div>

              <div className="bg-accent/5 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {tool.price}€<span className="text-lg font-normal text-gray-600">/{tool.period}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Caution: {extendedTool.deposit}€ (remboursée en fin de location)
                </div>
                <div className="space-y-2">
                  <Link to={`/rent/${tool.id}`}>
                    <Button className="w-full" size="lg" disabled={!tool.available}>
                      {tool.available ? 'Louer maintenant' : 'Non disponible'}
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
                    {isFavorite(tool.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </Button>
                </div>
              </div>

              {/* Propriétaire */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={extendedTool.owner.avatar} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{extendedTool.owner.name}</h3>
                        {extendedTool.owner.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {extendedTool.owner.verified ? 'Propriétaire vérifié' : 'Propriétaire'}
                      </p>
                    </div>
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description et détails */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 mb-6">{tool.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Consignes du propriétaire */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Consignes du propriétaire</h2>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-gray-700">{extendedTool.ownerInstructions}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Avis avec pagination */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Avis des locataires ({totalReviews})
                  </h2>
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
                          <span className="text-sm text-gray-500">{review.date}</span>
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
                            onClick={() => setCurrentReviewPage(prev => Math.max(prev - 1, 1))}
                            className={cn(
                              "cursor-pointer",
                              currentReviewPage === 1 && "pointer-events-none opacity-50"
                            )}
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
                            onClick={() => setCurrentReviewPage(prev => Math.min(prev + 1, totalPages))}
                            className={cn(
                              "cursor-pointer",
                              currentReviewPage === totalPages && "pointer-events-none opacity-50"
                            )}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Calendrier de réservation */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Calendrier de réservation</h2>
                  
                  <div className="space-y-4">
                    {/* Date de récupération */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Date de récupération</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !pickupDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupDate ? format(pickupDate, "PPP") : "Choisir une date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            disabled={(date) => 
                              date < new Date() || isDateUnavailable(date)
                            }
                            modifiers={{
                              unavailable: unavailableDates
                            }}
                            modifiersStyles={{
                              unavailable: { 
                                backgroundColor: '#fee2e2', 
                                color: '#dc2626',
                                textDecoration: 'line-through'
                              }
                            }}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Date de retour */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Date de retour</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP") : "Choisir une date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={(date) => 
                              date < new Date() || 
                              (pickupDate && date <= pickupDate) ||
                              isDateUnavailable(date)
                            }
                            modifiers={{
                              unavailable: unavailableDates
                            }}
                            modifiersStyles={{
                              unavailable: { 
                                backgroundColor: '#fee2e2', 
                                color: '#dc2626',
                                textDecoration: 'line-through'
                              }
                            }}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                      <p className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 bg-red-200 rounded"></div>
                        Dates indisponibles
                      </p>
                      <p>Récupération: 9h - 18h</p>
                      <p>Retour: 9h - 19h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Conditions</h2>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Pièce d'identité requise</li>
                    <li>• Caution de {extendedTool.deposit}€</li>
                    <li>• Assurance incluse</li>
                    <li>• Retour dans le même état</li>
                  </ul>
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
