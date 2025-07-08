
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAccountDeletionPending, setIsAccountDeletionPending] = useState(false);
  const { toast } = useToast();
  
  const userInfo = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    verified: true,
    memberSince: 'janvier 2024',
    accountType: 'Particulier'
  };

  const stats = {
    totalEarnings: 450,
    activeAds: 3,
    totalRentals: 12,
    rating: 4.8
  };

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
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
