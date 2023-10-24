
import { BsFillPersonLinesFill } from "react-icons/bs";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import React from "react";
interface PageConstant {
  name: string;
  path: string;
  icon: React.ReactNode
}


export const clientPages: PageConstant[] = [
  {
    name: "Buscar Cliente",
    path: "/client-find",
    icon: <PersonSearchIcon/>

  },
  {
    name: "Agregar Cliente",
    path: "/client",
    icon: <PersonAddAltIcon/>
  },
];

export const vehiclePages: PageConstant[] = [
  {
    name: "Listar Vehículos",
    path: "/vehicle-list",
    icon: BsFillPersonLinesFill,
  },
  {
    name: "Agregar Vehículo",
    path: "/vehicle",
    icon: BsFillPersonLinesFill,
  },
];

export const workOrderPages: PageConstant[] = [
  {
    name: "Listar órdenes de trabajo",
    path: "/orders-list",
    icon: BsFillPersonLinesFill,
  },
  {
    name: "Agregar orden de trabajo",
    path: "/work-order",
    icon: BsFillPersonLinesFill,
  },
];
export const sparePages: PageConstant[] = [
  {
    name: "Listar Repuestos",
    path: "/spare-list",
    icon: BsFillPersonLinesFill,
  },
  {
    name: "Agregar Repuesto",
    path: "/spare",
    icon: BsFillPersonLinesFill,
  },
];

export const spareGroupPages: PageConstant[] = [
  {
    name: "Lista Grupos de Repuesto",
    path: "/spare-group-list",
    icon: BsFillPersonLinesFill,
  },
  {
    name: "Agregar Grupo de Repuesto",
    path: "/spare-group",
    icon: BsFillPersonLinesFill,
  },
];
