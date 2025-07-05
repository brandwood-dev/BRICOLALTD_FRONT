
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  UserCircle
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
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
          <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl shadow-lg border border-border/50 p-8 mb-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 ring-4 ring-primary/20 shadow-xl">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {userInfo.firstName[0]}{userInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
                    <Shield className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      {userInfo.verified && (
                        <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                          <Shield className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                        {userInfo.accountType === 'Entreprise' ? (
                          <Building2 className="h-3 w-3 mr-1" />
                        ) : (
                          <UserCircle className="h-3 w-3 mr-1" />
                        )}
                        {userInfo.accountType}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg font-medium">
                    Membre depuis {userInfo.memberSince}
                  </p>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stats.totalEarnings}€</div>
                    <div className="text-xs lg:text-sm text-primary/80 font-medium">Gains totaux</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-4 border border-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">{stats.activeAds}</div>
                    <div className="text-xs lg:text-sm text-accent/80 font-medium">Annonces actives</div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">{stats.totalRentals}</div>
                    <div className="text-xs lg:text-sm text-primary/80 font-medium">Locations réalisées</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-4 border border-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">{stats.rating}</div>
                    <div className="text-xs lg:text-sm text-accent/80 font-medium">Note moyenne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <TabsList className="w-full h-auto p-0 bg-transparent">
                <div className="grid grid-cols-3 md:grid-cols-6 w-full">
                  <TabsTrigger 
                    value="profile" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Mon Profil</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wallet" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <WalletIcon className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Portefeuille</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="requests" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Demandes</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reservations" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Réservations</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ads" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Annonces</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="favorites" 
                    className="flex flex-col items-center gap-2 py-4 px-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/5"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-xs md:text-sm font-medium">Favoris</span>
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
