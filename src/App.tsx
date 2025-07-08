import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { AgeVerificationProvider } from '@/contexts/AgeVerificationContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import AddTool from "./pages/AddTool";
import Search from "./pages/Search";
import ToolDetails from "./pages/ToolDetails";
import Rent from "./pages/Rent";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import GuideLoueur from "./pages/GuideLoueur";
import GuideLocataire from "./pages/GuideLocataire";
import FAQ from "./pages/FAQ";
import CGU from "./pages/CGU";
import ContratLocation from "./pages/ContratLocation";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import UnderAge from "./pages/UnderAge";
import AgeVerificationDialog from "./components/AgeVerificationDialog";
import FloatingActionButton from "./components/FloatingActionButton";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <FavoritesProvider>
              <AgeVerificationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <AgeVerificationDialog />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
                <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />
                <Route path="/forgot-password" element={<AuthRedirect><ForgotPassword /></AuthRedirect>} />
                <Route path="/verify-code" element={<AuthRedirect><VerifyCode /></AuthRedirect>} />
                <Route path="/reset-password" element={<AuthRedirect><ResetPassword /></AuthRedirect>} />
                <Route path="/add-tool" element={<ProtectedRoute><AddTool /></ProtectedRoute>} />
                <Route path="/search" element={<Search />} />
                <Route path="/tool/:id" element={<ToolDetails />} />
                <Route path="/rent/:id" element={<ProtectedRoute><Rent /></ProtectedRoute>} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/guide-loueur" element={<GuideLoueur />} />
                <Route path="/guide-locataire" element={<GuideLocataire />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/contrat-location" element={<ContratLocation />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/under-age" element={<UnderAge />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingActionButton />
            </BrowserRouter>
            </AgeVerificationProvider>
          </FavoritesProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
