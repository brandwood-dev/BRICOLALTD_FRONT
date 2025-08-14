import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Check, X, Shield, Camera, Upload, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const ProfileInfo = () => {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    isValid: false
  });
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phonePrefix: '+33',
    phone: '6 12 34 56 78',
    address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    country: 'France',
    verified: true,
    profileImage: '',
    accountType: t('profile.account_type_individual'), // Default to translated "Individual"
    currentPassword: '',
    newPassword: ''
  });

  // Translate countries based on language
  /* const countries = [
    { fr: 'France', en: 'France', ar: 'فرنسا' },
    { fr: 'Belgique', en: 'Belgium', ar: 'بلجيكا' },
    { fr: 'Suisse', en: 'Switzerland', ar: 'سويسرا' },
    { fr: 'Canada', en: 'Canada', ar: 'كندا' },
    { fr: 'États-Unis', en: 'United States', ar: 'الولايات المتحدة' },
    { fr: 'Royaume-Uni', en: 'United Kingdom', ar: 'المملكة المتحدة' },
    { fr: 'Allemagne', en: 'Germany', ar: 'ألمانيا' },
    { fr: 'Espagne', en: 'Spain', ar: 'إسبانيا' },
    { fr: 'Italie', en: 'Italy', ar: 'إيطاليا' },
    { fr: 'Portugal', en: 'Portugal', ar: 'البرتغال' },
    { fr: 'Pays-Bas', en: 'Netherlands', ar: 'هولندا' },
    { fr: 'Luxembourg', en: 'Luxembourg', ar: 'لوكسمبورغ' }
  ].map(country => ({
    value: country.en, // Use English as the internal value for consistency
    label: language === 'fr' ? country.fr : language === 'ar' ? country.ar : country.en
  })); */
  const countries = [
    { value: 'KWD', label: 'kuwait', flag: '<span class="fi fi-kw"></span>' },
    { value: 'SAR', label: 'ksa', flag: '<span class="fi fi-sa"></span>' },
    { value: 'BHD', label: 'bahrain', flag: '<span class="fi fi-bh"></span>' },
    { value: 'OMR', label: 'oman', flag: '<span class="fi fi-om"></span>' },
    { value: 'QAR', label: 'qatar', flag: '<span class="fi fi-qa"></span>'  },
    { value: 'AED', label: 'uae', flag: '<span class="fi fi-ae"></span>' },
  ];

  // Translate phone prefixes based on language
  /* const phonePrefixes = [
    { value: '+33', fr: '+33 (France)', en: '+33 (France)', ar: '+33 (فرنسا)' },
    { value: '+32', fr: '+32 (Belgique)', en: '+32 (Belgium)', ar: '+32 (بلجيكا)' },
    { value: '+41', fr: '+41 (Suisse)', en: '+41 (Switzerland)', ar: '+41 (سويسرا)' },
    { value: '+1', fr: '+1 (USA/Canada)', en: '+1 (USA/Canada)', ar: '+1 (الولايات المتحدة/كندا)' },
    { value: '+44', fr: '+44 (Royaume-Uni)', en: '+44 (United Kingdom)', ar: '+44 (المملكة المتحدة)' },
    { value: '+49', fr: '+49 (Allemagne)', en: '+49 (Germany)', ar: '+49 (ألمانيا)' },
    { value: '+34', fr: '+34 (Espagne)', en: '+34 (Spain)', ar: '+34 (إسبانيا)' },
    { value: '+39', fr: '+39 (Italie)', en: '+39 (Italy)', ar: '+39 (إيطاليا)' }
  ].map(prefix => ({
    value: prefix.value,
    label: language === 'fr' ? prefix.fr : language === 'ar' ? prefix.ar : prefix.en
  })); */
const phonePrefixes = [
    { value: '+965', label: `+965 (${t('country.kuwait')})`, flag: '<span class="fi fi-kw"></span>' },
    { value: '+966', label: `+966 (${t('country.ksa')})`, flag: '<span class="fi fi-sa"></span>' },
    { value: '+971', label: `+971 (${t('country.uae')})`, flag: '<span class="fi fi-ae"></span>' },
    { value: '+974', label: `+974 (${t('country.qatar')})`, flag: '<span class="fi fi-qa"></span>' },
    { value: '+973', label: `+973 (${t('country.bahrain')})`, flag: '<span class="fi fi-bh"></span>' },
    { value: '+968', label: `+968 (${t('country.oman')})`, flag: '<span class="fi fi-om"></span>' },

  ];
  const handleSave = () => {
    // If both password fields are filled, handle password change
    if (userInfo.currentPassword && userInfo.newPassword) {
      if (!passwordValidation.isValid) {
        console.log('Password does not meet requirements');
        // You could show a toast notification here
        return;
      }
      console.log('Changing password...', {
        currentPassword: userInfo.currentPassword,
        newPassword: userInfo.newPassword
      });
      // Here you would make an API call to change the password
      // For now, we'll just clear the password fields after "saving"
      setUserInfo({
        ...userInfo,
        currentPassword: '',
        newPassword: ''
      });
      // Reset password validation state
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false,
        isValid: false
      });
    }
    
    setIsEditing(false);
    // Save other profile data logic here
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({...userInfo, profileImage: e.target?.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

    const validation = {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      isValid
    };

    setPasswordValidation(validation);
    return validation;
  };

  // Handle password change with validation
  const handlePasswordChange = (password: string) => {
    setUserInfo({...userInfo, newPassword: password});
    validatePassword(password);
  };

  const handleAccountDeletion = () => {
    // Here you would make an API call to delete the account
    console.log('Deleting account...');
    // For now, just show a confirmation in the console
    // In a real implementation, you would:
    // 1. Make an API call to delete the account
    // 2. Show a success message
    // 3. Redirect the user to the home page or login page
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
            <div className="relative flex-shrink-0">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src={userInfo.profileImage} />
                <AvatarFallback className="text-lg sm:text-xl">{userInfo.firstName[0]}{userInfo.lastName[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg hover:bg-primary/90 transition-colors">
                      <Camera className="h-3 w-3" />
                    </div>
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left ">
              <CardTitle className="text-lg sm:text-xl">
                {userInfo.firstName} {userInfo.lastName}
              </CardTitle>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                {userInfo.verified && (
                  <Badge variant="default" className="flex items-center gap-1 text-xs">
                    <Shield className="h-3 w-3" />
                    {t('profile.verified')}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {t('profile.account_type_individual')}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t('profile.member_since').replace('{date}', language === 'fr' ? 'janvier 2024' : language === 'ar' ? 'يناير 2024' : 'January 2024')}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto sm:flex-shrink-0 ">
            {!isEditing ? (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {t('profile.edit')}
              </Button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" onClick={handleSave} className="flex-1 sm:flex-none">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('profile.first_name')}</Label>
            <Input 
              id="firstName" 
              value={userInfo.firstName}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
              className={language === 'ar' ? 'text-right' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('profile.last_name')}</Label>
            <Input 
              id="lastName" 
              value={userInfo.lastName}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
              className={language === 'ar' ? 'text-right' : ''}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{t('profile.current_password')}</Label>
            <Input 
              id="currentPassword" 
              type="password"
              value={userInfo.currentPassword}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, currentPassword: e.target.value})}
              className={language === 'ar' ? 'text-right' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t('profile.new_password')}</Label>
            <Input 
              id="newPassword" 
              type="password"
              value={userInfo.newPassword}
              disabled={!isEditing}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={language === 'ar' ? 'text-right' : ''}
            />
            {/* Password requirements - only show when editing, password has content, and NOT all requirements are met */}
            {isEditing && userInfo.newPassword.length > 0 && !passwordValidation.isValid && (
              <div className="text-xs space-y-1 mt-2">
                <p className={`flex items-center gap-1 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{passwordValidation.minLength ? '✓' : '✗'}</span>
                  {t('password.min_length')}
                </p>
                <p className={`flex items-center gap-1 ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                  {t('password.uppercase')}
                </p>
                <p className={`flex items-center gap-1 ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                  {t('password.lowercase')}
                </p>
                <p className={`flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                  {t('password.number')}
                </p>
                <p className={`flex items-center gap-1 ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{passwordValidation.hasSpecial ? '✓' : '✗'}</span>
                  {t('password.special_char')}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('profile.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            value={userInfo.email}
            disabled={!isEditing}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('profile.phone')}</Label>
          <div className="flex gap-2">
            <Select 
              value={userInfo.phonePrefix} 
              onValueChange={(value) => setUserInfo({...userInfo, phonePrefix: value})}
              disabled={!isEditing}
            >
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
              value={userInfo.phone}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              className="flex-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">{t('profile.country')}</Label>
            <Select 
              value={userInfo.country} 
              onValueChange={(value) => setUserInfo({...userInfo, country: value})}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('profile.select_country')} />
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
            <Label htmlFor="address">{t('profile.address')}</Label>
            <Input 
              id="address" 
              value={userInfo.address}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
              placeholder={t('profile.address_placeholder')}
              className={language === 'ar' ? 'text-right' : ''}
            />
            {isEditing && (
              <p className="text-xs text-muted-foreground">
                {t('profile.address_hint')}
              </p>
            )}
          </div>
        </div>
        {/* Delete account button */}
          <div className="flex justify-center sm:justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span className="sm:hidden">{t('profile.delete_account')}</span>
                  <span className="hidden sm:inline">{t('profile.delete_account')}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className={`flex flex-row flex-wrap items-center ${language === 'ar' ? 'justify-end' : ''}`}>
                  <AlertDialogTitle>{t('profile.delete_confirm')}</AlertDialogTitle>
                  <AlertDialogDescription className={`text-left space-y-2${language === 'ar' ? ' text-right' : ''}`}>
                    <div>{t('profile.delete_description')}</div>
                    <div>{t('profile.delete_processing')}</div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleAccountDeletion}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t('action.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        {!isEditing && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>{t('profile.edit_profile_photo')}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;