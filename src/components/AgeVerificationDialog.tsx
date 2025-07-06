import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const AgeVerificationDialog = () => {
  const { isVerified, setIsVerified, setIsUnderAge, isUnderAge } = useAgeVerification();
  const navigate = useNavigate();

  const handleConfirmAge = () => {
    setIsVerified(true);
    navigate('/');
  };

  const handleUnderAge = () => {
    setIsUnderAge(true);
    navigate('/under-age');
  };

  return (
    <AlertDialog open={!isVerified && !isUnderAge}>
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