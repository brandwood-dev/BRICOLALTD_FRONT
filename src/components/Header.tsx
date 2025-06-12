
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, User, Menu, Wrench } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ToolShare</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
              {t('nav.home')}
            </a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
              {t('nav.catalog')}
            </a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
              {t('nav.rent')}
            </a>
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
            <Button variant="outline" className="hidden sm:flex">
              {t('nav.list')}
            </Button>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                {t('nav.login')}
              </Button>
              <Button size="sm">
                {t('nav.signup')}
              </Button>
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
