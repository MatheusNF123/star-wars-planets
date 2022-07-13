import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData'
describe('testando geral', () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData)
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

test('verificando o fetch', () => { 
  render(<App />);
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  expect(fetch).toHaveBeenCalled()
  expect(fetch).toHaveBeenCalledWith(url)
  // expect(tituloElement).toBeInTheDocument();
});

test('Testando o titulo', () => {
  render(<App />);
  const tituloElement = screen.getByRole('heading', {  name: /star wars planets/i})
  expect(tituloElement).toBeInTheDocument();
});
test('Form', () => {
  render(<App />);
  const filtroNome = screen.getByTestId('name-filter')
  const coluna = screen.getByTestId('name-filter')
  const operador = screen.getByTestId('column-filter')
  const inputNumerico = screen.getByTestId('value-filter')
  const removeBtn = screen.getByTestId('button-filter')
  const allRemoveBtn = screen.getByTestId('button-remove-filters')
  expect(filtroNome).toBeInTheDocument()
  expect(coluna).toBeInTheDocument()
  expect(operador).toBeInTheDocument()
  expect(inputNumerico).toBeInTheDocument()
  expect(removeBtn).toBeInTheDocument()
  expect(allRemoveBtn).toBeInTheDocument()
});
test('Tabela', async () => {
  render(<App />);
  expect(await screen.findByRole('table', '', {timeout: 5000})).toBeInTheDocument()
  expect(document.getElementsByTagName('tr')).toHaveLength(11)
  const row = screen.getByRole('row', {
    name: /home rotation period orbital period diameter climate gravity terrain surface water population films created edited url/i
  });
  expect(row).toBeInTheDocument()
}, 30000);
test('escrevendo na tabela', async () => {
  render(<App />);
  const filtroNome = screen.getByTestId('name-filter')
  userEvent.type(filtroNome, 'Tatooine')
  await waitFor(() => {
    expect(document.getElementsByTagName('tr')).toHaveLength(2)
    expect(filtroNome).toHaveProperty('value', 'Tatooine')
  }) 

  
}, 30000);
test('testando btn de excluir do form', async () => {
  render(<App />);
  const botaoFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
  userEvent.click(botaoFilter)
    // const resultFiltroColuna = screen.getByText(/population/i);
    const btnRmvFilter = screen.queryByRole('button', {  name: 'delete'})
    // expect(resultFiltroColuna).toBeInTheDocument()
    expect(btnRmvFilter).toBeInTheDocument()
    userEvent.click(btnRmvFilter)
    expect(btnRmvFilter).not.toBeInTheDocument()
  

  
}, 30000)
test('testando btn de excluir TUDO do form', async () => {
  render(<App />);
  const botaoFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
  const btnRemoveAll = screen.getByRole('button', {  name: /Remover Filtros/i})
  userEvent.click(botaoFilter)
    // const resultFiltroColuna = screen.queryByText('population')
    const btnRmvFilter = screen.queryByRole('button', {  name: 'delete'})
    // expect(resultFiltroColuna).toBeInTheDocument()
    expect(btnRmvFilter).toBeInTheDocument()
    userEvent.click(btnRemoveAll)
    expect(btnRmvFilter).not.toBeInTheDocument()
    // expect(resultFiltroColuna).not.toBeInTheDocument()
  

  
}, 30000)
test('selecionando cada input e clicando em filtrar', async () => {
  render(<App />);
  const botaoFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
 
  const coluna = screen.getByTestId('column-filter')
  const operador = screen.getByTestId('comparison-filter')
  const inputNumerico = screen.getByTestId('value-filter')
  userEvent.selectOptions(coluna, 'diameter')
  userEvent.selectOptions(operador, 'igual a')
  userEvent.clear(inputNumerico)
  userEvent.type(inputNumerico, '10465')
  userEvent.click(botaoFilter)
  
  // const th = await screen.findByTestId('button-filter', '', {timeout: 5000})
  expect(document.getElementsByTagName('th')).toHaveLength(13)
  expect(document.getElementsByTagName('tr')).toHaveLength(2)
  const btnRemoveAll = screen.getByRole('button', {  name: /Remover Filtros/i})
  userEvent.click(btnRemoveAll)
  expect(document.getElementsByTagName('th')).toHaveLength(13) 
  
  userEvent.selectOptions(coluna, 'surface_water')
  userEvent.selectOptions(operador, 'menor que')
  userEvent.clear(inputNumerico)
  userEvent.type(inputNumerico, '10')
  userEvent.click(botaoFilter)
  expect(document.getElementsByTagName('th')).toHaveLength(13) 
  expect(document.getElementsByTagName('tr')).toHaveLength(6) 
  
}, 30000)


test('Testando se os planetas estão ordenado por nome', async () => {
  render(<App />);
  const expectedPlanets = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
  
  const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
  expect(todosNomeDePlaneta).toHaveLength(10)
    expect(todosNomeDePlaneta[0]).toHaveTextContent('Alderaan')
    expect(todosNomeDePlaneta[1]).toHaveTextContent('Bespin')
    expect(todosNomeDePlaneta[2]).toHaveTextContent('Coruscant')
    expect(todosNomeDePlaneta[3]).toHaveTextContent('Dagobah')
    expect(todosNomeDePlaneta[4]).toHaveTextContent('Endor')
    expect(todosNomeDePlaneta[5]).toHaveTextContent('Hoth')
    expect(todosNomeDePlaneta[6]).toHaveTextContent('Kamino')
    expect(todosNomeDePlaneta[7]).toHaveTextContent('Naboo')
    expect(todosNomeDePlaneta[8]).toHaveTextContent('Tatooine')
    expect(todosNomeDePlaneta[9]).toHaveTextContent('Yavin IV')  
}, 30000)
test('testando o input de Ordenar e o DESC', async () => {
  render(<App />);
  const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-desc')
    userEvent.selectOptions(inputOrdenar, 'orbital_period')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(10)
      expect(todosNomeDePlaneta[0]).toHaveTextContent('Bespin')
      expect(todosNomeDePlaneta[1]).toHaveTextContent('Yavin IV')
      expect(todosNomeDePlaneta[2]).toHaveTextContent('Hoth')
      expect(todosNomeDePlaneta[3]).toHaveTextContent('Kamino')
      expect(todosNomeDePlaneta[4]).toHaveTextContent('Endor')
      expect(todosNomeDePlaneta[5]).toHaveTextContent('Coruscant')
      expect(todosNomeDePlaneta[6]).toHaveTextContent('Alderaan')
      expect(todosNomeDePlaneta[7]).toHaveTextContent('Dagobah')
      expect(todosNomeDePlaneta[8]).toHaveTextContent('Naboo')
      expect(todosNomeDePlaneta[9]).toHaveTextContent('Tatooine')  

}, 30000)
test('testando o input de Ordenar e o ASC', async () => {
  render(<App />);
  const expectedPlanets = ['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];
  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-asc')
    userEvent.selectOptions(inputOrdenar, 'diameter')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(10)
      expect(todosNomeDePlaneta[0]).toHaveTextContent('Endor')
      expect(todosNomeDePlaneta[1]).toHaveTextContent('Hoth')
      expect(todosNomeDePlaneta[2]).toHaveTextContent('Dagobah')
      expect(todosNomeDePlaneta[3]).toHaveTextContent('Yavin IV')
      expect(todosNomeDePlaneta[4]).toHaveTextContent('Tatooine')
      expect(todosNomeDePlaneta[5]).toHaveTextContent('Naboo')
      expect(todosNomeDePlaneta[6]).toHaveTextContent('Coruscant')
      expect(todosNomeDePlaneta[7]).toHaveTextContent('Alderaan')
      expect(todosNomeDePlaneta[8]).toHaveTextContent('Kamino')
      expect(todosNomeDePlaneta[9]).toHaveTextContent('Bespin')  

}, 30000)
test('testando o input de Ordenar e o desc e unknown', async () => {
  render(<App />);  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-desc')
    userEvent.selectOptions(inputOrdenar, 'population')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(10)
      expect(todosNomeDePlaneta[0]).toHaveTextContent('Coruscant')
      expect(todosNomeDePlaneta[1]).toHaveTextContent('Naboo')
      expect(todosNomeDePlaneta[2]).toHaveTextContent('Alderaan')
      expect(todosNomeDePlaneta[3]).toHaveTextContent('Kamino')
      expect(todosNomeDePlaneta[4]).toHaveTextContent('Endor')
      expect(todosNomeDePlaneta[5]).toHaveTextContent('Bespin')
      expect(todosNomeDePlaneta[6]).toHaveTextContent('Tatooine')
      expect(todosNomeDePlaneta[7]).toHaveTextContent('Yavin IV')
      expect(todosNomeDePlaneta[8]).toHaveTextContent('Hoth')
      expect(todosNomeDePlaneta[9]).toHaveTextContent('Dagobah')  

      const unknown = document.getElementsByTagName('tr')
      expect(unknown[9]).toHaveTextContent('unknown')
      expect(unknown[10]).toHaveTextContent('unknown')



}, 30000)


test('testando o input de Ordenar , ASC e unknown', async () => {
  render(<App />);
  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-asc')
    userEvent.selectOptions(inputOrdenar, 'surface_water')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(10)
    expect(todosNomeDePlaneta[0]).toHaveTextContent('Bespin')  
    expect(todosNomeDePlaneta[1]).toHaveTextContent('Tatooine')
    expect(todosNomeDePlaneta[2]).toHaveTextContent('Yavin IV')
    expect(todosNomeDePlaneta[3]).toHaveTextContent('Dagobah')
      expect(todosNomeDePlaneta[4]).toHaveTextContent('Endor')
      expect(todosNomeDePlaneta[5]).toHaveTextContent('Naboo')
      expect(todosNomeDePlaneta[6]).toHaveTextContent('Alderaan')
      expect(todosNomeDePlaneta[7]).toHaveTextContent('Hoth')
      expect(todosNomeDePlaneta[8]).toHaveTextContent('Kamino')
      expect(todosNomeDePlaneta[9]).toHaveTextContent('Coruscant')

}, 30000)
test('testando o input de Ordenar, dsc e unknown 2', async () => {
  render(<App />);
  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-desc')
    userEvent.selectOptions(inputOrdenar, 'surface_water')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(10)
    expect(todosNomeDePlaneta[0]).toHaveTextContent('Hoth')
    expect(todosNomeDePlaneta[1]).toHaveTextContent('Kamino')
    expect(todosNomeDePlaneta[2]).toHaveTextContent('Alderaan')
    expect(todosNomeDePlaneta[3]).toHaveTextContent('Naboo')
    expect(todosNomeDePlaneta[4]).toHaveTextContent('Yavin IV')
    expect(todosNomeDePlaneta[5]).toHaveTextContent('Dagobah')
    expect(todosNomeDePlaneta[6]).toHaveTextContent('Endor')
    expect(todosNomeDePlaneta[7]).toHaveTextContent('Tatooine')
    expect(todosNomeDePlaneta[8]).toHaveTextContent('Bespin')  
      expect(todosNomeDePlaneta[9]).toHaveTextContent('Coruscant')


      const unknown = document.getElementsByTagName('td')
     
      expect(unknown[73]).toHaveTextContent('unknown')

}, 30000)
test('tentando o comportamento dos dois filtros juntos ', async () => {
  render(<App />);
  
  const btnOrdenar = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
  const btnFilter = screen.getByTestId('button-filter')
  const column = screen.getByTestId('column-filter')
  const operador = screen.getByTestId('comparison-filter')
  const inputNumero = screen.getByTestId('value-filter')

  userEvent.selectOptions(operador, 'menor que')
  userEvent.selectOptions(column, 'orbital_period')
  userEvent.clear(inputNumero)
  userEvent.type(inputNumero, '550')
  userEvent.click(btnFilter)

    const inputOrdenar = screen.getByTestId('column-sort')
    const inputRadio = screen.getByTestId('column-sort-input-desc')
    userEvent.selectOptions(inputOrdenar, 'population')
    userEvent.click(inputRadio)
    userEvent.click(btnOrdenar)
    const todosNomeDePlaneta = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(todosNomeDePlaneta).toHaveLength(8)
    expect(todosNomeDePlaneta[0]).toHaveTextContent('Coruscant')
    expect(todosNomeDePlaneta[1]).toHaveTextContent('Naboo')
    expect(todosNomeDePlaneta[2]).toHaveTextContent('Alderaan')
    expect(todosNomeDePlaneta[3]).toHaveTextContent('Kamino')
    expect(todosNomeDePlaneta[4]).toHaveTextContent('Endor')
    expect(todosNomeDePlaneta[5]).toHaveTextContent('Tatooine')
    expect(todosNomeDePlaneta[6]).toHaveTextContent('Hoth')
    expect(todosNomeDePlaneta[7]).toHaveTextContent('Dagobah')


}, 30000)


})
