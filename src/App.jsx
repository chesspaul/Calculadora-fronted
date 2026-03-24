import React from 'react'
import { GlobalProvider } from './context/GlobalState'
import Header from './components/Header' 
import Balance from './components/Balance'
import ingresosEgresos from './components/ingresosEgresos'
import MovimientosLista from './components/MovimientosLista'
import AddForm from './components/addForm'

const App = () => {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <ingresosEgresos />
        <MovimientosLista />
        <AddForm />
      </div>
    </GlobalProvider>
  )
}

export default App