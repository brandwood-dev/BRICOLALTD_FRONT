
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, XIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';

const ValidationIndicator = ({ isValid, text }: { isValid: boolean; text: string }) => (
  <div className={`flex items-center space-x-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
    {isValid ? <CheckIcon className="h-4 w-4" /> : <XIcon className="h-4 w-4" />}
    <span>{text}</span>
  </div>
);

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get reset token from location state
  const resetToken = location.state?.resetToken;
  
  // Vérifier si l'utilisateur est arrivé via le processus de vérification
  const isVerified = location.state?.verified ?? !!resetToken;

  const email = location.state?.email ?? '';
  
  React.useEffect(() => {
    if (!isVerified || !resetToken) {
      navigate('/forgot-password');
    }
  }, [isVerified, resetToken, navigate]);

  const passwordValidation = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = password === confirmPassword && confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast({
        title: "Erreur",
        description: "Le mot de passe ne respecte pas tous les critères",
        variant: "destructive",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authService.resetPassword(resetToken, password, email);
      
      if (response.success) {
        toast({
          title: "Mot de passe modifié",
          description: response.message || "Votre mot de passe a été modifié avec succès",
        });
        navigate('/login');
      } else {
        toast({
          title: "Erreur",
          description: response.error || "Une erreur est survenue lors de la modification du mot de passe",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Nouveau mot de passe</CardTitle>
              <CardDescription>
                Choisissez un nouveau mot de passe sécurisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {password && (
                  <div className="space-y-2 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Critères du mot de passe :</p>
                    <ValidationIndicator isValid={passwordValidation.minLength} text="Au moins 8 caractères" />
                    <ValidationIndicator isValid={passwordValidation.hasUpperCase} text="Une lettre majuscule" />
                    <ValidationIndicator isValid={passwordValidation.hasLowerCase} text="Une lettre minuscule" />
                    <ValidationIndicator isValid={passwordValidation.hasNumber} text="Un chiffre" />
                    <ValidationIndicator isValid={passwordValidation.hasSpecialChar} text="Un caractère spécial" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {confirmPassword && (
                    <div className={`text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordsMatch ? '✓ Les mots de passe correspondent' : '✗ Les mots de passe ne correspondent pas'}
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !isPasswordValid || !passwordsMatch}
                >
                  {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
                </Button>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-accent hover:underline">
                    Retour à la connexion
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

export default ResetPassword;
