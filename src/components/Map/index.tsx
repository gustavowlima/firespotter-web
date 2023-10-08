import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export const Map = ({
  cordinates,
}: {
  cordinates: LatLngExpression | undefined;
}) => {
  return (
    <MapContainer
      center={[38.736946, -9.142685]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cordinates && <Marker position={cordinates}></Marker>}
    </MapContainer>
  );
};
