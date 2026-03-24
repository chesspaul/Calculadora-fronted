import React from 'react'
import { GlobalContext } from '../context/GlobalState'

const Movimiento = ({ movimiento }) => {
  //importando la función borrar movimiento del contexto global
  const { deleteMovimiento } = useContext(GlobalContext)
  const signo = movimiento.importe < 0 ? '-' : '+'
  
  return (
    <li className ={movimiento.importe < 0 ? 'minus' : 'plus'}>
      {movimiento.descripcion} <span>{signo}${Math.abs(movimiento.importe).toFixed(2)}</span>
      <button className='delete-btn' onClick={() => deleteMovimiento(movimiento.id)}>X</button>

    </li>
  ) 
}

export default Movimiento