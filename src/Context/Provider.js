import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFiltroNome] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const json = await response.json();
      json.results.forEach((elemento) => delete elemento.residents);
      console.log(json.results);
      setData(json.results);
    };
    fetchApi();
  }, []);

  const handleChange = ({ target }) => {
    setFiltroNome(target.value);
  };

  return (
    <MyContext.Provider value={ { data, filterByName, handleChange } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
