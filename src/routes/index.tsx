import { BrowserRouter, Routes as RootRoutes, Route } from "react-router-dom";
import { DashBoard } from "../pages/DashBoard";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RootRoutes>
        <Route path="/" element={<DashBoard />} />
      </RootRoutes>
    </BrowserRouter>
  );
};
