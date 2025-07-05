import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star } from 'lucide-react';

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmit = () => {
    onSubmit(rating, reviewComment);
    setRating(0);
    setReviewComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Évaluer la location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Note par étoiles</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Commentaire</label>
            <Textarea
              placeholder="Partagez votre expérience..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Soumettre l'évaluation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;