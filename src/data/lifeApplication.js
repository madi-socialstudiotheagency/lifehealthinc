// The full life application, in the same order Matthew uses on a call: easy
// basics first, then identity, who it is for, coverage, the carrier's health
// questions (full meaning kept, Matthew certifies every one was asked), lifestyle,
// payment and delivery. Filling it out is the whole process; nobody has to call.
//
// Fields marked `secure: true` (SSN, driver's license, bank numbers) never go
// into the emailed or Netlify Forms copy. They are sent to
// netlify/functions/secure-submit.js, encrypted, and shown only on Matthew's
// private approval page. Everywhere else they appear as the last 4 digits.

import { STATES } from './states';

const yn = ['Yes', 'No'];
const DETAILS = 'What was it, roughly when, how was it treated, and the doctor or hospital name';

// A yes/no question plus a details box that appears only on "Yes".
const yesDetails = (name, label, detailsLabel = DETAILS) => [
  { name, label, type: 'radio', options: yn, required: true },
  { name: name + 'Details', label: detailsLabel, type: 'textarea', required: true, showIf: { field: name, equals: 'Yes' } },
];

export const APP_BASICS = {
  title: 'Your details',
  fields: [
    { type: 'note', name: '_introBasics', text: 'This takes about 15 minutes. Most of it is quick yes or no questions, and you only add details if something is a yes. Your progress is saved as you go through the steps.' },
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'middleName', label: 'Middle name', type: 'text' },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'street', label: 'Street address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: STATES, required: true },
    { name: 'zip', label: 'ZIP code', type: 'text', required: true, digits: [5, 5] },
    { name: 'phone', label: 'Phone number', type: 'tel', required: true },
    { name: 'email', label: 'Email for your policy documents', type: 'email', required: true },
    { name: 'dob', label: 'Date of birth', type: 'date', required: true },
    { name: 'gender', label: 'Sex (as used by carriers for pricing)', type: 'select', options: ['Female', 'Male'], required: true },
    { name: 'birthState', label: 'State you were born in (or country, if outside the U.S.)', type: 'text', required: true },
    { name: 'citizenship', label: 'Are you a U.S. citizen or permanent resident?', type: 'radio', options: yn, required: true },
    { name: 'hasLicense', label: "Do you have a driver's license?", type: 'radio', options: yn, required: true },
    { name: 'licenseNumber', label: "Driver's license number", type: 'text', required: true, secure: true, showIf: { field: 'hasLicense', equals: 'Yes' } },
    { name: 'licenseState', label: 'State that issued it', type: 'select', options: STATES, required: true, showIf: { field: 'hasLicense', equals: 'Yes' } },
    { name: 'occupation', label: 'What do you do for work?', type: 'text', required: true },
    { name: 'annualIncome', label: 'Yearly income (a close estimate is fine)', type: 'text', required: true, placeholder: 'e.g. $65,000', help: 'This makes sure the coverage amount fits.' },
    { name: 'maritalStatus', label: 'Marital status', type: 'select', options: ['Single', 'Married', 'Domestic partner', 'Divorced', 'Widowed'], required: true },
    { name: 'height', label: 'Height', type: 'text', required: true, placeholder: "5'10\"" },
    { name: 'weight', label: 'Weight (lbs)', type: 'number', required: true },
  ],
};

export const APP_IDENTITY = {
  title: 'Identity',
  fields: [
    { type: 'note', name: '_introSsn', text: 'The carrier needs your Social Security number to verify your identity and set up the policy. It is encrypted, never emailed, and shared only with the insurance company.' },
    { name: 'ssn', label: 'Social Security number', type: 'text', required: true, secure: true, digits: [9, 9], placeholder: '123-45-6789', inputMode: 'numeric' },
  ],
};

export const APP_OWNER = {
  title: 'Who owns and pays for the policy',
  fields: [
    { name: 'ownerType', label: 'Is the policy owned and paid for by you?', type: 'radio', options: ['Yes, I own and pay for it', 'Someone else owns or pays for it'], required: true },
    { name: 'ownerName', label: "Owner or payor's full legal name", type: 'text', required: true, showIf: { field: 'ownerType', equals: 'Someone else owns or pays for it' } },
    { name: 'ownerRelationship', label: 'Their relationship to you', type: 'text', required: true, showIf: { field: 'ownerType', equals: 'Someone else owns or pays for it' } },
    { name: 'ownerSsn', label: "Owner or payor's Social Security number", type: 'text', required: true, secure: true, digits: [9, 9], inputMode: 'numeric', showIf: { field: 'ownerType', equals: 'Someone else owns or pays for it' } },
    { name: 'ownerAddress', label: "Owner or payor's address", type: 'textarea', required: true, showIf: { field: 'ownerType', equals: 'Someone else owns or pays for it' } },
    { name: 'ownerPhone', label: "Owner or payor's phone", type: 'tel', showIf: { field: 'ownerType', equals: 'Someone else owns or pays for it' } },
  ],
};

const beneficiary = (n, gate) => [
  { name: `ben${n}Name`, label: `Beneficiary ${n}: full legal name`, type: 'text', required: true, ...(gate ? { showIf: gate } : {}) },
  { name: `ben${n}Relationship`, label: `Beneficiary ${n}: relationship to you`, type: 'text', required: true, ...(gate ? { showIf: gate } : {}) },
  { name: `ben${n}Dob`, label: `Beneficiary ${n}: date of birth`, type: 'date', required: true, ...(gate ? { showIf: gate } : {}) },
  { name: `ben${n}Percent`, label: `Beneficiary ${n}: percentage of the benefit`, type: 'number', required: true, ...(gate ? { showIf: gate } : {}) },
];

export const APP_BENEFICIARIES = {
  title: 'Who you want to protect',
  fields: [
    { type: 'note', name: '_introBen', text: 'Spelling matters here, since these are the people who get paid. Percentages for your primary beneficiaries should add up to 100.' },
    ...beneficiary(1),
    { name: 'addBen2', label: 'Add another primary beneficiary?', type: 'radio', options: yn, required: true },
    ...beneficiary(2, { field: 'addBen2', equals: 'Yes' }),
    { name: 'addBen3', label: 'Add a third primary beneficiary?', type: 'radio', options: yn, showIf: { field: 'addBen2', equals: 'Yes' } },
    ...beneficiary(3, { field: 'addBen3', equals: 'Yes' }),
    { name: 'hasContingent', label: "If they weren't around, is there a backup person (contingent beneficiary)?", type: 'radio', options: yn, required: true },
    { name: 'contName', label: 'Contingent beneficiary: full legal name', type: 'text', required: true, showIf: { field: 'hasContingent', equals: 'Yes' } },
    { name: 'contRelationship', label: 'Contingent beneficiary: relationship to you', type: 'text', required: true, showIf: { field: 'hasContingent', equals: 'Yes' } },
    { name: 'contDob', label: 'Contingent beneficiary: date of birth', type: 'date', required: true, showIf: { field: 'hasContingent', equals: 'Yes' } },
    { name: 'contPercent', label: 'Contingent beneficiary: percentage', type: 'number', required: true, showIf: { field: 'hasContingent', equals: 'Yes' } },
    { name: 'hasAddressee', label: 'Is there someone we should notify if a payment is ever missed (secondary addressee)?', type: 'radio', options: yn, required: true },
    { name: 'addresseeName', label: 'Their full name', type: 'text', required: true, showIf: { field: 'hasAddressee', equals: 'Yes' } },
    { name: 'addresseeAddress', label: 'Their mailing address', type: 'textarea', required: true, showIf: { field: 'hasAddressee', equals: 'Yes' } },
  ],
};

export const APP_OTHER_COVERAGE = [
  ...yesDetails('existingInsurance', 'Do you currently have any other life insurance, disability insurance or annuity?', 'Company, type of policy and amount for each'),
  { name: 'replacing', label: 'Will this replace or change any existing life insurance or annuity?', type: 'radio', options: yn, required: true },
  { name: 'tobacco', label: 'Have you used tobacco or nicotine in any form in the last 12 months? (An occasional cigar does not count.)', type: 'radio', options: yn, required: true },
];

export const APP_HEALTH = {
  title: 'Health questions',
  fields: [
    { type: 'note', name: '_introHealth', text: 'These are the standard health questions the carrier asks everyone. Answer yes or no, and only add details if something is a yes.' },
    ...yesDetails('hiv', 'Have you ever tested positive for HIV, or been diagnosed with or treated for AIDS or AIDS-related complex (ARC)?'),
    { type: 'note', name: '_introHealth7', text: 'In the last 7 years, has a doctor diagnosed you with, or treated you for, any of the following?' },
    ...yesDetails('h7Heart', 'Any heart or circulation disorder, such as high blood pressure, heart attack, chest pain, irregular heartbeat, stroke or aneurysm?'),
    ...yesDetails('h7Digestive', 'Any digestive, liver or glandular disorder, such as diabetes, cirrhosis, hepatitis, pancreatitis, Crohn\'s disease or colitis?'),
    ...yesDetails('h7Lung', 'Any breathing or lung disorder, such as asthma, emphysema, COPD or sleep apnea?'),
    ...yesDetails('h7Cancer', 'Any cancer, tumor, anemia or other blood disorder, seizures, or any mental or nervous disorder, including bipolar disorder, schizophrenia, Alzheimer\'s disease or dementia?'),
    ...yesDetails('h7Kidney', 'Any disorder of the kidneys, bladder, prostate or reproductive organs, or any sexually transmitted disease?'),
    ...yesDetails('h7Musculo', 'Any arthritis, lupus or connective tissue disorder, or any disorder of the back, spine, joints, muscles or nerves?'),
    ...yesDetails('h7Other', 'Any other illness, injury, surgery or condition not listed above?'),
    { type: 'note', name: '_introHealth12', text: 'In the last 12 months:' },
    ...yesDetails('h12Visits', 'Have you seen a doctor or other medical provider, had surgery, been admitted to a hospital, or had any tests, such as an EKG, X-ray, MRI or CT scan?'),
    ...yesDetails('h12Pending', 'Has a doctor recommended any test, surgery or hospital stay that you have not yet had, or are you waiting on any test results?'),
    { name: 'takesMedications', label: 'Are you taking any prescription medications right now?', type: 'radio', options: yn, required: true },
    { name: 'medications', label: 'Names of your medications (and what each one is for, if you know)', type: 'textarea', required: true, showIf: { field: 'takesMedications', equals: 'Yes' }, placeholder: 'e.g. Metformin (diabetes), Lisinopril (blood pressure)' },
    { name: 'doctorName', label: 'Your primary doctor or clinic (name, city and phone), if you have one', type: 'textarea' },
  ],
};

export const APP_LIFESTYLE = {
  title: 'Lifestyle questions',
  fields: [
    { type: 'note', name: '_introLife5', text: 'These are standard for everyone. In the last 5 years:' },
    ...yesDetails('convictions', 'Have you been convicted of a misdemeanor or felony, including driving under the influence (DUI), had your driver\'s license suspended or revoked, or are you currently on probation or parole?', 'What happened and when'),
    ...yesDetails('drugUse', 'Have you used any illegal drugs, or has a doctor or counselor recommended treatment for alcohol or drug use?', 'What and when, and any treatment'),
    { type: 'note', name: '_introLife2', text: 'In the last 2 years, or planned for the next 2 years:' },
    ...yesDetails('hazardous', 'Have you taken part, or do you plan to take part, in skydiving, hang gliding, scuba diving, mountain or rock climbing, rodeo, motor racing, or professional sports?', 'Which activity and how often'),
    ...yesDetails('aviation', 'Have you flown, or do you plan to fly, as a pilot, student pilot or crew member?', 'Type of flying, aircraft and hours per year'),
  ],
};

const DRAFT_DAYS = Array.from({ length: 28 }, (_, i) => String(i + 1));

export const APP_PAYMENT = {
  title: 'Payment',
  fields: [
    { type: 'note', name: '_introPay', text: 'Nothing is charged until the carrier approves your policy. Bank details are encrypted, never emailed, and shared only with the insurance company.' },
    { name: 'bankDraft', label: 'How would you like to pay?', type: 'radio', options: ['Monthly bank draft (most common)', 'Another way, set up with the carrier'], required: true },
    { name: 'bankName', label: 'Bank name', type: 'text', required: true, showIf: { field: 'bankDraft', equals: 'Monthly bank draft (most common)' } },
    { name: 'accountType', label: 'Account type', type: 'radio', options: ['Checking', 'Savings'], required: true, showIf: { field: 'bankDraft', equals: 'Monthly bank draft (most common)' } },
    { name: 'routingNumber', label: 'Routing number (9 digits)', type: 'text', required: true, secure: true, digits: [9, 9], inputMode: 'numeric', showIf: { field: 'bankDraft', equals: 'Monthly bank draft (most common)' } },
    { name: 'accountNumber', label: 'Account number', type: 'text', required: true, secure: true, digits: [4, 17], inputMode: 'numeric', showIf: { field: 'bankDraft', equals: 'Monthly bank draft (most common)' } },
    { name: 'draftDay', label: 'Day of the month for the payment', type: 'select', options: DRAFT_DAYS, required: true, showIf: { field: 'bankDraft', equals: 'Monthly bank draft (most common)' } },
    { name: 'socialSecurity', label: 'Do you receive Social Security? We can line the payment up with that date.', type: 'radio', options: yn, required: true },
    { name: 'socialSecurityDay', label: 'When does your Social Security arrive?', type: 'select', options: ['2nd Wednesday', '3rd Wednesday', '4th Wednesday', 'The 3rd of the month', 'Not sure'], showIf: { field: 'socialSecurity', equals: 'Yes' } },
  ],
};

export const APP_DELIVERY = {
  title: 'Delivery and confirmation',
  fields: [
    { name: 'policyDelivery', label: 'How would you like to receive your policy?', type: 'radio', options: ['Electronically (email)', 'By mail'], required: true },
    { type: 'note', name: '_introSign', text: 'When you submit, the carrier emails you the application to e-sign. It includes a medical records authorization, which lets the carrier verify the answers above. You will not need to call anyone.' },
    { name: 'attest', label: 'Confirmation', type: 'multi', options: ['I confirm these answers are true and complete to the best of my knowledge'], required: true },
    { name: 'notes', label: 'Anything else Matthew should know? (optional)', type: 'textarea' },
  ],
};

// Full application for a life product: its own coverage questions in the middle.
export const lifeApplication = (coverageSection) => [
  APP_BASICS,
  APP_IDENTITY,
  APP_OWNER,
  APP_BENEFICIARIES,
  { ...coverageSection, fields: [...coverageSection.fields, ...APP_OTHER_COVERAGE] },
  APP_HEALTH,
  APP_LIFESTYLE,
  APP_PAYMENT,
  APP_DELIVERY,
];
