export const fetchDetailsFood = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => {
    if (response.ok) return Promise.resolve(json);
    return Promise.reject(json);
  })
);
