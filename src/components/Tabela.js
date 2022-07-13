import React, { useContext /* useState */ } from 'react';
import MyContext from '../Context/MyContext';
import Form from './Form';
import '../App.css';

function Tabela() {
  const { dataFiltrado, filterByNumericValues, removeDoArray } = useContext(MyContext);

  return (
    <section className="container_tabela">
      <h1 className="titulo">Star Wars Planets</h1>
      <Form />
      <div className="divScrol">
        {filterByNumericValues.map((elemento, i) => (
          <div key={ elemento.filtros + i } data-testid="filter" className="filtros">
            <p>{elemento.filtros}</p>
            <p>{elemento.compararFilter}</p>
            <p>{elemento.valorFilter}</p>
            <button
              className="removeBtn"
              type="button"
              onClick={ () => removeDoArray(elemento.id) }

            >
              <span className="material-symbols-outlined icon">
                delete
              </span>

            </button>
          </div>

        ))}
      </div>
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
              <td data-testid="planet-name">{elemento.name}</td>
              <td>{elemento.orbital_period}</td>
              <td>{elemento.diameter}</td>
              <td>{elemento.climate}</td>
              <td>{elemento.rotation_period}</td>
              <td>{elemento.gravity}</td>
              <td>{elemento.terrain}</td>
              <td>{elemento.surface_water}</td>
              <td>{elemento.population}</td>
              <td>{elemento.films}</td>
              <td>{elemento.created}</td>
              <td>{elemento.edited}</td>
              <td>{elemento.url}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </section>
  );
}

export default Tabela;
