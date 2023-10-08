import { BrowserRouter, Routes as RootRoutes, Route } from "react-router-dom";
import { DashBoard } from "../pages/DashBoard";
import { MapView } from "../pages/MapView";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RootRoutes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/view-map" element={<MapView />} />
      </RootRoutes>
    </BrowserRouter>
  );
};
