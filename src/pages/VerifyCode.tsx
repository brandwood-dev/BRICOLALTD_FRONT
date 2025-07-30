
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);
  const { t } = useLanguage();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast({
        title: "Erreur",
        description: "Le code doit contenir 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulation de la vérification du code
    setTimeout(() => {
      setIsLoading(false);
      // Pour la démo, on accepte "123456" comme code valide
      if (code === '123456') {
        toast({
          title: t('email.valid_code'),
          description: t('email.valid_code_message'),
        });
        navigate('/reset-password', { state: { email, verified: true } });
      } else {
        toast({
          title: t('general.error'),
          description: t('email.invalid_code'),
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleResendCode = () => {
    setCountdown(60);
    setCanResend(false);
    toast({
      title: t('email.resend.message'),
      description: t('email.resend.description'),
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('email.verification.title')}</CardTitle>
              <CardDescription>
                {t('email.verification.description')} {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
                  {isLoading ? 'Vérification...' : 'Vérifier'}
                </Button>
                
                <div className="text-center space-y-2">
                  {canResend ? (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={handleResendCode}
                      className="text-sm text-accent hover:underline"
                    >
                      {t('email.resend')}
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {t('email.resend')} {t('general.in')} {countdown}s
                    </p>
                  )}
                  
                  <div>
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                      {t('general.back')}
                    </Link>
                  </div>
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

export default VerifyCode;
