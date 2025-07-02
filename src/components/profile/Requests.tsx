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
import { MessageSquare, Calendar, User, Clock, Phone, Mail, Flag, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Requests = () => {
  const [validationCode, setValidationCode] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [refusalReason, setRefusalReason] = useState('');
  const [refusalMessage, setRefusalMessage] = useState('');
  const { toast } = useToast();

  const [requests, setRequests] = useState([
    {
      id: '1',
      toolName: 'Tondeuse à gazon électrique',
      owner: 'Marie Dubois',
      renterName: 'Jean Martin',
      renterEmail: 'jean.martin@email.com',
      renterPhone: '+33 6 12 34 56 78',
      renterAvatar: '',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      pickupTime: '14:00',
      status: 'pending',
      totalPrice: 60,
      message: 'Bonjour, j\'aimerais louer votre tondeuse pour le weekend.',
      isOwnerView: true
    },
    {
      id: '2',
      toolName: 'Perceuse sans fil Bosch',
      owner: 'Paul Martin',
      renterName: 'Sophie Durand',
      renterEmail: 'sophie.durand@email.com',
      renterPhone: '+33 6 98 76 54 32',
      renterAvatar: '',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      pickupTime: '10:00',
      status: 'accepted',
      totalPrice: 25,
      message: 'Disponible pour récupération après 14h.',
      isOwnerView: true
    },
    {
      id: '3',
      toolName: 'Scie circulaire',
      owner: 'Sophie Durand',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      pickupTime: '16:00',
      status: 'declined',
      totalPrice: 35,
      message: 'Désolé, l\'outil n\'est plus disponible pour ces dates.',
      refusalReason: 'Outil non disponible',
      isOwnerView: false
    },
    {
      id: '4',
      toolName: 'Échelle télescopique',
      owner: 'Marc Dubois',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      pickupTime: '09:00',
      status: 'cancelled',
      totalPrice: 40,
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
      default: return status;
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
      } : req
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
    if (validationCode === '1234') { // Code de validation fictif
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'confirmed' } : req
      ));
      toast({
        title: "Remise confirmée",
        description: "L'outil a été remis avec succès.",
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

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
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
                <div className="space-y-1">
                  <h3 className="font-semibold">{request.toolName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {request.isOwnerView ? request.renterName : request.owner}
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
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
      </CardContent>
    </Card>
  );
};

export default Requests;
