
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { ArrowLeft, Calendar as CalendarIcon, CreditCard, Shield } from 'lucide-react';

const Rent = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const totalPrice = calculateDays() * tool.price;
  const deposit = 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link to={`/tool/${id}`} className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour aux détails
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire de réservation */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Réserver cet outil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img src={tool.images[0]} alt={tool.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{tool.title}</h3>
                      <p className="text-sm text-gray-600">{tool.price}€/jour</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Heure de récupération</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>

                  <div className="space-y-2">
                    <Label>Message au propriétaire (optionnel)</Label>
                    <Textarea 
                      placeholder="Précisez l'usage prévu, vos questions..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Informations personnelles</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Prénom</Label>
                        <Input placeholder="Jean" />
                      </div>
                      <div className="space-y-2">
                        <Label>Nom</Label>
                        <Input placeholder="Dupont" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input type="tel" placeholder="06 12 34 56 78" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Récapitulatif de la commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Prix par jour</span>
                      <span>{tool.price}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nombre de jours</span>
                      <span>{calculateDays() || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{totalPrice || tool.price}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caution (remboursable)</span>
                      <span>{deposit}€</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total à payer</span>
                        <span>{(totalPrice || tool.price) + deposit}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900">Protection incluse</p>
                        <p className="text-blue-700">
                          Votre location est protégée par notre assurance en cas de dommage.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Mode de paiement</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="payment" defaultChecked />
                        <span className="text-sm">Carte bancaire</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="payment" />
                        <span className="text-sm">PayPal</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Confirmer la réservation
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    En confirmant, vous acceptez nos conditions de location et notre politique d'annulation.
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

export default Rent;
