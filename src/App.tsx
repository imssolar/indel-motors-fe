import {
  Client,
  Login,
  Menu,
  AddVehicle,
} from "./Pages";
import { AuthState } from "./context/Auth/AuthState";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClientState } from "./context/Client/ClientState";
import { VehicleState } from "./context/Vehicle/VehicleState";
import { WorkOrderState } from "./context/workOrder/WorkOrderState";
import { OrderGroupState } from "./context/orderGroup/OrderGroupState";
import { AddSpareGroup } from "./Pages/spareGroup/AddSpareGroup";
import { SpareGroupState } from "./context/SpareGroup/SpareGroupState";
import { EditSpareGroup } from "./Pages/spareGroup/EditSpareGroup";
import { FindSpareGroup } from "./Pages/spareGroup/FindSpareGroup";
import { AddUnit } from "./Pages/Unit/AddUnit";
import { UnitState } from "./context/Unit/UnitState";
import { WorkOrder } from "./Pages/WorkOrder/WorkOrder";
import { OutStockTable } from "./Pages/WorkOrder/OutStockTable";
import { AddOrderGroup } from "./Pages/orderGroup/AddOrderGroup";
import { FindOrderGroup } from "./Pages/orderGroup/FindOrderGroup";
import "./App.css";
import { WO } from "./Pages/WorkOrder/WO";
import { SpareState } from "./context/Spare/spareState";
import { AddSpare } from "./Pages/Spare/AddSpare";
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
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/client",
      element: <Client />,
    },
    {
      path: "/vehicle",
      element: <AddVehicle />,
    },
    {
      path: "/sparegroup-list",
      element: <FindSpareGroup />,
    },

    {
      path: "/spare-group",
      element: <AddSpareGroup />,
    },
    {
      path: "/sparegroup-edit",
      element: <EditSpareGroup />,
    },
    {
      path: "/unit",
      element: <AddUnit />,
    },
    {
      path: "/work-order",
      element: <WO />,
    },
    {
      path: "/workorder-stock",
      element: <OutStockTable />,
    },
    {
      path: "/ordergroup-list",
      element: <FindOrderGroup />,
    },
    {
      path: "/order-group",
      element: <AddOrderGroup />,
    },
    {
      path: "/spare",
      element: <AddSpare />,
    }
  ]);

  return (
    <AuthState>
      <ClientState>
        <VehicleState>
          <SpareGroupState>
            <UnitState>
              <WorkOrderState>
                <OrderGroupState>
                  <SpareState>
                    <RouterProvider router={routes} />
                  </SpareState>
                </OrderGroupState>
              </WorkOrderState>
            </UnitState>
          </SpareGroupState>
        </VehicleState>
      </ClientState>
    </AuthState>
  );
}

export default App;
