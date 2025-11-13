import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
    {children}
  </div>
);