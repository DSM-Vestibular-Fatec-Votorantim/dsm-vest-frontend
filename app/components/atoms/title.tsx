import { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="text-lg font-semibold mb-2">{children}</h2>
);