
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center flex !flex-col">
              <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
              <CardDescription>
                {t('login.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full">{t('login.signin')}</Button>
              <div className="text-center space-y-2">
                <Link to="/register" className="text-sm text-accent hover:underline">
                  {t('login.no_account')}
                </Link>
                <div>
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                    {t('login.forgot_password')}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
