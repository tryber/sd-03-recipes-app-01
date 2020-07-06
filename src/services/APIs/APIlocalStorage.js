export const takeFavStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

export const translateType = (type) => {
  switch (type) {
    case 'comida':
    case 'bebida':
      return type;
    case 'food': return 'comida';
    case 'drink': return 'bebida';
    default: return 'type is not valid';
  }
};

export const sendToFavoriteStorage = ({
  id,
  origin,
  category,
  isAlcoholic,
  name,
  srcImage: image,
}, type) => {
  const thisFood = {
    id,
    type: translateType(type),
    area: origin || '',
    category,
    alcoholicOrNot: isAlcoholic || '',
    name,
    image,
  };
  const favoriteList = takeFavStorage();
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList, thisFood]));
};

export const rmFromFavoriteStorage = (id) => {
  const favorite = takeFavStorage();
  const oficialFavoriteList = favorite.filter((fav) => fav.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(oficialFavoriteList));
};

export const getInProgress = (type) => {
  const inProggress = (
    JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, cocktails: {} }
  );
  switch (type) {
    case 'meals':
    case 'food':
      return inProggress.meals;
    case 'cocktails':
    case 'drink':
      return inProggress.cocktails;
    default: return inProggress;
  }
};

const sin = (type) => {
  switch (type) {
    case 'food':
    case 'meals':
      return 'meals';
    case 'drink':
    case 'cocktails':
      return 'cocktails';
    default: return `type ${type} not valid to sin`;
  }
};

export const setInProgress = (type, id, value) => {
  const current = getInProgress();
  const key = sin(type);
  const newInProgress = { ...current, [key]: { ...current[key], [id]: value } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
};

export const doneRecipes = (id) => {
  const stored = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (id || id === 0) return stored.find((doneRecipe) => doneRecipe.id === Number(id));
  return stored;
};
