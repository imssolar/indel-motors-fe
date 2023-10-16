import React from "react";
import Menu from "../Drawer/Menu";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <Menu>{children}</Menu>;
};
