import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, Shield, CheckCircle } from 'lucide-react';

const GuideLocataire = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Guide du Locataire</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment louer facilement les outils dont vous avez besoin pour vos projets
            </p>
          </div>

          {/* How to Rent */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Comment louer un outil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-6 w-6 text-blue-500 mr-2" />
                    1. Recherchez votre outil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Utilisez notre moteur de recherche pour trouver l'outil parfait près de chez vous. Filtrez par catégorie, prix et localisation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-6 w-6 text-green-500 mr-2" />
                    2. Choisissez vos dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sélectionnez les dates de début et fin de location selon vos besoins. Vérifiez la disponibilité en temps réel.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 text-purple-500 mr-2" />
                    3. Réservez en sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Effectuez votre réservation avec paiement sécurisé. Votre argent est protégé jusqu'à la remise de l'outil.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-2" />
                    4. Récupérez et utilisez
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Rendez-vous au point de rendez-vous convenu, récupérez votre outil et réalisez votre projet en toute tranquillité.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips for Renters */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Conseils pour bien louer</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avant la réservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Lisez attentivement la description de l'outil</li>
                    <li>Vérifiez les photos et l'état mentionné</li>
                    <li>Consultez les avis des précédents locataires</li>
                    <li>Contactez le propriétaire si vous avez des questions</li>
                    <li>Assurez-vous de la compatibilité avec votre projet</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pendant la location</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Inspectez l'outil avec le propriétaire à la remise</li>
                    <li>Prenez des photos de l'état initial</li>
                    <li>Respectez les consignes d'utilisation données</li>
                    <li>Manipulez l'outil avec soin et précaution</li>
                    <li>Contactez le propriétaire en cas de problème</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lors du retour</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Nettoyez l'outil avant de le rendre</li>
                    <li>Respectez l'heure de retour convenue</li>
                    <li>Vérifiez l'état avec le propriétaire</li>
                    <li>Signalez tout dommage éventuel</li>
                    <li>Laissez un avis honnête sur votre expérience</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Security and Insurance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Sécurité et assurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Votre sécurité et celle des outils loués sont nos priorités :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Tous les outils sont couverts par notre assurance complète</li>
                  <li>Vos paiements sont protégés jusqu'à la remise effective</li>
                  <li>Un service client disponible 7j/7 pour vous accompagner</li>
                  <li>Système de caution pour protéger les propriétaires</li>
                  <li>Vérification de l'identité de tous les utilisateurs</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  En cas de problème, notre équipe intervient rapidement pour trouver une solution équitable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideLocataire;