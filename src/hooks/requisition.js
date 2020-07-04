import { useEffect, useState } from 'react';

const useRequisition = (requisition) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading && !error) {
      requisition()
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); })
      .catch(() => setLoading(false));
    }
  }, [loading, error, requisition]);

  return [{ loading, error }, { setLoading, setError }];
};

export default useRequisition;
