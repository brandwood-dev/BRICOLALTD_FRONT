import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // confirm reservation
    'reservation.recap': 'Récapitulatif',
    'reservation.card': 'Carte bancaire',
    'reservation.back_to_details': 'Retour aux détails',
    'reservation.complete_booking': 'Terminer votre réservation',
    'reservation.rental_period': 'Période de location',
    'reservation.start_date': 'Date de début',
    'reservation.select_date': 'Sélectionner une date',
    'reservation.end_date': 'Date de fin',
    'reservation.pickup_time': 'Heure de récupération',
    'reservation.message_to_owner': 'Message au propriétaire(optionnel)',
    'reservation.message_placeholder': 'Précisez l\'usage prévu, vos questions...',
    'reservation.contact_information': 'Informations de contact',
    'reservation.confirm': 'Confirmer la réservation',
    'reservation.payment_method': 'Méthode de paiement',
    'reservation.price_per_day': 'Prix par jour',
    'reservation.number_of_days': 'Nombre de jours',
    'reservation.subtotal': 'Sous-total',
    'reservation.payment_fee': 'Frais de paiement sécurisé (taxes et frais)',
    'reservation.deposit': "Caution (remboursable)",
    'reservation.total_amount': 'Total à payer',
    'reservation.included_protection': 'Protection incluse',
    'reservation.insurance_description': 'Votre location est protégée par notre assurance en cas de dommage.',
    'reservation.confirmation_message': 'En confirmant, vous acceptez nos conditions de location et notre politique d\'annulation.',
    // blog
    'blog.title':'Blog Bricola LTD',
    'blog.description': 'Découvrez nos conseils, guides et actualités sur l\'univers des outils et du bricolage',
    'blog.popular_categories': 'Catégories  populaires',
    // blog categories
    'blog.category.gardening': 'Jardinage',
    'blog.category.maintenance':   'Entretien',
    'blog.category.transport':   'Transport',
    'blog.category.diy':   'Bricolage',
    'blog.category.electricity': 'Électricité',
    'blog.category.lighting':   'Éclairage',
    'blog.category.painting':    'Peinture',
    'blog.category.construction':'Construction',
    'blog.category.plants':     'Plantes',
    'blog.category.cleaning':   'Nettoyage',
    'blog.category.decoration':  'Décoration',
    'blog.category.guide':                'Guide',

    // favorites
    'favorite.title': 'Mes Favoris',
    // profile ads
    'ads.search': 'Rechercher par titre ou catégorie...',

    // General
    'general.first_name': 'Prénom',
    'general.first_name_placeholder': 'votre prénom',
    'general.last_name': 'Nom',
    'general.last_name_placeholder': 'votre nom',
    'general.phone': 'Téléphone',
    
    
  
    'general.min': 'min',
    'general.modify': 'Modifier',
    'general.see': 'Voir',
    'general.location': 'Locations',

    'general.published': 'Publié',
    'general.unpublished': 'Non publié',
    'general.view_details': 'Voir détails',
    'general.pending': 'En attente',
    'general.accepted': 'Acceptée',
    'general.ongoing': 'En cours',
    'general.completed': 'Terminée',
    'general.cancelled': 'Annulée',
    'general.declined': 'Refusée',
    'general.all': 'Tous',
    'general.all_periods': 'Toutes les périodes',
    'general.week': 'Cette semaine',
    'general.month': 'Ce mois',
    'general.year': 'Cette année',
    'general.reset': 'Réinitialiser',
    'general.day': 'jour',
    'general.by': 'par',
    'general.to': 'Au',
    'general.from': 'Du',
    'general.cancel': 'Annuler',
    'general.confirm': 'Confirmer',
    'general.report': 'Signaler',
    'general.download_contract': 'Télécharger le contrat',
    'general.hide': 'Masquer',
    'general.copy': 'Copier',
    'general.reference': 'Référence',
    'general.contact': 'Contacter',
    'general.show': 'Afficher',
    'general.confirmed': 'Confirmé',
    'general.rejected': 'Rejeté',
    'general.list': 'Liste',
    'general.grid': 'Grille',

    // bookings
    'booking.title': 'Mes Réservations',
    'booking.tool_returned': 'J\'ai rendu l\'outil',
    'booking.search': 'Rechercher par titre d\'annonce...',
    'booking.verification_code': 'Code de vérification',
    'booking.present_code': 'Présentez ce code au propriétaire lors de la récupération de l\'outil le premier jour.',

    // pagination
    'pagination.next': 'Suivant',
    'pagination.previous': 'Précédent',

    // requests
    'request.title': 'Mes Demandes',
    'request.search': 'Rechercher par titre d\'annonce...',
    'request.all': 'Tous',
    'request.pending': 'En attente',
    'request.accepted': 'Acceptée',
    'request.ongoing': 'En cours',
    'request.completed': 'Terminée',
    'request.cancelled': 'Annulée',
    'request.declined': 'Refusée',
    'request.all_periods': 'Toutes les périodes',
    'request.week': 'Cette semaine',
    'request.month': 'Ce mois',
    'request.year': 'Cette année',
    'request.reset': 'Réinitialiser',
    'request.results_found': 'Résultats trouvés',
    'request.day': 'jour',
    'request.by': 'par',
    'request.reference': 'Référence',
    'request.pickup_time': 'Heure de récupération',
    'request.from': 'Du',
    'request.to': 'Au',
    'request.accept': 'Accepter',
    'request.decline': 'Refuser',
    'request.cancel': 'Annuler',
    'request.report': 'Signaler',
    'request.download_contract': 'Télécharger le contrat',
    'request.validation_code': 'Code de validation',
    'request.enter_code': 'Entrez le code',
    'request.confirm': 'Confirmer',
    'request.contact': 'Contacter',

    // catalog section
    'catalog_section.title': 'Outils trouvés',
    'catalog_section.by': 'Par',
    'catalog_section.category': 'Catégorie',
    'catalog_section.sort_by': 'Trier par',
    'catalog_section.most_recent': 'Plus récents',
    'catalog_section.price_low_to_high': 'Prix croissant',
    'catalog_section.price_high_to_low': 'Prix décroissant',
    'catalog_section.top_rated': 'Mieux notés',
    'catalog_section.filters': 'Filtres',
    'catalog_section.search': 'Recherche',
    'catalog_section.tool_name': 'Nom de l\'outil',
    'catalog_section.location': 'Localisation',
    'catalog_section.all_categories': 'Toutes les catégories',
    'catalog_section.sub_category': 'Sous-catégorie',
    'catalog_section.all_sub_categories': 'Toutes les sous-catégories',
    'catalog_section.daily_price': 'Prix par jour',
    'catalog_section.apply_filters': 'Appliquer les filtres',


    // blog section
    'blog_section.title': 'Derniers articles du blog',
    'blog_section.description': 'Découvrez nos conseils, guides et actualités pour réussir tous vos projets de bricolage',
    'blog_section.min': 'min',
    'blog_section.read_article': 'Lire l\'article',
    'blog_section.view_all': 'Voir tous les articles',

    // customer reviews
    'customer_reviews.title': 'Avis de nos clients',
    'customer_reviews.description': 'Découvrez ce que nos utilisateurs pensent de notre plateforme',

    // rental process
    'rental_process.title': 'Comment ça marche ?',
    'rental_process.description': 'Louez vos outils en 4 étapes simples et commencez à générer des revenus',
    'rental_process.step1.title': 'Publiez votre annonce en quelques clics',
    'rental_process.step1.description': 'Ajoutez vos outils avec photos et description détaillée en quelques minutes seulement.',
    'rental_process.step2.title': 'Maximisez votre visibilité',
    'rental_process.step2.description': 'Votre annonce est visible par des milliers d\'utilisateurs à la recherche d\'outils.',
    'rental_process.step3.title': 'Recevez vos premières réservations',
    'rental_process.step3.description': 'Les locataires vous contactent directement pour réserver vos outils aux dates souhaitées.',
    'rental_process.step4.title': 'Percevez vos revenus en toute sérénité',
    'rental_process.step4.description': 'Recevez vos paiements de manière sécurisée et générez des revenus supplémentaires.',

    // Profile translations (some already added from ProfileInfo)
    'profile.first_name': 'Prénom',
    'profile.last_name': 'Nom',
    'profile.email': 'Email',
    'profile.phone': 'Téléphone',
    'profile.country': 'Pays',
    'profile.address': 'Adresse',
    'profile.edit_profile_photo': 'Cliquez sur "Modifier" pour changer votre photo de profil',
    'profile.verified': 'Vérifié',
    'profile.account_type_individual': 'Particulier',
    'profile.account_type_company': 'Entreprise',
    'profile.average_rating': 'Note moyenne',
    'profile.rentals_completed': 'Locations réalisées',
    'profile.active_ads': 'Annonces actives',
    'profile.total_earnings': 'Gains totaux',
    'profile.delete_account': 'Supprimer mon compte',
    'profile.back_home': 'Retour à l\'accueil',
    'profile.profile': 'Profil',
    'profile.favorites': 'Favoris',
    'profile.ads': 'Annonces',
    'profile.reservations': 'Réservations',
    'profile.requests': 'Demandes',
    'profile.wallet': 'Portefeuille',
    'profile.edit': 'Modifier',
    'profile.member_since': 'Membre depuis {date}',
    'profile.select_country': 'Sélectionnez un pays',
    'profile.address_placeholder': 'Saisissez votre adresse complète',
    'profile.address_hint': 'Saisissez une adresse valide compatible avec Google Maps',
    'profile.delete_confirm': 'Confirmez-vous la suppression de votre compte ?',
    'profile.delete_description': 'Cette action est irréversible. Toutes vos données, annonces, réservations et historique de transactions seront définitivement supprimés.',
    'profile.account_deletion_pending': 'Compte en attente de suppression',

    // Action translations (assuming these exist from previous context)
    'action.cancel': 'Annuler',
    'action.confirm': 'Confirmer',
    
 // Wallet translations
    'wallet.title': 'Mon Portefeuille',
    'wallet.total': 'Total',
    'wallet.cumulative_balance': 'Solde cumulé',
    'wallet.available': 'Disponible',
    'wallet.available_balance': 'Solde disponible',
    'wallet.successful': 'Réussies',
    'wallet.successful_transactions': 'Transactions réussies',
    'wallet.withdraw_money': 'Retirer mon argent',
    'wallet.withdrawal_note': 'Vous pouvez retirer votre argent à partir du moment où votre solde cumulé atteint 20 GBP.',
    'wallet.conversion_rate': '20 GBP = {minWithdrawalEUR} EUR',
    'wallet.dynamic_conversion': 'Le taux de conversion s\'actualise dynamiquement en fonction de la devise choisie dans le compte.',

    // recent transactions
    'wallet.recent_transactions': 'Transactions récentes',
    'wallet.select_time_period': 'Sélectionnez une période',
    'wallet.all_transactions': 'Toutes les transactions',
    'wallet.incoming_payments': 'Receptions',
    'wallet.withdrawal': 'Retrait',
    'wallet.reset': 'Réinitialiser',
    'wallet.completed': 'Terminée',
    'wallet.pending': 'En attente',
    'wallet.failed': 'Échouée',
    
    // New FAQ translations
    'faq.hero.title': 'Questions Fréquentes',
    'faq.hero.subtitle': 'Trouvez rapidement les réponses à vos questions les plus courantes',
    'faq.title': 'Questions générales',
    'faq.general.q1': 'Qu’est-ce que Bricola et comment ça fonctionne ?',
    'faq.general.a1': 'Bricola LTD est une plateforme de location d’outils entre particuliers. Les utilisateurs peuvent proposer leurs outils à la location ou en louer auprès d\'autres membres. La plateforme gère les paiements, les cautions et les litiges.',
    'faq.general.q2': 'Quelles catégories d’outils peut-on proposer ?',
    'faq.general.a2': 'Actuellement, Bricola prend en charge les outils de bricolage, jardinage, nettoyage et ceux liés aux événements. D’autres catégories pourront être ajoutées selon les besoins du marché.',
    'faq.general.q3': 'Existe-t-il une application mobile Bricola ?',
    'faq.general.a3': 'Oui. Bricola est disponible sur iOS et Android, en plus de la version complète du site web.',
    'faq.general.q4': 'Puis-je utiliser Bricola depuis n’importe quel pays ?',
    'faq.general.a4': 'Pour le moment, Bricola est disponible uniquement dans la région du Golfe. Une expansion est prévue prochainement.',
    'faq.general.q5': 'Les entreprises peuvent-elles proposer des outils ?',
    'faq.general.a5': 'Oui, mais Bricola est principalement destiné aux particuliers. Les professionnels doivent respecter les lois et réglementations locales en vigueur.',
    'faq.general.q6': 'Quels objets sont interdits ?',
    'faq.general.a6': 'Sont interdits : les objets illégaux, les équipements dangereux ou non conformes aux normes de sécurité.',
    'faq.general.q7': 'Puis-je suggérer une fonctionnalité ?',
    'faq.general.a7': 'Oui, vos suggestions sont les bienvenues. Contactez notre support pour nous faire part de votre idée, nous l’étudierons pour les prochaines mises à jour.',
    'faq.general.q8': 'Comment contacter le service client ?',
    'faq.general.a8': 'Utilisez le chat WhatsApp ou envoyez-nous un email à : support@bricolaltd.com. Notre équipe est disponible 7 jours sur 7.',
    'faq.renters.title': 'Pour les locataires',
    'faq.renters.q1': 'Comment créer un compte ?',
    'faq.renters.a1': 'Il suffit de s’inscrire avec votre nom, votre email, votre numéro de téléphone et, si nécessaire, vos documents de vérification. Vous devrez confirmer votre numéro et votre adresse email.',
    'faq.renters.q2': 'Pourquoi la vérification d’identité est-elle demandée ?',
    'faq.renters.a2': 'Pour garantir la sécurité et la confiance sur la plateforme, une vérification d’identité peut être exigée avant de louer des outils de grande valeur ou d’effectuer des retraits importants.',
    'faq.renters.q3': 'Que dois-je faire avant de recevoir un outil ?',
    'faq.renters.a3': 'Assurez-vous de fournir une pièce d’identité valide, respectez les conditions de location, et examinez l’outil avec le propriétaire à la remise.',
    'faq.renters.q4': 'Que faire si l’outil est endommagé pendant la location ?',
    'faq.renters.a4': 'Informez immédiatement le propriétaire et le support. Des preuves peuvent être demandées pour activer un recours via la caution.',
    'faq.owners.title': 'Pour les propriétaires',
    'faq.owners.q1': 'Comment proposer un outil à la location ?',
    'faq.owners.a1': 'Cliquez sur « Proposer un outil », téléchargez des photos claires, ajoutez une description, précisez l’état de l’outil, les garanties éventuelles, le prix par jour et le montant de la caution.',
    'faq.owners.q2': 'Que se passe-t-il après avoir proposé mon outil ?',
    'faq.owners.a2': 'L’annonce sera d’abord vérifiée par notre équipe de modération. Vous serez ensuite notifié dès qu’un utilisateur effectue une réservation.',
    'faq.owners.q3': 'Puis-je refuser une demande de réservation ?',
    'faq.owners.a3': 'Oui, le propriétaire peut accepter ou refuser une demande. Cependant, un trop grand nombre de refus sans justification peut nuire à la visibilité de vos annonces.',
    'faq.owners.q4': 'Que dois-je faire avant de remettre l’outil au locataire ?',
    'faq.owners.a4': 'Vérifiez l’identité du locataire, prenez des photos de l’état de l’outil, et convenez ensemble des conditions de retour.',
    'faq.owners.q5': 'Que faire si mon outil est endommagé ?',
    'faq.owners.a5': 'Envoyez des preuves dans les 24 heures suivant le retour. L’équipe Bricola examinera le dossier et pourra décider d’un remboursement à partir de la caution.',
    'faq.owners.q6': 'Y a-t-il une assurance sur les outils proposés ?',
    'faq.owners.a6': 'Non, Bricola ne propose pas encore d’assurance. Il est recommandé de ne proposer que les outils que vous êtes prêt à prêter en toute sécurité.',
    'faq.payment.title': 'Paiement et sécurité',
    'faq.payment.q1': 'Comment se passent les paiements ?',
    'faq.payment.a1': 'Les paiements sont traités de manière sécurisée via Stripe. Le locataire paie à l’avance, y compris la caution.',
    'faq.payment.q2': 'Qu’est-ce que la caution ?',
    'faq.payment.a2': 'Il s’agit d’un montant remboursable, conservé par Stripe pour couvrir d’éventuels dommages ou non-retours. Il est automatiquement restitué après le bon retour de l’outil.',
    'faq.payment.q3': 'Comment retirer mes gains ?',
    'faq.payment.a3': 'Vous pouvez demander un virement vers votre compte bancaire via Wise.',
    'faq.payment.q4': 'Quels sont les frais appliqués par Bricola ?',
    'faq.payment.a4': 'Bricola prélève une commission de 15 % sur chaque location réussie. Aucun frais d’inscription ou abonnement mensuel.',
    'faq.payment.q5': 'Comment sont traités les litiges ?',
    'faq.payment.a5': 'Tous les litiges sont gérés par notre équipe d’assistance dans un délai de 72 heures. Leur décision est finale.',
    'faq.payment.q6': 'Quelles mesures de sécurité sont mises en place ?',
    'faq.payment.a6': 'Vérification d’identité, évaluations utilisateurs, paiements sécurisés et surveillance par notre support assurent un environnement fiable.',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.catalog': 'Catalogue',
    'nav.navigation': 'navigation',
    'nav.propos': 'À propos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.rent': 'Louer',
    'nav.list': 'Proposer un outil',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    
    // Hero section
    'hero.title': 'Louez et partagez vos outils en toute simplicité',
    'hero.subtitle': 'La plateforme qui connecte les propriétaires d\'outils avec ceux qui en ont besoin. Particuliers et professionnels, trouvez l\'outil parfait près de chez vous.',
    'hero.search.placeholder': 'Rechercher un outil...',
    'hero.search.location': 'Localisation',
    'hero.search.button': 'Rechercher',
    'hero.available_tools': 'Outils disponibles',
    'hero.active_users': 'Utilisateurs actifs',
    'hero.cities_covered': 'Villes couvertes',
    
    // Categories
    'categories.title': 'Nos catégories',
    'categories.description': 'Trouvez l\'outil parfait selon vos besoins',
    'categories.gardening': 'Jardinage',
    'categories.cleaning': 'Nettoyage',
    'categories.diy': 'Bricolage',
    'categories.events': 'Événementiel',
    'categories.transport': 'Transport',
    
    // Tools
    'tools.featured': 'Outils en vedette',
    'tools.description': 'Les outils les mieux notés et les plus demandés de notre communauté',
    'tools.day': 'jour',
    'tools.display_all': 'Voir tous les outils',
    'tools.by': 'par',
    'tools.available': 'Disponible',
    'tools.rent': 'Louer',
    'tools.details': 'Voir détails',
    'tools.new_ad': 'Nouvelle annonce',
    'tools.my_ads': 'Mes annonces',
    'tools.edit': 'Modifier',
    'tools.view': 'Voir',
    'tools.delete': 'Supprimer',
    'tools.published': 'Publié',
    'tools.unpublished': 'Non publié',
    'tools.pending': 'En attente',
    'tools.approved': 'Approuvé',
    'tools.rejected': 'Rejeté',
    'tools.back_to_results': 'Retour aux résultats',
    'tools.verified': 'Vérifié',
    'tools.owner': 'Propriétaire',
    'tools.model': 'Modèle',
    'tools.brand': 'Marque',
    'tools.year_of_purchase': 'Année d\'achat',
    'tools.fees_and_taxes': 'Incluant taxes et frais',
    'tools.of': 'des',
    'tools.charged': 'saisis par le loueur',
    'tools.deposit': 'Caution',
    'tools.refunded': '(remboursée en fin de location)',
    'tools.rent_now': 'Louer maintenant',
    'tools.add_to_favorites': 'Ajouter aux favoris',
    'tools.desc': 'Description',
    'tools.remove_from_favorites': 'Retirer des favoris',
    'tools.instructions': 'Consigne du propriétaire',
    'tools.reviews': 'Avis des locataires',


    // Forms
    'form.first_name': 'Prénom',
    'form.last_name': 'Nom',
    'form.email': 'Email',
    'form.phone': 'Téléphone',
    'form.address': 'Adresse',
    'form.country': 'Pays',
    'form.password': 'Mot de passe',
    'form.confirm_password': 'Confirmer le mot de passe',
    'form.title': 'Titre',
    'form.description': 'Description',
    'form.price': 'Prix',
    'form.category': 'Catégorie',
    'form.location': 'Localisation',
    
    // Actions
    'action.search': 'Rechercher',
    'action.filter': 'Filtrer',
    'action.sort': 'Trier',
    'action.save': 'Enregistrer',
    'action.delete': 'Supprimer',
    'action.edit': 'Modifier',
    'action.view': 'Voir',
    'action.contact': 'Contacter',
    'action.close': 'Fermer',
    'action.back': 'Retour',
    'action.next': 'Suivant',
    'action.previous': 'Précédent',
    
    // Floating Action Button
    'fab.contact_support': 'Contacter le support',
    'fab.publish_ad': 'Publier une annonce',
    'fab.find_tool': 'Trouver mon outil',
    
    // Messages
    'message.success': 'Succès',
    'message.error': 'Erreur',
    'message.loading': 'Chargement...',
    'message.no_results': 'Aucun résultat trouvé',
    'message.confirm_delete': 'Êtes-vous sûr de vouloir supprimer ?',
    
    // Footer
    'footer.about': 'À propos',
    'footer.help': 'Aide',
    'footer.contact': 'Contact',
    'footer.legal': 'Mentions légales',
    'footer.rights': 'Tous droits réservés',
    'footer.cgu': 'CGU',
    'footer.privacy': 'Politique de confidentialité',
    'footer.faq': 'FAQ',
    'footer.description': 'La plateforme de location d`\'outils qui connecte les propriétaires avec ceux qui en ont besoin. Simple, sécurisé et local.',
    'footer.contrat': 'Contrat de location', // Added
    'footer.payment': 'Modes de paiement', // Added
    'footer.useful_links': 'Liens utiles', // Added
    'footer.help_center': 'Centre d\'assistance', // Added
    'footer.owner_guide': 'Guide du loueur', // Added
    'footer.renter_guide': 'Guide du locataire', // Added
    'footer.terms_conditions': 'CGU', // Added (synonym for footer.cgu)
    // Login
    'login.title': 'Connexion',
    'login.subtitle': 'Connectez-vous à votre compte Bricola LTD',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.signin': 'Se connecter',
    'login.no_account': 'Pas encore de compte ? S\'inscrire',
    'login.forgot_password': 'Mot de passe oublié ?',

    // Register
    'register.title': 'Inscription',
    'register.subtitle': 'Créez votre compte Bricola LTD',
    'register.user_type': 'Type d\'utilisateur',
    'register.individual': 'Particulier',
    'register.business': 'Entreprise',
    'register.first_name': 'Prénom',
    'register.last_name': 'Nom',
    'register.phone': 'Téléphone',
    'register.country': 'Pays',
    'register.address': 'Adresse',
    'register.address_help': 'Adresse complète avec code postal et ville',
    'register.password': 'Mot de passe',
    'register.confirm_password': 'Confirmer le mot de passe',
    'register.terms': 'J\'accepte les conditions d\'utilisation',
    'register.sales_conditions': 'J\'accepte les termes et conditions et les conditions de vente',
    'register.create_account': 'Créer mon compte',
    'register.have_account': 'Déjà un compte ? Se connecter',
    'register.select_country': 'Sélectionnez un pays',

    // About
    'about.title': 'Bienvenue chez Bricola LTD',
    'about.subtitle': 'Votre plateforme de confiance pour la location d’outils entre particuliers dans toute la région du Golfe.',
    'about.mission_title': 'Notre Mission',
    'about.mission_1': 'Fondée en 2025 et enregistrée au Royaume-Uni, Bricola LTD est née d’un constat simple mais essentiel : beaucoup de personnes possèdent des outils qu’elles utilisent rarement, tandis que d’autres en ont régulièrement besoin sans vouloir les acheter. Notre plateforme répond à ce besoin en permettant aux particuliers de louer des outils entre eux de manière sécurisée, économique et pratique.',
    'about.mission_2': 'Nous mettons en relation les personnes à la recherche d’outils pour des travaux domestiques, du jardinage, du nettoyage ou des événements, avec des propriétaires locaux d’outils. Grâce à notre application et notre site web intuitifs, il est possible de proposer, rechercher et louer des outils en quelques minutes.',
    'about.mission_3': 'Chez Bricola, nous croyons au potentiel de l’économie du partage pour réduire le gaspillage, encourager la durabilité et renforcer les liens communautaires. Notre service est conçu pour être sûr, transparent et centré sur la confiance des utilisateurs. Avec un système de paiement numérique fiable et des fonctionnalités de sécurité intégrées, Bricola garantit des transactions fluides et protégées.',
    'about.mission_4': 'En choisissant Bricola LTD, vous gagnez du temps et de l’argent, tout en adoptant une approche plus intelligente et écologique pour accéder aux outils dont vous avez besoin. Nous sommes fiers de construire l’avenir de la location d’outils dans la région du Golfe.',
    'about.mission_5': 'Merci de faire partie de la communauté Bricola.',
    'about.values_title': 'Nos Valeurs',
    'about.community': 'Communauté',
    'about.community_desc': 'Créer des liens entre voisins et favoriser l\'entraide locale',
    'about.security': 'Sécurité',
    'about.security_desc': 'Garantir des transactions sécurisées et une assurance complète',
    'about.quality': 'Qualité',
    'about.quality_desc': 'S\'assurer que tous les outils respectent nos standards de qualité',
    'about.simplicity': 'Simplicité',
    'about.simplicity_desc': 'Rendre la location d\'outils aussi simple qu\'un clic',
    'about.stats_title': 'Bricola en chiffres',
    'about.tools_available': 'Outils disponibles',
    'about.active_users': 'Utilisateurs actifs',
    'about.cities_covered': 'Villes couvertes',
    'about.satisfaction': 'Satisfaction client',
    'about.team_title': 'Notre Équipe',

    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Une question, un problème ou simplement envie d\'échanger ? Notre équipe est là pour vous aider.',
    'contact.form_title': 'Envoyez-nous un message',
    'contact.first_name': 'Prénom',
    'contact.last_name': 'Nom',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le message',
    'contact.email_title': 'Email',
    'contact.phone_title': 'Téléphone',
    'contact.address_title': 'Adresse',
    'contact.hours_title': 'Horaires',
    'contact.hours_weekdays': 'Lundi - Vendredi : 9h00 - 18h00',
    'contact.hours_saturday': 'Samedi : 10h00 - 16h00',
    'contact.hours_sunday': 'Dimanche : Fermé',
    'contact.faq_title': 'Questions fréquentes',
    'contact.how_to_rent': 'Comment louer un outil ?',
    'contact.how_to_rent_answer': 'Recherchez l\'outil souhaité, sélectionnez les dates de location, et confirmez votre réservation. C\'est aussi simple que ça !',
    'contact.problem': 'Que faire en cas de problème ?',
    'contact.problem_answer': 'Contactez-nous immédiatement via notre support client. Nous sommes là pour résoudre tous vos problèmes rapidement.',
    'contact.how_to_list': 'Comment proposer mes outils ?',
    'contact.how_to_list_answer': 'Cliquez sur "Proposer un outil" dans la navigation, ajoutez les détails et photos de votre outil, et commencez à gagner de l\'argent.',
    'contact.insurance': 'Les outils sont-ils assurés ?',
    'contact.insurance_answer': 'Oui, tous les outils loués via Bricola sont couverts par notre assurance complète pour votre tranquillité d\'esprit.',

    // Add Tool
    'add_tool.title': 'Proposer un outil',
    'add_tool.subtitle': 'Partagez vos outils avec la communauté et générez des revenus en les louant facilement',
    'add_tool.info_title': 'Informations de l\'outil',
    'add_tool.general_info': 'Informations générales',
    'add_tool.ad_title': 'Titre de l\'annonce',
    'add_tool.brand': 'Marque',
    'add_tool.model': 'Modèle',
    'add_tool.year': 'Année d\'achat',
    'add_tool.description': 'Description',
    'add_tool.categorization': 'Catégorisation',
    'add_tool.category': 'Catégorie',
    'add_tool.subcategory': 'Sous-catégorie',
    'add_tool.condition': 'État de l\'outil',
    'add_tool.pricing': 'Tarification',
    'add_tool.price_per_day': 'Prix par jour (€)',
    'add_tool.deposit': 'Caution (€)',
    'add_tool.location_title': 'Localisation',
    'add_tool.address': 'Adresse ou ville',
    'add_tool.photos_title': 'Photos',
    'add_tool.add_photos': 'Ajoutez vos photos',
    'add_tool.drop_images': 'Glissez vos images ici ou cliquez pour parcourir',
    'add_tool.browse_files': 'Parcourir les fichiers',
    'add_tool.file_format': 'PNG, JPG jusqu\'à 10MB • 5 photos maximum',
    'add_tool.instructions_title': 'Consignes d\'utilisation',
    'add_tool.owner_instructions': 'Consignes du propriétaire',
    'add_tool.publish': 'Publier l\'annonce',
    'add_tool.choose_category': 'Choisir une catégorie',
    'add_tool.choose_subcategory': 'Choisir une sous-catégorie',
    'add_tool.condition_new': '✨ Neuf',
    'add_tool.condition_excellent': '🌟 Excellent',
    'add_tool.condition_good': '👍 Bon',
    'add_tool.condition_fair': '👌 Correct',

    // Categories and subcategories
    'category.gardening': 'Jardinage',
    'category.gardening.lawn': 'Gazon',
    'category.gardening.soil': 'Terre',
    'category.gardening.wood': 'Bois',
    'category.gardening.tree': 'Arbre',
    'category.gardening.leaves': 'Feuilles',

    'category.cleaning': 'Nettoyage',
    'category.cleaning.fabric': 'Tissu',
    'category.cleaning.water': 'Eau',
    'category.cleaning.dust': 'Poussière',

    'category.diy': 'Bricolage',
    'category.diy.construction': 'Construction',
    'category.diy.electricity': 'Électricité',
    'category.diy.painting': 'Peinture',
    'category.diy.screws_and_bolts': 'Vis et boulons',

    'category.transport': 'Transport',
    'category.transport.heavy_load': 'Charge lourde',
    'category.transport.engine': 'Moteur',
    'category.transport.wheel': 'Roue',

    'category.event': 'Événementiel',
    'category.event.lighting': 'Éclairage',
    'category.event.kitchen': 'Cuisine',
    'category.event.entertainment_and_games': 'Animation et jeux',
    'category.event.furniture': 'Mobilier',
    'category.event.decoration': 'Décoration',
    'category.event.structure': 'Structure',

    // Common
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.ok': 'OK',
    'common.language': 'Langue',
    'common.currency': 'Devise',
    'common.menu': 'Menu',
    'common.navigation': 'Navigation',
    'common.home': 'Accueil',

    // CGU (Terms of Use)

    'cgu.title': 'Conditions Générales d\'Utilisation',

    'cgu.last_updated': 'Dernière mise à jour : 1er janvier 2025',

    'cgu.section1.title': '1. Introduction',

    'cgu.section1.p1': 'La société Bricola LTD exploite une plateforme numérique de mise en relation entre particuliers, spécialisée dans la location d’outils et d’équipements destinés au bricolage, au jardinage, au nettoyage et à l’organisation d’événements.',

    'cgu.section1.p2': 'Bricola agit exclusivement en qualité d’intermédiaire de confiance. À ce titre, elle n’est ni propriétaire, ni dépositaire des objets loués, et n’assure ni leur transport, ni leur manutention.',

    'cgu.section2.title': '2. Accès à la Plateforme',

    'cgu.section2.p1': 'L\’accès à la plateforme est possible via les applications web et mobiles.',

    'cgu.section2.p2': 'L’utilisation du service est réservée aux personnes majeures (18 ans révolus) et juridiquement capables.',

    'cgu.section2.p3': 'Bricola se réserve le droit de suspendre ou clôturer tout compte utilisateur en cas de manquement aux présentes conditions, d’activités frauduleuses ou d’abus constaté.',

    'cgu.section3.title': '3. Inscription et Vérification des Utilisateurs',

    'cgu.section3.li1': 'L’inscription requiert une adresse email valide, un numéro de téléphone actif et une pièce d’identité officielle.',

    'cgu.section3.li2': 'Pour toute demande de retrait, l’utilisateur doit fournir des coordonnées bancaires exactes.',

    'cgu.section3.li3': 'Bricola se réserve le droit de demander des documents de vérification d’identité (KYC) pour les transactions de montant élevé.',

    'cgu.section3.li4': 'L’accès au compte est strictement personnel et non transférable. Le partage, la duplication ou la cession du compte sont interdits',

    'cgu.section4.title': '4. Règles de Location et Responsabilités',

    'cgu.section4.li1': 'Le locataire s’engage à restituer les objets loués dans leur état initial.',

    'cgu.section4.li2': 'Le propriétaire garantit que les équipements proposés sont fonctionnels, propres et conformes à la législation en vigueur.',

    'cgu.section4.li3': 'En cas de litige, Bricola peut exiger des éléments justificatifs (photographies, vidéos, attestations).',

    'cgu.section4.li4': 'Tout retard de restitution peut entraîner des pénalités calculées à l’heure ou à la journée.',

    'cgu.section4.li5': 'La durée de location ne peut excéder 5 jours consécutifs. Toute prolongation nécessite une nouvelle réservation via la plateforme, après confirmation de disponibilité par le propriétaire',

    'cgu.section4.li6': 'En cas de perte de l’objet, la totalité du dépôt de garantie pourra être retenue.',

    'cgu.section4.li7': 'Une utilisation abusive ou non conforme des équipements peut entraîner la suspension définitive du compte.',

    'cgu.section5.title': '5. Paiement, Commissions et Portefeuilles',

    'cgu.section5.li1': 'Tous les paiements sont traités via Stripe, dans le respect des réglementations financières locales.',

    'cgu.section5.li2': 'Des frais de service de 5,4 % sont appliqués au locataire lors du paiement. Ils couvrent les frais de traitement Stripe ainsi qu’une partie des coûts techniques de la plateforme (hébergement, maintenance, mises à jour).',

    'cgu.section5.li3': 'Une commission de 15 % est automatiquement prélevée sur chaque transaction réussie.',

    'cgu.section5.li4': 'Les revenus des propriétaires sont crédités sur un portefeuille interne, avec possibilité de retrait via Wise, dès que le solde atteint 50 £.',

    'cgu.section5.li5': 'Cette limite vise à réduire les petites demandes de retrait, à optimiser les coûts bancaires et à fluidifier les opérations financières.',

    'cgu.section5.li6': 'Bricola ne saurait être tenue responsable des délais de virement ou restrictions externes liés à Wise.',

    'cgu.section6.title': '6. Politique de Dépôt de Garantie',

    'cgu.section6.li1': 'Chaque location implique un dépôt de garantie temporaire, bloqué via Stripe.',

    'cgu.section6.li2': 'Ce dépôt est libéré 24 heures après la restitution du matériel, sous réserve de validation.',

    'cgu.section6.li3': 'En cas de dommage, de perte ou de contestation, tout ou partie du dépôt pourra être prélevé.',

    'cgu.section6.li4': 'L’utilisateur concerné sera informé par email avant toute retenue définitive.',

    'cgu.section7.title': '7. Gestion des Litiges',

    'cgu.section7.li1': 'Tout différend doit être signalé dans un délai de 24 heures suivant la restitution prévue.',

    'cgu.section7.li2': 'L’équipe de support s’engage à instruire le dossier dans un délai de 72 heures et à émettre une décision définitive.',

    'cgu.section7.li3': 'Bricola se réserve le droit de jouer un rôle de médiateur et d’appliquer les ajustements financiers qu’elle juge appropriés.',

    'cgu.section7.li4': 'La décision rendue est réputée définitive et contraignante pour les deux parties.',

    'cgu.section8.title': '8. Bon Usage et Intégrité de la Plateforme',

    'cgu.section8.li1': 'Les annonces doivent refléter des objets réels et légalement détenus.',

    'cgu.section8.li2': 'Le téléchargement massif ou automatisé de fausses annonces est interdit.',

    'cgu.section8.li3': 'La mise en location d’objets interdits (armes, substances dangereuses, etc.) est strictement prohibée.',

    'cgu.section8.li4': 'Les contrevenants récurrents seront définitivement exclus de la plateforme.',

    'cgu.section9.title': '9. Politique d’Annulation et de Remboursement',

    'cgu.section9.li1': 'Le locataire peut annuler sa réservation et obtenir un remboursement intégral s’il effectue l’annulation au moins 24 heures avant le début de la location.',

    'cgu.section9.li2': 'Aucune annulation avec remboursement ne sera acceptée dans les 24 heures précédant le début prévu.',

    'cgu.section9.li3': 'Si l’annulation provient du propriétaire, le locataire sera intégralement remboursé. Des annulations répétées de la part des propriétaires peuvent entraîner des sanctions.',

    'cgu.section10.title': '10. Disponibilité du Service et Évolutions',

    'cgu.section10.li1': 'Des interruptions ponctuelles peuvent survenir pour maintenance ou mise à jour.',

    'cgu.section10.li2': 'Les utilisateurs seront informés à l’avance en cas d’indisponibilité programmée.',

    'cgu.section10.li3': 'Bricola se réserve le droit de modifier ou supprimer certaines fonctionnalités sans préavis, dans le but d’optimiser l’expérience utilisateur.',

    'cgu.section11.title': '11. Protection des Données et Vie Privée',

    'cgu.section11.li1': 'Les données personnelles sont traitées conformément au RGPD (Règlement Général sur la Protection des Données – Royaume-Uni et Union Européenne).',

    'cgu.section11.li2': 'Les données sensibles sont chiffrées et conservées de manière sécurisée.',

    'cgu.section11.li3': 'Chaque utilisateur peut demander la suppression, la modification ou l’export de ses données à tout moment.',

    'cgu.section11.li4': 'Aucune donnée ne sera vendue ni partagée sans consentement explicite.',

    'cgu.section12.title': '12. Droit Applicable et Juridiction Compétente',

    'cgu.section12.li1': 'Les présentes conditions sont régies par le droit anglais.',

    'cgu.section12.li2': 'En cas de litige non résolu par voie amiable, compétence exclusive est attribuée aux tribunaux de Londres.',

    'cgu.section12.li3': 'Toute mise à jour des présentes sera notifiée sur la plateforme. La poursuite de l’utilisation vaut acceptation des nouvelles conditions.',

    'cgu.section13.title': '13. Contact',

    'cgu.section13.p': 'Dans certaines situations où un utilisateur (locataire ou propriétaire) ne réagit pas dans un délai raisonnable, Bricola LTD se réserve le droit de confirmer automatiquement l’état d’une transaction (livraison ou retour). Cette mesure vise à garantir la continuité et la fiabilité du service. Les utilisateurs sont donc invités à suivre et valider leurs opérations dans les temps impartis.',

    'cgu.section14.title': '14. Modification et Acceptation des Conditions',

    'cgu.section14.p1': 'Les présentes CGU peuvent être modifiées à tout moment pour s’adapter aux évolutions légales, techniques ou opérationnelles.',

    'cgu.section14.p2': 'Les utilisateurs seront informés des modifications substantielles.',

    'cgu.section14.p3': 'L’utilisation continue de la plateforme après modification vaut acceptation tacite des nouvelles conditions.',

    'cgu.section15.title': '15. Contact et Notifications Officielles',

    'cgu.section15.p1': 'Pour toute question, réclamation ou notification légale relative aux présentes conditions, les utilisateurs peuvent contacter Bricola LTD à l’adresse suivante : Contact@bricolaltd.com',

    'cgu.section15.p2': 'Toute communication officielle sera transmise via l’adresse email associée au compte utilisateur.',

  

 // Privacy Policy

"privacy.title": "Politique de Confidentialité",

    "privacy.last_updated": "Date d’entrée en vigueur : 1er septembre 2025",

    "privacy.section1.title": "1. Introduction",

    "privacy.section1.p1": "Bricola LTD accorde une importance capitale à la protection de votre vie privée et au respect de vos données personnelles.",

    "privacy.section1.p2": "Nous nous engageons à traiter vos informations conformément au Règlement Général sur la Protection des Données (RGPD) applicable au Royaume-Uni et dans l’Union européenne.",

    "privacy.section1.p3": "La présente politique décrit les données que nous collectons, les raisons de leur collecte et l’usage que nous en faisons.",

    "privacy.section2.title": "2. Données Collectées",

    "privacy.section2.p1": "Dans le cadre de l’utilisation de notre plateforme, nous sommes amenés à collecter les données suivantes :",

    "privacy.section2.identification": "Informations d’identification :",

    "privacy.section2.identification.li1": "Nom, numéro de téléphone, adresse email",

    "privacy.section2.account": "Informations de compte :",

    "privacy.section2.account.li1": "Identifiant, mot de passe",

    "privacy.section2.payment": "Informations de paiement :",

    "privacy.section2.payment.li1": "Coordonnées bancaires (IBAN) utilisées exclusivement pour les virements via Wise (aucune autre information de paiement n’est collectée)",

    "privacy.section2.technical": "Informations techniques :",

    "privacy.section2.technical.li1": "Adresse IP, type de navigateur, système d’exploitation, géolocalisation approximative",

    "privacy.section2.usage": "Données d’usage :",

    "privacy.section2.usage.li1": "Clics, pages visitées, requêtes de recherche effectuées sur la plateforme",

    "privacy.section3.title": "3. Finalités de Traitement",

    "privacy.section3.p1": "Vos données personnelles sont utilisées dans les objectifs suivants :",

    "privacy.section3.li1": "Création, gestion et sécurisation de votre compte utilisateur",

    "privacy.section3.li2": "Traitement des paiements et garantie des transactions de location",

    "privacy.section3.li3": "Vérification d’identité et respect des obligations réglementaires",

    "privacy.section3.li4": "Assistance client, gestion des litiges et traitement des réclamations",

    "privacy.section3.li5": "Amélioration continue de la plateforme, détection des fraudes et analyse des comportements d’utilisation",

    "privacy.section4.title": "4. Fondements Juridiques du Traitement",

    "privacy.section4.consent": "Votre consentement explicite, notamment lors de l’inscription ou de la soumission d’informations personnelles",

    "privacy.section4.interest": "Notre intérêt légitime, afin d’assurer la sécurité de nos services et leur amélioration continue",

    "privacy.section4.legal": "Nos obligations légales, en matière de lutte contre la fraude ou de conformité aux réglementations financières et fiscales",

    "privacy.section5.title": "5. Partage des Données avec des Tiers",

    "privacy.section5.p1": "Nous ne partageons vos données qu’avec des partenaires de confiance et uniquement lorsque cela est nécessaire :",

    "privacy.section5.li1": "Prestataires de paiement : Wise, pour les virements des revenus aux propriétaires",

    "privacy.section5.li2": "Hébergeurs et partenaires de sécurité informatique, garantissant la disponibilité et la protection de la plateforme",

    "privacy.section5.li3": "Autorités compétentes, dans le cadre d’une obligation légale ou réglementaire",

    "privacy.section5.li4": "En aucun cas, nous ne vendons, ne louons ou ne cédons vos données à des tiers à des fins commerciales.",

    "privacy.section6.title": "6. Durée de Conservation des Données",

    "privacy.section6.p1": "Les données sont conservées aussi longtemps que votre compte est actif.",

    "privacy.section6.p2": "En l’absence d’activité pendant 3 ans, votre compte pourra être désactivé, puis vos données anonymisées ou supprimées, sauf si leur conservation est exigée par la loi (par exemple : facturation, litige, vérification fiscale).",

    "privacy.section7.title": "7. Sécurité des Données",

    "privacy.section7.p1": "Nous mettons en œuvre des protocoles de chiffrement avancés, des mesures de contrôle d’accès strictes et utilisons des serveurs sécurisés situés dans la zone UK/UE.",

    "privacy.section7.p2": "Notre priorité est de garantir l’intégrité, la confidentialité et la disponibilité de vos données à tout moment.",

    "privacy.section8.title": "8. Vos Droits",

    "privacy.section8.p1": "Conformément au RGPD, vous disposez des droits suivants :",

    "privacy.section8.access": "Droit d’accès :",

    "privacy.section8.access.desc": "Obtenir une copie de vos données personnelles",

    "privacy.section8.rectification": "Droit de rectification :",

    "privacy.section8.rectification.desc": "Corriger toute donnée inexacte ou obsolète",

    "privacy.section8.erasure": "Droit à l’effacement :",

    "privacy.section8.erasure.desc": "Demander la suppression de vos données (dans les limites prévues par la loi)",

    "privacy.section8.withdrawal": "Droit de retrait du consentement :",

    "privacy.section8.withdrawal.desc": "Retirer votre autorisation à tout moment",

    "privacy.section8.li1": "Accéder à vos données",

    "privacy.section8.li2": "Corriger les données inexactes",

    "privacy.section8.li3": "Demander la suppression (sous réserve de contraintes légales)",

    "privacy.section8.li4": "Retirer le consentement à tout moment",

    "privacy.section8.p2": "Vous pouvez exercer ces droits en contactant support@bricolaltd.com.",

    "privacy.section8.contact": "Vous pouvez exercer ces droits à tout moment en écrivant à support@bricolaltd.com",

    "privacy.section9.title": "9. Transferts Internationaux",

    "privacy.section9.p1": "Si certaines données sont transférées en dehors de l’UE/Royaume-Uni, cela se fait dans un cadre contractuel sécurisé, via des clauses contractuelles types ou des accords avec les prestataires respectant les normes internationales de protection des données.",

    "privacy.section10.title": "10. Mise à Jour de la Politique de Confidentialité",

    "privacy.section10.p1": "Cette politique peut faire l’objet de mises à jour afin de refléter des évolutions techniques, juridiques ou organisationnelles.",

    "privacy.section10.p2": "Les utilisateurs seront informés de toute modification significative par email ou notification via l’application.",

    "privacy.section10.p3": "L’usage continu de la plateforme après modification vaut acceptation tacite de la nouvelle version."

  },
  en: {
    // confirm reservation
    'reservation.recap': 'Recap',
    'reservation.card': 'Credit Card',
    'reservation.back_to_details': 'Back to details',
    'reservation.complete_booking': 'Complete your booking',
    'reservation.rental_period': 'Rental period',
    'reservation.start_date': 'Start date',
    'reservation.select_date': 'Select a date',
    'reservation.end_date': 'End date',
    'reservation.pickup_time': 'Pick-up time',
    'reservation.message_to_owner': 'Message to owner (optional)',
    'reservation.message_placeholder': 'Specify intended use, your questions...',
    'reservation.contact_information': 'Contact information',
    'reservation.confirm': 'Confirm reservation',
    'reservation.payment_method': 'Payment method',
    'reservation.price_per_day': 'Price per day',
    'reservation.number_of_days': 'Number of days',
    'reservation.subtotal': 'Subtotal',
    'reservation.payment_fee': 'Secure payment fee (taxes and charges)',
    'reservation.deposit': "Deposit (refundable)",
    'reservation.total_amount': 'Total amount Due',
    'reservation.included_protection': 'Included protection',
    'reservation.insurance_description': 'Your rental is covered by our insurance against damages.',
    'reservation.confirmation_message': 'By confirming, you agree to our rental terms and cancellation policy.',

    // blog
    'blog.title':'Bricola LTD Blog',
    'blog.description': 'Explore our tips, guides, and news from the world of tools and DIY',
    'blog.popular_categories': 'Popular Categories',
     // blog categories
    'blog.category.gardening': 'Gardening',
    'blog.category.maintenance':   'Maintenance',
    'blog.category.transport':   'Transport',
    'blog.category.diy':   'DIY',
    'blog.category.electricity': 'Electricity',
    'blog.category.lighting':   'Lighting',
    'blog.category.painting':    'Painting',
    'blog.category.construction':'Construction',
    'blog.category.plants':     'Plants',
    'blog.category.cleaning':   'Cleaning',
    'blog.category.decoration':  'Decoration',
    'blog.category.guide':                'Guide',

    // favorites
    'favorites.title': 'My Favorites',
    // ads profile
    'ads.search': 'Search by Listing Title or Category...',
    // General
    'general.first_name': 'First Name',
    'general.first_name_placeholder': 'your first name',
    'general.last_name': 'Last Name',
    'general.last_name_placeholder': 'your last name',
    'general.phone': 'Phone',
    'general.min': 'min',
    'general.modify': 'Modify',
    'general.see': 'See',
    'general.location': 'Location',
    'general.list':'List',
    'general.grid':'Grid',
    'general.published': 'Published',
    'general.unpublished': 'Unpublished',
    'general.view_details': 'View Details',
    'general.pending': 'Pending',
    'general.show': 'Show',
    'general.accepted': 'Accepted',
    'general.ongoing': 'Ongoing',
    'general.completed': 'Completed',
    'general.cancelled': 'Cancelled',
    'general.declined': 'Declined',
    'general.all': 'All',
    'general.all_periods': 'All Periods',
    'general.week': 'This Week',
    'general.month': 'This Month',
    'general.year': 'This Year',
    'general.reset': 'Reset',
    'general.day': 'day',
    'general.by': 'by',
    'general.to': 'To',
    'general.from': 'From',
    'general.cancel': 'Cancel',
    'general.confirm': 'Confirm',
    'general.report': 'Report',
    'general.download_contract': 'Download Contract',
    'general.hide': 'Hide',
    'general.copy': 'Copy',
    'general.reference': 'Reference',
    'general.contact': 'Contact',
    'general.confirmed': 'Confirmed',
    'general.rejected': 'Rejected',

    // bookings
    'booking.title': 'My Reservations',
    'booking.tool_returned': 'Tool Returned',
    'booking.search': 'Search by Listing Title...',
    'booking.verification_code': 'Verification Code',
    'booking.present_code': 'Show this code to the owner when picking up the tool on the first day.',

    // requests
    'request.title': 'My Reservation requests',
    'request.contact': 'Contact',
    'request.search': 'Search by Listing Title',
    'request.all': 'All',
    'request.pending': 'Pending',
    'request.accepted': 'Accepted',
    'request.ongoing': 'Ongoing',
    'request.completed': 'Completed',
    'request.cancelled': 'Cancelled',
    'request.declined': 'Declined',
    'request.all_periods': 'All Periods',
    'request.week': 'This Week',
    'request.month': 'This Month',
    'request.year': 'This Year',
    'request.reset': 'Reset',
    'request.results_found': 'Results Found',
    'request.day': 'day',
    'request.by': 'by',
    'request.reference': 'Reference',
    'request.pickup_time': 'Pick-up Time',
    'request.from': 'From',
    'request.to': 'To',
    'request.accept': 'Accept',
    'request.decline': 'Decline',
    'request.cancel': 'Cancel',
    'request.report': 'Report',
    'request.download_contract': 'Download Contract',
    'request.validation_code': 'Validation Code',
    'request.enter_code': 'Enter Code',
    'request.confirm': 'Confirm',

    // pagination
    'pagination.next': 'Next',
    'pagination.previous': 'Previous',

    // catalog section
    'catalog_section.title': 'Tools Found',
    'catalog_section.by': 'By',
    'catalog_section.category': 'Category',
    'catalog_section.sort_by': 'Sort by',
    'catalog_section.most_recent': 'Most Recent',
    'catalog_section.price_low_to_high': 'Price: Low to High',
    'catalog_section.price_high_to_low': 'Price: High to Low',
    'catalog_section.top_rated': 'Top Rated',
    'catalog_section.filters': 'Filters',
    'catalog_section.search': 'Search',
    'catalog_section.tool_name': 'Tool Name',
    'catalog_section.location': 'Location',
    'catalog_section.all_categories': 'All Categories',
    'catalog_section.sub_category': 'Sub-category',
    'catalog_section.all_sub_categories': 'All Sub-categories',
    'catalog_section.daily_price': 'Daily Price',
    'catalog_section.apply_filters': 'Apply Filters',

    // blog section
    'blog_section.title': 'Latest Blog Articles',
    'blog_section.description': 'Explore our tips, guides, and updates to succeed in all your DIY projects',
    'blog_section.min': 'min',
    'blog_section.read_article': 'Read Article',
    'blog_section.view_all': 'View all articles',

    // customer reviews
    'customer_reviews.title': 'What our users say',
    'customer_reviews.description': 'Find out what our users think about our platform.',

    // rental process
    'rental_process.title': 'How does it work?',
    'rental_process.description': 'Rent your tools in 4 simple steps...',
    'rental_process.step1.title': 'Post your listing in a few clicks',
    'rental_process.step1.description': 'Add your tools with photos and a detailed description in just a few minutes.',
    'rental_process.step2.title': 'Maximize your visibility',
    'rental_process.step2.description': 'Your listing is seen by thousands of users looking for tools.',
    'rental_process.step3.title': 'Receive your first bookings',
    'rental_process.step3.description': 'Renters contact you directly to reserve your tools for the desired dates.',
    'rental_process.step4.title': 'Collect your earnings with peace of mind',
    'rental_process.step4.description': 'Receive your payments securely and generate additional income.',

    // Profile translations
    'profile.first_name': 'First name',
    'profile.last_name': 'Last name',
    'profile.email': 'Email',
    'profile.phone': 'Phone number',
    'profile.country': 'Country',
    'profile.address': 'Address',
    'profile.edit_profile_photo': 'Click on "Edit" to change your profile photo',
    'profile.verified': 'Verified',
    'profile.account_type_individual': 'Individual',
    'profile.account_type_company': 'Company',
    'profile.average_rating': 'Average rating',
    'profile.rentals_completed': 'Rentals completed',
    'profile.active_ads': 'Active ads',
    'profile.total_earnings': 'Total earnings',
    'profile.delete_account': 'Delete my account',
    'profile.back_home': 'Back to home',
    'profile.profile': 'Profile',
    'profile.favorites': 'Favorites',
    'profile.ads': 'Ads',
    'profile.reservations': 'Reservations',
    'profile.requests': 'Requests',
    'profile.wallet': 'Wallet',
    'profile.edit': 'Edit',
    'profile.member_since': 'Member since {date}',
    'profile.select_country': 'Select a country',
    'profile.address_placeholder': 'Enter your full address',
    'profile.address_hint': 'Enter a valid address compatible with Google Maps',
    'profile.delete_confirm': 'Are you sure you want to delete your account?',
    'profile.delete_description': 'This action is irreversible. All your data, ads, reservations, and transaction history will be permanently deleted.',
    'profile.account_deletion_pending': 'Account pending deletion',

    // Wallet translations
    'wallet.title': 'My Wallet',
    'wallet.total': 'Total',
    'wallet.cumulative_balance': 'Cumulative balance',
    'wallet.available': 'Available',
    'wallet.available_balance': 'Available balance',
    'wallet.successful': 'Successful',
    'wallet.successful_transactions': 'Successful transactions',
    'wallet.withdraw_money': 'Withdraw my money',
    'wallet.withdrawal_note': 'You can withdraw your money once your cumulative balance reaches 20 GBP.',
    'wallet.conversion_rate': '20 GBP = {minWithdrawalEUR} EUR',
    'wallet.dynamic_conversion': 'The conversion rate updates dynamically based on the currency selected in the account.',

    // recent transactions
    'wallet.recent_transactions': 'Recent Transactions',
    'wallet.select_time_period': 'Select a time period',
    'wallet.all_transactions': 'All transactions',
    'wallet.incoming_payments': 'Incoming payments',
    'wallet.withdrawal': 'Withdrawal',
    'wallet.reset': 'Reset',
    'wallet.completed': 'Completed',
    'wallet.pending': 'Pending',
    'wallet.failed': 'Failed',

     // New FAQ translations
    'faq.hero.title': 'Frequently Asked Questions',
    'faq.hero.subtitle': 'Find quick answers to your most common questions',
    'faq.title': 'General Questions',
    'faq.general.q1': 'What is Bricola and how does it work?',
    'faq.general.a1': 'Bricola LTD is a peer-to-peer rental platform for tools and equipment. Users can list their tools for rent or rent tools from others. The platform manages transactions, deposits, and dispute resolution.',
    'faq.general.q2': 'What categories of tools can be listed?',
    'faq.general.a2': 'Currently, Bricola supports DIY, gardening, cleaning, and event-related equipment. More categories may be added based on market needs.',
    'faq.general.q3': 'Is there a mobile app for Bricola?',
    'faq.general.a3': 'Yes. Bricola is available on both iOS and Android, in addition to a full-featured web platform.',
    'faq.general.q4': 'Can I use Bricola from any country?',
    'faq.general.a4': 'Currently, Bricola serves users in the Gulf region. Expansion to other regions is planned.',
    'faq.general.q5': 'Can businesses list tools?',
    'faq.general.a5': 'Yes, but Bricola is primarily designed for individual users. Professional listings must comply with local business regulations.',
    'faq.general.q6': 'What items are prohibited?',
    'faq.general.a6': 'Illegal items, hazardous equipment, or tools that violate safety laws are strictly forbidden.',
    'faq.general.q7': 'Can I suggest a feature?',
    'faq.general.a7': 'Yes, we welcome feedback. Contact support with your idea and we’ll consider it for future updates.',
    'faq.general.q8': 'How do I contact customer support?',
    'faq.general.a8': 'Use the WhatsApp chat, or email us at support@bricolaltd.com. Our team is available 7 days a week.',
    'faq.renters.title': 'For Renters',
    'faq.renters.q1': 'How do I create an account?',
    'faq.renters.a1': 'Register with your name, email, phone number, and verification documents if required. You will need to confirm your phone and email.',
    'faq.renters.q2': 'Why is ID verification required?',
    'faq.renters.a2': 'To ensure trust and security, ID verification may be requested before renting out high-value tools or making large withdrawals.',
    'faq.renters.q3': 'What should I do before receiving a tool?',
    'faq.renters.a3': 'Make sure your ID is verified, agree on rental terms with the owner, and inspect the tool upon handover.',
    'faq.renters.q4': 'What if the tool gets damaged during my rental?',
    'faq.renters.a4': 'Inform the owner and support immediately. You may be asked to provide evidence so the issue can be resolved through the deposit.',
    'faq.owners.title': 'For Owners',
    'faq.owners.q1': 'How do I list a tool?',
    'faq.owners.a1': 'Go to "List a Tool", upload clear photos, provide a description, condition, guarantee, price per day, and select the required deposit.',
    'faq.owners.q2': 'What happens after I list my item?',
    'faq.owners.a2': 'It will be reviewed by our moderation team before going live. You’ll be notified when someone makes a booking.',
    'faq.owners.q3': 'Can I reject a booking request?',
    'faq.owners.a3': 'Yes, owners can accept or reject requests. However, excessive rejections without valid reason may affect your visibility.',
    'faq.owners.q4': 'What should I do before handing over my tool?',
    'faq.owners.a4': 'Check the renter’s ID, document the tool’s condition with photos, and agree on return terms.',
    'faq.owners.q5': 'What if the tool is damaged?',
    'faq.owners.a5': 'Submit evidence within 24 hours of return. Bricola will review and decide whether to compensate from the deposit.',
    'faq.owners.q6': 'Is there insurance for listed tools?',
    'faq.owners.a6': 'Currently, Bricola does not offer insurance. Owners are advised to list only tools they can risk renting.',
    'faq.payment.title': 'Payments & Safety',
    'faq.payment.q1': 'How are payments handled?',
    'faq.payment.a1': 'Payments are processed securely via Stripe. Renters pay in advance, including the deposit.',
    'faq.payment.q2': 'What is the security deposit?',
    'faq.payment.a2': 'A refundable amount held by Stripe to cover potential damages or non-return. It’s automatically released upon successful return.',
    'faq.payment.q3': 'How do I withdraw my earnings?',
    'faq.payment.a3': 'You can request a payout to your bank account via Wise.',
    'faq.payment.q4': 'What fees does Bricola charge?',
    'faq.payment.a4': 'Bricola charges a 15% commission on every successful rental. No listing or monthly fees.',
    'faq.payment.q5': 'How are disputes handled?',
    'faq.payment.a5': 'All disputes are handled by our internal support team within 72 hours. Their decision is final.',
    'faq.payment.q6': 'What measures are in place for safety?',
    'faq.payment.a6': 'ID verification, user reviews, secure payments, and support monitoring ensure a safe and trusted environment.',
    // Navigation
    'nav.home': 'Home',
    'nav.catalog': 'Catalogue',
    'nav.navigation': 'navigation',
    'nav.propos': 'About Us',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.rent': 'Rent',
    'nav.list': 'List a tool',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    
    // Hero section
    'hero.title': 'Rent and share your tools with ease',
    'hero.subtitle': 'The platform that connects tool owners with those who need them. Individuals and professionals, find the perfect tool near you.',
    'hero.search.placeholder': 'Search for a tool...',
    'hero.search.location': 'Location',
    'hero.search.button': 'Search',
    'hero.available_tools': 'Tools Available',
    'hero.active_users': 'Active Users',  
    'hero.cities_covered': 'Cities Covered',
    
    // Categories
    'categories.title': 'Our Categories',
    'categories.description': 'Find the perfect tool for your needs',
    'categories.gardening': 'Gardening',
    'categories.cleaning': 'Cleaning',
    'categories.diy': 'DIY',
    'categories.events': 'Event Equipment',
    'categories.transport': 'Transport',
    
    // Tools
    'tools.featured': 'Featured tools',
    'tools.description': 'Top-rated and most requested tools by our community',
    'tools.display_all': 'View All Tools',
    'tools.by': 'by',
    'tools.day': 'day',
    'tools.available': 'Available',
    'tools.rent': 'Rent',
    'tools.details': 'View details',
    'tools.new_ad': 'New ad',
    'tools.my_ads': 'My ads',
    'tools.edit': 'Edit',
    'tools.view': 'View',
    'tools.delete': 'Delete',
    'tools.published': 'Published',
    'tools.unpublished': 'Unpublished',
    'tools.pending': 'Pending',
    'tools.approved': 'Approved',
    'tools.rejected': 'Rejected',
    'tools.back_to_results': 'Back to Results',
    'tools.verified': 'Verified',
    'tools.owner': 'Owner',
    'tools.model': 'Model',
    'tools.brand': 'Brand',
    'tools.year_of_purchase': 'Year of Purchase',
    'tools.fees_and_taxes': 'Including fees and tax',
    'tools.of': 'of',
    'tools.charged': 'charged',
    'tools.deposit': 'Deposit',
    'tools.refunded': '(refunded at the end of rental)',
    'tools.rent_now': 'Rent Now',
    'tools.add_to_favorites': 'Add to Favorites',
    'tools.remove_from_favorites': 'Remove from Favorites',
    'tools.desc': 'Description',
    'tools.instructions': 'Owner\'s Instructions',
    'tools.reviews': 'Renter Reviews',


    // Forms
    'form.first_name': 'First name',
    'form.last_name': 'Last name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.country': 'Country',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm password',
    'form.title': 'Title',
    'form.description': 'Description',
    'form.price': 'Price',
    'form.category': 'Category',
    'form.location': 'Location',
    
    // Actions
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.sort': 'Sort',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.view': 'View',
    'action.contact': 'Contact',
    'action.close': 'Close',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.previous': 'Previous',
    
    // Floating Action Button
    'fab.contact_support': 'Contact support',
    'fab.publish_ad': 'Publish ad',
    'fab.find_tool': 'Find my tool',
    
    // Messages
    'message.success': 'Success',
    'message.error': 'Error',
    'message.loading': 'Loading...',
    'message.no_results': 'No results found',
    'message.confirm_delete': 'Are you sure you want to delete?',
    
    // Footer
    'footer.about': 'About',
    'footer.help': 'Help',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved',
    'footer.cgu': 'Terms',
    'footer.privacy': 'Privacy policy',
    'footer.faq': 'FAQ',
    'footer.description': 'The tool rental platform that connects owners with those who need them. Simple, secure, and local.“www.bricolaltd.com” is a trademark of BRICOLA LTD.Registered in England and Wales under number: 16401372',
    'footer.contrat': 'Rental Agreement', // Added
    'footer.payment': 'Payment Methods', // Added
    'footer.useful_links': 'Useful Links', // Added
    'footer.help_center': 'Help Center', // Added
    'footer.owner_guide': 'Owner’s Guide', // Added
    'footer.renter_guide': 'Renter’s Guide', // Added
    'footer.terms_conditions': 'Terms & Conditions', // Added
    
    // Login
    'login.title': 'Login',
    'login.subtitle': 'Connect to your Bricola LTD account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signin': 'Sign in',
    'login.no_account': 'No account yet? Sign up',
    'login.forgot_password': 'Forgot password?',

    // Register
    'register.title': 'Sign up',
    'register.subtitle': 'Create your Bricola LTD account',
    'register.user_type': 'User type',
    'register.individual': 'Individual',
    'register.business': 'Business',
    'register.first_name': 'First name',
    'register.last_name': 'Last name',
    'register.phone': 'Phone',
    'register.country': 'Country',
    'register.address': 'Address',
    'register.address_help': 'Complete address with postal code and city',
    'register.password': 'Password',
    'register.confirm_password': 'Confirm password',
    'register.terms': 'I accept the terms of use',
    'register.sales_conditions': 'I accept the terms and conditions and sales conditions',
    'register.create_account': 'Create my account',
    'register.have_account': 'Already have an account? Sign in',
    'register.select_country': 'Select a country',

    // About
    'about.title': 'Welcome to Bricola LTD ',
    'about.subtitle': 'Your trusted platform for peer-to-peer tool rentals across the Gulf region',
    'about.mission_title': 'Our Mission',
    'about.mission_1': 'Bricola LTD was founded in 2025 and is registered in the United Kingdom. The idea was born out of a simple but powerful need: many people own tools they rarely use, while others constantly need access to quality equipment without the burden of buying. Our platform bridges this gap by enabling individuals to rent tools from one another safely, affordably, and efficiently.',
    'about.mission_2': 'We specialize in connecting people who need tools for home improvement, gardening, cleaning, and events with local tool owners. Through our easy-to-use app and website, users can list, search, and rent tools within minutes.',
    'about.mission_3': 'At Bricola, we believe in the power of the sharing economy to reduce waste, encourage sustainability, and empower communities. Our service is secure, transparent, and built with user trust at its core. With a robust digital payment system and built-in security features, Bricola ensures that every transaction is smooth and protected.',
    'about.mission_4': 'By choosing Bricola LTD, you’re not only saving money and time – you’re also joining a smarter, greener way to access what you need. We’re proud to be building the future of tool rental in the Gulf.',
    'about.mission_5': ' Thank you for being part of the Bricola community.',
    'about.values_title': 'Our Values',
    'about.community': 'Community',
    'about.community_desc': 'Create connections between neighbors and promote local mutual aid',
    'about.security': 'Security',
    'about.security_desc': 'Guarantee secure transactions and comprehensive insurance',
    'about.quality': 'Quality',
    'about.quality_desc': 'Ensure all tools meet our quality standards',
    'about.simplicity': 'Simplicity',
    'about.simplicity_desc': 'Make tool rental as simple as a click',
    'about.stats_title': 'Bricola in numbers',
    'about.tools_available': 'Tools available',
    'about.active_users': 'Active users',
    'about.cities_covered': 'Cities covered',
    'about.satisfaction': 'Customer satisfaction',
    'about.team_title': 'Our Team',

    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': 'A question, a problem or just want to chat? Our team is here to help you.',
    'contact.form_title': 'Send us a message',
    'contact.first_name': 'First name',
    'contact.last_name': 'Last name',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.email_title': 'Email',
    'contact.phone_title': 'Phone',
    'contact.address_title': 'Address',
    'contact.hours_title': 'Hours',
    'contact.hours_weekdays': 'Monday - Friday: 9:00 AM - 6:00 PM',
    'contact.hours_saturday': 'Saturday: 10:00 AM - 4:00 PM',
    'contact.hours_sunday': 'Sunday: Closed',
    'contact.faq_title': 'Frequently asked questions',
    'contact.how_to_rent': 'How to rent a tool?',
    'contact.how_to_rent_answer': 'Search for the desired tool, select rental dates, and confirm your reservation. It\'s that simple!',
    'contact.problem': 'What to do in case of a problem?',
    'contact.problem_answer': 'Contact us immediately via our customer support. We are here to solve all your problems quickly.',
    'contact.how_to_list': 'How to list my tools?',
    'contact.how_to_list_answer': 'Click on "List a tool" in the navigation, add details and photos of your tool, and start earning money.',
    'contact.insurance': 'Are tools insured?',
    'contact.insurance_answer': 'Yes, all tools rented via Bricola are covered by our comprehensive insurance for your peace of mind.',

    // Add Tool
    'add_tool.title': 'List a tool',
    'add_tool.subtitle': 'Share your tools with the community and generate income by renting them easily',
    'add_tool.info_title': 'Tool information',
    'add_tool.general_info': 'General information',
    'add_tool.ad_title': 'Ad title',
    'add_tool.brand': 'Brand',
    'add_tool.model': 'Model',
    'add_tool.year': 'Purchase year',
    'add_tool.description': 'Description',
    'add_tool.categorization': 'Categorization',
    'add_tool.category': 'Category',
    'add_tool.subcategory': 'Subcategory',
    'add_tool.condition': 'Tool condition',
    'add_tool.pricing': 'Pricing',
    'add_tool.price_per_day': 'Price per day (€)',
    'add_tool.deposit': 'Deposit (€)',
    'add_tool.location_title': 'Location',
    'add_tool.address': 'Address or city',
    'add_tool.photos_title': 'Photos',
    'add_tool.add_photos': 'Add your photos',
    'add_tool.drop_images': 'Drop your images here or click to browse',
    'add_tool.browse_files': 'Browse files',
    'add_tool.file_format': 'PNG, JPG up to 10MB • 5 photos maximum',
    'add_tool.instructions_title': 'Usage instructions',
    'add_tool.owner_instructions': 'Owner instructions',
    'add_tool.publish': 'Publish ad',
    'add_tool.choose_category': 'Choose a category',
    'add_tool.choose_subcategory': 'Choose a subcategory',
    'add_tool.condition_new': '✨ New',
    'add_tool.condition_excellent': '🌟 Excellent',
    'add_tool.condition_good': '👍 Good',
    'add_tool.condition_fair': '👌 Fair',

    // Categories and subcategories
    'category.gardening': 'Gardening',
    'category.gardening.lawn': 'Lawn',
    'category.gardening.soil': 'Soil',
    'category.gardening.wood': 'Wood',
    'category.gardening.tree': 'Tree',
    'category.gardening.leaves': 'Leaves',

    'category.cleaning': 'Cleaning',
    'category.cleaning.fabric': 'Fabric',
    'category.cleaning.water': 'Water',
    'category.cleaning.dust': 'Dust',

    'category.diy': 'DIY',
    'category.diy.construction': 'Construction',
    'category.diy.electricity': 'Electricity',
    'category.diy.painting': 'Painting',
    'category.diy.screws_and_bolts': 'Screws and bolts',

    'category.transport': 'Transport',
    'category.transport.heavy_load': 'Heavy load',
    'category.transport.engine': 'Engine',
    'category.transport.wheel': 'Wheel',

    'category.event': 'Event',
    'category.event.lighting': 'Lighting',
    'category.event.kitchen': 'Kitchen',
    'category.event.entertainment_and_games': 'Entertainment and games',
    'category.event.furniture': 'Furniture',
    'category.event.decoration': 'Decoration',
    'category.event.structure': 'Structure',

    // Common
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.language': 'Language',
    'common.currency': 'Currency',
    'common.menu': 'Menu',
    'common.navigation': 'Navigation',
    'common.home': 'Home',

    // CGU (Terms of Use)

    'cgu.title': 'Terms of Use',

    'cgu.last_updated': 'Last updated: January 1, 2025',

    'cgu.section1.title': '1. Introduction',

    'cgu.section1.p1': 'Bricola LTD is an online peer-to-peer rental platform specialized in tools and equipment for DIY, gardening, cleaning, and event organization.',

    'cgu.section1.p2': 'Bricola acts solely as a trusted intermediary. It does not own, store, transport, or handle any of the rented items.',

  

    'cgu.section2.title': '2. Access to the Platform',

    'cgu.section2.p1': 'Access to the platform is available via web and mobile applications.',

    'cgu.section2.p2': 'The service is reserved for adults (18 years and older) who are legally capable.',

    'cgu.section2.p3': 'Bricola reserves the right to suspend or terminate any user account in case of a breach of these terms, fraudulent activity, or abuse.',

  

    'cgu.section3.title': '3. User Registration and Verification',

    'cgu.section3.li1': 'Registration requires a valid email address, an active phone number, and official identification.',

    'cgu.section3.li2': 'To request withdrawals, users must provide accurate bank account details.',

    'cgu.section3.li3': 'Bricola reserves the right to request identity verification documents (KYC) for high-value transactions.',

    'cgu.section3.li4': 'Account access is strictly personal and non-transferable. Sharing, duplicating, or transferring the account is prohibited.',

  

    'cgu.section4.title': '4. Rental Rules and Responsibilities',

    'cgu.section4.li1': 'Renters agree to return rented items in their original condition.',

    'cgu.section4.li2': 'Owners guarantee that listed items are functional, clean, and compliant with current laws.',

    'cgu.section4.li3': 'In case of disputes, Bricola may require supporting evidence (photos, videos, statements).',

    'cgu.section4.li4': 'Delayed returns may incur penalties calculated hourly or daily.',

    'cgu.section4.li5': 'The rental duration may not exceed 5 consecutive days. Extensions require a new booking on the platform, after availability is confirmed by the owner.',

    'cgu.section4.li6': 'In the event of item loss, the full security deposit may be retained.',

    'cgu.section4.li7': 'Abuse or misuse of equipment may result in permanent account suspension.',

  

    'cgu.section5.title': '5. Payments, Commission & Wallets',

    'cgu.section5.li1': 'All payments are processed via Stripe, in accordance with local financial regulations.',

    'cgu.section5.li2': 'A 5.4% service fee is applied to the renter at checkout. This covers Stripe processing fees and a portion of the platform’s technical costs (hosting, maintenance, updates).',

    'cgu.section5.li3': 'A 15% commission is automatically deducted from each successful transaction.',

    'cgu.section5.li4': 'Owner earnings are credited to an internal wallet and can be withdrawn via Wise when the balance reaches £50.',

    'cgu.section5.li5': 'This threshold helps reduce small withdrawal requests, minimize banking fees, and streamline financial operations.',

    'cgu.section5.li6': 'Bricola is not responsible for delays or external restrictions related to Wise transfers.',

  

    'cgu.section6.title': '6. Security Deposit Policy',

    'cgu.section6.li1': 'Each rental involves a temporary security deposit held via Stripe.',

    'cgu.section6.li2': 'This deposit is released 24 hours after item return, subject to validation.',

    'cgu.section6.li3': 'In case of damage, loss, or dispute, all or part of the deposit may be withheld.',

    'cgu.section6.li4': 'The affected user will be notified by email before any final deduction.',

  

    'cgu.section7.title': '7. Dispute Handling',

    'cgu.section7.li1': 'All disputes must be reported within 24 hours of the scheduled return.',

    'cgu.section7.li2': 'The support team will investigate the case within 72 hours and issue a final decision.',

    'cgu.section7.li3': 'Bricola reserves the right to mediate and apply any financial adjustments it deems necessary.',

    'cgu.section7.li4': 'The decision is considered final and binding for both parties.',

  

    'cgu.section8.title': '8. Fair Use and Platform Integrity',

    'cgu.section8.li1': 'Listings must represent real, legally owned items.',

    'cgu.section8.li2': 'Mass or automated uploading of fake listings is prohibited.',

    'cgu.section8.li3': 'The listing of prohibited items (weapons, hazardous substances, etc.) is strictly forbidden.',

    'cgu.section8.li4': 'Repeat offenders will be permanently banned from the platform.',

  

    'cgu.section9.title': '9. Cancellations & Refund Policy',

    'cgu.section9.li1': 'Renters may cancel and receive a full refund if cancellation is made at least 24 hours before the rental start time.',

    'cgu.section9.li2': 'No refund will be issued for cancellations made within 24 hours of the rental start.',

    'cgu.section9.li3': 'If the owner cancels, the renter will receive a full refund. Repeated cancellations by owners may lead to sanctions.',

  

    'cgu.section10.title': '10. Service Availability & Updates',

    'cgu.section10.li1': 'Occasional service interruptions may occur due to maintenance or updates.',

    'cgu.section10.li2': 'Users will be notified in advance in the case of planned downtime.',

    'cgu.section10.li3': 'Bricola reserves the right to modify or remove certain features without prior notice to optimize user experience.',

  

    'cgu.section11.title': '11. Data Protection and Privacy',

    'cgu.section11.li1': 'Personal data is processed in accordance with GDPR (UK and EU General Data Protection Regulation).',

    'cgu.section11.li2': 'Sensitive data is encrypted and securely stored.',

    'cgu.section11.li3': 'Users may request deletion, modification, or export of their data at any time.',

    'cgu.section11.li4': 'No data will be sold or shared without explicit consent.',

  

    'cgu.section12.title': '12. Jurisdiction and Legal Framework',

    'cgu.section12.li1': 'These terms are governed by English law.',

    'cgu.section12.li2': 'If no amicable solution is found, disputes shall be resolved exclusively by the courts of London.',

    'cgu.section12.li3': 'Any updates to these terms will be notified on the platform. Continued use implies acceptance of the revised terms.',

  

    'cgu.section13.title': '13. Automatic Confirmation in Case of Inactivity',

    'cgu.section13.p': 'In certain cases where a user (renter or owner) does not respond within a reasonable time, Bricola LTD reserves the right to automatically confirm the status of a transaction (delivery or return). This ensures continuity and reliability of service. Users are encouraged to follow up and validate their actions promptly.',

  

    'cgu.section14.title': '14. Modification and Acceptance of Terms',

    'cgu.section14.p1': 'These Terms of Use may be modified at any time to reflect legal, technical, or operational changes.',

    'cgu.section14.p2': 'Users will be notified of any substantial updates.',

    'cgu.section14.p3': 'Continued use of the platform after changes implies acceptance of the new terms.',

  

    'cgu.section15.title': '15. Contact and Official Communication',

    'cgu.section15.p1': 'For questions, complaints, or legal notices related to these terms, users can contact Bricola LTD at: contact@bricolaltd.com',

    'cgu.section15.p2': 'All official communications will be sent to the email address associated with the user account.',

  
  

    // Privacy Policy

    "privacy.title": "Privacy Policy",

    "privacy.last_updated": "Effective Date: September 1, 2025",

    "privacy.section1.title": "1. Introduction",

    "privacy.section1.p1": "Bricola LTD is committed to protecting your privacy and handling your data in compliance with applicable UK and EU data protection laws (GDPR).",

    "privacy.section1.p2": "We are committed to processing your information in accordance with the General Data Protection Regulation (GDPR) applicable in the United Kingdom and the European Union.",

    "privacy.section1.p3": "This policy explains what personal data we collect, why we collect it, and how we use it.",

    "privacy.section2.title": "2. Data We Collect",

    "privacy.section2.p1": "As part of using our platform, we collect the following data:",

    "privacy.section2.identification": "Identification information:",

    "privacy.section2.identification.li1": "Name, phone number, email address",

    "privacy.section2.account": "Account information:",

    "privacy.section2.account.li1": "Username, password",

    "privacy.section2.payment": "Payment information:",

    "privacy.section2.payment.li1": "IBAN details for Wise payouts, we do not collect any other payment information except the IBAN",

    "privacy.section2.technical": "Technical information:",

    "privacy.section2.technical.li1": "IP address, browser type, operating system, approximate geolocation",

    "privacy.section2.usage": "Usage data:",

    "privacy.section2.usage.li1": "Clicks, page visits, search queries performed on the platform",

    "privacy.section3.title": "3. How We Use Your Data",

    "privacy.section3.p1": "Your personal data is used for the following purposes:",

    "privacy.section3.li1": "Creating, managing and securing your user account",

    "privacy.section3.li2": "Processing payments and securing rental transactions",

    "privacy.section3.li3": "Identity verification and regulatory compliance",

    "privacy.section3.li4": "Customer support, dispute management and complaint handling",

    "privacy.section3.li5": "Continuous platform improvement, fraud detection and usage behavior analysis",

    "privacy.section4.title": "4. Legal Basis for Processing",

    "privacy.section4.p1": "We process personal data based on user consent, legitimate interest, and legal obligations (e.g., fraud prevention).",

    "privacy.section4.consent": "Your explicit consent, particularly during registration or submission of personal information",

    "privacy.section4.interest": "Our legitimate interest, to ensure the security of our services and their continuous improvement",

    "privacy.section4.legal": "Our legal obligations, regarding fraud prevention or compliance with financial and tax regulations",

    "privacy.section5.title": "5. Sharing Data With Third Parties",

    "privacy.section5.p1": "We only share necessary data with:",

    "privacy.section5.li1": "Payment processors (Wise)",

    "privacy.section5.li2": "Hosting providers and platform security partners",

    "privacy.section5.li3": "Authorities if required by law",

    "privacy.section5.li4": "We do not sell personal data under any circumstances.",

    "privacy.section6.title": "6. Data Retention",

    "privacy.section6.p1": "We retain your data for as long as your account is active or as needed to comply with legal obligations.",

    "privacy.section6.p2": "Inactive accounts may be anonymized or deleted after 3 years of inactivity.",

    "privacy.section7.title": "7. Data Security",

    "privacy.section7.p1": "We implement strong encryption and access controls to protect your data.",

    "privacy.section7.p2": "Data is stored in secure servers in the EU/UK region.",

    "privacy.section8.title": "8. Your Rights",

    "privacy.section8.p1": "In accordance with GDPR, you have the following rights:",

    "privacy.section8.access": "Right of access:",

    "privacy.section8.access.desc": "Obtain a copy of your personal data",

    "privacy.section8.rectification": "Right of rectification:",

    "privacy.section8.rectification.desc": "Correct any inaccurate or outdated data",

    "privacy.section8.erasure": "Right to erasure:",

    "privacy.section8.erasure.desc": "Request deletion of your data (within legal limits)",

    "privacy.section8.withdrawal": "Right to withdraw consent:",

    "privacy.section8.withdrawal.desc": "Withdraw your authorization at any time",

    "privacy.section8.li1": "Access your data",

    "privacy.section8.li2": "Correct inaccurate data",

    "privacy.section8.li3": "Request deletion (subject to legal constraints)",

    "privacy.section8.li4": "Withdraw consent at any time",

    "privacy.section8.p2": "You may exercise these rights by contacting support@bricolaltd.com.",

    "privacy.section8.contact": "You can exercise these rights at any time by writing to support@bricolaltd.com",

    "privacy.section9.title": "9. International Transfers",

    "privacy.section9.p1": "Data transfers outside the UK/EU are safeguarded by contractual clauses and agreements with service providers.",

    "privacy.section10.title": "10. Updates to This Policy",

    "privacy.section10.p1": "We may update this privacy policy from time to time.",

    "privacy.section10.p2": "You will be notified by email or in-app notice.",

    "privacy.section10.p3": "Continued use of our services implies acceptance of the updated terms."
  },
  ar: {
     // confirm reservation
     'reservation.recap':'ملخص',
     'reservation.card': 'بطاقة ائتمان',
    'reservation.back_to_details': 'العودة إلى التفاصيل',
    'reservation.complete_booking': 'إتمام الحجز',
    'reservation.rental_period': 'مدة الإيجار',
    'reservation.start_date': 'تاريخ البدء',
    'reservation.select_date': 'اختر تاريخًا',
    'reservation.end_date': 'تاريخ الانتهاء',
    'reservation.pickup_time': 'وقت الاستلام',
    'reservation.message_to_owner': 'رسالة إلى المالك (اختياري)',
    'reservation.message_placeholder': 'حدد الغرض من الاستخدام أو اطرح أسئلتك...',
    'reservation.contact_information': 'معلومات الاتصال',
    'reservation.confirm': 'تأكيد الحجز',
    'reservation.payment_method': 'طريقة الدفع',
    'reservation.price_per_day': 'سعر اليوم',
    'reservation.number_of_days': 'عدد الأيام',
    'reservation.subtotal': 'الإجمالي الفرعي',
    'reservation.payment_fee': 'رسوم الدفع الآمن (الضرائب والرسوم)',
    'reservation.deposit': "الضمان (قابل للاسترداد)",
    'reservation.total_amount': 'الإجمالي المستحق',
    'reservation.included_protection': 'الحماية مشمولة',
    'reservation.insurance_description': 'إيجارك محمي بتأمين ضد الأضرار.',
    'reservation.confirmation_message': 'بتأكيد الحجز، فإنك توافق على شروط الإيجار وسياسة الإلغاء الخاصة بنا.',

     // blog
    'blog.title':'مدونة بريكولا المحدودة',
    'blog.description': 'اكتشف نصائحنا، وأدلّتنا، وآخر الأخبار في عالم الأدوات والأعمال اليدوية',
    'blog.popular_categories': 'الفئات الشائعة',
     // blog categories
    'blog.category.gardening': 'البستنة',
    'blog.category.maintenance':   'الصيانة',
    'blog.category.transport':   'النقل',
    'blog.category.diy':   'الأعمال اليدوية',
    'blog.category.electricity': 'الكهرباء',
    'blog.category.lighting':   'الإضاءة',
    'blog.category.painting':    'الطلاء',
    'blog.category.construction':'البناء',
    'blog.category.plants':     'النباتات',
    'blog.category.cleaning':   'التنظيف',
    'blog.category.decoration':  'الديكور',
    'blog.category.guide':                'دليل',


    // favorites
    'favorites.title': 'قائمة المفضلات',
    // ads profile
    'ads.search': 'ابحث بواسطة عنوان الإعلان أو الفئة...',
    // General
    'general.first_name': 'الاسم',
    'general.first_name_placeholder': 'اسمك',
    'general.last_name': 'اسم العائلة',
    'general.last_name_placeholder': 'اسم العائلة',
    'general.phone': 'رقم الهاتف',

    'general.min': 'دقيقة',
    'general.modify': 'تعديل',
    'general.see': 'عرض',
    'general.location': 'موقع',

    'general.list': 'قائمة',
    'general.grid': 'شبكة',
    'general.published': 'تم النشر',
    'general.unpublished': 'غير منشور',
    'general.view_details': 'عرض التفاصيل',
    'general.pending': 'قيد الانتظار',
    'general.show': 'عرض',
    'general.accepted': 'مقبولة',
    'general.ongoing': 'جارية',
    'general.completed': 'مكتملة',
    'general.cancelled': 'ملغاة',
    'general.declined': 'مرفوضة',
    'general.all': 'جميع',
    'general.all_periods': 'جميع الفترات',
    'general.week': 'هذا الأسبوع',
    'general.month': 'هذا الشهر',
    'general.year': 'هذا العام',
    'general.reset': 'إعادة تعيين',
    'general.day': 'يوم',
    'general.by': 'بواسطة',
    'general.to': 'إلى',
    'general.from': 'من',
    'general.cancel': 'إلغاء',
    'general.confirm': 'تأكيد',
    'general.report': 'الإبلاغ',
    'general.download_contract': 'تحميل العقد',
    'general.hide': 'إخفاء',
    'general.copy': 'نسخ',
    'general.reference': 'رقم المرجع',
    'general.contact': 'اتصل',
    'general.confirmed': 'تم التأكيد',
    'general.rejected': 'مرفوض',

    // bookings
    'booking.title': 'حجوزاتي',
    'booking.tool_returned': 'تم إرجاع الأداة',
    'booking.search': 'ابحث بواسطة عنوان الإعلان...',
    'booking.verification_code': 'رمز التحقق',
    'booking.present_code': 'قدم هذا الرمز للمالك عند استلام الأداة في اليوم الأول.',

    // requests
    'request.title': 'طلبات الحجز الخاصة بي',
    'request.contact': 'اتصل',
    'request.search': 'ابحث بواسطة عنوان الإعلان',
    'request.all': 'الكل',
    'request.pending': 'قيد الانتظار',
    'request.accepted': 'مقبولة',
    'request.ongoing': 'جارية',
    'request.completed': 'مكتملة',
    'request.cancelled': 'ملغاة',
    'request.declined': 'مرفوضة',
    'request.all_periods': 'جميع الفترات',
    'request.this_week': 'هذا الأسبوع',
    'request.this_month': 'هذا الشهر',
    'request.this_year': 'هذا العام',
    'request.reset': 'إعادة تعيين',
    'request.results_found': 'طلبات تم العثور عليها',
    'request.day': 'يوم',
    'request.by': 'بواسطة',
    'request.reference': 'رقم المرجع',
    'request.pickup_time': 'وقت الاستلام',
    'request.from': 'من',
    'request.to': 'إلى',
    'request.accept': 'قبول',
    'request.decline': 'رفض',
    'request.cancel': 'إلغاء',
    'request.report': 'الإبلاغ',
    'request.download_contract': 'تحميل العقد',
    'request.validation_code': 'رمز التحقق',
    'request.enter_code': 'أدخل الرمز',
    'request.confirm': 'تأكيد',

    // pagination
    'pagination.next': 'التالي',
    'pagination.previous': 'السابق',

    // catalog section
    'catalog_section.title': 'أداة معثور عليها',
    'catalog_section.category': 'الفئة',
    'catalog_section.sort_by': 'ترتيب حسب',
    'catalog_section.most_recent': 'الأحدث',
    'catalog_section.price_low_to_high': 'السعر: من الأدنى إلى الأعلى',
    'catalog_section.price_high_to_low': 'السعر: من الأعلى إلى الأدنى ',
    'catalog_section.top_rated': 'الأعلى تقييمًا',
    'catalog_section.filters': 'المرشحات',
    'catalog_section.search': 'البحث',
    'catalog_section.tool_name': 'اسم الأداة',
    'catalog_section.location': 'الموقع',
    'catalog_section.all_categories': 'جميع الفئات',
    'catalog_section.sub_category': 'فئة فرعية',
    'catalog_section.all_sub_categories': 'جميع الفئات الفرعية',
    'catalog_section.daily_price': 'السعر اليومي',
    'catalog_section.apply_filters': 'بحث',
    'catalog_section.by': 'بواسطة',
    


    // blog section
    'blog_section.title': 'أحدث مقالات المدونة',
    'blog_section.description': 'اكتشف نصائحنا وأدلتنا وآخر الأخبار لإنجاح جميع مشاريعك في الأشغال اليدوية',
    'blog_section.min': 'دقيقة',
    'blog_section.read_article': 'قراءة المقال',
    'blog_section.view_all': 'عرض جميع المقالات',

     // customer reviews
    'customer_reviews.title': 'آراء عملائنا',
    'customer_reviews.description': 'اكتشف آراء مستخدمينا حول المنصة',

    // rental process
    'rental_process.title': 'كيف يعمل النظام؟',
    'rental_process.description': 'أجر أدواتك في 4 خطوات بسيطة',
    'rental_process.step1.title': 'أنشر إعلانك ببضع نقرات',
    'rental_process.step1.description': 'أضف أدواتك مع الصور والوصف المفصل  في دقائق معدودة.',
    'rental_process.step2.title': 'زد من ظهور إعلانك',
    'rental_process.step2.description': 'إعلانك مرئي لآلاف المستخدمين الباحثين عن الأدوات.',
    'rental_process.step3.title': 'استقبل أولى الحجوزات',
    'rental_process.step3.description': 'يتواصل معك المستأجرون مباشرةً لحجز أدواتك في التواريخ المطلوبة.',
    'rental_process.step4.title': 'احصل على أرباحك بأمان',
    'rental_process.step4.description': 'استلم دفعاتك بأمان وحقق دخلاً إضافياً.',

    // Wallet translations
    'wallet.title': 'محفظتي',
    'wallet.total': 'الإجمالي',
    'wallet.cumulative_balance': 'الرصيد الإجمالي',
    'wallet.available': 'متاح',
    'wallet.available_balance': 'الرصيد المتاح',
    'wallet.successful': 'ناجحة',
    'wallet.successful_transactions': 'المعاملات الناجحة',
    'wallet.withdraw_money': 'سحب أموالي',
    'wallet.withdrawal_note': 'يمكنك سحب أموالك بمجرد أن يصل رصيدك الإجمالي إلى 20 جنيهًا إسترلينيًا.',
    'wallet.conversion_rate': '20 جنيه إسترليني = {minWithdrawalEUR} يورو',
    'wallet.dynamic_conversion': 'يتم تحديث سعر الصرف تلقائيًا حسب العملة المختارة في الحساب.',

    // recent transactions
    'wallet.recent_transactions': 'المعاملات الأخيرة',
    'wallet.select_time_period': 'اختر فترة زمنية',
    'wallet.all_transactions': 'جميع المعاملات',
    'wallet.incoming_payments': 'المدفوعات الواردة',
    'wallet.withdrawal': 'السحب',
    'wallet.reset': 'إعادة تعيين',
    'wallet.completed': 'مكتملة',
    'wallet.pending': 'قيد الانتظار',
    'wallet.failed': 'فشلت',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.catalog': 'الكتالوج',
    'nav.navigation': 'التصفح',
    'nav.propos': 'من نحن',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.rent': 'استئجار',
    'nav.list': 'إضافة أداة',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    
    // Hero section
    'hero.title': 'استأجر وشارك أدواتك بسهولة',
    'hero.subtitle': 'المنصة التي تربط أصحاب الأدوات مع من يحتاجونها. أفراد ومحترفون، اعثر على الأداة المثالية بالقرب منك.',
    'hero.search.placeholder': 'البحث عن أداة...',
    'hero.search.location': 'الموقع',
    'hero.search.button': 'بحث',
    'hero.available_tools': 'أداة متاحة',
    'hero.active_users': 'مستخدم نشط',
    'hero.cities_covered': 'مدينة مشمولة',

    // New FAQ translations
    'faq.hero.title': 'الأسئلة الشائعة',
    'faq.hero.subtitle': 'اعثر على إجابات سريعة لأسئلتك الأكثر شيوعًا',
    'faq.title': 'أسئلة عامة',
    'faq.general.q1': 'ما هي Bricola وكيف تعمل؟',
    'faq.general.a1': 'Bricola LTD هي منصة تأجير أدوات ومعدات بين الأفراد. يمكن للمستخدمين عرض أدواتهم للإيجار أو استئجار أدوات من الآخرين. تتولى المنصة إدارة المعاملات، والودائع (التأمينات)، وحل النزاعات.',
    'faq.general.q2': 'ما هي فئات الأدوات التي يمكن عرضها؟',
    'faq.general.a2': 'حاليًا، تدعم Bricola أدوات ومعدات الأعمال اليدوية، والبستنة، والتنظيف، والمناسبات. يمكن إضافة فئات أخرى لاحقًا حسب احتياجات السوق.',
    'faq.general.q3': 'هل يوجد تطبيق مخصص لـ Bricola؟',
    'faq.general.a3': 'نعم، Bricola متاحة على كل من أنظمة iOS وAndroid، بالإضافة إلى منصة ويب شاملة.',
    'faq.general.q4': 'هل يمكنني استخدام Bricola من أي دولة؟',
    'faq.general.a4': 'حاليًا، تقتصر خدمات Bricola على منطقة الخليج، مع وجود خطط للتوسع إلى مناطق أخرى مستقبلًا.',
    'faq.general.q5': 'هل يمكن للشركات عرض أدواتها؟',
    'faq.general.a5': 'نعم، ولكن Bricola مصممة أساسًا للأفراد. يجب على المستخدمين المحترفين الالتزام بالقوانين واللوائح المحلية الخاصة بالأعمال.',
    'faq.general.q6': 'ما هي العناصر الممنوعة؟',
    'faq.general.a6': 'يُمنع تمامًا عرض أو تأجير العناصر غير القانونية، أو المعدات الخطرة، أو الأدوات التي تنتهك قوانين السلامة.',
    'faq.general.q7': 'هل يمكنني اقتراح ميزة جديدة؟',
    'faq.general.a7': 'نعم، نرحب بجميع الاقتراحات. يمكنك التواصل مع الدعم الفني بمقترحك، وسنقوم بدراسته للتحديثات المستقبلية.',
    'faq.general.q8': 'كيف يمكنني التواصل مع خدمة العملاء؟',
    'faq.general.a8': 'يمكنك استخدام دردشة WhatsApp، أو مراسلتنا عبر البريد الإلكتروني: support@bricolaltd.com. فريقنا متاح طوال أيام الأسبوع.',
    'faq.renters.title': 'للمستأجرين',
    'faq.renters.q1': 'كيف أنشئ حسابًا؟',
    'faq.renters.a1': 'سجّل باسمك، وبريدك الإلكتروني، ورقم هاتفك، وقد يُطلب منك تقديم مستندات للتحقق من الهوية. ستحتاج أيضًا إلى تأكيد بريدك الإلكتروني ورقم هاتفك.',
    'faq.renters.q2': 'لماذا يُطلب التحقق من الهوية؟',
    'faq.renters.a2': 'لضمان الأمان والثقة على المنصة، قد يُطلب التحقق من الهوية قبل استئجار أدوات عالية القيمة أو سحب مبالغ كبيرة.',
    'faq.renters.q3': 'ماذا يجب أن أفعل قبل استلام الأداة؟',
    'faq.renters.a3': 'تأكد من التحقق من هويتك، واتفق مع المالك على شروط الإيجار، وافحص الأداة عند استلامها.',
    'faq.renters.q4': 'ماذا لو تعرضت الأداة للتلف أثناء فترة الإيجار؟',
    'faq.renters.a4': 'أخطر المالك وفريق الدعم فورًا. قد يُطلب منك تقديم أدلة لمعالجة المشكلة من خلال مبلغ التأمين.',
    'faq.owners.title': 'لأصحاب الأدوات',
    'faq.owners.q1': 'كيف أعرض أداة للإيجار؟',
    'faq.owners.a1': 'انتقل إلى "عرض أداة"، وقم برفع صور واضحة، وأضف وصفًا للحالة، والضمانات إن وُجدت، وسعر الإيجار اليومي، وحدد مبلغ التأمين المطلوب.',
    'faq.owners.q2': 'ماذا يحدث بعد أن أُدرج أداتي؟',
    'faq.owners.a2': 'سيتم مراجعة الإعلان من قبل فريق الإشراف قبل أن يظهر للمستخدمين. سيتم إشعارك عند قيام أحدهم بالحجز.',
    'faq.owners.q3': 'هل يمكنني رفض طلب الحجز؟',
    'faq.owners.a3': 'نعم، يمكنك قبول أو رفض أي طلب. لكن تكرار الرفض دون أسباب مقنعة قد يؤثر على ظهور أدواتك على المنصة.',
    'faq.owners.q4': 'ماذا يجب أن أفعل قبل تسليم الأداة؟',
    'faq.owners.a4': 'تحقق من هوية المستأجر، وثق حالة الأداة بالصور، واتفق معه على شروط الإرجاع.',
    'faq.owners.q5': 'ماذا أفعل إذا تضررت أداتي؟',
    'faq.owners.a5': 'أرسل الأدلة خلال 24 ساعة من استرجاع الأداة. ستقوم Bricola بمراجعة الحالة وقد تُصدر تعويضًا من مبلغ التأمين.',
    'faq.owners.q6': 'هل توجد تأمينات على الأدوات المعروضة؟',
    'faq.owners.a6': 'حاليًا، لا توفر Bricola تأمينًا. ننصح بعرض الأدوات التي يمكنك تحمل تأجيرها في حال حدوث أي ضرر.',
    'faq.payment.title': 'الدفع والسلامة',
    'faq.payment.q1': 'كيف تتم معالجة عملية الدفع؟',
    'faq.payment.a1': 'تتم جميع الدفعات بأمان من خلال نظام Stripe. يدفع المستأجر مقدمًا، بما في ذلك مبلغ التأمين.',
    'faq.payment.q2': 'ما هو مبلغ التأمين؟',
    'faq.payment.a2': 'هو مبلغ قابل للاسترداد تحتفظ به Stripe لتغطية أي أضرار أو حالات عدم الإرجاع. يُعاد تلقائيًا بعد استرجاع الأداة بنجاح.',
    'faq.payment.q3': 'كيف أسحب أرباحي؟',
    'faq.payment.a3': 'يمكنك طلب تحويل أرباحك إلى حسابك البنكي من خلال خدمة Wise.',
    'faq.payment.q4': 'ما هي الرسوم التي تفرضها Bricola؟',
    'faq.payment.a4': 'تتقاضى Bricola عمولة بنسبة 15% على كل عملية تأجير ناجحة. لا توجد رسوم على الإدراج أو اشتراكات شهرية.',
    'faq.payment.q5': 'كيف يتم التعامل مع النزاعات؟',
    'faq.payment.a5': 'يتم حل جميع النزاعات من خلال فريق الدعم الداخلي خلال 72 ساعة. القرار الصادر يعتبر نهائيًا.',
    'faq.payment.q6': 'ما هي تدابير السلامة المطبقة؟',
    'faq.payment.a6': 'التحقق من الهوية، تقييمات المستخدمين، المدفوعات الآمنة، ومتابعة مستمرة من فريق الدعم لضمان بيئة موثوقة وآمنة.',
    // Categories
    'categories.title': 'الفئات المتوفرة',
    'categories.description':'ابحث عن الأداة المناسبة حسب احتياجك',
    'categories.gardening': 'البستنة',
    'categories.cleaning': 'التنظيف',
    'categories.diy': 'الأشغال  اليدوية',
    'categories.events': 'معدات الحفلات',
    'categories.transport': 'النقل',
    
    // Tools
    'tools.featured': 'الأدوات المميزة',
    'tools.description': 'الأدوات الأعلى تقييماً والأكثر طلباً من مجتمعنا',
    'tools.by': 'بواسطة',
    'tools.display_all': 'عرض جميع الأدوات',
    'tools.day': 'يوم',
    'tools.available': 'متاح',
    'tools.rent': 'استئجار',
    'tools.details': 'عرض التفاصيل',
    'tools.new_ad': 'إعلان جديد',
    'tools.my_ads': 'إعلاناتي',
    'tools.edit': 'تعديل',
    'tools.view': 'عرض',
    'tools.delete': 'حذف',
    'tools.published': 'منشور',
    'tools.unpublished': 'غير منشور',
    'tools.pending': 'في الانتظار',
    'tools.approved': 'مُوافق عليه',
    'tools.rejected': 'مرفوض',
    'tools.back_to_results': 'الرجوع إلى النتائج',
    'tools.verified': 'موثق',
    'tools.owner': 'المؤجر',
    'tools.model': 'لطراز',
    'tools.brand': 'العلامة التجارية',
    'tools.year_of_purchase': 'سنة الشراء',
    'tools.fees_and_taxes':'يشمل الضرائب والرسوم',
    'tools.of': 'من',
    'tools.charged': 'التي يحددها المؤجر',
    'tools.deposit': 'تأمين',
    'tools.refunded': '(يُسترد عند نهاية الإيجار)',
    'tools.rent_now': 'استأجر الآن',
    'tools.add_to_favorites': 'أضف إلى قائمة المفضّلات',
    'tools.remove_from_favorites': 'إزالة من قائمة المفضّلات',
    'tools.desc': 'الوصف',
    'tools.instructions': 'تعليمات المؤجر',
    'tools.reviews': 'تقييمات المستأجرين',

    // Profile translations
    'profile.first_name': 'الاسم',
    'profile.last_name': 'اللقب',
    'profile.email': 'البريد الإلكتروني',
    'profile.phone': 'رقم الهاتف',
    'profile.country': 'البلد',
    'profile.address': 'العنوان',
    'profile.edit_profile_photo': 'انقر على "تعديل" لتغيير صورة ملفك الشخصي',
    'profile.verified': 'موثّق',
    'profile.account_type_individual': 'شخصي',
    'profile.account_type_company': 'شركة',
    'profile.average_rating': 'متوسط التقييم',
    'profile.rentals_completed': 'عمليات الإيجار المنجزة',
    'profile.active_ads': 'الإعلانات المنشورة',
    'profile.total_earnings': 'الأرباح الإجمالية',
    'profile.delete_account': 'حذف حسابي',
    'profile.back_home': 'العودة للرئيسية',
    'profile.profile': 'الملف الشخصي',
    'profile.favorites': 'المفضلة',
    'profile.ads': 'الإعلانات',
    'profile.reservations': 'الحجوزات',
    'profile.requests': 'الطلبات',
    'profile.wallet': 'المحفظة',
    'profile.edit': 'تعديل',
    'profile.member_since': 'عضو منذ {date}',
    'profile.select_country': 'اختر بلداً',
    'profile.address_placeholder': 'أدخل عنوانك الكامل',
    'profile.address_hint': 'أدخل عنوانًا صالحًا متوافقًا مع خرائط Google',
    'profile.delete_confirm': 'هل أنت متأكد من حذف حسابك؟',
    'profile.delete_description': 'هذا الإجراء لا رجعة فيه. سيتم حذف جميع بياناتك، إعلاناتك، حجوزاتك، وسجل معاملاتك نهائيًا.',
    'profile.account_deletion_pending': 'الحساب في انتظار الحذف',
    
    // Forms
    'form.first_name': 'الاسم الأول',
    'form.last_name': 'الاسم الأخير',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'الهاتف',
    'form.address': 'العنوان',
    'form.country': 'البلد',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.title': 'العنوان',
    'form.description': 'الوصف',
    'form.price': 'السعر',
    'form.category': 'الفئة',
    'form.location': 'الموقع',
    
    // Actions
    'action.search': 'بحث',
    'action.filter': 'تصفية',
    'action.sort': 'ترتيب',
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'action.confirm': 'تأكيد',
    'action.delete': 'حذف',
    'action.edit': 'تعديل',
    'action.view': 'عرض',
    'action.contact': 'اتصال',
    'action.close': 'إغلاق',
    'action.back': 'رجوع',
    'action.next': 'التالي',
    'action.previous': 'السابق',
    
    // Floating Action Button
    'fab.contact_support': 'اتصل بالدعم',
    'fab.publish_ad': 'نشر إعلان',
    'fab.find_tool': 'البحث عن أداة',
    
    // Messages
    'message.success': 'نجح',
    'message.error': 'خطأ',
    'message.loading': 'جاري التحميل...',
    'message.no_results': 'لم يتم العثور على نتائج',
    'message.confirm_delete': 'هل أنت متأكد من الحذف؟',
    
    // Footer
    'footer.about': 'حول',
    'footer.help': 'مساعدة',
    'footer.contact': 'اتصال',
    'footer.legal': 'قانوني',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.cgu': 'الشروط',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.description': 'المنصة التي تربط أصحاب الأدوات بمن يحتاجون إليها. بسيطة، آمنة، ومحلية« www.bricolaltd.com » هي علامة تجارية تابعة لشركة « BRICOLA LTD »مسجلة في إنجلترا وويلز تحت الرقم: 16401372',
    'footer.contrat': 'عقد الإيجار', // Added
    'footer.payment': 'وسائل الدفع', // Added
    'footer.useful_links': 'روابط مفيدة', // Added
    'footer.help_center': 'مركز المساعدة', // Added
    'footer.owner_guide': 'دليل المؤجر', // Added
    'footer.renter_guide': 'دليل المستأجر', // Added
    'footer.terms_conditions': 'الشروط والأحكام', // Added
    // Login
    'login.title': 'تسجيل الدخول',
    'login.subtitle': 'اتصل بحسابك في Bricola LTD',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.signin': 'تسجيل الدخول',
    'login.no_account': 'ليس لديك حساب؟ إنشاء حساب',
    'login.forgot_password': 'نسيت كلمة المرور؟',

    // Register
    'register.title': 'إنشاء حساب',
    'register.subtitle': 'أنشئ حسابك في Bricola LTD',
    'register.user_type': 'نوع المستخدم',
    'register.individual': 'فرد',
    'register.business': 'شركة',
    'register.first_name': 'الاسم الأول',
    'register.last_name': 'الاسم الأخير',
    'register.phone': 'الهاتف',
    'register.country': 'البلد',
    'register.address': 'العنوان',
    'register.address_help': 'العنوان الكامل مع الرمز البريدي والمدينة',
    'register.password': 'كلمة المرور',
    'register.confirm_password': 'تأكيد كلمة المرور',
    'register.terms': 'أوافق على شروط الاستخدام',
    'register.sales_conditions': 'أوافق على الشروط والأحكام وشروط البيع',
    'register.create_account': 'إنشاء حسابي',
    'register.have_account': 'لديك حساب بالفعل؟ تسجيل الدخول',
    'register.select_country': 'اختر بلداً',

    // About
    'about.title': 'مرحبًا بكم في Bricola LTD',
    'about.subtitle': ' منصتكم الموثوقة لتأجير الأدوات بين الأفراد في منطقة الخليج',
    'about.mission_title': 'مهمتنا',
    'about.mission_1': 'تأسست شركة Bricola LTD في عام 2025 ومسجلة في المملكة المتحدة. وُلدت فكرتها من حاجة بسيطة لكنها جوهرية: كثير من الأشخاص يمتلكون أدوات نادرًا ما يستخدمونها، بينما يحتاج آخرون إلى أدوات عالية الجودة بشكل متكرر دون الرغبة في شرائها. منصتنا تسد هذه الفجوة من خلال تمكين الأفراد من تأجير الأدوات فيما بينهم بطريقة آمنة، واقتصادية، وفعّالة.',
    'about.mission_2': 'نحن نُخصص خدماتنا لربط الأشخاص الذين يحتاجون أدوات لأعمال الصيانة المنزلية، أو البستنة، أو التنظيف، أو المناسبات، بأصحاب الأدوات المحليين. من خلال تطبيقنا وموقعنا الإلكتروني السهل الاستخدام، يمكن للمستخدمين عرض الأدوات أو البحث عنها وتأجيرها خلال دقائق.',
    'about.mission_3': 'في Bricola، نؤمن بقوة الاقتصاد التشاركي في الحد من الهدر، وتشجيع الاستدامة، وتمكين المجتمعات. خدماتنا آمنة وشفافة، ومبنية على ثقة المستخدمين. ومع نظام دفع رقمي متكامل وميزات أمان مدمجة، تضمن Bricola أن تكون كل معاملة سلسة ومحمية.',
    'about.mission_4': 'عند اختيارك لـ Bricola LTD، فأنت لا توفر المال والوقت فحسب، بل تنضم أيضًا إلى طريقة أذكى وأكثر استدامة للحصول على ما تحتاجه. نفخر بأننا نُسهم في بناء مستقبل تأجير الأدوات في منطقة الخليج.',
    'about.mission_5': 'شكرًا لكونك جزءًا من مجتمع Bricola.',
    'about.values_title': 'قيمنا',
    'about.community': 'المجتمع',
    'about.community_desc': 'إنشاء روابط بين الجيران وتعزيز التعاون المحلي',
    'about.security': 'الأمان',
    'about.security_desc': 'ضمان المعاملات الآمنة والتأمين الشامل',
    'about.quality': 'الجودة',
    'about.quality_desc': 'التأكد من أن جميع الأدوات تلبي معايير الجودة لدينا',
    'about.simplicity': 'البساطة',
    'about.simplicity_desc': 'جعل تأجير الأدوات بسيط كالنقر على زر',
    'about.stats_title': 'Bricola في الأرقام',
    'about.tools_available': 'الأدوات المتاحة',
    'about.active_users': 'المستخدمون النشطون',
    'about.cities_covered': 'المدن المغطاة',
    'about.satisfaction': 'رضا العملاء',
    'about.team_title': 'فريقنا',

    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'لديك سؤال أو مشكلة أو تريد التحدث؟ فريقنا هنا لمساعدتك.',
    'contact.form_title': 'أرسل لنا رسالة',
    'contact.first_name': 'الاسم الأول',
    'contact.last_name': 'الاسم الأخير',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.email_title': 'البريد الإلكتروني',
    'contact.phone_title': 'الهاتف',
    'contact.address_title': 'العنوان',
    'contact.hours_title': 'ساعات العمل',
    'contact.hours_weekdays': 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً',
    'contact.hours_saturday': 'السبت: 10:00 صباحاً - 4:00 مساءً',
    'contact.hours_sunday': 'الأحد: مغلق',
    'contact.faq_title': 'الأسئلة الشائعة',
    'contact.how_to_rent': 'كيفية استئجار أداة؟',
    'contact.how_to_rent_answer': 'ابحث عن الأداة المطلوبة، اختر تواريخ الاستئجار، وأكد حجزك. الأمر بهذه البساطة!',
    'contact.problem': 'ماذا أفعل في حالة وجود مشكلة؟',
    'contact.problem_answer': 'اتصل بنا فوراً عبر دعم العملاء. نحن هنا لحل جميع مشاكلك بسرعة.',
    'contact.how_to_list': 'كيفية عرض أدواتي؟',
    'contact.how_to_list_answer': 'انقر على "عرض أداة" في التنقل، أضف تفاصيل وصور أداتك، وابدأ في كسب المال.',
    'contact.insurance': 'هل الأدوات مؤمنة؟',
    'contact.insurance_answer': 'نعم، جميع الأدوات المستأجرة عبر Bricola مغطاة بتأميننا الشامل لراحة بالك.',

    // Add Tool
    'add_tool.title': 'عرض أداة',
    'add_tool.subtitle': 'شارك أدواتك مع المجتمع واحصل على دخل من تأجيرها بسهولة',
    'add_tool.info_title': 'معلومات الأداة',
    'add_tool.general_info': 'المعلومات العامة',
    'add_tool.ad_title': 'عنوان الإعلان',
    'add_tool.brand': 'العلامة التجارية',
    'add_tool.model': 'الطراز',
    'add_tool.year': 'سنة الشراء',
    'add_tool.description': 'الوصف',
    'add_tool.categorization': 'التصنيف',
    'add_tool.category': 'الفئة',
    'add_tool.subcategory': 'الفئة الفرعية',
    'add_tool.condition': 'حالة الأداة',
    'add_tool.pricing': 'التسعير',
    'add_tool.price_per_day': 'السعر في اليوم (€)',
    'add_tool.deposit': 'التأمين (€)',
    'add_tool.location_title': 'الموقع',
    'add_tool.address': 'العنوان أو المدينة',
    'add_tool.photos_title': 'الصور',
    'add_tool.add_photos': 'أضف صورك',
    'add_tool.drop_images': 'اسحب صورك هنا أو انقر للتصفح',
    'add_tool.browse_files': 'تصفح الملفات',
    'add_tool.file_format': 'PNG، JPG حتى 10MB • 5 صور كحد أقصى',
    'add_tool.instructions_title': 'تعليمات الاستخدام',
    'add_tool.owner_instructions': 'تعليمات المالك',
    'add_tool.publish': 'نشر الإعلان',
    'add_tool.choose_category': 'اختر فئة',
    'add_tool.choose_subcategory': 'اختر فئة فرعية',
    'add_tool.condition_new': '✨ جديد',
    'add_tool.condition_excellent': '🌟 ممتاز',
    'add_tool.condition_good': '👍 جيد',
    'add_tool.condition_fair': '👌 مقبول',

    // Categories and subcategories
    'category.gardening': 'البستنة',
    'category.gardening.lawn': 'العشب',
    'category.gardening.soil': 'التربة',
    'category.gardening.wood': 'الخشب',
    'category.gardening.tree': 'الشجرة',
    'category.gardening.leaves': 'الأوراق',

    'category.cleaning': 'التنظيف',
    'category.cleaning.fabric': 'الأقمشة',
    'category.cleaning.water': 'الماء',
    'category.cleaning.dust': 'الغبار',

    'category.diy': 'الأشغال اليدوية',
    'category.diy.construction': 'البناء',
    'category.diy.electricity': 'الكهرباء',
    'category.diy.painting': 'الطلاء',
    'category.diy.screws_and_bolts': 'البراغي والصواميل',

    'category.transport': 'النقل',
    'category.transport.heavy_load': 'الأحمال الثقيلة',
    'category.transport.engine': 'المحرك',
    'category.transport.wheel': 'العجل',

    'category.event': 'معدات المناسبات',
    'category.event.lighting': 'الإضاءة',
    'category.event.kitchen': 'المطبخ',
    'category.event.entertainment_and_games': 'الترفيه والألعاب',
    'category.event.furniture': 'الأثاث',
    'category.event.decoration': 'الزينة',
    'category.event.structure': 'الهياكل',

    // Common
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.ok': 'موافق',
    'common.language': 'اللغة',
    'common.currency': 'العملة',
    'common.menu': 'القائمة',
    'common.navigation': 'التنقل',
    'common.home': 'الرئيسية',

    // CGU (Terms of Use - Arabic)
    'cgu.title': 'شروط الاستخدام',
    'cgu.last_updated': 'تاريخ السريان: 1 سبتمبر 2025',
    'cgu.section1.title': '1. مقدمة',
    'cgu.section1.p1': 'Bricola LTD هي منصة رقمية تربط بين الأفراد لتبادل كراء الأدوات المتعلقة بالبستنة، التنظيف، الأشغال اليدوية، وتنظيم المناسبات.',
    'cgu.section1.p2': 'تعمل المنصة كوسيط رقمي موثوق ولا تتحمل مسؤولية الأدوات فعليًا أو عمليات التوصيل.',

    'cgu.section2.title': '2. الوصول إلى المنصة',
    'cgu.section2.p1': 'يمكن استخدام المنصة عبر الموقع الإلكتروني أو التطبيقات.',
    'cgu.section2.p2': 'يُشترط أن يكون المستخدم راشدًا (18 سنة أو أكثر) ويتمتع بالأهلية القانونية.',
    'cgu.section2.p3': 'تحتفظ بريكولا بحقها في تعليق أو إيقاف الحسابات في حال مخالفة الشروط أو الاستعمال غير القانوني.',

    'cgu.section3.title': '3. التسجيل والتحقق من الهوية',
    'cgu.section3.li1': 'يجب على المستخدم تقديم بريد إلكتروني صالح، رقم هاتف، وبيانات هوية دقيقة.',
    'cgu.section3.li2': 'يجب على المؤجرين تقديم بياناتهم البنكية بدقة لتلقي الأرباح عبر Wise.',
    'cgu.section3.li3': 'تحتفظ بريكولا بحق طلب وثائق تحقق قبل تفعيل بعض المعاملات.',
    'cgu.section3.li4': 'لا يُسمح بمشاركة أو بيع الحسابات بين الأطراف.',

    'cgu.section4.title': '4. شروط الكراء وواجبات المستخدم',
    'cgu.section4.li1': 'يجب على المستأجر إرجاع الأدوات في نفس الحالة التي استلمها بها.',
    'cgu.section4.li2': 'المؤجر مسؤول عن صلاحية، نظافة، وسلامة الأدوات قبل نشرها.',
    'cgu.section4.li3': 'في حال وجود ضرر أو نزاع، قد تطلب المنصة أدلة (صور أو فيديو).',
    'cgu.section4.li4': 'التأخير في الإرجاع يؤدي إلى خصومات من الضمان بمعدل يومي أو ساعي.',
    'cgu.section4.li5': 'لا يمكن أن تتجاوز مدة الكراء 5 أيام في العملية الواحدة. في حال رغبة المستأجر في تمديد المدة، يجب أولًا التحقق من توفر الأداة لدى المؤجر، ثم إعادة إجراء عملية حجز جديدة عبر المنصة.',
    'cgu.section4.li6': 'فقدان الأداة يؤدي إلى خسارة الضمان بالكامل.',
    'cgu.section4.li7': 'سوء استخدام الأدوات قد يؤدي إلى تعليق الحساب.',

    'cgu.section5.title': '5. الدفع والعمولة والمحفظة',
    'cgu.section5.li1': 'تُدار عمليات الدفع عبر Stripe، وتخضع للوائح المالية المحلية.',
    'cgu.section5.li2': 'تُحمّل نسبة 5.4% من كل عملية كراء على المستأجر عند الدفع، وهي تغطي مصاريف الدفع الإلكتروني عبر Stripe إضافة إلى جزء من تكاليف تطوير وتشغيل المنصة (صيانة، استضافة، تحسينات تقنية).',
    'cgu.section5.li3': 'تُقتطع عمولة بنسبة 15% من كل عملية كراء ناجحة.',
    'cgu.section5.li4': 'تُودع أرباح المؤجر في محفظة رقمية داخلية ويمكن سحبها عبر Wise.',
    'cgu.section5.li5': 'لا يمكن للمؤجر سحب الرصيد المتوفر في محفظته إلا إذا بلغ الحد الأدنى وهو 50 جنيهًا إسترلينيًا. هذا الإجراء يهدف إلى تقليص عدد عمليات السحب الصغيرة، وتفادي التكاليف المرتفعة المرتبطة بالتحويلات، وضمان انسيابية العمليات داخل المنصة.',
    'cgu.section5.li6': 'لا تتحمل بريكولا مسؤولية التأخيرات الناتجة عن الأنظمة البنكية الخارجية.',

    'cgu.section6.title': '6. سياسة مبلغ الضمان',
    'cgu.section6.li1': 'يتم حجز مبلغ ضمان لكل عملية كراء عبر Stripe.',
    'cgu.section6.li2': 'يُفرج عن المبلغ بعد مرور 24 ساعة من الإرجاع والتحقق من الحالة.',
    'cgu.section6.li3': 'في حال وجود ضرر، يتم إعلام المستخدم قبل خصم أي مبلغ.',
    'cgu.section6.li4': 'يمكن استخدام الضمان كليًا أو جزئيًا لتعويض المؤجر.',

    'cgu.section7.title': '7. معالجة النزاعات',
    'cgu.section7.li1': 'يجب الإبلاغ عن أي نزاع خلال 24 ساعة من وقت الإرجاع المحدد.',
    'cgu.section7.li2': 'يقوم فريق الدعم بالتحقيق خلال 72 ساعة ويصدر قرارًا نهائيًا.',
    'cgu.section7.li3': 'تحتفظ بريكولا بحق اتخاذ قرار عادل بناءً على الأدلة.',
    'cgu.section7.li4': 'القرار الصادر عن الفريق ملزم للطرفين.',

    'cgu.section8.title': '8. الاستخدام العادل وسلامة المنصة',
    'cgu.section8.li1': 'يُمنع عرض أدوات غير قانونية أو غير مملوكة.',
    'cgu.section8.li2': 'تُحظر الإعلانات المزيفة أو العشوائية.',
    'cgu.section8.li3': 'يُمنع تأجير أدوات خطرة أو محظورة قانونيًا.',
    'cgu.section8.li4': 'يتعرض المستخدمون المخالفون لحظر دائم.',

    'cgu.section9.title': '9. سياسة الإلغاء والاسترجاع',
    'cgu.section9.li1': 'يحق للمستأجر إلغاء الحجز واسترجاع المبلغ كاملًا (100%) في حال تم الإلغاء قبل 24 ساعة على الأقل من موعد بداية الكراء.',
    'cgu.section9.li2': 'إذا تم الإلغاء خلال 24 ساعة الأخيرة قبل الموعد، فلن يتم استرجاع أي مبلغ، ويُعتبر الحجز نهائي.',
    'cgu.section9.li3': 'في حال قام المؤجّر بإلغاء الحجز في أي وقت، يتم إرجاع كامل المبلغ للمستأجر، ويمكن أن تتخذ إدارة المنصة إجراءات ضد المؤجّر في حال تكرار الإلغاء.',

    'cgu.section10.title': '10. توافر الخدمة والتحديثات',
    'cgu.section10.li1': 'قد يتم تعليق المنصة مؤقتًا لأسباب تقنية أو تحديثات.',
    'cgu.section10.li2': 'تُرسل إشعارات للمستخدمين مسبقًا في حال التوقف المبرمج.',
    'cgu.section10.li3': 'يمكن للمنصة تعديل أو إضافة ميزات دون إشعار مسبق لضمان تحسين الخدمة.',

    'cgu.section11.title': '11. حماية البيانات والخصوصية',
    'cgu.section11.li1': 'تلتزم بريكولا بتطبيق قوانين حماية البيانات البريطانية والأوروبية (GDPR).',
    'cgu.section11.li2': 'يتم حفظ البيانات بشكل آمن ومشفّر.',
    'cgu.section11.li3': 'يمكن للمستخدم طلب حذف أو تعديل بياناته في أي وقت.',
    'cgu.section11.li4': 'لا يتم بيع أو مشاركة البيانات مع طرف ثالث دون إذن.',

    'cgu.section12.title': '12. القانون المعتمد والاختصاص القضائي',
    'cgu.section12.li1': 'تخضع هذه الشروط للقانون البريطاني.',
    'cgu.section12.li2': 'في حال عدم التوصل لحل داخلي، يتم عرض النزاع أمام محاكم لندن المختصة.',
    'cgu.section12.li3': 'يُعتبر استمرار استخدام المنصة موافقة تلقائية على الشروط الجديدة.',

    'cgu.section13.title': '13. التأكيد التلقائي في حال عدم التفاعل',
    'cgu.section13.p': 'في بعض الحالات التي لا يقوم فيها المستخدم (سواء المستأجر أو المالك) باتخاذ الإجراء اللازم أو الرد خلال فترة زمنية معقولة، تحتفظ Bricola LTD بحقها في تأكيد حالة العملية تلقائيًا (مثل تسليم الأداة أو إرجاعها). يهدف هذا الإجراء إلى ضمان استمرارية الخدمة ومصداقيتها. ننصح المستخدمين بمتابعة معاملاتهم والتفاعل في الوقت المناسب لتفادي التأكيد التلقائي.',

    'cgu.section14.title': '14. تعديل الشروط والموافقة عليها',
    'cgu.section14.p1': 'قد يتم تحديث شروط الاستخدام من وقت لآخر لتعكس التغيرات التقنية أو القانونية أو التشغيلية.',
    'cgu.section14.p2': 'سيتم إعلام المستخدمين بالتحديثات الجوهرية عبر المنصة.',
    'cgu.section14.p3': 'يُعتبر استمرار استخدام الخدمة بعد هذه التعديلات موافقة ضمنية على الشروط الجديدة.',

    'cgu.section15.title': '15. الاتصال والتواصل',
    'cgu.section15.p1': 'لأي استفسارات أو ملاحظات أو مراسلات قانونية بخصوص شروط الاستخدام، يمكن للمستخدمين التواصل مع Bricola LTD عبر البريد الإلكتروني: contact@bricolaltd.com.',
    'cgu.section15.p2': 'تُرسل المراسلات الرسمية على البريد الإلكتروني المُسجل من طرف المستخدم.',

    // Privacy Policy
    "privacy.title": "سياسة الخصوصية – Bricola LTD",
    "privacy.last_updated": "تاريخ السريان: 1 سبتمبر 2025",
    "privacy.section1.title": "1. المقدمة",
    "privacy.section1.p1": "تلتزم Bricola LTD بحماية خصوصيتك ومعالجة بياناتك طبقًا لقوانين حماية البيانات المعتمدة في المملكة المتحدة والاتحاد الأوروبي (GDPR).",
    "privacy.section1.p2": "نحن ملتزمون بمعالجة معلوماتك وفقًا للائحة العامة لحماية البيانات (GDPR) المطبقة في المملكة المتحدة والاتحاد الأوروبي.",
    "privacy.section1.p3": "تشرح هذه السياسة أنواع البيانات التي نجمعها وأسباب جمعها وكيفية استخدامها.",
    
    "privacy.section2.title": "2. البيانات التي نجمعها",
    "privacy.section2.p1": "كجزء من استخدام منصتنا، نقوم بجمع البيانات التالية:",
    "privacy.section2.identification": "معلومات الهوية:",
    "privacy.section2.identification.li1": "الاسم، رقم الهاتف، البريد الإلكتروني",
    "privacy.section2.account": "بيانات الحساب:",
    "privacy.section2.account.li1": "اسم المستخدم، كلمة المرور",
    "privacy.section2.payment": "معلومات الدفع:",
    "privacy.section2.payment.li1": "تفاصيل IBAN للتحويلات عبر Wise، لا نجمع أي معلومات دفع أخرى باستثناء IBAN",
    "privacy.section2.technical": "المعلومات التقنية:",
    "privacy.section2.technical.li1": "عنوان IP، نوع المتصفح، نظام التشغيل، الموقع الجغرافي التقريبي",
    "privacy.section2.usage": "بيانات الاستخدام:",
    "privacy.section2.usage.li1": "النقرات، الصفحات المزارة، استعلامات البحث المنجزة على المنصة",
    
    "privacy.section3.title": "3. كيف نستخدم بياناتك",
    "privacy.section3.p1": "تُستخدم بياناتك الشخصية للأغراض التالية:",
    "privacy.section3.li1": "إنشاء وإدارة وتأمين حساب المستخدم الخاص بك",
    "privacy.section3.li2": "معالجة المدفوعات وتأمين معاملات الإيجار",
    "privacy.section3.li3": "التحقق من الهوية وضمان الامتثال التنظيمي",
    "privacy.section3.li4": "دعم العملاء وإدارة النزاعات ومعالجة الشكاوى",
    "privacy.section3.li5": "التحسين المستمر للمنصة وكشف الاحتيال وتحليل سلوك الاستخدام",
    
    "privacy.section4.title": "4. الأساس القانوني للمعالجة",
    "privacy.section4.p1": "نعالج البيانات الشخصية بناءً على موافقة المستخدم والمصلحة المشروعة والالتزامات القانونية (مثل منع الاحتيال).",
    "privacy.section4.consent": "موافقتك الصريحة، خاصة أثناء التسجيل أو تقديم المعلومات الشخصية",
    "privacy.section4.interest": "مصلحتنا المشروعة، لضمان أمان خدماتنا وتحسينها المستمر",
    "privacy.section4.legal": "التزاماتنا القانونية، فيما يتعلق بمنع الاحتيال أو الامتثال للوائح المالية والضريبية",
    
    "privacy.section5.title": "5. مشاركة البيانات مع أطراف خارجية",
    "privacy.section5.p1": "نشارك بياناتك فقط مع شركاء موثوقين وفقط عند الضرورة:",
    "privacy.section5.li1": "معالجات الدفع: Wise، للتحويلات المالية لأصحاب الأدوات",
    "privacy.section5.li2": "مقدمو الاستضافة وشركاء الأمن المعلوماتي، لضمان توفر وحماية المنصة",
    "privacy.section5.li3": "السلطات المختصة، في إطار التزام قانوني أو تنظيمي",
    "privacy.section5.li4": "لا نبيع أو نؤجر أو ننقل بياناتك لأطراف ثالثة لأغراض تجارية في أي حال.",
    
    "privacy.section6.title": "6. مدة الاحتفاظ بالبيانات",
    "privacy.section6.p1": "نحتفظ بالبيانات طالما أن حسابك نشط.",
    "privacy.section6.p2": "في حالة عدم النشاط لمدة 3 سنوات، قد يتم إلغاء تنشيط حسابك، ثم إخفاء هوية بياناتك أو حذفها، إلا إذا كان الاحتفاظ بها مطلوبًا بموجب القانون (مثل: الفوترة، النزاعات، التحقق الضريبي).",
    
    "privacy.section7.title": "7. أمن البيانات",
    "privacy.section7.p1": "نطبق بروتوكولات تشفير متقدمة وإجراءات مراقبة وصول صارمة ونستخدم خوادم آمنة تقع في منطقة المملكة المتحدة/الاتحاد الأوروبي.",
    "privacy.section7.p2": "أولويتنا هي ضمان سلامة وسرية وتوفر بياناتك في جميع الأوقات.",
    
    "privacy.section8.title": "8. حقوقك",
    "privacy.section8.p1": "وفقًا لـ GDPR، لديك الحقوق التالية:",
    "privacy.section8.access": "حق الوصول:",
    "privacy.section8.access.desc": "الحصول على نسخة من بياناتك الشخصية",
    "privacy.section8.rectification": "حق التصحيح:",
    "privacy.section8.rectification.desc": "تصحيح أي بيانات غير دقيقة أو قديمة",
    "privacy.section8.erasure": "حق المحو:",
    "privacy.section8.erasure.desc": "طلب حذف بياناتك (ضمن الحدود المنصوص عليها في القانون)",
    "privacy.section8.withdrawal": "حق سحب الموافقة:",
    "privacy.section8.withdrawal.desc": "سحب تصريحك في أي وقت",
    "privacy.section8.li1": "الوصول إلى بياناتك",
    "privacy.section8.li2": "تصحيح البيانات الخاطئة",
    "privacy.section8.li3": "طلب حذف البيانات (مع مراعاة الالتزامات القانونية)",
    "privacy.section8.li4": "سحب الموافقة في أي وقت",
    "privacy.section8.p2": "يمكنك ممارسة هذه الحقوق عبر: support@bricolaltd.com",
    "privacy.section8.contact": "يمكنك ممارسة هذه الحقوق في أي وقت بالكتابة إلى support@bricolaltd.com",
    
    "privacy.section9.title": "9. النقل الدولي للبيانات",
    "privacy.section9.p1": "إذا تم نقل بعض البيانات خارج الاتحاد الأوروبي/المملكة المتحدة، فيتم ذلك في إطار تعاقدي آمن، عبر بنود تعاقدية نمطية أو اتفاقيات مع مقدمي الخدمات الذين يحترمون المعايير الدولية لحماية البيانات.",
    
    "privacy.section10.title": "10. تحديث سياسة الخصوصية",
    "privacy.section10.p1": "قد تخضع هذه السياسة للتحديثات لتعكس التطورات التقنية أو القانونية أو التنظيمية.",
    "privacy.section10.p2": "سيتم إعلام المستخدمين بأي تعديل جوهري عبر البريد الإلكتروني أو الإشعار عبر التطبيق.",
    "privacy.section10.p3": "استمرار استخدام المنصة بعد التعديل يعني القبول الضمني للنسخة الجديدة."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Set document direction for Arabic
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
