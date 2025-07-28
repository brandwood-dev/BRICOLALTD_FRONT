
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Check, X, Shield, Camera, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { userService, UpdateUserRequest } from '@/services/userService';

interface ProfileInfoProps {
  onUserInfoUpdate?: () => void;
}

const ProfileInfo = ({ onUserInfoUpdate }: ProfileInfoProps) => {
  const { access_token, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [originalEmail, setOriginalEmail] = useState('');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonePrefix: '',
    phone: '',
    address: '',
    country: '',
    verified: false,
    profileImage: '',
    memberSince: '',
    accountType: 'Particulier'
  });

  // Fetch user info from API
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!access_token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await userService.getMe(access_token);
        if (response.success && response.data) {
          const userData = response.data;
          let profileImageUrl = '';
          if (userData.profilePicture) {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const separator = userData.profilePicture.startsWith('/') ? '' : '/';
            profileImageUrl = `${baseUrl}${separator}${userData.profilePicture}`;
          }
          
          setUserInfo(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            verified: userData.verified || false,
            phonePrefix: userData.prefix || '',
            phone: userData.phoneNumber ? userData.phoneNumber.toString() : '',
            country: userData.country || '',
            address: userData.address || '',
            profileImage: profileImageUrl,
            memberSince: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long' 
            }) : 'N/A',
            accountType: userData.userType === 'ENTREPRISE' ? 'Entreprise' : 'Particulier'
          }));
          // Store original email for comparison
          setOriginalEmail(userData.email || '');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [access_token]);

  const countries = [
    'Kuwait',
    'ksa',
    'UAE',
    'Qatar',
    'Bahrain',
    'Oman'
  ];

  const phonePrefixes = [
    { value: 'PLUS_965', label: '+965 (Kuwait)' },
    { value: 'PLUS_966', label: '+966 (KSA)' },
    { value: 'PLUS_971', label: '+971 (UAE)' },
    { value: 'PLUS_974', label: '+974 (Qatar)' },
    { value: 'PLUS_973', label: '+973 (Bahrain)' },
    { value: 'PLUS_968', label: '+968 (Oman)' }
  ];

  const handleSave = async () => {
    if (!access_token) return;
    
    setIsSaving(true);
    try {
      // First upload the image if there's a pending file
      if (pendingImageFile) {
        setIsUploadingImage(true);
        const imageResponse = await userService.uploadProfilePicture(access_token, pendingImageFile);
        if (!imageResponse.success) {
          console.error('Error uploading image:', imageResponse.error);
          return;
        }
        setPendingImageFile(null);
      }

      const updateData: UpdateUserRequest = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        newEmail: userInfo.email,
        phoneNumber: userInfo.phone ? parseInt(userInfo.phone) : undefined,
        prefix: userInfo.phonePrefix,
        country: userInfo.country,
        address: userInfo.address,
      };
      if(userInfo.email === originalEmail){
        delete updateData.newEmail;
      }
      const response = await userService.updateUser(access_token, updateData);
      
      if (response.success) {
        // Check if email was changed
        const emailChanged = userInfo.email !== originalEmail;
        
        if (emailChanged) {
          // Log out user and redirect to verify code page
          logout();
          navigate('/verify-code', { 
            state: { 
              email: userInfo.email,
              from: 'email-change' 
            }
          });
          return;
        }
        
        setIsEditing(false);
        // Trigger update in parent component
        if (onUserInfoUpdate) {
          onUserInfoUpdate();
        }
        console.log('Profile updated successfully');
      } else {
        // Handle error
        console.error('Error updating profile:', response.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
      setIsUploadingImage(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Store the file for upload
      setPendingImageFile(file);
      
      // Create preview
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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Mobile-optimized layout */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              {/* Profile info section - mobile friendly */}
              <div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
                {/* Avatar section */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                    <AvatarImage src={userInfo.profileImage} />
                    <AvatarFallback className="text-lg sm:text-xl">
                      {userInfo.firstName[0] || ''}{userInfo.lastName[0] || ''}
                    </AvatarFallback>
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
                  <p className="text-sm text-muted-foreground mt-1">Membre depuis {userInfo.memberSince}</p>
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
                    <Button size="sm" onClick={handleSave} disabled={isSaving || isUploadingImage} className="flex-1 sm:flex-none">
                      {isSaving || isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={isSaving || isUploadingImage} className="flex-1 sm:flex-none">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!isLoading && (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
