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
          <AlertDialogTitle className="text-center">Age Verification</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm leading-relaxed">
            Our platform is accessible via both web and mobile applications. It is strictly reserved for users aged 18 or older who have the legal capacity to use our services.
            <br /><br />
            Bricola reserves the right to suspend or terminate any account in case of policy violations, fraud, or abuse.
            <br /><br />
            For more details, please refer to our Terms and Conditions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button 
            onClick={handleConfirmAge}
            className="w-full"
          >
            Yes, I confirm that I am 18 years old or older
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUnderAge}
            className="w-full"
          >
            No, I am under 18
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationDialog;