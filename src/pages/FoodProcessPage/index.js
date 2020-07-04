import React, { useContext } from 'react';

import { Card, CheckBox } from '../../components';

import { FoodsContext } from '../../contexts/FoodsContext';

function FoodProcessPage() {
  const [{ foodInproggress }] = useContext(FoodsContext);
  const {
    id,
    name,
    srcImage,
    ingredients,
  } = foodInproggress;

  return (
    <div>
      <Card key={id} name={name} srcImage={srcImage} />
      <CheckBox ingredients={ingredients} />
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default FoodProcessPage;
