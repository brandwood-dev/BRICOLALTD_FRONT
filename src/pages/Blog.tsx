
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockBlogPosts } from '@/data/mockData';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 1 featured + 5 in grid

  // Calculate pagination for the remaining posts (excluding the featured one)
  const remainingPosts = mockBlogPosts.slice(1);
  const totalPages = Math.ceil(remainingPosts.length / (itemsPerPage - 1));
  const startIndex = (currentPage - 1) * (itemsPerPage - 1);
  const endIndex = startIndex + (itemsPerPage - 1);
  const currentPosts = remainingPosts.slice(startIndex, endIndex);

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
          </div>

          {/* Article principal */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img 
                  src={mockBlogPosts[0].image} 
                  alt={mockBlogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <CardContent className="p-8">
                  <Badge className="mb-4">{mockBlogPosts[0].category}</Badge>
                  <h2 className="text-2xl font-bold mb-4">
                    <Link to={`/blog/${mockBlogPosts[0].id}`} className="hover:text-accent">
                      {mockBlogPosts[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6">{mockBlogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{mockBlogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(mockBlogPosts[0].date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mockBlogPosts[0].readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Grille d'articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
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

          {/* Pagination */}
          {totalPages > 1 && (
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
              {['Guides', 'Jardinage', 'Entretien', 'Sécurité', 'Nouveautés'].map((category) => (
                <Badge key={category} variant="outline" className="px-4 py-2 hover:bg-accent hover:text-white cursor-pointer">
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
