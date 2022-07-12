import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import '../App.css';

const optionsOrdenar = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Form() {
  const { filterByName,
    handleChange, filtrar, filterByNumericValues,
    setFilterByNumericValues, filtrarAD } = useContext(MyContext);

  const [optionsBackup, setoptionsBackup] = useState([...optionsOrdenar]);

  const [todosFiltros, setTodosFiltros] = useState({
    filtros: optionsBackup[0],
    compararFilter: 'maior que',
    valorFilter: '0',
    id: Math.random(),
  });

  const [orderFiltro, setOderFiltro] = useState({
    column: 'population',
    sort: 'DESC',
  });

  useEffect(() => {
    const options = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const novasOp = filterByNumericValues.reduce((acc, el) => {
      acc = acc.filter((elemento) => elemento !== el.filtros);
      return acc;
    }, [...options]);

    setoptionsBackup(novasOp);

    setTodosFiltros({
      filtros: novasOp[0],
      compararFilter: 'maior que',
      valorFilter: '0',
      id: Math.random(),
    });
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
    <section className="container-Form">
      <label htmlFor="name" className="filtrarPeloNome">
        <input
          type="text"
          name="name"
          id="name"
          value={ filterByName }
          data-testid="name-filter"
          onChange={ handleChange }
          placeholder="filtrar pelo nome"
        />
      </label>
      <form>

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
              // filtros: optionsBackup[0],
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

        <div className="tipoRadio">
          <label htmlFor="sortA">
            Ascendente
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
            Descendente
            <input
              type="radio"
              name="sort"
              id="sortD"
              value="DESC"
              onChange={ handleFilter }
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>

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
          Remover Filtros

        </button>
      </form>
    </section>
  );
}

export default Form;
