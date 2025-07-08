
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.form_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.first_name')}</label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.last_name')}</label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('login.email')}</label>
                  <Input type="email" placeholder="votre.email@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.subject')}</label>
                  <Input placeholder="Sujet de votre message" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                  <Textarea 
                    placeholder="Décrivez votre demande en détail..." 
                    className="min-h-[120px]"
                  />
                </div>
                <Button size="lg" className="w-full">
                  {t('contact.send')}
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
                      <h3 className="text-lg font-semibold mb-2">{t('contact.email_title')}</h3>
                      <p className="text-gray-600 mb-1">contact@bricolaltd.com</p>
                      <p className="text-gray-600">support@bricolaltd.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('contact.phone_title')}</h3>
                      <p className="text-gray-600 mb-1">+33 1 23 45 67 89</p>
                      <p className="text-sm text-gray-500">{t('contact.hours_weekdays')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('contact.address_title')}</h3>
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
                      <h3 className="text-lg font-semibold mb-2">{t('contact.hours_title')}</h3>
                      <p className="text-gray-600 mb-1">{t('contact.hours_weekdays')}</p>
                      <p className="text-gray-600 mb-1">{t('contact.hours_saturday')}</p>
                      <p className="text-gray-600">{t('contact.hours_sunday')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">{t('contact.faq_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{t('contact.how_to_rent')}</h3>
                  <p className="text-gray-600">
                    {t('contact.how_to_rent_answer')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{t('contact.problem')}</h3>
                  <p className="text-gray-600">
                    {t('contact.problem_answer')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{t('contact.how_to_list')}</h3>
                  <p className="text-gray-600">
                    {t('contact.how_to_list_answer')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{t('contact.insurance')}</h3>
                  <p className="text-gray-600">
                    {t('contact.insurance_answer')}
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
