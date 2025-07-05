import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ContratLocation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contrat de Location</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modèle de contrat de location d'outils entre particuliers
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contrat de Location d'Outil
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Entre les soussignés :</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Le Loueur :</strong> [Nom et prénom du propriétaire]</p>
                    <p><strong>Adresse :</strong> [Adresse complète]</p>
                    <p><strong>Téléphone :</strong> [Numéro de téléphone]</p>
                    <p><strong>Email :</strong> [Adresse email]</p>
                  </div>
                  <p className="text-center font-medium my-2">ET</p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>Le Locataire :</strong> [Nom et prénom du locataire]</p>
                    <p><strong>Adresse :</strong> [Adresse complète]</p>
                    <p><strong>Téléphone :</strong> [Numéro de téléphone]</p>
                    <p><strong>Email :</strong> [Adresse email]</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 1 - Objet du contrat</h3>
                  <p className="text-gray-600">
                    Le présent contrat a pour objet la location de l'outil suivant :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <p><strong>Désignation :</strong> [Nom de l'outil]</p>
                    <p><strong>Marque/Modèle :</strong> [Marque et modèle]</p>
                    <p><strong>Numéro de série :</strong> [Si applicable]</p>
                    <p><strong>État :</strong> [Description de l'état]</p>
                    <p><strong>Accessoires inclus :</strong> [Liste des accessoires]</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 2 - Durée de la location</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Date de début :</strong> [Date et heure de début]</p>
                    <p><strong>Date de fin :</strong> [Date et heure de fin]</p>
                    <p><strong>Lieu de remise :</strong> [Adresse de remise]</p>
                    <p><strong>Lieu de restitution :</strong> [Adresse de restitution]</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 3 - Prix et modalités de paiement</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Prix de location :</strong> [Montant] € pour [durée]</p>
                    <p><strong>Caution :</strong> [Montant de la caution] €</p>
                    <p><strong>Mode de paiement :</strong> Via la plateforme Bricola</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 4 - Obligations du locataire</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Utiliser l'outil conformément à sa destination normale</li>
                    <li>Prendre toutes les précautions d'usage pour sa conservation</li>
                    <li>Ne pas prêter ou sous-louer l'outil à un tiers</li>
                    <li>Signaler immédiatement tout dysfonctionnement</li>
                    <li>Restituer l'outil dans l'état où il a été remis</li>
                    <li>Respecter les horaires de restitution</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 5 - Obligations du loueur</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Remettre l'outil en parfait état de fonctionnement</li>
                    <li>Fournir les instructions d'utilisation si nécessaire</li>
                    <li>Garantir la conformité de l'outil à sa description</li>
                    <li>Être disponible pour la remise et la restitution</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 6 - Assurance et responsabilité</h3>
                  <p className="text-gray-600 mb-2">
                    L'outil est couvert par l'assurance Bricola pendant la durée de la location pour :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Les dommages accidentels</li>
                    <li>Le vol (sous certaines conditions)</li>
                    <li>Les dommages causés par un défaut de l'outil</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    Le locataire reste responsable des dommages résultant d'une utilisation non conforme 
                    ou d'une négligence grave.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Article 7 - Résolution des litiges</h3>
                  <p className="text-gray-600">
                    En cas de litige, les parties s'engagent à rechercher une solution amiable. 
                    À défaut, le service client Bricola interviendra en médiation. Les litiges non résolus 
                    seront soumis aux tribunaux compétents.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2">Signature du Loueur</h4>
                      <div className="border-2 border-dashed border-gray-300 h-20 flex items-center justify-center text-gray-500">
                        [Signature et date]
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Signature du Locataire</h4>
                      <div className="border-2 border-dashed border-gray-300 h-20 flex items-center justify-center text-gray-500">
                        [Signature et date]
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instructions d'utilisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>1.</strong> Complétez toutes les sections marquées entre crochets avec les informations appropriées.
                  </p>
                  <p>
                    <strong>2.</strong> Assurez-vous que toutes les parties ont lu et compris le contrat avant signature.
                  </p>
                  <p>
                    <strong>3.</strong> Conservez une copie signée du contrat pendant toute la durée de la location.
                  </p>
                  <p>
                    <strong>4.</strong> En cas de questions, contactez le service client Bricola.
                  </p>
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

export default ContratLocation;