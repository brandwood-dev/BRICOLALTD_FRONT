
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Check, X, Shield, Camera, Upload } from 'lucide-react';

const ProfileInfo = () => {
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
    accountType: 'Particulier'
  });

  const phonePrefixes = [
    { value: '+33', label: '+33 (France)' },
    { value: '+32', label: '+32 (Belgique)' },
    { value: '+41', label: '+41 (Suisse)' },
    { value: '+1', label: '+1 (USA/Canada)' },
    { value: '+44', label: '+44 (Royaume-Uni)' },
    { value: '+49', label: '+49 (Allemagne)' },
    { value: '+34', label: '+34 (Espagne)' },
    { value: '+39', label: '+39 (Italie)' }
  ];

  const countries = [
    'France', 'Belgique', 'Suisse', 'Canada', 'États-Unis', 'Royaume-Uni', 
    'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Pays-Bas', 'Luxembourg'
  ];

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
        {/* Mobile-optimized layout */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {/* Profile info section - mobile friendly */}
          <div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
            {/* Avatar section */}
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
            
            {/* User info section - centered on mobile */}
            <div className="text-center sm:text-left">
              <CardTitle className="text-lg sm:text-xl">
                {userInfo.firstName} {userInfo.lastName}
              </CardTitle>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                {userInfo.verified && (
                  <Badge variant="default" className="flex items-center gap-1 text-xs">
                    <Shield className="h-3 w-3" />
                    Vérifié
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {userInfo.accountType}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Membre depuis janvier 2024</p>
            </div>
          </div>
          
          {/* Action buttons - full width on mobile */}
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            {!isEditing ? (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Modifier
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
            <Label htmlFor="firstName">Prénom</Label>
            <Input 
              id="firstName" 
              value={userInfo.firstName}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input 
              id="lastName" 
              value={userInfo.lastName}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={userInfo.email}
            disabled={!isEditing}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
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
            <Label htmlFor="country">Pays</Label>
            <Select 
              value={userInfo.country} 
              onValueChange={(value) => setUserInfo({...userInfo, country: value})}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un pays" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input 
              id="address" 
              value={userInfo.address}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
              placeholder="Saisissez votre adresse complète"
            />
            {isEditing && (
              <p className="text-xs text-muted-foreground">
                Saisissez une adresse valide compatible avec Google Maps
              </p>
            )}
          </div>
        </div>
        
        {!isEditing && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>Cliquez sur "Modifier" pour changer votre photo de profil</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
