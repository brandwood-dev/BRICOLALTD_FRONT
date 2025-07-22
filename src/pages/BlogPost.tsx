
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockBlogPosts } from '@/data/mockData';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const post = mockBlogPosts.find(p => p.id === id) || mockBlogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
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
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Partager
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    J'aime
                  </Button>
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
              <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockBlogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <Badge className="mb-2">{relatedPost.category}</Badge>
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
