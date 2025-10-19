import React from "react";

const MainContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="bg-gray-100 flex items-center justify-center min-h-screen"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
        style={{
          width: 393,
          height: 852,
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
