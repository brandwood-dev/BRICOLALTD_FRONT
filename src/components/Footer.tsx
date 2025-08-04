import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { Link, Route, useNavigate, useNavigation, useRoutes } from 'react-router-dom';
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const navigate =  useNavigate()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className={`flex items-center space-x-2 mb-4 ${language === 'ar' ? 'justify-end' : 'ltr text-left'}`}>
              <img
                onClick={() => {
                  navigate('/')
                  window.scroll({top: 0, behavior: 'smooth'})

                }}
                src="/lovable-uploads/f67f6fee-f634-4c6d-bd0f-0aba827121e42.png"
                alt="Bricola"
                className={`h-8 ${language === 'ar' ? 'rtl text-right' : 'ltr text-left'}`}
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-md md:mb-10">
              {t('footer.description')}
            </p>
            <div className={ `flex space-x-4 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">{t('nav.catalog')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.propos')}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/guide-loueur" className="hover:text-white transition-colors">{t('faq.owners.title')}</Link></li>
              <li><Link to="/guide-locataire" className="hover:text-white transition-colors">{t('faq.renters.title')}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">{t('footer.faq')}</Link></li>
              <li><Link to="/cgu" className="hover:text-white transition-colors">{t('footer.cgu')}</Link></li>
              <li><Link to="/contrat-location" className="hover:text-white transition-colors">{t('footer.contrat')}</Link></li>
              <li><Link to="/politique-confidentialite" className="hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div  >
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-gray-400  ">
              <li
                className={"flex items-center " + (language === 'ar' ? '[direction:ltr]' : '')}
              >
                <Mail className="h-4 w-4" />
                contact@bricolaltd.com
              </li>
              <li className={"flex items-center " + (language === 'ar' ? '[direction:ltr]' : '')}>
                <Phone className="h-4 w-4 mr-2" />
                +442039960821
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">{t('footer.payment')}</h4>
              <div className={"flex space-x-3" + (language === 'ar' ? ' justify-end' : ' justify-start')}>
                <img src={visaLogo} alt="Visa" className="h-6 object-contain" />
                <img src={mastercardLogo} alt="Mastercard" className="h-6 object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex !flex-col items-center text-center text-gray-400 space-y-2">
            <p>&copy; 2025 Bricola LTD. {t('footer.rights')}.</p>
            <p className="text-sm">
              {'Designed By'}{' '}
              <a
                href="https://www.brandwoodandco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-foreground transition-colors"
              >
                Brandwood & co
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;