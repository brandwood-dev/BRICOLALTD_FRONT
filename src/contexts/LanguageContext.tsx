
import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.catalog': 'Catalogue',
    'nav.rent': 'Louer',
    'nav.list': 'Proposer un outil',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    
    // Hero section
    'hero.title': 'Louez et partagez vos outils en toute simplicité',
    'hero.subtitle': 'La plateforme qui connecte les propriétaires d\'outils avec ceux qui en ont besoin. Particuliers et professionnels, trouvez l\'outil parfait près de chez vous.',
    'hero.search.placeholder': 'Rechercher un outil...',
    'hero.search.location': 'Localisation',
    'hero.search.button': 'Rechercher',
    
    // Categories
    'categories.title': 'Catégories populaires',
    'categories.garden': 'Jardinage',
    'categories.construction': 'Construction',
    'categories.automotive': 'Automobile',
    'categories.electric': 'Électrique',
    
    // Tools
    'tools.featured': 'Outils en vedette',
    'tools.day': 'jour',
    'tools.available': 'Disponible',
    'tools.rent': 'Louer',
    'tools.details': 'Voir détails',
    
    // Footer
    'footer.about': 'À propos',
    'footer.help': 'Aide',
    'footer.contact': 'Contact',
    'footer.legal': 'Mentions légales',
    'footer.rights': 'Tous droits réservés'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.rent': 'Rent',
    'nav.list': 'List a tool',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    
    // Hero section
    'hero.title': 'Rent and share your tools with ease',
    'hero.subtitle': 'The platform that connects tool owners with those who need them. Individuals and professionals, find the perfect tool near you.',
    'hero.search.placeholder': 'Search for a tool...',
    'hero.search.location': 'Location',
    'hero.search.button': 'Search',
    
    // Categories
    'categories.title': 'Popular categories',
    'categories.garden': 'Gardening',
    'categories.construction': 'Construction',
    'categories.automotive': 'Automotive',
    'categories.electric': 'Electric',
    
    // Tools
    'tools.featured': 'Featured tools',
    'tools.day': 'day',
    'tools.available': 'Available',
    'tools.rent': 'Rent',
    'tools.details': 'View details',
    
    // Footer
    'footer.about': 'About',
    'footer.help': 'Help',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.catalog': 'الكتالوج',
    'nav.rent': 'استئجار',
    'nav.list': 'إضافة أداة',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    
    // Hero section
    'hero.title': 'استأجر وشارك أدواتك بسهولة',
    'hero.subtitle': 'المنصة التي تربط أصحاب الأدوات مع من يحتاجونها. أفراد ومحترفون، اعثر على الأداة المثالية بالقرب منك.',
    'hero.search.placeholder': 'البحث عن أداة...',
    'hero.search.location': 'الموقع',
    'hero.search.button': 'بحث',
    
    // Categories
    'categories.title': 'الفئات الشائعة',
    'categories.garden': 'البستنة',
    'categories.construction': 'البناء',
    'categories.automotive': 'السيارات',
    'categories.electric': 'الكهرباء',
    
    // Tools
    'tools.featured': 'الأدوات المميزة',
    'tools.day': 'يوم',
    'tools.available': 'متاح',
    'tools.rent': 'استئجار',
    'tools.details': 'عرض التفاصيل',
    
    // Footer
    'footer.about': 'حول',
    'footer.help': 'مساعدة',
    'footer.contact': 'اتصال',
    'footer.legal': 'قانوني',
    'footer.rights': 'جميع الحقوق محفوظة'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Set document direction for Arabic
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
