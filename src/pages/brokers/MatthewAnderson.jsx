import BrokerBioPage from '@/components/BrokerBioPage';
import { BROKERS } from '@/data/brokers';

const broker = BROKERS.find(b => b.slug === 'matthew-anderson');

export default function MatthewAndersonPage() {
  return <BrokerBioPage broker={broker} />;
}