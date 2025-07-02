import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Calendar, User, Clock, Phone, Mail, Flag, Eye, Star, Upload, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateRentalContract } from '@/utils/contractGenerator';

interface RequestBase {
  id: string;
  referenceId: string;
  toolName: string;
  toolDescription: string;
  toolImage: string;
  owner: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  status: string;
  totalPrice: number;
  dailyPrice: number;
  message: string;
  isOwnerView: boolean;
  refusalReason?: string;
  refusalMessage?: string;
  cancellationReason?: string;
  cancellationMessage?: string;
  renterHasReturned?: boolean;
  hasActiveClaim?: boolean;
}

interface OwnerRequest extends RequestBase {
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  renterAvatar: string;
  ownerEmail: string;
  ownerPhone: string;
  isOwnerView: true;
}

interface RenterRequest extends RequestBase {
  renterName?: undefined;
  renterEmail?: undefined;
  renterPhone?: undefined;
  renterAvatar?: undefined;
  ownerEmail?: undefined;
  ownerPhone?: undefined;
  isOwnerView: false;
}

type Request = OwnerRequest | RenterRequest;

const Requests = () => {
  const [validationCode, setValidationCode] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [refusalReason, setRefusalReason] = useState('');
  const [refusalMessage, setRefusalMessage] = useState('');
  const [claimType, setClaimType] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const { toast } = useToast();

  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      referenceId: 'REF-2024-001',
      toolName: 'Tondeuse à gazon électrique',
      toolDescription: 'Tondeuse électrique 1800W avec bac de ramassage 40L',
      toolImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      owner: 'Marie Dubois',
      renterName: 'Jean Martin',
      renterEmail: 'jean.martin@email.com',
      renterPhone: '+33 6 12 34 56 78',
      renterAvatar: '',
      ownerEmail: 'marie.dubois@email.com',
      ownerPhone: '+33 6 87 65 43 21',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      pickupTime: '14:00',
      status: 'pending',
      totalPrice: 60,
      dailyPrice: 20,
      message: 'Bonjour, j\'aimerais louer votre tondeuse pour le weekend.',
      isOwnerView: true
    },
    {
      id: '2',
      referenceId: 'REF-2024-002',
      toolName: 'Perceuse sans fil Bosch',
      toolDescription: 'Perceuse visseuse sans fil 18V avec 2 batteries',
      toolImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
      owner: 'Paul Martin',
      renterName: 'Sophie Durand',
      renterEmail: 'sophie.durand@email.com',
      renterPhone: '+33 6 98 76 54 32',
      renterAvatar: '',
      ownerEmail: 'paul.martin@email.com',
      ownerPhone: '+33 6 11 22 33 44',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      pickupTime: '10:00',
      status: 'accepted',
      totalPrice: 25,
      dailyPrice: 12.5,
      message: 'Disponible pour récupération après 14h.',
      isOwnerView: true
    },
    {
      id: '3',
      referenceId: 'REF-2024-003',
      toolName: 'Scie circulaire',
      toolDescription: 'Scie circulaire 1400W avec lame carbure',
      toolImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      owner: 'Sophie Durand',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      pickupTime: '16:00',
      status: 'declined',
      totalPrice: 35,
      dailyPrice: 17.5,
      message: 'Désolé, l\'outil n\'est plus disponible pour ces dates.',
      refusalReason: 'Outil non disponible',
      isOwnerView: false
    },
    {
      id: '4',
      referenceId: 'REF-2024-004',
      toolName: 'Échelle télescopique',
      toolDescription: 'Échelle télescopique 3.8m, charge max 150kg',
      toolImage: 'https://images.unsplash.com/photo-1631047038830-c6c8e1af70b9?w=400&h=300&fit=crop',
      owner: 'Marc Dubois',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      pickupTime: '09:00',
      status: 'cancelled',
      totalPrice: 40,
      dailyPrice: 20,
      message: 'Demande annulée par le locataire.',
      cancellationReason: 'Changement de plans',
      cancellationMessage: 'Je ne peux plus utiliser l\'outil à ces dates.',
      isOwnerView: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'declined': return 'Refusée';
      case 'cancelled': return 'Annulée';
      case 'confirmed': return 'Confirmée';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const handleDownloadContract = (request: Request) => {
    if (request.isOwnerView && request.renterName) {
      const contractData = {
        referenceId: request.referenceId,
        toolName: request.toolName,
        toolDescription: request.toolDescription,
        ownerName: request.owner,
        ownerEmail: request.ownerEmail!,
        ownerPhone: request.ownerPhone!,
        renterName: request.renterName,
        renterEmail: request.renterEmail!,
        renterPhone: request.renterPhone!,
        startDate: request.startDate,
        endDate: request.endDate,
        pickupTime: request.pickupTime,
        totalPrice: request.totalPrice,
        dailyPrice: request.dailyPrice
      };
      
      generateRentalContract(contractData);
      
      toast({
        title: "Contrat téléchargé",
        description: "Le contrat de location a été généré et téléchargé avec succès.",
      });
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
    toast({
      title: "Demande acceptée",
      description: "La demande de location a été acceptée avec succès.",
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    if (!refusalReason) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une raison de refus.",
        variant: "destructive"
      });
      return;
    }
    
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { 
        ...req, 
        status: 'declined', 
        refusalReason, 
        refusalMessage 
      } as Request : req
    ));
    
    toast({
      title: "Demande refusée",
      description: "Le refus a été transmis à l'administration.",
    });
    
    setRefusalReason('');
    setRefusalMessage('');
  };

  const handleReport = (requestId: string) => {
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

  const handleSubmitReview = () => {
    setRequests(prev => prev.map(req => 
      req.id === selectedRequestId ? { ...req, status: 'completed' } : req
    ));
    
    toast({
      title: "Évaluation soumise",
      description: "Merci pour votre évaluation. Le statut passe à 'Terminé'.",
    });
    
    setIsReviewDialogOpen(false);
    setRating(0);
    setReviewComment('');
    setSelectedRequestId('');
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
    
    // Mark the request as having an active claim
    setRequests(prev => prev.map(req => 
      req.id === selectedRequestId ? { ...req, hasActiveClaim: true } : req
    ));
    
    toast({
      title: "Réclamation envoyée",
      description: "Votre réclamation a bien été transmise à notre support. Elle sera traitée sous 48h.",
    });
    
    setIsClaimDialogOpen(false);
    setClaimType('');
    setClaimDescription('');
    setSelectedRequestId('');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Mes Demandes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
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
                      Référence: {request.referenceId}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                  {request.status === 'ongoing' && request.hasActiveClaim && (
                    <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                      Réclamation en cours
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Du {request.startDate} au {request.endDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Récupération : {request.pickupTime}
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
                    onClick={() => handleDownloadContract(request)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger le contrat
                  </Button>
                )}

                {/* Actions pour les propriétaires */}
                {request.isOwnerView && request.status === 'pending' && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default" size="sm">
                          Accepter
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
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleAcceptRequest(request.id)}>
                            Confirmer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Refuser
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
                              onClick={() => handleDeclineRequest(request.id)}
                              className="flex-1"
                            >
                              Confirmer le refus
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}

                {/* Contact pour les demandes acceptées */}
                {request.isOwnerView && request.status === 'accepted' && (
                  <>
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
                              onClick={() => handleCall(request.renterPhone!)}
                              className="flex-1 flex items-center gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              Appeler
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleEmail(request.renterEmail!)}
                              className="flex-1 flex items-center gap-2"
                            >
                              <Mail className="h-4 w-4" />
                              E-mail
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

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
                          <Button onClick={() => handleReport(request.id)} className="w-full">
                            Envoyer le signalement
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}

                {/* Actions pour les demandes en cours */}
                {request.isOwnerView && request.status === 'ongoing' && (
                  <>
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
                          
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleCall(request.renterPhone!)}
                              className="flex-1 flex items-center gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              Appeler
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleEmail(request.renterEmail!)}
                              className="flex-1 flex items-center gap-2"
                            >
                              <Mail className="h-4 w-4" />
                              E-mail
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

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
                          <Button onClick={() => handleReport(request.id)} className="w-full">
                            Envoyer le signalement
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

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
                    <p className="text-sm font-medium mb-2">Code de validation de remise :</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Entrez le code"
                        value={validationCode}
                        onChange={(e) => setValidationCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleValidationCode(request.id)}>
                        Confirmer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Bouton pour voir les détails d'annulation */}
                {request.status === 'cancelled' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir détails de l'annulation
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Détails de l'annulation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div>
                          <strong>Raison :</strong> {request.cancellationReason}
                        </div>
                        {request.cancellationMessage && (
                          <div>
                            <strong>Message :</strong> {request.cancellationMessage}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
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

        {/* Modal de confirmation de récupération */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
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
                <Button onClick={handleConfirmRecovery} className="flex-1">
                  Oui, je confirme la bonne réception
                </Button>
                <Button variant="outline" onClick={handleOpenClaim} className="flex-1">
                  Signaler un problème
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal d'évaluation */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
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
              <Button onClick={handleSubmitReview} className="w-full">
                Soumettre l'évaluation
              </Button>
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

export default Requests;
