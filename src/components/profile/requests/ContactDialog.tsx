import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail } from 'lucide-react';
import { handleCall, handleEmail } from './utils';
import { OwnerRequest } from './types';

interface ContactDialogProps {
  request: OwnerRequest;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ request }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Contacter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informations du locataire</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.renterAvatar} />
              <AvatarFallback>
                {request.renterName?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{request.renterName}</h3>
              <p className="text-sm text-muted-foreground">{request.renterEmail}</p>
              <p className="text-sm text-muted-foreground">{request.renterPhone}</p>
            </div>
          </div>
          
          {request.message && (
            <div className="bg-muted/50 p-3 rounded">
              <p className="text-sm"><strong>Message :</strong> {request.message}</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={() => handleCall(request.renterPhone)}
              className="flex-1 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Appeler
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleEmail(request.renterEmail)}
              className="flex-1 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              E-mail
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;