import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CGU = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dernière mise à jour : 1er janvier 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Objet et champ d'application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme Bricola, 
                  exploitée par BRICOLA LTD, société enregistrée en Angleterre et au Pays de Galles sous le numéro 16401372.
                </p>
                <p className="text-gray-600">
                  La plateforme permet la mise en relation entre propriétaires d'outils et locataires pour des locations 
                  temporaires d'équipements et d'outils divers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Acceptation des conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  L'utilisation de la plateforme Bricola implique l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.
                </p>
                <p className="text-gray-600">
                  Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications prennent effet 
                  dès leur publication sur le site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Inscription et compte utilisateur</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>L'inscription est gratuite et réservée aux personnes physiques majeures</li>
                  <li>Vous devez fournir des informations exactes et les maintenir à jour</li>
                  <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
                  <li>Un seul compte par personne est autorisé</li>
                  <li>Nous nous réservons le droit de suspendre ou supprimer tout compte en cas de violation des CGU</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Services proposés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bricola propose une plateforme de mise en relation permettant :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>La publication d'annonces de location d'outils</li>
                  <li>La recherche et réservation d'outils</li>
                  <li>La gestion des paiements sécurisés</li>
                  <li>Un système de notation et commentaires</li>
                  <li>Un service client et médiation en cas de litige</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Obligations des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Pour tous les utilisateurs :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Respecter la législation en vigueur</li>
                      <li>Ne pas porter atteinte aux droits des tiers</li>
                      <li>Maintenir un comportement respectueux</li>
                      <li>Ne pas contourner la plateforme pour les paiements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Pour les propriétaires :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>S'assurer de la propriété légale des outils proposés</li>
                      <li>Fournir des descriptions exactes et des photos fidèles</li>
                      <li>Maintenir les outils en bon état de fonctionnement</li>
                      <li>Respecter les rendez-vous fixés</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Pour les locataires :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Utiliser les outils conformément à leur destination</li>
                      <li>Prendre soin du matériel loué</li>
                      <li>Respecter les délais de restitution</li>
                      <li>Signaler tout problème immédiatement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Tarifs et commission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  L'inscription et la consultation des annonces sont gratuites. Bricola prélève une commission de 5,4% 
                  sur le montant de chaque location réussie.
                </p>
                <p className="text-gray-600">
                  Cette commission couvre les frais de fonctionnement, l'assurance, les frais de paiement et le support client.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Responsabilité et assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bricola agit en tant qu'intermédiaire. Les relations contractuelles de location s'établissent 
                  directement entre propriétaires et locataires.
                </p>
                <p className="text-gray-600 mb-4">
                  Une assurance couvre les outils contre les dommages survenus pendant la location. Les conditions 
                  détaillées sont disponibles dans notre police d'assurance.
                </p>
                <p className="text-gray-600">
                  Notre responsabilité est limitée au montant de la commission perçue sur la transaction concernée.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Données personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Le traitement de vos données personnelles est régi par notre Politique de Confidentialité, 
                  conforme au RGPD. Vous disposez de droits d'accès, rectification, suppression et portabilité 
                  de vos données.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Résiliation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vous pouvez supprimer votre compte à tout moment. Nous nous réservons le droit de suspendre 
                  ou résilier votre accès en cas de non-respect des présentes CGU, avec ou sans préavis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Droit applicable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Les présentes CGU sont régies par le droit anglais. Tout litige sera soumis à la compétence 
                  des tribunaux anglais, sauf disposition légale contraire.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pour toute question concernant ces CGU, contactez-nous à : contact@bricola.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGU;