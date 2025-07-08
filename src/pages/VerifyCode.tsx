
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? '';
  const from = location.state?.from ?? '';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

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

    if (!email) {
      toast({
        title: "Erreur",
        description: "Adresse email manquante",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      
      if (from === 'forgot-password') {
        // Handle forgot password verification
        const response = await authService.verifyForgotPasswordCode(email, code);
        
        if (response.success) {
          toast({
            title: "Code vérifié",
            description: response.message ?? "Code correct, redirection vers la réinitialisation du mot de passe",
          });
          // Navigate to reset password page with the reset token if available
          navigate('/reset-password', { 
            state: { 
              email, 
              resetToken: response.data?.resetToken || code 
            }
          });
        } else {
          toast({
            title: "Erreur",
            description: response.error ?? "Code incorrect",
            variant: "destructive",
          });
        }
      } else {
        // Handle regular email verification
        const response = await authService.verifyEmailWithCode(email, code);
        
        if (response.success) {
          toast({
            title: "Code vérifié",
            description: response.message ?? "Email vérifié avec succès",
          });
          navigate('/login');
        } else {
          toast({
            title: "Erreur",
            description: response.error ?? "Code incorrect",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la vérification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast({
        title: "Erreur",
        description: "Adresse email manquante",
        variant: "destructive",
      });
      return;
    }

    try {
      let response;
      
      if (from === 'forgot-password') {
        // Resend forgot password code
        response = await authService.forgotPassword(email);
      } else {
        // Resend regular verification code
        response = await authService.resendVerificationCode(email);
      }
      
      if (response.success) {
        setCountdown(60);
        setCanResend(false);
        toast({
          title: "Code renvoyé",
          description: response.message ?? "Un nouveau code a été envoyé à votre adresse email",
        });
      } else {
        toast({
          title: "Erreur",
          description: response.error ?? "Impossible de renvoyer le code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Resend code error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi du code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Vérification</CardTitle>
              <CardDescription>
                Entrez le code de {from === 'forgot-password' ? 'réinitialisation' : 'vérification'} envoyé à {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
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
                      Renvoyer le code
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Renvoyer le code dans {countdown}s
                    </p>
                  )}
                  
                  <div>
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                      Retour
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
