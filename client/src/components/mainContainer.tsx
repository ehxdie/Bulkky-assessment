import React from "react";
import Header from "./header";

const MainContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="bg-gray-100 flex items-center justify-center min-h-screen"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full w-full"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
