import React from "react";
import Header from "./header";

const MainContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="bg-gray-100 min-h-screen w-full font-sans"
      style={{
        fontFamily: "Montserrat, Arial, sans-serif",
        height: "100vh",
        overflow: "hidden", // Prevent scrolling on the main container
      }}
    >
      <div
        className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col min-h-screen w-full"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main
          className="flex-1 flex justify-center items-center px-2 py-6"
          style={{
            overflow: "auto", // Only children/main scrolls
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainContainer;
