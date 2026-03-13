"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FrameContextType {
  showFrames: boolean;
  toggleFrames: () => void;
}

const FrameContext = createContext<FrameContextType | undefined>(undefined);

export function FrameProvider({ children }: { children: React.ReactNode }) {
  const [showFrames, setShowFrames] = useState(true);

  const toggleFrames = () => {
    setShowFrames((prev) => !prev);
  };

  return (
    <FrameContext.Provider value={{ showFrames, toggleFrames }}>
      {children}
    </FrameContext.Provider>
  );
}

export function useFrames() {
  const context = useContext(FrameContext);
  if (context === undefined) {
    throw new Error("useFrames must be used within a FrameProvider");
  }
  return context;
}
