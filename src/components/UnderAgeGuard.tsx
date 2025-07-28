import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAgeVerification } from '@/contexts/AgeVerificationContext';
import UnderAge from '@/pages/UnderAge';

interface UnderAgeGuardProps {
  children: React.ReactNode;
}

const UnderAgeGuard: React.FC<UnderAgeGuardProps> = ({ children }) => {
  const { isUnderAge } = useAgeVerification();
  const location = useLocation();

  // Allow access to certain pages even when under age (legal requirements)
  const allowedPagesForUnderAge = ['/cgu', '/politique-confidentialite'];
  const isAllowedPage = allowedPagesForUnderAge.includes(location.pathname);

  // If user confirmed they are under age and not on an allowed page, show the under-age page
  if (isUnderAge && !isAllowedPage) {
    return <UnderAge />;
  }

  // Otherwise, show the normal content
  return <>{children}</>;
};

export default UnderAgeGuard;
