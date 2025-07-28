import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface RefusalDialogProps {
  onDecline: (requestId: string, reason: string, message: string) => void;
  requestId: string;
}

const RefusalDialog: React.FC<RefusalDialogProps> = ({ onDecline, requestId }) => {
  const [refusalReason, setRefusalReason] = useState('');
  const [refusalMessage, setRefusalMessage] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();
  const handleDecline = () => {
    if (!refusalReason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison de refus.",
        variant: "destructive"
      });
      return;
    }
    
    onDecline(requestId, refusalReason, refusalMessage);
    setRefusalReason('');
    setRefusalMessage('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t('request.decline')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Motif du refus</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={refusalReason} onValueChange={setRefusalReason}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une raison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unavailable">Outil non disponible</SelectItem>
              <SelectItem value="maintenance">En maintenance</SelectItem>
              <SelectItem value="already-booked">Déjà réservé</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Message libre (optionnel)"
            value={refusalMessage}
            onChange={(e) => setRefusalMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleDecline}
              className="flex-1"
            >
              Confirmer le refus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefusalDialog;