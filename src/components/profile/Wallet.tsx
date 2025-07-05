
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp, 
  Banknote,
  CheckCircle,
  Info
} from 'lucide-react';

const Wallet = () => {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  
  const transactions = [
    {
      id: '1',
      type: 'credit',
      amount: 45,
      description: 'Location tondeuse - Jean Martin',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 25,
      description: 'Location perceuse - Marie Dubois',
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 35,
      description: 'Location scie circulaire - Paul Durand',
      date: '2024-01-10',
      status: 'pending'
    },
    {
      id: '4',
      type: 'credit',
      amount: 60,
      description: 'Location compresseur - Sophie Leroy',
      date: '2024-01-08',
      status: 'completed'
    }
  ];

  // Calculate KPIs
  const availableBalance = 180;
  const successfulTransactionsAmount = transactions
    .filter(t => t.status === 'completed' && t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  const cumulativeBalance = availableBalance + successfulTransactionsAmount;
  const successfulTransactionsCount = transactions.filter(t => t.status === 'completed').length;
  
  // Currency conversion (example rates)
  const gbpToEur = 1.159; // Example conversion rate
  const minWithdrawalGBP = 20;
  const minWithdrawalEUR = Math.round(minWithdrawalGBP * gbpToEur * 100) / 100;

  const canWithdraw = cumulativeBalance >= minWithdrawalEUR;

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <WalletIcon className="h-6 w-6 text-primary" />
            </div>
            Mon Portefeuille
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                  Total
                </Badge>
              </div>
              <div className="text-sm text-blue-700 font-medium mb-1">Solde cumulé</div>
              <div className="text-3xl font-bold text-blue-900">{cumulativeBalance}€</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Banknote className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-200 text-green-800">
                  Disponible
                </Badge>
              </div>
              <div className="text-sm text-green-700 font-medium mb-1">Solde disponible</div>
              <div className="text-3xl font-bold text-green-900">{availableBalance}€</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                  Réussies
                </Badge>
              </div>
              <div className="text-sm text-purple-700 font-medium mb-1">Transactions réussies</div>
              <div className="text-3xl font-bold text-purple-900">{successfulTransactionsCount}</div>
            </div>
          </div>

          {/* Withdrawal Button */}
          <div className="flex justify-center">
            <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className={`px-8 py-3 text-lg font-semibold ${
                    canWithdraw 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!canWithdraw}
                >
                  <Banknote className="h-5 w-5 mr-2" />
                  Retirer mon argent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Retrait d'argent</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Fonctionnalité de retrait en cours de développement.</p>
                  <p className="text-sm text-muted-foreground">
                    Vous pourrez bientôt retirer vos gains directement depuis cette interface.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Information Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-amber-800 font-medium">
                  Vous pouvez retirer votre argent à partir du moment où votre solde cumulé atteint 20 GBP.
                </p>
                <p className="text-xs text-amber-700">
                  20 GBP = {minWithdrawalEUR} EUR
                </p>
                <p className="text-xs text-amber-600">
                  Le taux de conversion s'actualise dynamiquement en fonction de la devise choisie dans le compte.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Transactions récentes</h3>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
              <CreditCard className="h-4 w-4 mr-2" />
              Voir tout
            </Button>
          </div>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="group hover:bg-gray-50 transition-colors rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full transition-colors ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600 group-hover:bg-green-200' 
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                    }`}>
                      {transaction.type === 'credit' ? 
                        <ArrowDownLeft className="h-5 w-5" /> : 
                        <ArrowUpRight className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{transaction.description}</div>
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg mb-1 ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}€
                    </div>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className={transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-orange-100 text-orange-800 border-orange-300'
                      }
                    >
                      {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
