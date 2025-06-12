
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Settings, History, Heart, Plus, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    city: 'Paris',
    country: 'France'
  });

  const rentals = [
    {
      id: '1',
      toolName: 'Perceuse sans fil',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'Terminé',
      price: 25
    },
    {
      id: '2',
      toolName: 'Scie circulaire',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'En cours',
      price: 35
    }
  ];

  const myTools = [
    {
      id: '1',
      name: 'Tondeuse à gazon',
      category: 'Jardinage',
      status: 'Disponible',
      earnings: 150
    },
    {
      id: '2',
      name: 'Marteau-piqueur',
      category: 'Construction',
      status: 'Loué',
      earnings: 280
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl">{userInfo.firstName[0]}{userInfo.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
              <p className="text-gray-600">Membre depuis janvier 2024</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="rentals" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Mes locations
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Mes outils
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favoris
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input 
                        id="city" 
                        value={userInfo.city}
                        onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Input 
                        id="country" 
                        value={userInfo.country}
                        onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button>Sauvegarder les modifications</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rentals">
              <Card>
                <CardHeader>
                  <CardTitle>Historique de mes locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rentals.map((rental) => (
                      <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{rental.toolName}</h3>
                          <p className="text-sm text-gray-600">
                            Du {rental.startDate} au {rental.endDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{rental.price}€</div>
                          <div className={`text-sm px-2 py-1 rounded ${
                            rental.status === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {rental.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Mes outils en location</CardTitle>
                  <Link to="/add-tool">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un outil
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTools.map((tool) => (
                      <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-sm text-gray-600">{tool.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{tool.earnings}€ gagnés</div>
                          <div className={`text-sm px-2 py-1 rounded ${
                            tool.status === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {tool.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Mes outils favoris</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-4">Vos outils favoris apparaîtront ici</p>
                    <Link to="/favorites">
                      <Button>Voir tous mes favoris</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
