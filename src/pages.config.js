/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import { lazy } from 'react';
const Annuities = lazy(() => import('./pages/Annuities'));

const Blog = lazy(() => import('./pages/Blog'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Clients = lazy(() => import('./pages/Clients'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const FinalExpense = lazy(() => import('./pages/FinalExpense'));
const HealthInsurance = lazy(() => import('./pages/HealthInsurance'));
import Home from './pages/Home';
const IULStructuring = lazy(() => import('./pages/IULStructuring'));
const Illustration = lazy(() => import('./pages/Illustration'));
const IllustrationQuote = lazy(() => import('./pages/IllustrationQuote'));
const LifeInsurance = lazy(() => import('./pages/LifeInsurance'));
const Loading = lazy(() => import('./pages/Loading'));
const Medicare = lazy(() => import('./pages/Medicare'));
const MortgageProtection = lazy(() => import('./pages/MortgageProtection'));
const PartnerForm = lazy(() => import('./pages/PartnerForm'));
const Partners = lazy(() => import('./pages/Partners'));
const Privacy = lazy(() => import('./pages/Privacy'));
const QuoteComplete = lazy(() => import('./pages/QuoteComplete'));
const Resources = lazy(() => import('./pages/Resources'));
const Results = lazy(() => import('./pages/Results'));
const RetirementCalculator = lazy(() => import('./pages/RetirementCalculator'));
const Terms = lazy(() => import('./pages/Terms'));
const articleMortgageProtectionGuide = lazy(() => import('./pages/article-mortgage-protection-guide'));
const articleRetirementIncomePlanning = lazy(() => import('./pages/article-retirement-income-planning'));
const articleTermVsWholeLife = lazy(() => import('./pages/article-term-vs-whole-life'));
const blogAnnuitiesExplainedSimply = lazy(() => import('./pages/blog-annuities-explained-simply'));
const blogCommonLifeInsuranceMistakes = lazy(() => import('./pages/blog-common-life-insurance-mistakes'));
const blogHealthInsuranceOpenEnrollment = lazy(() => import('./pages/blog-health-insurance-open-enrollment'));
const blogHowMuchLifeInsuranceDoINeed = lazy(() => import('./pages/blog-how-much-life-insurance-do-i-need'));
const blogLifeInsuranceForNewParents = lazy(() => import('./pages/blog-life-insurance-for-new-parents'));
const blogMedicareSupplementVsAdvantage = lazy(() => import('./pages/blog-medicare-supplement-vs-advantage'));
const blogUnderstandingUnderwriting = lazy(() => import('./pages/blog-understanding-underwriting'));
const social = lazy(() => import('./pages/social'));
const thankYou = lazy(() => import('./pages/thank-you'));
const LifeInsuranceComparison = lazy(() => import('./pages/LifeInsuranceComparison'));
import __Layout from './Layout.jsx';


export const PAGES = {
    "Annuities": Annuities,

    "Blog": Blog,
    "Calculator": Calculator,
    "Clients": Clients,
    "Contact": Contact,
    "FAQ": FAQ,
    "FinalExpense": FinalExpense,
    "HealthInsurance": HealthInsurance,
    "Home": Home,
    "IULStructuring": IULStructuring,
    "Illustration": Illustration,
    "IllustrationQuote": IllustrationQuote,
    "LifeInsurance": LifeInsurance,
    "Loading": Loading,
    "Medicare": Medicare,
    "MortgageProtection": MortgageProtection,
    "PartnerForm": PartnerForm,
    "Partners": Partners,
    "Privacy": Privacy,
    "QuoteComplete": QuoteComplete,
    "Resources": Resources,
    "Results": Results,
    "RetirementCalculator": RetirementCalculator,
    "Terms": Terms,
    "article-mortgage-protection-guide": articleMortgageProtectionGuide,
    "article-retirement-income-planning": articleRetirementIncomePlanning,
    "article-term-vs-whole-life": articleTermVsWholeLife,
    "blog-annuities-explained-simply": blogAnnuitiesExplainedSimply,
    "blog-common-life-insurance-mistakes": blogCommonLifeInsuranceMistakes,
    "blog-health-insurance-open-enrollment": blogHealthInsuranceOpenEnrollment,
    "blog-how-much-life-insurance-do-i-need": blogHowMuchLifeInsuranceDoINeed,
    "blog-life-insurance-for-new-parents": blogLifeInsuranceForNewParents,
    "blog-medicare-supplement-vs-advantage": blogMedicareSupplementVsAdvantage,
    "blog-understanding-underwriting": blogUnderstandingUnderwriting,
    "social": social,
    "thank-you": thankYou,
    "LifeInsuranceComparison": LifeInsuranceComparison,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};