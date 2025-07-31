import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Check, X, Shield, Camera, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfileInfo = () => {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
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
    accountType: t('profile.account_type_individual') // Default to translated "Individual"
  });

  // Translate countries based on language
  const countries = [
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
  }));

  // Translate phone prefixes based on language
  const phonePrefixes = [
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
  }));

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
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
            <div className="text-center sm:text-left">
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
          <div className="w-full sm:w-auto sm:flex-shrink-0">
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
                    {country.label}
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