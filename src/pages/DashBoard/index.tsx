import { NavBar } from "../../components/NavBar";
import { Map } from "../../components/Map";
import { RecentsReports } from "./components/RecentsReports";
import { Autocomplete } from "@mui/joy";
import { useEffect, useState } from "react";
import { IGetLocation } from "./types";
import { LatLngExpression } from "leaflet";
import { getLocation } from "../../services/getLocation";

export const DashBoard = () => {
  const [locations, setLocations] = useState<IGetLocation[] | []>([]);
  const [coordinates, setCoordinates] = useState<LatLngExpression | undefined>([
    51.505, -0.09,
  ]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!debouncedSearchTerm) {
      return;
    }
    const formattedAddress = debouncedSearchTerm.replace(/\s+/g, "+");

    const timeoutId = setTimeout(() => {
      getLocation(formattedAddress).then((response) => {
        setLocations(response);
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedSearchTerm]);
  return (
    <div className="flex bg-gray-50 w-screen h-screen">
      <NavBar />
      <main className="flex flex-1 py-7">
        <div className="flex flex-col w-[50%] h-full gap-4">
          <section className="flex gap-4 flex-1 flex-col">
            <Autocomplete
              options={locations}
              noOptionsText="No results"
              placeholder="Search by location"
              onChange={(_, value) => {
                if (!value) {
                  return;
                }
                setCoordinates([Number(value.lat), Number(value.lon)]);
              }}
              getOptionLabel={(option) => option.display_name}
              isOptionEqualToValue={(option, value) =>
                option.place_id === value.place_id
              }
              onInputChange={(e) => {
                if (!e) {
                  return;
                }
                const event = e as React.ChangeEvent<HTMLInputElement>;
                setDebouncedSearchTerm(event.target.value);
              }}
            />
            <div className="flex rounded-xl w-full bg-white h-full">
              <Map cordinates={coordinates} />
            </div>

            <div className="flex rounded-xl w-full bg-white h-full">
              <RecentsReports />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
