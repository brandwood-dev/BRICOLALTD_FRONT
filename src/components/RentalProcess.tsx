
import React from 'react';
import { PlusCircle, Eye, Calendar, DollarSign } from 'lucide-react';

const RentalProcess = () => {
  const steps = [
    {
      icon: PlusCircle,
      title: 'Publiez votre annonce en quelques clics',
      description: 'Ajoutez vos outils avec photos et description détaillée en quelques minutes seulement.'
    },
    {
      icon: Eye,
      title: 'Maximisez votre visibilité',
      description: 'Votre annonce est visible par des milliers d\'utilisateurs à la recherche d\'outils.'
    },
    {
      icon: Calendar,
      title: 'Recevez vos premières réservations',
      description: 'Les locataires vous contactent directement pour réserver vos outils aux dates souhaitées.'
    },
    {
      icon: DollarSign,
      title: 'Percevez vos revenus en toute sérénité',
      description: 'Recevez vos paiements de manière sécurisée et générez des revenus supplémentaires.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Louez vos outils en 4 étapes simples et commencez à générer des revenus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RentalProcess;
