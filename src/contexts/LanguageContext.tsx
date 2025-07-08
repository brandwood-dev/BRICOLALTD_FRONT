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
    'tools.new_ad': 'Nouvelle annonce',
    'tools.my_ads': 'Mes annonces',
    'tools.edit': 'Modifier',
    'tools.view': 'Voir',
    'tools.delete': 'Supprimer',
    'tools.published': 'Publié',
    'tools.unpublished': 'Non publié',
    'tools.pending': 'En attente',
    'tools.approved': 'Approuvé',
    'tools.rejected': 'Rejeté',
    
    // Profile
    'profile.title': 'Mon Profil',
    'profile.profile': 'Profil',
    'profile.wallet': 'Portefeuille',
    'profile.requests': 'Demandes',
    'profile.reservations': 'Réservations',
    'profile.ads': 'Annonces',
    'profile.favorites': 'Favoris',
    'profile.edit': 'Modifier',
    'profile.save': 'Enregistrer',
    'profile.cancel': 'Annuler',
    'profile.verified': 'Vérifié',
    'profile.member_since': 'Membre depuis',
    'profile.individual': 'Particulier',
    'profile.company': 'Entreprise',
    'profile.delete_account': 'Supprimer mon compte',
    'profile.delete_confirm': 'Supprimer votre compte',
    'profile.delete_description': 'La suppression de votre compte est irréversible.',
    'profile.back_home': 'Retour à l\'accueil',
    
    // Forms
    'form.first_name': 'Prénom',
    'form.last_name': 'Nom',
    'form.email': 'Email',
    'form.phone': 'Téléphone',
    'form.address': 'Adresse',
    'form.country': 'Pays',
    'form.password': 'Mot de passe',
    'form.confirm_password': 'Confirmer le mot de passe',
    'form.title': 'Titre',
    'form.description': 'Description',
    'form.price': 'Prix',
    'form.category': 'Catégorie',
    'form.location': 'Localisation',
    
    // Actions
    'action.search': 'Rechercher',
    'action.filter': 'Filtrer',
    'action.sort': 'Trier',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'action.confirm': 'Confirmer',
    'action.delete': 'Supprimer',
    'action.edit': 'Modifier',
    'action.view': 'Voir',
    'action.contact': 'Contacter',
    'action.close': 'Fermer',
    'action.back': 'Retour',
    'action.next': 'Suivant',
    'action.previous': 'Précédent',
    
    // Floating Action Button
    'fab.contact_support': 'Contacter le support',
    'fab.publish_ad': 'Publier une annonce',
    'fab.find_tool': 'Trouver mon outil',
    
    // Messages
    'message.success': 'Succès',
    'message.error': 'Erreur',
    'message.loading': 'Chargement...',
    'message.no_results': 'Aucun résultat trouvé',
    'message.confirm_delete': 'Êtes-vous sûr de vouloir supprimer ?',
    
    // Footer
    'footer.about': 'À propos',
    'footer.help': 'Aide',
    'footer.contact': 'Contact',
    'footer.legal': 'Mentions légales',
    'footer.rights': 'Tous droits réservés',
    'footer.cgu': 'CGU',
    'footer.privacy': 'Politique de confidentialité',
    'footer.faq': 'FAQ',
    
    // Common
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.ok': 'OK',
    'common.language': 'Langue',
    'common.currency': 'Devise',
    'common.menu': 'Menu',
    'common.navigation': 'Navigation',
    'common.home': 'Accueil'
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
    'tools.new_ad': 'New ad',
    'tools.my_ads': 'My ads',
    'tools.edit': 'Edit',
    'tools.view': 'View',
    'tools.delete': 'Delete',
    'tools.published': 'Published',
    'tools.unpublished': 'Unpublished',
    'tools.pending': 'Pending',
    'tools.approved': 'Approved',
    'tools.rejected': 'Rejected',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.profile': 'Profile',
    'profile.wallet': 'Wallet',
    'profile.requests': 'Requests',
    'profile.reservations': 'Reservations',
    'profile.ads': 'Ads',
    'profile.favorites': 'Favorites',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.verified': 'Verified',
    'profile.member_since': 'Member since',
    'profile.individual': 'Individual',
    'profile.company': 'Company',
    'profile.delete_account': 'Delete my account',
    'profile.delete_confirm': 'Delete your account',
    'profile.delete_description': 'Account deletion is irreversible.',
    'profile.back_home': 'Back to home',
    
    // Forms
    'form.first_name': 'First name',
    'form.last_name': 'Last name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.country': 'Country',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm password',
    'form.title': 'Title',
    'form.description': 'Description',
    'form.price': 'Price',
    'form.category': 'Category',
    'form.location': 'Location',
    
    // Actions
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.sort': 'Sort',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.view': 'View',
    'action.contact': 'Contact',
    'action.close': 'Close',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.previous': 'Previous',
    
    // Floating Action Button
    'fab.contact_support': 'Contact support',
    'fab.publish_ad': 'Publish ad',
    'fab.find_tool': 'Find my tool',
    
    // Messages
    'message.success': 'Success',
    'message.error': 'Error',
    'message.loading': 'Loading...',
    'message.no_results': 'No results found',
    'message.confirm_delete': 'Are you sure you want to delete?',
    
    // Footer
    'footer.about': 'About',
    'footer.help': 'Help',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved',
    'footer.cgu': 'Terms',
    'footer.privacy': 'Privacy policy',
    'footer.faq': 'FAQ',
    
    // Common
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.language': 'Language',
    'common.currency': 'Currency',
    'common.menu': 'Menu',
    'common.navigation': 'Navigation',
    'common.home': 'Home'
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
    'tools.new_ad': 'إعلان جديد',
    'tools.my_ads': 'إعلاناتي',
    'tools.edit': 'تعديل',
    'tools.view': 'عرض',
    'tools.delete': 'حذف',
    'tools.published': 'منشور',
    'tools.unpublished': 'غير منشور',
    'tools.pending': 'في الانتظار',
    'tools.approved': 'مُوافق عليه',
    'tools.rejected': 'مرفوض',
    
    // Profile
    'profile.title': 'ملفي الشخصي',
    'profile.profile': 'الملف الشخصي',
    'profile.wallet': 'المحفظة',
    'profile.requests': 'الطلبات',
    'profile.reservations': 'الحجوزات',
    'profile.ads': 'الإعلانات',
    'profile.favorites': 'المفضلة',
    'profile.edit': 'تعديل',
    'profile.save': 'حفظ',
    'profile.cancel': 'إلغاء',
    'profile.verified': 'موثق',
    'profile.member_since': 'عضو منذ',
    'profile.individual': 'فرد',
    'profile.company': 'شركة',
    'profile.delete_account': 'حذف حسابي',
    'profile.delete_confirm': 'حذف حسابك',
    'profile.delete_description': 'حذف الحساب غير قابل للإلغاء.',
    'profile.back_home': 'العودة للرئيسية',
    
    // Forms
    'form.first_name': 'الاسم الأول',
    'form.last_name': 'الاسم الأخير',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'الهاتف',
    'form.address': 'العنوان',
    'form.country': 'البلد',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.title': 'العنوان',
    'form.description': 'الوصف',
    'form.price': 'السعر',
    'form.category': 'الفئة',
    'form.location': 'الموقع',
    
    // Actions
    'action.search': 'بحث',
    'action.filter': 'تصفية',
    'action.sort': 'ترتيب',
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'action.confirm': 'تأكيد',
    'action.delete': 'حذف',
    'action.edit': 'تعديل',
    'action.view': 'عرض',
    'action.contact': 'اتصال',
    'action.close': 'إغلاق',
    'action.back': 'رجوع',
    'action.next': 'التالي',
    'action.previous': 'السابق',
    
    // Floating Action Button
    'fab.contact_support': 'اتصل بالدعم',
    'fab.publish_ad': 'نشر إعلان',
    'fab.find_tool': 'البحث عن أداة',
    
    // Messages
    'message.success': 'نجح',
    'message.error': 'خطأ',
    'message.loading': 'جاري التحميل...',
    'message.no_results': 'لم يتم العثور على نتائج',
    'message.confirm_delete': 'هل أنت متأكد من الحذف؟',
    
    // Footer
    'footer.about': 'حول',
    'footer.help': 'مساعدة',
    'footer.contact': 'اتصال',
    'footer.legal': 'قانوني',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.cgu': 'الشروط',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.faq': 'الأسئلة الشائعة',
    
    // Common
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.ok': 'موافق',
    'common.language': 'اللغة',
    'common.currency': 'العملة',
    'common.menu': 'القائمة',
    'common.navigation': 'التنقل',
    'common.home': 'الرئيسية'
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