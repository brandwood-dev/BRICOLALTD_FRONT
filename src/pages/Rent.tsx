import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTools } from '@/data/mockData';
import { ArrowLeft, Calendar as CalendarIcon, CreditCard, Shield, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const Rent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const tool = mockTools.find(t => t.id === id) || mockTools[0];
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    pickupTime: '09:00',
    message: '',
    firstName: '',
    lastName: '',
    phone: '',
    phonePrefix: '+965',
    paymentMethod: 'card'
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
   const phonePrefixes = [
    { value: '+965', label: `+965 (${t('country.kuwait')})`, flag: '<span class="fi fi-kw"></span>' },
    { value: '+966', label: `+966 (${t('country.ksa')})`, flag: '<span class="fi fi-sa"></span>' },
    { value: '+971', label: `+971 (${t('country.uae')})`, flag: '<span class="fi fi-ae"></span>' },
    { value: '+974', label: `+974 (${t('country.qatar')})`, flag: '<span class="fi fi-qa"></span>' },
    { value: '+973', label: `+973 (${t('country.bahrain')})`, flag: '<span class="fi fi-bh"></span>' },
    { value: '+968', label: `+968 (${t('country.oman')})`, flag: '<span class="fi fi-om"></span>' },

  ];

  // Mock unavailable dates
  const unavailableDates = [
    new Date(2024, 6, 15), // July 15, 2024
    new Date(2024, 6, 16), // July 16, 2024
    new Date(2024, 6, 20), // July 20, 2024
    new Date(2024, 6, 21), // July 21, 2024
  ];

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailable => 
      date.toDateString() === unavailable.toDateString()
    );
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  // Calculate prices with 5.4% fees
  const originalPrice = tool.price; // Original price entered by owner
  const feeRate = 0.054; // 5.4%
  const feeAmount = originalPrice * feeRate;
  const displayPrice = originalPrice + feeAmount;
  const totalPrice = calculateDays() * displayPrice;
  const dailyFees = feeAmount;
  const totalFees = dailyFees * calculateDays();
  const deposit = 100;
  const totalToPay = totalPrice + deposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!startDate || !endDate || !formData.firstName || !formData.lastName || !formData.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simuler le processus de réservation
    toast({
      title: t('reservation.confirmed'),
      description: t('reservation.confirmed_message', { toolName: tool.title }),
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
              {t('reservation.back_to_details')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de réservation */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className={(language === 'ar' ? "justify-end" : "")}>
                  <CardTitle className="flex items-center gap-2 ">
                    {
                      language === 'ar' ? (
                        <>
                          {t('reservation.complete_booking')}
                          <CalendarIcon className="h-5 w-5" />
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="h-5 w-5" />
                          {t('reservation.complete_booking')}
                        </>
                      )
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Outil sélectionné */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg justify-end">
                      { language === 'ar' ? (
                        <>
                          <div>
                            <h3 className="font-semibold">{tool.title}</h3>
                            <p className="text-sm text-gray-600">{displayPrice.toFixed(1)}€/{t('general.day')}</p>
                            <p className="text-sm text-gray-600">{tool.location}</p>
                          </div>
                          <img src={tool.images[0]} alt={tool.title} className="w-16 h-16 object-cover rounded" />
                        </>
                      ):(
                        <>
                          <img src={tool.images[0]} alt={tool.title} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h3 className="font-semibold">{tool.title}</h3>
                            <p className="text-sm text-gray-600">{displayPrice.toFixed(1)}€/{t('general.day')}</p>
                            <p className="text-sm text-gray-600">{tool.location}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Dates de location */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('reservation.rental_period')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t('reservation.start_date')} *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP", { locale: fr }) : t('reservation.select_date')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                disabled={(date) => {
                                  return date < new Date() || isDateUnavailable(date);
                                }}
                                modifiers={{
                                  unavailable: unavailableDates
                                }}
                                modifiersStyles={{
                                  unavailable: { 
                                    backgroundColor: '#fecaca', 
                                    color: '#dc2626',
                                    textDecoration: 'line-through'
                                  }
                                }}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>{t('reservation.end_date')} *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP", { locale: fr }) : t('reservation.select_date')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                disabled={(date) => {
                                  return date < (startDate || new Date()) || isDateUnavailable(date);
                                }}
                                modifiers={{
                                  unavailable: unavailableDates
                                }}
                                modifiersStyles={{
                                  unavailable: { 
                                    backgroundColor: '#fecaca', 
                                    color: '#dc2626',
                                    textDecoration: 'line-through'
                                  }
                                }}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupTime">{t('reservation.pickup_time')}</Label>
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
                      <Label htmlFor="message">{t('reservation.message_to_owner')}</Label>
                      <Textarea 
                        id="message"
                        placeholder={t('reservation.message_placeholder')}
                        className="min-h-[80px]"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    {/* Informations personnelles */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('reservation.contact_information')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t('general.first_name')} *</Label>
                          <Input 
                            id="firstName"
                            placeholder={t('general.first_name_placeholder')}
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t('general.last_name')} *</Label>
                          <Input 
                            id="lastName"
                            placeholder={t('general.last_name_placeholder')}
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      {/* Téléphone avec préfixe */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('register.phone')}</Label>
                        <div className="flex space-x-2">
                          <Select value={formData.phonePrefix} onValueChange={(value) => setFormData({...formData, phonePrefix: value})}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {phonePrefixes.map((prefix) => (
                                <SelectItem key={prefix.value} value={prefix.value}>
                                  <span className='mx-2' dangerouslySetInnerHTML={{ __html: prefix.flag }} />
                                  {prefix.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="12 34 56 78"
                            className="flex-1"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mode de paiement */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t('reservation.payment_method')}</h3>
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
                          <span>{t('reservation.card')}</span>
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
                      {t('reservation.confirm')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className = {language =='ar' ? "flex justify-end" : ""}>
                  <CardTitle className="flex items-center gap-2">
                    {language === 'ar' ? (
                      <>
                        {t('reservation.recap')}
                        <CreditCard className="h-5 w-5" />
                      </>
                    ):(
                      <>
                        <CreditCard className="h-5 w-5" />
                        {t('reservation.recap')}
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className={"flex justify-between text-sm " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <span>{t('reservation.price_per_day')}</span>
                      <span>{displayPrice.toFixed(1)}€</span>
                    </div>
                    <div className={"flex justify-between text-sm " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <span>{t('reservation.number_of_days')}</span>
                      <span>{calculateDays()}</span>
                    </div>
                    <div className={"flex justify-between text-sm " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <span>{t('reservation.subtotal')}</span>
                      <span>{totalPrice.toFixed(1)}€</span>
                    </div>
                    <div className={"flex justify-between text-sm " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <span>{t('reservation.payment_fee')}</span>
                      <span>{totalFees.toFixed(1)}€</span>
                    </div>
                    <div className={"flex justify-between text-sm " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <span>{t('reservation.deposit')}</span>
                      <span>{deposit}€</span>
                    </div>
                    <div className={"border-t pt-3 " + (language === 'ar' ? "[direction:ltr]" : "")}>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>{t('reservation.total_amount')}</span>
                        <span>{totalToPay.toFixed(1)}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className={"flex items-start gap-2" + (language === 'ar' ? " justify-end" : "")}>
                      {language === 'ar' ? (
                        <>
                        <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">{t('reservation.included_protection')}</p>
                        <p className="text-blue-700">
                          {t('reservation.insurance_description')}
                        </p>
                      </div>
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        </>
                      ):(
                        <>
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">{t('reservation.included_protection')}</p>
                        <p className="text-blue-700">
                          {t('reservation.insurance_description')}
                        </p>
                      </div>
                        </>

                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    {t('reservation.confirmation_message')}
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
