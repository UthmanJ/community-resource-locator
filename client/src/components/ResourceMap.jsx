import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ResourceMap({ resources }) {
  const defaultCenter = [9.0765, 7.3986]; // Abuja, Nigeria

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 h-[500px]">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {resources.map((resource) => (
          <Marker key={resource._id} position={[resource.latitude, resource.longitude]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{resource.name}</p>
                <p className="text-slate-600">{resource.category}</p>
                <Link
                  to={`/resource/${resource._id}`}
                  className="text-emerald-600 hover:underline"
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ResourceMap;