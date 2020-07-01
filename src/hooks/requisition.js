import { useEffect, useState } from 'react';

const useRequisition = (requisition) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) {
      requisition()
        .then(() => setLoading(false))
        .catch((err) => { console.log(err); setError(err); });
    }
  }, [loading, requisition]);

  return [{ loading, error }, { setLoading, setError }];
};

export default useRequisition;
