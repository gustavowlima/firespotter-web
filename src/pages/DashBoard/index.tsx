import { NavBar } from "../../components/NavBar";
import { Map } from "../../components/Map";
import { RecentsReports } from "./components/RecentsReports";
import { Autocomplete } from "@mui/joy";
import { useEffect, useState } from "react";
import { IGetLocation } from "./types";
import { LatLngExpression } from "leaflet";
import { getLocation } from "../../services/getLocation";
import Modal from "@mui/joy/Modal";
import { X } from "lucide-react";

export const DashBoard = () => {
  const [locations, setLocations] = useState<IGetLocation[] | []>([]);
  const [coordinates, setCoordinates] = useState<LatLngExpression | undefined>([
    51.505, -0.09,
  ]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string | null>(
    null
  );

  const questions = [
    {
      question:
        "Did you notice the presence of flammable substances near the fire site, such as gasoline, oil, or chemicals?",
      status: false,
    },
    {
      question: "Are there any roads blocked due to the fire?",
      status: false,
    },
    {
      question: "Was there an evacuation order for the area?",
      status: false,
    },
    {
      question: "Is the fire spreading quickly",
      status: false,
    },
    {
      question:
        "Is there a need for medical assistance for people affected by the fire?",
      status: false,
    },
  ];

  const [form, setForm] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

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

  const handleQuestionsChange = () => {
    if (form === questions.length - 1) {
      setModalOpen(false);
      setForm(0);
      return;
    }
    setForm((prev) => prev + 1);
  };
  return (
    <div className="flex bg-gray-50 w-screen h-screen">
      <NavBar handleModal={setModalOpen} />
      <main className="flex flex-1 py-7">
        <div className="flex flex-col w-[98%] h-full gap-4">
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
      <Modal
        open={modalOpen}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col w-96 bg-white h-96 py-6 px-4">
          <header className="flex items-center justify-between w-full">
            <h2>Add a report</h2>
            <X cursor={"pointer"} onClick={() => setModalOpen(false)} />
          </header>
          <div className="flex flex-1 mt-8 text-gray-700 text-lg">
            {questions[form].question}
          </div>

          <div className="flex flex-col gap-6">
            <button
              onClick={handleQuestionsChange}
              className="w-full border-2 border-gray-900 rounded-lg py-1 hover:bg-gray-900 hover:text-white"
            >
              Yes
            </button>
            <button
              onClick={handleQuestionsChange}
              className="w-full border-2 border-gray-900 rounded-lg py-1 hover:bg-gray-900 hover:text-white"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
