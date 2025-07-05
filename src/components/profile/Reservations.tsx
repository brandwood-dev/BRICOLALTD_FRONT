
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Clock, CheckCircle, XCircle, Calendar, Upload } from 'lucide-react';
import RequestsAndReservationsFilters from './RequestsAndReservationsFilters';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { generateRentalContract } from '@/utils/contractGenerator';

interface Reservation {
  id: string;
  referenceId: string;
  toolName: string;
  toolDescription: string;
  toolImage: string;
  owner: string;
  ownerEmail: string;
  ownerPhone: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled' | 'rejected';
  price: number;
  dailyPrice: number;
  location: string;
  validationCode?: string;
  hasActiveClaim?: boolean;
  cancellationReason?: string;
  cancellationMessage?: string;
  renterHasReturned?: boolean;
  hasUsedReturnButton?: boolean;
}

const Reservations = () => {
  const [showValidationCode, setShowValidationCode] = useState<{[key: string]: boolean}>({});
  const [copiedCode, setCopiedCode] = useState<{[key: string]: boolean}>({});
  const [cancellationReason, setCancellationReason] = useState('');
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [claimType, setClaimType] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState('');
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useToast();

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      referenceId: 'RES-2024-001',
      toolName: 'Perceuse sans fil',
      toolDescription: 'Perceuse visseuse sans fil 18V avec 2 batteries',
      toolImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
      owner: 'Marie Dubois',
      ownerEmail: 'marie.dubois@email.com',
      ownerPhone: '+33 6 87 65 43 21',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'pending',
      price: 25,
      dailyPrice: 12.5,
      location: 'Paris 15ème'
    },
    {
      id: '2',
      referenceId: 'RES-2024-002',
      toolName: 'Scie circulaire',
      toolDescription: 'Scie circulaire 1400W avec lame carbure',
      toolImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      owner: 'Paul Martin',
      ownerEmail: 'paul.martin@email.com',
      ownerPhone: '+33 6 11 22 33 44',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'accepted',
      price: 35,
      dailyPrice: 17.5,
      location: 'Paris 12ème',
      validationCode: 'ABC123'
    },
    {
      id: '3',
      referenceId: 'RES-2024-003',
      toolName: 'Ponceuse orbitale',
      toolDescription: 'Ponceuse orbitale 240W avec disques',
      toolImage: 'https://images.unsplash.com/photo-1609592242810-8de8b4c6e0bc?w=400&h=300&fit=crop',
      owner: 'Sophie Durand',
      ownerEmail: 'sophie.durand@email.com',
      ownerPhone: '+33 6 98 76 54 32',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'ongoing',
      price: 20,
      dailyPrice: 20,
      location: 'Paris 8ème',
      validationCode: 'XYZ789'
    },
    {
      id: '4',
      referenceId: 'RES-2024-004',
      toolName: 'Échelle télescopique',
      toolDescription: 'Échelle télescopique 3.8m, charge max 150kg',
      toolImage: 'https://images.unsplash.com/photo-1631047038830-c6c8e1af70b9?w=400&h=300&fit=crop',
      owner: 'Marc Dubois',
      ownerEmail: 'marc.dubois@email.com',
      ownerPhone: '+33 6 22 33 44 55',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      status: 'cancelled',
      price: 40,
      dailyPrice: 20,
      location: 'Paris 14ème',
      cancellationReason: 'Changement de plans',
      cancellationMessage: 'Je ne peux plus utiliser l\'outil à ces dates.'
    },
    {
      id: '5',
      referenceId: 'RES-2024-005',
      toolName: 'Marteau-piqueur',
      toolDescription: 'Marteau-piqueur électrique 1500W avec 3 burins',
      toolImage: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
      owner: 'Claire Martin',
      ownerEmail: 'claire.martin@email.com',
      ownerPhone: '+33 6 55 44 33 22',
      startDate: '2024-01-05',
      endDate: '2024-01-07',
      status: 'completed',
      price: 60,
      dailyPrice: 30,
      location: 'Paris 11ème'
    },
    {
      id: '6',
      referenceId: 'RES-2024-006',
      toolName: 'Niveau laser',
      toolDescription: 'Niveau laser rotatif avec trépied',
      toolImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      owner: 'Thomas Bernard',
      ownerEmail: 'thomas.bernard@email.com',
      ownerPhone: '+33 6 77 88 99 00',
      startDate: '2024-01-08',
      endDate: '2024-01-10',
      status: 'rejected',
      price: 45,
      dailyPrice: 22.5,
      location: 'Paris 18ème'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      case 'rejected': return 'Refusée';
      default: return status;
    }
  };

  const isCancellationAllowed = (startDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    return today < start;
  };

  const handleCancelReservation = (reservationId: string) => {
    if (!cancellationReason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison d'annulation.",
        variant: "destructive"
      });
      return;
    }
    
    setReservations(prev => prev.map(res => 
      res.id === reservationId ? { 
        ...res, 
        status: 'cancelled' as const, 
        cancellationReason, 
        cancellationMessage 
      } : res
    ));
    
    toast({
      title: "Réservation annulée",
      description: "Votre réservation a été annulée avec succès.",
    });
    
    setCancellationReason('');
    setCancellationMessage('');
  };

  const handleDownloadContract = (reservation: Reservation) => {
    const contractData = {
      referenceId: reservation.referenceId,
      toolName: reservation.toolName,
      toolDescription: reservation.toolDescription,
      ownerName: reservation.owner,
      ownerEmail: reservation.ownerEmail,
      ownerPhone: reservation.ownerPhone,
      renterName: 'Jean Dupont', // Current user
      renterEmail: 'jean.dupont@email.com',
      renterPhone: '+33 6 12 34 56 78',
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      pickupTime: '14:00',
      totalPrice: reservation.price,
      dailyPrice: reservation.dailyPrice
    };
    
    generateRentalContract(contractData);
    
    toast({
      title: "Contrat téléchargé",
      description: "Le contrat de location a été généré et téléchargé avec succès.",
    });
  };

  const handleReport = (reservationId: string) => {
    if (!reportReason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison de signalement.",
        variant: "destructive"
      });
      return;
    }
    
    // Marquer la réservation comme ayant une réclamation active
    setReservations(prev => prev.map(res => 
      res.id === reservationId ? { ...res, hasActiveClaim: true } : res
    ));
    
    toast({
      title: "Signalement envoyé",
      description: "Votre signalement a été transmis à l'administration.",
    });
    
    setReportReason('');
    setReportMessage('');
  };

  const handleToolReturn = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setIsReturnDialogOpen(true);
  };

  const handleConfirmReturn = () => {
    setReservations(prev => prev.map(res => 
      res.id === selectedReservationId ? { 
        ...res, 
        renterHasReturned: true,
        hasUsedReturnButton: true 
      } : res
    ));
    
    toast({
      title: "Retour confirmé",
      description: "Vous avez confirmé avoir rendu l'outil. En attente de confirmation du propriétaire.",
    });
    
    setIsReturnDialogOpen(false);
    setSelectedReservationId('');
  };

  const handleOpenReturnClaim = () => {
    setIsReturnDialogOpen(false);
    setIsClaimDialogOpen(true);
  };

  const handleSubmitClaim = () => {
    if (!claimType || !claimDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    setReservations(prev => prev.map(res => 
      res.id === selectedReservationId ? { 
        ...res, 
        hasActiveClaim: true,
        hasUsedReturnButton: true 
      } : res
    ));
    
    toast({
      title: "Réclamation envoyée",
      description: "Votre réclamation a bien été transmise à notre support. Elle sera traitée sous 48h.",
    });
    
    setIsClaimDialogOpen(false);
    setClaimType('');
    setClaimDescription('');
    setSelectedReservationId('');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const toggleValidationCode = (reservationId: string) => {
    setShowValidationCode(prev => ({
      ...prev,
      [reservationId]: !prev[reservationId]
    }));
  };

  const copyValidationCode = async (code: string, reservationId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(prev => ({ ...prev, [reservationId]: true }));
      toast({
        title: "Code copié",
        description: "Le code de validation a été copié dans le presse-papiers.",
      });
      setTimeout(() => {
        setCopiedCode(prev => ({ ...prev, [reservationId]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le code.",
        variant: "destructive"
      });
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'En attente' },
    { value: 'accepted', label: 'Acceptée' },
    { value: 'ongoing', label: 'En cours' },
    { value: 'completed', label: 'Terminée' },
    { value: 'cancelled', label: 'Annulée' },
    { value: 'rejected', label: 'Refusée' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mes Réservations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtres */}
        <RequestsAndReservationsFilters 
          data={reservations}
          onFilteredDataChange={setFilteredReservations}
          searchPlaceholder="Rechercher par titre d'annonce..."
          statusOptions={statusOptions}
        />
        
        <div className="space-y-6">
          {(() => {
            const displayData = filteredReservations.length > 0 ? filteredReservations : reservations;
            const totalPages = Math.ceil(displayData.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedData = displayData.slice(startIndex, startIndex + itemsPerPage);

            return (
              <>
                {paginatedData.map((reservation) => (
                  <Card key={reservation.id} className="overflow-hidden">
                    {/* ... existing card content ... */}
                  </Card>
                ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Modal de confirmation de retour */}
        <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer le retour de l'outil</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Choisissez une option :</p>
              <div className="flex flex-col gap-2">
                <Button onClick={handleConfirmReturn} className="w-full">
                  Je confirme que j'ai rendu l'outil
                </Button>
                <Button variant="outline" onClick={handleOpenReturnClaim} className="w-full">
                  Signaler un problème
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de réclamation */}
        <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
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
              <Button onClick={handleSubmitClaim} className="w-full">
                Envoyer la réclamation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Reservations;
