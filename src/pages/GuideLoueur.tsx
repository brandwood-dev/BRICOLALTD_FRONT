import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Shield, TrendingUp } from 'lucide-react';

const GuideLoueur = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Guide du Loueur</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce qu'il faut savoir pour mettre en location vos outils et générer des revenus supplémentaires
            </p>
          </div>

          {/* Getting Started */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Comment commencer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    1. Créez votre compte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Inscrivez-vous gratuitement et complétez votre profil avec vos informations personnelles et une photo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    2. Ajoutez vos outils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Créez des annonces détaillées avec photos, descriptions et tarifs pour chaque outil à louer.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    3. Recevez des demandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Les locataires vous contactent directement pour réserver vos outils aux dates souhaitées.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    4. Percevez vos revenus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Une fois la location terminée, recevez vos paiements sécurisés directement sur votre compte.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Best Practices */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Conseils pour réussir</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-500 mr-2" />
                    Créez des annonces attractives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Utilisez des photos de haute qualité sous différents angles</li>
                    <li>Rédigez des descriptions détaillées et honnêtes</li>
                    <li>Précisez l'état, l'âge et les caractéristiques techniques</li>
                    <li>Mentionnez les accessoires inclus</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
                    Optimisez vos tarifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Étudiez les prix de location similaires dans votre région</li>
                    <li>Proposez des tarifs dégressifs pour les locations longues</li>
                    <li>Ajustez vos prix selon la demande et la saisonnalité</li>
                    <li>Incluez une caution raisonnable pour vous protéger</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 text-green-500 mr-2" />
                    Protégez vos outils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Vérifiez l'identité du locataire avant la remise</li>
                    <li>Prenez des photos de l'outil avant et après location</li>
                    <li>Expliquez le bon usage et les précautions d'emploi</li>
                    <li>Demandez une caution adaptée à la valeur de l'outil</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Info */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Revenus et commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Bricola prélève une commission de 5,4% sur chaque location réussie pour couvrir :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Les frais de transaction et de paiement sécurisé</li>
                  <li>La couverture d'assurance de vos outils</li>
                  <li>Le support client et la résolution de litiges</li>
                  <li>La maintenance et l'amélioration de la plateforme</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Les paiements sont versés sous 48h après la fin de la location.
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

export default GuideLoueur;