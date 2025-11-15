import React from "react";

interface TableContainerProps {
  children: React.ReactNode;
}

export const TableContainer: React.FC<TableContainerProps> = ({ children }) => {
  return <div className="h-full flex flex-col">{children}</div>;
};
