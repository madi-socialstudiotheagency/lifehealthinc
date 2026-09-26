import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import ErrorBoundary from '@/components/ErrorBoundary'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
const WholeLife = lazy(() => import('@/pages/WholeLife'));
const Calculator = lazy(() => import('@/pages/Calculator'));
import Home from '@/pages/Home';
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const SchedulerChat = lazy(() => import('@/pages/SchedulerChat'));
const MatthewAndersonPage = lazy(() => import('@/pages/brokers/MatthewAnderson'));
const JustinBrabantPage = lazy(() => import('@/pages/brokers/JustinBrabant'));
const QuotePage = lazy(() => import('@/pages/QuotePage'));
const AgentDashboard = lazy(() => import('@/pages/AgentDashboard'));
const AdminSettings = lazy(() => import('@/pages/AdminSettings'));
const ClientPortal = lazy(() => import('@/pages/ClientPortal'));
const Intake = lazy(() => import('@/pages/Intake'));
const Carriers = lazy(() => import('@/pages/Carriers'));
const Employers = lazy(() => import('@/pages/Employers'));
const OwnBank = lazy(() => import('@/pages/OwnBank'));
const HealthQuote = lazy(() => import('@/pages/HealthQuote'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const PageFallback = () => <div style={{ minHeight: '70vh' }} aria-busy="true" />;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}><Suspense fallback={<PageFallback />}>{children}</Suspense></Layout>
  : <Suspense fallback={<PageFallback />}>{children}</Suspense>;

const RouteBoundary = ({ children }) => {
  const location = useLocation();
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
};

const SeoTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__lhiSeo) window.__lhiSeo(location.pathname);
  }, [location.pathname]);
  return null;
};

const CalculatorRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/quote${location.search}`} replace />;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <RouteBoundary><Routes>
      <Route path="/" element={<LayoutWrapper currentPageName="Home"><Home /></LayoutWrapper>} />
      <Route path="/Calculator" element={<CalculatorRedirect />} />
      <Route path="/calculator" element={<CalculatorRedirect />} />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/WholeLife" element={
        <LayoutWrapper currentPageName="WholeLife">
          <WholeLife />
        </LayoutWrapper>
      } />
      <Route path="/HomePage" element={<Navigate to="/" replace />} />
<Route path="/Book" element={<LayoutWrapper currentPageName="SchedulerChat"><SchedulerChat /></LayoutWrapper>} />
<Route path="/book" element={<LayoutWrapper currentPageName="SchedulerChat"><SchedulerChat /></LayoutWrapper>} />
      <Route path="/quote" element={<LayoutWrapper currentPageName="QuotePage"><QuotePage /></LayoutWrapper>} />

      <Route path="/about" element={<LayoutWrapper currentPageName="About"><AboutPage /></LayoutWrapper>} />
      <Route path="/SchedulerChat" element={<LayoutWrapper currentPageName="SchedulerChat"><SchedulerChat /></LayoutWrapper>} />
      <Route path="/brokers/matthew-anderson" element={<LayoutWrapper currentPageName="MatthewAnderson"><MatthewAndersonPage /></LayoutWrapper>} />
      <Route path="/matthew-anderson" element={<LayoutWrapper currentPageName="MatthewAnderson"><MatthewAndersonPage /></LayoutWrapper>} />
      <Route path="/brokers/justin-brabant" element={<LayoutWrapper currentPageName="JustinBrabant"><JustinBrabantPage /></LayoutWrapper>} />
      <Route path="/justin-brabant" element={<LayoutWrapper currentPageName="JustinBrabant"><JustinBrabantPage /></LayoutWrapper>} />
      <Route path="/QuotePage" element={<LayoutWrapper currentPageName="QuotePage"><QuotePage /></LayoutWrapper>} />
      <Route path="/agent-dashboard" element={<LayoutWrapper currentPageName="AgentDashboard"><AgentDashboard /></LayoutWrapper>} />
      <Route path="/admin-settings" element={<LayoutWrapper currentPageName="AdminSettings"><AdminSettings /></LayoutWrapper>} />
      <Route path="/client-portal" element={<Suspense fallback={<PageFallback />}><ClientPortal /></Suspense>} />
      <Route path="/get-quote" element={<LayoutWrapper currentPageName="QuotePage"><QuotePage /></LayoutWrapper>} />
      <Route path="/get-started" element={<LayoutWrapper currentPageName="Intake"><Intake /></LayoutWrapper>} />
      <Route path="/get-started/:formId" element={<LayoutWrapper currentPageName="Intake"><Intake /></LayoutWrapper>} />
      <Route path="/health-quote" element={<LayoutWrapper currentPageName="HealthInsurance"><HealthQuote /></LayoutWrapper>} />
      <Route path="/employers" element={<LayoutWrapper currentPageName="Employers"><Employers /></LayoutWrapper>} />
      <Route path="/become-your-own-bank" element={<LayoutWrapper currentPageName="OwnBank"><OwnBank /></LayoutWrapper>} />
      <Route path="/carriers" element={<LayoutWrapper currentPageName="Carriers"><Carriers /></LayoutWrapper>} />
      <Route path="/privacy-policy" element={<Navigate to="/Privacy" replace />} />
      <Route path="/Article" element={<Navigate to="/Blog" replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes></RouteBoundary>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>

          <NavigationTracker />
          <SeoTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App