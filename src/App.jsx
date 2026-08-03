import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import WholeLife from '@/pages/WholeLife';
import Calculator from '@/pages/Calculator';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import SchedulerChat from '@/pages/SchedulerChat';
import MatthewAndersonPage from '@/pages/brokers/MatthewAnderson';
import JustinBrabantPage from '@/pages/brokers/JustinBrabant';
import QuotePage from '@/pages/QuotePage';
import AgentDashboard from '@/pages/AgentDashboard';
import AdminSettings from '@/pages/AdminSettings';
import ClientPortal from '@/pages/ClientPortal';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

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
    <Routes>
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
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/get-quote" element={<LayoutWrapper currentPageName="QuotePage"><QuotePage /></LayoutWrapper>} />
      <Route path="/privacy-policy" element={<Navigate to="/Privacy" replace />} />
      <Route path="/Article" element={<Navigate to="/Blog" replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>

          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App