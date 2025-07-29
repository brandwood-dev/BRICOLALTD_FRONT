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
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            We're sorry, you are not authorized to use the Bricola platform.
            <br /><br />
            Please refer to our Terms and Conditions.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/cgu">
              View Terms and Conditions
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderAge;