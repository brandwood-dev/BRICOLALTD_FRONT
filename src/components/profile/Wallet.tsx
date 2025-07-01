
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';

const Wallet = () => {
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
    }
  ];

  const totalBalance = 180;
  const pendingAmount = 35;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5" />
          Mon Portefeuille
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Solde disponible</div>
            <div className="text-2xl font-bold text-primary">{totalBalance}€</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">En attente</div>
            <div className="text-2xl font-bold text-orange-600">{pendingAmount}€</div>
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Retirer
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transactions récentes</h3>
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Voir tout
            </Button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDownLeft className="h-4 w-4" /> : 
                      <ArrowUpRight className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}€
                  </div>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                    {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wallet;
