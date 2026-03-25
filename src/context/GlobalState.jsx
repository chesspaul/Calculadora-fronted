import React, { createContext, useEffect } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  movimientos: [],
  loading: true,
  error: null
}

const APP_URL = 'https://calculadora-de-gastos.onrender.com'

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState)

  useEffect(() => {
    getMovimientos()
  }, [])

  async function getMovimientos() {
    try {
      const response = await fetch(`${APP_URL}/api/movimientos`)
      const data = await response.json()

      dispatch({
        type: 'GET_MOVIMIENTOS',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: 'ERROR_MOVIMIENTO',
        payload: error.message
      })
    }
  }

  async function addMovimiento(movimiento) {
    try {
      const response = await fetch(`${APP_URL}/api/movimientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movimiento)
      })

      const data = await response.json()

      dispatch({
        type: 'ADD_MOVIMIENTO',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: 'ERROR_MOVIMIENTO',
        payload: error.message
      })
    }
  }

  async function deleteMovimiento(id) {
    try {
      await fetch(`${APP_URL}/api/movimientos/${id}`, {
        method: 'DELETE'
      })

      dispatch({
        type: 'DELETE_MOVIMIENTO',
        payload: id
      })
    } catch (error) {
      dispatch({
        type: 'ERROR_MOVIMIENTO',
        payload: error.message
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        movimientos: state.movimientos,
        loading: state.loading,
        error: state.error,
        deleteMovimiento,
        addMovimiento
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}