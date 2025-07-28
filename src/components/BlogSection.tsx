
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { blogService, DisplayBlogPost } from '@/services/blogService';
import { User, Clock, ArrowRight, Loader2 } from 'lucide-react';

const BlogSection = () => {
  const [latestPosts, setLatestPosts] = useState<DisplayBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await blogService.getBlogPosts(1, 3); // Get first 3 posts
        
        if (response.success && response.data) {
          // Transform API posts to display format
          const transformedPosts = response.data.data.map(post => 
            blogService.transformToDisplayPost(post)
          );
          setLatestPosts(transformedPosts);
        } else {
          setError(response.error || 'Erreur lors du chargement des articles');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des articles...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Réessayer
          </Button>
        </div>
      );
    }

    if (latestPosts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucun article disponible pour le moment.</p>
        </div>
      );
    }

    return (
      <>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mb-12"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {latestPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow card-hover h-full">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <CardContent className="p-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-semibold mb-3">
                      <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Lire l'article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" variant="outline">
              Voir tous les articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Derniers articles du blog
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos conseils, guides et actualités pour réussir tous vos projets de bricolage
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default BlogSection;
