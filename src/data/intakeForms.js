// Intake form definitions. One config, one renderer (src/pages/Intake.jsx).
// Field types: text, email, tel, number, date, select, radio, multi, textarea, yesno.
// `showIf: { field, equals }` shows a field only when another answer matches.
//
// PRIVACY: none of these forms ask for an SSN, bank or card number, or medical
// history. Those belong in the carrier's secure application, not a website form.

export const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

const yn = ['Yes', 'No'];
const ynu = ['Yes', 'No', 'Not sure'];

// ── Reusable field groups ─────────────────────────────────────────────────

const personContact = {
  title: 'About you',
  fields: [
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Mobile phone', type: 'tel', required: true },
    { name: 'state', label: 'State you live in', type: 'select', options: STATES, required: true },
    { name: 'zip', label: 'ZIP code', type: 'text', required: true },
    { name: 'dob', label: 'Date of birth', type: 'date', required: true, help: 'Used only to price your options.' },
    { name: 'contactPref', label: 'Best way to reach you', type: 'radio', options: ['Call', 'Text', 'Email'], required: true },
    { name: 'bestTime', label: 'Best time to reach you', type: 'select', options: ['Morning', 'Afternoon', 'Evening', 'Anytime'] },
  ],
};

const tobaccoHeightWeight = [
  { name: 'gender', label: 'Sex (as used by carriers for pricing)', type: 'select', options: ['Female', 'Male'], required: true },
  { name: 'tobacco', label: 'Have you used tobacco or nicotine in the last 12 months?', type: 'radio', options: yn, required: true },
  { name: 'height', label: 'Height', type: 'text', placeholder: "5'10\"" },
  { name: 'weight', label: 'Weight (lbs)', type: 'number' },
  { name: 'healthNotes', label: 'Anything about your health we should know? (optional, general only)', type: 'textarea', help: 'Please do not include diagnoses, medications or ID numbers. Your advisor will cover health questions on a secure call.' },
];

const businessContact = {
  title: 'Your company',
  fields: [
    { name: 'companyName', label: 'Legal business name', type: 'text', required: true },
    { name: 'dba', label: 'Doing business as (if different)', type: 'text' },
    { name: 'entityType', label: 'Entity type', type: 'select', options: ['Sole proprietor', 'LLC', 'S-Corp', 'C-Corp', 'Partnership', 'Nonprofit', 'Professional practice (PC/PLLC)', 'Government / association', 'Other'], required: true },
    { name: 'industry', label: 'Industry', type: 'text', required: true },
    { name: 'website', label: 'Website', type: 'text' },
    { name: 'hqState', label: 'Headquarters state', type: 'select', options: STATES, required: true },
    { name: 'hqZip', label: 'Headquarters ZIP', type: 'text', required: true },
    { name: 'otherStates', label: 'Other states where employees live or work', type: 'text', placeholder: 'e.g. GA, TX (leave blank if none)' },
    { name: 'yearsInBusiness', label: 'Years in business', type: 'number', required: true },
  ],
};

const businessPerson = {
  title: 'Primary contact',
  fields: [
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'jobTitle', label: 'Title', type: 'text', required: true },
    { name: 'email', label: 'Work email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'isDecisionMaker', label: 'Are you the final decision maker?', type: 'radio', options: yn, required: true },
    { name: 'otherDecisionMakers', label: 'Who else is involved in the decision (name and title)?', type: 'text', showIf: { field: 'isDecisionMaker', equals: 'No' } },
    { name: 'contactPref', label: 'Best way to reach you', type: 'radio', options: ['Call', 'Text', 'Email'], required: true },
    { name: 'bestTime', label: 'Best time to reach you', type: 'select', options: ['Morning', 'Afternoon', 'Evening', 'Anytime'] },
  ],
};

const timeline = (extra = []) => ({
  title: 'Timing and next steps',
  fields: [
    { name: 'timeline', label: 'When do you need coverage to start?', type: 'select', options: ['As soon as possible', 'Within 30 days', '1 to 3 months', '3 to 6 months', 'Just researching'], required: true },
    ...extra,
    { name: 'notes', label: 'Anything else we should know?', type: 'textarea' },
  ],
});

// ── The forms ─────────────────────────────────────────────────────────────

export const INTAKE_FORMS = [
  // ═══ Individuals and families ═══
  {
    id: 'life-insurance', audience: 'Individuals & Families', title: 'Life Insurance',
    blurb: 'Term, whole life, universal life and IUL for you and your family.',
    sections: [
      personContact,
      {
        title: 'Your coverage',
        fields: [
          { name: 'productInterest', label: 'What are you interested in?', type: 'multi', options: ['Term life', 'Whole life', 'Universal life', 'Indexed universal life (IUL)', 'Not sure, advise me'], required: true },
          { name: 'goal', label: 'Main reason for coverage', type: 'multi', options: ['Replace income', 'Pay off debts / mortgage', 'Children\'s future / college', 'Final expenses', 'Leave a legacy', 'Tax-advantaged savings', 'Business needs'], required: true },
          { name: 'coverageAmount', label: 'Coverage amount you have in mind', type: 'select', options: ['Under $100,000', '$100,000 to $250,000', '$250,000 to $500,000', '$500,000 to $1 million', '$1 million to $2 million', 'Over $2 million', 'Not sure'], required: true },
          { name: 'termLength', label: 'If term, how long?', type: 'select', options: ['10 years', '15 years', '20 years', '25 years', '30 years', 'Not sure'] },
          { name: 'monthlyBudget', label: 'Comfortable monthly budget', type: 'select', options: ['Under $50', '$50 to $100', '$100 to $250', '$250 to $500', '$500 to $1,000', 'Over $1,000'], required: true },
          { name: 'annualIncome', label: 'Approximate annual household income', type: 'select', options: ['Under $50,000', '$50,000 to $100,000', '$100,000 to $250,000', '$250,000 to $500,000', 'Over $500,000'] },
          { name: 'dependents', label: 'Number of dependents', type: 'number' },
          { name: 'maritalStatus', label: 'Marital status', type: 'select', options: ['Single', 'Married', 'Domestic partner', 'Divorced', 'Widowed'] },
          { name: 'existingCoverage', label: 'Do you have life insurance now?', type: 'radio', options: yn, required: true },
          { name: 'existingDetails', label: 'Carrier and amount of current coverage', type: 'text', showIf: { field: 'existingCoverage', equals: 'Yes' } },
        ],
      },
      { title: 'A few health basics', fields: tobaccoHeightWeight },
      timeline(),
    ],
  },
  {
    id: 'final-expense', audience: 'Individuals & Families', title: 'Final Expense',
    blurb: 'Simple, permanent coverage for funeral and end-of-life costs.',
    sections: [
      personContact,
      {
        title: 'Coverage',
        fields: [
          { name: 'coverageAmount', label: 'Amount you want to leave', type: 'select', options: ['$5,000', '$10,000', '$15,000', '$20,000', '$25,000', '$30,000 or more', 'Not sure'], required: true },
          { name: 'monthlyBudget', label: 'Comfortable monthly budget', type: 'select', options: ['Under $30', '$30 to $60', '$60 to $100', 'Over $100'], required: true },
          { name: 'beneficiaryRelation', label: 'Who would receive the benefit?', type: 'select', options: ['Spouse', 'Child', 'Other family', 'Funeral home', 'Other'] },
          { name: 'existingCoverage', label: 'Do you already have burial or life insurance?', type: 'radio', options: yn, required: true },
        ],
      },
      { title: 'A few health basics', fields: tobaccoHeightWeight },
      timeline(),
    ],
  },
  {
    id: 'mortgage-protection', audience: 'Individuals & Families', title: 'Mortgage Protection',
    blurb: 'Keep the home in your family if you die, or become ill or disabled.',
    sections: [
      personContact,
      {
        title: 'Your mortgage',
        fields: [
          { name: 'mortgageBalance', label: 'Approximate mortgage balance', type: 'select', options: ['Under $100,000', '$100,000 to $250,000', '$250,000 to $400,000', '$400,000 to $600,000', 'Over $600,000'], required: true },
          { name: 'monthlyPayment', label: 'Monthly mortgage payment', type: 'number', required: true },
          { name: 'yearsRemaining', label: 'Years remaining on the loan', type: 'number', required: true },
          { name: 'homeownerSince', label: 'Year you bought the home', type: 'number' },
          { name: 'coverageStyle', label: 'What should it do?', type: 'radio', options: ['Pay off the balance', 'Cover payments for a period', 'Both, advise me'], required: true },
          { name: 'livingBenefits', label: 'Interested in living benefits (illness or disability)?', type: 'radio', options: ynu },
          { name: 'coBorrower', label: 'Is there a co-borrower who should also be covered?', type: 'radio', options: yn },
        ],
      },
      { title: 'A few health basics', fields: tobaccoHeightWeight },
      timeline(),
    ],
  },
  {
    id: 'individual-health', audience: 'Individuals & Families', title: 'Individual & Family Health',
    blurb: 'ACA marketplace and private health plans, with or without subsidies.',
    sections: [
      personContact,
      {
        title: 'Who needs coverage',
        fields: [
          { name: 'householdSize', label: 'People to cover (including you)', type: 'number', required: true },
          { name: 'householdIncome', label: 'Expected household income this year', type: 'number', required: true, help: 'Subsidies depend on this, so a close estimate matters.' },
          { name: 'coverWho', label: 'Who is being covered?', type: 'multi', options: ['Me', 'Spouse / partner', 'Children', 'Other dependents'], required: true },
          { name: 'ages', label: 'Ages of everyone to be covered', type: 'text', required: true, placeholder: 'e.g. 42, 40, 12, 9' },
          { name: 'currentCoverage', label: 'Current coverage', type: 'select', options: ['None', 'Employer plan ending', 'ACA marketplace plan', 'COBRA', 'Medicaid / CHIP ending', 'Other'], required: true },
          { name: 'specialEnrollment', label: 'Did you lose coverage or have a life event in the last 60 days?', type: 'radio', options: ynu, help: 'A life event (job loss, marriage, birth, move) may allow enrollment outside open enrollment.' },
          { name: 'doctors', label: 'Doctors or hospitals you want to keep', type: 'textarea' },
          { name: 'prescriptions', label: 'Do you take regular prescriptions?', type: 'radio', options: ynu },
          { name: 'priority', label: 'What matters most?', type: 'radio', options: ['Lowest monthly premium', 'Lowest total cost', 'Broad doctor network', 'Prescription coverage'], required: true },
          { name: 'hsa', label: 'Interested in an HSA-eligible plan?', type: 'radio', options: ynu },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'medicare', audience: 'Individuals & Families', title: 'Medicare',
    blurb: 'Advantage, Supplement (Medigap) and Part D help for people turning 65 or on Medicare.',
    sections: [
      personContact,
      {
        title: 'Your Medicare situation',
        fields: [
          { name: 'medicareStatus', label: 'Where are you?', type: 'radio', options: ['Turning 65 soon', 'On Medicare now, want to compare', 'Under 65 on disability', 'Retiring from an employer plan'], required: true },
          { name: 'partAB', label: 'Do you have Medicare Parts A and B?', type: 'radio', options: ynu, required: true },
          { name: 'currentPlan', label: 'Current plan', type: 'select', options: ['Original Medicare only', 'Medicare Supplement (Medigap)', 'Medicare Advantage', 'Employer / retiree plan', 'None'] },
          { name: 'currentCarrier', label: 'Current carrier and plan name', type: 'text' },
          { name: 'planPreference', label: 'What are you leaning toward?', type: 'radio', options: ['Medicare Supplement', 'Medicare Advantage', 'Not sure, explain both'], required: true },
          { name: 'partD', label: 'Do you need a Part D drug plan?', type: 'radio', options: ynu },
          { name: 'doctors', label: 'Doctors or hospitals you must keep', type: 'textarea' },
          { name: 'prescriptions', label: 'Do you take regular prescriptions?', type: 'radio', options: ynu },
          { name: 'medicaidExtraHelp', label: 'Do you get Medicaid or Extra Help (LIS)?', type: 'radio', options: ynu },
          { name: 'effectiveDate', label: 'When does or did your Medicare start?', type: 'date' },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'annuity-retirement', audience: 'Individuals & Families', title: 'Annuities & Retirement Income',
    blurb: 'Guaranteed income and tax-deferred growth. Not a bank deposit.',
    sections: [
      personContact,
      {
        title: 'Your retirement picture',
        fields: [
          { name: 'retirementAge', label: 'Age you plan to retire or did retire', type: 'number', required: true },
          { name: 'goal', label: 'Main goal', type: 'radio', options: ['Guaranteed income for life', 'Grow safely with protection from loss', 'Move an old 401(k)/IRA', 'Leave money to heirs'], required: true },
          { name: 'fundsAmount', label: 'Approximate amount to place', type: 'select', options: ['Under $50,000', '$50,000 to $100,000', '$100,000 to $250,000', '$250,000 to $500,000', 'Over $500,000'], required: true },
          { name: 'fundsSource', label: 'Where would the money come from?', type: 'multi', options: ['Savings / CDs', '401(k) or 403(b)', 'Traditional IRA', 'Roth IRA', 'Existing annuity', 'Sale of a home or business'] },
          { name: 'incomeStart', label: 'When would you need income to start?', type: 'select', options: ['Now', '1 to 5 years', '5 to 10 years', 'Over 10 years'] },
          { name: 'existingAnnuity', label: 'Do you already own an annuity?', type: 'radio', options: yn },
          { name: 'riskComfort', label: 'Comfort with market risk', type: 'radio', options: ['Very low', 'Moderate', 'Comfortable'] },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'policy-review', audience: 'Individuals & Families', title: 'Free Policy Review',
    blurb: 'Send us what you have now and we will tell you plainly whether it still fits.',
    sections: [
      personContact,
      {
        title: 'What you own',
        fields: [
          { name: 'policyType', label: 'Type of policy', type: 'multi', options: ['Term life', 'Whole life', 'Universal life / IUL', 'Final expense', 'Annuity', 'Health', 'Medicare', 'Not sure'], required: true },
          { name: 'carrier', label: 'Carrier', type: 'text', required: true },
          { name: 'policyAge', label: 'How long have you had it?', type: 'select', options: ['Under 2 years', '2 to 5 years', '5 to 10 years', 'Over 10 years'] },
          { name: 'reviewReason', label: 'Why are you asking?', type: 'multi', options: ['Premium went up', 'Not performing as illustrated', 'Life changed (marriage, baby, job)', 'Agent is gone', 'Just want a second opinion'], required: true },
          { name: 'documents', label: 'Can you send a recent statement or illustration?', type: 'radio', options: ['Yes, I will email it', 'I need help finding it'] },
        ],
      },
      timeline(),
    ],
  },

  // ═══ Businesses and corporations ═══
  {
    id: 'small-group-health', audience: 'Businesses & Corporations', title: 'Small Business Health Insurance (2 to 50 employees)',
    blurb: 'Group health, dental and vision for small employers, including level-funded and ICHRA options.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Your team',
        fields: [
          { name: 'ftEmployees', label: 'Full-time employees (30+ hours a week)', type: 'number', required: true },
          { name: 'ptEmployees', label: 'Part-time employees', type: 'number' },
          { name: 'eligibleEmployees', label: 'Employees who would be eligible for coverage', type: 'number', required: true },
          { name: 'seasonal', label: 'Seasonal or 1099 workers?', type: 'radio', options: yn },
          { name: 'ownersOnly', label: 'Owners or spouses only (no other W-2 employees)?', type: 'radio', options: yn, required: true, help: 'This changes which plans and rules apply.' },
          { name: 'expectedEnrollment', label: 'How many do you expect to enroll?', type: 'number' },
          { name: 'withOtherCoverage', label: 'Employees who will likely decline because of other coverage', type: 'number' },
          { name: 'avgAge', label: 'Approximate average employee age', type: 'number' },
          { name: 'growth', label: 'Expecting to add employees in the next 12 months?', type: 'radio', options: ynu },
        ],
      },
      {
        title: 'Current coverage',
        fields: [
          { name: 'hasGroupPlan', label: 'Do you offer group health coverage today?', type: 'radio', options: yn, required: true },
          { name: 'currentCarrier', label: 'Current carrier', type: 'text', showIf: { field: 'hasGroupPlan', equals: 'Yes' } },
          { name: 'currentPlanType', label: 'Current plan type', type: 'select', options: ['HMO', 'PPO', 'HDHP with HSA', 'EPO', 'Level-funded', 'Not sure'], showIf: { field: 'hasGroupPlan', equals: 'Yes' } },
          { name: 'renewalDate', label: 'Renewal date', type: 'date', showIf: { field: 'hasGroupPlan', equals: 'Yes' } },
          { name: 'renewalIncrease', label: 'Renewal rate increase quoted (%)', type: 'number', showIf: { field: 'hasGroupPlan', equals: 'Yes' } },
          { name: 'monthlyPremium', label: 'Total monthly premium today', type: 'number', showIf: { field: 'hasGroupPlan', equals: 'Yes' } },
          { name: 'whyShopping', label: 'Why are you looking?', type: 'multi', options: ['Renewal too high', 'Offering benefits for the first time', 'Poor service', 'Network problems', 'Recruiting and retention', 'Broker changed'], required: true },
        ],
      },
      {
        title: 'What you want to offer',
        fields: [
          { name: 'benefitsWanted', label: 'Benefits you want quoted', type: 'multi', options: ['Medical', 'Dental', 'Vision', 'Group life', 'Short-term disability', 'Long-term disability', 'Voluntary / worksite', 'Telehealth', 'HSA / HRA / ICHRA'], required: true },
          { name: 'funding', label: 'Funding approach', type: 'radio', options: ['Fully insured', 'Level-funded', 'ICHRA (employer stipend)', 'Not sure, advise me'], required: true },
          { name: 'employerContribEE', label: 'Employer share of employee-only premium', type: 'select', options: ['50%', '60%', '70%', '80%', '90%', '100%', 'Not decided'] },
          { name: 'employerContribDep', label: 'Employer share of dependent premium', type: 'select', options: ['0%', '25%', '50%', '75%', '100%', 'Not decided'] },
          { name: 'waitingPeriod', label: 'Waiting period for new hires', type: 'select', options: ['None (first of month after hire)', '30 days', '60 days', '90 days', 'Not decided'] },
          { name: 'budgetPerEmployee', label: 'Target employer budget per employee per month', type: 'number' },
          { name: 'currentBOR', label: 'Current broker or agency', type: 'text' },
        ],
      },
      timeline([
        { name: 'censusReady', label: 'Can you provide an employee census (age, ZIP, coverage tier)?', type: 'radio', options: ['Yes, I can send it now', 'Yes, later', 'I need a template'], required: true },
      ]),
    ],
  },
  {
    id: 'corporate-group-health', audience: 'Businesses & Corporations', title: 'Corporate & Large Group Health (50+ employees)',
    blurb: 'Fully insured, level-funded and self-funded benefits programs for mid-size and large employers.',
    sections: [
      businessContact,
      {
        title: 'Organization',
        fields: [
          { name: 'parentCompany', label: 'Parent company or controlled group', type: 'text' },
          { name: 'locations', label: 'Number of work locations', type: 'number', required: true },
          { name: 'multiState', label: 'Employees in more than one state?', type: 'radio', options: yn, required: true },
          { name: 'unionized', label: 'Any union or collectively bargained employees?', type: 'radio', options: yn, required: true },
          { name: 'peo', label: 'Do you use a PEO or co-employment arrangement?', type: 'radio', options: yn },
          { name: 'hasHR', label: 'Do you have an in-house HR or benefits team?', type: 'radio', options: yn, required: true },
          { name: 'payroll', label: 'Payroll or HRIS platform', type: 'text', placeholder: 'e.g. ADP, Paycom, Gusto' },
        ],
      },
      businessPerson,
      {
        title: 'Workforce',
        fields: [
          { name: 'ftEmployees', label: 'Full-time employees (30+ hours)', type: 'number', required: true },
          { name: 'ptEmployees', label: 'Part-time / variable-hour employees', type: 'number' },
          { name: 'eligibleEmployees', label: 'Employees eligible for coverage', type: 'number', required: true },
          { name: 'enrolled', label: 'Currently enrolled (employees only)', type: 'number' },
          { name: 'enrolledLives', label: 'Total covered lives (employees plus dependents)', type: 'number' },
          { name: 'waived', label: 'Employees who waived coverage', type: 'number' },
          { name: 'cobra', label: 'COBRA participants', type: 'number' },
          { name: 'retirees', label: 'Retirees on the plan', type: 'number' },
          { name: 'turnover', label: 'Annual turnover', type: 'select', options: ['Under 10%', '10% to 20%', '20% to 35%', 'Over 35%'] },
          { name: 'ale', label: 'Do you have 50 or more full-time equivalent employees (ACA large employer)?', type: 'radio', options: ynu, required: true },
        ],
      },
      {
        title: 'Current program and financials',
        fields: [
          { name: 'currentCarrier', label: 'Current medical carrier or TPA', type: 'text', required: true },
          { name: 'fundingNow', label: 'Current funding', type: 'radio', options: ['Fully insured', 'Level-funded', 'Self-funded (with stop-loss)', 'Not sure'], required: true },
          { name: 'renewalDate', label: 'Renewal date', type: 'date', required: true },
          { name: 'renewalIncrease', label: 'Renewal increase quoted (%)', type: 'number' },
          { name: 'annualSpend', label: 'Approximate annual medical spend', type: 'select', options: ['Under $500,000', '$500,000 to $1 million', '$1 million to $3 million', '$3 million to $10 million', 'Over $10 million'], required: true },
          { name: 'claimsAvailable', label: 'Can you provide 24 months of claims experience and large-claim reports?', type: 'radio', options: ['Yes', 'Need to request from carrier', 'Not sure'], required: true },
          { name: 'stopLoss', label: 'Current stop-loss (if self-funded)', type: 'text' },
          { name: 'pbm', label: 'Pharmacy benefit (PBM) arrangement', type: 'text' },
          { name: 'planDesigns', label: 'Number of plan options offered', type: 'number' },
          { name: 'employerContrib', label: 'Employer contribution strategy', type: 'textarea', placeholder: 'e.g. 80% of employee premium, 50% of dependents' },
        ],
      },
      {
        title: 'Goals and buying process',
        fields: [
          { name: 'benefitsWanted', label: 'Programs you want reviewed', type: 'multi', options: ['Medical', 'Pharmacy', 'Dental', 'Vision', 'Life and AD&D', 'Short-term disability', 'Long-term disability', 'Voluntary benefits', 'HSA / HRA / ICHRA', 'Wellness / EAP', 'Stop-loss', '401(k) referral', 'Workers comp referral'], required: true },
          { name: 'goals', label: 'Top priorities', type: 'multi', options: ['Cost containment', 'Predictable costs', 'Employee experience', 'Recruiting and retention', 'Compliance support', 'Technology and enrollment', 'Data and reporting', 'Advocacy and claims help'], required: true },
          { name: 'currentBOR', label: 'Current broker or consultant', type: 'text' },
          { name: 'borWilling', label: 'Would you sign a broker-of-record letter to let us request quotes?', type: 'radio', options: ['Yes', 'Maybe, tell me more', 'No'] },
          { name: 'rfpProcess', label: 'Do you run a formal RFP or bid process?', type: 'radio', options: yn },
          { name: 'decisionTimeline', label: 'Decision date', type: 'date' },
          { name: 'stakeholders', label: 'Who signs off (roles)?', type: 'text' },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'group-ancillary', audience: 'Businesses & Corporations', title: 'Group Dental, Vision, Life & Disability',
    blurb: 'Ancillary and voluntary benefits, with or without a medical plan.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Benefits',
        fields: [
          { name: 'ftEmployees', label: 'Full-time employees', type: 'number', required: true },
          { name: 'benefitsWanted', label: 'What do you want quoted?', type: 'multi', options: ['Dental', 'Vision', 'Basic life and AD&D', 'Supplemental life', 'Short-term disability', 'Long-term disability', 'Critical illness', 'Accident', 'Hospital indemnity', 'Pet insurance', 'Legal / ID theft'], required: true },
          { name: 'paidBy', label: 'Who pays?', type: 'radio', options: ['Employer pays', 'Shared', 'Employees pay (voluntary)'], required: true },
          { name: 'currentCarriers', label: 'Current carriers for these benefits', type: 'text' },
          { name: 'renewalDate', label: 'Nearest renewal date', type: 'date' },
          { name: 'medicalElsewhere', label: 'Is your medical plan with another broker?', type: 'radio', options: ynu },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'key-person-buy-sell', audience: 'Businesses & Corporations', title: 'Key Person & Buy-Sell Insurance',
    blurb: 'Protect the business if an owner or key employee dies or becomes disabled.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Ownership and people to protect',
        fields: [
          { name: 'purpose', label: 'What do you need?', type: 'multi', options: ['Key person coverage', 'Buy-sell funding', 'Loan or credit line protection', 'Partner disability buyout', 'Succession plan'], required: true },
          { name: 'owners', label: 'Number of owners', type: 'number', required: true },
          { name: 'ownerDetails', label: 'Owners and key people: name, age and ownership % (one per line)', type: 'textarea', required: true },
          { name: 'businessValue', label: 'Estimated business value', type: 'select', options: ['Under $500,000', '$500,000 to $2 million', '$2 million to $10 million', 'Over $10 million', 'Not valued yet'], required: true },
          { name: 'hasBuySell', label: 'Is there a written buy-sell agreement?', type: 'radio', options: ynu, required: true },
          { name: 'valuationMethod', label: 'How is the business valued in that agreement?', type: 'text', showIf: { field: 'hasBuySell', equals: 'Yes' } },
          { name: 'coverageTarget', label: 'Coverage needed per person', type: 'text', placeholder: 'e.g. $1 million each' },
          { name: 'existingPolicies', label: 'Existing policies on owners or key people', type: 'textarea' },
          { name: 'attorneyCPA', label: 'Do your attorney or CPA need to be included?', type: 'radio', options: yn },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'executive-benefits', audience: 'Businesses & Corporations', title: 'Executive Benefits & Retirement',
    blurb: 'Executive bonus, deferred compensation funding and IUL structuring for owners and executives.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Your objectives',
        fields: [
          { name: 'purpose', label: 'What are you trying to do?', type: 'multi', options: ['Reward and retain executives', 'Supplemental retirement income', 'Tax-advantaged owner savings', 'Fund a deferred comp plan', 'Split-dollar arrangement', 'Estate liquidity'], required: true },
          { name: 'executiveCount', label: 'Number of executives or owners to include', type: 'number', required: true },
          { name: 'annualBudget', label: 'Annual funding budget', type: 'select', options: ['Under $25,000', '$25,000 to $100,000', '$100,000 to $250,000', 'Over $250,000'], required: true },
          { name: 'taxStructure', label: 'Tax structure of the company', type: 'select', options: ['S-Corp', 'C-Corp', 'LLC', 'Partnership', 'Other'] },
          { name: 'existingPlans', label: 'Existing 401(k), pension or deferred comp plans', type: 'textarea' },
          { name: 'advisors', label: 'Attorney, CPA or financial advisor we should coordinate with', type: 'text' },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'broker-of-record', audience: 'Businesses & Corporations', title: 'Broker of Record Change',
    blurb: 'Move your existing group benefits to LifeHealthInc with no disruption to coverage.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Your current plans',
        fields: [
          { name: 'carriers', label: 'Carriers and lines of coverage you want to move', type: 'textarea', required: true, placeholder: 'e.g. Aetna medical, Guardian dental, Unum LTD' },
          { name: 'groupNumbers', label: 'Group or policy numbers (optional)', type: 'text' },
          { name: 'currentBroker', label: 'Current broker or agency', type: 'text', required: true },
          { name: 'renewalDate', label: 'Next renewal date', type: 'date', required: true },
          { name: 'ftEmployees', label: 'Covered employees', type: 'number', required: true },
          { name: 'contract', label: 'Any contract or notice period with the current broker?', type: 'radio', options: ynu },
          { name: 'reason', label: 'Reason for the change', type: 'textarea' },
        ],
      },
      timeline(),
    ],
  },
  {
    id: 'nonprofit-association', audience: 'Businesses & Corporations', title: 'Nonprofit, Association & Government Groups',
    blurb: 'Benefits for nonprofits, professional associations, churches and public-sector groups.',
    sections: [
      businessContact,
      businessPerson,
      {
        title: 'Your organization',
        fields: [
          { name: 'orgKind', label: 'Type', type: 'select', options: ['501(c)(3) nonprofit', 'Professional association', 'Church / faith-based', 'Chamber of commerce', 'School / district', 'Local government', 'Other'], required: true },
          { name: 'ftEmployees', label: 'Employees', type: 'number', required: true },
          { name: 'members', label: 'Members (if an association offering benefits to members)', type: 'number' },
          { name: 'benefitsWanted', label: 'What do you need?', type: 'multi', options: ['Employee medical', 'Dental and vision', 'Life and disability', 'Member benefits program', 'Retirement plan referral'], required: true },
          { name: 'budgetCycle', label: 'Budget or board approval cycle', type: 'text' },
          { name: 'taxExemptId', label: 'Do you have grant or funding restrictions on benefits spending?', type: 'radio', options: ynu },
        ],
      },
      timeline(),
    ],
  },

  // ═══ Partners ═══
  {
    id: 'agent-partner', audience: 'Agents & Partners', title: 'Agent & Referral Partner Application',
    blurb: 'Licensed agents who want to write with LifeHealthInc, and professionals who refer clients.',
    sections: [
      {
        title: 'About you',
        fields: [
          { name: 'firstName', label: 'First name', type: 'text', required: true },
          { name: 'lastName', label: 'Last name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'state', label: 'Resident state', type: 'select', options: STATES, required: true },
          { name: 'partnerKind', label: 'How do you want to work with us?', type: 'radio', options: ['Licensed agent (contracting)', 'Referral partner (CPA, attorney, advisor)', 'Agency / team lead'], required: true },
        ],
      },
      {
        title: 'Licensing and experience',
        fields: [
          { name: 'npn', label: 'National Producer Number (NPN)', type: 'text', showIf: { field: 'partnerKind', equals: 'Licensed agent (contracting)' } },
          { name: 'licensedStates', label: 'States you are licensed in', type: 'text' },
          { name: 'lines', label: 'Lines you are licensed for', type: 'multi', options: ['Life', 'Health', 'Medicare', 'Annuities', 'Property & casualty', 'Securities'] },
          { name: 'eo', label: 'Do you carry E&O insurance?', type: 'radio', options: yn, showIf: { field: 'partnerKind', equals: 'Licensed agent (contracting)' } },
          { name: 'ahip', label: 'AHIP certified for the current year?', type: 'radio', options: yn },
          { name: 'years', label: 'Years in the business', type: 'number' },
          { name: 'currentImo', label: 'Current IMO / FMO / agency', type: 'text' },
          { name: 'notes', label: 'Tell us about your book and what you are looking for', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'service-request', audience: 'Existing Clients', title: 'Existing Client Service Request',
    blurb: 'Policy change, beneficiary update, billing question, claim help or new dependents.',
    sections: [
      {
        title: 'Who you are',
        fields: [
          { name: 'firstName', label: 'First name', type: 'text', required: true },
          { name: 'lastName', label: 'Last name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'clientType', label: 'You are', type: 'radio', options: ['Individual client', 'Employer / group contact', 'Employee on a group plan'], required: true },
        ],
      },
      {
        title: 'What you need',
        fields: [
          { name: 'requestType', label: 'Request type', type: 'select', options: ['Beneficiary change', 'Address or contact change', 'Add or remove a dependent', 'Billing or payment question', 'Claim assistance', 'Coverage change or increase', 'Cancel or lapse question', 'ID cards / documents', 'Other'], required: true },
          { name: 'carrier', label: 'Carrier', type: 'text' },
          { name: 'policyLast4', label: 'Last 4 of policy number (never the full number)', type: 'text' },
          { name: 'urgency', label: 'How urgent is this?', type: 'radio', options: ['Urgent (coverage at risk)', 'This week', 'No rush'], required: true },
          { name: 'details', label: 'Details', type: 'textarea', required: true, help: 'Do not include SSN, card or bank numbers.' },
        ],
      },
    ],
  },
];

export const getForm = (id) => INTAKE_FORMS.find((f) => f.id === id);

export const AUDIENCES = ['Individuals & Families', 'Businesses & Corporations', 'Agents & Partners', 'Existing Clients'];

export const CONSENT_TEXT =
  'By submitting, I agree that LifeHealthInc and its licensed advisors may contact me by phone, text message and email about insurance, including with automated technology, at the number and email provided. Message and data rates may apply. Consent is not a condition of purchase. I can reply STOP to opt out of texts at any time.';
