
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckIcon, XIcon } from 'lucide-react';

const Register = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    userType: 'individual',
    firstName: '',
    lastName: '',
    email: '',
    phonePrefix: '+33',
    phone: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [salesConditionsAccepted, setSalesConditionsAccepted] = useState(false);
  const ValidationIndicator = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center space-x-2 text-sm ${isValid ? 'text-green-600 ' : 'text-red-600 '}` + (language === 'ar' ? 'justify-end' : '')}>
      {isValid ? <CheckIcon className="h-4 w-4" /> : <XIcon className="h-4 w-4" />}
      <span>{text}</span>
    </div>
    
  );
  const passwordValidation = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const countries = [
    { value: 'KWD', label: 'kuwait', flag: '<span class="fi fi-kw"></span>' },
    { value: 'SAR', label: 'ksa', flag: '<span class="fi fi-sa"></span>' },
    { value: 'BHD', label: 'bahrain', flag: '<span class="fi fi-bh"></span>' },
    { value: 'OMR', label: 'oman', flag: '<span class="fi fi-om"></span>' },
    { value: 'QAR', label: 'qatar', flag: '<span class="fi fi-qa"></span>'  },
    { value: 'AED', label: 'uae', flag: '<span class="fi fi-ae"></span>' },
  ];
  
 const phonePrefixes = [
    { value: '+965', label: `+965 (${t('country.kuwait')})`, flag: '<span class="fi fi-kw"></span>' },
    { value: '+966', label: `+966 (${t('country.ksa')})`, flag: '<span class="fi fi-sa"></span>' },
    { value: '+971', label: `+971 (${t('country.uae')})`, flag: '<span class="fi fi-ae"></span>' },
    { value: '+974', label: `+974 (${t('country.qatar')})`, flag: '<span class="fi fi-qa"></span>' },
    { value: '+973', label: `+973 (${t('country.bahrain')})`, flag: '<span class="fi fi-bh"></span>' },
    { value: '+968', label: `+968 (${t('country.oman')})`, flag: '<span class="fi fi-om"></span>' },

  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    console.log('Terms accepted:', termsAccepted);
    console.log('Sales conditions accepted:', salesConditionsAccepted);
    // Logique d'inscription ici
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
            <CardHeader className="text-center flex !flex-col">
              <CardTitle className="text-2xl">{t('register.title')}</CardTitle>
              <CardDescription>
                {t('register.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type d'utilisateur */}
                <div className="space-y-3">
                  <Label>{t('register.user_type')}</Label>
                  <RadioGroup 
                    value={formData.userType} 
                    onValueChange={(value) => setFormData({...formData, userType: value})}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">{t('register.individual')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('register.last_name')}</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
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
                  />
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">{t('register.country')}</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('register.select_country')} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                              <span className='mx-2' dangerouslySetInnerHTML={{ __html: country.flag }} />
                            {t(`country.${country.label}`)}

                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('register.address')}</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Rue de la Paix, Paris"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
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
                  />
                </div>
                {formData.password && (
                  <div className="space-y-2 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">{t('password.criteria')}</p>
                    <ValidationIndicator isValid={passwordValidation.minLength} text={t('password.min_length')} />
                    <ValidationIndicator isValid={passwordValidation.hasUpperCase} text={t('password.uppercase')} />
                    <ValidationIndicator isValid={passwordValidation.hasLowerCase} text={t('password.lowercase')} />
                    <ValidationIndicator isValid={passwordValidation.hasNumber} text={t('password.number')} />
                    <ValidationIndicator isValid={passwordValidation.hasSpecialChar} text={t('password.special_char')} />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('register.confirm_password')}</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
                
                {/* Cases à cocher pour les conditions */}
                <div className="space-y-3 ">
                  <div className={"items-center space-x-2" + (language === 'ar' ? 'flex-col-reverse' : 'flex')}>
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={handleTermsChange}
                    />
                    <Label htmlFor="terms" className="text-sm p-2">
                      <a
                        href="/cgu"
                        className="hover:underline"
                      >{t('register.terms')}</a>
                    </Label>
                  </div>
                  
                  <div className={"items-center space-x-2" + (language === 'ar' ? 'flex-col-reverse' : 'flex')}>
                    <Checkbox 
                      id="sales" 
                      checked={salesConditionsAccepted}
                      onCheckedChange={handleSalesConditionsChange}
                    />
                    <Label htmlFor="sales" className="text-sm p-2">
                      <a
                        href="/politique-confidentialite"
                        className="hover:underline"
                      >
                        {t('register.sales_conditions')}
                      </a>
                    </Label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!termsAccepted || !salesConditionsAccepted}
                >
                  {t('register.create_account')}
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
