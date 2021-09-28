import React, { useContext } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'

const StateDebug = () => {
  const { restaurants } = useContext(RestaurantsContext)
  
  const logState = () => {
    console.log(restaurants)
  }
  
  return (
    <div>
      <button onClick={logState}>Log State</button>
    </div>
  )
}

export default StateDebug
