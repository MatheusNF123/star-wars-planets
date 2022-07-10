import React, { useContext /* useState */ } from 'react';
import MyContext from '../Context/MyContext';
import Form from './Form';

function Tabela() {
  const { dataFiltrado, filterByNumericValues, removeDoArray } = useContext(MyContext);

  return (
    <>
      <Form />
      {filterByNumericValues.map((elemento, i) => (
        <div key={ elemento.filtros + i } data-testid="filter">
          <p>{elemento.filtros}</p>
          <p>{elemento.compararFilter}</p>
          <p>{elemento.valorFilter}</p>
          <button
            type="button"
            onClick={ () => removeDoArray(elemento.id) }
          >
            X

          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Home</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {dataFiltrado.map((elemento, index) => (
            <tr key={ index + elemento.name }>
              <th data-testid="planet-name">{elemento.name}</th>
              <th>{elemento.rotation_period}</th>
              <th>{elemento.orbital_period}</th>
              <th>{elemento.diameter}</th>
              <th>{elemento.climate}</th>
              <th>{elemento.gravity}</th>
              <th>{elemento.terrain}</th>
              <th>{elemento.surface_water}</th>
              <th>{elemento.population}</th>
              <th>{elemento.films}</th>
              <th>{elemento.created}</th>
              <th>{elemento.edited}</th>
              <th>{elemento.url}</th>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
}

export default Tabela;
