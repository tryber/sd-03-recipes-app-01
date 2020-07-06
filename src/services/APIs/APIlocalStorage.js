export const getFavStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

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
  const favoriteList = getFavStorage();
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList, thisFood]));
};

export const rmFromFavoriteStorage = (id) => {
  const favorite = getFavStorage();
  const oficialFavoriteList = favorite.filter((fav) => fav.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(oficialFavoriteList));
};

export const getInProgress = (type) => {
  const obj = { meals: {}, cocktails: {} };
  const inProggress = JSON.parse(localStorage.getItem('inProgressRecipes')) || obj;
  switch (type) {
    case 'food': return inProggress.meals;
    case 'drink': return inProggress.cocktails;
    default: return inProggress;
  }
};

export const doneRecipes = (id) => {
  const stored = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (id || id === 0) return stored.find((doneRecipe) => doneRecipe.id === Number(id));
  return stored;
};
