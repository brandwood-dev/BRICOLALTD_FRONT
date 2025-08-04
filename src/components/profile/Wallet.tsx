
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Wallet as WalletIcon, 
  TrendingUp, 
  Banknote,
  CheckCircle,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO } from 'date-fns';
import TransactionFilters from './TransactionFilters';
import TransactionCard from './TransactionCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useLanguage } from '@/contexts/LanguageContext';

const Wallet = () => {
  const { t, language } = useLanguage(); // Access the translation function
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [transactionType, setTransactionType] = useState('all');
  const itemsPerPage = 5;
  
  const allTransactions = [
    {
      id: '1',
      type: 'receipt' as const,
      amount: 45,
      toolName: 'Tondeuse à gazon électrique', // Consider translating tool names if needed
      userName: 'Jean Martin',
      reference: 'REF-2024-001',
      date: '2024-01-15',
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'withdrawal' as const,
      amount: 25,
      withdrawalId: 'WDR-2024-003',
      date: '2024-01-12',
      status: 'completed' as const
    },
    {
      id: '3',
      type: 'receipt' as const,
      amount: 35,
      toolName: 'Scie circulaire',
      userName: 'Paul Durand',
      reference: 'REF-2024-002',
      date: '2024-01-10',
      status: 'pending' as const
    },
    {
      id: '4',
      type: 'receipt' as const,
      amount: 60,
      toolName: 'Compresseur',
      userName: 'Sophie Leroy',
      reference: 'REF-2024-003',
      date: '2024-01-08',
      status: 'completed' as const
    },
    {
      id: '5',
      type: 'withdrawal' as const,
      amount: 50,
      withdrawalId: 'WDR-2024-002',
      date: '2024-01-05',
      status: 'pending' as const
    },
    {
      id: '6',
      type: 'withdrawal' as const,
      amount: 30,
      withdrawalId: 'WDR-2024-001',
      date: '2024-01-02',
      status: 'failed' as const
    }
  ];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Filter by type
    if (transactionType !== 'all') {
      if (transactionType === 'receipts') {
        filtered = filtered.filter(t => t.type === 'receipt');
      } else if (transactionType === 'withdrawals') {
        filtered = filtered.filter(t => t.type === 'withdrawal');
      }
    }

    // Filter by date range
    if (dateRange?.from) {
      filtered = filtered.filter(transaction => {
        const transactionDate = parseISO(transaction.date);
        if (dateRange.to) {
          return isWithinInterval(transactionDate, { start: dateRange.from!, end: dateRange.to });
        } else {
          return transactionDate >= dateRange.from!;
        }
      });
    }

    return filtered;
  }, [transactionType, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Calculate KPIs
  const availableBalance = 180;
  const successfulReceiptTransactions = allTransactions
    .filter(t => t.status === 'completed' && t.type === 'receipt');
  const successfulTransactionsAmount = successfulReceiptTransactions
    .reduce((sum, t) => sum + t.amount, 0);
  const cumulativeBalance = availableBalance + successfulTransactionsAmount;
  const successfulTransactionsCount = allTransactions.filter(t => t.status === 'completed').length;
  
  // Currency conversion (example rates)
  const gbpToEur = 1.159; // Example conversion rate
  const minWithdrawalGBP = 20;
  const minWithdrawalEUR = Math.round(minWithdrawalGBP * gbpToEur * 100) / 100;

  const canWithdraw = cumulativeBalance >= minWithdrawalEUR;

  const handleResetFilters = () => {
    setDateRange(undefined);
    setTransactionType('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <WalletIcon className="h-6 w-6 text-primary" />
            </div>
            {t('wallet.title')}
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
                  {t('wallet.total')}
                </Badge>
              </div>
              <div className="text-sm text-blue-700 font-medium mb-1">{t('wallet.cumulative_balance')}</div>
              <div className="text-3xl font-bold text-blue-900">{cumulativeBalance}€</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Banknote className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-200 text-green-800">
                  {t('wallet.available')}
                </Badge>
              </div>
              <div className="text-sm text-green-700 font-medium mb-1">{t('wallet.available_balance')}</div>
              <div className="text-3xl font-bold text-green-900">{availableBalance}€</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                  {t('wallet.successful')}
                </Badge>
              </div>
              <div className="text-sm text-purple-700 font-medium mb-1">{t('wallet.successful_transactions')}</div>
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
                  {t('wallet.withdraw_money')}
                </Button>
              </DialogTrigger>
              <DialogContent className={language === 'ar' ? '[direction:ltr]' : ''}>
                <DialogHeader>
                  <DialogTitle>{t('wallet.withdraw_money')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>{t('message.loading')}</p> {/* Adjust if a specific translation is needed */}
                  <p className="text-sm text-muted-foreground">
                    {t('message.loading')} {/* Placeholder; replace with actual translation if available */}
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
                  {t('wallet.withdrawal_note')}
                </p>
                <p className="text-xs text-amber-700 text-right">
                  {t('wallet.conversion_rate').replace('{minWithdrawalEUR}', minWithdrawalEUR.toString())}
                </p>
                <p className="text-xs text-amber-600">
                  {t('wallet.dynamic_conversion')}
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
            <h3 className="text-xl font-semibold text-gray-900">{t('wallet.recent_transactions')}</h3>
          </div>
          
          {/* Filters */}
          <TransactionFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            transactionType={transactionType}
            onTransactionTypeChange={setTransactionType}
            onReset={handleResetFilters}
          />
          
          {/* Transaction Cards */}
          <div className="space-y-4 mb-6">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('message.no_results')} {/* Assuming this fits the context */}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className={language === 'ar' ? "[direction:ltr]" : ''}>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
