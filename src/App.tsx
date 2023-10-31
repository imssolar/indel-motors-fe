import {
  Client,
  Login,
  Menu,
  EditClient,
  AddVehicle,
  FindVehicle,
} from "./Pages";
import { AuthState } from "./context/Auth/AuthState";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClientState } from "./context/Client/ClientState";
import "./App.css";
import { FindClient } from "./Pages/Client/FindClient";
import { VehicleState } from "./context/Vehicle/VehicleState";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/client",
      element: <Client />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/client-find",
      element: <FindClient />,
    },
    {
      path: "/client-edit",
      element: <EditClient />,
    },
    {
      path: "/vehicle-find",
      element: <FindVehicle />,
    },
    {
      path: "/vehicle",
      element: <AddVehicle />,
    },
  ]);

  return (
    <AuthState>
      <ClientState>
        <VehicleState>
          <RouterProvider router={routes} />
        </VehicleState>
      </ClientState>
    </AuthState>
  );
}

export default App;
