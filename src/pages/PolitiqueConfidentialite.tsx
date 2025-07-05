import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Politique de Confidentialité</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dernière mise à jour : 1er janvier 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Présentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  BRICOLA LTD, société enregistrée en Angleterre et au Pays de Galles sous le numéro 16401372, 
                  s'engage à protéger la confidentialité de vos données personnelles.
                </p>
                <p className="text-gray-600">
                  Cette politique explique comment nous collectons, utilisons et protégeons vos informations 
                  personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Données collectées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Données d'identification :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Nom, prénom, adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Adresse postale</li>
                      <li>Date de naissance</li>
                      <li>Photo de profil (facultative)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Données de transaction :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Informations de paiement (cryptées)</li>
                      <li>Historique des locations</li>
                      <li>Évaluations et commentaires</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Données techniques :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Adresse IP, type de navigateur</li>
                      <li>Données de géolocalisation (avec votre accord)</li>
                      <li>Cookies et technologies similaires</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Finalités du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Nous utilisons vos données pour :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Créer et gérer votre compte utilisateur</li>
                  <li>Faciliter les transactions entre utilisateurs</li>
                  <li>Assurer la sécurité de la plateforme</li>
                  <li>Fournir un support client personnalisé</li>
                  <li>Améliorer nos services et fonctionnalités</li>
                  <li>Respecter nos obligations légales</li>
                  <li>Vous informer des nouveautés (avec votre consentement)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Base légale du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Exécution du contrat :</strong> Gestion de votre compte et des transactions</p>
                  <p><strong>Intérêt légitime :</strong> Sécurité, prévention de la fraude, amélioration des services</p>
                  <p><strong>Consentement :</strong> Communications marketing, géolocalisation</p>
                  <p><strong>Obligation légale :</strong> Conservation des données comptables, lutte anti-blanchiment</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Partage des données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Nous ne vendons jamais vos données. Nous les partageons uniquement :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Entre utilisateurs (nom, photo, localisation générale) pour faciliter les transactions</li>
                  <li>Avec nos prestataires de services (paiement, hébergement) sous contrat de confidentialité</li>
                  <li>Avec les autorités si requis par la loi</li>
                  <li>En cas de fusion/acquisition (avec notification préalable)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Sécurité des données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Nous mettons en œuvre des mesures de sécurité strictes :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Cryptage SSL/TLS pour toutes les communications</li>
                  <li>Cryptage des données sensibles en base</li>
                  <li>Accès limité aux données par le personnel autorisé</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Surveillance continue des accès</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Conservation des données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Compte actif :</strong> Tant que votre compte est ouvert</p>
                  <p><strong>Après suppression :</strong> 1 an pour résoudre d'éventuels litiges</p>
                  <p><strong>Données comptables :</strong> 10 ans (obligation légale)</p>
                  <p><strong>Données marketing :</strong> 3 ans après le dernier contact</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Vos droits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Accès :</strong> Connaître les données que nous détenons sur vous</li>
                  <li><strong>Rectification :</strong> Corriger les données inexactes</li>
                  <li><strong>Effacement :</strong> Supprimer vos données (droit à l'oubli)</li>
                  <li><strong>Limitation :</strong> Restreindre certains traitements</li>
                  <li><strong>Portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li><strong>Opposition :</strong> Vous opposer à certains traitements</li>
                  <li><strong>Réclamation :</strong> Saisir l'autorité de contrôle</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Pour exercer ces droits, contactez-nous à : privacy@bricola.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Nous utilisons des cookies pour :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Maintenir votre session de connexion</li>
                  <li>Mémoriser vos préférences</li>
                  <li>Analyser l'utilisation du site (Google Analytics)</li>
                  <li>Améliorer l'expérience utilisateur</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Vous pouvez désactiver les cookies dans votre navigateur, mais certaines fonctionnalités 
                  pourraient être limitées.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Transferts internationaux</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Certains de nos prestataires peuvent être situés hors de l'UE. Dans ce cas, nous nous 
                  assurons que des garanties appropriées sont en place (clauses contractuelles types, 
                  Privacy Shield, etc.) pour protéger vos données.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous pouvons modifier cette politique de confidentialité. Les changements significatifs 
                  vous seront notifiés par email ou via une notification sur la plateforme.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Responsable du traitement :</strong> BRICOLA LTD</p>
                  <p><strong>Email :</strong> privacy@bricola.com</p>
                  <p><strong>Support général :</strong> contact@bricola.com</p>
                  <p><strong>Délégué à la protection des données :</strong> dpo@bricola.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;