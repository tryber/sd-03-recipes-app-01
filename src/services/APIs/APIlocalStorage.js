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

export const getIngredients = () => {
  return JSON.parse(localStorage.getItem('inProggressRecipes')) || {};
};

export const doneRecipes = () => {
  return JSON.parse(localStorage.getItem('doneRecipes')) || [];
};
