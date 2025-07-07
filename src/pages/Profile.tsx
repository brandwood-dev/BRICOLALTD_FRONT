
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Wallet from '@/components/profile/Wallet';
import Requests from '@/components/profile/Requests';
import Reservations from '@/components/profile/Reservations';
import MyAds from '@/components/profile/MyAds';
import MyFavorites from '@/components/profile/MyFavorites';
import { 
  User, 
  Wallet as WalletIcon, 
  MessageSquare, 
  Calendar, 
  Edit, 
  Heart, 
  ArrowLeft,
  Shield,
  Building2,
  UserCircle,
  Trash2
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAccountDeletionPending, setIsAccountDeletionPending] = useState(false);
  const { toast } = useToast();
  
  const userInfo = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    verified: true,
    memberSince: 'janvier 2024',
    accountType: 'Particulier'
  };

  const stats = {
    totalEarnings: 450,
    activeAds: 3,
    totalRentals: 12,
    rating: 4.8
  };

  const handleAccountDeletion = () => {
    setIsAccountDeletionPending(true);
    toast({
      title: "Demande de suppression enregistrée",
      description: "Votre demande de suppression de compte a été enregistrée et sera traitée sous 72 heures.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Profile header */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-8">
            <div className="flex flex-col gap-6">
              {/* Profile info section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xl sm:text-2xl">
                    {userInfo.firstName[0]}{userInfo.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {userInfo.verified && (
                        <Badge variant="default" className="flex items-center gap-1 text-xs">
                          <Shield className="h-3 w-3" />
                          Vérifié
                        </Badge>
                      )}
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        {userInfo.accountType === 'Entreprise' ? (
                          <Building2 className="h-3 w-3" />
                        ) : (
                          <UserCircle className="h-3 w-3" />
                        )}
                        {userInfo.accountType}
                      </Badge>
                    </div>
                  </div>
                  {isAccountDeletionPending && (
                    <Badge variant="destructive" className="mb-2 text-xs">
                      Compte en attente de suppression
                    </Badge>
                  )}
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Membre depuis {userInfo.memberSince}
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{stats.totalEarnings}€</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Gains totaux</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{stats.activeAds}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Annonces actives</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{stats.totalRentals}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Locations réalisées</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{stats.rating}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Note moyenne</div>
                </div>
              </div>

              {/* Delete account button */}
              <div className="flex justify-center sm:justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span className="sm:hidden">Supprimer compte</span>
                      <span className="hidden sm:inline">Supprimer mon compte</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer votre compte</AlertDialogTitle>
                      <AlertDialogDescription className="text-left">
                        La suppression de votre compte est irréversible.
                        <br /><br />
                        Votre demande sera traitée sous 72h, le temps pour notre équipe de vérifier qu'aucune réclamation ou litige en cours n'est rattaché à votre compte.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleAccountDeletion}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Oui, je confirme la suppression
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <TabsList className="w-full h-auto p-0 bg-transparent">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full">
                  <TabsTrigger 
                    value="profile" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Profil</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wallet" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <WalletIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Portefeuille</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="requests" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Demandes</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reservations" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Réservations</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ads" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Annonces</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="favorites" 
                    className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Favoris</span>
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>

            {/* Tab contents */}
            <TabsContent value="profile" className="space-y-6">
              <ProfileInfo />
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <Wallet />
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Requests />
            </TabsContent>

            <TabsContent value="reservations" className="space-y-6">
              <Reservations />
            </TabsContent>

            <TabsContent value="ads" className="space-y-6">
              <MyAds />
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              <MyFavorites />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
