
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, Check, X, Shield } from 'lucide-react';

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    city: 'Paris',
    country: 'France',
    verified: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="text-lg">{userInfo.firstName[0]}{userInfo.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="flex items-center gap-2">
              {userInfo.firstName} {userInfo.lastName}
              {userInfo.verified && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Vérifié
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Membre depuis janvier 2024</p>
          </div>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit3 className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
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
          <Input 
            id="phone" 
            value={userInfo.phone}
            disabled={!isEditing}
            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input 
              id="city" 
              value={userInfo.city}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input 
              id="country" 
              value={userInfo.country}
              disabled={!isEditing}
              onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
