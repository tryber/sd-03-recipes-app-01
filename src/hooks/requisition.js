import { useEffect, useState } from 'react';
import { fetchApis } from '../services/APIs/FOODS_API';

const useRequisition = (requisition, setState, type, query, key) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading && !error) {
      fetchApis(type, query).then((res) => res.ok ? res.json() : Promise.reject(res))
        .then((json) => key ? json[key] : setState(json))
        .then(() => setLoading(false))
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [loading, error, requisition]);

  return [{ loading, error }, { setLoading, setError }];
};

export default useRequisition;
