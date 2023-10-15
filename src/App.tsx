import { Client, Login } from "./Pages";
import { AuthState } from "./context/Auth/AuthState";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PersistentDrawerLeft from "./components/Drawer/PersistentDrawer";

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
      path: "/Client",
      element: <Client />,
    },
    {
      path:"/Menu",
      element:<PersistentDrawerLeft/>
    }
  ]);

  return (
    <AuthState>
      <RouterProvider router={routes} />
    </AuthState>
  );
}

export default App;
