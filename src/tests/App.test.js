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
    const resultFiltroColuna = screen.queryByText('population')
    const btnRmvFilter = screen.queryByRole('button', {  name: /x/i})
    expect(resultFiltroColuna).toBeInTheDocument()
    expect(btnRmvFilter).toBeInTheDocument()
    userEvent.click(btnRmvFilter)
    expect(btnRmvFilter).not.toBeInTheDocument()
  

  
}, 30000)
test('testando btn de excluir TUDO do form', async () => {
  render(<App />);
  const botaoFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
  const btnRemoveAll = screen.getByRole('button', {  name: /remover todas filtragens/i})
  userEvent.click(botaoFilter)
    const resultFiltroColuna = screen.queryByText('population')
    const btnRmvFilter = screen.queryByRole('button', {  name: /x/i})
    expect(resultFiltroColuna).toBeInTheDocument()
    expect(btnRmvFilter).toBeInTheDocument()
    userEvent.click(btnRemoveAll)
    expect(btnRmvFilter).not.toBeInTheDocument()
    expect(resultFiltroColuna).not.toBeInTheDocument()
  

  
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
  expect(document.getElementsByTagName('th')).toHaveLength(26)
  expect(document.getElementsByTagName('tr')).toHaveLength(2)
  const btnRemoveAll = screen.getByRole('button', {  name: /remover todas filtragens/i})
  userEvent.click(btnRemoveAll)
  expect(document.getElementsByTagName('th')).toHaveLength(143) 
  
  userEvent.selectOptions(coluna, 'surface_water')
  userEvent.selectOptions(operador, 'menor que')
  userEvent.clear(inputNumerico)
  userEvent.type(inputNumerico, '10')
  userEvent.click(botaoFilter)
  expect(document.getElementsByTagName('th')).toHaveLength(78) 
  expect(document.getElementsByTagName('tr')).toHaveLength(6) 
  
}, 30000)


})




// jest.spyOn(global, "fetch").mockImplementation(() =>
// Promise.resolve({
//   json: () => Promise.resolve(testData)
// }))