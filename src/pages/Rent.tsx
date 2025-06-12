
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { ArrowLeft, Calendar as CalendarIcon, CreditCard, Shield, Check } from 'lucide-react';

const Rent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    pickupTime: '09:00',
    message: '',
    firstName: '',
    lastName: '',
    phone: '',
    paymentMethod: 'card'
  });

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  const totalPrice = calculateDays() * tool.price;
  const deposit = 100;
  const totalToPay = totalPrice + deposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.startDate || !formData.endDate || !formData.firstName || !formData.lastName || !formData.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simuler le processus de réservation
    toast({
      title: "Réservation confirmée !",
      description: `Votre réservation pour ${tool.title} a été confirmée. Vous recevrez un email de confirmation.`,
    });

    // Rediriger vers le profil ou la page d'accueil après 2 secondes
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <Link to={`/tool/${id}`} className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour aux détails
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de réservation */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Finaliser votre réservation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Outil sélectionné */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img src={tool.images[0]} alt={tool.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{tool.title}</h3>
                        <p className="text-sm text-gray-600">{tool.price}€/jour</p>
                        <p className="text-sm text-gray-600">{tool.location}</p>
                      </div>
                    </div>

                    {/* Dates de location */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Période de location</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Date de début *</Label>
                          <Input 
                            id="startDate"
                            type="date" 
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Date de fin *</Label>
                          <Input 
                            id="endDate"
                            type="date" 
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupTime">Heure de récupération</Label>
                        <Select value={formData.pickupTime} onValueChange={(value) => setFormData({...formData, pickupTime: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">08:00</SelectItem>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message au propriétaire */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message au propriétaire (optionnel)</Label>
                      <Textarea 
                        id="message"
                        placeholder="Précisez l'usage prévu, vos questions..."
                        className="min-h-[80px]"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    {/* Informations personnelles */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Informations de contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input 
                            id="firstName"
                            placeholder="Jean"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input 
                            id="lastName"
                            placeholder="Dupont"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input 
                          id="phone"
                          type="tel" 
                          placeholder="06 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Mode de paiement */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Mode de paiement</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          />
                          <CreditCard className="h-5 w-5" />
                          <span>Carte bancaire</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          />
                          <span className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</span>
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Check className="h-5 w-5 mr-2" />
                      Confirmer la réservation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Récapitulatif
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Prix par jour</span>
                      <span>{tool.price}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nombre de jours</span>
                      <span>{calculateDays()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{totalPrice}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Caution (remboursable)</span>
                      <span>{deposit}€</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total à payer</span>
                        <span>{totalToPay}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">Protection incluse</p>
                        <p className="text-blue-700">
                          Votre location est protégée par notre assurance en cas de dommage.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    En confirmant, vous acceptez nos conditions de location et notre politique d'annulation.
                  </div>
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
