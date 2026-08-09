import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-emerald-400">
        Tailwind + Leaflet Test
      </h1>
      <div className="w-full max-w-2xl h-96 rounded-lg overflow-hidden border border-slate-700">
        <MapContainer
          center={[9.0765, 7.3986]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[9.0765, 7.3986]}>
            <Popup>Abuja, Nigeria 📍</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default App