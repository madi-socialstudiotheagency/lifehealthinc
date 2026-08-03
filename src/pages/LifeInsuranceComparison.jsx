import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LifeInsuranceComparison() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/LifeInsurance', { replace: true });
  }, [navigate]);
  return null;
}