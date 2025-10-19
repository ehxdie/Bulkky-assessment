import React from "react";
import Header from "./header";

const MainContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="bg-gray-100 min-h-screen w-full font-sans"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      <div
        className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col min-h-screen w-full"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main className="flex-1 overflow-auto flex justify-center items-center px-2 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainContainer;
