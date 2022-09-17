import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltrado, setDataFiltrado] = useState([]);
  const [filterByName, setFiltroNome] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({});

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

  const ordeNarPeloFiltroASC = (array) => {
    const UM = 1;
    return array.sort((a, b) => {
      if (a[order.column] === 'unknown') return 1;
      if (b[order.column] === 'unknown') return -UM;
      return Number(a[order.column]) - Number(b[order.column]);
    });
  };

  const ordeNarPeloFiltroDSC = (array) => {
    const UM = 1;
    return array.sort((a, b) => {
      if (a[order.column] === 'unknown') return 1;
      if (b[order.column] === 'unknown') return -UM;
      return Number(b[order.column]) - Number(a[order.column]);
    });
  };

  const oderdenarPeloNome = (array) => {
    const UM = 1;
    return array.sort((a, b) => (a.name < b.name ? -UM : 1));
  };

  useEffect(() => {
    // let dataFilter = data.filter((nomes) => nomes.name.includes(filterByName));
    const dataFilter = filterByNumericValues.reduce((acc, filtro) => {
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
    }, [...data]);

    if (order.sort === 'ASC') {
      const ASC = ordeNarPeloFiltroASC(dataFilter);
      setDataFiltrado(ASC);
    } else if (order.sort === 'DESC') {
      const DESC = ordeNarPeloFiltroDSC(dataFilter);

      setDataFiltrado(DESC);
    } else {
      const filtroPeloNome = oderdenarPeloNome(dataFilter);
      setDataFiltrado(filtroPeloNome);
    }
  }, [data, filterByName, filterByNumericValues, order]);

  const handleChange = ({ target }) => {
    setFiltroNome(target.value);
  };

  const filtrar = (objeto) => {
    setFilterByNumericValues([...filterByNumericValues, objeto]);
  };

  const removeDoArray = (id) => {
    const removerList = filterByNumericValues.filter((e) => e.id !== id);
    setFilterByNumericValues(removerList);
  };

  const filtrarAD = (filtros) => {
    setOrder(filtros);
  };

  return (
    <MyContext.Provider
      value={ { dataFiltrado,
        filterByName,
        handleChange,
        filtrar,
        filterByNumericValues,
        removeDoArray,
        setFilterByNumericValues,
        filtrarAD,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
