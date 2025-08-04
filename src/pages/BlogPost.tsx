
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockBlogPosts } from '@/data/mockData';
import { Calendar, User, Clock, ArrowLeft, Share2, Copy, Check } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
  </svg>
);

const BlogPost = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const post = mockBlogPosts.find(p => p.id === id) || mockBlogPosts[0];

  const currentUrl = window.location.href;

  const shareOptions = [
    {
      id: 'copy',
      name: t('general.copy_link'),
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: FacebookIcon,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(post.title)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      id: 'x',
      name: 'X',
      icon: XIcon,
      action: () => {
        window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      action: () => {
        const whatsappText = `${post.title} - ${currentUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
      }
    }
  ];
  const categoryMap: Record<string, string> = {
    Jardinage: 'gardening',
    Entretien: 'maintenance',
    Sécurité: 'safety',
    Nouveautés: 'updates',
    Guides: 'guide',
    Transport: 'transport',
    Bricolage: 'diy',
    Electricité: 'electricity',
    Éclairage: 'lighting',
    Peinture: 'painting',
    Construction: 'construction',
    Plantes: 'plants',
    Nettoyage: 'cleaning',
    Décoration: 'decoration',
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              {t('blog.return')}
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <Badge className="mb-4">{t(`blog.category.${categoryMap[post.category]}`)}</Badge>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}{t('general.min')}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {t('blog.share')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader className={language === 'ar' ? 'justify-end' : ''}>
                        <DialogTitle className=''>{t('blog.share_article')}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        {shareOptions.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={option.action}
                          >
                            {option.id === 'copy' && copied ? (
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <option.icon className="h-4 w-4 mr-2" />
                            )}
                            {option.id === 'copy' && copied ? t('general.copy_link_message') : option.name}
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </header>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
              
              <div className="space-y-6 text-gray-700">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p>
                  Le choix d'une perceuse est crucial pour réussir ses projets de bricolage. 
                  Que vous soyez débutant ou bricoleur expérimenté, il existe une perceuse 
                  adaptée à vos besoins et à votre budget.
                </p>

                <h2 className="text-2xl font-semibold">Les différents types de perceuses</h2>
                <h3 className="text-xl font-medium">1. Perceuse filaire</h3>
                <p>
                  La perceuse filaire offre une puissance constante et convient parfaitement 
                  pour les gros travaux. Elle ne nécessite pas de recharge et peut être utilisée 
                  en continu.
                </p>

                <h3 className="text-xl font-medium">2. Perceuse sans fil</h3>
                <p>
                  Plus pratique et maniable, la perceuse sans fil est idéale pour les travaux 
                  en extérieur ou dans des endroits difficiles d'accès. L'autonomie de la 
                  batterie est un critère important à considérer.
                </p>

                <h2 className="text-2xl font-semibold">Critères de choix</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Puissance et couple de serrage</li>
                  <li>Type de mandrin (auto-serrant ou à clé)</li>
                  <li>Vitesse de rotation variable</li>
                  <li>Présence d'un mode percussion</li>
                  <li>Ergonomie et poids</li>
                  <li>Accessoires inclus</li>
                </ul>

                <h2 className="text-2xl font-semibold">Nos recommandations</h2>
                <p>
                  Pour débuter, nous recommandons une perceuse visseuse sans fil de 18V 
                  avec deux batteries. Cela vous permettra de réaliser la plupart des 
                  travaux domestiques sans contrainte.
                </p>

                <p>
                  N'hésitez pas à louer différents modèles sur Bricola LTD pour tester 
                  et trouver la perceuse qui correspond le mieux à vos besoins avant 
                  de faire un achat.
                </p>
              </div>
            </div>

            {/* Articles similaires */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">{t('blog.similar_articles')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockBlogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <Badge className="mb-2">{t(`blog.category.${categoryMap[relatedPost.category]}`)}</Badge>
                      <h3 className="font-semibold mb-2">
                        <Link to={`/blog/${relatedPost.id}`} className="hover:text-accent">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
