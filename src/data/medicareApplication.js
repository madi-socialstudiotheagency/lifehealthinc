// Medicare application: the questions a licensed advisor needs to name exact
// Advantage / Supplement / Part D plans in the person's county with no call.
// The Medicare number is `secure: true` (encrypted, never emailed).

const yn = ['Yes', 'No'];
const ynu = ['Yes', 'No', 'Not sure'];

export function medicareSections() {
  return [
    {
      title: 'Where you live',
      fields: [
        { name: 'county', label: 'County you live in', type: 'text', required: true, help: 'Plans and prices are set by county, so this matters. Not sure? Your ZIP code is enough and we will confirm.' },
        { name: 'gender', label: 'Sex (as shown on your Medicare card)', type: 'select', options: ['Female', 'Male'], required: true },
        { name: 'tobacco', label: 'Have you used tobacco or nicotine in the last 12 months?', type: 'radio', options: yn, required: true },
        { name: 'snowbird', label: 'Do you spend part of the year in another state?', type: 'radio', options: yn, help: 'This decides whether you need a plan that works nationwide.' },
        { name: 'otherState', label: 'Which state and for how many months?', type: 'text', showIf: { field: 'snowbird', equals: 'Yes' } },
      ],
    },
    {
      title: 'Your Medicare',
      fields: [
        { name: 'medicareStatus', label: 'Where are you?', type: 'radio', options: ['Turning 65 soon', 'On Medicare now, want to compare', 'Under 65 on disability', 'Retiring from an employer plan'], required: true },
        { name: 'partA', label: 'Do you have Medicare Part A (hospital)?', type: 'radio', options: ynu, required: true },
        { name: 'partB', label: 'Do you have Medicare Part B (medical)?', type: 'radio', options: ynu, required: true },
        { name: 'partBStart', label: 'Date your Part B starts or started', type: 'date', help: 'It is printed on your red, white and blue Medicare card. If it started in the last 6 months you get guaranteed acceptance on a Supplement.' },
        { name: 'mbi', label: 'Medicare number (optional)', type: 'text', secure: true, placeholder: '1EG4-TE5-MK73', help: 'On your Medicare card. It lets us confirm your eligibility and exact plans. Skip it if you do not have your card handy.' },
        { name: 'cardName', label: 'Your name exactly as printed on the Medicare card (optional)', type: 'text' },
        { name: 'onDisabilityOrESRD', label: 'Do you have Medicare because of a disability, ALS or kidney failure (ESRD)?', type: 'radio', options: ynu },
        { name: 'currentPlan', label: 'What coverage do you have now?', type: 'select', options: ['Original Medicare only', 'Medicare Supplement (Medigap)', 'Medicare Advantage', 'Employer or retiree plan', 'Medicaid', 'None'], required: true },
        { name: 'currentCarrier', label: 'Current carrier and plan name', type: 'text', showIf: { field: 'currentPlan', equals: 'Medicare Advantage' }, help: 'For example Humana Gold Plus HMO, or Plan G with Mutual of Omaha.' },
        { name: 'currentCarrierSupp', label: 'Current carrier and plan letter', type: 'text', showIf: { field: 'currentPlan', equals: 'Medicare Supplement (Medigap)' } },
        { name: 'currentPremium', label: 'What do you pay per month today for that plan?', type: 'number' },
        { name: 'employerEnds', label: 'Date your employer or retiree coverage ends', type: 'date', showIf: { field: 'currentPlan', equals: 'Employer or retiree plan' } },
        { name: 'whyChange', label: 'Why are you looking?', type: 'multi', options: ['Turning 65', 'Premium went up', 'My doctor or drug is no longer covered', 'Want lower out of pocket costs', 'Want more benefits (dental, vision, hearing)', 'Losing employer coverage', 'Moved', 'Just want a second opinion'] },
        { name: 'medicaidExtraHelp', label: 'Do you get Medicaid, Extra Help (LIS) or a Medicare Savings Program?', type: 'radio', options: ynu, help: 'If so, there are plans with $0 premiums and extra benefits made for you.' },
      ],
    },
    {
      title: 'Your doctors and hospital',
      fields: [
        { name: 'pcp', label: 'Primary care doctor (name and city)', type: 'text', required: true },
        { name: 'specialists', label: 'Specialists you see and their names', type: 'textarea', placeholder: 'e.g. Dr. Patel, cardiologist, Tampa', help: 'We check each one against every plan network so nobody gets dropped.' },
        { name: 'hospital', label: 'Hospital you want to use', type: 'text' },
        { name: 'networkFlex', label: 'How do you feel about needing a referral or staying in a network?', type: 'radio', options: ['I want to see any doctor, no referrals (Supplement or PPO)', 'I am fine staying in a network to save money (HMO)', 'Not sure, explain'], required: true },
      ],
    },
    {
      title: 'Your prescriptions',
      fields: [
        { name: 'prescriptions', label: 'Do you take regular prescriptions?', type: 'radio', options: ynu, required: true },
        {
          name: 'prescriptionNames',
          label: 'List each drug with the dose and how often',
          type: 'textarea',
          required: true,
          showIf: { field: 'prescriptions', equals: 'Yes' },
          placeholder: 'e.g. Eliquis 5 mg twice a day\nMetformin 500 mg twice a day\nLantus 20 units nightly',
          help: 'Exact drug, strength and how often. This is how we price your drug costs on every plan.',
        },
        { name: 'insulin', label: 'Do you use insulin?', type: 'radio', options: yn, showIf: { field: 'prescriptions', equals: 'Yes' }, help: 'Some plans cap insulin at $35 a month.' },
        { name: 'pharmacy', label: 'Pharmacy you use (name and street or ZIP)', type: 'text', required: true },
        { name: 'mailOrder', label: 'Would you use mail order to save money?', type: 'radio', options: ynu },
      ],
    },
    {
      title: 'Your health and what matters to you',
      fields: [
        {
          name: 'conditions',
          label: 'Do you have any of these? (special plans exist for some)',
          type: 'multi',
          options: ['Diabetes', 'Heart failure or heart disease', 'COPD or lung disease', 'Kidney disease', 'Cancer', 'Stroke', 'Dementia or memory loss', 'Depression', 'None of these'],
        },
        { name: 'hospitalLastYear', label: 'Were you in the hospital or a nursing facility in the last year?', type: 'radio', options: yn },
        { name: 'planPreference', label: 'What are you leaning toward?', type: 'radio', options: ['Medicare Supplement (Medigap) plus a drug plan', 'Medicare Advantage (all in one)', 'Not sure, show me both'], required: true },
        { name: 'suppLetter', label: 'Which Supplement plan?', type: 'select', options: ['Plan G', 'Plan N', 'Plan F (if eligible)', 'Plan A, B or high deductible G', 'Not sure, recommend one'], showIf: { field: 'planPreference', equals: 'Medicare Supplement (Medigap) plus a drug plan' } },
        { name: 'budgetPriority', label: 'What matters most?', type: 'radio', options: ['Lowest monthly premium', 'Lowest total cost when I use care', 'Predictable costs, no surprises', 'Most extra benefits'], required: true },
        { name: 'extras', label: 'Extra benefits you would use', type: 'multi', options: ['Dental', 'Vision and glasses', 'Hearing aids', 'Over the counter allowance', 'Gym membership', 'Rides to the doctor', 'Meal delivery after a hospital stay'] },
        { name: 'maxPremium', label: 'The most you would like to pay per month in premium', type: 'number' },
      ],
    },
    {
      title: 'Start date',
      fields: [
        { name: 'enrollReason', label: 'Which describes you?', type: 'select', options: ['Turning 65 (first time enrolling)', 'Annual Enrollment (October 15 to December 7)', 'I lost or am losing other coverage', 'I moved', 'I qualify for Extra Help or Medicaid', 'Not sure'], required: true, help: 'We confirm which enrollment window you qualify for.' },
        { name: 'effectiveDate', label: 'When do you want the new plan to start?', type: 'select', options: ['As soon as possible', 'January 1, 2027', 'The first of next month', 'A specific date (add in notes)'], required: true },
        { name: 'notes', label: 'Anything else we should know? (optional)', type: 'textarea' },
      ],
    },
  ];
}
