// Full annuity application: everything a carrier's annuity application and the
// best-interest suitability review (NAIC Model Regulation #275, adopted by
// most states) ask for, so Matthew can submit it without a call.
//
// `secure: true` fields (SSN, license, bank numbers) follow the same path as the
// life application: encrypted by netlify/functions/secure-submit.js, never
// emailed, shown only on Matthew's approval page.

import { STATES } from './states';
import { APP_BENEFICIARIES } from './lifeApplication';

const yn = ['Yes', 'No'];
const JOINT = { field: 'hasJointOwner', equals: 'Yes' };
const ACH = { field: 'fundingMethod', equals: 'Bank transfer (ACH) from my checking or savings' };

const ANN_BASICS = {
  title: 'Your details',
  fields: [
    { type: 'note', name: '_annIntro', text: 'This is the full annuity application, about 12 minutes. Your answers are saved on this device as you go, and you can come back to finish.' },
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'middleName', label: 'Middle name', type: 'text' },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'street', label: 'Street address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: STATES, required: true },
    { name: 'zip', label: 'ZIP code', type: 'text', required: true, digits: [5, 5] },
    { name: 'phone', label: 'Phone number', type: 'tel', required: true },
    { name: 'email', label: 'Email for your contract documents', type: 'email', required: true },
    { name: 'dob', label: 'Date of birth', type: 'date', required: true },
    { name: 'gender', label: 'Sex (used to price lifetime income)', type: 'select', options: ['Female', 'Male'], required: true },
    { name: 'maritalStatus', label: 'Marital status', type: 'select', options: ['Single', 'Married', 'Domestic partner', 'Divorced', 'Widowed'], required: true },
    { name: 'citizenship', label: 'Are you a U.S. citizen or permanent resident?', type: 'radio', options: yn, required: true },
    { name: 'employment', label: 'Employment status', type: 'select', options: ['Employed', 'Self-employed', 'Retired', 'Not employed'], required: true },
    { name: 'occupation', label: 'Occupation (or former occupation, if retired)', type: 'text', required: true },
  ],
};

const ANN_IDENTITY = {
  title: 'Identity',
  fields: [
    { type: 'note', name: '_annSsn', text: 'Carriers verify identity on every annuity (a federal anti-money-laundering rule). These numbers are encrypted, never emailed, and shared only with the insurance company.' },
    { name: 'ssn', label: 'Social Security number', type: 'text', required: true, secure: true, digits: [9, 9], placeholder: '123-45-6789', inputMode: 'numeric' },
    { name: 'idType', label: 'Photo ID', type: 'radio', options: ["Driver's license", 'State ID', 'Passport'], required: true },
    { name: 'licenseNumber', label: 'ID number', type: 'text', required: true, secure: true },
    { name: 'licenseState', label: 'Issuing state (or country, for a passport)', type: 'text', required: true },
    { name: 'idExpires', label: 'Expiration date', type: 'date', required: true },
  ],
};

const ANN_OWNERSHIP = {
  title: 'Owner and annuitant',
  fields: [
    { type: 'note', name: '_annOwner', text: 'The owner controls the contract. The annuitant is the person whose life the income is based on. For most people, both are you.' },
    { name: 'ownerIsAnnuitant', label: 'Are you both the owner and the annuitant?', type: 'radio', options: ['Yes', 'No, someone else is the annuitant'], required: true },
    { name: 'annuitantName', label: "Annuitant's full legal name", type: 'text', required: true, showIf: { field: 'ownerIsAnnuitant', equals: 'No, someone else is the annuitant' } },
    { name: 'annuitantDob', label: "Annuitant's date of birth", type: 'date', required: true, showIf: { field: 'ownerIsAnnuitant', equals: 'No, someone else is the annuitant' } },
    { name: 'annuitantRelationship', label: 'Their relationship to you', type: 'text', required: true, showIf: { field: 'ownerIsAnnuitant', equals: 'No, someone else is the annuitant' } },
    { name: 'hasJointOwner', label: 'Will there be a joint owner (usually a spouse)?', type: 'radio', options: yn, required: true },
    { name: 'jointName', label: "Joint owner's full legal name", type: 'text', required: true, showIf: JOINT },
    { name: 'jointDob', label: "Joint owner's date of birth", type: 'date', required: true, showIf: JOINT },
    { name: 'jointRelationship', label: 'Their relationship to you', type: 'text', required: true, showIf: JOINT },
    { name: 'jointSsn', label: "Joint owner's Social Security number", type: 'text', required: true, secure: true, digits: [9, 9], inputMode: 'numeric', showIf: JOINT },
  ],
};

const ANN_PRODUCT = {
  title: 'Your annuity',
  fields: [
    { name: 'annuityType', label: 'Which type are you applying for?', type: 'radio', options: ['Fixed rate (MYGA), a guaranteed rate for a set term', 'Fixed indexed (FIA), index-linked growth with a 0% floor', 'Immediate income (SPIA), income starting now', 'Deferred income (DIA), income starting later', 'Not sure, recommend the best fit'], required: true },
    { name: 'goal', label: 'Main goals', type: 'multi', options: ['Guaranteed income for life', 'Safe growth, no market losses', 'Beat my CD or savings rate', 'Move an old 401(k) or IRA', 'Leave money to heirs', 'Lower taxes now (tax deferral)'], required: true },
    { name: 'premium', label: 'Amount to place in the annuity', type: 'text', required: true, placeholder: 'e.g. $150,000' },
    { name: 'termYears', label: 'Guarantee period or term', type: 'select', options: ['3 years', '5 years', '7 years', '10 years', 'Lifetime income', 'Not sure'], required: true },
    { name: 'incomeStart', label: 'When do you want income to start?', type: 'select', options: ['Right away', 'In 1 to 5 years', 'In 5 to 10 years', 'In over 10 years', 'No income needed, growth only'], required: true },
    { name: 'incomeType', label: 'If you take income, whose lifetime should it cover?', type: 'select', options: ['Just me', 'Me and my spouse (joint life)', 'A set number of years', 'Not taking income'], required: true },
  ],
};

const ANN_FUNDING = {
  title: 'Funding',
  fields: [
    { name: 'taxStatus', label: 'What kind of money is it?', type: 'radio', options: ['Non-qualified (already taxed, like savings or a CD)', 'Traditional IRA', 'Roth IRA', '401(k), 403(b) or 457 plan', 'SEP or SIMPLE IRA', 'Mixed, more than one'], required: true },
    { name: 'fundingMethod', label: 'How will it be funded?', type: 'radio', options: ['Direct transfer or rollover from another institution', '1035 exchange from an existing annuity or life policy', 'Bank transfer (ACH) from my checking or savings', 'Check'], required: true },
    { name: 'sourceInstitution', label: 'Current institution holding the money (bank, brokerage, 401(k) plan or insurer)', type: 'text', required: true },
    { name: 'sourceAccountType', label: 'Type of account there', type: 'text', placeholder: 'e.g. Fidelity 401(k), Chase CD, Athene annuity', required: true },
    { name: 'sourceSurrender', label: 'Would moving it trigger a surrender charge or penalty there?', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true },
    { name: 'sourceSurrenderDetails', label: 'Roughly how much, or when does it end?', type: 'text', showIf: { field: 'sourceSurrender', equals: 'Yes' } },
    { name: 'bankName', label: 'Bank name', type: 'text', required: true, showIf: ACH },
    { name: 'accountType', label: 'Account type', type: 'radio', options: ['Checking', 'Savings'], required: true, showIf: ACH },
    { name: 'routingNumber', label: 'Routing number (9 digits)', type: 'text', required: true, secure: true, digits: [9, 9], inputMode: 'numeric', showIf: ACH },
    { name: 'accountNumber', label: 'Account number', type: 'text', required: true, secure: true, digits: [4, 17], inputMode: 'numeric', showIf: ACH },
    { name: 'existingAnnuity', label: 'Do you currently own any annuities or life insurance?', type: 'radio', options: yn, required: true },
    { name: 'existingDetails', label: 'Company, type and value of each', type: 'textarea', required: true, showIf: { field: 'existingAnnuity', equals: 'Yes' } },
    { name: 'replacing', label: 'Will this replace or change any existing annuity or life insurance?', type: 'radio', options: yn, required: true },
    { name: 'recentExchange', label: 'Have you exchanged or replaced an annuity in the last 5 years?', type: 'radio', options: yn, required: true },
  ],
};

const ANN_SUITABILITY = {
  title: 'Financial profile',
  fields: [
    { type: 'note', name: '_annSuit', text: 'State law requires every annuity to be in your best interest. These questions let Matthew confirm the right product and amount, so nothing needs to be asked again later. Close estimates are fine.' },
    { name: 'householdIncome', label: 'Annual household income', type: 'select', options: ['Under $25,000', '$25,000 to $50,000', '$50,000 to $100,000', '$100,000 to $200,000', '$200,000 to $500,000', 'Over $500,000'], required: true },
    { name: 'incomeSources', label: 'Where your income comes from', type: 'multi', options: ['Wages or business', 'Social Security', 'Pension', 'IRA or 401(k) withdrawals', 'Rental or investment income', 'Other'], required: true },
    { name: 'monthlyExpenses', label: 'Monthly living expenses', type: 'select', options: ['Under $3,000', '$3,000 to $5,000', '$5,000 to $8,000', '$8,000 to $12,000', 'Over $12,000'], required: true },
    { name: 'incomeCoversExpenses', label: 'Does your income cover your expenses without this money?', type: 'radio', options: yn, required: true },
    { name: 'liquidAssets', label: 'Liquid assets (cash, savings, investments, not counting your home or this annuity)', type: 'select', options: ['Under $50,000', '$50,000 to $100,000', '$100,000 to $250,000', '$250,000 to $500,000', '$500,000 to $1 million', 'Over $1 million'], required: true },
    { name: 'netWorth', label: 'Total net worth (including your home)', type: 'select', options: ['Under $100,000', '$100,000 to $250,000', '$250,000 to $500,000', '$500,000 to $1 million', '$1 million to $3 million', 'Over $3 million'], required: true },
    { name: 'emergencyFund', label: 'After this purchase, will you still have enough cash for emergencies?', type: 'radio', options: yn, required: true },
    { name: 'needAccess', label: 'Might you need more than 10% of this money in any year during the surrender period?', type: 'radio', options: ['No', 'Yes', 'Not sure'], required: true },
    { name: 'majorExpenses', label: 'Do you expect any major expense soon (medical, long-term care, home, education)?', type: 'radio', options: yn, required: true },
    { name: 'majorExpensesDetails', label: 'What and roughly when', type: 'text', required: true, showIf: { field: 'majorExpenses', equals: 'Yes' } },
    { name: 'hasLtc', label: 'Do you have long-term care insurance or another plan for long-term care costs?', type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true },
    { name: 'taxBracket', label: 'Federal income tax bracket', type: 'select', options: ['10% or 12%', '22% or 24%', '32% or higher', 'Not sure'], required: true },
    { name: 'riskTolerance', label: 'Risk tolerance', type: 'radio', options: ['Conservative, no losses', 'Moderate', 'Growth-oriented'], required: true },
    { name: 'experience', label: 'Experience with', type: 'multi', options: ['CDs and savings', 'Stocks or mutual funds', 'Bonds', 'Annuities', 'Real estate', 'None of these'], required: true },
    { name: 'timeHorizon', label: 'How long can this money stay put?', type: 'select', options: ['Under 3 years', '3 to 5 years', '5 to 10 years', 'Over 10 years'], required: true },
    { name: 'reverseMortgage', label: 'Are you funding this with a reverse mortgage or a home equity loan?', type: 'radio', options: yn, required: true },
  ],
};

const ANN_DELIVERY = {
  title: 'Delivery and confirmation',
  fields: [
    { name: 'policyDelivery', label: 'How would you like to receive your contract?', type: 'radio', options: ['Electronically (email)', 'By mail'], required: true },
    { type: 'note', name: '_annSign', text: 'When you submit, Matthew compares carriers and submits the application for you. The carrier then emails the application and any transfer forms to e-sign, and your free-look period (typically 10 to 30 days, set by your state) starts when the contract is delivered. No call is needed.' },
    { name: 'attest', label: 'Confirmation', type: 'multi', options: ['I confirm these answers are true and complete to the best of my knowledge'], required: true },
    { name: 'notes', label: 'Anything else Matthew should know? (optional)', type: 'textarea' },
  ],
};

export const annuityApplication = () => [
  ANN_BASICS,
  ANN_IDENTITY,
  ANN_OWNERSHIP,
  APP_BENEFICIARIES,
  ANN_PRODUCT,
  ANN_FUNDING,
  ANN_SUITABILITY,
  ANN_DELIVERY,
];
