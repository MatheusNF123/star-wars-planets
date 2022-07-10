import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../Context/MyContext';

const optionsOrdenar = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Form() {
  const { filterByName,
    handleChange, filtrar, filterByNumericValues,
    setFilterByNumericValues, filtrarAD } = useContext(MyContext);
  const [todosFiltros, setTodosFiltros] = useState({
    filtros: 'population',
    compararFilter: 'maior que',
    valorFilter: '0',
  });

  const [orderFiltro, setOderFiltro] = useState({
    column: 'population',
    sort: 'DESC',
  });

  // const [options, setOptions] = useState(['population',
  //   'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [optionsBackup, setoptionsBackup] = useState([]);

  useEffect(() => {
    const options = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const novasOp = filterByNumericValues.reduce((acc, el) => {
      acc = acc.filter((elemento) => elemento !== el.filtros);
      return acc;
    }, [...options]);
    setoptionsBackup(novasOp);
  }, [filterByNumericValues]);

  const handleFilter = ({ target: { name, value } }) => {
    setTodosFiltros({
      ...todosFiltros,
      [name]: value,
    });
    setOderFiltro({
      ...orderFiltro,
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
          {optionsBackup.map((op, i) => (
            <option key={ i + op } value={ op }>{op}</option>
          ))}

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
            id: Math.random(),
          });
        } }

      >
        Filtrar

      </button>
      <label htmlFor="ordenar">
        Ordenar
        <select
          name="column"
          id="ordenar"
          value={ orderFiltro.column }
          data-testid="column-sort"
          onChange={ handleFilter }
        >
          { optionsOrdenar.map(((elemento, i) => (
            <option key={ elemento + i } value={ elemento }>{elemento}</option>
          )
          ))}
        </select>
      </label>

      <label htmlFor="sortA">
        Ascendent
        <input
          type="radio"
          name="sort"
          id="sortA"
          value="ASC"
          onChange={ handleFilter }
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="sortD">
        Descendent
        <input
          type="radio"
          name="sort"
          id="sortD"
          value="DESC"
          onChange={ handleFilter }
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => filtrarAD(orderFiltro) }
      >
        Ordenar

      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterByNumericValues([]) }
      >
        Remover todas filtragens

      </button>
    </form>
  );
}

export default Form;
