import { BsFillPersonLinesFill } from "react-icons/bs";

interface PageConstant {
  name: string;
  path: string;
  icon: JSX.Element;
}

export const clientPages: PageConstant[] = [
  {
    name: "Listar Clientes",
    path: "/client-list",
    icon: BsFillPersonLinesFill,
  },
  {
    name: "Agregar Cliente",
    path: "/client",
    icon: BsFillPersonLinesFill,
  },
  
];
