import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';
import { useAuth } from '@/contexts/AuthContext';

const AgeVerificationDialog = () => {
  const { isVerified, setIsVerified, setIsUnderAge, isUnderAge, clearAgeVerification } = useAgeVerification();
  const { isAuthenticated, isLoading } = useAuth();

  // Handle logout detection and age verification clearing
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is logged in - mark them as authenticated in this session
        sessionStorage.setItem('wasAuthenticated', 'true');
      } else {
        // User is not authenticated
        // Check if they were authenticated in a previous session (not just this page load)
        const wasAuthenticated = sessionStorage.getItem('wasAuthenticated');
        
        // Only clear age verification if the user explicitly logged out
        // (was authenticated in this session but now is not)
        if (wasAuthenticated === 'true') {
          //clearAgeVerification();
          sessionStorage.removeItem('wasAuthenticated');
        }
      }
    }
  }, [isAuthenticated, isLoading, clearAgeVerification]);

  // Show dialog when:
  // 1. Not loading
  // 2. Not authenticated (user is not logged in)  
  // 3. Not verified (hasn't confirmed age)
  // 4. Not under age (hasn't said they're under 18)
  const shouldShowDialog = !isLoading && !isAuthenticated && !isVerified && !isUnderAge;

  const handleConfirmAge = () => {
    setIsVerified(true);
  };

  const handleUnderAge = () => {
    setIsUnderAge(true);
  };

  return (
    <AlertDialog open={shouldShowDialog}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Vérification d'âge</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm leading-relaxed">
            Notre plateforme est accessible via les applications web et mobile. Elle est réservée aux utilisateurs âgés de 18 ans ou plus, disposant de la capacité légale d'utiliser nos services.
            <br /><br />
            Bricola se réserve le droit de suspendre ou de résilier tout compte en cas de non-respect de notre politique, de fraude ou d'abus.
            <br /><br />
            Pour en savoir plus, veuillez consulter nos Conditions Générales d'Utilisation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button 
            onClick={handleConfirmAge}
            className="w-full"
          >
            Oui, je confirme avoir 18 ans ou plus
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUnderAge}
            className="w-full"
          >
            Non, j'ai moins de 18 ans
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationDialog;