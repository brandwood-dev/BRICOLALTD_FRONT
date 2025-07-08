
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';
import { Loader2, AlertCircle } from 'lucide-react';

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    userType: 'PARTICULIER' as 'PARTICULIER' | 'ENTREPRISE',
    firstName: '',
    lastName: '',
    email: '',
    phonePrefix: 'PLUS_965',
    phone: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [salesConditionsAccepted, setSalesConditionsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string>('');

  const countries = [
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'ksa', label: 'Kingdom of saudi arabia' },
    { value: 'UAE', label: 'UAE' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Oman', label: 'Oman' }
  ];

  const phonePrefixes = [
    { value: 'PLUS_965', label: '+965 (Kuwait)' },
    { value: 'PLUS_966', label: '+966 (KSA)' },
    { value: 'PLUS_971', label: '+971 (UAE)' },
    { value: 'PLUS_974', label: '+974 (Qatar)' },
    { value: 'PLUS_973', label: '+973 (Bahrain)' },
    { value: 'PLUS_968', label: '+968 (Oman)' }
  ];

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      newErrors.phone = 'Le téléphone doit contenir uniquement des chiffres';
    }
    if (!formData.country) {
      newErrors.country = 'Le pays est requis';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!termsAccepted) {
      newErrors.terms = 'Vous devez accepter les conditions générales';
    }
    if (!salesConditionsAccepted) {
      newErrors.sales = 'Vous devez accepter les conditions de vente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        type: formData.userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        prefix: formData.phonePrefix,
        address: formData.address,
        phoneNumber: parseInt(formData.phone) 
      };

      const response = await authService.register(registerData);

      if (response.success) {
        toast({
          title: "Inscription réussie !",
          description: response.data?.message || "Votre compte a été créé avec succès. Vérifiez votre email pour activer votre compte.",
        });
        
        setTimeout(() => {
          navigate('/verify-code');
        }, 2000);
      } else {
        setSubmitError(response.error || 'Une erreur est survenue lors de l\'inscription');
        toast({
          title: "Erreur d'inscription",
          description: response.error || 'Une erreur est survenue lors de l\'inscription',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
      setSubmitError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsChange = (checked: boolean | "indeterminate") => {
    setTermsAccepted(checked === true);
  };

  const handleSalesConditionsChange = (checked: boolean | "indeterminate") => {
    setSalesConditionsAccepted(checked === true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('register.title')}</CardTitle>
              <CardDescription>
                {t('register.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type d'utilisateur */}
                <div className="space-y-3">
                  <Label>{t('register.user_type')}</Label>
                  <RadioGroup 
                    value={formData.userType} 
                    onValueChange={(value: 'ENTREPRISE' | 'PARTICULIER') => setFormData({...formData, userType: value})}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PARTICULIER" id="individual" />
                      <Label htmlFor="individual">{t('register.individual')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ENTREPRISE" id="business" />
                      <Label htmlFor="business">{t('register.business')}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('register.first_name')}</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('register.last_name')}</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
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
                            {prefix.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="12 34 56 78"
                      className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">{t('register.country')}</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                      <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                        <SelectValue placeholder={t('register.select_country')} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('register.address')}</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Rue de la Paix, Paris"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {t('register.address_help')}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t('register.password')}</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('register.confirm_password')}</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
                
                {/* Cases à cocher pour les conditions */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={handleTermsChange}
                      className={errors.terms ? 'border-red-500' : ''}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      {t('register.terms')}
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-red-500">{errors.terms}</p>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sales" 
                      checked={salesConditionsAccepted}
                      onCheckedChange={handleSalesConditionsChange}
                      className={errors.sales ? 'border-red-500' : ''}
                    />
                    <Label htmlFor="sales" className="text-sm">
                      {t('register.sales_conditions')}
                    </Label>
                  </div>
                  {errors.sales && (
                    <p className="text-sm text-red-500">{errors.sales}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    t('register.create_account')
                  )}
                </Button>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-accent hover:underline">
                    {t('register.have_account')}
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

export default Register;
