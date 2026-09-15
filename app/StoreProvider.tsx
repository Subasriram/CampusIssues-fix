"use client";

import ReduxProvider from "./store/Provider";
import PersistGate from "./components/PersistGate";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({
  children,
}: StoreProviderProps) {
  return (
    <ReduxProvider>
      <PersistGate>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}