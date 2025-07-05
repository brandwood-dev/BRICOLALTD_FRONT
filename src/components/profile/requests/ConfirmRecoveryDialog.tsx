import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ConfirmRecoveryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onClaim: () => void;
}

const ConfirmRecoveryDialog: React.FC<ConfirmRecoveryDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onClaim
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la récupération</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Voulez-vous vraiment confirmer la bonne réception de votre outil, sans déclaration de problème ?</p>
          <p className="text-sm text-muted-foreground">
            Si vous avez rencontré un souci, cliquez sur le lien "Signaler un problème"
          </p>
          <div className="flex gap-2">
            <Button onClick={onConfirm} className="flex-1">
              Oui, je confirme la bonne réception
            </Button>
            <Button variant="outline" onClick={onClaim} className="flex-1">
              Signaler un problème
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRecoveryDialog;