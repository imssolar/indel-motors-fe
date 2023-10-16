import { Client, Login, Menu } from "./Pages";
import { AuthState } from "./context/Auth/AuthState";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ClientState } from "./context/Client/ClientState";
import ClientList from "./Pages/Client/ClientList";

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
      element: <Menu/>,
    },
    {
      path:"/client-list",
      element:<ClientList/>
    }
  ]);

  return (
    <AuthState>
      <ClientState>
        <RouterProvider router={routes} />
      </ClientState>
    </AuthState>
  );
}

export default App;
