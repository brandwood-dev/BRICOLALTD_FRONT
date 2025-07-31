
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Erreur",
        description: "Adresse mail non valide",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulation de l'envoi d'email
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('resetpwd.popuptitle'),
        description: t('resetpwd.popuptxt'),
      });
      navigate('/verify-code', { state: { email } });
    }, 1000);
  };
  const {t} = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center !flex !flex-col">
              <CardTitle className="text-2xl">{t('resetpwd.emailtitle')}</CardTitle>
              <CardDescription>
                {t('resetpwd.emailtxt')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('resetpwd.emailfield')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={t('resetpwd.emailplaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t('resetpwd.sendbtnpending') : t('resetpwd.sendbtn')}
                </Button>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-accent hover:underline">
                    {t('resetpwd.backlogin')}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
