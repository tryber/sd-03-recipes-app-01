import { useEffect, useState } from 'react';

const useRequisition = (
  url, handleData = (p) => p, parH = [], onError = console.log, parE = [],
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log(url);
    fetch(url)
      .then((res) => res.json().then((j) => res.ok ? Promise.resolve(j) : Promise.reject(j)))
      .then((json) => handleData(...parH, json))
      .then((res) => { setRecipe(res); setLoading(false); })
      .catch((err) => { setError(err); setLoading(false); onError(...parE, err); });
  }, [url, handleData, onError]);

  return [{ loading, error, recipe }, { setLoading, setError, setRecipe }];
};

export default useRequisition;
