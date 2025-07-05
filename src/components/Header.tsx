
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Search, User, Menu, Wrench, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { favoritesCount } = useFavorites();
  const { currency, setCurrency, currencies } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-accent font-medium transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Catalogue
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-accent font-medium transition-colors">
              À propos
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency selector */}
            <Select value={currency.code} onValueChange={(value) => {
              const selectedCurrency = currencies.find(c => c.code === value);
              if (selectedCurrency) setCurrency(selectedCurrency);
            }}>
              <SelectTrigger className="w-20 border-none bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language selector */}
            <Select value={language} onValueChange={(value: 'fr' | 'en' | 'ar') => setLanguage(value)}>
              <SelectTrigger className="w-28 border-none bg-transparent">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ar">🇸🇦 العربية</SelectItem>
              </SelectContent>
            </Select>

            {/* Favorites */}
            <Link to="/favorites" className="relative">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* List tool button */}
            <Link to="/add-tool">
              <Button variant="outline">
                {t('nav.list')}
              </Button>
            </Link>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  {t('nav.signup')}
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Right side */}
          <div className="flex md:hidden items-center space-x-2">
            {/* User profile icon */}
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Auth buttons */}
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start">
                        {t('nav.signup')}
                      </Button>
                    </Link>
                    <Link to="/add-tool" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <Wrench className="h-4 w-4 mr-2" />
                        {t('nav.list')}
                      </Button>
                    </Link>
                  </div>

                  {/* Navigation links */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3 text-sm text-muted-foreground">Navigation</h3>
                    <div className="flex flex-col space-y-2">
                      <Link 
                        to="/" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-accent/5 transition-colors"
                      >
                        {t('nav.home')}
                      </Link>
                      <Link 
                        to="/search" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-accent/5 transition-colors"
                      >
                        Catalogue
                      </Link>
                      <Link 
                        to="/about" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-accent/5 transition-colors"
                      >
                        À propos
                      </Link>
                      <Link 
                        to="/blog" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-accent/5 transition-colors"
                      >
                        Blog
                      </Link>
                      <Link 
                        to="/contact" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-accent font-medium py-2 px-3 rounded-md hover:bg-accent/5 transition-colors"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>

                  {/* Language and Currency */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3 text-sm text-muted-foreground">Préférences</h3>
                    
                    {/* Language selector */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Langue</label>
                      <Select value={language} onValueChange={(value: 'fr' | 'en' | 'ar') => setLanguage(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">🇫🇷 Français</SelectItem>
                          <SelectItem value="en">🇬🇧 English</SelectItem>
                          <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Currency selector */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Devise</label>
                      <Select value={currency.code} onValueChange={(value) => {
                        const selectedCurrency = currencies.find(c => c.code === value);
                        if (selectedCurrency) setCurrency(selectedCurrency);
                      }}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((curr) => (
                            <SelectItem key={curr.code} value={curr.code}>
                              {curr.flag} {curr.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
