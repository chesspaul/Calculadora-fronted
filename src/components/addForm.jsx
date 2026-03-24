import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AddForm = () => {
    //definir los estados locales para los inputs
  const [descripcion, setDescripcion] = useState('')
  const [importe, setImporte] = useState(0)
    //del contexto global traemos la acción global a Movimiento
  const { addMovimiento } = useContext(GlobalContext)
    // submit para el envio del formulario
  const onSubmit = (e) => {
    e.preventDefault()
 
    const nuevoMovimiento = {
      descripcion,
      importe: +importe
    }

    addMovimiento(nuevoMovimiento)
    setDescripcion('')
    setImporte(0)
  }

  return (
    <>
      <h3>Agregar Movimiento</h3>
      <form onSubmit={onSubmit}>

        <div className="form-control">
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="importe">Importe</label>
          <input
            type="number"
            id="importe"
            value={importe}
            onChange={(e) => setImporte(parseFloat(e.target.value) || 0)}
          />
        </div>

        <button className="btn">
          Agregar Movimiento
        </button>

      </form>
    </>
  )
}

export default AddForm