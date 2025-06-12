
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une question, un problème ou simplement envie d'échanger ? Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="votre.email@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <Input placeholder="Sujet de votre message" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Décrivez votre demande en détail..." 
                    className="min-h-[120px]"
                  />
                </div>
                <Button size="lg" className="w-full">
                  Envoyer le message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <p className="text-gray-600 mb-1">contact@bricola.com</p>
                      <p className="text-gray-600">support@bricola.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                      <p className="text-gray-600 mb-1">+33 1 23 45 67 89</p>
                      <p className="text-sm text-gray-500">Lundi au Vendredi, 9h-18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                      <p className="text-gray-600 mb-1">123 Rue de l'Innovation</p>
                      <p className="text-gray-600 mb-1">75001 Paris, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Horaires</h3>
                      <p className="text-gray-600 mb-1">Lundi - Vendredi : 9h00 - 18h00</p>
                      <p className="text-gray-600 mb-1">Samedi : 10h00 - 16h00</p>
                      <p className="text-gray-600">Dimanche : Fermé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Comment louer un outil ?</h3>
                  <p className="text-gray-600">
                    Recherchez l'outil souhaité, sélectionnez les dates de location, et confirmez votre réservation. C'est aussi simple que ça !
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Que faire en cas de problème ?</h3>
                  <p className="text-gray-600">
                    Contactez-nous immédiatement via notre support client. Nous sommes là pour résoudre tous vos problèmes rapidement.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Comment proposer mes outils ?</h3>
                  <p className="text-gray-600">
                    Cliquez sur "Proposer un outil" dans la navigation, ajoutez les détails et photos de votre outil, et commencez à gagner de l'argent.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Les outils sont-ils assurés ?</h3>
                  <p className="text-gray-600">
                    Oui, tous les outils loués via Bricola sont couverts par notre assurance complète pour votre tranquillité d'esprit.
                  </p>
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

export default Contact;
