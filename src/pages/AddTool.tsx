
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Upload, Camera, Euro, Shield, MapPin, Tag, FileText, Settings, Calendar, Loader2, AlertCircle, Star } from 'lucide-react';
import { useTools } from '@/hooks/useTools';
import { GOOGLE_MAPS_API_KEY } from '@/config/maps';

interface ValidationErrors {
  title?: string;
  category?: string;
  subcategory?: string;
  condition?: string;
  dailyRate?: string;
  location?: string;
  photos?: string;
  description?: string;
  brand?: string;
  model?: string;
  year?: string;
  deposit?: string;
}

const AddTool = () => {
  const { t } = useLanguage();
  const { createTool, getCategories, getSubcategories, categories, subcategories, isLoading } = useTools();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [addressInput, setAddressInput] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null);
  const addressTimeout = useRef<NodeJS.Timeout | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    condition: '',
    dailyRate: 0,
    weeklyRate: 0,
    monthlyRate: 0,
    deposit: 0,
    location: '',
    latitude: 0,
    longitude: 0,
    availabilityStatus: 'DISPONIBLE',
    brand: '',
    model: '',
    year: 0,
    ownerInstructions: '',
    photos: [] as File[]
  });

  // Load categories on component mount
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Load subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      getSubcategories(selectedCategory);
      setFormData(prev => ({ ...prev, category: selectedCategory, subcategory: '' }));
    }
  }, [selectedCategory, getSubcategories]);

  // Address autocomplete handler (Nominatim)
  useEffect(() => {
    if (!addressInput) {
      setAddressSuggestions([]);
      return;
    }
    if (addressTimeout.current) clearTimeout(addressTimeout.current);
    addressTimeout.current = setTimeout(async () => {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressInput)}&addressdetails=1&limit=5`);
      const data = await res.json();
      setAddressSuggestions(data);
    }, 300);
    // eslint-disable-next-line
  }, [addressInput]);

  // When a suggestion is selected, update formData
  const handleAddressSelect = (suggestion: any) => {
    setAddressInput(suggestion.display_name);
    setSelectedCoords({ lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) });
    setAddressSuggestions([]);
    setFormData(prev => ({
      ...prev,
      location: suggestion.display_name,
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon)
    }));
    setValidationErrors(prev => ({ ...prev, location: undefined }));
  };

  // Validation functions
  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'title':
        if (!value || value.trim().length === 0) {
          return 'Le titre est obligatoire';
        }
        if (value.trim().length < 3) {
          return 'Le titre doit contenir au moins 3 caractères';
        }
        if (value.trim().length > 100) {
          return 'Le titre ne peut pas dépasser 100 caractères';
        }
        break;
      
      case 'description':
        if (value && value.trim().length > 1000) {
          return 'La description ne peut pas dépasser 1000 caractères';
        }
        break;
      
      case 'category':
        if (!value) {
          return 'La catégorie est obligatoire';
        }
        break;
      
      case 'subcategory':
        if (formData.category && !value) {
          return 'La sous-catégorie est obligatoire';
        }
        break;
      
      case 'condition':
        if (!value) {
          return 'L\'état est obligatoire';
        }
        break;
      
      case 'dailyRate':
        if (!value || value <= 0) {
          return 'Le prix journalier doit être supérieur à 0';
        }
        if (value > 1000) {
          return 'Le prix journalier ne peut pas dépasser 1000€';
        }
        break;
      
      case 'deposit':
        if (value && value < 0) {
          return 'La caution ne peut pas être négative';
        }
        if (value && value > 10000) {
          return 'La caution ne peut pas dépasser 10000€';
        }
        break;
      
      case 'location':
        if (!value || value.trim().length === 0) {
          return 'L\'adresse est obligatoire';
        }
        break;
      
      case 'brand':
        if (value && value.trim().length > 50) {
          return 'La marque ne peut pas dépasser 50 caractères';
        }
        break;
      
      case 'model':
        if (value && value.trim().length > 50) {
          return 'Le modèle ne peut pas dépasser 50 caractères';
        }
        break;
      
      case 'year':
        if (value && (value < 1900 || value > 2025)) {
          return 'L\'année doit être entre 1900 et 2025';
        }
        break;
      
      case 'photos':
        if (value && value.length > 10) {
          return 'Vous ne pouvez pas télécharger plus de 10 photos';
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    // Validate required fields
    const requiredFields = ['title', 'category', 'subcategory', 'condition', 'dailyRate', 'location'];
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field as keyof ValidationErrors] = error;
      }
    });

    // Validate subcategory if category is selected
    if (formData.category && !formData.subcategory) {
      errors.subcategory = 'La sous-catégorie est obligatoire';
    }

    // Validate optional fields
    const optionalFields = ['description', 'brand', 'model', 'year', 'deposit', 'photos'];
    optionalFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field as keyof ValidationErrors] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );
    
    if (imageFiles.length !== files.length) {
      setValidationErrors(prev => ({ 
        ...prev, 
        photos: 'Seuls les fichiers image (JPG, PNG, WebP) sont acceptés' 
      }));
      return;
    }

    // Check file size (max 5MB per file)
    const oversizedFiles = imageFiles.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setValidationErrors(prev => ({ 
        ...prev, 
        photos: 'Chaque fichier ne peut pas dépasser 5MB' 
      }));
      return;
    }

    // Check total number of files
    const totalFiles = selectedFiles.length + imageFiles.length;
    if (totalFiles > 10) {
      setValidationErrors(prev => ({ 
        ...prev, 
        photos: 'Vous ne pouvez pas télécharger plus de 10 photos' 
      }));
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...imageFiles] }));
    setValidationErrors(prev => ({ ...prev, photos: undefined }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelection(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createTool(formData);
    } catch (error) {
      console.error('Error creating tool:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback categories if API is not available
  const fallbackCategories = {
    'JARDINAGE': 'Jardinage',
    'BRICOLAGE': 'Bricolage', 
    'TRANSPORT': 'Transport',
    'NETTOYAGE': 'Nettoyage',
    'EVENEMENTIEL': 'Événementiel'
  };

  // Mapping from display names to subcategory IDs (based on seed data)
  const subcategoryIdMapping = {
    'JARDINAGE': {
      'Gazon': 'gazon',
      'Terre': 'terre',
      'Bois': 'bois',
      'Arbre': 'arbre',
      'Feuilles': 'feuilles'
    },
    'BRICOLAGE': {
      'Construction': 'construction',
      'Électricité': 'electricite',
      'Peinture': 'peinture',
      'Vis et Boulons': 'vis-et-boulons'
    },
    'TRANSPORT': {
      'Charge lourde': 'charge-lourde',
      'Moteur': 'moteur',
      'Roue': 'roue'
    },
    'NETTOYAGE': {
      'Tissus': 'tissus',
      'Eau': 'eau',
      'Poussière': 'poussiere'
    },
    'EVENEMENTIEL': {
      'Son': 'son',
      'Éclairage': 'eclairage',
      'Cuisine': 'cuisine',
      'Animation et Jeux': 'animation-et-jeux',
      'Décoration': 'decoration',
      'Mobilier': 'mobilier',
      'Structure': 'structure'
    }
  };

  const fallbackSubcategories = {
    'JARDINAGE': ['Gazon', 'Terre', 'Bois', 'Arbre', 'Feuilles'],
    'BRICOLAGE': ['Construction', 'Électricité', 'Peinture', 'Vis et Boulons'],
    'TRANSPORT': ['Charge lourde', 'Moteur', 'Roue'],
    'NETTOYAGE': ['Tissus', 'Eau', 'Poussière'],
    'EVENEMENTIEL': ['Son', 'Éclairage', 'Cuisine', 'Animation et Jeux', 'Décoration', 'Mobilier', 'Structure']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <main className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
              <Tag className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('add_tool.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('add_tool.subtitle')}
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 border-b">
              <CardTitle className="text-2xl flex items-center text-foreground">
                <Settings className="h-6 w-6 mr-3 text-accent" />
                {t('add_tool.info_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    {t('add_tool.general_info')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-medium text-foreground">
                        {t('add_tool.ad_title')} *
                      </Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Perceuse électrique Bosch Professional" 
                        className={`h-12 text-base ${validationErrors.title ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                      {validationErrors.title && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.title}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="brand" className="text-sm font-medium text-foreground">
                        {t('add_tool.brand')}
                      </Label>
                      <Input 
                        id="brand" 
                        placeholder="Ex: Bosch" 
                        className={`h-12 text-base ${validationErrors.brand ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                      />
                      {validationErrors.brand && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.brand}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="model" className="text-sm font-medium text-foreground">
                        {t('add_tool.model')}
                      </Label>
                      <Input 
                        id="model" 
                        placeholder="Ex: GSB 13 RE" 
                        className={`h-12 text-base ${validationErrors.model ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                      />
                      {validationErrors.model && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.model}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="year" className="text-sm font-medium text-foreground">
                        {t('add_tool.year')}
                      </Label>
                      <Input 
                        id="year" 
                        type="number"
                        placeholder="Ex: 2022" 
                        className={`h-12 text-base ${validationErrors.year ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={formData.year || ''}
                        onChange={(e) => handleInputChange('year', parseInt(e.target.value) || 0)}
                      />
                      {validationErrors.year && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.year}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-medium text-foreground">
                      {t('add_tool.description')}
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Décrivez votre outil, son état, ses accessoires..."
                      className={`min-h-[120px] resize-none text-base ${validationErrors.description ? 'border-red-500 focus:border-red-500' : ''}`}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    {validationErrors.description && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.description.length}/1000 caractères
                    </p>
                  </div>
                </div>

                {/* Category Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t('add_tool.categorization')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">{t('add_tool.category')} *</Label>
                      <Select 
                        value={selectedCategory}
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          handleInputChange('category', value);
                        }}
                      >
                        <SelectTrigger className={`h-12 text-base ${validationErrors.category ? 'border-red-500 focus:border-red-500' : ''}`}>
                          <SelectValue placeholder={t('add_tool.choose_category')} />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category: any) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))
                          ) : (
                            // Fallback to hardcoded categories if API is not available
                            Object.entries(fallbackCategories).map(([key, value]) => (
                              <SelectItem key={key} value={key}>{value}</SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {validationErrors.category && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.category}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">{t('add_tool.subcategory')}</Label>
                      <Select 
                        disabled={!selectedCategory}
                        value={formData.subcategory}
                        onValueChange={(value) => handleInputChange('subcategory', value)}
                      >
                        <SelectTrigger className={`h-12 text-base ${validationErrors.subcategory ? 'border-red-500 focus:border-red-500' : ''}`}>
                          <SelectValue placeholder={t('add_tool.choose_subcategory')} />
                        </SelectTrigger>
                        <SelectContent>
                                                      {Array.isArray(subcategories) && subcategories.length > 0 ? (
                              subcategories.map((subcategory: any) => (
                                <SelectItem key={subcategory.id} value={subcategory.name}>
                                  {subcategory.displayName || subcategory.name}
                                </SelectItem>
                              ))
                            ) : (
                            // Fallback to hardcoded subcategories if API is not available
                            selectedCategory && fallbackSubcategories[selectedCategory as keyof typeof fallbackSubcategories]?.map((sub) => {
                              const subcategoryId = subcategoryIdMapping[selectedCategory as keyof typeof subcategoryIdMapping]?.[sub];
                              return (
                                <SelectItem key={sub} value={subcategoryId || sub}>
                                  {sub}
                                </SelectItem>
                              );
                            })
                          )}
                        </SelectContent>
                      </Select>
                      {validationErrors.subcategory && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.subcategory}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">{t('add_tool.condition')} *</Label>
                    <Select 
                      value={formData.condition}
                      onValueChange={(value) => handleInputChange('condition', value)}
                    >
                      <SelectTrigger className={`h-12 text-base ${validationErrors.condition ? 'border-red-500 focus:border-red-500' : ''}`}>
                        <SelectValue placeholder={t('add_tool.condition')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEUF">{t('add_tool.condition_new')}</SelectItem>
                        <SelectItem value="EXCELLENT">{t('add_tool.condition_excellent')}</SelectItem>
                        <SelectItem value="BON">{t('add_tool.condition_good')}</SelectItem>
                        <SelectItem value="MOYEN">{t('add_tool.condition_fair')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.condition && (
                      <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {validationErrors.condition}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Euro className="h-5 w-5 mr-2 text-accent" />
                    {t('add_tool.pricing')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="price" className="text-sm font-medium text-foreground">
                        {t('add_tool.price_per_day')} *
                      </Label>
                      <div className="relative">
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="25" 
                          className={`h-12 text-base pl-8 ${validationErrors.dailyRate ? 'border-red-500 focus:border-red-500' : ''}`}
                          value={formData.dailyRate || ''}
                          onChange={(e) => handleInputChange('dailyRate', parseFloat(e.target.value) || 0)}
                        />
                        <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {validationErrors.dailyRate && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.dailyRate}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="deposit" className="text-sm font-medium text-foreground">
                        {t('add_tool.deposit')}
                      </Label>
                      <div className="relative">
                        <Input 
                          id="deposit" 
                          type="number" 
                          placeholder="100" 
                          className={`h-12 text-base pl-8 ${validationErrors.deposit ? 'border-red-500 focus:border-red-500' : ''}`}
                          value={formData.deposit || ''}
                          onChange={(e) => handleInputChange('deposit', parseFloat(e.target.value) || 0)}
                        />
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {validationErrors.deposit && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {validationErrors.deposit}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Section with Google Maps Integration */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-accent" />
                    {t('add_tool.location_title')}
                  </h3>
                  
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Adresse, ville..."
                        className="pl-10"
                        value={addressInput}
                        onChange={e => {
                          setAddressInput(e.target.value);
                          setSelectedCoords(null);
                          setFormData(prev => ({ ...prev, location: '', latitude: 0, longitude: 0 }));
                        }}
                        autoComplete="off"
                      />
                      {addressSuggestions.length > 0 && (
                        <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow-lg max-h-48 overflow-auto">
                          {addressSuggestions.map((s, idx) => (
                            <div
                              key={s.place_id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleAddressSelect(s)}
                            >
                              {s.display_name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {validationErrors.location && <Alert variant="destructive"><AlertDescription>{validationErrors.location}</AlertDescription></Alert>}
                  </div>
                </div>

                {/* Photos Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-accent" />
                    {t('add_tool.photos_title')}
                  </h3>
                  
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-accent bg-accent/10 scale-[1.02]' 
                        : 'border-border hover:border-accent hover:bg-accent/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-accent" />
                      </div>
                      <p className="text-lg font-medium text-foreground mb-2">
                        {t('add_tool.add_photos')}
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        {t('add_tool.drop_images')}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        size="lg" 
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {t('add_tool.browse_files')}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">
                        {t('add_tool.file_format')}
                      </p>
                    </div>
                  </div>

                  {validationErrors.photos && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{validationErrors.photos}</AlertDescription>
                    </Alert>
                  )}

                  {/* Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground">
                        Images sélectionnées ({selectedFiles.length}/10)
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Instructions Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    {t('add_tool.instructions_title')}
                  </h3>
                  
                  <div className="space-y-3">
                    <Label htmlFor="instructions" className="text-sm font-medium text-foreground">
                      {t('add_tool.owner_instructions')}
                    </Label>
                    <Textarea 
                      id="instructions" 
                      placeholder="Ex: Prévoir une rallonge électrique, nettoyer après usage, manipulation délicate..."
                      className="min-h-[100px] resize-none text-base"
                      value={formData.ownerInstructions}
                      onChange={(e) => handleInputChange('ownerInstructions', e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isLoading || isSubmitting}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        {t('add_tool.publish')}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTool;
