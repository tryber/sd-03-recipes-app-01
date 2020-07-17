import { useEffect, useState } from 'react';

const useRequisition = (url, handleData, onError = console.log,) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json().then((j) => res.ok ? Promise.resolve(j) : Promise.reject(j)))
      .then((json) => handleData(json))
      .then((res) => { setRecipe(res); setLoading(false); })
      .catch((err) => { setError(err); setLoading(false); onError(err); });
  }, [url, handleData, onError]);

  return [{ loading, error, recipe }, { setLoading, setError, setRecipe }];
};

export default useRequisition;
