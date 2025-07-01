
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
  Settings
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const userInfo = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    verified: true,
    memberSince: 'janvier 2024'
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
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {userInfo.firstName[0]}{userInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">
                    {userInfo.firstName} {userInfo.lastName}
                  </h1>
                  {userInfo.verified && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Vérifié
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  Membre depuis {userInfo.memberSince}
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{stats.totalEarnings}€</div>
                    <div className="text-sm text-muted-foreground">Gains totaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{stats.activeAds}</div>
                    <div className="text-sm text-muted-foreground">Annonces actives</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{stats.totalRentals}</div>
                    <div className="text-sm text-muted-foreground">Locations réalisées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{stats.rating}</div>
                    <div className="text-sm text-muted-foreground">Note moyenne</div>
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
