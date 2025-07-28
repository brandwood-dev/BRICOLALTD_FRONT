
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CustomerReviews = () => {
  const { t } = useLanguage();
  const reviews = [
    {
      id: 1,
      name: 'Marie L.',
      rating: 5,
      comment: 'Service exceptionnel ! J\'ai pu louer une perceuse en quelques clics. Le propriétaire était très sympathique et l\'outil en parfait état.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Thomas M.',
      rating: 5,
      comment: 'Parfait pour mes travaux de jardinage ! J\'ai économisé beaucoup d\'argent en louant plutôt qu\'en achetant. Je recommande vivement.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Sophie R.',
      rating: 5,
      comment: 'Une plateforme très bien pensée. J\'ai pu louer mes outils facilement et générer des revenus supplémentaires. Excellent concept !',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      name: 'Pierre K.',
      rating: 4,
      comment: 'Très satisfait de mon expérience. Le processus de location est simple et sécurisé. Parfait pour les bricoleurs occasionnels comme moi.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('customer_reviews.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('customer_reviews.description')}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default CustomerReviews;
