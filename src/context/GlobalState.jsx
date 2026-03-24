import React, {createContext, useEffect, useState} from 'react'
import AppReducer from './AppReducer'

//Estado inicial
const initialState = {
    movimientos : [],
    loading : true,
    error : null
}

//url de la API
const APP_URL = 'https://calculadora-de-gastos.onrender.com'

//creamos el contexto 
export const GlobalContext = createContext(initialState)

//creamos el provider
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(AppReducer, initialState)
    //cargar la lsta de gastosal abrir la app
    useEffect(() => {
        getMovimientos()
    }, [])
    //acciones
    async function getMovimientos(){
        try{
            const response = await fetch(`${APP_URL}/api/movimientos`, {
                method : 'GET'
            })
            const data = await response.json()

            dispatch({
                type : 'GET_MOVIMIENTOS',
                payload: data
            })
        }catch(error){
            dispatch({
                type : 'MOVIMIENTOS_ERROR',
                payload : error.message
            })
        }
    }
    async function addMovimiento(movimiento){
        try{
            const response = await fetch(`${APP_URL}`, {
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(movimiento)
            })
            const data = await response.json()
            dispatch({
                type : 'ADD_MOVIMIENTO',
                payload: data
            })
        }catch(error){
            dispatch({
                type : 'MOVIMIENTOS_ERROR',
                payload : error.message
            })
        }
    }
    async function deleteMovimiento(id){
        try{
            await fetch(`${APP_URL}/api/movimientos/${id}`, {
                method : 'DELETE'
            }),
            dispatch({
                type : 'DELETE_MOVIMIENTO',
                payload : id
            })
        }catch(error){ 
            dispatch({
                type: 'ERROR_MOVIMIENTO',
                payload: error.message
            })
        }
    }
    return (<GlobalContext.Provider value={{
            movimientos : state.gastos,
            loading : state.loading,
            error : state.error,
            deleteMovimiento,
            addMovimiento
        }}>
            {children}
        </GlobalContext.Provider>
    )
}