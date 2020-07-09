import { useEffect, useState } from 'react';
import { fetchApis } from '../services/APIs/recipesApi';

const useRequisition = ([type, query], handleData = (p) => p, onError = console.log) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setLoading(true)
    fetchApis(type, query)
      .then((json) => handleData(type, json))
      .then((res) => { setRecipe(res); setLoading(false); })
      .catch((err) => { setError(err); setLoading(false); onError(err); });
  }, [query, type, handleData, onError]);

  return [{ loading, error, recipe }, { setLoading, setError, setRecipe }];
};

export default useRequisition;
