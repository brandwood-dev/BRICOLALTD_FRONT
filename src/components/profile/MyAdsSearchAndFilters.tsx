
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Grid, List } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  validationFilter: string;
  onValidationFilterChange: (value: string) => void;
  publicationFilter: string;
  onPublicationFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const MyAdsSearchAndFilters = ({
  searchTerm,
  onSearchChange,
  validationFilter,
  onValidationFilterChange,
  publicationFilter,
  onPublicationFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  viewMode,
  onViewModeChange
}: SearchAndFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher par titre ou catégorie..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Filtres */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select value={validationFilter} onValueChange={onValidationFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Statut validation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={publicationFilter} onValueChange={onPublicationFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Statut publication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="published">Publié</SelectItem>
              <SelectItem value="unpublished">Non publié</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="Jardinage">Jardinage</SelectItem>
              <SelectItem value="Bricolage">Bricolage</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Nettoyage">Nettoyage</SelectItem>
              <SelectItem value="Événementiel">Événementiel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Mode d'affichage */}
        <div className="flex justify-center sm:justify-end gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="flex items-center gap-2"
          >
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Grille</span>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Liste</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyAdsSearchAndFilters;
