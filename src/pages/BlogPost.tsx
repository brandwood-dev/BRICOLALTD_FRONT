
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogService, BlogPost as BlogPostType, DisplayBlogPost } from '@/services/blogService';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, Loader2 } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<DisplayBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post?.title || 'Article de blog';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could show a toast notification here
        alert('Lien copié dans le presse-papiers!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  const handleLike = () => {
    // Implement like functionality here
    // You might want to call an API endpoint to save the like
    console.log('Like button clicked');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('ID d\'article manquant');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        // Fetch the blog post
        const postResponse = await blogService.getBlogPostById(id);
        console.log('Fetched blog post:', postResponse);
        
        if (postResponse.success && postResponse.data) {
          setPost(postResponse.data);

          // Update document title for SEO
          document.title = `${postResponse.data.title} - BricolAltd`;

          // Fetch related posts (same category)
          const relatedResponse = await blogService.getBlogPosts(1, 10, postResponse.data.category);
          if (relatedResponse.success && relatedResponse.data) {
            // Transform and filter out current post
            const transformedPosts = relatedResponse.data.data
              .filter(p => p._id !== id)
              .slice(0, 2)
              .map(p => blogService.transformToDisplayPost(p));
            setRelatedPosts(transformedPosts);
          }
        } else {
          setError(postResponse.error || 'Article non trouvé');
        }
      } catch (err: unknown) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Cleanup: Reset document title when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'BricolAltd';
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Chargement de l'article...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
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
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur</h2>
              <p className="text-gray-600">{error || 'Article non trouvé'}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper function to render blog sections
  const renderSection = (section: BlogPostType['sections'][0], index: number) => {
    switch (section.type) {
      case 'title':
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>;
      case 'paragraph':
        // Handle lists within paragraphs
        if (section.content.includes('•') || section.content.includes('-')) {
          const lines = section.content.split('\n').filter(line => line.trim());
          const listItems = lines.filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
          
          if (listItems.length > 0) {
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                {listItems.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}-${item.slice(0, 10)}`}>{item.replace(/^[•-]\s*/, '').trim()}</li>
                ))}
              </ul>
            );
          }
        }
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{section.content}</p>;
      case 'image':
        
        return (
          <figure key={index} className="my-8">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={`${section.content}`}
                alt={section.metadata?.alt || `Illustration ${index + 1}`}
                className="w-full max-w-4xl mx-auto object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg'
                  e.currentTarget.alt = 'Contenu non disponible'
                }}
                loading="lazy"
              />
            </div>
            {section.metadata?.caption && (
              <figcaption className="mt-3 text-center text-sm text-gray-600 italic">
                {section.metadata.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'video':
        return (
          <div key={index} className="my-6">
            <video controls className="w-full rounded-lg">
              <source src={section.content} type="video/mp4" />
              <track kind="captions" srcLang="fr" label="French" default />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        );
      default:
        return null;
    }
  };

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
                    <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Partager
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLike}>
                    <Heart className="h-4 w-4 mr-1" />
                    J'aime
                  </Button>
                </div>
              </div>

              {!imageError ? (
                <img 
                  src={`${post.coverImageUrl}`}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none mb-12">
              {/* Extract excerpt from first paragraph */}
              {/* {post.sections.find(section => section.type === 'paragraph') && (
                <p className="text-lg text-gray-700 mb-6">
                  {(() => {
                    const firstParagraph = post.sections.find(section => section.type === 'paragraph');
                    if (!firstParagraph) return '';
                    return firstParagraph.content.length > 200 
                      ? firstParagraph.content.substring(0, 200) + '...' 
                      : firstParagraph.content;
                  })()}
                </p>
              )} */}
              
              <div className="space-y-6 text-gray-700">
                {post.sections.map((section, index) => renderSection(section, index))}
              </div>
            </div>

            {/* Articles similaires */}
            {relatedPosts.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
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
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
