import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MessageSquare, Calendar, User, Clock, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RequestsAndReservationsFilters from './RequestsAndReservationsFilters';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Import refactored components and utilities
import { Request, StatusOption } from './requests/types';
import { mockRequests } from './requests/mockData';
import { getStatusColor, getStatusText, handleDownloadContract, statusOptions } from './requests/utils';
import RefusalDialog from './requests/RefusalDialog';
import ReportDialog from './requests/ReportDialog';
import ContactDialog from './requests/ContactDialog';
import ConfirmRecoveryDialog from './requests/ConfirmRecoveryDialog';
import ReviewDialog from './requests/ReviewDialog';
import ClaimDialog from './requests/ClaimDialog';
import CancellationDetailsDialog from './requests/CancellationDetailsDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const Requests = () => {
  const [validationCode, setValidationCode] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const { toast } = useToast();

  const [requests, setRequests] = useState<Request[]>(mockRequests);

  const {t} = useLanguage();

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
    toast({
      title: "Demande acceptée",
      description: "La demande de location a été acceptée avec succès.",
    });
  };

  const handleDeclineRequest = (requestId: string, reason: string, message: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { 
        ...req, 
        status: 'declined', 
        refusalReason: reason, 
        refusalMessage: message 
      } as Request : req
    ));
    
    toast({
      title: "Demande refusée",
      description: "Le refus a été transmis à l'administration.",
    });
  };

  const handleValidationCode = (requestId: string) => {
    if (validationCode === '1234') {
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'ongoing' } : req
      ));
      toast({
        title: "Remise confirmée",
        description: "L'outil a été remis avec succès. Le statut passe à 'En cours'.",
      });
      setValidationCode('');
    } else {
      toast({
        title: "Code invalide",
        description: "Le code de validation est incorrect.",
        variant: "destructive"
      });
    }
  };

  const handleToolRecovery = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmRecovery = () => {
    setIsConfirmDialogOpen(false);
    setIsReviewDialogOpen(true);
  };

  const handleOpenClaim = () => {
    setIsConfirmDialogOpen(false);
    setIsClaimDialogOpen(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    setRequests(prev => prev.map(req => 
      req.id === selectedRequestId ? { ...req, status: 'completed' } : req
    ));
    
    toast({
      title: "Évaluation soumise",
      description: "Merci pour votre évaluation. Le statut passe à 'Terminé'.",
    });
    
    setIsReviewDialogOpen(false);
    setSelectedRequestId('');
  };

  const handleSubmitClaim = (claimType: string, claimDescription: string) => {
    // Mark the request as having an active claim
    setRequests(prev => prev.map(req => 
      req.id === selectedRequestId ? { ...req, hasActiveClaim: true } : req
    ));
    
    toast({
      title: "Réclamation envoyée",
      description: "Votre réclamation a bien été transmise à notre support. Elle sera traitée sous 48h.",
    });
    
    setIsClaimDialogOpen(false);
    setSelectedRequestId('');
  };

  const handleReportSubmit = (requestId: string) => {
    // Mark the request as having an active claim when reported
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, hasActiveClaim: true } : req
    ));
  };

  const simulateRenterReturn = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, renterHasReturned: true } : req
    ));
    toast({
      title: "Simulation",
      description: "Le locataire a confirmé avoir rendu l'outil.",
    });
  };


  // Données à paginer
  const dataToDisplay = filteredRequests.length > 0 ? filteredRequests : requests;
  
  // Calcul de la pagination
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = dataToDisplay.slice(startIndex, endIndex);

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset de la page quand les filtres changent
  const handleFilteredDataChange = (data: Request[]) => {
    setFilteredRequests(data);
    setCurrentPage(1); // Retour à la première page lors d'un changement de filtre
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {t('request.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtres */}
        <RequestsAndReservationsFilters 
          data={requests}
          onFilteredDataChange={handleFilteredDataChange}
          searchPlaceholder={t('request.search')}
          statusOptions={statusOptions}
        />
        
        <div className="space-y-4">
          {paginatedRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {/* Tool image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={request.toolImage} 
                      alt={request.toolName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{request.toolName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {request.isOwnerView ? request.renterName : request.owner}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t('request.reference')}: {request.referenceId}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                  {(request.status === 'ongoing' || request.status === 'accepted') && request.hasActiveClaim && (
                    <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                      Réclamation en cours
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {t('request.from')} {request.startDate} {t('request.to')} {request.endDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t('request.pickup_time')} : {request.pickupTime}
                </div>
                <div className="font-semibold text-primary">
                  {request.totalPrice}€
                </div>
              </div>

              {request.message && (
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <p>{request.message}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {/* Contract download for accepted and ongoing requests */}
                {request.isOwnerView && ['accepted', 'ongoing'].includes(request.status) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadContract(request, toast)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {t('request.download_contract')}
                  </Button>
                )}

                {/* Actions pour les propriétaires */}
                {request.isOwnerView && request.status === 'pending' && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default" size="sm">
                          {t('request.accept')}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer l'acceptation</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir accepter cette demande de location ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleAcceptRequest(request.id)}>
                            {t('action.confirm')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <RefusalDialog 
                      onDecline={handleDeclineRequest}
                      requestId={request.id}
                    />
                  </>
                )}

                {/* Contact pour les demandes acceptées */}
                {request.isOwnerView && request.status === 'accepted' && (
                  <>
                    <ContactDialog request={request as any} />
                    <ReportDialog requestId={request.id} onReportSubmit={handleReportSubmit} />
                  </>
                )}

                {/* Actions pour les demandes en cours */}
                {request.isOwnerView && request.status === 'ongoing' && (
                  <>
                    <ContactDialog request={request as any} />
                    <ReportDialog requestId={request.id} onReportSubmit={handleReportSubmit} />

                    <Button 
                      variant={request.renterHasReturned ? "default" : "outline"}
                      size="sm"
                      disabled={!request.renterHasReturned}
                      onClick={() => handleToolRecovery(request.id)}
                    >
                      J'ai récupéré mon outil
                    </Button>

                    {!request.renterHasReturned && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => simulateRenterReturn(request.id)}
                      >
                        [Simuler] Locataire a rendu
                      </Button>
                    )}
                  </>
                )}

                {/* Code de validation pour les demandes acceptées */}
                {request.isOwnerView && request.status === 'accepted' && (
                  <div className="w-full mt-3 p-3 bg-blue-50 rounded border">
                    <p className="text-sm font-medium mb-2">{t('request.validation_code')}:</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder={t('request.enter_code')}
                        value={validationCode}
                        onChange={(e) => setValidationCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleValidationCode(request.id)}>
                        {t('action.confirm')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Bouton pour voir les détails d'annulation */}
                {request.status === 'cancelled' && (
                  <CancellationDetailsDialog request={request} />
                )}

                {/* Contact général pour les autres statuts */}
                {!request.isOwnerView && !['cancelled', 'declined'].includes(request.status) && (
                  <Button variant="outline" size="sm">
                    Contacter
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        isActive={isCurrentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Refactored Dialogs */}
        <ConfirmRecoveryDialog
          isOpen={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
          onConfirm={handleConfirmRecovery}
          onClaim={handleOpenClaim}
        />

        <ReviewDialog
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          onSubmit={handleSubmitReview}
        />

        <ClaimDialog
          isOpen={isClaimDialogOpen}
          onOpenChange={setIsClaimDialogOpen}
          onSubmit={handleSubmitClaim}
        />
      </CardContent>
    </Card>
  );
};

export default Requests;
