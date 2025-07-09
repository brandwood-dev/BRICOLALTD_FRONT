
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/userService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAccountDeletionPending, setIsAccountDeletionPending] = useState(false);
  const { toast } = useToast();
  const { access_token } = useAuth();
  
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    verified: true,
    memberSince: '',
    accountType: '',
    profileImage: ''
  });

  const stats = {
    totalEarnings: 450,
    activeAds: 3,
    totalRentals: 12,
    rating: 4.8
  };

  const fetchUserData = async () => {
    if (!access_token) return;

    try {
      const response = await userService.getMe(access_token);
      
      if (response.success && response.data) {
        const apiUser = response.data;
        const profileImageUrl = apiUser.profilePicture 
          ? `${import.meta.env.VITE_BASE_URL}${apiUser.profilePicture.startsWith('/') ? '' : '/'}${apiUser.profilePicture}`
          : '';
        setUserInfo({
          firstName: apiUser.firstName,
          lastName: apiUser.lastName,
          email: apiUser.email,
          verified: apiUser.verified || false,
          memberSince: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long' 
          }) : 'N/A',
          accountType: apiUser.userType === 'ENTREPRISE' ? 'Entreprise' : 'Particulier',
          profileImage: profileImageUrl
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [access_token]);

  const handleAccountDeletion = () => {
    setIsAccountDeletionPending(true);
    toast({
      title: "Demande de suppression enregistrée",
      description: "Votre demande de suppression de compte a été enregistrée et sera traitée sous 72 heures.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <ProfileHeader 
            userInfo={userInfo}
            stats={stats}
            isAccountDeletionPending={isAccountDeletionPending}
            onAccountDeletion={handleAccountDeletion}
          />
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} onUserInfoUpdate={fetchUserData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
