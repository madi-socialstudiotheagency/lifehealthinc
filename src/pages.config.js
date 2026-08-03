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
import Annuities from './pages/Annuities';

import Blog from './pages/Blog';
import Calculator from './pages/Calculator';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import FinalExpense from './pages/FinalExpense';
import HealthInsurance from './pages/HealthInsurance';
import Home from './pages/Home';
import IULStructuring from './pages/IULStructuring';
import Illustration from './pages/Illustration';
import IllustrationQuote from './pages/IllustrationQuote';
import LifeInsurance from './pages/LifeInsurance';
import Loading from './pages/Loading';
import Medicare from './pages/Medicare';
import MortgageProtection from './pages/MortgageProtection';
import PartnerForm from './pages/PartnerForm';
import Partners from './pages/Partners';
import Privacy from './pages/Privacy';
import QuoteComplete from './pages/QuoteComplete';
import Resources from './pages/Resources';
import Results from './pages/Results';
import RetirementCalculator from './pages/RetirementCalculator';
import Terms from './pages/Terms';
import articleMortgageProtectionGuide from './pages/article-mortgage-protection-guide';
import articleRetirementIncomePlanning from './pages/article-retirement-income-planning';
import articleTermVsWholeLife from './pages/article-term-vs-whole-life';
import blogAnnuitiesExplainedSimply from './pages/blog-annuities-explained-simply';
import blogCommonLifeInsuranceMistakes from './pages/blog-common-life-insurance-mistakes';
import blogHealthInsuranceOpenEnrollment from './pages/blog-health-insurance-open-enrollment';
import blogHowMuchLifeInsuranceDoINeed from './pages/blog-how-much-life-insurance-do-i-need';
import blogLifeInsuranceForNewParents from './pages/blog-life-insurance-for-new-parents';
import blogMedicareSupplementVsAdvantage from './pages/blog-medicare-supplement-vs-advantage';
import blogUnderstandingUnderwriting from './pages/blog-understanding-underwriting';
import social from './pages/social';
import thankYou from './pages/thank-you';
import LifeInsuranceComparison from './pages/LifeInsuranceComparison';
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