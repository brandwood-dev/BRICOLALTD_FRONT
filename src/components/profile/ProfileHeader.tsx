import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Shield, Building2, UserCircle, Trash2 } from 'lucide-react';

interface ProfileHeaderProps {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;
    memberSince: string;
    accountType: string;
  };
  stats: {
    totalEarnings: number;
    activeAds: number;
    totalRentals: number;
    rating: number;
  };
  isAccountDeletionPending: boolean;
  onAccountDeletion: () => void;
}

const ProfileHeader = ({ userInfo, stats, isAccountDeletionPending, onAccountDeletion }: ProfileHeaderProps) => {
  return (
    <>
      {/* Back button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-8">
        <div className="flex flex-col gap-6">
          {/* Profile info section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl sm:text-2xl">
                {userInfo.firstName[0]}{userInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {userInfo.verified && (
                    <Badge variant="default" className="flex items-center gap-1 text-xs">
                      <Shield className="h-3 w-3" />
                      Vérifié
                    </Badge>
                  )}
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    {userInfo.accountType === 'Entreprise' ? (
                      <Building2 className="h-3 w-3" />
                    ) : (
                      <UserCircle className="h-3 w-3" />
                    )}
                    {userInfo.accountType}
                  </Badge>
                </div>
              </div>
              {isAccountDeletionPending && (
                <Badge variant="destructive" className="mb-2 text-xs">
                  Compte en attente de suppression
                </Badge>
              )}
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Membre depuis {userInfo.memberSince}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg sm:text-xl font-bold text-primary">{stats.totalEarnings}€</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Gains totaux</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg sm:text-xl font-bold text-primary">{stats.activeAds}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Annonces actives</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg sm:text-xl font-bold text-primary">{stats.totalRentals}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Locations réalisées</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg sm:text-xl font-bold text-primary">{stats.rating}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Note moyenne</div>
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
                  <span className="sm:hidden">Supprimer compte</span>
                  <span className="hidden sm:inline">Supprimer mon compte</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer votre compte</AlertDialogTitle>
                  <AlertDialogDescription className="text-left">
                    La suppression de votre compte est irréversible.
                    <br /><br />
                    Votre demande sera traitée sous 72h, le temps pour notre équipe de vérifier qu'aucune réclamation ou litige en cours n'est rattaché à votre compte.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onAccountDeletion}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Oui, je confirme la suppression
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;