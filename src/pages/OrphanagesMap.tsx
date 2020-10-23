import React, { useEffect, useState } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import mapMarker from '../images/mapMarker.svg'
import '../styles/pages/orphanagesMap.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leafleft from 'leaflet'
import api from '../services/api'

const mapIcon = Leafleft.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    loadOrphanages()
  }, [])

  async function loadOrphanages() {
    const response = await api.get('/orphanages');
    setOrphanages(response.data)
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p> Muitas crianças estão esperando a sua visita 😊 </p>
        </header>

        <footer>
          <strong> Novo Hamburgo </strong>
          <span> Rio Grande do Sul </span>
        </footer>
      </aside>

      <Map center={[-29.6818431, -51.1394689]} zoom={15} style={{ width: '100%', height: '100%' }}>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_TOKEN}`} />
        {orphanages.map((orphanage: Orphanage) => (
          <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}>

            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap