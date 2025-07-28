import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogService, DisplayBlogPost } from '@/services/blogService';
import { Calendar, User, Clock, Loader2 } from 'lucide-react';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<DisplayBlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<DisplayBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const itemsPerPage = 7; // 1 featured + 6 in grid

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await blogService.getBlogCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (err: unknown) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await blogService.getBlogPosts(currentPage, itemsPerPage, selectedCategory);
        
        if (response.success && response.data) {
          const transformedPosts = response.data.data.map(post => 
            blogService.transformToDisplayPost(post)
          );
          
          if (transformedPosts.length > 0) {
            // Set the first post as featured if we're on page 1
            if (currentPage === 1) {
              setFeaturedPost(transformedPosts[0]);
              setBlogPosts(transformedPosts.slice(1));
            } else {
              setFeaturedPost(null);
              setBlogPosts(transformedPosts);
            }
          }
          
          setTotalPages(response.data.lastPage);
        } else {
          setError(response.error || 'Failed to fetch blog posts');
        }
      } catch (err: unknown) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? undefined : category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Chargement des articles...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog ToolShare</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos conseils, guides et actualités sur l'univers des outils et du bricolage
            </p>
            {selectedCategory && (
              <div className="mt-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Catégorie: {selectedCategory}
                </Badge>
              </div>
            )}
          </div>

          {/* Article principal */}
          {featuredPost && (
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <img 
                    src={`${featuredPost.image}`}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <CardContent className="p-8">
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <h2 className="text-2xl font-bold mb-4">
                      <Link to={`/blog/${featuredPost.id}`} className="hover:text-accent">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Grille d'articles */}
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={`${post.image}`} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-semibold mb-3">
                      <Link to={`/blog/${post.id}`} className="hover:text-accent">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !featuredPost && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun article trouvé.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (blogPosts.length > 0 || featuredPost) && (
            <div className="flex justify-center mb-16">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Section catégories */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Catégories populaires</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge 
                variant={selectedCategory === undefined ? "default" : "outline"} 
                className="px-4 py-2 hover:bg-accent hover:text-white cursor-pointer"
                onClick={() => setSelectedCategory(undefined)}
              >
                Toutes
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="px-4 py-2 hover:bg-accent hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
