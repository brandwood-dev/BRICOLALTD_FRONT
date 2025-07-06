import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UnderAge = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Accès non autorisé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Nous sommes désolés, vous ne pouvez pas utiliser la plateforme Bricola.
            <br /><br />
            Merci de consulter nos Conditions Générales d'Utilisation.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/cgu">
              Consulter les CGU
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderAge;