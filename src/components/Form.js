import React, { useContext, useState } from 'react';
import MyContext from '../Context/MyContext';

function Form() {
  const { filterByName, handleChange, filtrar } = useContext(MyContext);
  const [todosFiltros, setTodosFiltros] = useState({
    filtros: 'population',
    compararFilter: 'maior que',
    valorFilter: '0',
  });

  const handleFilter = ({ target: { name, value } }) => {
    setTodosFiltros({
      ...todosFiltros,
      [name]: value,
    });
  };

  return (
    <form>
      <label htmlFor="name">
        Filtrar Pelo nome
        <input
          type="text"
          name="name"
          id="name"
          value={ filterByName }
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="selectFilter">
        Coluna
        <select
          name="filtros"
          id="selectFilter"
          data-testid="column-filter"
          onChange={ handleFilter }
          value={ todosFiltros.filtros }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="compararFilter">
        Operador
        <select
          name="compararFilter"
          id="compararFilter"
          onChange={ handleFilter }
          data-testid="comparison-filter"
          value={ todosFiltros.compararFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valorFilter">
        <input
          type="text"
          name="valorFilter"
          id="valorFilter"
          data-testid="value-filter"
          onChange={ handleFilter }
          value={ todosFiltros.valorFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          filtrar(todosFiltros);
          setTodosFiltros({
            filtros: 'population',
            compararFilter: 'maior que',
            valorFilter: '0',
          });
        } }

      >
        Filtrar

      </button>
    </form>
  );
}

export default Form;
