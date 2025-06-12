
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, User, Menu, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f67f6fee-f634-4c6d-bd0f-0aba827121e4.png" 
              alt="Bricola" 
              className="h-8"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-accent font-medium transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-accent font-medium transition-colors">
              {t('nav.catalog')}
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Blog
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <Select value={language} onValueChange={(value: 'fr' | 'en' | 'ar') => setLanguage(value)}>
              <SelectTrigger className="w-16 border-none bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 FR</SelectItem>
                <SelectItem value="en">🇬🇧 EN</SelectItem>
                <SelectItem value="ar">🇸🇦 AR</SelectItem>
              </SelectContent>
            </Select>

            {/* List tool button */}
            <Link to="/add-tool">
              <Button variant="outline" className="hidden sm:flex">
                {t('nav.list')}
              </Button>
            </Link>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
