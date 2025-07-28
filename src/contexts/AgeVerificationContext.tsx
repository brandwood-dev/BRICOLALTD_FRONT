import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface AgeVerificationContextType {
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  isUnderAge: boolean;
  setIsUnderAge: (underAge: boolean) => void;
  clearAgeVerification: () => void;
}

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

export const useAgeVerification = () => {
  const context = useContext(AgeVerificationContext);
  if (context === undefined) {
    throw new Error('useAgeVerification must be used within an AgeVerificationProvider');
  }
  return context;
};

export const AgeVerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isUnderAge, setIsUnderAge] = useState(false);

  useEffect(() => {
    // Check sessionStorage for age verification within the current session
    // This persists on page refresh but resets when browser is closed
    const verifiedSession = sessionStorage.getItem('ageVerified');
    const underAgeSession = sessionStorage.getItem('underAge');
    
    if (verifiedSession === 'true') {
      setIsVerified(true);
    } else if (underAgeSession === 'true') {
      setIsUnderAge(true);
    }
  }, []);

  const handleSetIsVerified = (verified: boolean) => {
    setIsVerified(verified);
    if (verified) {
      // Store in sessionStorage so it persists on refresh but not across browser sessions
      sessionStorage.setItem('ageVerified', 'true');
    }
  };

  const handleSetIsUnderAge = (underAge: boolean) => {
    setIsUnderAge(underAge);
    if (underAge) {
      // Store in sessionStorage so it persists on refresh but not across browser sessions
      sessionStorage.setItem('underAge', 'true');
    }
  };

  const clearAgeVerification = () => {
    setIsVerified(false);
    setIsUnderAge(false);
    // Clear any stored verification data
    sessionStorage.removeItem('ageVerified');
    sessionStorage.removeItem('underAge');
  };

  const value = useMemo(() => ({
    isVerified,
    setIsVerified: handleSetIsVerified,
    isUnderAge,
    setIsUnderAge: handleSetIsUnderAge,
    clearAgeVerification,
  }), [isVerified, isUnderAge]);

  return (
    <AgeVerificationContext.Provider value={value}>
      {children}
    </AgeVerificationContext.Provider>
  );
};