
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { Star, MapPin, User, Shield, Calendar, ArrowLeft } from 'lucide-react';

const ToolDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];

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

            {/* Informations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{tool.category}</Badge>
                {tool.available ? (
                  <Badge className="bg-green-500">Disponible</Badge>
                ) : (
                  <Badge variant="destructive">Non disponible</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
              
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
                  Caution: 100€ (remboursée en fin de location)
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="lg" disabled={!tool.available}>
                    {tool.available ? 'Louer maintenant' : 'Non disponible'}
                  </Button>
                  <Button variant="outline" className="w-full" disabled={!tool.available}>
                    Ajouter aux favoris
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{tool.owner}</h3>
                      <p className="text-sm text-gray-600">Propriétaire vérifié</p>
                    </div>
                    <Shield className="h-5 w-5 text-green-500 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
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

              {/* Avis */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Avis des locataires</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-medium">Marie L.</span>
                          <span className="text-sm text-gray-500">il y a 2 semaines</span>
                        </div>
                        <p className="text-gray-700">
                          Excellent outil, très bien entretenu. Le propriétaire est très réactif et arrangeant.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disponibilité */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Disponible tous les jours</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Récupération: 9h - 18h<br/>
                      Retour: 9h - 19h
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Conditions</h2>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Pièce d'identité requise</li>
                    <li>• Caution de 100€</li>
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
