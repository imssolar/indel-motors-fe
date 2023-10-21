import { Client, Login, Menu, EditClient } from "./Pages";
import { AuthState } from "./context/Auth/AuthState";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClientState } from "./context/Client/ClientState";
import "./App.css";
import { FindClient } from "./Pages/Client/FindClient";

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
      path:"/client-find",
      element:<FindClient/>
    },
    {
      path:"/client-edit",
      element:<EditClient/>
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
