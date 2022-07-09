import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
// import Provider from '../Context/Provider';
import testData from '../../cypress/mocks/testData'
// import { renderHook } from '@testing-library/react-hooks';
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

test('I am your test', () => {
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
  // expect(screen.getByTestId('name-filter')).toBeInTheDocument()
});
test('Tabela', async () => {
  render(<App />);
//  const tabela = await screen.findByRole('table', '', {timeout: 5000})
  expect(await screen.findByRole('table', '', {timeout: 5000})).toBeInTheDocument()
  expect(document.getElementsByTagName('tr')).toHaveLength(11)
  const row = screen.getByRole('row', {
    name: /home rotation period orbital period diameter climate gravity terrain surface water population films created edited url/i
  });
  expect(row).toBeInTheDocument()
  // expect(screen.getByTestId('name-filter')).toBeInTheDocument()
}, 30000);
test('escrevendo na tabela', async () => {
  render(<App />);
  const filtroNome = screen.getByTestId('name-filter')
  userEvent.type(filtroNome, 'Tatooine')
  await waitFor(() => {
    expect(document.getElementsByTagName('tr')).toHaveLength(2)
    expect(filtroNome).toHaveProperty('value', 'Tatooine')
  }) 

  
  // expect(document.getElementsByTagName('tr')).toHaveLength(1)
  // expect(screen.getByRole('columnheader', {
  //   name: /tatooine/i
  // })).toBeInTheDocument()
  // const coluna = screen.getByTestId('name-filter')
  // const operador = screen.getByTestId('column-filter')
  // const inputNumerico = screen.getByTestId('value-filter')
  // const botaoFilter = screen.getByTestId('button-filter')
  // userEvent.type(coluna, 'population')
  // userEvent.type(operador, 'igual a')
  // userEvent.type(inputNumerico, '')
  // userEvent.type(inputNumerico, '2000000000')
  // userEvent.click(botaoFilter)
  // await waitFor(() => {
  //   expect(screen.findByRole('columnheader',{  name: /alderaan/i, timeout: 5000})).toBeInTheDocument()
  // })
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
  
}, 30000)
// test('testando Provider', () => {
//   //  global.fetch = jest.fn().mockResolvedValue({
//   //     json: jest.fn().mockResolvedValue(testData)
//   //   })

// //   jest.spyOn(global, "fetch").mockImplementation(() =>
// // Promise.resolve({
// //   json: () => Promise.resolve(testData)
// // }))
    
//   const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
//   expect(fetch).toHaveBeenCalled()
//   expect(fetch).toHaveBeenCalledWith(url)
//   const tituloElement = screen.getByRole('heading', {  name: /star wars planets/i})
//   // expect(tituloElement).toBeInTheDocument();
// });

})




// jest.spyOn(global, "fetch").mockImplementation(() =>
// Promise.resolve({
//   json: () => Promise.resolve(testData)
// }))