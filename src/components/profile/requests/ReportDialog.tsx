import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportDialogProps {
  requestId: string;
}

const ReportDialog: React.FC<ReportDialogProps> = ({ requestId }) => {
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const { toast } = useToast();

  const handleReport = () => {
    if (!reportReason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison de signalement.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Signalement envoyé",
      description: "Votre signalement a été transmis à l'administration.",
    });
    
    setReportReason('');
    setReportMessage('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Flag className="h-4 w-4 mr-1" />
          Signaler
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler un problème</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={reportReason} onValueChange={setReportReason}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une raison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-response">Ne répond pas</SelectItem>
              <SelectItem value="wrong-number">Numéro incorrect</SelectItem>
              <SelectItem value="inappropriate">Comportement inapproprié</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Décrivez le problème"
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
          />
          <Button onClick={handleReport} className="w-full">
            Envoyer le signalement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;