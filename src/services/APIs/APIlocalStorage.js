export const takeFavStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

export const sendToFavoriteStorage = ({
  id,
  origin: area,
  category,
  isAlcoholic: alcoholicOrNot,
  name,
  srcImage: image,
}, type) => {
  const thisFood = {
    id,
    type,
    area: area || '',
    category,
    alcoholicOrNot: alcoholicOrNot || '',
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
