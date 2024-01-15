import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BuildIcon from "@mui/icons-material/Build";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
interface PageConstant {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const clientPages: PageConstant[] = [
  {
    name: "Administrar Clientes",
    path: "/client",
    icon: <PersonAddAltIcon />,
  },
];

export const vehiclePages: PageConstant[] = [

  {
    name: "Administrar Vehículos",
    path: "/vehicle",
    icon: <CarRepairIcon />,
  },
];

export const workOrderPages: PageConstant[] = [

  {
    name: "Administrar OT",
    path: "/work-order",
    icon: <NoteAddIcon />,
  },
];
export const sparePages: PageConstant[] = [

  {
    name: "Administrar Repuestos",
    path: "/spare",
    icon: <BuildIcon />,
  },
];

export const spareGroupPages: PageConstant[] = [

  {
    name: "Administrar Grupo de Repuestos",
    path: "/spare-group",
    icon: <BackupTableIcon />,
  },
];

export const unitPages: PageConstant[] = [


  {
    name: "Administrar Unidades",
    path: "/unit",
    icon: <SquareFootIcon />,
  },
];

export const orderGroup: PageConstant[] = [

  {
    name: "Administrar tipos de orden",
    path: "/order-group",
    icon: <FormatListNumberedIcon />,
  },
];
