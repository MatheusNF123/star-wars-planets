import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltrado, setDataFiltrado] = useState([]);
  const [filterByName, setFiltroNome] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const json = await response.json();
      json.results.forEach((elemento) => delete elemento.residents);
      setData(json.results);
    };
    fetchApi();
  }, []);

  // const filtrarInputs = () => {
  //   const dataFilter = data.filter((elemento) => {
  //     const { compararFilter, valorFilter, filtros } = filterByNumericValues;
  //     if (elemento[filtros]
  //       && compararFilter
  //       && valorFilter) {
  //       if (compararFilter === 'maior que') {
  //         return Number(elemento[filtros]) > Number(valorFilter);
  //       } if (compararFilter === 'menor que') {
  //         return Number(elemento[filtros]) < Number(valorFilter);
  //       } if (compararFilter === 'igual a') {
  //         return Number(elemento[filtros]) === Number(valorFilter);
  //       }
  //     }
  //     return true;
  //   });
  //   setFilterByNumericValues(dataFilter);
  // };

  useEffect(() => {
    let dataFilter = data.filter((nomes) => nomes.name.includes(filterByName));
    dataFilter = filterByNumericValues.reduce((acc, filtro) => {
      if (filtro.compararFilter === 'maior que') {
        acc = acc.filter((planeta) => planeta[filtro
          .filtros] > Number(filtro.valorFilter));
      }
      if (filtro.compararFilter === 'menor que') {
        acc = acc.filter((planeta) => planeta[filtro
          .filtros] < Number(filtro.valorFilter));
      }
      if (filtro.compararFilter === 'igual a') {
        acc = acc.filter((planeta) => planeta[filtro.filtros] === filtro.valorFilter);
      }
      return acc;
    }, [...dataFilter]);

    setDataFiltrado(dataFilter);
  }, [data, filterByName, filterByNumericValues]);

  const handleChange = ({ target }) => {
    setFiltroNome(target.value);
  };

  const filtrar = (objeto) => {
    setFilterByNumericValues([...filterByNumericValues, objeto]);
  };

  return (
    <MyContext.Provider value={ { dataFiltrado, filterByName, handleChange, filtrar } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
