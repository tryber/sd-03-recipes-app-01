import React, { useCallback as useCB } from 'react';
import { useParams } from 'react-router-dom';

import { DetailsCard, Carrosel } from '../components';
import useRequisition from '../hooks/requisition';
import { handleData, createURL, otherType } from '../services/APIs/recipesApi';
import { typeShape } from '../services/APIs/shapes';

function DrinkDetailsPage({ type }) {
  const { id } = useParams();
  const [{ loading, error, recipe }] = useRequisition(
    createURL(type, `lookup.php?i=${id}`), useCB(handleData(type, 1), [type]),
  );
  const [{ loading: loadRecom, error: errRecom, recipe: recomends }] = useRequisition(
    createURL(otherType(type)), useCB(handleData(otherType(type)), [type]),
  );

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas...</h1>;
  return (
    <div>
      <DetailsCard type="drink" recipe={recipe[0]} />
      {errRecom && <h3 data-testid="error-details">Aconteceu algo errado em recomendações</h3>}
      {!errRecom && loadRecom && <h3>Carregando detalhes de comida...</h3>}
      {!errRecom && !loadRecom && recomends && <Carrosel cards={recomends} />}
    </div>
  );
}

DrinkDetailsPage.propTypes = {
  type: typeShape.isRequired,
};

export default DrinkDetailsPage;
