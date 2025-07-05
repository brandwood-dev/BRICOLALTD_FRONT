import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClaimDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (type: string, description: string) => void;
}

const ClaimDialog: React.FC<ClaimDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit
}) => {
  const [claimType, setClaimType] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!claimType || !claimDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(claimType, claimDescription);
    setClaimType('');
    setClaimDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler un problème</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type de problème</label>
            <Select value={claimType} onValueChange={setClaimType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de problème" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="damaged">Outil endommagé</SelectItem>
                <SelectItem value="late-return">Retard de restitution</SelectItem>
                <SelectItem value="missing-parts">Pièces manquantes</SelectItem>
                <SelectItem value="not-working">Outil ne fonctionne pas</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description du problème</label>
            <Textarea
              placeholder="Décrivez le problème rencontré..."
              value={claimDescription}
              onChange={(e) => setClaimDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pièces justificatives</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
              <p className="text-xs text-gray-400 mt-1">Images ou vidéos (max 10MB)</p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Envoyer la réclamation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimDialog;