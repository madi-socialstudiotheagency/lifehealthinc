import BrokerBioPage from '@/components/BrokerBioPage';

const justin = {
  name: 'Justin Brabant',
  title: 'Licensed Broker',
  npn: '22223194',
  licenseNumber: 'G344221',
  licenseVerifyUrl: 'https://docs.google.com/document/d/1tte-q7MPfExoBvwsSKFJjgz8lCqcJt0RBLaW6Q3ApHI/edit?tab=t.0',
  phone: '(863) 380-1008',
  phoneHref: 'tel:8633801008',
  email: 'jbrabant01@gmail.com',
  image: 'https://media.base44.com/images/public/68c1ca7c80a1472f1eb4424c/b61dc8d67_image.png',
  objectPosition: 'object-top',
  bg: '#e8edf5',
  bio: "Justin is a licensed insurance broker based out of New York, bringing a sharp, client-focused approach to every consultation. Born and raised in the Empire State, he understands the unique financial pressures and coverage needs facing New York families and professionals.",
  bioExtended: "Justin joined LifeHealthInc with a passion for helping everyday people navigate the insurance landscape with confidence. Whether you're protecting your family with life insurance, planning for retirement, or securing your mortgage, Justin provides clear, honest guidance with no pressure — ever.",
  specialties: ['Life Insurance', 'Health Insurance', 'Mortgage Protection', 'Final Expense', 'Term Life'],
  quote: '"Great coverage shouldn\'t be complicated. I\'m here to make it simple and make sure you\'re truly protected."',
  calendlyUrl: 'https://calendly.com/jbrabant01/30min',
};

export default function JustinBrabantPage() {
  return <BrokerBioPage broker={justin} />;
}