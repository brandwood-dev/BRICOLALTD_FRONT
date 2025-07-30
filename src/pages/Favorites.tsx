
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, MapPin, ArrowLeft, User, CheckCircle } from 'lucide-react';

const Favorites = () => {
  const { favorites, removeFromFavorites, loading } = useFavorites();
  const { toast } = useToast();

  const handleRemoveFavorite = async (toolId: string, toolTitle: string) => {
    try {
      await removeFromFavorites(toolId);
      toast({ title: 'Retiré des favoris', description: toolTitle });
    } catch (error) {
      toast({ 
        title: 'Erreur', 
        description: 'Erreur lors de la suppression du favori',
        variant: 'destructive'
      });
    }
  };

  // Calculate display price with 5.4% fees
  const calculateDisplayPrice = (originalPrice: number) => {
    const feeRate = 0.054;
    const feeAmount = originalPrice * feeRate;
    return originalPrice + feeAmount;
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
              </Link>
            </div>
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Aucun favori pour le moment</h1>
              <p className="text-gray-600 mb-6">Explorez notre catalogue et ajoutez vos outils préférés à vos favoris</p>
              <Link to="/search">
                <Button>Explorer le catalogue</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">Mes favoris</h1>
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
              {favorites.length} outil{favorites.length > 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p>Chargement de vos favoris...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((tool) => {
                const displayPrice = calculateDisplayPrice(tool.basePrice);
                const primaryPhoto = tool.photos.find(photo => photo.isPrimary) || tool.photos[0];
                
                return (
                  <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={primaryPhoto?.url || '/placeholder.svg'} 
                        alt={tool.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {tool.category.displayName}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => handleRemoveFavorite(tool.id, tool.title)}
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tool.title}</h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {tool.reviewStats.averageRating.toFixed(1)} ({tool.reviewStats.totalReviews})
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{tool.pickupAddress}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <User className="h-4 w-4" />
                        <span className="text-sm">
                          {tool.owner.firstName} {tool.owner.lastName}
                          {tool.owner.isVerified && (
                            <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                          )}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-accent">
                          {displayPrice.toFixed(1)}€<span className="text-sm font-normal text-gray-600">/jour</span>
                        </div>
                        <Link to={`/tool/${tool.id}`}>
                          <Button size="sm">Voir détails</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
