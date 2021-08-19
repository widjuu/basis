// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { YMaps, Map as YandexMap, Placemark } from 'react-yandex-maps'

import '../assets/css/style.css'

export const Map = () => (
  // <MapContainer
  //   style={{ width: '100%', height: 300, marginTop: 80 }}
  //   center={[47.994983, 37.805518]}
  //   zoom={16}
  //   scrollWheelZoom={false}
  // >
  //   <TileLayer
  //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //   />
  //   <Marker position={[47.994983, 37.805518]}>
  //     <Popup>Офис</Popup>
  //   </Marker>
  // </MapContainer>

  <YMaps>
    <YandexMap
      style={{ marginTop: 80, height: 300, width: '100%' }}
      defaultState={{ center: [47.994983, 37.805518], zoom: 16 }}
    >
      <Placemark
        defaultGeometry={[47.994983, 37.805518]}
        properties={{ iconCaption: 'Базис' }}
      />
    </YandexMap>
  </YMaps>
)
