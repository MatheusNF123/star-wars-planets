import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../Context/MyContext';

// const options = ['population',
//   'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Form() {
  const { filterByName,
    handleChange, filtrar, filterByNumericValues } = useContext(MyContext);
  const [todosFiltros, setTodosFiltros] = useState({
    filtros: 'population',
    compararFilter: 'maior que',
    valorFilter: '0',
  });
  const [options, setOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const novasOp = filterByNumericValues.reduce((acc, el) => {
      console.log('red', acc);
      acc = acc.filter((elemento) => !elemento.includes(el.filtros));
      return acc;
    }, [...options]);
    setOptions(novasOp);
  }, [filterByNumericValues]);

  const handleFilter = ({ target: { name, value } }) => {
    setTodosFiltros({
      ...todosFiltros,
      [name]: value,
    });
  };

  return (
    <form>
      {console.log(options)}
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
          {options.map((op, i) => (
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
          });
        } }

      >
        Filtrar

      </button>
    </form>
  );
}

export default Form;
