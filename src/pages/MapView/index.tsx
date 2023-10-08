import { Map } from "../../components/Map";
import { NavBar } from "../../components/NavBar";

export const MapView = () => {
  return (
    <div className="flex w-screen h-screen">
      <NavBar fixed />
      <Map cordinates={undefined} />
    </div>
  );
};
