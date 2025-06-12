
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Award, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de Bricola</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La plateforme de location d'outils qui révolutionne le bricolage en connectant les propriétaires d'outils avec ceux qui en ont besoin.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
                <p className="text-gray-600 mb-4">
                  Chez Bricola, nous croyons que chaque projet de bricolage mérite d'avoir accès aux meilleurs outils, sans pour autant devoir les acheter.
                </p>
                <p className="text-gray-600 mb-4">
                  Notre plateforme permet aux particuliers et professionnels de partager leurs outils inutilisés avec leur communauté locale, créant ainsi un écosystème durable et économique.
                </p>
                <p className="text-gray-600">
                  Nous facilitons l'accès aux outils de qualité tout en favorisant l'économie circulaire et les liens sociaux de proximité.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Outils de bricolage"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Communauté</h3>
                  <p className="text-gray-600">Créer des liens entre voisins et favoriser l'entraide locale</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
                  <p className="text-gray-600">Garantir des transactions sécurisées et une assurance complète</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Qualité</h3>
                  <p className="text-gray-600">S'assurer que tous les outils respectent nos standards de qualité</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Simplicité</h3>
                  <p className="text-gray-600">Rendre la location d'outils aussi simple qu'un clic</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-accent/10 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Bricola en chiffres</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                <div className="text-gray-600">Outils disponibles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">2000+</div>
                <div className="text-gray-600">Utilisateurs actifs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-gray-600">Villes couvertes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-gray-600">Satisfaction client</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="CEO"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">Jean Dupont</h3>
                  <p className="text-accent font-medium mb-2">CEO & Fondateur</p>
                  <p className="text-gray-600">Passionné de bricolage et d'innovation technologique</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="CTO"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">Marie Martin</h3>
                  <p className="text-accent font-medium mb-2">CTO</p>
                  <p className="text-gray-600">Experte en développement et architecture technique</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="CMO"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">Pierre Durand</h3>
                  <p className="text-accent font-medium mb-2">Responsable Marketing</p>
                  <p className="text-gray-600">Spécialiste en stratégie digitale et croissance</p>
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

export default About;
