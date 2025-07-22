import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQ = () => {
    const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Questions Fréquentes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>

          {/* General Questions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle >{t('faq.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Qu'est-ce que Bricola ?</AccordionTrigger>
                  <AccordionContent>
                    Bricola est une plateforme de location d'outils entre particuliers et professionnels. Nous connectons les propriétaires d'outils avec ceux qui en ont besoin pour leurs projets, permettant un accès facile et économique à tous types d'équipements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Comment fonctionne Bricola ?</AccordionTrigger>
                  <AccordionContent>
                    C'est simple : les propriétaires d'outils créent des annonces avec photos, descriptions et tarifs. Les locataires recherchent les outils dont ils ont besoin, font une réservation en ligne, et organisent la remise directement avec le propriétaire.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>L'inscription est-elle gratuite ?</AccordionTrigger>
                  <AccordionContent>
                    Oui, l'inscription sur Bricola est entièrement gratuite. Nous ne prélevons qu'une commission de 5,4% sur les locations réussies pour couvrir les frais de fonctionnement, d'assurance et de sécurité de la plateforme.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* For Renters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pour les locataires</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="renter-1">
                  <AccordionTrigger>Comment rechercher un outil ?</AccordionTrigger>
                  <AccordionContent>
                    Utilisez notre moteur de recherche en tapant le nom de l'outil ou en naviguant par catégories. Vous pouvez filtrer les résultats par localisation, prix, et disponibilité pour trouver exactement ce dont vous avez besoin.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renter-2">
                  <AccordionTrigger>Comment effectuer une réservation ?</AccordionTrigger>
                  <AccordionContent>
                    Sélectionnez l'outil souhaité, choisissez vos dates de location, et cliquez sur "Louer maintenant". Vous serez dirigé vers un formulaire de réservation sécurisé où vous pourrez finaliser votre demande.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renter-3">
                  <AccordionTrigger>Que faire si l'outil ne fonctionne pas ?</AccordionTrigger>
                  <AccordionContent>
                    Contactez immédiatement le propriétaire et notre service client. Si le problème ne peut être résolu, nous vous proposerons un remboursement complet ou vous aiderons à trouver un outil de remplacement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="renter-4">
                  <AccordionTrigger>Puis-je annuler ma réservation ?</AccordionTrigger>
                  <AccordionContent>
                    Oui, vous pouvez annuler votre réservation jusqu'à 24h avant le début de la location pour un remboursement complet. Les annulations de dernière minute peuvent être soumises à des frais selon la politique du propriétaire.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* For Owners */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pour les propriétaires</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="owner-1">
                  <AccordionTrigger>Comment créer une annonce ?</AccordionTrigger>
                  <AccordionContent>
                    Cliquez sur "Proposer un outil" dans la navigation, remplissez le formulaire avec les détails de votre outil (titre, description, catégorie, prix), ajoutez des photos de qualité, et publiez votre annonce.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-2">
                  <AccordionTrigger>Comment fixer le prix de location ?</AccordionTrigger>
                  <AccordionContent>
                    Étudiez les prix d'outils similaires sur la plateforme, considérez la valeur neuve de votre outil, son état, et la demande locale. Vous pouvez ajuster vos tarifs à tout moment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-3">
                  <AccordionTrigger>Quand suis-je payé ?</AccordionTrigger>
                  <AccordionContent>
                    Le paiement est effectué automatiquement dans les 48h suivant la fin de la location, après déduction de notre commission de 5,4%. L'argent est versé directement sur votre compte bancaire.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-4">
                  <AccordionTrigger>Que se passe-t-il en cas de dommage ?</AccordionTrigger>
                  <AccordionContent>
                    Tous les outils sont couverts par notre assurance. En cas de dommage, contactez-nous immédiatement avec des photos. Nous évaluerons la situation et organiserons la réparation ou le dédommagement selon notre police d'assurance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Payment and Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Paiement et sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="payment-1">
                  <AccordionTrigger>Quels modes de paiement acceptez-vous ?</AccordionTrigger>
                  <AccordionContent>
                    Nous acceptons toutes les cartes bancaires principales (Visa, Mastercard) ainsi que les virements bancaires. Tous les paiements sont sécurisés et cryptés.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment-2">
                  <AccordionTrigger>Mes données personnelles sont-elles protégées ?</AccordionTrigger>
                  <AccordionContent>
                    Absolument. Nous utilisons un cryptage SSL de niveau bancaire et respectons le RGPD. Vos données ne sont jamais vendues à des tiers et sont utilisées uniquement pour le fonctionnement de la plateforme.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment-3">
                  <AccordionTrigger>Comment fonctionne le système de caution ?</AccordionTrigger>
                  <AccordionContent>
                    Une caution peut être demandée par le propriétaire pour se protéger contre les dommages. Elle est bloquée sur votre carte au moment de la réservation et libérée automatiquement après le retour de l'outil en bon état.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;