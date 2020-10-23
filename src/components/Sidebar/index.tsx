import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import mapMarker from '../../images/mapMarker.svg'

import './styles.css'
function Sidebar() {
  const { goBack } = useHistory()

  return (
    <aside className="sidebar">
      <img src={mapMarker} alt="Happy" />
      <footer>
        <button onClick={goBack}> <FiArrowLeft size={24} color="#FFF" /> </button>
      </footer>
    </aside>
  )
}

export default Sidebar